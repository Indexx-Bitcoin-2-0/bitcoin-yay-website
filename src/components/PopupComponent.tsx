// components/Popup.tsx

import React, { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";

import CrossImage from "@/assets/images/icons/cross-white.png";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

// Shared counter so stacked popups don't fight over body scroll lock.
// The page only unlocks once the LAST open popup closes.
let openPopupCount = 0;

const lockBodyScroll = () => {
  if (openPopupCount === 0) {
    document.body.style.overflow = "hidden";
  }
  openPopupCount += 1;
};

const unlockBodyScroll = () => {
  openPopupCount = Math.max(0, openPopupCount - 1);
  if (openPopupCount === 0) {
    document.body.style.overflow = "";
  }
};

const PopupComponent: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Lock background scroll while the popup is open so only the popup scrolls
  useEffect(() => {
    if (!isOpen) return;

    lockBodyScroll();

    return () => {
      unlockBodyScroll();
    };
  }, [isOpen]);

  // Handle click outside popup
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       popupRef.current &&
  //       !popupRef.current.contains(event.target as Node)
  //     ) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#68676763] overflow-y-auto">
      <div ref={popupRef} className="relative shadow-lg bg-bg z-100 mt-50 md:mt-50 ">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 md:top-1 md:-right-14 flex items-center justify-center z-100"
          >
            <Image
              src={CrossImage}
              alt="Close"
              className="w-10 h-8 hover:scale-110 cursor-pointer"
            />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopupComponent;