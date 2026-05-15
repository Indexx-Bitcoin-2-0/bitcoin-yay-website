"use client";

import React from "react";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";

interface WireTransferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  payAmount: string;
  wireOrderId: string | null;
}

const WireTransferPopup: React.FC<WireTransferPopupProps> = ({
  isOpen,
  onClose,
  payAmount,
  wireOrderId,
}) => {
  const bankDetails = [
    { label: "Recipient", value: "Indexx.ai" },
    { label: "Bank", value: "Wells Fargo" },
    { label: "Account Number", value: "1793811546" },
    { label: "Routing Number", value: "121000248" },
    { label: "SWIFT Code", value: "WFBIUS6S" },
    { label: "Amount", value: `$${Number(payAmount).toFixed(2)} USD` },
  ];

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 lg:w-160 p-6 md:p-8 xl:p-10 text-left border border-white/10 shadow-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Wire Transfer Instructions
        </h2>

        <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 text-center px-2">
          Please send your wire transfer to the bank account below. <br className="hidden md:block" />
          Include your Order ID in the reference/memo field.
        </p>

        <div className="space-y-2 bg-white/[0.03] rounded-2xl p-4 md:p-6 border border-white/5">
          <div className="flex justify-between items-center py-3 border-b border-white/[0.05]">
            <span className="text-sm md:text-base text-gray-400 font-medium">Order ID</span>
            <span className="text-sm md:text-base text-primary font-bold">{wireOrderId || "3287479"}</span>
          </div>
          {bankDetails.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center py-3 border-b border-white/[0.05] last:border-0">
              <span className="text-sm md:text-base text-gray-400 font-medium">{label}</span>
              <span className="text-sm md:text-base text-white font-bold">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 border-l-4 border-primary bg-primary/5 rounded-r-xl p-4 md:p-5">
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed italic">
            After sending the wire, email <span className="text-primary font-semibold">support@indexx.ai</span> with your Order ID and transfer receipt. BTCY will be credited once payment is confirmed.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <CustomButton2
            image={CheckMarkButtonImage}
            text="Done"
            onClick={onClose}
            imageStyling="w-24 md:w-30"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default WireTransferPopup;
