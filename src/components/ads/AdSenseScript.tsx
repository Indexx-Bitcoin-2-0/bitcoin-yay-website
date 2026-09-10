"use client";

import Script from "next/script";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/ads";

/**
 * Loads the Google AdSense library once, site-wide. Renders nothing until a real
 * publisher id is configured (NEXT_PUBLIC_ADSENSE_CLIENT), so preview and
 * pre-approval environments stay ad-free.
 *
 * Only manual <AdSlot> units are used — Auto Ads are intentionally NOT enabled,
 * so turning this on does not spray ads across the funnel; ads appear only where
 * an <AdSlot> is explicitly placed on editorial content.
 */
export default function AdSenseScript() {
  if (!ADSENSE_ENABLED) return null;

  return (
    <Script
      id="adsbygoogle-lib"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
