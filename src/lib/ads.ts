/**
 * Google AdSense configuration.
 *
 * Per the BTCY Alchemy advertising review, the website only runs **ordinary
 * display ads on genuine editorial content** — never a rewarded-video gate, and
 * never inside the Alchemy convert / outcome / claim funnel or next to wallet,
 * amount or confirmation controls.
 *
 * Nothing renders until BOTH:
 *   - a Google AdSense publisher account exists and the site is approved, and
 *   - the env vars below are set (client id + at least one ad-unit slot id).
 *
 * Env vars (set in the hosting env / .env, NOT committed):
 *   NEXT_PUBLIC_ADSENSE_CLIENT              e.g. "ca-pub-1234567890123456"
 *   NEXT_PUBLIC_ADSENSE_SLOT_ALCHEMY_CONTENT  numeric ad-unit id from the dashboard
 *
 * The GDPR/consent message is handled by Google's own "Privacy & messaging"
 * (Funding Choices) CMP, which is configured in the AdSense UI and served
 * automatically by the adsbygoogle tag — no extra script here.
 */

export const ADSENSE_CLIENT = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();

/** True once a real publisher id is configured. */
export const ADSENSE_ENABLED = /^ca-pub-\d{10,}$/.test(ADSENSE_CLIENT);

/**
 * Ad-unit slot ids, kept in env so units can be created, swapped or paused from
 * the AdSense dashboard without a code deploy. An empty value = that slot is off.
 */
export const AD_SLOTS = {
  /** Landing-page editorial zone, below "How Alchemy works". */
  alchemyContent: (process.env.NEXT_PUBLIC_ADSENSE_SLOT_ALCHEMY_CONTENT ?? "").trim(),
} as const;

export type AdSlotName = keyof typeof AD_SLOTS;

/** The `pub-…` form used in ads.txt (AdSense reports the account as `ca-pub-…`). */
export const ADSENSE_SELLER_ID = ADSENSE_CLIENT.replace(/^ca-/, "");

/**
 * Preview mode: render a visible labelled placeholder box where each <AdSlot>
 * sits, instead of nothing, so the layout can be reviewed before a real AdSense
 * account exists. Set NEXT_PUBLIC_ADS_PREVIEW=1. Never affects production unless
 * that env var is explicitly set. Also lets the Alchemy claim ad-gate be tested
 * with a simulated "video" when no rewarded provider is configured.
 */
export const ADS_PREVIEW = (process.env.NEXT_PUBLIC_ADS_PREVIEW ?? "").trim() === "1";

/**
 * Google Ad Manager rewarded-ad unit path for the Alchemy claim gate, e.g.
 * "/1234567/btcy_rewarded_web". Rewarded video on the web needs Ad Manager (GPT)
 * — AdSense cannot serve it. Empty until a GAM account + rewarded unit exist.
 */
export const GAM_REWARDED_AD_UNIT = (
  process.env.NEXT_PUBLIC_GAM_REWARDED_AD_UNIT ?? ""
).trim();
export const REWARDED_ADS_ENABLED = GAM_REWARDED_AD_UNIT.startsWith("/");

/**
 * Placeholder for the claim-gate rewarded ad while the plan is AdSense-only
 * (AdSense can't serve rewarded video). When on and no real GAM unit is
 * configured, the "Watch & unlock" button shows a short labelled placeholder
 * overlay instead of a real video, and it still clears the gate.
 * Default ON — set NEXT_PUBLIC_REWARDED_AD_PLACEHOLDER=0 to turn it off (then the
 * gate can only be cleared from the mobile app or by an admin).
 */
export const REWARDED_AD_PLACEHOLDER =
  (process.env.NEXT_PUBLIC_REWARDED_AD_PLACEHOLDER ?? "1").trim() !== "0";

/** How long the placeholder "ad" runs, in seconds. */
export const REWARDED_AD_PLACEHOLDER_SECONDS = Math.max(
  3,
  Number(process.env.NEXT_PUBLIC_REWARDED_AD_PLACEHOLDER_SECONDS) || 6
);
