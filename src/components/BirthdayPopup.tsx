"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import BirthdayArt from "@/assets/images/mining/turbo-mining-art-1.webp";

interface BirthdayPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: Legacy component/file name kept ("BirthdayPopup") so its handler import
// stays intact. Content is the Social Media Campaign promotion.
const BirthdayPopup: React.FC<BirthdayPopupProps> = ({ isOpen, onClose }) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-140 lg:w-160 xl:w-180 p-6 md:p-8 xl:p-10 text-center bg-bg rounded-lg">

        {/* Illustration */}
        <div className="flex justify-center my-4 md:my-6">
          <Image
            src={BirthdayArt}
            alt="Social Media Campaign Illustration"
            className="w-50"
          />

        </div>

        {/* Headline */}
        <h1 className="text-primary text-2xl md:text-4xl font-bold leading-tight mb-6">
          Social Media Campaign
          <br />
          Follow &amp; Earn
        </h1>

        {/* Body */}
        <p className="text-white text-base md:text-lg leading-relaxed mb-5 px-2">
          Follow our official Bitcoin Yay &amp; EMMM channels, upload your
          screenshots as proof, and claim your reward:
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-6 px-2">
          <div className="rounded-lg py-1 px-4">
            <p className="text-primary text-lg md:text-xl font-bold">
              👥 Follow Bitcoin Yay &amp; EMMM
            </p>
          </div>
          <div className="rounded-lg px-4 mt-[-10px]">
            <p className="text-white text-lg md:text-xl font-bold">
              📸 Upload Your Screenshots
            </p>
          </div>

        </div>

        {/* Reward */}
        <p className="text-primary text-base md:text-lg font-semibold mb-1 ">
          🎁 Reward · 2 Weeks Turbo Mining Power
        </p>

        {/* Footer Note */}
        <p className="text-gray-400 text-sm md:text-base font-medium">
          Our team will review your submission and grant your reward once approved.
        </p>
      </div>
    </PopupComponent>
  );
};

export default BirthdayPopup;
