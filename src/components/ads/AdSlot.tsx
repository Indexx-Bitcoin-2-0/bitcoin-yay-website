"use client";

import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_ENABLED,
  ADS_PREVIEW,
  AD_SLOTS,
  type AdSlotName,
} from "@/lib/ads";

type AdSlotProps = {
  /** Which configured slot to render (see AD_SLOTS in lib/ads.ts). */
  name: AdSlotName;
  /** AdSense format hint: "auto" = responsive display. */
  format?: string;
  /** Optional data-ad-layout (e.g. "in-article"). */
  layout?: string;
  className?: string;
};

/**
 * A single labelled display-ad unit for editorial content.
 *
 * Renders nothing unless the publisher account AND this slot id are both
 * configured, so unapproved / preview builds never show empty ad frames.
 *
 * Do NOT place this inside the Alchemy convert / outcome / claim flow or beside
 * wallet, amount or confirmation controls — it is for genuine content only.
 */
export default function AdSlot({
  name,
  format = "auto",
  layout,
  className,
}: AdSlotProps) {
  const slot = AD_SLOTS[name];
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ENABLED || !slot || pushedRef.current) return;
    try {
      // adsbygoogle is injected by AdSenseScript once the library loads.
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push(
        {},
      );
      pushedRef.current = true;
    } catch (err) {
      console.warn("AdSense slot push failed", err);
    }
  }, [slot]);

  if (!ADSENSE_ENABLED || !slot) {
    if (!ADS_PREVIEW) return null;
    // Layout-review placeholder (NEXT_PUBLIC_ADS_PREVIEW=1) — no real ad served.
    return (
      <aside
        aria-label="Advertisement placeholder"
        className={`mx-auto my-12 w-full max-w-3xl text-center ${className ?? ""}`}
      >
        <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-tertiary/70">
          Advertisement
        </span>
        <div className="flex min-h-[280px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 p-6">
          <span className="text-sm font-semibold text-primary">Ad slot</span>
          <span className="text-xs text-tertiary">
            AdSense placement · name=&quot;{name}&quot; · responsive display
          </span>
          <span className="text-[11px] text-tertiary/70">
            Renders a real ad once NEXT_PUBLIC_ADSENSE_CLIENT + slot id are set
          </span>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`mx-auto my-12 w-full max-w-3xl text-center ${className ?? ""}`}
    >
      <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-tertiary/70">
        Advertisement
      </span>
      <ins
        key={slot}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { "data-ad-layout": layout } : {})}
      />
    </aside>
  );
}
