"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import PayPalIcon from "@/assets/images/quantum-mining/paypal.webp";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";
import BackButton from '@/assets/images/backButton.svg'
import CustomButton2 from "./CustomButton2";
import { PaymentProvider } from "@/lib/subscriptions";

interface SubscriptionConfirmPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    onSubscribe: () => void;
    paymentMethod: PaymentProvider;
    subscriptionAmount: number;
    planName?: string;
}

const SubscriptionConfirmPopup: React.FC<SubscriptionConfirmPopupProps> = ({
    isOpen,
    onClose,
    onBack,
    onSubscribe,
    paymentMethod,
    subscriptionAmount,
    planName,
}) => {
    const getPaymentMethodIcon = () => {
        if (paymentMethod === "paypal") {
            return PayPalIcon;
        }
        // Other methods - return SVG or null
        return null;
    };

    const getPaymentMethodName = () => {
        const names: Record<PaymentProvider, string> = {
            paypal: "PayPal",
            stripe: "Stripe",
        };
        return names[paymentMethod] || paymentMethod;
    };

    const getPaymentMethodSVG = () => {
        if (paymentMethod === "stripe") {
            return (
                <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.587l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 3.407 2.445 5.178 6.05 6.83 2.34.98 3.356 1.6 3.356 2.704 0 .98-.84 1.545-2.354 1.545-1.905 0-4.515-.927-6.29-1.8l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.842-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-3.526-2.053-5.168-5.591-6.305z"
                        fill="#635BFF"
                    />
                </svg>
            );
        }
        return null;
    };

    const paymentIcon = getPaymentMethodIcon();

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-120 lg:w-140 p-6 md:p-8 xl:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                    Enter Amount
                </h2>

                {/* Payment Method Display */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        {paymentIcon ? (
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                                <Image
                                    src={paymentIcon}
                                    alt={getPaymentMethodName()}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                                />
                            </div>
                        ) : getPaymentMethodSVG() ? (
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                                {getPaymentMethodSVG()}
                            </div>
                        ) : (
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded bg-primary/20" />
                            </div>
                        )}
                        <p className="text-lg md:text-xl font-semibold text-white">
                            {getPaymentMethodName()}
                        </p>
                    </div>
                </div>

                {/* Subscription Amount */}
                <div className="mb-10">
                    <p className="text-base md:text-lg text-white mb-2">
                        Subscription Amount
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-white text-center">
                        ${subscriptionAmount}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-30">
                    {/* Back Button */}

                    {/* <CustomButton2 text="Back" image={BackButton} onClick={onBack} /> */}


                    <CustomButton2 text="Back" onClick={onBack} image={BellButtonImage} imageStyling=" w-25" />
                    <CustomButton2 text="Subscribe Now" onClick={onSubscribe} image={BellButtonImage} imageStyling=" w-25" />
                </div>
            </div>
        </PopupComponent>
    );
};

export default SubscriptionConfirmPopup;
