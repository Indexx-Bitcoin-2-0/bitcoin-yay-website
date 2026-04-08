"use client";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import CancelOrderImage from "@/assets/images/buttons/cancelOrder.svg";

export default function CancelConfirmationPopup({
  isOpen,
  onClose,
  onStay,
  onCancel,
}: {
  isOpen: boolean;
  onClose: () => void;
  onStay: () => void;
  onCancel: () => void;
}) {
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-140 lg:w-160 p-10 md:p-14 lg:p-20 text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Are you Sure You want to cancel?
        </h2>

        <div className="space-y-4 text-tertiary text-lg md:text-xl lg:text-2xl leading-relaxed mb-12">
          <p>Your transaction is being verified.</p>
          <p>If you’ve already sent the payment, leaving this page may delay confirmation.</p>
        </div>

        <div className="flex items-start justify-around w-full gap-6 md:gap-10">
          <CustomButton2
            image={CheckMarkButtonImage}
            text="Stay on this page"
            onClick={onStay}
            imageStyling="w-24 md:w-32 lg:w-40"
          />
          <CustomButton2
            image={CancelOrderImage}
            text="Cancel Payment"
            onClick={onCancel}
            imageStyling="w-24 md:w-32 lg:w-40"
          />
        </div>
      </div>
    </PopupComponent>
  );
}
