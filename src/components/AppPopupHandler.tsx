"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import PopupComponent from "@/components/PopupComponent";
import CustomButton from "@/components/CustomButton";
import DefaultArt from "@/assets/images/btcy-airdrop/btcy-airdrop-eagle.webp";
import UsdxxMark from "@/assets/images/usdxx/usdxx-mark.webp";
import BtcyMark from "@/assets/images/btcy-airdrop/btcy-mark.png";
import { AppPopup, isPopupHiddenOn, loadAppPopup, popupDismissKey, popupLinkHref } from "@/lib/app-popup";

// Ends date in US Pacific time, the timezone the campaigns are run in.
const endsLabel = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `Ends ${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" })}`;
};

/**
 * Shows the admin-controlled announcement popup (same one as the apps) once per
 * saved version. Takes priority over the site's other popups while it's on.
 */
const AppPopupHandler = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [popup, setPopup] = useState<AppPopup | null>(null);

  useEffect(() => {
    if (isPopupHiddenOn(pathname)) { setPopup(null); return; }
    let alive = true;
    loadAppPopup().then(result => { if (alive) setPopup(result); });
    return () => { alive = false; };
  }, [pathname]);

  const close = () => {
    if (popup) {
      try { localStorage.setItem(popupDismissKey(popup), "true"); } catch { /* ignore */ }
    }
    setPopup(null);
  };

  const open = () => {
    const href = popupLinkHref(popup?.ctaUrl);
    close();
    if (!href) return;
    if (href.startsWith("/")) router.push(href);
    else window.open(href, "_blank", "noopener,noreferrer");
  };

  if (!popup) return null;
  const ends = endsLabel(popup.endDate);
  // Note line from the admin (e.g. "Rewards are paid in BTCY Tokens, not cash or USDT").
  const note = popup.popupNote?.trim();
  const noteIcon = popup.popupNoteIcon?.trim();

  return (
    <PopupComponent isOpen onClose={close}>
      <div role="dialog" aria-modal="true" aria-labelledby="app-popup-title" className="w-90 md:w-140 lg:w-160 xl:w-180 p-6 md:p-8 xl:p-10 text-center bg-bg rounded-lg">
        <div className="flex justify-center my-4 md:my-6">
          {popup.imageUrl ? (
            // Admin-supplied image from any host, so a plain img (no Next image config needed).
            // eslint-disable-next-line @next/next/no-img-element
            <img src={popup.imageUrl} alt="" className="w-50 max-h-60 object-contain" />
          ) : (
            <Image src={DefaultArt} alt="" className="w-44 md:w-52" />
          )}
        </div>

        <h1 id="app-popup-title" className="text-primary text-2xl md:text-4xl font-bold leading-tight mb-3">{popup.title}</h1>
        {popup.status ? <p className="inline-block rounded-full border border-primary px-4 py-1 text-sm md:text-base font-semibold text-primary mb-5">{popup.status}</p> : null}
        {popup.body ? <p className="text-white text-base md:text-lg leading-relaxed mb-5 px-2">{popup.body}</p> : null}

        {(popup.prizePool || popup.winnersCount) ? (
          <div className="flex flex-col gap-1 mb-3">
            {popup.prizePool ? <p className="text-primary text-lg md:text-xl font-bold">🎁 {popup.prizePool}</p> : null}
            {popup.winnersCount ? <p className="text-white text-lg md:text-xl font-bold">🏆 {popup.winnersCount}</p> : null}
          </div>
        ) : null}
        {note ? (
          <div className={`mx-auto mb-4 flex max-w-md items-center justify-center gap-3 rounded-full border px-4 py-2 ${noteIcon === "usdxx" ? "border-[#73bf6b]/50" : "border-primary/50"}`}>
            {noteIcon === "usdxx" ? <Image src={UsdxxMark} alt="" className="h-8 w-8 shrink-0" /> : null}
            {noteIcon === "btcy" ? <Image src={BtcyMark} alt="" className="h-8 w-8 shrink-0" /> : null}
            {noteIcon && /^https:\/\//i.test(noteIcon) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={noteIcon} alt="" className="h-8 w-8 shrink-0 object-contain" />
            ) : null}
            <p className="text-left text-sm md:text-base text-white">{note}</p>
          </div>
        ) : null}
        {ends ? <p className="text-gray-400 text-sm md:text-base font-medium mb-4">{ends}</p> : null}

        {popupLinkHref(popup.ctaUrl) ? (
          <div className="flex justify-center mt-2">
            <CustomButton index={0} text={popup.ctaText || "Learn More"} handleButtonClick={open} isActive imageClassName="w-40 md:w-52 lg:w-56" />
          </div>
        ) : null}
      </div>
    </PopupComponent>
  );
};

export default AppPopupHandler;
