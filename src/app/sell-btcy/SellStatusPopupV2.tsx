"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import successIcon from "@/assets/images/dao/dashboard/correct-icon.svg";
import OkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import OrderHistoryButtonImage from "@/assets/images/buttons/note-button.webp";

interface SellStatusPopupV2Props {
  isOpen: boolean;
  onClose: () => void;
  usdtAmount?: number;
  currency?: string;
}

const SellStatusPopupV2: React.FC<SellStatusPopupV2Props> = ({
  isOpen,
  onClose,
  usdtAmount = 0,
  currency = "USDT",
}) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-[90vw] md:w-[560px] p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6">
          <Image
            src={successIcon}
            alt="Success"
            width={80}
            height={80}
            className="w-full h-full"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Sell Request Submitted
        </h2>

        <p className="text-2xl md:text-3xl font-bold text-primary mb-6">
          {usdtAmount.toFixed(2)} {currency}
        </p>

        <p className="text-base md:text-lg text-[#EAEAEA] leading-relaxed mb-3">
          Your sell request has been submitted successfully and is now being processed.
        </p>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-3">
          It will be completed{" "}
          <span className="text-white font-semibold">within 3 working days</span>, and you&apos;ll receive an email confirmation once the {currency} is sent.
        </p>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
          You can track your order anytime on the{" "}
          <span className="text-primary font-semibold">Order History</span> page.
        </p>

        <div className="flex flex-row items-center justify-center gap-16 md:gap-20">
          <CustomButton2
            image={OrderHistoryButtonImage}
            text="Order History"
            link="/order-history"
            imageStyling="w-20"
          />
          <CustomButton2
            image={OkButtonImage}
            text="OK"
            onClick={onClose}
            imageStyling="w-20"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default SellStatusPopupV2;
