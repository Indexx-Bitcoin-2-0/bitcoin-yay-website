"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, ArrowUp } from "lucide-react";
import LoginPopup from "@/components/LoginPopup";
import PaymentMethodPopup from "@/components/PaymentMethodPopup";
import SubscriptionConfirmPopup from "@/components/SubscriptionConfirmPopup";
import PaymentSuccessPopup from "@/components/PaymentSuccessPopup";
import PaymentFailedPopup from "@/components/PaymentFailedPopup";

import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import CustomButton2 from "@/components/CustomButton2";
import CheckIcon from '@/assets/images/currentPlan.svg'
import UpgradeIcon from '@/assets/images/UpgradeIcon.svg'
import CancelImage from '@/assets/images/cancelIcon.svg'
type PlanType = "Electric Mining" | "Turbo Mining" | "Nuclear Mining";

interface Plan {
    name: PlanType;
    price: number;
    btcPerHour: number;
    hourlyEarnings: number;
    features: string[];
    artImage: any;
}

const plans: Plan[] = [
    {
        name: "Electric Mining",
        price: 100,
        btcPerHour: 4.5,
        hourlyEarnings: 0.45,
        features: [
            "1 BTCY ~ $0.10",
            "~4.5 BTCY/hour ~ $0.45",
            "Referral Bonuses",
            "Priority Mining Support",
        ],
        artImage: ElectricMiningArtImage1,
    },
    {
        name: "Turbo Mining",
        price: 300,
        btcPerHour: 9,
        hourlyEarnings: 0.9,
        features: [
            "1 BTCY ~ $0.10",
            "~9 BTCY/hour ~ $0.90",
            "Enhanced Referral Bonuses",
            "Priority Mining Support",
            "24/7 Premium Support",
        ],
        artImage: TurboMiningArtImage1,
    },
    {
        name: "Nuclear Mining",
        price: 600,
        btcPerHour: 13.5,
        hourlyEarnings: 1.35,
        features: [
            "1 BTCY ~ $0.10",
            "~13.5 BTCY/hour ~ $1.35",
            "Maximum Referral Bonuses",
            "VIP Mining Support",
            "24/7 Premium Support",
        ],
        artImage: NuclearMiningArtImage1,
    },
];

