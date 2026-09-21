/* Copied from indexx-exchange-backend/zodiac-embed/ (fingerprint 7df908509e1c) — edit the source there, not here. */
"use client";
/*
 * Client component: this reads window, holds state and portals to <body>.
 * The pages-router and CRA products never needed the directive; Bitcoin Yay,
 * EMMM and ShoperPal are App Router, where a component without it is rendered
 * on the server and every hook in here is a build error.
 */
/*
 * Zodiac — the ecosystem switcher and Dashboard link.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ SOURCE OF TRUTH: zodiac-embed/ at the workspace root.                    │
 * │ Copied into each product repo by zodiac-embed/sync.sh. Do NOT edit a     │
 * │ copy — change the source and re-sync, or the eight drift apart.          │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Ported from the approved Zodiac demo (zodiac-frontend), which is reference
 * only. Two exports, because the bar wants them in different places:
 *
 *   <ZodiacLauncher />      the nine-oval grid + the word + the panel   (LEFT)
 *   <ZodiacDashboardLink /> the Dashboard link                         (RIGHT)
 *
 * ── Why no framework ───────────────────────────────────────────────────────
 *
 * The four Phase 1 repos disagree on everything: two CRA 4 with MUI/Ant, two
 * Next 13 with Bootstrap, none with Tailwind, ported from a Tailwind 4 / React
 * 19 demo. So this brings nothing with it — React 18 hooks, plain <a>, and one
 * CSS module. Cross-product links are external URLs anyway, so a router would
 * buy nothing even where one exists.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createAuth } from "./zodiacAuth";
import s from "./zodiac-launcher.module.css";

/**
 * Measured by fitting an ellipse to the Bitcoin Yay coin artwork, not eyeballed.
 * Every oval in the ecosystem uses it, including the nine in the grid.
 */
const OVAL_ANGLE = -38.4;

const GROUPS = [
  { id: "earn", label: "Earn" },
  { id: "trade", label: "Trade" },
  { id: "play", label: "Play" },
  { id: "spend", label: "Spend" },
  { id: "build", label: "Build" },
];

/**
 * Bundled fallback registry. The live list comes from /api/v1/zodiac/config so
 * a seventeenth product is one backend change rather than four redeploys; this
 * exists only so a product's header never goes blank when that call fails.
 *
 * `logoBare` is the light variant for marks that are black line art — Wall
 * Street and ReHuman are invisible on a dark panel otherwise.
 */
const FALLBACK_PRODUCTS = [
  { id: "btcy",       name: "Bitcoin Yay",         group: "earn",  href: "https://bitcoinyay.com" },
  { id: "yaysapp",    name: "YaysApp",             group: "earn",  href: "https://yaysapp.com" },
  { id: "academy",    name: "Academy",             group: "earn",  href: "https://academy.indexx.ai" },
  { id: "exchange",   name: "Exchange",            group: "trade", href: "https://cex.indexx.ai" },
  { id: "treasury",   name: "Crypto Treasury",     group: "trade", href: "https://cex.indexx.ai/crypto-treasury" },
  { id: "wallstreet", name: "Wall Street",         group: "trade", href: "https://wallstreet.indexx.ai" },
  { id: "xtokens",    name: "xTokens",             group: "trade", href: "https://indexx.ai/xtokens" },
  { id: "usdxx",      name: "USDXX",               group: "trade", href: "https://indexx.ai", comingSoon: true },
  { id: "emmm",       name: "Eeny Meeny Miny Moe", group: "play",  href: "https://eenymeenyminymoe.io" },
  { id: "lotto",      name: "Fantasy Lotto",       group: "play",  href: "https://lotto.indexx.ai" },
  { id: "pay",        name: "Indexx Pay",          group: "spend", href: "https://indexx.ai", comingSoon: true },
  { id: "wallet",     name: "Indexx Wallet",       group: "spend", href: "https://wallet.indexx.ai" },
  { id: "shoperpal",  name: "ShoperPal",           group: "spend", href: "https://shop.indexx.ai" },
  { id: "rehuman",    name: "ReHuman",             group: "spend", href: "https://indexx.ai", comingSoon: true },
  { id: "aiainai",    name: "ai ai N ai",          group: "build", href: "https://aiainai.ai" },
  { id: "xxemails",   name: "XXemails",            group: "build", href: "https://indexx.ai" },
];

