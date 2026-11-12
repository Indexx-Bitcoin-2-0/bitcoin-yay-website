// The admin-controlled announcement popup ("App home-screen popup" in the admin
// dashboard). The same record drives the popup in the Bitcoin Yay apps, so
// turning it on in admin shows it in the apps and on this website.
import { API_BASE_URL } from "@/lib/api-config";

export type AppPopup = {
  title?: string;
  body?: string;
  imageUrl?: string;
  status?: string;
  prizePool?: string;
  winnersCount?: string;
  ctaText?: string;
  ctaUrl?: string;
  endDate?: string;
  /** Optional note line under the details, and its icon ("usdxx" or an https image URL). */
  popupNote?: string;
  popupNoteIcon?: string;
  updatedAt?: string;
  active?: boolean;
};

const POPUP_NAME = "btcy-app-popup";

// Each saved version of the popup is shown once; saving it again shows it again.
export const popupDismissKey = (popup: AppPopup) => `btcyAppPopupDismissed:${popup.updatedAt || ""}`;

let cached: Promise<AppPopup | null> | null = null;

/** The popup to show this visitor, or null (off, empty, or already closed). Fetched once per page load. */
export function loadAppPopup(): Promise<AppPopup | null> {
  if (!cached) {
    cached = fetch(`${API_BASE_URL}/api/v1/inex/basic/airdrop-campaign?name=${POPUP_NAME}`)
      .then(response => (response.ok ? response.json() : null))
      .then(payload => {
        const popup: AppPopup | null = payload?.data ?? null;
        if (!popup?.active || !(popup.title || popup.body)) return null;
        try {
          if (localStorage.getItem(popupDismissKey(popup))) return null;
        } catch { /* storage blocked: show it */ }
        return popup;
      })
      .catch(() => null);
  }
  return cached;
}

/** Where the popup button goes on the website. App links map to the matching page. */
export function popupLinkHref(url?: string): string | null {
  const link = String(url || "").trim();
  if (link === "bitcoinyay://black-friday") return "/airdrop";
  return /^https:\/\/\S+$/i.test(link) ? link : null;
}

/** Pages where the popup would only get in the way (it already points there). */
export const isPopupHiddenOn = (pathname: string) => pathname === "/airdrop" || pathname.startsWith("/black-friday");