export default function SubscriptionPage() {
    const { user, isLoading } = useAuth();
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [currentPlan, setCurrentPlan] = useState<PlanType>("Electric Mining");
    const [paymentMethod, setPaymentMethod] = useState<"paypal" | "stripe">("paypal");
    const [memberSince, setMemberSince] = useState<string>("Nov 19, 2024");
    const [nextBillingDate, setNextBillingDate] = useState<string>("Dec 19, 2025");

    // Popup states
    const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [isFailedPopupOpen, setIsFailedPopupOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"paypal" | "stripe" | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

    useEffect(() => {
        if (!isLoading && !user) {
            setIsLoginPopupOpen(true);
        }
    }, [user, isLoading]);

    const handleLoginSuccess = () => {
        setIsLoginPopupOpen(false);
    };

    const handleCloseLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    const handleUpgrade = (planName: PlanType) => {
        if (planName === currentPlan) return;
        setSelectedPlan(planName);
        setIsPaymentPopupOpen(true);
    };

    const handlePaymentMethodSelect = (method: "paypal" | "stripe") => {
        setSelectedPaymentMethod(method);
        setIsPaymentPopupOpen(false);
        setIsConfirmPopupOpen(true);
    };

    const handleBackToPaymentMethod = () => {
        setIsConfirmPopupOpen(false);
        setIsPaymentPopupOpen(true);
    };

    const handleSubscribe = async () => {
        if (!selectedPlan) return;

        try {
            // TODO: Implement payment processing
            const paymentSuccess = true; // Replace with actual payment result

            setIsConfirmPopupOpen(false);

            if (paymentSuccess) {
                setCurrentPlan(selectedPlan);
                setIsSuccessPopupOpen(true);
            } else {
                setIsFailedPopupOpen(true);
            }
        } catch (error) {
            console.error("Payment error:", error);
            setIsConfirmPopupOpen(false);
            setIsFailedPopupOpen(true);
        }
    };

    const handleTryAgain = () => {
        setIsFailedPopupOpen(false);
        setIsPaymentPopupOpen(true);
    };

    const handleCancelSubscription = () => {
        // TODO: Implement cancel subscription logic
        console.log("Cancel subscription");
    };

    if (isLoading) {
        return <div className="mt-40 text-center text-3xl">Loading...</div>;
    }



    const currentPlanData = plans.find((p) => p.name === currentPlan) || plans[0];

    return (
        <div className="mx-auto mt-40 md:mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px] mb-40">
            {/* My Subscription Section */}
            <div className="mb-20">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-2">
                    My Subscription
                </h1>
                <p className="text-base md:text-lg text-gray-400 mb-8">
                    Manage your mining plan and subscription
                </p>

                <div className=" border border-bg2 rounded-xl p-6 md:p-8 relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                            <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                Current Plan
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                                {currentPlanData.name}
                            </h2>
                            <p className="text-lg md:text-xl text-white mb-6">
                                ${currentPlanData.price}/month • {currentPlanData.btcPerHour} BTCY/hour
                            </p>
                            <ul className="space-y-3">
                                {currentPlanData.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span className="text-white">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col items-center gap-4 justify-between h-full">
                            <div className="text-right">
                                <p className="text-sm text-gray-400 mb-1">Next billing date</p>
                                <p className="text-lg text-white font-medium">{nextBillingDate}</p>
                            </div>

                            <CustomButton2 text="Cancel Subscription" onClick={handleCancelSubscription} image={CancelImage} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Plans Section */}
            <div className="mb-20">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-8">
                    Available Plans
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => {
                        const isCurrentPlan = plan.name === currentPlan;
                        return (
                            <div
                                key={plan.name}
                                className=" border border-bg2 rounded-xl p-6 flex flex-col"
                            >
                                <div className="mb-4">
                                    <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                                        ${plan.price}/month
                                    </p>
                                    <p className="text-lg text-white">
                                        {plan.btcPerHour} BTCY/hour
                                    </p>
                                    <p className="text-lg text-primary">
                                        ~${plan.hourlyEarnings.toFixed(2)}/hour
                                    </p>
                                </div>
                                <div className="mb-6 flex justify-center">
                                    <Image
                                        src={plan.artImage}
                                        alt={plan.name}
                                        className="h-40 object-contain"
                                    />
                                </div>
                                <ul className="space-y-3 mb-6 flex-1">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                            <span className="text-white text-sm md:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col items-center gap-2 mt-auto">
                                    {isCurrentPlan ? (
                                        <>
                                            <CustomButton2 text="Current Plan" image={CheckIcon} onClick={() => { }} />
                                        </>
                                    ) : (
                                        <>

                                            <CustomButton2 text="Upgrade" image={UpgradeIcon} onClick={() => handleUpgrade(plan.name)} />

                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Subscription Information Section */}
            <div>
                <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
                    Subscription Information
                </h2>
                <div className=" border border-bg2 rounded-xl p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <p className="text-lg text-white font-medium">Active</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Payment Method</p>
                            <p className="text-lg text-white font-medium capitalize">{paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Member Since</p>
                            <p className="text-lg text-white font-medium">{memberSince}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popups */}
            {selectedPlan && (
                <>
                    <PaymentMethodPopup
                        isOpen={isPaymentPopupOpen}
                        onClose={() => setIsPaymentPopupOpen(false)}
                        onSelectPaymentMethod={handlePaymentMethodSelect}
                        planName={selectedPlan}
                        subscriptionAmount={plans.find((p) => p.name === selectedPlan)?.price || 0}
                    />

                    {selectedPaymentMethod && (
                        <SubscriptionConfirmPopup
                            isOpen={isConfirmPopupOpen}
                            onClose={() => setIsConfirmPopupOpen(false)}
                            onBack={handleBackToPaymentMethod}
                            onSubscribe={handleSubscribe}
                            paymentMethod={selectedPaymentMethod}
                            subscriptionAmount={plans.find((p) => p.name === selectedPlan)?.price || 0}
                            planName={selectedPlan}
                        />
                    )}

                    <PaymentSuccessPopup
                        isOpen={isSuccessPopupOpen}
                        onClose={() => setIsSuccessPopupOpen(false)}
                        planName={selectedPlan}
                    />

                    <PaymentFailedPopup
                        isOpen={isFailedPopupOpen}
                        onClose={() => setIsFailedPopupOpen(false)}
                        onTryAgain={handleTryAgain}
                        planName={selectedPlan}
                    />
                </>
            )}


        </div>
    );
}

