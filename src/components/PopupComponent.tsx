// components/Popup.tsx

import React, { ReactNode } from "react";
import Image from "next/image";

import CrossImage from "@/assets/images/icons/cross-white.png";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupComponent: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#68676763]">
      <div className="relative shadow-lg bg-bg z-100">
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
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopupComponent;
