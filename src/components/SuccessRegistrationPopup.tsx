import React from "react";
import { useRouter } from "next/navigation";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import DownloadButtonImage from "@/assets/images/buttons/download-button.webp";
import InfoButtonImage from "@/assets/images/buttons/point-button.webp";

interface SuccessRegistrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessRegistrationPopup: React.FC<SuccessRegistrationPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const handleDownloadApp = () => {
    onClose();
    router.push("/#apple-store-download");
  };

  const handleAboutUs = () => {
    onClose();
    router.push("/about");
  };
  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 xl:w-160 bg-bg1 px-4 py-6 md:px-12 md:py-12 flex flex-col items-center text-center">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-tertiary text-2xl md:text-3xl xl:text-4xl font-bold mb-2">
            Congratulations!
          </h2>
          <h3 className="text-tertiary text-2xl md:text-3xl xl:text-4xl font-semibold">
            You&apos;re now part of bitcoin-yay
          </h3>
        </div>

        {/* Body Text */}
        <div className="mb-8">
          <p className="text-tertiary text-lg md:text-xl mb-4">
            Welcome to the world of crypto rewards, mining, and community power.
          </p>
          <p className="text-tertiary text-lg md:text-xl">
            Your account has been successfully created — start exploring, begin
            mining, and earn your first BTCY today!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full px-4 md:px-10 py-6">
          <CustomButton2
            image={DownloadButtonImage}
            text="Download The App"
            onClick={handleDownloadApp}
            imageStyling="w-24 md:w-32"
          />
          <CustomButton2
            image={InfoButtonImage}
            text="About Us"
            onClick={handleAboutUs}
            imageStyling="w-24 md:w-32"
          />
        </div>
      </div>
    </PopupComponent>
  );
};

export default SuccessRegistrationPopup;
