"use client";

import React from "react";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";

interface KycVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  onCompleteKyc: () => void | Promise<void>;
}

const KycVerificationPopup: React.FC<KycVerificationPopupProps> = ({
  isOpen,
  onClose,
  message,
  onCompleteKyc,
}) => {
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const handleCompleteKyc = async () => {
    if (isRedirecting) return;

    setIsRedirecting(true);
    try {
      await onCompleteKyc();
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-[90vw] md:w-[600px]  p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight max-w-lg mx-auto">
          Complete Verification<br />to Continue
        </h2>

        <div className="text-lg md:text-xl text-[#EAEAEA] mb-12 space-y-4 max-w-lg mx-auto">
          <p>
            {message ||
              "To sell BTCY and receive USDT, you need to complete identity verification (KYC)."}
          </p>
          <p>
            This helps keep your account secure and enables withdrawals.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <CustomButton2
            image={PointingButtonImage}
            text={isRedirecting ? "Opening..." : "Complete KYC"}
            onClick={handleCompleteKyc}
            disabled={isRedirecting}
            imageStyling="w-24 md:w-32 mb-[-5px]"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default KycVerificationPopup;
