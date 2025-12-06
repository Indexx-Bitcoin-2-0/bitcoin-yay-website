"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import ThumbsUpButtonImage from "@/assets/images/buttons/thumbs-up-button.webp";
import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
import CustomButton2 from "./CustomButton2";
import { PaymentModalDetail } from "@/components/paymentModalTypes";

interface PaymentFailedPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    planName?: string;
    details?: PaymentModalDetail[];
}

const PaymentFailedPopup: React.FC<PaymentFailedPopupProps> = ({
    isOpen,
    onClose,
    onTryAgain,
    planName,
    details,
}) => {
    const normalizedPlan = (planName ?? "").toLowerCase();

    const getPlanArtImage = () => {
        if (normalizedPlan.includes("turbo")) {
            return TurboMiningArtImage1;
        }
        if (normalizedPlan.includes("nuclear")) {
            return NuclearMiningArtImage1;
        }
        if (normalizedPlan.includes("electric")) {
            return ElectricMiningArtImage1;
        }

        return TurboMiningArtImage1;
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

                {details?.length ? (
                    <div className="text-left w-full text-sm text-gray-300 mb-6 space-y-2">
                        {details.map((detail) => (
                            <div
                                key={detail.label}
                                className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                            >
                                <span className="text-xs font-semibold text-tertiary">
                                    {detail.label}
                                </span>
                                <span className="text-sm font-medium text-white break-all">
                                    {detail.value ?? "—"}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : null}

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-4">
                    <CustomButton2
                        image={ThumbsUpButtonImage}
                        text="Cancel"
                        onClick={onClose}
                        imageStyling="w-28 md:w-32"
                    />
                    <CustomButton2
                        image={RegisterButtonImage}
                        text="Try Again"
                        onClick={onTryAgain}
                        imageStyling="w-28 md:w-32"
                    />
                </div>
            </div>
        </PopupComponent>
    );
};

export default PaymentFailedPopup;
