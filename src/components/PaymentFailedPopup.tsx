"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import { X, Check } from "lucide-react";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";

interface PaymentFailedPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    planName: "Electric Mining" | "Turbo Mining" | "Nuclear Mining";
}

const PaymentFailedPopup: React.FC<PaymentFailedPopupProps> = ({
    isOpen,
    onClose,
    onTryAgain,
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

                {/* Error Message */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Payment Failed
                    </h1>
                    <p className="text-base md:text-lg text-gray-400 max-w-md">
                        We couldn't process your payment. Please try again or use a different payment method.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-6">
                    {/* Cancel Button */}
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={onClose}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-bg2 border border-bg3 flex items-center justify-center hover:border-primary/50 transition-all cursor-pointer shadow-lg"
                        >
                            <X className="w-10 h-10 md:w-12 md:h-12 text-white stroke-[3]" />
                        </button>
                        <p className="text-base md:text-lg text-white font-medium">Cancel</p>
                    </div>

                    {/* Try Again Button */}
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={onTryAgain}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-all cursor-pointer shadow-lg"
                        >
                            <Check className="w-10 h-10 md:w-12 md:h-12 text-white stroke-[3]" />
                        </button>
                        <p className="text-base md:text-lg text-white font-medium">Try Again</p>
                    </div>
                </div>
            </div>
        </PopupComponent>
    );
};

export default PaymentFailedPopup;

