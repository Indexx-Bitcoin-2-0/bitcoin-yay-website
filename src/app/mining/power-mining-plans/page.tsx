"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import CustomButton2 from "@/components/CustomButton2";
import LoginPopup from "@/components/LoginPopup";
import PaymentMethodPopup, { PaymentMethod } from "@/components/PaymentMethodPopup";
import { useAuth } from "@/contexts/AuthContext";
import { PROVIDER_LABELS } from "@/constants/paymentProviders";
import {
  purchaseSubscription,
  validateCoupon,
  PaymentProvider,
  SubscriptionPurchasePayload,
} from "@/lib/subscriptions";

import BellButtonImage from "@/assets/images/buttons/bell-button.webp";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";

import CardImage1 from "@/assets/images/home/card-1.webp";
import CardImage2 from "@/assets/images/home/card-2.webp";
import CardImage3 from "@/assets/images/home/card-3.webp";

const formatUsd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const PLANS = [
  {
    id: "electric",
    name: "Electric Mining",
    rate: "4.5 BTCY/Hr",
    speed: "3x Speed",
    priceMonthly: 35,
    keyMonthly: "electric",
    priceWeekly: 10,
    keyWeekly: "weeklyElectric",
    originalPriceMonthly: 100,
  },
  {
    id: "turbo",
    name: "Turbo Mining",
    rate: "9 BTCY/Hr",
    speed: "6x Speed",
    priceMonthly: 75,
    keyMonthly: "turbo",
    priceWeekly: 20,
    keyWeekly: "weeklyTurbo",
    originalPriceMonthly: 300,
  },
  {
    id: "nuclear",
    name: "Nuclear Mining",
    rate: "13.5 BTCY/Hr",
    speed: "9x Speed",
    priceMonthly: 100,
    keyMonthly: "nuclear",
    priceWeekly: 30,
    keyWeekly: "weeklyNuclear",
    originalPriceMonthly: 600,
  },
];

