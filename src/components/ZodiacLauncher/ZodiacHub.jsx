/* Copied from indexx-exchange-backend/zodiac-embed/ (fingerprint ff8916268301) — edit the source there, not here. */
/*
 * Zodiac Hub — the Dashboard, one page per product repo.
 *
 * SOURCE OF TRUTH: zodiac-embed/ — copied by sync.sh, never edited in a consumer.
 *
 * It lives INSIDE each product rather than on a zodiac.indexx.ai redirect: the
 * whole argument of the shell is that you never leave the ecosystem to move
 * around it. Bouncing someone to another domain to read their own balances is
 * the opposite of that, and on the four foreign-domain products it would also
 * mean a cross-origin hop mid-session.
 *
 * ── The rule ───────────────────────────────────────────────────────────────
 *
 * Every figure here comes from GET /api/v1/zodiac/hub. A card with no readable
 * value renders an em dash, never a zero — and the backend distinguishes
 * "nothing yet" (empty, an honest 0) from "could not read" (null). This
 * component must preserve that distinction; collapsing them would undo the
 * point of the endpoint.
 */

import { useEffect, useState } from "react";
import s from "./zodiac-hub.module.css";

const GROUPS = [
  { id: "earn", label: "Earn" },
  { id: "trade", label: "Trade" },
  { id: "play", label: "Play" },
  { id: "spend", label: "Spend" },
  { id: "build", label: "Build" },
];

const ART = {
  btcy: "btcy.png", yaysapp: "yaysapp.png", academy: "academy-light.png",
  exchange: "exchange.png", treasury: "treasury.png", wallstreet: "wallst-light.png",
  xtokens: "xtokens.png", usdxx: "usdxx.png", emmm: "emmm.png", lotto: "lotto.png",
  pay: "pay.png", wallet: "wallet.png", shoperpal: "shoperpal.png",
  rehuman: "rehuman-light.png", aiainai: "aiainai.png", xxemails: "xxemails.png",
};

const NAMES = {
  btcy: "Bitcoin Yay", yaysapp: "YaysApp", academy: "Academy", exchange: "Exchange",
  treasury: "Crypto Treasury", wallstreet: "Wall Street", xtokens: "xTokens",
  usdxx: "USDXX", emmm: "Eeny Meeny Miny Moe", lotto: "Fantasy Lotto",
  pay: "Indexx Pay", wallet: "Indexx Wallet", shoperpal: "ShoperPal",
  rehuman: "ReHuman", aiainai: "ai ai N ai", xxemails: "XXemails",
};

const ENV_API_BASE = (() => {
  try {
    if (typeof process !== "undefined" && process.env) {
      return (
        process.env.NEXT_PUBLIC_ZODIAC_API ||
        process.env.REACT_APP_ZODIAC_API ||
        null
      );
    }
  } catch (_) {}
  return null;
})();
const DEFAULT_API_BASE = "https://api.v1.indexx.ai";

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

/** Seconds remaining until an ISO instant, or null. */
const secondsUntil = (iso) => {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.round((t - Date.now()) / 1000));
};

const countdown = (secs) => {
  if (secs === null) return null;
  const d = Math.floor(secs / 86400);
  const h = Math.floor((secs % 86400) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (d > 0) return `${d}d ${String(h).padStart(2, "0")}h`;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m`;
};

function Card({ row, logoBase }) {
  const name = NAMES[row.id] || row.id;
  const value = row.primary && row.primary.display;
  const unit = row.primary && row.primary.unit;
  const unavailable = value === null || value === undefined;

  // The countdown is computed from the ISO instant the server sent, so it stays
  // correct however long this response sat in a cache. The demo baked strings
  // like "4h 12m left" into the payload, which are wrong the moment they age.
  const left = countdown(secondsUntil(row.noteEndsAt));
  const note = left ? `${row.note || "Ends"} — ${left} left` : row.note;

  return (
    <a className={s.card} href={`#${row.id}`}>
      <div className={s.cardHead}>
        <span className={s.cardMark}>
          <img src={`${logoBase}/${ART[row.id] || row.id + ".png"}`} alt="" aria-hidden="true" />
        </span>
        <span className={s.cardName}>{name}</span>
      </div>

      {/* Sans, not mono: a mono comma takes a full cell and renders "12 , 480".
          tabular-nums keeps the columns aligned regardless. */}
      <div className={`${s.value} ${unavailable ? s.valueNone : ""}`}>
        {unavailable ? "—" : value}
        {!unavailable && unit ? <span className={s.unit}>{unit}</span> : null}
      </div>

      {(note || row.reason) && (
        <div className={`${s.note} ${row.active ? s.noteLive : ""}`}>
          {note || row.reason}
        </div>
      )}

      {typeof row.progress === "number" && (
        <div className={s.track}>
          <span
            className={s.fill}
            style={{ width: `${Math.round(row.progress * 100)}%` }}
          />
        </div>
      )}
    </a>
  );
}