/** Artwork filenames. The API registry carries ids, not art. */
const ART = {
  btcy:       { logo: "btcy.png" },
  yaysapp:    { logo: "yaysapp.png" },
  /* Academy's two files are named the opposite way round to every other pair
     here: "academy-light.png" is the art FOR a light background (black
     outlines, which vanish on the dark panel) and "academy.png" is the one with
     white outlines that reads on dark. Point each tone at the file that suits
     it rather than renaming art the product repos also reference. */
  academy:    { logo: "academy-light.png", logoBare: "academy.png" },
  exchange:   { logo: "exchange.png" },
  treasury:   { logo: "treasury.png" },
  wallstreet: { logo: "wallst.png", logoBare: "wallst-light.png" },
  xtokens:    { logo: "xtokens.png" },
  usdxx:      { logo: "usdxx.png" },
  /* Supplied dark-panel art, Sep 2026. The light-tone files stay as they were:
     the old marks are dark line art that muddies on the panel, these read on
     it. Both were cut from the brand pack — wallet's came as an SVG that was
     really a 4096x904 raster in a wrapper, and whose viewBox sliced 8px into
     the wordmark, so the symbol was re-cut from the artwork rather than used
     as shipped. */
  emmm:       { logo: "emmm.png", logoBare: "emmm-dark.png" },
  lotto:      { logo: "lotto.png" },
  pay:        { logo: "pay.png" },
  wallet:     { logo: "wallet.png", logoBare: "wallet-dark.png" },
  shoperpal:  { logo: "shoperpal.png" },
  rehuman:    { logo: "rehuman.png", logoBare: "rehuman-light.png" },
  aiainai:    { logo: "aiainai.png" },
  xxemails:   { logo: "xxemails.png" },
};

/**
 * Where the ecosystem API lives. CRA inlines REACT_APP_*, Next inlines
 * NEXT_PUBLIC_*, and the same file ships into both — so read both and let
 * whichever the host bundler replaced win. Wrapped because `process` does not
 * exist in every runtime, and an undefined reference here would take a
 * product's whole header down.
 */
const ENV_API_BASE = (() => {
  try {
    if (typeof process !== "undefined" && process.env) {
      return (
        process.env.NEXT_PUBLIC_ZODIAC_API ||
        process.env.REACT_APP_ZODIAC_API ||
        null
      );
    }
  } catch (_) {
    /* no process in this runtime */
  }
  return null;
})();

const DEFAULT_API_BASE = "https://api.v1.indexx.ai";
/* Local to whatever product you are on. The Dashboard lives INSIDE each repo —
   sending someone to another domain to read their own balances is the opposite
   of what the shell is for, and on the four foreign-domain products it would be
   a cross-origin hop mid-session. */
const DEFAULT_DASHBOARD = "/hub";

/* 5062, not 5060: 5060 is SIP and sits on the WHATWG blocked-port list, which
   browsers enforce — an origin there is simply unreachable from a page. */
const DEFAULT_IDP_ISSUER =
  (typeof process !== "undefined" && process.env &&
    (process.env.NEXT_PUBLIC_IDP_ISSUER || process.env.REACT_APP_IDP_ISSUER)) ||
  "http://localhost:5062";

/**
 * Carry the session across to another product.
 *
 * Each product is a separate ORIGIN — different domain in production, different
 * port locally — and localStorage is per-origin, so a session simply does not
 * travel. Logging in on indexx.ai and landing logged-out on Lotto is not a bug
 * in the switcher; it is the shared-session feature not existing yet.
 *
 * Until Indexx ID exists, the estate bridges this with a handoff token in the
 * query string, and every product already consumes it (`?signInToken=`). This
 * mirrors exactly what `indexx-welcome-page/src/components/Header_test:39`
 * already does for its own links, so the switcher behaves like the rest of the
 * estate rather than inventing a second mechanism.
 *
 * ── Known weaknesses, inherited deliberately ───────────────────────────────
 * The token rides in a query string (leaks via Referer, history and access
 * logs), lasts 8 hours, is reusable, and is bound to no audience. Those are the
 * reasons `tasks/ZODIAC-PLAN.md` replaces this with authorization-code + PKCE
 * in Phase 2. This is a bridge to make the demo honest, not the destination.
 */
