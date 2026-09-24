"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axios from "axios";
import {
  saveAuthData,
  getAuthData,
  clearAuthData,
  isAuthenticated,
  User,
} from "@/lib/auth";
import { decodeJWT } from "@/lib/signInToken";
import {
  AUTH_SESSION_INVALID_EVENT,
  handleAuthFailure,
  invalidateIfAuthorizationExpired,
} from "@/lib/auth-session";
// zodiacAuth.js is plain JS, synced from zodiac-embed — allowJs resolves it, no directive needed
import {
  notifySignedIn,
  notifySignedOut,
} from "@/components/ZodiacLauncher/zodiacAuth";

type TokenPayload = {
  exp?: number;
};

const getAccessTokenExpiryMs = (token?: string): number | null => {
  if (!token) return null;
  const decoded = decodeJWT<TokenPayload>(token);
  if (!decoded || typeof decoded.exp !== "number") {
    return null;
  }
  return decoded.exp * 1000;
};

/*
 * ── Only THIS product's backend may declare THIS product's session dead ────
 *
 * The effect below replaces window.fetch for the whole page, so EVERY fetch
 * any code makes — including the Zodiac launcher's — runs through it, and any
 * authenticated response that was not ok used to invalidate the session.
 *
 * That is how opening the Zodiac switcher signed the user out. The launcher's
 * loadHub() (ZodiacLauncher.jsx:751) fetches /api/v1/zodiac/hub with a Bearer
 * token the moment the panel opens. That endpoint answers 401 whenever it does
 * not accept the token — a perfectly ordinary answer from a DIFFERENT service,
 * about a DIFFERENT credential. handleAuthFailure took it as proof that the
 * Bitcoin Yay session had expired, dispatched AUTH_SESSION_INVALID, and
 * clearLocalSession() wiped storage: the header behind the open panel fell back
 * to Login/Register with no navigation, and the panel lost the account it had
 * just shown. All three of the reported symptoms, from one foreign 401.
 *
 * A 401 from someone else's API means "this token is not valid for THAT
 * service". It says nothing about this one. So the interceptor now listens
 * only to our own origin and our own API host.
 */
const originOf = (raw?: string | null): string | null => {
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
};

const OWN_API_ORIGIN = originOf(process.env.NEXT_PUBLIC_API_URL);
const IDP_ORIGIN = originOf(process.env.NEXT_PUBLIC_IDP_ISSUER);

/*
 * Endpoints that answer about a DIFFERENT credential than this product's.
 *
 * Matching on path and not only on origin is the load-bearing part: in
 * production the Zodiac hub is served by the same monolith as Bitcoin Yay's
 * own API (/api/v1/zodiac/hub on api.v1.indexx.ai), so an origin allowlist
 * alone would not tell them apart and the bug would survive deployment even
 * though it looked fixed on localhost, where the two run on different ports.
 */
