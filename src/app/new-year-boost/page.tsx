"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import PromotionalArt from "@/assets/images/btcy-airdrop/btcyairdroppopup.svg";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import SalesBackground from '@/assets/images/salesCoinBG.png';
import {
    purchaseSubscription,
    PaymentProvider,
} from "@/lib/subscriptions";
import { PROVIDER_LABELS } from "@/constants/paymentProviders";

interface BoostPlan {
    id: string;
    title: string;
    price: number;
    days: number;
    planKey: string;
}

const plans: BoostPlan[] = [
    { id: "1-day", title: "1 Day Plan", price: 5, days: 1, planKey: "event15x1day" },
    { id: "3-days", title: "3 Days Plan", price: 10, days: 3, planKey: "event15x3day" },
    { id: "7-days", title: "7 Days Plan", price: 20, days: 7, planKey: "event15x7day" },
];

const PROVIDER_OPTIONS: PaymentProvider[] = ["stripe", "paypal"];

const NewYearBoostPage = () => {
    const { user } = useAuth();
    const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>("stripe");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [feedback, setFeedback] = useState<{
        type: "info" | "error";
        message: string;
    } | null>(null);

    const handleBuySubscription = async (plan: BoostPlan) => {
        if (isSubmitting) {
            return;
        }

        if (!user?.email) {
            setFeedback({
                type: "error",
                message: "Please log in to purchase a boost.",
            });
            setIsLoginPopupOpen(true);
            return;
        }

        setFeedback(null);
        setIsSubmitting(true);

        try {
            const payload = {
                email: user.email,
                provider: selectedProvider,
                planKey: plan.planKey,
                metadata: {
                    planName: plan.title,
                    durationDays: plan.days,
                    speedMultiplier: "15x",
                    page: "new-year-boost",
                    price: plan.price,
                },
            };

            const result = await purchaseSubscription(payload);
            const redirectUrl =
                result.sessionUrl ??
                result.approvalUrl ??
                result.checkoutUrl ??
                result.redirectUrl;

            if (redirectUrl && typeof window !== "undefined") {
                window.location.href = redirectUrl;
                setFeedback({
                    type: "info",
                    message: `Redirecting to ${PROVIDER_LABELS[selectedProvider]} checkout...`,
                });
            } else {
                const fallbackMessageParts: string[] = [];
                if (result.sessionId) {
                    fallbackMessageParts.push(`Session ID: ${result.sessionId}.`);
                }
                fallbackMessageParts.push(
                    "Check your email or the provider dashboard for next steps."
                );
                setFeedback({
                    type: "info",
                    message: `Subscription request created. ${fallbackMessageParts.join(
                        " "
                    )}`,
                });
            }
        } catch (error) {
            setFeedback({
                type: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "Unable to start the subscription purchase.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
    const handleLoginSuccess = () => setIsLoginPopupOpen(false);
    const handleRegisterClick = () => setIsLoginPopupOpen(false);

    return (
        <div className="mt-40 relative overflow-hidden">
            {/* Promotional Banner Section */}
            <div className="w-full relative">
                <div className="mx-auto px-4 md:px-8 lg:px-20 xl:px-40 py-10 md:py-16 lg:py-20 max-w-[1400px]">
                    <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 lg:gap-16">
                        {/* Left Section - Content */}
                        <div className="flex-4 flex flex-col justify-center text-left">
                            {/* Main Headline */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl  text-white mb-2 md:mb-8 leading-tight font-semibold">
                                New Year&apos;s 2026 <br /> Promotional Package
                            </h1>


                            {/* Call to Action */}
                            <p className="text-2xl md:text-3xl lg:text-4xl text-primary mb-6 md:mb-8">
                                Mine 15x faster this New Year
                            </p>

                            {/* Descriptive Text */}
                            <p className="text-base md:text-lg lg:text-xl text-white mb-2 leading-relaxed">
                                Start the New Year strong with a 15× mining speed boost  accelerate your earnings instantly.
                            </p>

                        </div>

                        {/* Right Section - Illustration */}
                        <div className="flex-3 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
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
            </div>

            {/* Background Bitcoin Coins Illustration */}
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
                <div className="absolute top-10 right-10 md:top-20 md:right-20 lg:top-32 lg:right-32">
                    <div className="flex flex-col gap-3 md:gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-3 md:gap-4">
                                {[...Array(4)].map((_, j) => (
                                    <div
                                        key={j}
                                        className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border border-white/30 flex items-center justify-center"
                                    >
                                        <span className="text-white/30 text-xs md:text-sm lg:text-base font-bold">₿</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto px-4 md:px-8 lg:px-20 xl:px-40 py-10 md:py-20 max-w-[1200px] bg-bg2 ">

                {/* Add background on the top right corner */}
                {/* Background Coins Illustration - Placeholder */}
                <div className="absolute right-0 top-0 w-40 md:w-60 lg:w-80 xl:w-100 opacity-20 pointer-events-none">
                    <Image
                        src={SalesBackground}
                        alt="Bitcoin Coins"
                        className="w-full h-auto object-contain"
                    />

                </div>

                {/* Header */}
                <div className="text-center mb-10 md:mb-12 lg:mb-16 relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary mb-3 md:mb-4 lg:mb-6">
                        Choose Your Boost Duration
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white max-w-3xl mx-auto px-4">
                        New Year special — activate 15x speed for your chosen duration
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 mb-6">
                    {PROVIDER_OPTIONS.map((provider) => (
                        <button
                            key={provider}
                            type="button"
                            onClick={() => setSelectedProvider(provider)}
                            className={`px-4 py-2 rounded-full text-sm md:text-base border transition ${selectedProvider === provider
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-white/30 text-white/60"
                                }`}
                        >
                            {PROVIDER_LABELS[provider]}
                        </button>
                    ))}
                </div>

                {feedback && (
                    <div className="mb-6">
                        <p
                            className={`text-center text-sm md:text-base font-medium ${feedback.type === "error"
                                ? "text-red-500"
                                : "text-green-400"
                                }`}
                        >
                            {feedback.message}
                        </p>
                    </div>
                )}

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto relative z-10">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-[#1a1a1a] rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center text-center min-h-[320px] md:min-h-[380px] lg:min-h-[420px]"
                        >
                            {/* Plan Title */}
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
                                {plan.title}
                            </h3>

                            {/* Mining Speed */}
                            <p className="text-sm md:text-base lg:text-lg text-white mb-4 md:mb-6 lg:mb-8">
                                15x Mining Speed
                            </p>

                            {/* Price */}
                            <div className="mb-6 md:mb-8 lg:mb-10 flex-1 flex items-center justify-center">
                                <span className="text-3xl md:text-4xl font-bold text-primary">
                                    ${plan.price}
                                </span>
                            </div>

                            {/* Buy Button */}
                            <div className="mt-auto w-full flex flex-col items-center">
                                <CustomButton2
                                    image={CartButtonImage}
                                    text="Buy Subscription"
                                    onClick={() => handleBuySubscription(plan)}
                                    imageStyling="w-14 md:w-18 lg:w-20"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <LoginPopup
                isOpen={isLoginPopupOpen}
                onClose={handleCloseLoginPopup}
                onLoginSuccess={handleLoginSuccess}
                onRegisterClick={handleRegisterClick}
            />
        </div>
    );
};

export default NewYearBoostPage;
