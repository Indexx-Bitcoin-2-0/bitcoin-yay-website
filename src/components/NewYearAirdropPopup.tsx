"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "./CustomButton2";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
// Using one of the airdrop art images for the illustration
import AirdropArt from "@/assets/images/btcy-airdrop/btcyairdroppopup.svg";

interface NewYearAirdropPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewYearAirdropPopup: React.FC<NewYearAirdropPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const router = useRouter();

    const handleRegister = () => {
        onClose();
        router.push("/airdrop");
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-140 lg:w-160 xl:w-180 p-6 md:p-8 xl:p-10 text-center bg-bg rounded-lg">
                {/* Logo Section - Bitcoin B icon + bitcoin-YAY text */}
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Image
                        src={LogoImage}
                        alt="Bitcoin Yay Logo"
                        className=" md:w-70 md:h-20"
                    />

                </div>

                {/* Powered By Section */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-white text-xs md:text-base">Powered By</span>
                    <Image
                        src={IndexxLogo}
                        alt="Indexx.ai Logo"
                        className="h-4 md:h-10 w-auto"
                    />
                </div>

                {/* Main Headline */}
                <div className="mb-6">
                    <h1 className="text-white text-2xl md:text-3xl  font-bold mb-3">
                        Bitcoin Yay
                    </h1>
                    <h2 className="text-primary text-5xl md:text-6xl  font-bold mb-3 leading-tight">
                        New Year Airdrop
                    </h2>
                    <p className="text-white text-xl md:text-2xl font-semibold">
                        Is Live!
                    </p>
                </div>

                {/* Illustration */}
                <div className="flex justify-center my-6 md:my-8">
                    <Image
                        src={AirdropArt}
                        alt="Airdrop Illustration"
                        className="w-48 md:w-64 lg:w-72  object-contain"
                    />
                </div>

                {/* Airdrop Details */}
                <div className="text-white space-y-2 md:space-y-3 mb-8">
                    <p className="text-base md:text-lg font-semibold">
                        You will get a chance to Win  250 BTC (~$25)
                    </p>
                    <p className="text-base ">
                        100 Winners
                    </p>
                    <p className="text-base ">
                        Ends Jan 04, 2026
                    </p>
                    <p className="text-base  ">
                        Distribution  Jan 05, 2026
                    </p>
                </div>

                {/* Register Now Button */}
                <div className="flex flex-col items-center justify-center">
                    <CustomButton2
                        text="REGISTER NOW!"
                        image={RegisterButtonImage}
                        imageStyling="w-20 md:w-24 lg:w-28"
                        onClick={handleRegister}
                    />
                </div>
            </div>
        </PopupComponent>
    );
};

export default NewYearAirdropPopup;

