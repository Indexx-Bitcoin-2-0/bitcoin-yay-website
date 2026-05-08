"use client";

import React from "react";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import customerSupport from "@/assets/images/buttons/customer_support.svg";
import failedIcon from "@/assets/images/failed_icon.svg";

interface TransactionFailedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string; // Add this prop
}

const TransactionFailedPopup: React.FC<TransactionFailedPopupProps> = ({
  isOpen,
  onClose,
  errorMessage, // Destructure it here
}) => {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-[90vw] md:w-[600px] p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <img
            src={failedIcon?.src}
            alt="Failed"
            className="w-34 h-34 text-primary mb-[-30px]"
          />
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
          Transaction Failed
        </h2>

        {/* Dynamic Error Message Section */}
        <p className="text-lg md:text-xl text-[#FF6B6B] font-semibold mb-4 max-w-lg mx-auto">
          {errorMessage ||
            "Something went wrong while processing your request."}
        </p>

        <p className="text-sm md:text-base text-[#EAEAEA] mb-12 max-w-lg mx-auto">
          Please check the requirements and try again. If the issue continues,
          contact customer support.
        </p>

        <div className="flex flex-col items-center justify-center">
          <CustomButton2
            image={customerSupport}
            text="Contact Support"
            onClick={() => {
              window.open("YOUR_SUPPORT_LINK", "_blank");
              onClose();
            }}
            imageStyling="w-24 md:w-32 mb-[-5px]"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default TransactionFailedPopup;