const withSession = (href) => {
  try {
    if (typeof window === "undefined") return href;
    const url = new URL(href, window.location.origin);
    // Same origin already shares localStorage — nothing to hand off.
    if (url.origin === window.location.origin) return href;
    /*
     * localStorage holds STRINGS. A product that stored a missing token with
     * `setItem(key, null)` leaves the literal text "null" behind, which is
     * truthy — that is how these links ended up as `?signInToken=null`, handing
     * the next product a token it will fail to decode. Treat the placeholder
     * spellings as absent, the same allowlist habit the backend's `num()` uses.
     */
    const raw =
      window.localStorage.getItem("shortToken") ||
      window.localStorage.getItem("access_token");
    const handoff =
      typeof raw === "string" &&
      raw.trim() !== "" &&
      raw !== "null" &&
      raw !== "undefined"
        ? raw
        : null;
    if (!handoff) return href;
    url.searchParams.set("signInToken", handoff);
    return url.toString();
  } catch (_) {
    return href;
  }
};

/** Read the session the host product already stores. Never writes. */
const readToken = () => {
  try {
    return (
      window.localStorage.getItem("access_token") ||
      window.localStorage.getItem("accessToken") ||
      null
    );
  } catch (_) {
    return null;
  }
};

/**
 * The Dashboard link.
 *
 * Separate export because the bar puts the switcher hard left and this hard
 * right; one component cannot be in two places without a portal, and a portal
 * for a single link would fight the host's flex layout for no gain.
 */
export function ZodiacDashboardLink({
  dashboardUrl = DEFAULT_DASHBOARD,
  tone = "dark",
  label = "Dashboard",
}) {
  return (
    <a
      className={`${s.dash} ${tone === "light" ? s.dashLight : ""}`}
      href={withSession(dashboardUrl)}
    >
      {label}
    </a>
  );
}

/** One product row: bare mark, name, and a monospace state line. */
function Row({ product, active, note, isLive, tone, logoBase, onClose, useHandoff, onNavigate }) {
  const art = ART[product.id] || {};
  // Bare marks, no oval: on a dark panel the black line-art marks need their
  // light variant or they vanish entirely.
  const file =
    tone === "light" ? art.logo : art.logoBare || art.logo || `${product.id}.png`;

  const hint = active
    ? "you are here"
    : product.comingSoon
    ? "soon"
    : note || "explore";

  return (
    <a
      className={`${s.row} ${active ? s.rowActive : ""}`}
      href={useHandoff ? withSession(product.href) : product.href}
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        /*
         * Only a plain left click becomes a handoff. Cmd/Ctrl/Shift/Alt and the
         * middle button all mean "open this somewhere else" — swallowing those
         * to show a screen about leaving would be actively wrong, and the href
         * stays on the anchor so copy-link and open-in-new-tab keep working.
         */
        const plain =
          e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
        if (!plain || active || !onNavigate) {
          onClose();
          return;
        }
        e.preventDefault();
        onNavigate(product, e.currentTarget.href);
      }}
    >
      <span className={s.mark}>
        <img src={`${logoBase}/${file}`} alt="" aria-hidden="true" />
      </span>
      <span className={s.rowText}>
        <span className={s.rowName}>{product.name}</span>
        <span
          className={`${s.rowHint} ${
            active ? s.hintHere : isLive ? s.hintLive : ""
          }`}
        >
          {hint}
        </span>
      </span>
    </a>
  );
}

/**
 * The screen between two products.
 *
 * Sixteen products across several registrable domains means a jump is a full
 * cross-origin navigation: this page goes white, the next one takes a beat to
 * boot, and the gap reads as a dropped session rather than a move. Naming both
 * ends turns that dead time into the claim Zodiac actually makes — that these
 * are one place — and it is honest, because the wait is real either way.
 *
 * The card is aria-hidden and the region carries one plain sentence instead:
 * read out, "Fantasy Lotto, from, Academy, to" is noise, and a handoff is
 * exactly the moment a screen-reader user most needs to know where they landed.
 */
