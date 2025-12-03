"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CustomButton2 from "@/components/CustomButton2";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";
import { PAYMENT_PROVIDERS, PROVIDER_LABELS } from "@/constants/paymentProviders";
import {
  purchaseSubscription,
  PaymentProvider,
  SubscriptionPurchasePayload,
} from "@/lib/subscriptions";

import TurboMiningButtonImage from "@/assets/images/mining/turbo-icon.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";

const TurboMiningPage = () => {
  const { user, isLoading } = useAuth();
  const [selectedProvider, setSelectedProvider] =
    useState<PaymentProvider>("stripe");
  const [couponCode, setCouponCode] = useState("BTCY10");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "info" | "error";
    message: string;
  } | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      setIsLoginPopupOpen(true);
    }
  }, [isLoading, user]);

  const handleSubscribe = async () => {
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
    setIsSubmitting(true);

    try {
      const payload: SubscriptionPurchasePayload = {
        email: user.email,
        provider: selectedProvider,
        planKey: "turbo",
        metadata: {
          planName: "Turbo Power Mining",
          speedBoost: "18 BTCY/h",
          page: "turbo-mining",
        },
      };

      if (couponCode.trim()) {
        payload.couponCode = couponCode.trim();
      }

      const result = await purchaseSubscription(payload);

      const redirectUrl =
        (result.sessionUrl as string | undefined) ??
        (result.approvalUrl as string | undefined) ??
        (result.checkoutUrl as string | undefined) ??
        (result.redirectUrl as string | undefined);

      if (redirectUrl && typeof window !== "undefined") {
        window.open(redirectUrl, "_blank");
        setFeedback({
          type: "info",
          message: `Checkout opened for ${selectedProvider}.`,
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

  const handleLoginSuccess = () => setIsLoginPopupOpen(false);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
  const handleRegisterClick = () => setIsLoginPopupOpen(false);

  return (
    <div className="mx-auto mt-40 md:mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="flex items-center gap-10">
          <Image
            src={TurboMiningButtonImage}
            alt="Turbo Mining"
            className="w-20 md:w-40"
          />
          <h1 className="text-4xl md:text-5xl xl:text-8xl font-bold">
            Turbo Mining Plan
          </h1>
        </div>
        <Image
          src={TurboMiningArtImage1}
          alt="Turbo Mining"
          className="w-90 md:w-120 lg:w-180"
        />
        <div className="mt-20 flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-bold text-center">Generate</p>
          <p className="text-6xl md:text-9xl font-bold text-center">

            9 BTCY/<span className="text-3xl md:text-6xl font-bold">Hr</span>
          </p>
          <ul className="mt-20 list-disc list-inside text-xl flex flex-col gap-6">
            <li>
              <span className="font-bold line-through">$300</span> $ 90/m subscription fee
            </li>
            <li>1 BTCY ~ $ 0.10</li>
            <li>~9 BTCY/hour ~ $ 0.90</li>
            <li className="text-primary">Referral Bonuses</li>
            <li>Priority Mining Support</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-wrap justify-center gap-3">
            {PAYMENT_PROVIDERS.map((provider) => (
              <button
                type="button"
                key={provider.key}
                onClick={() => setSelectedProvider(provider.key)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${selectedProvider === provider.key
                    ? "border-primary bg-primary text-black"
                    : "border-white/50 text-white hover:border-white"
                  }`}
              >
                <span className="block">{provider.label}</span>
                <span className="text-xs text-tertiary">{provider.description}</span>
              </button>
            ))}
          </div>
          <div className="w-full max-w-md text-left">
            <label className="text-sm text-tertiary" htmlFor="turbo-coupon">
              Coupon code (optional)
            </label>
            <input
              id="turbo-coupon"
              placeholder="e.g., BTCY10"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/20 bg-transparent px-4 py-2 text-white placeholder:text-tertiary focus:border-primary focus:outline-none"
            />
          </div>
          <CustomButton2
            text={
              isSubmitting
                ? `Starting ${PROVIDER_LABELS[selectedProvider]} checkout...`
                : `Pay with ${PROVIDER_LABELS[selectedProvider]}`
            }
            image={BellButtonImage}
            onClick={handleSubscribe}
            imageStyling="w-34"
            ariaLabel="Start Turbo Mining subscription checkout"
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

export default TurboMiningPage;