export default function ZodiacHub({
  apiBase = undefined,
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
}) {
  const base = String(apiBase || ENV_API_BASE || DEFAULT_API_BASE).replace(/\/+$/, "");
  const [data, setData] = useState(null);
  /**
   * `signedout` and `error` are NOT empty states.
   *
   * The Dashboard always draws all sixteen cards; the values are an overlay on
   * top of them. A signed-out visitor sees the shape of the ecosystem with every
   * figure as an em dash, which is both honest and useful — a single line of
   * apology on a black page is neither, and reads as a broken screen.
   */
  const [state, setState] = useState("loading"); // loading | ready | signedout | error
  const [headerOffset, setHeaderOffset] = useState(0);

  /**
   * Clear whatever fixed header the host product has pinned to the top.
   *
   * Every one of these repos pins its nav with `position: fixed; top: 0` —
   * Fantasy Lotto's `.header` is fixed unconditionally, not just on scroll — so
   * it takes NO space in flow and each page is expected to offset itself. A page
   * that does not simply starts underneath it, which is what hid this Hub's
   * title and first row of cards.
   *
   * Measured rather than hardcoded: the stack is two bars on Lotto and one
   * elsewhere, and every product's header changes height at its own breakpoints.
   * A magic number would be wrong on three of the four and stale on all of them
   * the first time a header changes.
   */
  useEffect(() => {
    const measure = () => {
      let tallest = 0;
      const nodes = document.querySelectorAll("header, nav");
      for (let i = 0; i < nodes.length; i += 1) {
        const el = nodes[i];
        const cs = window.getComputedStyle(el);
        if (cs.position !== "fixed") continue;
        // Only bars pinned to the very top overlap us; a fixed footer or a
        // sticky sidebar must not push the page down.
        if (Math.abs(parseFloat(cs.top || "0")) > 1) continue;
        const box = el.getBoundingClientRect();
        if (box.top <= 1 && box.height > tallest) tallest = box.height;
      }
      setHeaderOffset(Math.round(tallest));
    };
    // Scroll fires per frame or faster; measuring every fixed bar on each one
    // would be a jank source on a page that is mostly scrolling. Coalesce to at
    // most one measurement per animation frame.
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(() => {
        queued = false;
        measure();
      });
    };

    measure();
    window.addEventListener("resize", schedule);
    // Headers here collapse, swap to a mobile menu, and gain a scrolled state,
    // so re-measure on those too rather than only on resize.
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    if (ro) {
      const nodes = document.querySelectorAll("header, nav");
      for (let i = 0; i < nodes.length; i += 1) ro.observe(nodes[i]);
    }
    window.addEventListener("scroll", schedule, true);
    return () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
      if (ro) ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const token = readToken();
    if (!token) {
      setState("signedout");
      return undefined;
    }
    let alive = true;
    fetch(`${base}/api/v1/zodiac/hub`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((body) => {
        if (!alive) return;
        setData(body && body.data);
        setState("ready");
      })
      .catch(() => alive && setState("error"));
    return () => {
      alive = false;
    };
  }, [base]);

  // Every product always has a card. Values arrive as an overlay keyed by id;
  // anything missing stays a dash rather than disappearing from the page.
  const live = {};
  ((data && data.products) || []).forEach((r) => {
    live[r.id] = r;
  });
  const rows = PRODUCT_IDS.map(
    (id) => live[id] || { id, primary: { display: null }, note: null }
  );
  const byGroup = (g) => rows.filter((r) => (r.group || GROUP_OF[r.id]) === g);
  const first = ((data && data.identity && data.identity.name) || "").split(" ")[0];

  const banner =
    state === "loading"
      ? "Reading your position across the ecosystem…"
      : state === "signedout"
      ? "Sign in to see your balances — every figure is a dash until then."
      : state === "error"
      ? "Your figures could not be read right now. Dashes rather than numbers we cannot stand behind."
      : null;
  // Counted, never hardcoded — the demo said "Five cards" in prose.
  const dashes = rows.filter(
    (r) => !r.primary || r.primary.display === null || r.primary.display === undefined
  ).length;

  return (
    <div
      className={s.wrap}
      style={{ ...theme, paddingTop: headerOffset ? headerOffset + 28 : undefined }}
    >
      <div className={s.head}>
        <h1 className={s.title}>{first ? `Welcome back, ${first}` : "Your ecosystem"}</h1>
        <span className={s.sub}>what you earn, trade, play and spend</span>
        {banner ? (
          <span className={s.degraded}>{banner}</span>
        ) : data && data.degraded && data.degraded.length ? (
          <span className={s.degraded}>
            {data.degraded.length} source{data.degraded.length === 1 ? "" : "s"} unavailable
          </span>
        ) : null}
      </div>

      {GROUPS.map((g) => {
        const items = byGroup(g.id);
        if (!items.length) return null;
        return (
          <section key={g.id} className={s.section}>
            <div className={s.labelRow}>
              <h2 className={s.label}>{g.label}</h2>
              <span className={s.rule} />
            </div>
            <div className={s.cards}>
              {items.map((row) => (
                <Card key={row.id} row={row} logoBase={logoBase} />
              ))}
            </div>
          </section>
        );
      })}

      {dashes > 0 && (
        <p className={s.footnote}>
          <img src={`${logoBase}/zodiac.png`} alt="" aria-hidden="true" />
          <span>
            {dashes} card{dashes === 1 ? "" : "s"} show a dash rather than a zero.
            Where the Hub cannot read a real position it says so — an invented{" "}
            <code>0.00</code> beside a real balance is indistinguishable from a real one.
          </span>
        </p>
      )}
    </div>
  );
}

/** Canonical order — the Hub draws a card for each of these, always. */
const PRODUCT_IDS = [
  "btcy", "yaysapp", "academy",
  "exchange", "treasury", "wallstreet", "xtokens", "usdxx",
  "emmm", "lotto",
  "pay", "wallet", "shoperpal", "rehuman",
  "aiainai", "xxemails",
];

/** Fallback grouping when the API row omits it. */
const GROUP_OF = {
  btcy: "earn", yaysapp: "earn", academy: "earn",
  exchange: "trade", treasury: "trade", wallstreet: "trade", xtokens: "trade", usdxx: "trade",
  emmm: "play", lotto: "play",
  pay: "spend", wallet: "spend", shoperpal: "spend", rehuman: "spend",
  aiainai: "build", xxemails: "build",
};
