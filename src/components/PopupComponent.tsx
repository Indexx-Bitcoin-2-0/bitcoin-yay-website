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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6d6c6c25]">
      <div className="relative shadow-lg bg-bg z-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center z-100"
        >
          <Image
            src={CrossImage}
            alt="Close"
            className="w-6 h-5 hover:scale-110 cursor-pointer"
          />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PopupComponent;
