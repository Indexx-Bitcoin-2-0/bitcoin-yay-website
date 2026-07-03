"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
// TODO(graphics): swap this placeholder art for the Independence Week graphic
// once it's provided.
import BirthdayArt from "@/assets/images/popup/attention.webp";

interface BirthdayPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: Legacy component/file name kept ("BirthdayPopup") so its handler import
// stays intact. Content is the 4th of July Independence Week promotion.
const BirthdayPopup: React.FC<BirthdayPopupProps> = ({ isOpen, onClose }) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-140 lg:w-160 xl:w-180 p-6 md:p-8 xl:p-10 text-center bg-bg rounded-lg">

        {/* Illustration */}
        <div className="flex justify-center my-4 md:my-6">
          {/* <Image
            src={BirthdayArt}
            alt="Independence Week Illustration"
            className="w-36"
          /> */}
          <p className="text-8xl">🇺🇸 </p>
        </div>

        {/* Headline */}
        <h1 className="text-primary text-2xl md:text-4xl font-bold leading-tight mb-6">
          Independence Week
          <br />
          4th of July Special
        </h1>

        {/* Body */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-5 px-2">
          Celebrate Independence Week with Bitcoin Yay! For one week only, enjoy
          exclusive offers on BTCY mining plans:
        </p>

        {/* Offers */}
        <div className="flex flex-col gap-3 mb-6 px-2">
          <div className="rounded-lg py-1 px-4">
            <p className="text-primary text-lg md:text-xl font-bold">
              🚀 30% Bonus on Quantum Mining
            </p>
          </div>
          <div className="rounded-lg px-4 mt-[-10px]">
            <p className="text-white text-lg md:text-xl font-bold">
              ⚡ 20% OFF on Power Mining
            </p>
          </div>
        </div>

        {/* Campaign Dates */}
        <p className="text-primary text-base md:text-lg font-semibold mb-1 ">
          July 4 – July 10, 2026 · 7 Days Only
        </p>

        {/* Footer Note */}
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Offers apply automatically at checkout — don&apos;t miss out!
        </p>
      </div>
    </PopupComponent>
  );
};

export default BirthdayPopup;