function Handoff({ from, to, logoBase, tone }) {
  const markFor = (p) => {
    const art = (p && ART[p.id]) || {};
    const fallback = p ? `${p.id}.png` : "zodiac.png";
    return tone === "light" ? art.logo || fallback : art.logoBare || art.logo || fallback;
  };
  const fromName = (from && from.name) || "Indexx";

  return (
    <div
      className={`${s.xfade} ${tone === "light" ? s.xfadeLight : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Moving from ${fromName} to ${to.name}. Still signed in.`}
    >
      <div className={s.xcard} aria-hidden="true">
        <div className={s.xbrand}>
          <img className={s.xbrandMark} src={`${logoBase}/zodiac.png`} alt="" />
          <span className={s.xlabel}>Moving you across</span>
        </div>

        <div className={s.xpair}>
          <span className={s.xnode}>
            <span className={s.xmark}>
              <img src={`${logoBase}/${markFor(from)}`} alt="" />
            </span>
            <span className={s.xname}>{fromName}</span>
            <span className={s.xrole}>from</span>
          </span>

          <svg className={s.xarrow} width="26" height="10" viewBox="0 0 26 10" fill="none">
            <path
              d="M0 5h22M18.5 1.2 22.8 5l-4.3 3.8"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className={s.xnode}>
            <span className={s.xmark}>
              <img src={`${logoBase}/${markFor(to)}`} alt="" />
            </span>
            <span className={s.xname}>{to.name}</span>
            <span className={s.xrole}>to</span>
          </span>
        </div>

        <span className={s.xbar}>
          <span className={s.xbarFill} />
        </span>
        <p className={s.xfoot}>
          Signed in here, signed in everywhere. No product asks you to log in again.
        </p>
      </div>
    </div>
  );
}

