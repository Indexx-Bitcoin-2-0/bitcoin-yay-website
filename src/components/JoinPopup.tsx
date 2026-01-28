"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "./CustomButton2";
import BIcon from "@/assets/images/logo.webp"; // Using the orange B icon
import DownloadIcon from "@/assets/images/buttons/download-button.webp";
import { X } from "lucide-react";

interface JoinPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinPopup: React.FC<JoinPopupProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full max-w-[600px] text-white p-8 py-12 rounded-[32px] flex flex-col items-center">

        {/* Logo Section */}
        <div className="mb-8 mt-4">
          <div className="w-40 h-40 flex items-center justify-center">
            <Image
              src={BIcon}
              alt="Bitcoin Yay"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center mb-10 space-y-4 px-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
            Join the Bitcoin Yay
          </h2>
          <p className="text-base md:text-lg font-bold text-gray-200 my-10">
            To join Bitcoin Yay, download the app and create your account.
          </p>
          <p className="text-xs text-gray-400 ">
            If you already have an account, you can close this pop up and tap Login.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-10 w-full justify-center">
          <CustomButton2
            image={DownloadIcon}
            text="Download on App Store"
            onClick={() => window.open("https://apps.apple.com/ph/app/bitcoin-yay/id6744868017", "_blank")}
            imageStyling="w-16 h-16"
          />
          <CustomButton2
            image={DownloadIcon}
            text="Get it on Google Play"
            onClick={() => window.open("https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en", "_blank")}
            imageStyling="w-16 h-16"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default JoinPopup;
