"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import PowerMiningIcon from "@/assets/images/mining/power-mining-icon.webp";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";

interface HoliSalePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const HoliSalePopup: React.FC<HoliSalePopupProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    const handleSubscribe = () => {
        onClose();
        router.push("/mining/power-mining");
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-140 p-6 md:p-8 text-center">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-6">
                    Holi Power Mining Sale – 20% OFF!
                </h1>

                {/* Promo code line */}
                <p className="text-base md:text-lg font-bold text-white mb-1">
                    Use code{" "}
                    <span className="text-primary">HOLI20</span>{" "}
                    and get{" "}
                    <span className="text-primary">20% OFF</span>{" "}
                    on all
                </p>
                <p className="text-base md:text-lg font-bold text-white mb-6">
                    Power Mining Subscriptions
                </p>

                {/* Bitcoin + Lightning image */}
                <div className="flex justify-center my-6">
                    <Image
                        src={PowerMiningIcon}
                        alt="Power Mining"
                        className="w-36 md:w-44 object-contain"
                    />
                </div>

                {/* Scarcity + validity */}
                <div className="space-y-1 mb-8">
                    <p className="text-sm md:text-base font-semibold text-white">
                        Only for the first 100 users, Limited coupons available!
                    </p>
                    <p className="text-sm md:text-base text-gray-400">
                        Valid from March 4 – March 7
                    </p>
                </div>

                {/* Subscribe Now button */}
                <div className="flex flex-col items-center">
                    <CustomButton2
                        image={BellButtonImage}
                        text="Subscribe Now"
                        imageStyling="w-20 md:w-24"
                        onClick={handleSubscribe}
                    />
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 mt-6">
                    This offer is available only on the website. Not valid on the app.
                </p>
            </div>
        </PopupComponent>
    );
};

export default HoliSalePopup;
