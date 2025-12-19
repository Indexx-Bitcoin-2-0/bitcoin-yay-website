"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "./CustomButton2";
import SalesPageArt from '@/assets/images/christmas_icon.png';
import ArtImage1 from "@/assets/images/quantum-mining/quantum-mining-icon.webp";
import CartButtonImage from "@/assets/images/UpgradeNowSalesPage.svg";

interface BlackFridayPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onStartMining: (planName: "Electric" | "Turbo" | "Nuclear") => void;
}

const BlackFridayPopup: React.FC<BlackFridayPopupProps> = ({
    isOpen,
    onClose,
    onStartMining,
}) => {
    const router = useRouter();

    const handleBuyBTCY = () => {
        onClose();
        router.push("/quantum-mining");
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose} >
            <div className="w-90 md:w-140 lg:w-180 p-4 md:p-6 xl:p-8 text-center">
                {/* Top Section - Christmas Icon and Heading */}
                <div className="flex items-start justify-center gap-3 mb-4 md:mb-6">
                    {/* Christmas Icon */}
                    <div className="flex-shrink-0 mt-1">
                        <Image
                            src={SalesPageArt}
                            alt="Christmas Icon"
                            className="w-12 h-12 md:w-16 md:h-16 object-contain"
                        />
                    </div>
                    {/* Heading */}
                    <div className="flex flex-col items-start">
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">
                            CHRISTMAS SALE - LIMITED •
                        </h1>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                            +10% Bonus
                        </h2>
                    </div>
                </div>

                {/* Middle Section - Quantum Mining Icon */}
                <div className="flex justify-center mb-4 md:mb-6">
                    <Image
                        src={ArtImage1}
                        alt="Quantum Mining Icon"
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                    />
                </div>

                {/* Bonus Text */}
                <div className="mb-4 md:mb-6">
                    <p className="text-lg md:text-xl font-bold text-primary mb-1">
                        +10% Bonus
                    </p>
                    <p className="text-base md:text-lg text-white">
                        Btcy Token Purchases
                    </p>
                </div>

                {/* Christmas Sale Information */}
                <div className="mb-6 md:mb-8">
                    <p className="text-sm md:text-base text-white mb-2">
                        Christmas Sale: Valid till 28th December
                    </p>
                    <p className="text-sm md:text-base text-white">
                        Skip Daily Mining - Get BTCY Instantly
                    </p>
                </div>

                {/* Buy BTCY Button */}
                <div className="flex flex-col items-center gap-2 mb-4">
                    <CustomButton2
                        text="Buy BTCY to get 10% Bonus"
                        image={CartButtonImage}
                        imageStyling="w-20 h-20 md:w-24 md:h-24"
                        onClick={handleBuyBTCY}
                        textMaxWidth="200px"
                    />
                </div>

                {/* Disclaimer */}
                <p className="text-xs md:text-sm text-gray-400 mt-4">
                    This offer is available only on the Android app version.
                </p>
            </div>
        </PopupComponent>
    );
};

export default BlackFridayPopup;

