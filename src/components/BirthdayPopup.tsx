"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import BirthdayArt from "@/assets/images/birthdayPopup.svg";

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
            className="w-48 md:w-64 lg:w-72 object-contain"
          />
        </div>

        {/* Headline */}
        <h1 className="text-primary text-2xl md:text-4xl font-bold leading-tight mb-6">
          Happy Birthday from BTCY
          <br />
          Here&apos;s Your Gift
        </h1>

        {/* Body */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-6 px-2">
          To celebrate one year of mining together, every miner gets 7 days of
          Nuclear Power Mining, free. That&apos;s 9x faster mining and a faster
          route to your 50,000 BTCY Alchemy threshold.
        </p>

        {/* Footer Note */}
        <p className="text-primary text-sm md:text-base font-medium">
          Activates automatically. No purchase, no code needed.
        </p>
      </div>
    </PopupComponent>
  );
};

export default BirthdayPopup;
