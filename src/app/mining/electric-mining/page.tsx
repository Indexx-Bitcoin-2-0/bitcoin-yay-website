"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";

import CustomButton2 from "@/components/CustomButton2";
import LoginPopup from "@/components/LoginPopup";
import PaymentMethodPopup, { PaymentMethod } from "@/components/PaymentMethodPopup";
import NewYearPromotionalBanner from "@/components/NewYearPromotionalBanner";
import { useAuth } from "@/contexts/AuthContext";
import { PROVIDER_LABELS } from "@/constants/paymentProviders";
import {
  purchaseSubscription,
  validateCoupon,
  PaymentProvider,
  SubscriptionPurchasePayload,
} from "@/lib/subscriptions";

import ElectricMiningButtonImage from "@/assets/images/mining/electric-icon.webp";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";

const formatUsd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

const MONTHLY_PLAN_KEY = "electric";
const WEEKLY_PLAN_KEY = "weeklyElectric";
const PLAN_NAME = "Electric Power Mining";
const PLAN_PRICE_MONTHLY = 30;
const PLAN_PRICE_WEEKLY = 7.5; // Monthly price / 4

const ElectricMiningPage = () => {
  const { user, isLoading } = useAuth();
  const [duration, setDuration] = useState<"weekly" | "monthly">("monthly");
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
  const getPlanKey = () =>
    duration === "weekly" ? WEEKLY_PLAN_KEY : MONTHLY_PLAN_KEY;

  const getDisplayPlanName = () =>
    duration === "weekly" ? `${PLAN_NAME} (Weekly)` : PLAN_NAME;

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
  const currentPrice = duration === "weekly" ? PLAN_PRICE_WEEKLY : PLAN_PRICE_MONTHLY;
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
          speedBoost: "9 BTCY/h",
          page: "electric-mining",
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
    <div className="mx-auto mt-40 md:mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      {/* New Year Promotional Banner */}
      <div className="mb-20">
        <NewYearPromotionalBanner />
      </div>

      <div className="flex flex-col items-center justify-center gap-20">
        <div className="flex items-center gap-10">
          <Image
            src={ElectricMiningButtonImage}
            alt="Electric Mining"
            className="w-20 md:w-40"
          />
          <h1 className="text-4xl md:text-5xl xl:text-8xl font-bold">
            Electric Mining Plan
          </h1>
        </div>
        <Image
          src={ElectricMiningArtImage1}
          alt="Electric Mining"
          className="w-90 md:w-120 lg:w-200"
        />
        <div className="mt-20 flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-bold text-center">Generate</p>
          <p className="text-6xl md:text-9xl font-bold text-center">
            4.5 BTCY/<span className="text-3xl md:text-6xl font-bold">Hr</span>
          </p>
          <ul className="mt-20 list-disc list-inside text-xl flex flex-col gap-6">
            <li><span className="font-bold line-through">
              {duration === "weekly" ? "$25" : "$100"}
            </span> $ {currentPrice.toFixed(duration === "weekly" ? 2 : 0)}/{priceLabel} subscription fee</li>
            <li>1 BTCY ~ $ 0.10</li>
            <li>~4.5 BTCY/hour ~ $ 0.45</li>
            <li className="text-primary">Referral Bonuses</li>
            <li>Priority Mining Support</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full max-w-md text-left" ref={durationDropdownRef}>
            <label className="block text-sm text-tertiary mb-2" htmlFor="electric-duration">
              Duration
            </label>
            <div className="relative">
              <button
                type="button"
                id="electric-duration"
                onClick={() => setIsDurationDropdownOpen(!isDurationDropdownOpen)}
                className="flex items-center gap-3 p-3  rounded-lg cursor-pointer text-tertiary border border-white/20 w-full text-lg focus:border-primary hover:border-primary mt-2"
              >
                <span className="flex-1 text-left capitalize">{duration}</span>
                <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
              </button>

              {isDurationDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-bg2 rounded-md shadow-lg z-10 border border-bg">
                  <div className="py-1">
                    {(["weekly", "monthly"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleDurationChange(option)}
                        className="w-full px-4 py-3 text-left text-tertiary hover:bg-primary hover:text-bg transition-colors text-lg cursor-pointer flex items-center gap-3"
                      >
                        <span className="flex-1 capitalize">{option}</span>
                        {duration === option && (
                          <Check
                            className="w-5 h-5 ml-auto"
                            strokeWidth={2.5}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-w-md text-left">
            <label className="text-sm text-tertiary" htmlFor="electric-coupon">
              Coupon code (optional)
            </label>
            <input
              id="electric-coupon"
              placeholder="e.g., BTCYNEWYEAR"
              value={couponCode}
              onChange={(event) => handleCouponInputChange(event.target.value)}
              onBlur={handleCouponBlur}
              className="mt-2 w-full rounded-lg border border-white/20 bg-transparent px-4 py-4 text-white placeholder:text-tertiary focus:border-primary focus:outline-none"
            />
          </div>
          {couponValidationLoading ? (
            <p className="text-sm text-primary text-center mt-2">
              Validating coupon…
            </p>
          ) : couponValidationMessage ? (
            <p
              className={`text-sm text-center mt-2 ${couponValidationStatus === "error"
                ? "text-red-500"
                : "text-green-400"
                }`}
            >
              {couponValidationMessage}
            </p>
          ) : null}
          <CustomButton2
            text={isSubmitting ? "Processing subscription..." : "Subscribe"}
            image={BellButtonImage}
            onClick={handleSubscribeClick}
            disabled={
              isSubmitting ||
              couponValidationStatus === "error" ||
              couponValidationLoading
            }
            imageStyling="w-34"
            ariaLabel="Open Electric Mining payment options"
          />
          {feedback && (
            <p
              className={`text-center text-sm ${feedback.type === "error" ? "text-red-500" : "text-green-400"
                }`}
            >
              {feedback.message}
            </p>
          )}
          {!user && !isLoading && (
            <p className="text-sm text-tertiary">
              You will need to log in or register before purchasing a subscription.
            </p>
          )}
        </div>
      </div>

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
        planName={PLAN_NAME}
        subscriptionAmount={currentPrice}
      />

      <div className="text-base mt-40 flex flex-col gap-20 max-w-5xl leading-8 mb-40">
        <div>
          <p className="text-3xl font-bold mb-4">
            bitcoin-yay Subscription Disclaimer
          </p>
          <p className="font-bold">
            Please Read Carefully Before Purchasing Any Subscription Plan
          </p>
          <p>
            By purchasing or activating any subscription plan on the bitcoin-yay
            platform, you acknowledge and agree to the following:
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            1. Utility-Only, Not Financial Investment
          </p>
          <p>
            bitcoin-yay (BTCY) and all associated subscription plans—including
            Snatch Gopher, Electric Gopher, Turbo Gopher, and Nuclear Gopher—are
            designed solely to enhance your participation in the BTCY ecosystem.
            These plans grant access to increased virtual mining speed and other
            in-app utilities. They are not investment contracts, securities, or
            profit-generating instruments.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">2. No Guarantee of Value</p>
          <p>
            BTCY is a utility token earned through daily app interaction (mobile
            mining). The token’s market price may fluctuate and is not
            guaranteed. Subscription plans do not promise any fixed return,
            profit, or appreciation of BTCY.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            3. Access to Virtual Mining Only
          </p>
          <p>
            Each subscription level provides users with enhanced mining power
            within the app’s virtual AI-based tap-to-mine system. These tiers
            (e.g., Turbo Gopher, Nuclear Gopher) do not mine real Bitcoin (BTC)
            and instead increase the user’s in-app BTCY generation capacity.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            4. Limited-Time Bonuses and Referral Mechanics
          </p>
          <p>
            Some plans or features may include free access tiers or reward
            multipliers through referrals (e.g., earning special mining power
            when referring 10+ users). These features are promotional and
            subject to change. Access to higher-tier mining power is based on
            reaching specific referral milestones and does not imply ownership
            rights or investment privileges.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            5. Non-Refundable, App-Based Subscription
          </p>
          <p>
            All purchases of subscription plans are final and non-refundable.
            Subscription features are app-based and may only be accessed within
            the official bitcoin-yay app (TestFlight or live release, depending
            on platform availability).
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">6. Ecosystem Integration</p>
          <p>
            BTCY earned via subscriptions can be used in the broader Indexx
            ecosystem (e.g., Indexx Lotto, Indexx Shop), where tokens may be
            burned or redeemed for products, upgrades, or bonus entries. These
            features are utility-based and subject to ecosystem availability and
            terms.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">7. Eligibility & Access</p>
          <p>
            Subscriptions are available to users aged 18+ and residing in
            jurisdictions where virtual crypto mining applications are legally
            permitted. bitcoin-yay reserves the right to suspend accounts or
            restrict access where illegal, fraudulent, or abusive activity is
            detected.
          </p>
          <p className="font-bold">
            If you do not agree to these terms, do not proceed with any
            subscription purchase.
          </p>
          <div>
            For support or questions, please contact{" "}
            <Link
              href="mailto:support@bitcoinyay.com"
              className="text-primary hover:text-primary/80"
            >
              support@bitcoinyay.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricMiningPage;
