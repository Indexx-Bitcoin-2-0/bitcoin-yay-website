"use client";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";

import EyeButtonImage from "@/assets/images/buttons/eye-button.webp";

export default function SuccessPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <PopupComponent isOpen={isOpen} onClose={onClose}>
        <div className="w-90 md:w-120 lg:w-140 p-4 md:p-6 xl:p-10 text-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Payment Successful!
            </h1>
            <p className="md:text-xl text-tertiary mt-2">
              Your payment has been completed successfully. You will receive a
              confirmation message shortly.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-10">
            <CustomButton2
              image={EyeButtonImage}
              text="OK"
              onClick={() => {}}
              imageStyling="w-30"
            />
            <CustomButton2
              image={EyeButtonImage}
              text="View wallet"
              onClick={() => {}}
              imageStyling="w-30"
            />
          </div>
        </div>
      </PopupComponent>
    </div>
  );
}
