# Website advertising

Two separate things:

1. **Display ads (AdSense)** on genuine editorial content — one slot on the
   `/alchemy` landing page, below "How Alchemy works". No Auto Ads; labelled
   "Advertisement"; kept away from wallet / amount / confirmation controls.
2. **Rewarded-ad claim gate (Ad Manager / GPT)** on `/alchemy/claim` — the web
   port of the mobile app's gate. The **backend enforces it** (`/complete`
   returns `403 AD_GATE_REQUIRED`); the page mirrors the state so the claim
   button is disabled until the videos are watched.

## What's in the repo

| File | Purpose |
|---|---|
| `src/lib/ads.ts` | Config: reads env, exposes `ADSENSE_ENABLED`, `AD_SLOTS` |
| `src/components/ads/AdSenseScript.tsx` | Loads `adsbygoogle.js` once, site-wide. Mounted in `src/app/layout.tsx`. No-op until configured |
| `src/components/ads/AdSlot.tsx` | One labelled display unit. Renders nothing unless its slot id is set |
| `src/app/ads.txt/route.ts` | Serves `/ads.txt`, driven by the env client id |
| `src/app/alchemy/page.tsx` | `<AdSlot name="alchemyContent" />` below "How Alchemy works" |
| `src/lib/webRewardedAd.ts` | `showWebRewardedAd()` / `isWebRewardedAdAvailable()` — GPT rewarded video for the claim gate |
| `src/lib/alchemy.ts` | `getAlchemyAdProgress()` / `recordAlchemyAdWatch()`, and `completeAlchemyProcess()` surfaces the `403 AD_GATE_REQUIRED` |
| `src/app/alchemy/claim/page.tsx` | Gate card + "Watch & unlock" button; claim button disabled until `satisfied` |

Until the env vars below are set, **all of this is inert** — no script loads, no
`<ins>` renders, `/ads.txt` returns a commented placeholder.

### Previewing the placement without an account

Run the dev server with `NEXT_PUBLIC_ADS_PREVIEW=1` and each `<AdSlot>` renders a
visible dashed placeholder box (labelled "Advertisement · Ad slot · name=…")
where the real unit will sit — for layout review only, no ad is requested.
`NEXT_PUBLIC_ADS_PREVIEW=1` also makes the claim-gate "Watch & unlock" button
run a ~2.5s simulated video (instead of a real rewarded ad) so the gate flow is
testable without a GAM account. Never set this in production.

```
NEXT_PUBLIC_ADS_PREVIEW=1 npm run dev
```

## Rewarded-ad claim gate (`/alchemy/claim`)

The user watches `config.resultAdsRequired` (default 2) rewarded videos before
the claim button unlocks. Views recorded on the mobile processing screen count
too — it is one shared per-session total, enforced server-side on `/complete`.

- `GET /api/v2/bitcoinyay/alchemy/sessions/:sessionId/ad-progress` → progress
- `POST /api/v2/bitcoinyay/alchemy/sessions/:sessionId/ads` → record one view
- Config: `resultAdsRequired`, `resultAdsDisabled` on the Alchemy config doc.

**Rewarded video on the web needs Google Ad Manager (GPT) — AdSense cannot serve
it.** The plan is AdSense-only, so **by default the gate shows a placeholder**:
the card renders a dashed "Advertisement · Rewarded video slot" box, and
"Watch & unlock" runs a short labelled countdown overlay that still clears the
gate. Env knobs:

| Var | Default | Effect |
|---|---|---|
| `NEXT_PUBLIC_REWARDED_AD_PLACEHOLDER` | `1` (on) | Placeholder overlay + card. Set `0` to disable — then the gate can only be cleared from the mobile app or by an admin. |
| `NEXT_PUBLIC_REWARDED_AD_PLACEHOLDER_SECONDS` | `6` | Placeholder countdown length. |
| `NEXT_PUBLIC_GAM_REWARDED_AD_UNIT` | *(empty)* | A GAM rewarded ad-unit path, e.g. `/1234567/btcy_rewarded_web`. When set, `src/lib/webRewardedAd.ts` loads `gpt.js` and plays a **real** rewarded ad instead of the placeholder. |

To move from placeholder to a real ad: create a **Google Ad Manager** account +
a **rewarded** ad unit, then set `NEXT_PUBLIC_GAM_REWARDED_AD_UNIT` to its path.

The server enforces the gate regardless. If the placeholder is disabled and no
GAM unit is set, a web user who never watched an ad must finish the claim from
the mobile app, or an admin sets `resultAdsDisabled: true`.

## Go-live checklist

1. **Create a Google AdSense account** for `bitcoinyay.com` and add the site.
   (AdSense covers the display slot; the claim-gate rewarded video needs a
   separate Google Ad Manager account — see the section above.)
2. **Get the site approved.** Google crawls it and checks policy — the content
   pages must have real content (they do) and `ads.txt` must resolve.
3. **Create an ad unit** in the dashboard: Ads → By ad unit → Display ads
   (call it e.g. `alchemy-content`). Note its numeric slot id.
4. **Set env vars** (hosting env / `.env`, not committed):

   ```
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_ALCHEMY_CONTENT=1234567890
   ```

5. **Deploy.** Verify:
   - `https://bitcoinyay.com/ads.txt` shows the `google.com, pub-…, DIRECT, f08c47fec0942fa0` line.
   - `/app-ads.txt` is unchanged (mobile AdMob — separate).
   - The `adsbygoogle.js` script loads on the site.
   - The ad appears on `/alchemy` below "How Alchemy works", labelled
     "Advertisement", and **not** on `/alchemy/outcome`, `/alchemy/claim`,
     `/alchemy/congratulations` or `/alchemy/retained`.
6. **Consent (GDPR/UK/CH):** in AdSense → Privacy & messaging, create a **GDPR
   message** (Google's Funding Choices CMP). It is served automatically by the
   ad tag — no code change. Also create the CCPA/US-states message.
7. **Update the privacy policy.** `src/app/privacy-policy/page.tsx` currently
   says the site does not work with ad networks (the "Advertising Networks"
   section, ~line 520). That must be revised to disclose Google AdSense,
   advertising cookies, and personalised-ads opt-out **before** ads go live.
   This is legal copy — route it through whoever owns that text.

## Adding another slot later (e.g. FAQ, blog)

1. Add a key to `AD_SLOTS` in `src/lib/ads.ts` backed by a new env var.
2. Create the matching ad unit in AdSense, set the env var.
3. Drop `<AdSlot name="yourKey" />` into an editorial section of the page —
   never in a checkout/confirmation/receipt flow.