const PowerMiningPlansPage = () => {
  const { user, isLoading } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState<"electric" | "turbo" | "nuclear">("electric");
  const [duration, setDuration] = useState<"weekly" | "monthly">("monthly");

  // Logic from Electric Mining
  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const durationDropdownRef = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState<{
    type: "info" | "error";
    message: string;
  } | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [couponValidationStatus, setCouponValidationStatus] =
    useState<"idle" | "valid" | "error">("idle");
  const [couponValidationMessage, setCouponValidationMessage] =
    useState<string | null>(null);
  const [couponValidationLoading, setCouponValidationLoading] =
    useState(false);

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[0];

  const getPlanKey = () =>
    duration === "weekly" ? selectedPlan.keyWeekly : selectedPlan.keyMonthly;

  const getDisplayPlanName = () =>
    duration === "weekly" ? `${selectedPlan.name} (Weekly)` : selectedPlan.name;

  const handleCouponInputChange = (value: string) => {
    setCouponCode(value);
    if (couponValidationStatus !== "idle") {
      setCouponValidationStatus("idle");
      setCouponValidationMessage(null);
    }
  };

  const validateCurrentCoupon = async (): Promise<boolean> => {
    const trimmedCoupon = couponCode.trim();
    if (!trimmedCoupon) {
      setCouponValidationStatus("idle");
      setCouponValidationMessage(null);
      return true;
    }

    setCouponValidationLoading(true);
    try {
      const validation = await validateCoupon(getPlanKey(), trimmedCoupon);
      setCouponValidationStatus("valid");
      setCouponValidationMessage(
        `Coupon applied (${validation.couponCode}): ${validation.couponDescription ??
        `${validation.discountPercent}% off`
        } (final ${formatUsd(validation.finalPrice)})`
      );
      return true;
    } catch (error) {
      setCouponValidationStatus("error");
      setCouponValidationMessage(
        error instanceof Error ? error.message : "Coupon validation failed."
      );
      return false;
    } finally {
      setCouponValidationLoading(false);
    }
  };

  const handleCouponBlur = () => {
    void validateCurrentCoupon();
  };

  const handleDurationChange = (value: "weekly" | "monthly") => {
    setDuration(value);
    setIsDurationDropdownOpen(false);
    // Reset coupon validation when duration changes
    if (couponValidationStatus !== "idle") {
      setCouponValidationStatus("idle");
      setCouponValidationMessage(null);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        durationDropdownRef.current &&
        !durationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDurationDropdownOpen(false);
      }
    };

    if (isDurationDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDurationDropdownOpen]);

  useEffect(() => {
    if (!isLoading && !user) {
      setIsLoginPopupOpen(true);
    }
  }, [isLoading, user]);

  // Calculate current price based on duration
  const currentPrice = duration === "weekly" ? selectedPlan.priceWeekly : selectedPlan.priceMonthly;
  const priceLabel = duration === "weekly" ? "week" : "m";

  const startSubscription = async (provider: PaymentProvider) => {
    if (isSubmitting) {
      return;
    }

    if (!user?.email) {
      setFeedback({
        type: "error",
        message: "Please log in to start a subscription.",
      });
      setIsLoginPopupOpen(true);
      return;
    }

    setIsPaymentPopupOpen(false);
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const payload: SubscriptionPurchasePayload = {
        email: user.email,
        provider,
        planKey: getPlanKey(),
        metadata: {
          planName: getDisplayPlanName(),
          speedBoost: selectedPlan.speed,
          page: "power-mining-plans",
          duration: duration,
        },
      };

      const trimmedCoupon = couponCode.trim();
      if (trimmedCoupon && couponValidationStatus !== "valid") {
        const couponValid = await validateCurrentCoupon();
        if (!couponValid) {
          return;
        }
      }

      if (trimmedCoupon) {
        payload.couponCode = trimmedCoupon;
      }

      const result = await purchaseSubscription(payload);

      const redirectUrl =
        (result.sessionUrl as string | undefined) ??
        (result.approvalUrl as string | undefined) ??
        (result.checkoutUrl as string | undefined) ??
        (result.redirectUrl as string | undefined);

      if (redirectUrl && typeof window !== "undefined") {
        window.location.href = redirectUrl;
        setFeedback({
          type: "info",
          message: `Redirecting to ${PROVIDER_LABELS[provider]} checkout.`,
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

  const handleSubscribeClick = () => {
    if (isSubmitting) {
      return;
    }

    if (!user?.email) {
      setFeedback({
        type: "error",
        message: "Please log in to start a subscription.",
      });
      setIsLoginPopupOpen(true);
      return;
    }

    setFeedback(null);
    setIsPaymentPopupOpen(true);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    const supportedProvider: PaymentProvider =
      method === "stripe" ? "stripe" : "paypal";
    void startSubscription(supportedProvider);
  };

  const handleLoginSuccess = () => setIsLoginPopupOpen(false);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
  const handleRegisterClick = () => setIsLoginPopupOpen(false);


  return (
    <div className="mx-auto mt-40 max-w-[1800px] px-4 md:px-10 xl:px-20">
      {/* Hero Section */}
      <div className="flex items-center justify-items-center gap-12">
        <div className="mt-10 md:mt-20 w-full flex flex-col justify-items-center items-center">
          <h1 className="text-[40px] md:text-7xl font-bold lg:leading-28">
            Power Mining
          </h1>
          <h2 className="text-[30px] md:text-4xl font-semibold ">
            Subscription Plan
          </h2>

          <h3 className="mt-14 text-2xl md:text-3xl font-semibold max-w-3xl">
            Boost BTCY — Mine Faster & Earn More
          </h3>

          <p className="mt-6 text-lg md:text-xl max-w-3xl text-center text-primary">
            Experience up to 9× faster BTCY mining —
            <br />
            many users already upgraded.
          </p>

          {/* Buy Now Button */}
          <div className="mt-10">
            <CustomButton2
              link="/mining/power-mining"
              image={BellButtonImage}
              text="Subscribe Now"
            />

          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex items-center justify-center my-40 md:my-60 max-w-7xl mx-auto aspect-video">
        <iframe
          src="https://www.youtube.com/embed/tuppsYWEDGI"
          title="Power Mining"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>


      {/* Quantum Mining Pro (2026 Edition) Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left: Product Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={ElectricMiningArtImage1}
              alt="Quantum Mining Pro"
              className="w-80 md:w-96 lg:w-120 xl:w-140"
            />
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2">
            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff8728"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="text-gray-400 text-lg ml-2">(1120+ Reviews)</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Power Mining Pro (2026 Edition)
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
              Keep going! Once you reach 10,000 BTCY, you'll unlock the Lotto feature. With your current plan, you already have access to the Shop and Indexx.ai - no upgrade needed! Want even more perks and faster mining? You can upgrade to a higher plan anytime. Boost your earnings by completing daily tasks, referring friends, and staying active!
              <br />
              <span className="text-primary">Have at least 5 Referrals</span>
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Need to implement same Image UI here with functionality */}
              <div className="flex flex-col gap-6">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id as "electric" | "turbo" | "nuclear")}
                    className={`
                      relative flex items-center justify-between p-6 rounded-xl border-1 cursor-pointer transition-all duration-300
                      ${selectedPlanId === plan.id
                        ? "border-primary"
                        : "border-gray-700 bg-transparent hover:border-gray-500"}
                    `}
                  >
                    <div className="flex items-center gap-6">
                      {/* Custom Radio Circle */}
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${selectedPlanId === plan.id ? "border-primary" : "border-gray-500"}
                      `}>
                        {selectedPlanId === plan.id && (
                          <div className="w-3 h-3 bg-primary rounded-full" />
                        )}
                      </div>

                      {/* Plan Info */}
                      <div className="text-left">
                        <h4 className="text-xl md:text-2xl font-bold text-white">{plan.name}</h4>
                        <div className="flex items-center gap-3 mt-1 text-gray-400">
                          <span className="line-through text-gray-500">${plan.originalPriceMonthly}</span>
                          <span className="text-white font-semibold">${plan.priceMonthly}/m</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Stats */}
                    <div className="text-right">
                      <p className="text-primary font-bold text-lg md:text-xl">{plan.rate}</p>
                      <p className="text-primary text-sm md:text-base">{plan.speed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Buy Now Button */}
            <div className="flex justify-center lg:justify-start">
              <CustomButton2
                image={BellButtonImage}
                text="Add To Cart"
                onClick={handleSubscribeClick} // Reuse logic for consistency
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Three Cards */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* No Mining Required */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage1}
              alt="No Mining Required"
              className="w-full max-w-xs h-auto object-contain mb-6"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              9× Faster Mining
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              Upgrade cycles increase hourly BTCY output.
            </p>
          </div>

          {/* Indexx.ai Asset Wallet */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage2}
              alt="Indexx.ai Asset Wallet"
              className="w-full max-w-xs h-auto object-contain mb-6"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              No heavy ads
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              Cleaner experience — focused mining sessions.
            </p>
          </div>

          {/* Buy at Low Price */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage3}
              alt="Buy at Low Price"
              className="w-full max-w-xs h-auto object-contain mb-6"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              Unlock 24Hr Mining
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              Enjoy extended mining time beyond the standard 6-hour limit.
            </p>
          </div>
        </div>
      </div>

      {/* Popups */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClick={handleRegisterClick}
      />
      <PaymentMethodPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        onSelectPaymentMethod={handlePaymentMethodSelect}
        planName={selectedPlan.name}
        subscriptionAmount={currentPrice}
      />
    </div>
  );
};

export default PowerMiningPlansPage;
