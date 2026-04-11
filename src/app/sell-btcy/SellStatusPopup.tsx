"use client";

import React from "react";
import PopupComponent from "@/components/PopupComponent";
import { Check } from "lucide-react";
import activeIcon from "@/assets/images/sell-btcy/active_icon.svg";
import pendingIcon from "@/assets/images/sell-btcy/inactive_icon.svg";
import Image from "next/image";
interface SellStatusPopupProps {
  isOpen: boolean;
  onClose: () => void;
  usdtAmount?: number;
}

const SellStatusPopup: React.FC<SellStatusPopupProps> = ({
  isOpen,
  onClose,
  usdtAmount = 14.26562,
}) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-[90vw] md:w-[500px]  p-8 md:p-12 flex flex-col items-center justify-center text-left ">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Amount
        </h2>
        <p className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-12">
          {usdtAmount} USDT
        </p>

        {/* Timeline Container */}
        <div className="w-full max-w-sm pl-4 relative">

          {/* Step 1 */}
          <div className="relative flex items-start mb-10 group">
            {/* Orange Line connecting 1 and 2 */}
            <div className="absolute left-[13px] top-[30px] bottom-[-40px] w-[1px] bg-primary z-0"></div>

            <div className="relative z-10 flex-shrink-0 w-8 h-8  flex items-center justify-center mr-6">
              <Image src={activeIcon} alt="BTCY Icon" width={50} height={50} />
            </div>

            <div className="flex flex-col">
              <p className="text-lg md:text-xl text-white font-medium">Selling request submitted</p>
              <p className="text-sm text-gray-400 mt-1">09/01/2024, 21:19:27</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-start mb-10 group">
            {/* Gray Line connecting 2 and 3 */}
            <div className="absolute left-[13px] top-[30px] bottom-[-40px] w-[1px] bg-[#444444] z-0"></div>

            <div className="relative z-10 flex-shrink-0 w-8 h-8  flex items-center justify-center mr-6">
              <Image src={activeIcon} alt="BTCY Icon" width={50} height={50} />
            </div>

            <div className="flex flex-col">
              <p className="text-lg md:text-xl text-white font-medium">Selling request submitted</p>
              <p className="text-sm text-gray-400 mt-1">You have one minute to cancel</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-start mb-10 group">
            {/* Gray Line connecting 3 and 4 */}
            <div className="absolute left-[13px] top-[30px] bottom-[-40px] w-[1px] bg-[#444444] z-0"></div>

            <div className="relative z-10 flex-shrink-0 w-8 h-8  flex items-center justify-center mr-6">
              <Image src={pendingIcon} alt="BTCY Icon" width={50} height={50} />

            </div>

            <div className="flex flex-col mt-[-2px]">
              <p className="text-lg md:text-xl text-white font-medium">Selling request submitted</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-start group">
            <div className="relative z-10 flex-shrink-0 w-8 h-8  flex items-center justify-center mr-6">
              <Image src={pendingIcon} alt="BTCY Icon" width={50} height={50} />
            </div>

            <div className="flex flex-col mt-[-2px]">
              <p className="text-lg md:text-xl text-white font-medium">Sent</p>
            </div>
          </div>

        </div>
      </div>
    </PopupComponent>
  );
};

export default SellStatusPopup;