const isForeignAuthSurface = (url: URL): boolean => {
  if (/\/api\/v\d+\/zodiac\//.test(url.pathname)) return true;
  if (IDP_ORIGIN && url.origin === IDP_ORIGIN) return true;
  return false;
};

/**
 * True when a failed authenticated response is evidence about OUR session.
 *
 * When NEXT_PUBLIC_API_URL is unset we cannot positively identify our own API,
 * so we keep the previous behaviour — trust any authenticated request — minus
 * the foreign auth surfaces above. That keeps genuine expiry handling working
 * while still refusing to be signed out by someone else's 401.
 */
const isOwnApiRequest = (input: RequestInfo | URL): boolean => {
  if (typeof window === "undefined") return false;
  let href: string;
  if (typeof input === "string") href = input;
  else if (input instanceof URL) href = input.href;
  else if (input instanceof Request) href = input.url;
  else return false;

  try {
    const url = new URL(href, window.location.href);
    if (isForeignAuthSurface(url)) return false;
    if (url.origin === window.location.origin) return true;
    if (OWN_API_ORIGIN) return url.origin === OWN_API_ORIGIN;
    return true;
  } catch {
    return false;
  }
};

const isAccessTokenExpired = (token?: string): boolean => {
  const expiryMs = getAccessTokenExpiryMs(token);
  if (!expiryMs) return false;
  return Date.now() >= expiryMs;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<boolean>;
  checkAuth: () => void;
  setIsLoadingState: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /*
   * Clear this product's storage — and only this product's.
   *
   * This used to be window.localStorage.clear(), which takes the whole origin
   * with it. The Zodiac launcher keeps its OIDC state under "zodiac." on the
   * same origin (its PKCE verifier, refresh token, silent-sign-in markers), so
   * a Bitcoin Yay logout was also destroying the single sign-on client sitting
   * next to it. Combined with the foreign-401 bug above, that is why the
   * switcher panel lost the account it had just displayed: the keys it reads
   * had been deleted out from under it.
   *
   * clearAuthData() already removes every key this product owns, precisely
   * (lib/auth.ts). Anything preserved here belongs to somebody else, and
   * signing out of Zodiac is zodiacAuth's own signOut() — not ours to do by
   * side effect.
   */
  const clearBrowserStorage = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const preserve = (key: string) => key.startsWith("zodiac.");

    const sweep = (store: Storage, label: string) => {
      try {
        const doomed: string[] = [];
        for (let i = 0; i < store.length; i += 1) {
          const key = store.key(i);
          if (key && !preserve(key)) doomed.push(key);
        }
        doomed.forEach((key) => store.removeItem(key));
      } catch (error) {
        console.warn(`Unable to clear ${label} during logout`, error);
      }
    };

    sweep(window.localStorage, "localStorage");
    sweep(window.sessionStorage, "sessionStorage");
  }, []);

  /*
   * The local half of signing out — this browser, this product.
   *
   * This is what the paths the MACHINE initiates use: an access token that
   * aged out, a 401 handled by handleAuthFailure. Those must NOT end the
   * Indexx ID session. The estate session deliberately outlives an 8h access
   * token, and the launcher's silent check is what hands the user a fresh one
   * on the next load; ending it here would sign the person out of all sixteen
   * products every time one token lapsed, without them asking for anything.
   */
  const clearLocalSession = useCallback(() => {
    clearBrowserStorage();
    clearAuthData();
    setUser(null);
  }, [clearBrowserStorage]);

  const logout = useCallback(async (): Promise<boolean> => {
    clearLocalSession();

    /*
     * And end the session at the PROVIDER — the mirror image of the
     * notifySignedIn() call below, and the half that was missing.
     *
     * Clearing storage ends the session in this tab and nowhere else. The
     * provider's session row and its idp_session cookie survive untouched, so
     * the next page load runs prompt=none, finds that session, and signs the
     * person straight back in — proven on test.indexx.ai: log out, return to
     * the home page, "SIGNED IN — Welcome back". On a shared machine the next
     * person inherits it across every product.
     *
     * notifySignedOut() revokes the refresh family and navigates to the
     * provider's end-session endpoint, which is what actually ends it. Two
     * consequences the caller has to respect:
     *   - it NAVIGATES, so it goes LAST, after the product has cleared its own
     *     state. The navigation may not come back.
     *   - it resolves false (never throws) when no launcher client exists on
     *     the page — someone signed in to BTCY but not to Zodiac. Only then is
     *     there a local redirect left to do, which is why this returns the
     *     flag instead of swallowing it. See Navbar's handleLogout.
     */
    return notifySignedOut().catch(() => false);
  }, [clearLocalSession]);

  const login = useCallback((userData: User) => {
    saveAuthData(userData);
    setUser(userData);

    /*
     * Tell Indexx Zodiac that a session now exists.
     *
     * ── Why this line is what makes BTCY -> anywhere work ─────────────────
     *
     * Signing in here is a LOCAL event. saveAuthData writes the estate token
     * to localStorage.access_token (lib/auth.ts:21, via persistLegacyAuthData)
     * and the identity provider learns nothing: the provider's session cookie
     * is SameSite=Lax and bitcoinyay.com is a foreign registrable domain, so
     * nothing this page does in the background can set it.
     *
     * notifySignedIn() reaches the launcher's client and calls
     * adoptLocalSession(), which POSTs that estate token to /session/adopt and
     * spends the adopt_code it returns. THAT is what creates the provider
     * session — and without it the rest of the estate has no idea the person
     * is signed in. Open any other product and prompt=none finds nothing.
     *
     * The launcher will not do this by itself at this moment. It adopts on
     * mount, when the switcher opens, and when leaving for another product —
     * none of which is "the user just submitted the login form". This popup
     * closes without reloading, so the launcher mounted while signed out and
     * would not look again until the switcher happened to be touched.
     *
     * Both LoginPopup (:131) and RegisterPopup (:302) funnel through here, so
     * one call covers the form and registration alike. This mirrors EMMM,
     * which has had it since the federation work (AuthProvider.tsx:131).
     *
     * Fire and forget: a failure in sign-on wiring must never break signing in
     * HERE. adoptLocalSession already swallows its own errors and returns
     * false; the catch is belt and braces.
     */
    void notifySignedIn().catch(() => {});
  }, []);

  const checkAuth = useCallback(() => {
    const userData = getAuthData();
    if (userData && isAccessTokenExpired(userData.access_token)) {
      clearLocalSession();
      setIsLoading(false);
      return;
    }

    setUser(userData);
    setIsLoading(false);
  }, [clearLocalSession]);

  const setIsLoadingState = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /*
   * The estate signed us in AFTER this provider had already read storage.
   *
   * Zodiac's silent sign-in is a network round trip: the launcher mounts, asks
   * the provider prompt=none, and the session lands a moment later. By then
   * checkAuth() above has run against empty storage and the header has painted
   * "Login" — the session is real, only the render is stale.
   *
   * The launcher's onSession (Navbar, at the mount) has just written that
   * session through saveAuthData, and zodiacAuth fires "zodiac:session" only
   * after that callback resolves, so by the time we are called the JSON under
   * bitcoinYayAuth is already there. Re-reading is the whole fix.
   *
   * This listener is what earns `reloadOnSession: false` at the mount. Without
   * it the launcher's window.location.reload() is the only thing that refreshes
   * the header, and it costs a second /id/token grant, a second /session/legacy
   * mint and the full-screen "Signing you in…" flash for one sign-in. Every
   * consumer in this app reads its session through useAuth, so the single
   * setUser inside checkAuth re-renders all of them — the mining balances the
   * Navbar keys on user.email included.
   */
  useEffect(() => {
    const handleEstateSession = () => {
      checkAuth();
    };

    window.addEventListener("zodiac:session", handleEstateSession);
    return () =>
      window.removeEventListener("zodiac:session", handleEstateSession);
  }, [checkAuth]);

  useEffect(() => {
    const handleInvalidSession = () => {
      clearLocalSession();
      setIsLoading(false);
    };

    window.addEventListener(AUTH_SESSION_INVALID_EVENT, handleInvalidSession);
    return () =>
      window.removeEventListener(
        AUTH_SESSION_INVALID_EVENT,
        handleInvalidSession
      );
  }, [clearLocalSession]);

  useEffect(() => {
    const originalFetch = window.fetch;

    const authenticatedFetch: typeof window.fetch = async (input, init) => {
      const requestHeaders = new Headers(
        init?.headers ?? (input instanceof Request ? input.headers : undefined)
      );
      const authorization = requestHeaders.get("Authorization");
      /*
       * Scoped deliberately — see isOwnApiRequest above. Without this, the
       * Zodiac hub's 401 signs the user out of Bitcoin Yay.
       */
      const isOwnApi = isOwnApiRequest(input);
      const isAuthenticatedRequest = Boolean(authorization) && isOwnApi;
      if (isOwnApi) invalidateIfAuthorizationExpired(authorization);
      const response = await originalFetch(input, init);

      if (isAuthenticatedRequest) {
        if (response.status === 401) {
          handleAuthFailure(response);
        } else if (!response.ok) {
          const payload = await response
            .clone()
            .json()
            .catch(() => undefined);
          handleAuthFailure(response, payload);
        }
      }

      return response;
    };

    window.fetch = authenticatedFetch;

    const axiosRequestInterceptor = axios.interceptors.request.use((config) => {
      const authorization = config.headers?.get?.("Authorization");
      invalidateIfAuthorizationExpired(
        typeof authorization === "string" ? authorization : null
      );
      return config;
    });

    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (axios.isAxiosError(error)) {
          const authorization = error.config?.headers?.get?.("Authorization");
          // Same rule as the fetch path: only our own API's 401 is about us.
          const target = error.config?.url
            ? new URL(error.config.url, error.config.baseURL || window.location.href).href
            : null;
          if (authorization && error.response && target && isOwnApiRequest(target)) {
            handleAuthFailure(error.response, error.response.data);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      if (window.fetch === authenticatedFetch) {
        window.fetch = originalFetch;
      }
      axios.interceptors.request.eject(axiosRequestInterceptor);
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, []);

  useEffect(() => {
    if (!user?.access_token) {
      return;
    }

    const expiryMs = getAccessTokenExpiryMs(user.access_token);
    if (!expiryMs) {
      return;
    }

    const now = Date.now();
    if (now >= expiryMs) {
      clearLocalSession();
      setIsLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      clearLocalSession();
      setIsLoading(false);
    }, expiryMs - now);

    return () => window.clearTimeout(timeoutId);
  }, [user?.access_token, clearLocalSession]);

  const value: AuthContextType = {
    user,
    isAuthenticated: isAuthenticated(),
    isLoading,
    login,
    logout,
    checkAuth,
    setIsLoadingState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
