"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import { Flame, Zap, Gauge, Atom, Pickaxe } from "lucide-react";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import CustomButton2 from "./CustomButton2";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";

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
    const plans = [
        {
            name: "Electric",
            originalPrice: 100,
            discountedPrice: 30,
            icon: Zap,
            artImage: ElectricMiningArtImage1,
        },
        {
            name: "Turbo",
            originalPrice: 300,
            discountedPrice: 90,
            icon: Gauge,
            artImage: TurboMiningArtImage1,
        },
        {
            name: "Nuclear",
            originalPrice: 600,
            discountedPrice: 180,
            icon: Atom,
            artImage: NuclearMiningArtImage1,
        },
    ];

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose} >
            <div className="w-90 md:w-140 lg:w-180 p-4 md:p-6 xl:p-8 text-center">
                {/* Title with Flame Icon */}
                <div className="flex items-center justify-center gap-3 mb-4 md:mb-10">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                        70% OFF Power Mining Subscription
                    </h1>
                </div>

                {/* Pricing Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                    {plans.map((plan) => {
                        return (
                            <div
                                key={plan.name}
                                className="flex flex-col items-center gap-3 mb-10 md:mb-2"
                            >
                                <div>
                                    <Image
                                        src={plan.artImage}
                                        alt={plan.name}
                                        className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                    />
                                </div>

                                {/* Plan Name */}
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                    {plan.name}
                                </h3>

                                {/* Pricing */}
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-base md:text-lg text-gray-400 line-through">
                                        ${plan.originalPrice}
                                    </span>
                                    <span className="text-xl md:text-2xl font-bold text-primary">
                                        ${plan.discountedPrice}
                                    </span>
                                </div>

                                {/* Art Image */}

                            </div>
                        );
                    })}
                </div>

                {/* Deal Information */}
                <div className="mb-4 md:mb-6">
                    <p className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                        Black Friday Deal.
                    </p>
                    <p className="text-sm md:text-base text-gray-400">
                        More mining power for almost no cost.
                    </p>
                </div>

                {/* Start Mining Button */}
                <div className="flex flex-col items-center gap-2">
                    <CustomButton2
                        text="Subscribe Now"
                        link="/mining/power-mining"
                        image={BellButtonImage}
                        imageStyling="w-25"
                    />
                </div>
            </div>
        </PopupComponent>
    );
};

export default BlackFridayPopup;

