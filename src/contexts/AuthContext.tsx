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
// @ts-ignore — zodiacAuth.js is plain JS, synced from zodiac-embed, no types
import { notifySignedIn } from "@/components/ZodiacLauncher/zodiacAuth";

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
  logout: () => void;
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

  const clearBrowserStorage = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn("Unable to clear localStorage during logout", error);
    }

    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.warn("Unable to clear sessionStorage during logout", error);
    }
  }, []);

  const logout = useCallback(() => {
    clearBrowserStorage();
    clearAuthData();
    setUser(null);
  }, [clearBrowserStorage]);

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
      logout();
      setIsLoading(false);
      return;
    }

    setUser(userData);
    setIsLoading(false);
  }, [logout]);

  const setIsLoadingState = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleInvalidSession = () => {
      logout();
      setIsLoading(false);
    };

    window.addEventListener(AUTH_SESSION_INVALID_EVENT, handleInvalidSession);
    return () =>
      window.removeEventListener(
        AUTH_SESSION_INVALID_EVENT,
        handleInvalidSession
      );
  }, [logout]);

  useEffect(() => {
    const originalFetch = window.fetch;

    const authenticatedFetch: typeof window.fetch = async (input, init) => {
      const requestHeaders = new Headers(
        init?.headers ?? (input instanceof Request ? input.headers : undefined)
      );
      const authorization = requestHeaders.get("Authorization");
      const isAuthenticatedRequest = Boolean(authorization);
      invalidateIfAuthorizationExpired(authorization);
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
          if (authorization && error.response) {
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
      logout();
      setIsLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      logout();
      setIsLoading(false);
    }, expiryMs - now);

    return () => window.clearTimeout(timeoutId);
  }, [user?.access_token, logout]);

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
