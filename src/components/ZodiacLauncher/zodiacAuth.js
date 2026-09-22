/* Copied from indexx-exchange-backend/zodiac-embed/ (fingerprint 678a1ea63da5) — edit the source there, not here. */
/*
 * Indexx ID — the browser-side OIDC client (the "RP") every product embeds.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ SOURCE OF TRUTH: zodiac-embed/ at the workspace root.                    │
 * │ Copied into each product repo. Do NOT edit a copy — change the source    │
 * │ and re-sync, or the products drift apart.                                │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * ── Why no library ─────────────────────────────────────────────────────────
 *
 * The products disagree on everything: two CRA 4, two Next 13 pages-router,
 * different UI kits, different bundlers. `oidc-client-ts` / `openid-client`
 * would have to be added to four package.json files and would drag a build
 * target fight with CRA 4 along with it. This file brings nothing with it:
 * plain ES module, browser built-ins only (fetch, crypto.subtle, WebCrypto,
 * sessionStorage, history), no framework imports, no Node imports. It is also
 * import-safe during Next's server render — nothing touches `window` at module
 * scope, only inside the returned methods.
 *
 * ── Why this is a PUBLIC client ────────────────────────────────────────────
 *
 * Everything here ships to the browser, so there is no client secret and there
 * can never be one. The only thing proving that the party redeeming the code is
 * the party that started the flow is PKCE (RFC 7636). It is mandatory, S256
 * only; the provider rejects `plain`.
 *
 * ── The one thing to get right: silent sign-in ─────────────────────────────
 *
 * Cross-domain SSO here works because the IdP holds a FIRST-PARTY session
 * cookie on its own origin (see identity/src/config.js). Third-party cookies
 * and hidden-iframe `prompt=none` are dead in Safari and Chrome, so the silent
 * check is a TOP-LEVEL redirect: we navigate to /authorize?prompt=none, the IdP
 * either sends us straight back with a code or sends us back with
 * `error=login_required`, and the page reloads either way.
 *
 * That means the failure mode is an INFINITE REDIRECT LOOP: load → no session →
 * prompt=none → login_required → load → no session → prompt=none → ... Signed
 * out users would see every product in the estate spin forever. The guard is a
 * sessionStorage marker written BEFORE the redirect and never cleared by a
 * failure, plus a per-page-load in-memory latch. Read `silentSignIn` below with
 * that in mind — the bookkeeping there is the whole point of this file.
 */

/*
 * Space-delimited, per OIDC.
 *
 * `ecosystem` is what /session/legacy checks before it will mint an estate
 * token, so every product that wants an estate session has to ask for it here.
 * It used to be opt-in and nothing enforced it; the estate token came back on
 * the strength of the session cookie alone. Now that the route also accepts a
 * bearer access token — which it must, or products on a foreign registrable
 * domain can never get one — the grant has to be explicit in the token rather
 * than implied by whoever happens to be holding it.
 */
const DEFAULT_SCOPE = "openid profile email ecosystem";

/** Refresh this long before `exp`, so an in-flight request never dies mid-call. */
const REFRESH_MARGIN_MS = 60 * 1000;

/** A started-but-unfinished authorization is junk after this; sweep it. */
const TX_TTL_MS = 10 * 60 * 1000;

/**
 * How long a "the IdP says you are signed out" verdict stands before we are
 * willing to spend another top-level redirect on the question. sessionStorage
 * is per-tab and dies with it, so this is a ceiling, not a cache lifetime — the
 * common case is one silent attempt per tab, ever.
 */
/*
 * 30 seconds, not 5 minutes.
 *
 * This cooldown exists only to stop a redirect loop, and a loop happens in
 * milliseconds — half a minute is already enormous for that job. Five minutes
 * broke the actual product: sign in on one product, click through to another
 * inside the window, and the second one skips its check entirely and shows you
 * signed out. The guard was doing more harm than the loop it prevents.
 */
const SILENT_COOLDOWN_MS = 30 * 1000;

/** Query params the provider adds on the way back. Stripped from the URL after. */
const CALLBACK_PARAMS = [
  "code",
  "state",
  "error",
  "error_description",
  "error_uri",
  "iss",
  "session_state",
];

/* ───────────────────────────── environment ────────────────────────────── */

const isBrowser = () =>
  typeof window !== "undefined" && typeof window.document !== "undefined";

const webCrypto = () =>
  (typeof window !== "undefined" && window.crypto) || null;

/**
 * `crypto.subtle` exists only in a secure context (https, or localhost /
 * 127.0.0.1 — which is why config.js uses 127.0.0.1 for local dev). If it is
 * missing we cannot compute an S256 challenge, and we deliberately do NOT fall
 * back to `plain`: a downgraded PKCE is worse than no sign-in, because it looks
 * like it worked.
 */
const hasSubtleCrypto = () => {
  const c = webCrypto();
  return Boolean(c && c.subtle && typeof c.subtle.digest === "function");
};

/**
 * sessionStorage throws (not returns null) in some privacy modes. Everything in
 * this file that touches it goes through these, because a storage failure must
 * degrade to "signed out", never to an exception in someone's render tree.
 */
const storeGet = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const storeSet = (key, value) => {
  try {
    window.sessionStorage.setItem(key, value);
    // Read back: if the write silently did not stick we must know NOW, because
    // the loop guard is only a guard if it persists across the redirect.
    return window.sessionStorage.getItem(key) === value;
  } catch (e) {
    return false;
  }
};

const storeDel = (key) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch (e) {
    /* ignore — nothing to clean up if storage is unavailable */
  }
};

/* ───────────────────────────── encoding ───────────────────────────────── */

