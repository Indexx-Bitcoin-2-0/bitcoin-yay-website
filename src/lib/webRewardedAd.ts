import {
  ADS_PREVIEW,
  GAM_REWARDED_AD_UNIT,
  REWARDED_ADS_ENABLED,
  REWARDED_AD_PLACEHOLDER,
  REWARDED_AD_PLACEHOLDER_SECONDS,
} from "@/lib/ads";

/**
 * Rewarded video for the Alchemy claim gate — the web equivalent of the mobile
 * app's AdMob rewarded ad.
 *
 * Real rewarded video on the web is only possible through Google Ad Manager
 * (GPT); AdSense cannot serve it. Set NEXT_PUBLIC_GAM_REWARDED_AD_UNIT to a
 * rewarded ad-unit path to use a real ad.
 *
 * The current plan is AdSense-only, so by default the button shows a short
 * labelled **placeholder** overlay (NEXT_PUBLIC_REWARDED_AD_PLACEHOLDER, on by
 * default) that still clears the gate. `NEXT_PUBLIC_ADS_PREVIEW=1` behaves the
 * same way.
 */

type GoogleTag = {
  cmd: Array<() => void>;
  defineOutOfPageSlot: (adUnit: string, format: unknown) => GptSlot | null;
  pubads: () => GptPubAdsService;
  enableServices: () => void;
  display: (slot: GptSlot) => void;
  destroySlots: (slots: GptSlot[]) => void;
  enums: { OutOfPageFormat: { REWARDED: unknown } };
};
type GptSlot = { addService: (service: unknown) => void };
type GptPubAdsService = {
  addEventListener: (
    event: string,
    listener: (e: GptRewardedEvent) => void
  ) => void;
  removeEventListener?: (
    event: string,
    listener: (e: GptRewardedEvent) => void
  ) => void;
};
type GptRewardedEvent = {
  slot: GptSlot;
  makeRewardedVisible?: () => void;
  payload?: { amount?: number; type?: string };
};

declare global {
  interface Window {
    googletag?: GoogleTag;
  }
}

const GPT_SRC = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
let gptLoadPromise: Promise<GoogleTag | null> | null = null;

function placeholderActive(): boolean {
  return !REWARDED_ADS_ENABLED && (REWARDED_AD_PLACEHOLDER || ADS_PREVIEW);
}

export function isWebRewardedAdAvailable(): boolean {
  return REWARDED_ADS_ENABLED || placeholderActive();
}

/** Whether "the ad" is only a placeholder (no real inventory). */
export function isWebRewardedAdPlaceholder(): boolean {
  return placeholderActive();
}

function loadGpt(): Promise<GoogleTag | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (gptLoadPromise) return gptLoadPromise;

  gptLoadPromise = new Promise((resolve) => {
    window.googletag = window.googletag || ({ cmd: [] } as unknown as GoogleTag);
    if (document.querySelector(`script[src="${GPT_SRC}"]`)) {
      resolve(window.googletag ?? null);
      return;
    }
    const script = document.createElement("script");
    script.src = GPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.googletag ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return gptLoadPromise;
}

/**
 * Short labelled placeholder overlay used while the site has no rewarded-ad
 * inventory. Resolves true once the countdown completes, false if the viewer
 * closes it early.
 */
function showPlaceholderOverlay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve(false);
      return;
    }
    const total = REWARDED_AD_PLACEHOLDER_SECONDS;
    let remaining = total;
    let settled = false;

    const overlay = document.createElement("div");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Advertisement");
    overlay.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:2147483000",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "padding:24px",
      "background:rgba(0,0,0,0.85)",
      "backdrop-filter:blur(2px)",
    ].join(";");

    overlay.innerHTML = `
      <div style="width:100%;max-width:420px;text-align:center;color:#fff;font-family:inherit">
        <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:10px">Advertisement</div>
        <div style="border:2px dashed rgba(255,138,42,.6);background:rgba(255,138,42,.06);border-radius:14px;padding:28px 20px;min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px">
          <div style="font-size:15px;font-weight:700;color:#ff8a2a">Rewarded ad placeholder</div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);max-width:280px">A real rewarded video appears here once a Google Ad Manager rewarded unit is configured.</div>
          <div data-ph-count style="margin-top:12px;font-size:28px;font-weight:800">${remaining}</div>
        </div>
        <button data-ph-close type="button" style="margin-top:16px;font-size:12px;color:rgba(255,255,255,.6);background:none;border:none;cursor:pointer;text-decoration:underline">Skip (won't unlock)</button>
      </div>`;

    const countEl = overlay.querySelector<HTMLElement>("[data-ph-count]");
    const closeBtn = overlay.querySelector<HTMLButtonElement>("[data-ph-close]");

    const cleanup = (granted: boolean) => {
      if (settled) return;
      settled = true;
      window.clearInterval(timer);
      overlay.remove();
      resolve(granted);
    };

    closeBtn?.addEventListener("click", () => cleanup(false));

    const timer = window.setInterval(() => {
      remaining -= 1;
      if (countEl) countEl.textContent = String(Math.max(0, remaining));
      if (remaining <= 0) cleanup(true);
    }, 1000);

    document.body.appendChild(overlay);
  });
}

/**
 * Show one rewarded video. Resolves `true` only if the viewer earned the reward
 * (watched it through), `false` if they closed it early or it failed to load.
 */
export async function showWebRewardedAd(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  if (!REWARDED_ADS_ENABLED) {
    return placeholderActive() ? showPlaceholderOverlay() : false;
  }

  const googletag = await loadGpt();
  if (!googletag) return false;

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (granted: boolean) => {
      if (settled) return;
      settled = true;
      resolve(granted);
    };

    googletag.cmd.push(() => {
      try {
        const slot = googletag.defineOutOfPageSlot(
          GAM_REWARDED_AD_UNIT,
          googletag.enums.OutOfPageFormat.REWARDED
        );
        if (!slot) {
          finish(false);
          return;
        }
        const pubads = googletag.pubads();
        slot.addService(pubads);

        let granted = false;
        const onReady = (e: GptRewardedEvent) => {
          if (e.slot === slot) e.makeRewardedVisible?.();
        };
        const onGranted = (e: GptRewardedEvent) => {
          if (e.slot === slot) granted = true;
        };
        const onClosed = (e: GptRewardedEvent) => {
          if (e.slot !== slot) return;
          try {
            pubads.removeEventListener?.("rewardedSlotReady", onReady);
            pubads.removeEventListener?.("rewardedSlotGranted", onGranted);
            pubads.removeEventListener?.("rewardedSlotClosed", onClosed);
          } catch {}
          try {
            googletag.destroySlots([slot]);
          } catch {}
          finish(granted);
        };

        pubads.addEventListener("rewardedSlotReady", onReady);
        pubads.addEventListener("rewardedSlotGranted", onGranted);
        pubads.addEventListener("rewardedSlotClosed", onClosed);

        googletag.enableServices();
        googletag.display(slot);

        setTimeout(() => finish(false), 30000);
      } catch (err) {
        console.error("showWebRewardedAd error:", err);
        finish(false);
      }
    });
  });
}
