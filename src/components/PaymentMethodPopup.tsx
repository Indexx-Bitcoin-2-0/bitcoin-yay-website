"use client";

import React from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import PayPalIcon from "@/assets/images/popup/paypal.svg";
import StripeIcon from "@/assets/images/popup/stripe.svg";
import WireIcon from "@/assets/images/popup/wire.svg";
import ZelleIcon from "@/assets/images/popup/zelle.svg";
import TygaPayIcon from "@/assets/images/popup/tygapay.svg";
import VenmoIcon from "@/assets/images/popup/venmo.svg";
import AchIcon from "@/assets/images/popup/ach.svg";
import CreditCardIcon from "@/assets/images/popup/creditCard.svg";

type PaymentMethod = "paypal" | "stripe" | "creditcard" | "ach" | "wire" | "zelle" | "tygapay" | "venmo";
type PaymentProvider = "paypal" | "stripe";

interface PaymentMethodPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPaymentMethod: (method: PaymentProvider) => void;
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
    const handlePaymentMethodClick = (method: PaymentMethod, disabled: boolean) => {
        if (disabled) return;

        // Map creditcard to stripe since Stripe handles credit cards
        const provider: PaymentProvider = method === "creditcard" ? "stripe" : method as PaymentProvider;
        onSelectPaymentMethod(provider);
        // Don't close - the parent will handle showing the confirmation popup
    };

    const paymentMethods = [
        {
            id: "creditcard" as PaymentMethod,
            name: "Credit Card",
            description: "",
            disabled: false,
            icon: (
                <Image
                    src={CreditCardIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },

        {
            id: "paypal" as PaymentMethod,
            name: "PayPal",
            description: "",
            disabled: false,
            icon: (
                <Image
                    src={PayPalIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },
        {
            id: "stripe" as PaymentMethod,
            name: "Stripe",
            description: "",
            disabled: false,
            icon: (
                <Image
                    src={StripeIcon}
                    alt="Stripe"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },

        {
            id: "ach" as PaymentMethod,
            name: "ACH",
            description: "This option is not available for subscription payments",
            disabled: true,
            icon: (
                <Image
                    src={AchIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },
        {
            id: "wire" as PaymentMethod,
            name: "Wire transfer",
            description: "This option is not available for subscription payments",
            disabled: true,
            icon: (
                <Image
                    src={WireIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },
        {
            id: "zelle" as PaymentMethod,
            name: "Zelle",
            description: "This option is not available for subscription payments",
            disabled: true,
            icon: (
                <Image
                    src={ZelleIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },
        {
            id: "tygapay" as PaymentMethod,
            name: "TygaPay",
            description: "This option is not available for subscription payments",
            disabled: true,
            icon: (
                <Image
                    src={TygaPayIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },
        {
            id: "venmo" as PaymentMethod,
            name: "Venmo",
            description: "This option is not available for subscription payments",
            disabled: true,
            icon: (
                <Image
                    src={VenmoIcon}
                    alt="PayPal"
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
            ),
        },
    ];

    return (
        <PopupComponent isOpen={isOpen} onClose={onClose}>
            <div className="w-90 md:w-120 lg:w-140 p-6 md:p-8 xl:p-10 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Select Payment Method
                    </h2>
                </div>
                <p className="text-base md:text-lg text-gray-400 mb-8">
                    Choose how you'd like to pay for your subscription
                </p>

                <div className="flex flex-col gap-4">
                    {paymentMethods.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => handlePaymentMethodClick(method.id, method.disabled)}
                            disabled={method.disabled}
                            className={`flex items-center gap-4 p-4 rounded-lg border transition-all text-left group ${method.disabled
                                ? "border-bg2/50 opacity-50 cursor-not-allowed"
                                : "border-bg2 hover:border-primary/50 cursor-pointer"
                                }`}
                        >
                            <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0"
                                }`}>
                                <div className={method.disabled ? "opacity-50" : ""}>
                                    {method.icon}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className={`text-lg md:text-xl font-semibold transition-colors ${method.disabled ? "text-gray-500" : "text-white"
                                    }`}>
                                    {method.name}
                                </p>
                                <p className={`text-sm md:text-base mt-1 ${method.disabled ? "text-gray-600" : "text-gray-400"
                                    }`}>
                                    {method.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </PopupComponent>
    );
};

export default PaymentMethodPopup;

