"use client";

import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";
import PromotionalArt from "@/assets/images/btcy-airdrop/btcyairdroppopup.svg";
import CustomButton2 from "./CustomButton2";

const NewYearPromotionalBanner = () => {
    return (
        <div className="w-full bg-[#2a2a2a] rounded-lg overflow-hidden p-10">
            {/* Top - Logos */}
            <div className="flex flex-col items-center">
                {/* Bitcoin YAY Logo */}
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Image
                        src={LogoImage}
                        alt="Bitcoin Yay Logo"
                        className="w-80 h-20"
                    />

                </div>

                {/* Powered By */}
                <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-white text-base md:text-lg">Powered By</span>
                    <Image
                        src={IndexxLogo}
                        alt="Indexx.ai Logo"
                        className="h-10 w-auto"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch ">
                {/* Left Section - Content */}
                <div className="flex-1 flex flex-col justify-between p-6 md:p-8 ">

                    {/* Middle - Promotional Text */}
                    <div className="flex-1 flex flex-col justify-center mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">
                            Mine 15× faster this New Year
                        </h1>

                        <p className="text-lg md:text-2xl text-white font-semibold mt-4">
                            New Year Special: Unlock 15× faster mining Speed and maximize your rewards.
                        </p>
                    </div>

                    {/* Bottom - Button and Disclaimer */}
                    <div className="flex flex-col items-center md:items-start">
                        <CustomButton2 image={BellButtonImage} text="Subscribe" link="/new-year-boost" imageStyling="w-20" />
                        <p className="text-white text-xs md:text-sm mt-3 md:mt-4 text-center md:text-left">
                            This is a Limited Time Offer.
                        </p>
                    </div>
                </div>

                {/* Right Section - Illustration */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={PromotionalArt}
                            alt="Promotional Illustration"
                            className="w-full h-full object-contain max-w-[400px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewYearPromotionalBanner;

