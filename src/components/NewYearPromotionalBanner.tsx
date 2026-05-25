"use client";

import Image from "next/image";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import DownloadIcon from "@/assets/images/buttons/download-button.webp";
import PromotionalArt from "@/assets/images/birthdayArt.svg";
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
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#f28132] mb-1 md:mb-2">
                            Alchemy Goes Live May 29
                        </h1>

                        <p className="text-lg md:text-2xl text-white font-semibold mt-4">
                            BTCY turns one. Celebrate our birthday with the launch you&apos;ve been mining toward — convert your Nuggets into BTCY tokens
                        </p>

                        <p className="text-base md:text-lg text-white mt-4">
                            Hit 50,000 mined BTCY to qualify. Controlled rollout — early miners first.
                        </p>
                    </div>

                    {/* Bottom - Buttons and Disclaimer */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex flex-row items-center gap-4">
                            <CustomButton2
                                image={DownloadIcon}
                                text="Download on App Store"
                                link="https://apps.apple.com/ph/app/bitcoin-yay/id6744868017"
                                imageStyling="w-24 h-24"
                            />
                            <CustomButton2
                                image={DownloadIcon}
                                text="Get it on Google Play"
                                link="https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en"
                                imageStyling="w-24 h-24"
                            />
                        </div>
                        <p className="text-[#f28132] text-xs md:text-sm mt-3 md:mt-4 text-center md:text-left">
                            Alchemy outcomes are randomized.
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