const base64url = (bytes) => {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const randomBytes = (length) => {
  const c = webCrypto();
  if (!c || typeof c.getRandomValues !== "function") {
    // No CSPRNG means no unguessable state and no unguessable verifier. Math.random
    // is not a substitute; refuse rather than ship a forgeable flow.
    throw new Error("zodiacAuth: secure randomness unavailable");
  }
  return c.getRandomValues(new Uint8Array(length));
};

/** 32 bytes of entropy, base64url — well inside RFC 7636's 43..128 chars. */
const randomToken = () => base64url(randomBytes(32));

const sha256Base64url = async (text) => {
  const digest = await webCrypto().subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return base64url(new Uint8Array(digest));
};

/**
 * Read the claims out of a JWT for DISPLAY ONLY.
 *
 * This does not and cannot verify the signature — the public client has no
 * business doing that, and pretending to would be worse than not trying. Every
 * security decision is made by the provider when it validates the token at
 * /userinfo or at the resource API. These claims drive an avatar and a name.
 */
const decodeJwtClaims = (jwt) => {
  try {
    const parts = String(jwt).split(".");
    if (parts.length !== 3) return null;
    const padded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const binary = window.atob(padded + "===".slice((padded.length + 3) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (e) {
    return null;
  }
};

/* ─────────────────────────────── client ───────────────────────────────── */

/**
 * @param {object} options
 * @param {string} options.issuer       e.g. "https://id.indexx.ai" (no trailing slash needed)
 * @param {string} options.clientId     as registered in identity/src/config.js
 * @param {string} options.redirectUri  MUST byte-match a registered redirect_uri
 * @param {string} [options.scope]      defaults to "openid profile email"
 * @param {number} [options.silentCooldownMs]
 */
/**
 * One client per (issuer, clientId, redirectUri) per tab.
 *
 * The provider rotates the refresh token on every use and treats a replay as
 * theft: it revokes the whole family. So two clients sharing one sessionStorage
 * refresh token are not merely wasteful, they are a logout — the second refresh
 * replays the token the first just rotated away, the family dies, and the
 * product loops through /authorize forever trying to recover.
 *
 * refreshTokens() already single-flights, but only within ONE instance, and
 * instances are easy to create by accident: a header that passes
 * `auth={{ clientId: "..." }}` hands useEffect a fresh object identity on every
 * render, so the effect re-runs and builds another client. Memoising here makes
 * the guard hold no matter how many times callers ask for a client.
 *
 * Keyed on the three values that decide which session a client speaks for, and
 * parked on `window` so a second copy of this module — separate bundler chunks
 * on the same page — still resolves to the same instance.
 */
const INSTANCE_CACHE_KEY = "__zodiacAuthInstances";
const moduleInstances = {};

export function createAuth(options) {
  const opts = options || {};
  const key = [
    String(opts.issuer || "").replace(/\/+$/, ""),
    String(opts.clientId || ""),
    String(opts.redirectUri || ""),
  ].join("|");

  // No window (SSR, unit tests): no shared page to coordinate with.
  if (typeof window === "undefined") return buildAuth(options);

  let cache = moduleInstances;
  try {
    cache = window[INSTANCE_CACHE_KEY] || (window[INSTANCE_CACHE_KEY] = moduleInstances);
  } catch (_) {
    /* frozen or proxied window — the module-level cache still dedupes here */
  }
  if (!cache[key]) cache[key] = buildAuth(options);
  return cache[key];
}

/**
 * Tell every launcher on this page that the product just signed in.
 *
 * ── The gap this closes ──────────────────────────────────────────────────
 *
 * A launcher adopts at three moments: when it mounts, when the switcher is
 * opened, and when leaving for another product. None of them is "the user just
 * signed in". A product whose login RELOADS the page never noticed, because
 * the mount after the reload is that moment by accident. A product whose login
 * closes a modal and stays put did notice: the launcher had already mounted,
 * signed out, with nothing to adopt, and did not look again until the user
 * happened to touch the switcher. Sign in on EMMM, type bitcoinyay.com into
 * the address bar, and you arrived signed out.
 *
 * ── Why a module function and not a client method ────────────────────────
 *
 * createAuth memoises per issuer|clientId|redirectUri, and a product calling
 * createAuth again to get a handle would have to reproduce all three exactly —
 * including the issuer default the launcher resolved from its own environment.
 * Get one character wrong and you build a SECOND client with its own latch and
 * its own single-flight, which adopts in parallel with the real one. So the
 * product names nothing: every launcher already on the page is told, and each
 * decides for itself whether it has anything to adopt.
 *
 * Safe to call more than once, and safe before the keys are written — it is
 * the same single-flight adopt the launcher uses.
 */
export async function notifySignedIn() {
  if (typeof window === "undefined") return false;

  let cache = moduleInstances;
  try {
    cache = window[INSTANCE_CACHE_KEY] || moduleInstances;
  } catch (_) {
    /* frozen or proxied window — the module-level cache still has them */
  }

  const clients = [];
  try {
    for (const key of Object.keys(cache)) {
      const client = cache[key];
      if (client && typeof client.sessionStarted === "function") clients.push(client);
    }
  } catch (_) {
    return false;
  }
  if (!clients.length) return false;

  // Never let sign-on wiring break signing in. Each result is independent.
  const results = await Promise.all(
    clients.map((c) => c.sessionStarted().catch(() => false))
  );
  return results.some(Boolean);
}

function buildAuth(options) {
  /* Write the legacy localStorage keys each product's own header reads. On by
     default: without it the provider and the product disagree about whether you
     are signed in. See the block in applyTokenResponse. */
  const bridgeLegacyKeys =
    !options || options.bridgeLegacyKeys === undefined ? true : !!options.bridgeLegacyKeys;
  const opts = options || {};
  const issuer = String(opts.issuer || "").replace(/\/+$/, "");
  const clientId = String(opts.clientId || "");
  const redirectUri = String(opts.redirectUri || "");
  const scope = String(opts.scope || DEFAULT_SCOPE);
  /*
   * Called with the ESTATE session once one exists. Products store a session in
   * their own shape — Bitcoin Yay keeps a JSON User under `bitcoinYayAuth`,
   * Wall Street keeps its own object under `user` — and that knowledge belongs
   * in the product, not in here. The legacy-key bridge stays as the default for
   * the products that genuinely read those keys.
   */
  const onSession = typeof opts.onSession === "function" ? opts.onSession : null;
  const silentCooldownMs = Number(
    opts.silentCooldownMs == null ? SILENT_COOLDOWN_MS : opts.silentCooldownMs
  );

  if (!issuer || !clientId || !redirectUri) {
    throw new Error("zodiacAuth: issuer, clientId and redirectUri are required");
  }

  /*
   * Endpoints are derived from the issuer rather than discovered.
   * /.well-known/openid-configuration would cost a blocking round trip before
   * every redirect on every page load in four products, to learn paths that are
   * fixed by identity/CONTRACT.md. Discovery buys nothing until the paths can
   * actually move.
   */
  const endpoints = {
    authorize: issuer + "/authorize",
    token: issuer + "/token",
    revoke: issuer + "/revoke",
    endSession: issuer + "/session/end",
    userinfo: issuer + "/userinfo",
  };

  /*
   * Storage keys are namespaced by client_id so two products sharing an origin
   * during local development cannot read or clobber each other's flow.
   */
  const ns = "zodiac.oidc." + clientId + ".";
  const KEY_TX = ns + "tx.";          // + state
  const KEY_SILENT = ns + "silent";   // the anti-loop marker
  const KEY_REFRESH = ns + "rt";      // refresh token, per tab
  const KEY_HYDRATED = ns + "estate";  // "this tab has already reloaded once"
  const KEY_ADOPT = ns + "adopt";     // "a handoff navigation already happened"
  const KEY_LINK  = ns + "link";      // "the provider refused to link this account"

  /*
   * ── Where tokens live ────────────────────────────────────────────────────
   * Access and id tokens: MEMORY ONLY. They never touch localStorage (shared
   * across tabs and permanent, so one XSS exfiltrates everything forever) and
   * never touch a URL (URLs leak through Referer, history, server logs and
   * screen shares).
   *
   * The refresh token goes in sessionStorage because it has to survive a page
   * reload for the flow to be worth anything — but per-tab, under a namespaced
   * key, and it is rotated by the provider on every single use, so a stolen
   * copy is detected the moment the legitimate one is redeemed.
   */
  let accessToken = null;
  let accessTokenExpiresAt = 0;
  let idToken = null;
  let claims = null;
  let refreshPromise = null;
  /** In-flight authorization-response handling; see handleCallback. */
  let callbackPromise = null;

  /**
   * Per-page-load latch. Belt to sessionStorage's braces: even if storage is
   * wiped mid-flight, one page load can only ever fire one silent redirect.
   */
  let silentAttemptedThisLoad = false;
  /** 'unknown' until something authoritative has happened. */
  let status = "unknown";

  /* ─────────────────────────── transaction store ───────────────────────── */

  const sweepStaleTransactions = () => {
    try {
      const now = Date.now();
      for (let i = window.sessionStorage.length - 1; i >= 0; i -= 1) {
        const key = window.sessionStorage.key(i);
        if (!key || key.indexOf(KEY_TX) !== 0) continue;
        let tx = null;
        try {
          tx = JSON.parse(window.sessionStorage.getItem(key));
        } catch (e) {
          tx = null;
        }
        if (!tx || !tx.createdAt || now - tx.createdAt > TX_TTL_MS) {
          window.sessionStorage.removeItem(key);
        }
      }
    } catch (e) {
      /* storage unavailable — nothing to sweep */
    }
  };

  /** Read a transaction AND delete it in the same breath: state is single-use. */
  const takeTransaction = (state) => {
    const key = KEY_TX + state;
    const raw = storeGet(key);
    storeDel(key);
    if (!raw) return null;
    try {
      const tx = JSON.parse(raw);
      if (!tx || !tx.verifier || Date.now() - tx.createdAt > TX_TTL_MS) return null;
      return tx;
    } catch (e) {
      return null;
    }
  };

  /* ───────────────────────────── silent marker ─────────────────────────── */

  const readSilentMarker = () => {
    try {
      const raw = storeGet(KEY_SILENT);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  const writeSilentMarker = (phase) =>
    storeSet(KEY_SILENT, JSON.stringify({ phase: phase, at: Date.now() }));

  /* ────────────────────────────── token state ──────────────────────────── */

  const getRefreshToken = () => storeGet(KEY_REFRESH);

  const clearTokens = () => {
    accessToken = null;
    accessTokenExpiresAt = 0;
    idToken = null;
    claims = null;
    storeDel(KEY_REFRESH);
  };

  /*
   * Trade the Indexx ID session for an ESTATE token.
   *
   * The estate signs and verifies HS256 with a shared secret; this provider
   * issues RS256 only. So the token from /token is NOT something the shared
   * backend accepts — a product that just checks for the presence of
   * `access_token` looks signed in and 401s on its first real call. The IdP's
   * /session/legacy mints a genuine estate token for the session we already
   * hold, and that is what belongs in a product's session store.
   *
   * Best-effort: a product on its own backend (Wall Street) needs nothing from
   * this, and a failure here must never undo a sign-in that did succeed.
   */
  const applyEstateSession = async () => {
    let estate = null;
    try {
      /* The cookie rides along for same-site products, but it is SameSite=Lax
         and this is an XHR, so it never arrives from a product on a foreign
         registrable domain. Send the access token we were handed moments ago
         as well: adoptTokenResponse() has already run at both call sites, so
         it is always present here, and the provider accepts either. Without
         it, Bitcoin Yay, EMMM and the rest got a 401 and rendered signed-out
         while holding a valid OIDC session. */
      const r = await fetch(issuer + "/session/legacy", {
        method: "POST",
        credentials: "include",
        headers: accessToken ? { Authorization: "Bearer " + accessToken } : {},
      });
      if (r.ok) estate = await r.json();
    } catch (_) {
      /* offline, CORS, provider down — leave the IdP session as it is */
    }
    const usable = Boolean((estate && estate.access_token) || idToken);
    if (!usable) return null;

    if (estate && estate.access_token && bridgeLegacyKeys && isBrowser()) {
      try {
        window.localStorage.setItem("access_token", estate.access_token);
        if (estate.refresh_token) {
          window.localStorage.setItem("refresh_token", estate.refresh_token);
        }
        if (estate.email) {
          window.localStorage.setItem("email", estate.email);
          window.localStorage.setItem("user", estate.email);
        }
        if (estate.username) window.localStorage.setItem("username", estate.username);
        if (estate.userType) window.localStorage.setItem("userType", estate.userType);
      } catch (_) {
        /* private mode — the client still works in memory */
      }
    }

    if (onSession) {
      try {
        /*
         * Estate fields when there are any, plus the OIDC id_token always.
         * Products on the shared backend want the estate token; a product with
         * its own backend wants the id_token, which it verifies against this
         * provider's JWKS and trades for a session of its own. One payload
         * serves both rather than two hooks that mostly overlap.
         */
        /*
         * Awaited: a product may need a round trip of its own here — Wall
         * Street trades the id_token for a session from its own backend — and
         * the reload below would otherwise cut that request off mid-flight.
         */
        await onSession(Object.assign({}, estate || {}, { idToken: idToken, claims: claims }));
      } catch (_) {
        /* a product's own store must never take sign-in down */
      }
    }

    /*
     * One reload, the first time a session appears on this page.
     *
     * Every product reads its session from localStorage while its header is
     * mounting. This token arrives after that — a silent sign-in is a network
     * round trip — so the header has already painted "Login" against storage
     * that was empty a moment ago, and nothing tells it to look again. The
     * session is real; only the render is stale.
     *
     * Reloading is blunt, but it is the one remedy that does not require each
     * of eight products to subscribe to a new event. The guard is the important
     * part: a marker written BEFORE the reload, and read back to confirm it
     * stuck, because a reload that cannot remember it has happened is an
     * infinite loop — which this codebase has already paid for once.
     */
    if (isBrowser() && !storeGet(KEY_HYDRATED)) {
      if (storeSet(KEY_HYDRATED, String(Date.now()))) {
        window.location.reload();
      }
    }
    return estate;
  };

  const adoptTokenResponse = (data, expectedNonce) => {
    if (!data || !data.access_token) throw new Error("zodiacAuth: bad token response");

    if (data.id_token) {
      const next = decodeJwtClaims(data.id_token);
      /*
       * Nonce binding. The nonce was minted in this tab and sent up with the
       * authorization request; an id_token that does not carry it back is one
       * that was minted for some other flow and injected into ours. Reject it
       * rather than render someone else's identity.
       *
       * iss/aud are checked for the same reason at a coarser grain: they catch
       * a misconfigured issuer or a token meant for a different product. The
       * provider remains the authority; this is a cheap sanity gate.
       */
      if (!next) throw new Error("zodiacAuth: unreadable id_token");
      if (expectedNonce && next.nonce !== expectedNonce) {
        throw new Error("zodiacAuth: id_token nonce mismatch");
      }
      if (next.iss && next.iss.replace(/\/+$/, "") !== issuer) {
        throw new Error("zodiacAuth: id_token issuer mismatch");
      }
      const aud = Array.isArray(next.aud) ? next.aud : [next.aud];
      if (next.aud && aud.indexOf(clientId) === -1) {
        throw new Error("zodiacAuth: id_token audience mismatch");
      }
      idToken = data.id_token;
      claims = next;
    }

    accessToken = data.access_token;

    /*
     * Bridge into the keys each product's own header already reads.
     *
     * Every product decides "am I signed in?" by looking for `access_token` and
     * `email` in localStorage — that predates Indexx ID and is wired through
     * dozens of components per repo. Rewriting all of that is the migration;
     * writing the same keys here is what lets a product's EXISTING header,
     * account menu and Login/Logout work unchanged the moment it starts using
     * the IdP. Without this, a user is signed in as far as the provider is
     * concerned and signed out as far as the product's own UI is concerned.
     *
     * This is deliberately a compatibility shim. It goes away when the products
     * read their session from this client instead of from localStorage, and it
     * is the reason both systems can be live at once without either breaking.
     */
    if (bridgeLegacyKeys && isBrowser()) {
      try {
        window.localStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          window.localStorage.setItem("refresh_token", data.refresh_token);
        }
        const c = claims || decodeJwtClaims(data.access_token) || {};
        if (c.email) {
          window.localStorage.setItem("email", c.email);
          window.localStorage.setItem("user", c.email);
        }
        if (c.preferred_username || c.name) {
          window.localStorage.setItem("username", c.preferred_username || c.name);
        }
      } catch (_) {
        /* private mode or blocked storage — the client still works in memory */
      }
    }

    // Trust the server's expires_in over a parsed `exp`: it needs no clock
    // agreement between the browser and the IdP, only elapsed time here.
    const lifetimeMs = Number(data.expires_in) > 0 ? Number(data.expires_in) * 1000 : 0;
    if (lifetimeMs) {
      accessTokenExpiresAt = Date.now() + lifetimeMs;
    } else {
      const ac = decodeJwtClaims(data.access_token);
      accessTokenExpiresAt = ac && ac.exp ? ac.exp * 1000 : Date.now() + 60 * 1000;
    }

    if (data.refresh_token) {
      // Rotation: the old one is already dead server-side, so overwrite it.
      storeSet(KEY_REFRESH, data.refresh_token);
    }

    status = "authenticated";
  };

  /**
   * All token-endpoint traffic. `credentials: "omit"` on purpose — this request
   * is authenticated by the PKCE verifier or the refresh token in the body, and
   * sending the IdP's session cookie along would only widen the CSRF surface.
   */
  const postForm = async (url, fields) => {
    const body = new URLSearchParams();
    Object.keys(fields).forEach((k) => {
      if (fields[k] != null) body.set(k, fields[k]);
    });

    const res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: body.toString(),
    });

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }

    if (!res.ok) {
      // Surface only the OAuth error CODE. error_description can echo back
      // provider-side detail, and this object ends up in product error toasts.
      const err = new Error("zodiacAuth: token request failed");
      err.oauthError = (data && data.error) || "invalid_request";
      throw err;
    }
    return data;
  };

  /* ─────────────────────────────── redirects ───────────────────────────── */

  const sameOriginOrNull = (url) => {
    // returnTo is written by us from location.href, so it is same-origin by
    // construction — but it round-trips through storage, and anything that
    // round-trips through storage gets re-validated before it reaches a
    // navigation. Cheap insurance against an open redirect.
    try {
      const parsed = new URL(url, window.location.href);
      if (parsed.origin !== window.location.origin) return null;
      /*
       * And strip the OAuth callback params. returnTo can be captured ON the
       * callback route — a layout-level silentSignIn() racing handleCallback()
       * sees a URL that still carries ?code=&state= — and every caller feeds
       * this value straight into location.replace(). Handing it back would put
       * the authorization code right back into the address bar and the session
       * history that handleCallback's `finally` just scrubbed it out of.
       */
      CALLBACK_PARAMS.forEach((p) => parsed.searchParams.delete(p));
      return parsed.href;
    } catch (e) {
      return null;
    }
  };

  /**
   * Build the /authorize URL, persisting the PKCE verifier + nonce keyed by
   * state. Returns null if the guard state could not be persisted — see the
   * comment inside; that case must NOT navigate.
   */
  const buildAuthorizeUrl = async (extra) => {
    const state = randomToken();
    const nonce = randomToken();
    const verifier = randomToken();
    const challenge = await sha256Base64url(verifier);

    sweepStaleTransactions();

    const stored = storeSet(
      KEY_TX + state,
      JSON.stringify({
        verifier: verifier,
        nonce: nonce,
        createdAt: Date.now(),
        silent: Boolean(extra && extra.silent),
        // Sanitised on the way IN as well as out, so a used code is not sitting
        // in sessionStorage waiting for the next reader either.
        returnTo:
          sameOriginOrNull((extra && extra.returnTo) || window.location.href) ||
          window.location.origin + "/",
      })
    );
    /*
     * No verifier survives the redirect => the code can never be redeemed, and
     * for a silent attempt the anti-loop marker would not survive either. In
     * both cases navigating would strand or loop the user. Refuse instead.
     */
    if (!stored) return null;

    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      state: state,
      nonce: nonce,
      code_challenge: challenge,
      code_challenge_method: "S256",
    });
    if (extra && extra.prompt) params.set("prompt", extra.prompt);
    if (extra && extra.loginHint) params.set("login_hint", extra.loginHint);
    // The handoff from the product's own login form — see adoptLocalSession.
    if (extra && extra.adoptCode) params.set("adopt_code", extra.adoptCode);

    return endpoints.authorize + "?" + params.toString();
  };

  /** replace, never assign: the pre-redirect URL should not be a Back target. */
  const navigate = (url) => {
    window.location.replace(url);
  };

  /* ────────────────────────────── public API ───────────────────────────── */

  /**
   * Strip the OAuth params out of the address bar with replaceState, so the
   * authorization code never sits in history, in a bookmark, or in a Referer
   * header on the next outbound request. Any params the product itself put
   * there are preserved.
   */
  const cleanUrl = () => {
    try {
      const url = new URL(window.location.href);
      let touched = false;
      CALLBACK_PARAMS.forEach((p) => {
        if (url.searchParams.has(p)) {
          url.searchParams.delete(p);
          touched = true;
        }
      });
      if (!touched) return;
      const qs = url.searchParams.toString();
      window.history.replaceState(
        null,
        "",
        url.pathname + (qs ? "?" + qs : "") + url.hash
      );
    } catch (e) {
      /* history unavailable — the URL is cosmetic at this point */
    }
  };

  const isAccessTokenFresh = () =>
    Boolean(accessToken) && Date.now() < accessTokenExpiresAt - REFRESH_MARGIN_MS;

  /**
   * Exchange the stored refresh token for a new set. Single-flight: ten
   * components calling getAccessToken() on the same render must not fire ten
   * rotations, because the provider treats a replayed refresh token as theft
   * and revokes the entire family.
   */
  const refreshTokens = () => {
    if (refreshPromise) return refreshPromise;

    const rt = getRefreshToken();
    if (!rt) return Promise.resolve(null);

    refreshPromise = postForm(endpoints.token, {
      grant_type: "refresh_token",
      refresh_token: rt,
      client_id: clientId,
    })
      .then(async (data) => {
        adoptTokenResponse(data, null); // no nonce on a refresh; there was no new authz
        await applyEstateSession();
        return accessToken;
      })
      .catch((err) => {
        /*
         * A refresh that fails is terminal for this session: the token was
         * expired, revoked, or reuse was detected and the family was killed.
         * Drop local state and report signed out. Do NOT auto-redirect to
         * /authorize from here — that is the other half of the loop.
         */
        clearTokens();
        status = "anonymous";
        if (err && err.oauthError === "invalid_grant") return null;
        return null;
      })
      .then((result) => {
        refreshPromise = null;
        return result;
      });

    return refreshPromise;
  };

  /**
   * Interactive sign-in. Full top-level redirect — never a popup (blocked by
   * default on several of these products' mobile web views) and never an
   * iframe (the IdP sets frame-ancestors, and third-party cookies are gone).
   */
  const signIn = async (args) => {
    if (!isBrowser()) return;
    /*
     * prompt=none belongs to silentSignIn, which owns the anti-loop guard.
     * Routed here instead it would bypass the marker entirely: a product that
     * calls signIn() from a render effect would go no session → login_required
     * → render → signIn() → ... forever. Delegate rather than downgrade.
     */
    if (args && args.prompt === "none") {
      await silentSignIn();
      return;
    }
    if (!hasSubtleCrypto()) {
      throw new Error("zodiacAuth: a secure context (https) is required to sign in");
    }
    const url = await buildAuthorizeUrl({
      silent: false,
      returnTo: (args && args.returnTo) || window.location.href,
      loginHint: args && args.loginHint,
      prompt: args && args.prompt,
    });
    if (!url) throw new Error("zodiacAuth: browser storage is unavailable");
    navigate(url);
  };

  /**
   * The silent session check. Resolves — it does not throw — because it runs on
   * page load in four products and must never take a render down.
   *
   * Resolves one of:
   *   { status: "authenticated" }  session restored from a refresh token
   *   { status: "redirecting" }    navigation to prompt=none has been started
   *   { status: "anonymous", reason }  gave up; render signed-out UI
   */
  const silentSignIn = async () => {
    if (!isBrowser()) return { status: "unknown", reason: "server" };

    if (isAccessTokenFresh()) return { status: "authenticated" };

    // Cheapest path first: a refresh token in this tab means no redirect at all.
    if (getRefreshToken()) {
      const token = await refreshTokens();
      if (token) return { status: "authenticated" };
    }

    /* ── the anti-loop guard ──────────────────────────────────────────────
     *
     * Three independent conditions each stop a second attempt, because the
     * consequence of getting this wrong is every page in the estate reloading
     * forever for signed-out users:
     *
     *  1. `silentAttemptedThisLoad` — one attempt per page load, full stop.
     *  2. marker.phase === "none"   — the IdP already answered login_required
     *                                 in this tab, recently. Believe it.
     *  3. marker.phase === "pending" — we started an attempt and are back here
     *     WITHOUT having completed a callback. That is the dangerous case: the
     *     round trip broke somewhere (IdP down, redirect landed on a page that
     *     never ran handleCallback, user hit Back). Left unhandled it is a
     *     perfect loop, so a stranded "pending" is downgraded to "none" and
     *     treated as a failed attempt rather than retried.
     */
    if (silentAttemptedThisLoad) {
      return { status: status === "authenticated" ? "authenticated" : "anonymous", reason: "already_attempted" };
    }

    const marker = readSilentMarker();
    if (marker && marker.phase === "pending") {
      silentAttemptedThisLoad = true;
      writeSilentMarker("none");
      status = "anonymous";
      return { status: "anonymous", reason: "incomplete_attempt" };
    }
    /*
     * Arriving from another site is itself a reason to re-check.
     *
     * A "no session" marker only records that the IdP said login_required at
     * some earlier moment ON THIS ORIGIN. It cannot know that the user has since
     * signed in on a DIFFERENT product — sessionStorage is per-origin, so there
     * is no way for that product to tell this one. But a cross-origin referrer
     * means the user just navigated here from somewhere else, which is exactly
     * when the stale answer is most likely to be wrong. Re-check, and let the
     * once-per-load guard keep it from looping.
     *
     * This is what makes "sign in on any product, then move freely" work rather
     * than only ever working outward from whichever product you started on.
     */
    const arrivedFromElsewhere = (() => {
      try {
        if (!document.referrer) return false;
        return new URL(document.referrer).origin !== window.location.origin;
      } catch (_) {
        return false;
      }
    })();

    if (
      marker &&
      marker.phase === "none" &&
      !arrivedFromElsewhere &&
      Date.now() - Number(marker.at || 0) < silentCooldownMs
    ) {
      silentAttemptedThisLoad = true;
      status = "anonymous";
      return { status: "anonymous", reason: "no_session" };
    }

    if (!hasSubtleCrypto()) {
      silentAttemptedThisLoad = true;
      status = "anonymous";
      return { status: "anonymous", reason: "insecure_context" };
    }

    // Mark BEFORE building or navigating. If this write does not stick there is
    // no guard, and without a guard we must not fire the redirect at all.
    silentAttemptedThisLoad = true;
    if (!writeSilentMarker("pending")) {
      status = "anonymous";
      return { status: "anonymous", reason: "storage_unavailable" };
    }

    let url = null;
    try {
      url = await buildAuthorizeUrl({ silent: true, prompt: "none" });
    } catch (e) {
      url = null;
    }
    if (!url) {
      writeSilentMarker("none");
      status = "anonymous";
      return { status: "anonymous", reason: "storage_unavailable" };
    }

    navigate(url);
    return { status: "redirecting" };
  };

  /**
   * Run this on the callback route (and it is harmless anywhere else — it
   * returns { status: "no_callback" } when the URL carries no OAuth params).
   *
   * Resolves:
   *   { status: "authenticated", user, returnTo, silent }
   *   { status: "anonymous", reason }   includes the login_required verdict
   *   { status: "no_callback" }
   */
  const handleCallback = () => {
    /*
     * Single-flight, for the same reason refreshTokens() is.
     *
     * The authorization response is consume-once on BOTH sides: the state
     * transaction is deleted as soon as it is read, and the provider burns the
     * code on first presentation. So a second concurrent call cannot succeed —
     * it finds no transaction, fails, and resolves "anonymous". That is not a
     * harmless duplicate: callers navigate away on whatever resolves first
     * (`location.replace(result.returnTo)`), so the loser's redirect aborts the
     * winner's in-flight token exchange and the sign-in is silently lost.
     *
     * React 18's StrictMode invokes effects twice in development, which is
     * exactly this shape — it is why the two CRA products never completed a
     * sign-in locally while the two Next ones did. Handing both callers the
     * same promise makes the second invocation a no-op that observes the first
     * one's result.
     */
    if (callbackPromise) return callbackPromise;
    callbackPromise = runCallback();
    return callbackPromise;
  };

  const runCallback = async () => {
    if (!isBrowser()) return { status: "unknown", reason: "server" };

    let params;
    try {
      params = new URLSearchParams(window.location.search);
    } catch (e) {
      return { status: "no_callback" };
    }

    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");
    if (!code && !error) return { status: "no_callback" };

    /*
     * State is validated and consumed BEFORE anything else happens, on the
     * error path as well as the success path. Without it an attacker can drop
     * their own `code` (or a forged `error`) on this URL and have the victim's
     * browser redeem it — the classic authorization-code CSRF. No matching
     * transaction in this tab means the response did not come from a flow we
     * started, so it gets dropped on the floor.
     */
    const tx = state ? takeTransaction(state) : null;
    if (!tx) {
      cleanUrl();
      // A silent attempt that ends here still counts as attempted; leaving the
      // marker "pending" would otherwise strand the next load.
      if (readSilentMarker()) writeSilentMarker("none");
      status = status === "authenticated" ? status : "anonymous";
      return { status: "anonymous", reason: "invalid_state" };
    }

    const returnTo = sameOriginOrNull(tx.returnTo);

    if (error) {
      cleanUrl();
      /*
       * `login_required` is the expected, boring answer to prompt=none: no IdP
       * session. Record it so silentSignIn stops asking — this write is what
       * actually terminates the redirect loop.
       */
      writeSilentMarker("none");
      silentAttemptedThisLoad = true;
      status = "anonymous";
      return {
        status: "anonymous",
        reason: error === "login_required" ? "no_session" : "authorize_failed",
        silent: Boolean(tx.silent),
        returnTo: returnTo,
      };
    }

    try {
      const data = await postForm(endpoints.token, {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri, // must byte-match the authorize request
        client_id: clientId,
        code_verifier: tx.verifier, // the verifier is consumed here and now gone
      });
      adoptTokenResponse(data, tx.nonce);
      await applyEstateSession();
      storeDel(KEY_SILENT); // signed in: the loop guards have nothing left to guard
      storeDel(KEY_ADOPT);
      storeDel(KEY_LINK);   // a session exists; nothing is waiting to be linked
      return {
        status: "authenticated",
        user: claims,
        returnTo: returnTo,
        silent: Boolean(tx.silent),
      };
    } catch (e) {
      clearTokens();
      writeSilentMarker("none");
      silentAttemptedThisLoad = true;
      status = "anonymous";
      // Deliberately generic: the exchange can fail because the code expired,
      // was replayed, or never belonged to us, and the UI must not be able to
      // tell those apart.
      return { status: "anonymous", reason: "exchange_failed", returnTo: returnTo };
    } finally {
      // Always, even on failure: an authorization code must not linger in the
      // address bar or in the session history.
      cleanUrl();
    }
  };

  /** Current access token, refreshed if it is at or near expiry. Null if signed out. */
  const getAccessToken = async () => {
    if (!isBrowser()) return null;
    if (isAccessTokenFresh()) return accessToken;
    const refreshed = await refreshTokens();
    if (refreshed) return refreshed;
    // A still-valid-but-inside-the-margin token beats nothing if the refresh
    // endpoint is unreachable; the resource server is the final judge anyway.
    if (accessToken && Date.now() < accessTokenExpiresAt) return accessToken;
    return null;
  };

  /**
   * RP-initiated logout: kill the refresh family here, then send the browser to
   * the IdP so the first-party session cookie dies too. Skipping the second
   * step would leave the user silently signed back in on the next page load.
   */
  /**
   * Adopt a session the product established through its own login form.
   *
   * The product's login UI is untouched — users see exactly the screen they
   * always have. When it succeeds it writes `access_token` to localStorage as
   * it always did; this hands that token to the IdP, which verifies it and
   * opens an IdP session. From then on every OTHER product's silent re-auth
   * finds that session and signs the user in without a prompt.
   *
   * How the session actually lands in the browser depends on where this
   * product lives — a cookie when we share the provider's registrable domain,
   * a top-level handoff navigation when we do not. The long comment inside
   * explains why that difference is not optional.
   *
   * Runs at most once per local token, and only when there is no provider
   * session yet — so it costs one request on the page right after login and
   * nothing thereafter.
   */
  /*
   * Latched on the TOKEN, not on "have I run".
   *
   * This used to be a once-per-page-load boolean, which quietly broke the case
   * it exists for: the launcher calls adopt when it mounts, the user is signed
   * out at that moment, so it bails with nothing to adopt — and burns the
   * latch. The user then logs in with the product's own form, a token appears
   * in localStorage seconds later, and nothing ever looks again. Signing in on
   * EMMM therefore stayed on EMMM.
   *
   * Keyed by value, a token that appears later gets its own attempt, while the
   * same token is never retried — which is the property the boolean was really
   * there to provide.
   */
  /*
   * SETTLED, not attempted.
   *
   * This used to be assigned before the fetch, which quietly meant "we tried
   * once, never look again". A network blip, a provider restart, a tab that
   * woke up offline — any of them burned the token for the rest of the page
   * load, and the user stayed signed in here and nowhere else. It is now set
   * only when the provider actually ANSWERED: adopted, or refused in a way
   * that retrying cannot change. A failure we could not interpret leaves it
   * null so the next moment (the switcher, the next page) tries again.
   */
  let adoptedToken = null;

  /*
   * Single-flight, keyed on the token. The launcher fires adopt at three
   * moments and a product may add a fourth by calling sessionStarted(); two of
   * those landing together must not become two POSTs and two navigations.
   * Concurrent callers for the same token observe the first one's result.
   */
  let adoptInFlight = null;

  /*
   * The handoff navigates the whole page, so it needs its own loop guard for
   * exactly the reason silentSignIn has one. If the round trip breaks anywhere
   * — the callback route never ran, storage was cleared, the user hit Back —
   * we come back to a page that still has the same local token and no provider
   * tokens, and would hand off again, and again. One handoff per browser
   * session per cooldown window; a successful sign-in clears it.
   */
  const adoptHandoffAllowed = () => {
    const at = Number(storeGet(KEY_ADOPT) || 0);
    return !(at > 0 && Date.now() - at < silentCooldownMs);
  };
  const markAdoptHandoff = () => storeSet(KEY_ADOPT, String(Date.now()));

  /**
   * Spend a handoff code on a TOP-LEVEL navigation to /authorize.
   *
   * ── Why a navigation and not another fetch ───────────────────────────────
   *
   * For every product on a foreign registrable domain — bitcoinyay.com,
   * eenymeenyminymoe.io, aiainai.ai, yaysapp.com, shoperpal.com,
   * wallstreetindexx.com — the call that produced this code was a CROSS-SITE
   * XHR, and a SameSite=Lax cookie cannot be SET by one: the browser discards
   * the Set-Cookie without comment. The provider created the session and this
   * browser kept nothing pointing at it. That is why signing in on EMMM used
   * to sign you in on EMMM alone.
   *
   * Navigating there makes the request first-party, so the cookie is set
   * normally and the flow continues exactly as it does everywhere else.
   *
   * prompt=none, because the user is already signed in HERE: if the handoff
   * fails for any reason the provider must answer and get out of the way,
   * never render a login form over the page they are looking at.
   *
   * @returns {Promise<boolean>} true if a navigation was started.
   */
  const spendAdoptCode = async (code) => {
    if (!isBrowser() || typeof code !== "string" || !code) return false;
    // Guard first, and only navigate if it stuck: a page that can navigate but
    // cannot remember that it did is the loop itself.
    if (!adoptHandoffAllowed() || !markAdoptHandoff()) return false;

    let url = null;
    try {
      url = await buildAuthorizeUrl({ silent: true, prompt: "none", adoptCode: code });
    } catch (_) {
      url = null;
    }
    if (!url || !writeSilentMarker("pending")) return false;

    silentAttemptedThisLoad = true;
    navigate(url);
    return true;
  };

  /**
   * Hand the provider a credential and take the session back.
   *
   * `post` is the whole request; it differs between the estate-token route
   * (/session/adopt) and the product-signed route (/session/federate), but
   * everything after the response is identical, so it lives here once.
   */
  const runHandoff = async (post) => {
    const r = await post();
    // 4xx is an ANSWER: this credential is not adoptable and re-sending it
    // will not change that. 5xx and a thrown fetch are not answers.
    if (!r.ok) return { settled: r.status >= 400 && r.status < 500, ok: false };

    let code = null;
    try {
      const data = await r.json();
      if (data && typeof data.adopt_code === "string") code = data.adopt_code;
    } catch (_) {
      code = null;
    }

    if (await spendAdoptCode(code)) return { settled: true, ok: true };

    /*
     * No code (an older provider), or the handoff could not be guarded. Fall
     * back to the original path: the cookie is all a same-site product ever
     * needed, and silentSignIn picks it up through the normal flow so this
     * client ends up holding provider-issued tokens rather than the legacy one.
     */
    await silentSignIn();
    return { settled: true, ok: true };
  };

  const adoptLocalSession = async () => {
    if (!isBrowser()) return false;

    let local = null;
    try {
      local = window.localStorage.getItem("access_token");
    } catch (_) {
      return false;
    }
    if (!local) return false;
    if (local === adoptedToken) return false;
    if (adoptInFlight && adoptInFlight.token === local) return adoptInFlight.promise;
    // Already signed in through the provider — nothing to adopt.
    if (isAccessTokenFresh() || getRefreshToken()) return false;

    const attempt = (async () => {
      try {
        const result = await runHandoff(() =>
          fetch(issuer + "/session/adopt", {
            method: "POST",
            headers: { "content-type": "application/json" },
            // Lets the response set its cookie, which works only when this
            // product and the provider share a registrable domain. The code in
            // the body is what covers the case where it does not.
            credentials: "include",
            body: JSON.stringify({ access_token: local, client_id: clientId }),
          })
        );
        if (result.settled) adoptedToken = local;
        return result.ok;
      } catch (_) {
        // Never answered. Leave the token unlatched so a later moment retries.
        return false;
      }
    })();

    adoptInFlight = { token: local, promise: attempt };
    try {
      return await attempt;
    } finally {
      if (adoptInFlight && adoptInFlight.promise === attempt) adoptInFlight = null;
    }
  };

  /*
   * Products that sign their OWN sessions — Wall Street and ShoperPal — have no
   * estate token to adopt. They hand the provider their own and it verifies
   * with them directly, through /session/federate. That route had the SAME
   * cross-site Set-Cookie problem and the same fix, so the response is handled
   * by the same code above.
   *
   * `donate` is the product's own function; it returns the provider's JSON.
   */
  let donatedThisLoad = false;
  const donateProductSession = async (donate) => {
    if (!isBrowser() || typeof donate !== "function") return false;
    if (donatedThisLoad) return false;
    if (isAccessTokenFresh() || getRefreshToken()) return false;
    donatedThisLoad = true;
    try {
      const data = await donate();

      /*
       * ── The refusal that needs a person, not a retry ──────────────────────
       *
       * The provider answers 409 `account_exists` when an Indexx account
       * already uses this email and the donating product does not verify email
       * addresses at signup. Wall Street and ShoperPal both create an account
       * from an address and a password with no confirmation step, so donating
       * would hand over an estate account this product never proved the person
       * owns. Refusing is correct and must stay correct.
       *
       * But it is not a dead end, and everyone treated it as one: the call
       * returned, nothing happened, and the user was told nothing. The way out
       * is for the person to prove the Indexx identity ONCE, by signing in with
       * it — after which this product's own /api/auth/indexx bridge records the
       * subject and every future donation is proven rather than asserted.
       *
       * So remember it, and let the launcher offer that sign-in where the user
       * is already standing: in the switcher, at the moment they try to move.
       * Doing it automatically would throw someone off the page they are on to
       * a login screen they did not ask for.
       */
      if (data && data.error === "account_exists") {
        storeSet(KEY_LINK, String(Date.now()));
        return false;
      }

      // A product on an older build returns true/undefined and relies on its
      // cookie; one that knows about the handoff returns the provider's body.
      const code = data && typeof data.adopt_code === "string" ? data.adopt_code : null;
      if (await spendAdoptCode(code)) return true;
      await silentSignIn();
      return true;
    } catch (_) {
      donatedThisLoad = false; // never answered — let a later moment retry
      return false;
    }
  };

  /**
   * True when this product's session could not be linked automatically and the
   * person needs to sign in with Indexx once. See donateProductSession.
   */
  const linkRequired = () => {
    if (!isBrowser()) return false;
    if (isAccessTokenFresh() || getRefreshToken()) return false;
    return Boolean(storeGet(KEY_LINK));
  };

  /** Clear it once a session exists — the link is no longer outstanding. */
  const clearLinkRequired = () => storeDel(KEY_LINK);

  /**
   * Call this the moment YOUR OWN login succeeds.
   *
   * The launcher adopts at three moments — when it mounts, when the switcher is
   * opened, and when leaving for another product. None of them is "the user
   * just signed in", so a product that logs in without reloading (a modal that
   * closes, a client-side route change) stayed signed in locally and nowhere
   * else until the user happened to touch the switcher. Products that hard
   * reload after login never noticed, which is why this gap survived.
   *
   * Safe to call more than once and safe to call before the token is written:
   * it is the same single-flight adopt the launcher uses.
   */
  const sessionStarted = async () => adoptLocalSession();

  const signOut = async (args) => {
    if (!isBrowser()) return;

    /* Clear the bridged keys too. Revoking at the provider but leaving these
       behind would leave every product's own header insisting you are still
       signed in — the exact split-brain the bridge exists to avoid. */
    if (bridgeLegacyKeys) {
      try {
        ["access_token", "refresh_token", "email", "user", "username", "shortToken"]
          .forEach((k) => window.localStorage.removeItem(k));
      } catch (_) { /* blocked storage */ }
    }

    const rt = getRefreshToken();
    if (rt) {
      try {
        // keepalive: this request must outlive the navigation below.
        await fetch(endpoints.revoke, {
          method: "POST",
          credentials: "omit",
          keepalive: true,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            token: rt,
            token_type_hint: "refresh_token",
            client_id: clientId,
          }).toString(),
        });
      } catch (e) {
        /* Best effort. A failed revoke must never trap the user signed in. */
      }
    }

    clearTokens();
    status = "anonymous";
    /*
     * Leave the marker as "none" rather than clearing it: the user just asked
     * to be signed out, so the very next page load must not spend a prompt=none
     * redirect discovering that.
     */
    writeSilentMarker("none");
    silentAttemptedThisLoad = true;
    /*
     * The handoff guard, though, IS cleared: signing out and back in through
     * the product's own form is a fresh start, and must not be blocked by a
     * cooldown left over from the session that just ended.
     */
    storeDel(KEY_ADOPT);
    storeDel(KEY_LINK);

    const params = new URLSearchParams({ client_id: clientId });
    /*
     * Same-origin only. The provider also enforces an exact-match allowlist
     * (endSession.js), but an RP must not forward an off-origin URI it was
     * handed by its own caller: doing so turns every product into a probe
     * against the logout registry, and one registry mistake into a phishing
     * hop off a genuine Indexx domain. Fall back to our own root.
     */
    const postLogout =
      sameOriginOrNull((args && args.returnTo) || window.location.origin + "/") ||
      window.location.origin + "/";
    params.set("post_logout_redirect_uri", postLogout);
    /*
     * No `id_token_hint`. It is permitted by the spec, but it puts a signed
     * token in a URL — Referer, browser history, proxy and access logs — and
     * client_id is enough for this provider to identify the RP.
     */
    navigate(endpoints.endSession + "?" + params.toString());
  };

  /** Decoded id_token claims, or null. Display data — never an authz decision. */
  const getUser = () => (claims ? claims : null);

  /**
   * Lets a caller render "signed out" instead of a spinner that flashes.
   * `status === "unknown"` means nothing authoritative has happened yet, which
   * is the only state in which a loading placeholder is honest.
   */
  const hasAttemptedSilentSignIn = () => {
    if (silentAttemptedThisLoad) return true;
    if (!isBrowser()) return false;
    const marker = readSilentMarker();
    return Boolean(marker && marker.phase === "none");
  };

  const getStatus = () => status;

  return {
    silentSignIn: silentSignIn,
    signIn: signIn,
    handleCallback: handleCallback,
    getAccessToken: getAccessToken,
    /** The OIDC id_token, for a product federating it to its own backend. */
    getIdToken: () => idToken,
    signOut: signOut,
    adoptLocalSession: adoptLocalSession,
    /** Call right after YOUR OWN login succeeds. See sessionStarted. */
    sessionStarted: sessionStarted,
    /** Used by the launcher for products that sign their own sessions. */
    donateProductSession: donateProductSession,
    /** True when the person must sign in with Indexx once to link. */
    linkRequired: linkRequired,
    clearLinkRequired: clearLinkRequired,
    getUser: getUser,
    hasAttemptedSilentSignIn: hasAttemptedSilentSignIn,
    getStatus: getStatus,
    /** Why the last silent attempt did what it did. Diagnostics only. */
    debug: () => ({
      status: status,
      attemptedThisLoad: silentAttemptedThisLoad,
      marker: readSilentMarker(),
      hasLocalToken: (() => { try { return !!window.localStorage.getItem("access_token"); } catch (_) { return null; } })(),
      hasRefresh: !!getRefreshToken(),
      accessFresh: isAccessTokenFresh(),
      secureContext: hasSubtleCrypto(),
      issuer: issuer,
      clientId: clientId,
      redirectUri: redirectUri,
    }),
  };
}

export default createAuth;
