"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import BirthdayArt from "@/assets/images/popup/attention.webp";

interface BirthdayPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const BirthdayPopup: React.FC<BirthdayPopupProps> = ({ isOpen, onClose }) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-140 lg:w-160 xl:w-180 p-6 md:p-8 xl:p-10 text-center bg-bg rounded-lg">

        {/* Illustration */}
        <div className="flex justify-center my-4 md:my-6">
          <Image
            src={BirthdayArt}
            alt="Birthday Illustration"
            className="w-36"
          />
        </div>

        {/* Headline */}
        <h1 className="text-primary text-2xl md:text-4xl font-bold leading-tight mb-6">
          FIFA World Cup
          <br />
          50 Referral Challenge
        </h1>

        {/* Body */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-4 px-2">
          Refer 50+ verified users during the FIFA World Cup 2026 campaign and unlock 2 weeks of Nuclear Power Boost plus access to the Mining Station.
        </p>

        {/* Campaign Dates */}
        <p className="text-primary text-base md:text-lg font-semibold mb-6">
          11 June – 19 July 2026
        </p>

        {/* Footer Note */}
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Start referring now!
        </p>
      </div>
    </PopupComponent>
  );
};

export default BirthdayPopup;
