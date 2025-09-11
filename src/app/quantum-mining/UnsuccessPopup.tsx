import Image from "next/image";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";

import CrossImage from "@/assets/images/icons/cross-icon.webp";
import RetryButtonImage from "@/assets/images/buttons/retry-button.webp";

export default function UnsuccessPopup({
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
          <div className="flex flex-col items-center justify-center">
            <Image src={CrossImage} alt="Close" className="w-24 h-24" />
            <h1 className="text-2xl md:text-3xl font-bold">
              Payment Unsuccessful!
            </h1>
            <p className="md:text-xl text-tertiary mt-2">
              Something went wrong while processing your payment. Please try
              again or use a different payment method.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-10">
            <CustomButton2
              image={RetryButtonImage}
              text="Try again"
              onClick={() => onClose()}
              imageStyling="w-30"
            />
          </div>
        </div>
      </PopupComponent>
    </div>
  );
}