export default function ZodiacLauncher({
  /** Marks the current product in the panel. */
  productId,
  dashboardUrl = DEFAULT_DASHBOARD,
  /**
   * Explicit prop wins, then the build-time env var, then production.
   * The `= undefined` is load-bearing: without a default, TypeScript infers the
   * prop as REQUIRED in the two CRA repos (both set `allowJs`) and every call
   * site that omits it fails to compile with TS2741.
   */
  apiBase = undefined,
  tone = "dark",
  /**
   * "nav"  — a sidebar row that inherits the host's colour and type.
   * "icon" — the mark alone, sized for a narrow icon rail (YaysApp Web's, and
   *          whatever the mobile shells end up needing).
   * See .triggerNav / .triggerIcon in the stylesheet.
   */
  variant = undefined,
  logoBase = "/logos",
  /**
   * Per-platform palette, applied as CSS custom properties.
   *
   * The `/** @type {any} *\/ ({})` default is load-bearing, not noise. Both CRA
   * repos type-check this .jsx file (`allowJs`), and TypeScript infers a prop's
   * type from its default: `= undefined` infers the type `undefined`, so every
   * call site passing a real object fails with TS2322 — the same trap that made
   * `apiBase` infer as REQUIRED earlier. An `any` cast is the portable fix; it
   * is a comment to Babel and Next, and a type to tsc.
   */
  theme = /** @type {any} */ ({}),
  /**
   * Indexx ID wiring: { issuer?, clientId }. Omit it and the launcher behaves
   * exactly as before — products mid-migration are not broken by its absence.
   */
  auth = /** @type {any} */ (null),
  /** Render the Dashboard link inside the trigger cluster. Off by default —
   *  the bar normally places <ZodiacDashboardLink /> on the far right. */
  withDashboard = false,
}) {
  const resolvedApiBase = apiBase || ENV_API_BASE || DEFAULT_API_BASE;

  /*
   * Say so when the registry is about to be fetched from production while the
   * page itself is local.
   *
   * ENV_API_BASE is read from `process.env`, which Vite does not populate — so
   * a Vite app that forgets the `apiBase` prop silently falls back to
   * api.v1.indexx.ai and every row in the panel carries a production url. That
   * is hard to spot, because the ISSUER default falls back to localhost
   * instead, so sign-in keeps working and only the destinations are wrong.
   * XXemails shipped exactly that. A warning costs nothing and turns a
   * puzzling afternoon into one line in the console.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
    if (local && /^https:\/\/api\.v\d+\.indexx\.ai/.test(String(resolvedApiBase))) {
      // eslint-disable-next-line no-console
      console.warn(
        "[zodiac] running on " + window.location.host + " but the registry is " +
        resolvedApiBase + " — every product link will point at production. " +
        "Vite apps must pass apiBase={import.meta.env.VITE_ZODIAC_API}; " +
        "CRA/Next read REACT_APP_ZODIAC_API / NEXT_PUBLIC_ZODIAC_API."
      );
    }
  }, [resolvedApiBase]);

  /**
   * Silent sign-on.
   *
   * This is the whole point of the shell: sign in once at the IdP, and every
   * product recognises you without asking again. The launcher is the right
   * place for it because it is the one component on every page of every
   * product — so wiring it here wires the whole estate.
   *
   * The redirect to /authorize?prompt=none is a TOP-LEVEL navigation, which is
   * what makes it work for the four products on foreign domains where a
   * .indexx.ai cookie cannot reach and third-party cookies are dead.
   *
   * Two things must not happen, and both are guarded:
   *  - Never on the callback route. That page is mid-exchange; redirecting out
   *    of it would drop the authorization code on the floor.
   *  - Never twice in one page load. zodiacAuth's own guard handles the
   *    login_required case, which would otherwise be an infinite reload for
   *    every signed-out visitor on every product at once.
   */
  const authClientRef = useRef(null);

  useEffect(() => {
    if (!auth || !auth.clientId) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/auth/callback")) return;
    try {
      const client = createAuth({
        issuer: auth.issuer || DEFAULT_IDP_ISSUER,
        clientId: auth.clientId,
        redirectUri: window.location.origin + "/auth/callback",
        /*
         * The legacy bridge writes `access_token`, `email`, `user` and
         * `username` into localStorage so a product's EXISTING header sees the
         * session. That is right for products on the shared backend and WRONG
         * for one that keeps its own: Wall Street stores a JSON object under
         * `user`, and writing an email string there made its own
         * JSON.parse throw and took the whole app down.
         *
         * Opt out per product rather than guessing from the key's contents.
         */
        bridgeLegacyKeys:
          auth.bridgeLegacyKeys === undefined ? true : auth.bridgeLegacyKeys,
        /* Products that keep their session in their own shape adapt it here.
           See the onSession comment in zodiacAuth.js. */
        onSession: auth.onSession,
      });
      authClientRef.current = client;
      /* Expose for diagnosis: `window.__zodiacAuth.debug()` in the console says
         exactly why a silent check did or did not happen. Read-only, and it
         holds no token — the client keeps those in its own closure. */
      try { window.__zodiacAuth = client; } catch (_) {}
      client.silentSignIn().catch(() => {
        /* signed out is a normal outcome, not an error */
      });
      /* Adopt a session the product established through its OWN login form.
         The product's login UI is untouched — users see exactly the page they
         always have — and the shell turns that into an IdP session so the other
         products recognise it. See adoptLocalSession in zodiacAuth.js. */
      client.adoptLocalSession().catch(() => {});
      /*
       * Products with their OWN identity donate here. adoptLocalSession only
       * understands an estate token; Wall Street and ShoperPal sign their own
       * sessions, so they hand this provider their token and it verifies with
       * them directly. Same three moments as adopt: arriving, reaching for the
       * switcher, and leaving.
       */
      if (auth && typeof auth.donateSession === "function") {
        try {
          Promise.resolve(auth.donateSession()).catch(() => {});
        } catch (_) {
          /* never let sign-on wiring take a header down */
        }
      }

    } catch (_) {
      /* never let sign-on wiring take a product's header down */
    }
    return undefined;
    /* Depend on the VALUES, not the object. Headers pass this prop inline —
       `auth={{ clientId: "indexx-lotto" }}` — which is a new object identity on
       every render, so depending on `auth` itself re-runs this effect for every
       render and fires a concurrent silent sign-in each time. createAuth() is
       memoised per tab so that is no longer a logout, but there is still no
       reason to ask more than once per page load. */
  }, [auth && auth.issuer, auth && auth.clientId]);
  const [open, setOpen] = useState(false);
  /** The product being navigated TO while the handoff screen is up. */
  const [handoffTo, setHandoffTo] = useState(null);
  const handoffTimers = useRef([]);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  /* The in-flight /config request, and its result. See the fetch effect. */
  const configPromise = useRef(null);
  const liveProducts = useRef(null);
  const [states, setStates] = useState({});
  const [anchor, setAnchor] = useState({ top: 64, left: 14, dropUp: false });
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const loadedHub = useRef(false);

  useEffect(() => setMounted(true), []);

  /* Timers must not outlive the component: a handoff that is still pending when
     the header unmounts would navigate a page the user has already left. */
  useEffect(
    () => () => {
      handoffTimers.current.forEach(clearTimeout);
      handoffTimers.current = [];
    },
    []
  );

  /**
   * Show the handoff screen, then go.
   *
   * The hold is deliberately short. This is a label on a wait that is happening
   * anyway, not a delay added for its own sake — long enough to read two names,
   * and gone before it becomes the thing you remember about the jump.
   */
  const beginHandoff = useCallback(
    async (product, href) => {
      setOpen(false);
      setHandoffTo(product);

      /*
       * Last chance to donate this product's own session before we leave it.
       * The handoff screen is already up, so the round trip is free wall-clock
       * — and without it, a user who signed in here lands signed-out there.
       */
      if (authClientRef.current) {
        try {
          await authClientRef.current.adoptLocalSession();
        } catch (_) {
          /* a failed adopt must never block the navigation */
        }
      }
      if (auth && typeof auth.donateSession === "function") {
        try {
          await auth.donateSession();
        } catch (_) {
          /* likewise — never block the move */
        }
      }

      /*
       * Re-resolve the destination from the live registry.
       *
       * FALLBACK_PRODUCTS ships PRODUCTION urls — right when the API is
       * unreachable, wrong for the first moments of every page load, when the
       * panel is already open and clickable but /config has not answered yet.
       * Click in that window and you leave localhost for the real site. It has
       * happened three times in testing, which is three more than a race this
       * cheap to close deserves.
       *
       * The handoff screen is already up, so this wait costs no wall-clock the
       * user can see. The timeout keeps a hung /config from stranding them:
       * fall through to the bundled url, which is the honest answer when the
       * registry cannot be reached at all.
       */
      if (configPromise.current) {
        try {
          await Promise.race([
            configPromise.current,
            new Promise((resolve) => setTimeout(resolve, 2500)),
          ]);
        } catch (_) {
          /* fall through to whatever href we were given */
        }
      }
      if (Array.isArray(liveProducts.current) && product && product.id) {
        const fresh = liveProducts.current.find((p) => p && p.id === product.id);
        if (fresh && fresh.href) href = fresh.href;
      }

      const reduce =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      handoffTimers.current.push(
        setTimeout(() => {
          try {
            window.location.href = href;
          } catch (_) {
            setHandoffTo(null);
          }
        }, reduce ? 180 : 620)
      );

      /*
       * Safety net. Everything above assumes the browser actually leaves this
       * page, and almost always it does — but an href that resolves to this
       * very URL, or a navigation the browser declines, would otherwise strand
       * the user behind a full-screen overlay with no way out. Give it up.
       */
      handoffTimers.current.push(setTimeout(() => setHandoffTo(null), 8000));
    },
    []
  );

  useEffect(() => {
    let alive = true;
    const url = `${String(resolvedApiBase).replace(/\/+$/, "")}/api/v1/zodiac/config`;
    /*
     * Held as a promise, not just fired, because beginHandoff awaits it — see
     * the note there. The ref is what that read uses: state would be stale
     * inside a callback created before the fetch resolved.
     */
    configPromise.current = fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        const live = body && body.data && body.data.products;
        if (Array.isArray(live) && live.length) {
          liveProducts.current = live;
          if (alive) setProducts(live);
        }
        return live;
      })
      .catch(() => {
        /* keep the bundled list */
        return null;
      });
    return () => {
      alive = false;
    };
  }, [resolvedApiBase]);

  /**
   * The per-product state lines are fetched ONLY when the panel opens.
   *
   * This bar renders on every page of every product; a sixteen-way fan-out on
   * every page load would be indefensible. Opening the switcher is a deliberate
   * act, so that is where the cost belongs. Unauthenticated or failed, the rows
   * fall back to "explore" — never to an invented figure.
   */
  const loadHub = useCallback(() => {
    if (loadedHub.current) return;
    const token = readToken();
    if (!token) return;
    loadedHub.current = true;
    fetch(`${String(resolvedApiBase).replace(/\/+$/, "")}/api/v1/zodiac/hub`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        const rows = body && body.data && body.data.products;
        if (!Array.isArray(rows)) return;
        const next = {};
        rows.forEach((p) => {
          next[p.id] = { note: p.note, active: p.active, status: p.status };
        });
        setStates(next);
      })
      .catch(() => {
        /* rows stay on "explore" */
      });
  }, [resolvedApiBase]);

  const close = useCallback(() => setOpen(false), []);

  const toggle = () => {
    /*
     * Re-check for a session the product established on its OWN login form.
     *
     * adoptLocalSession turns that into an Indexx ID session, and this is the
     * moment it matters: the user has just signed in here and is reaching for
     * the switcher to go somewhere else. Running it only at mount missed that
     * entirely — at mount they were still signed out. Cheap and idempotent:
     * the client latches on the token value, so this is a no-op unless a NEW
     * token has appeared since the last attempt.
     */
    if (authClientRef.current) {
      try {
        authClientRef.current.adoptLocalSession().catch(() => {});
      } catch (_) {
        /* never let sign-on wiring block the panel from opening */
      }
    }
    if (auth && typeof auth.donateSession === "function") {
      try {
        Promise.resolve(auth.donateSession()).catch(() => {});
      } catch (_) {
        /* same */
      }
    }

    setOpen((wasOpen) => {
      if (wasOpen) return false;
      // The panel is FIXED and portalled, so it needs viewport coordinates from
      // the trigger — an absolutely-positioned panel is clipped by any ancestor
      // with overflow, and every one of these headers has one.
      const box = triggerRef.current && triggerRef.current.getBoundingClientRect();
      if (box) {
        // Clamp into the viewport. The panel is up to 900px and portalled to
        // <body>, so on a laptop or phone an un-clamped left taken straight from
        // the trigger pushes it off the right edge — the switcher then looks
        // broken on exactly the screens most people use.
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const width = Math.min(900, vw - 24);

        /*
         * Drop up when there is no room to drop down.
         *
         * The panel is tall and the trigger is not always near the top of the
         * screen — in Wall Street's sidebar it sits at the BOTTOM, so anchoring
         * to box.bottom put the panel mostly below the fold with its lower half
         * unreachable. Flip it above the trigger when that is the roomier side,
         * and cap the height to whichever gap it actually lands in so it can
         * scroll instead of being cut off either way.
         */
        const below = vh - box.bottom;
        const above = box.top;
        const dropUp = below < 360 && above > below;

        setAnchor({
          top: box.bottom,
          bottom: vh - box.top,
          left: Math.max(12, Math.min(box.left, vw - width - 12)),
          dropUp: dropUp,
          maxHeight: Math.max(220, (dropUp ? above : below) - 16),
        });
      }
      loadHub();
      return true;
    });
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        if (triggerRef.current) triggerRef.current.focus();
      }
    };
    const onClick = (e) => {
      // The panel is PORTALLED to <body>, so it is not inside rootRef. Checking
      // only rootRef meant a mousedown on a product link counted as "outside",
      // closed the panel, and unmounted the <a> before the click completed — so
      // the panel shut and nothing navigated. Both subtrees have to count as
      // inside; the scrim closes via its own onClick.
      const t = e.target;
      const inRoot = rootRef.current && rootRef.current.contains(t);
      const inPanel = panelRef.current && panelRef.current.contains(t);
      if (!inRoot && !inPanel) close();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  const inGroup = (id) => products.filter((p) => p.group === id);

  const panel = (
    <>
      <div className={s.scrim} aria-hidden="true" onClick={close} />
      <div
        ref={panelRef}
        className={`${s.panel} ${tone === "light" ? s.panelLight : ""}`}
        role="dialog"
        aria-label="Indexx ecosystem"
        style={{
          ...(anchor.dropUp
            ? { bottom: anchor.bottom + 6 }
            : { top: anchor.top + 6 }),
          left: anchor.left,
          maxHeight: anchor.maxHeight,
          ...(theme || {}),
        }}
      >
        {/*
          The grid in the bar is the affordance; the brand is here. This is the
          moment someone learns the ecosystem has a name, so the mark leads at
          full size rather than trailing in a footer.
        */}
        <div className={s.panelHead}>
          <img src={`${logoBase}/zodiac.png`} alt="" className={s.panelMark} />
          <span className={s.panelTitleWrap}>
            <span className={s.panelTitle}>Indexx Zodiac</span>
            <span className={s.panelSub}>
              The Indexx ecosystem — one ID across all sixteen
            </span>
          </span>
          <span className={s.panelCount}>
            {products.length} products · {GROUPS.length} groups
          </span>
        </div>

        <div className={s.groups}>
          {GROUPS.map((g) => {
            const items = inGroup(g.id);
            if (!items.length) return null;
            const wide = g.id === "spend";
            return (
              <div key={g.id} className={wide ? s.groupWide : s.group}>
                <div className={s.groupLabelRow}>
                  <span className={s.groupLabel}>{g.label}</span>
                  <span className={s.rule} />
                </div>
                <div className={wide ? s.rowsWide : s.rows}>
                  {items.map((p) => {
                    const st = states[p.id] || {};
                    return (
                      <Row
                        key={p.id}
                        product={p}
                        active={p.id === productId}
                        note={st.note}
                        isLive={Boolean(st.active)}
                        tone={tone}
                        logoBase={logoBase}
                        onClose={close}
                        onNavigate={beginHandoff}
                        useHandoff={!auth || !auth.clientId}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={s.panelFoot}>
          Signed in here, signed in everywhere. No product asks you to log in again.
        </div>
      </div>
    </>
  );

  return (
    <div className={`${s.root} ${tone === "light" ? s.light : ""}`} ref={rootRef}>
      {/*
        A dot grid, because that shape already means "all the apps" to anyone
        who has used a Google product — the recognition is borrowed, not taught.
        The ovals carry the system's own -38.4° tilt and Zodiac's green, so it
        reads as ours rather than as a copy. The word sits beside it because
        nothing in nine dots says the name.
      */}
      <button
        type="button"
        ref={triggerRef}
        className={`${s.trigger} ${variant === "nav" ? s.triggerNav : ""} ${variant === "icon" ? s.triggerIcon : ""} ${open ? s.triggerOpen : ""}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Indexx ecosystem"
        onClick={toggle}
      >
        <span className={s.grid} aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <i key={i} style={{ transform: `rotate(${OVAL_ANGLE}deg)` }} />
          ))}
        </span>
        {/* The icon variant is the mark alone — for a narrow icon rail, where
            the word does not fit and gets clipped to "Zo". The button keeps its
            aria-label, so it is still announced as "Indexx ecosystem". */}
        {/*
            The mark alone, by default.

            The nine ovals ARE the brand — the word beside them was belt and
            braces while the shape was unfamiliar, and it is not any more. The
            name now lives in the panel that opens, where there is room to say it
            properly ("Indexx Zodiac") instead of abbreviating it into a corner.

            `variant="nav"` keeps the word: there it is a row in a list of
            labelled rows, and a lone mark among labels reads as a mistake
            rather than as restraint. It spells the name in FULL, matching the
            panel — "Zodiac" alone was the abbreviation we just stopped using. The button keeps its aria-label either way,
            so it is always announced as "Indexx ecosystem".
        */}
        {variant === "nav" ? <span className={s.word}>Indexx Zodiac</span> : null}
      </button>

      {withDashboard && (
        <ZodiacDashboardLink dashboardUrl={dashboardUrl} tone={tone} />
      )}

      {open && mounted && typeof document !== "undefined"
        ? createPortal(panel, document.body)
        : null}

      {handoffTo && mounted && typeof document !== "undefined"
        ? createPortal(
            <Handoff
              from={products.find((p) => p.id === productId) || null}
              to={handoffTo}
              logoBase={logoBase}
              tone={tone}
            />,
            document.body
          )
        : null}
    </div>
  );
}
