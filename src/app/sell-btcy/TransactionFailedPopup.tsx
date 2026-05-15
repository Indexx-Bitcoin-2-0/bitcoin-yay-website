"use client";

import React from "react";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import customerSupport from "@/assets/images/buttons/customer_support.svg"
import failedIcon from '@/assets/images/failed_icon.svg'
interface TransactionFailedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const TransactionFailedPopup: React.FC<TransactionFailedPopupProps> = ({
  isOpen,
  onClose,
  message = "Something went wrong while processing your request. Please try again. If the issue continues, contact customer support.",
}) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-[90vw] md:w-[600px] p-8 md:p-12 flex flex-col items-center justify-center text-center">
        {/* Big Orange X */}
        <div className="mb-8">
          <img src={failedIcon?.src} alt="Failed" className="w-34 h-34 text-primary mb-[-30px]" />
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
          Transaction Failed
        </h2>

        <p className="text-lg md:text-xl text-[#EAEAEA] mb-12 max-w-lg mx-auto">
          {message}
        </p>

        <div className="flex flex-col items-center justify-center">

          <CustomButton2
            image={customerSupport}
            text="Contact Support"
            link="/support/#contact-us"
            imageStyling="w-24 md:w-32 mb-[-5px]"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default TransactionFailedPopup;
