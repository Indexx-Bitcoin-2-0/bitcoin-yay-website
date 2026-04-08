"use client";

import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import VerifyPaymentIcon from "@/assets/images/verify_payment.svg";

export default function VerifyingPaymentPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="w-90 md:w-140 lg:w-180 p-10 md:p-14 lg:p-20 text-center flex flex-col items-center justify-center">
        <Image
          src={VerifyPaymentIcon}
          alt="Verifying Payment"
          className="w-32 md:w-40 lg:w-48 mb-10"
        />

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Verifying your payment
        </h2>

        <p className="text-lg md:text-xl text-tertiary mb-2">
          We are verifying your transaction.
        </p>
        <p className="text-lg md:text-xl text-tertiary mb-8">
          This usually takes 1–2 minutes.
        </p>

        <p className="text-base md:text-lg text-orange-500 font-medium">
          Please do not close this window until the verification is complete.
        </p>
      </div>
    </PopupComponent>
  );
}
