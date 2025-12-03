"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import { Check } from "lucide-react";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import CustomButton2 from "./CustomButton2";
import CheckButton from '@/assets/images/CheckButton.svg'
interface PaymentSuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
    planName: "Electric Mining" | "Turbo Mining" | "Nuclear Mining";
}

const PaymentSuccessPopup: React.FC<PaymentSuccessPopupProps> = ({
    isOpen,
    onClose,
    planName,
}) => {
    const getPlanArtImage = () => {
        switch (planName) {
            case "Electric Mining":
                return ElectricMiningArtImage1;
            case "Turbo Mining":
                return TurboMiningArtImage1;
            case "Nuclear Mining":
                return NuclearMiningArtImage1;
            default:
                return ElectricMiningArtImage1;
        }
    };

    const artImage = getPlanArtImage();

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-120 lg:w-140 p-6 md:p-8 xl:p-10 text-center">
                {/* Character Illustration */}
                <div className="flex justify-center mb-6">
                    <Image
                        src={artImage}
                        alt="Mining Gopher"
                        className="w-48 md:w-64 lg:w-80 object-contain"
                    />
                </div>

                {/* Success Message */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-base md:text-lg text-gray-400">
                        You have successfully subscribed to {planName}.
                    </p>
                </div>

                {/* Done Button */}
                <div className="flex flex-col items-center justify-center gap-2">

                    <CustomButton2 text="Done" onClick={onClose} image={CheckButton} />
                </div>
            </div>
        </PopupComponent>
    );
};

export default PaymentSuccessPopup;

