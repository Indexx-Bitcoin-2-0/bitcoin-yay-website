"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import PayPalIcon from "@/assets/images/quantum-mining/paypal.webp";

interface PaymentMethodPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPaymentMethod: (method: "paypal" | "stripe") => void;
    planName?: string;
    subscriptionAmount?: number;
}

const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({
    isOpen,
    onClose,
    onSelectPaymentMethod,
    planName,
    subscriptionAmount,
}) => {
    const handlePaymentMethodClick = (method: "paypal" | "stripe") => {
        onSelectPaymentMethod(method);
        // Don't close - the parent will handle showing the confirmation popup
    };

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-120 lg:w-140 p-6 md:p-8 xl:p-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Select Payment Method
                    </h2>
                </div>
                <p className="text-base md:text-lg text-gray-400 mb-8">
                    Choose how you'd like to pay for your subscription
                </p>

                <div className="flex flex-col gap-4">
                    {/* PayPal Option */}
                    <button
                        onClick={() => handlePaymentMethodClick("paypal")}
                        className="flex items-center gap-4 p-4 rounded-lg  border border-bg2 hover:border-primary/50 transition-all cursor-pointer text-left group"
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Image
                                src={PayPalIcon}
                                alt="PayPal"
                                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg md:text-xl font-semibold text-white transition-colors">
                                PayPal
                            </p>
                            <p className="text-sm md:text-base text-gray-400 mt-1">
                                Pay with your PayPal account
                            </p>
                        </div>
                    </button>

                    {/* Stripe Option */}
                    <button
                        onClick={() => handlePaymentMethodClick("stripe")}
                        className="flex items-center gap-4 p-4 rounded-lg border border-bg2 hover:border-primary/50 transition-all cursor-pointer text-left group"
                    >
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                            <div className="w-full h-full flex items-center justify-center">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-10 h-10 md:w-12 md:h-12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.587l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 3.407 2.445 5.178 6.05 6.83 2.34.98 3.356 1.6 3.356 2.704 0 .98-.84 1.545-2.354 1.545-1.905 0-4.515-.927-6.29-1.8l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.842-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-3.526-2.053-5.168-5.591-6.305z"
                                        fill="#635BFF"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-lg md:text-xl font-semibold text-white  transition-colors">
                                Stripe
                            </p>
                            <p className="text-sm md:text-base text-gray-400 mt-1">
                                Pay with credit or debit card
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </PopupComponent>
    );
};

export default PaymentMethodPopup;

