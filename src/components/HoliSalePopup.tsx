"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import logo from "@/assets/images/logo.svg";
import indexxai from "@/assets/images/indexx.ai.svg";
import btcyairdroppopup from "@/assets/images/btcy-airdrop/btcyairdroppopup.svg";
import PointFingerButtonImage from "@/assets/images/buttons/register-button.webp";

interface HoliSalePopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const HoliSalePopup: React.FC<HoliSalePopupProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    const handleRegister = () => {
        onClose();
        router.push("/airdrop");
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-164 p-6 md:p-8 text-center flex flex-col items-center">
                {/* Branding Headers */}
                <div className="flex flex-col items-center mb-6">
                    <Image src={logo} alt="Bitcoin Yay" className="w-32 md:w-48" />
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm md:text-base text-gray-400">Powered By</span>
                        <Image src={indexxai} alt="Indexx.ai" className="w-20 md:w-28" />
                    </div>
                </div>

                <h2 className="text-xl md:text-3xl font-medium text-white">Bitcoin Yay</h2>
                <h1 className="text-3xl md:text-6xl font-bold text-primary mt-2">
                    Social Media Airdrop
                </h1>
                <p className="text-xl md:text-3xl font-medium text-white mt-4 uppercase tracking-wider">
                    Is Live !
                </p>

                {/* Main Graphic */}
                <div className="my-8">
                    <Image
                        src={btcyairdroppopup}
                        alt="Airdrop Graphic"
                        className="w-56 md:w-80 object-contain"
                    />
                </div>

                {/* Promo Text */}
                <div className="space-y-4 mb-8 max-w-lg">
                    <p className="text-lg md:text-[18px] font-medium text-white">
                        Create a post about Bitcoin Yay, tag us, and submit your link for a chance to win USDT rewards.
                    </p>
                    <p className="text-lg md:text-[19px] font-bold text-primary">
                        There will be a total of 10 winners
                    </p>
                    <p className="text-base md:text-[18px] text-gray-300">
                        All participants will receive 7 Days of <span className="text-primary">Nuclear Power Mining</span> for helping spread the word about Bitcoin Yay.
                    </p>
                </div>

                {/* Dates */}
                <div className="text-base md:text-xl font-medium text-[#D5D5D5] space-y-2 mb-10 text-center">
                    <p>Ends March 30, 2026</p>
                    <p>Distribution March 31, 2026</p>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-center">
                    <CustomButton2
                        image={PointFingerButtonImage}
                        text="REGISTER NOW!"
                        imageStyling="w-20 md:w-24"
                        onClick={handleRegister}
                    />
                </div>
            </div>
        </PopupComponent>
    );
};

export default HoliSalePopup;
