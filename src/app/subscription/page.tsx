"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Check } from "lucide-react";
import LoginPopup from "@/components/LoginPopup";
import PaymentMethodPopup, { PaymentMethod } from "@/components/PaymentMethodPopup";
import SubscriptionConfirmPopup from "@/components/SubscriptionConfirmPopup";
import PaymentSuccessPopup from "@/components/PaymentSuccessPopup";
import PaymentFailedPopup from "@/components/PaymentFailedPopup";
import ElectricMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";
import TurboMiningArtImage1 from "@/assets/images/mining/turbo-mining-art-1.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import CustomButton2 from "@/components/CustomButton2";
import CheckIcon from '@/assets/images/currentPlan.svg';
import UpgradeIcon from '@/assets/images/UpgradeIcon.svg';
import CancelImage from '@/assets/images/cancelIcon.svg';

import {
    changeSubscriptionPlan,
    fetchSubscriptionHistory,
    fetchUserSubscriptionPlan,
    MiningSubscriptionPlan,
    PaymentProvider,
    SubscriptionHistoryEntry,
    purchaseSubscription,
} from "@/lib/subscriptions";
type PlanType = "Free" | "Electric Mining" | "Turbo Mining" | "Nuclear Mining";
type AvailablePlanKey = "electric" | "turbo" | "nuclear";

interface Plan {
    key?: AvailablePlanKey;
    name: PlanType;
    price: number;
    btcPerHour: number;
    hourlyEarnings: number;
    features: string[];
    artImage: any;
}

const plans: Plan[] = [
    {
        key: "electric",
        name: "Electric Mining",
        price: 30,
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
        key: "turbo",
        name: "Turbo Mining",
        price: 90,
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
        key: "nuclear",
        name: "Nuclear Mining",
        price: 180,
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

const FREE_PLAN_DATA: Plan = {
    name: "Free",
    price: 0,
    btcPerHour: 1.5,
    hourlyEarnings: 0,
    features: [
        "Speed Boost x1",
        "1.5 BTCY/hour ~ $0.15",
        "No subscription fee",
        "Keep earning while you decide",
    ],
    artImage: ElectricMiningArtImage1,
};

const ACTIVE_STATUS_KEYWORDS = ["active", "success", "paid", "completed"];
const isActiveStatus = (status?: string) => {
    if (!status) return false;
    return ACTIVE_STATUS_KEYWORDS.some((keyword) =>
        status.toLowerCase().includes(keyword)
    );
};

const normalizePlanKey = (value?: string): AvailablePlanKey | undefined => {
    const normalized = value?.toLowerCase();
    if (!normalized) return undefined;
    if (normalized.includes("electric")) return "electric";
    if (normalized.includes("turbo")) return "turbo";
    if (normalized.includes("nuclear")) return "nuclear";
    return undefined;
};

const DEFAULT_SPEED_BOOSTS: Record<AvailablePlanKey, number> = {
    electric: 3,
    turbo: 6,
    nuclear: 9,
};

const getDefaultSpeedBoost = (value?: AvailablePlanKey) =>
    value ? DEFAULT_SPEED_BOOSTS[value] ?? 1 : 1;

const HISTORY_PAGE_SIZE = 5;
const HISTORY_PROVIDER_OPTIONS: PaymentProvider[] = ["stripe", "paypal"];

const formatCurrency = (value: number, currency = "USD") =>
    value.toLocaleString("en-US", {
        style: "currency",
        currency,
    });

const formatMetric = (value: number) =>
    value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
    });

const getSupportedPaymentProvider = (method: PaymentMethod): PaymentProvider =>
    method === "paypal" || method === "stripe" ? method : "stripe";

const SUBSCRIPTION_PAUSED_MESSAGE =
    "Subscriptions via PayPal and Stripe are temporarily disabled. We will update this page once payments resume.";
const formatDateTime = (value?: string) => {
    if (!value) return "—";
    const date = new Date(value);
    return date.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const getStatusBadgeClasses = (status: string) => {
    const normalized = status?.toLowerCase() ?? "";
    if (normalized.includes("active")) {
        return "border-primary text-primary";
    }
    if (normalized === "success") {
        return "border-green-500 text-green-400";
    }
    if (normalized === "pending") {
        return "border-white/30 text-white";
    }
    if (
        normalized === "failed" ||
        normalized === "cancelled" ||
        normalized === "canceled"
    ) {
        return "border-red-500 text-red-400";
    }
    return "border-white/30 text-white/70";
};

type RefreshPlanOptions = {
    signal?: { cancelled: boolean };
    withLoading?: boolean;
};

export default function SubscriptionPage() {
    const { user, isLoading } = useAuth();
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentProvider>("stripe");
    const [historyEntries, setHistoryEntries] = useState<SubscriptionHistoryEntry[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [historyError, setHistoryError] = useState<string | null>(null);
    const [historyTotal, setHistoryTotal] = useState(0);
    const [feedback, setFeedback] = useState<{
        type: "info" | "error";
        message: string;
    } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [miningPlan, setMiningPlan] = useState<MiningSubscriptionPlan | null>(null);
    const [planLoading, setPlanLoading] = useState(false);
    const [planError, setPlanError] = useState<string | null>(null);
    const [planChangeLoading, setPlanChangeLoading] = useState(false);
    const [planChangeTarget, setPlanChangeTarget] = useState<AvailablePlanKey | null>(null);
    const [planChangeFeedback, setPlanChangeFeedback] = useState<{
        type: "info" | "error";
        message: string;
    } | null>(null);

    // Popup states
    const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [isFailedPopupOpen, setIsFailedPopupOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

    const refreshMiningPlan = useCallback(
        async (options: RefreshPlanOptions = {}) => {
            if (!user?.email) return;
            const showLoading = options.withLoading ?? true;
            if (showLoading) {
                setPlanLoading(true);
                setPlanError(null);
            }

            try {
                const plan = await fetchUserSubscriptionPlan("BTCY", user.email);
                if (options.signal?.cancelled) return;
                setMiningPlan(plan);
            } catch (error) {
                if (options.signal?.cancelled) return;
                setMiningPlan(null);
                setPlanError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load your mining subscription."
                );
            } finally {
                if (options.signal?.cancelled) return;
                if (showLoading) {
                    setPlanLoading(false);
                }
            }
        },
        [user?.email]
    );

    useEffect(() => {
        if (!isLoading && !user) {
            setIsLoginPopupOpen(true);
        }
    }, [user, isLoading]);

    useEffect(() => {
        if (!user?.email) {
            setHistoryEntries([]);
            setHistoryTotal(0);
            setHistoryError(null);
            setHistoryLoading(false);
            return;
        }

        let isCancelled = false;

        const loadHistory = async () => {
            setHistoryLoading(true);
            setHistoryError(null);
            try {
                const response = await fetchSubscriptionHistory({
                    email: user.email,
                    provider: paymentMethod,
                    page: 1,
                    limit: HISTORY_PAGE_SIZE,
                });

                if (isCancelled) {
                    return;
                }

                setHistoryEntries(response.data ?? []);
                setHistoryTotal(response.total ?? response.data?.length ?? 0);
            } catch (error) {
                if (isCancelled) {
                    return;
                }
                setHistoryError(
                    error instanceof Error
                        ? error.message
                        : "Unable to load subscription history."
                );
            } finally {
                if (!isCancelled) {
                    setHistoryLoading(false);
                }
            }
        };

        void loadHistory();

        return () => {
            isCancelled = true;
        };
    }, [user?.email, paymentMethod]);

    useEffect(() => {
        if (!user?.email) {
            setMiningPlan(null);
            setPlanError(null);
            setPlanLoading(false);
            return;
        }

        const signal = { cancelled: false };
        void refreshMiningPlan({ signal });

        return () => {
            signal.cancelled = true;
        };
    }, [user?.email, refreshMiningPlan]);

    const activeEntry = historyEntries.find((entry) =>
        isActiveStatus(entry.status)
    );
    const planKeyFromHistory = normalizePlanKey(
        activeEntry?.planKey ?? activeEntry?.planName
    );
    const planKeyFromApi = normalizePlanKey(miningPlan?.plan);
    const activePlanKey = planKeyFromApi ?? planKeyFromHistory;
    const activePlanDefinition = activePlanKey
        ? plans.find((plan) => plan.key === activePlanKey)
        : undefined;
    const currentPlanData = activePlanDefinition ?? FREE_PLAN_DATA;
    const currentPlanDisplayName = miningPlan?.plan ?? currentPlanData.name;
    const planCostValue =
        typeof miningPlan?.cost === "number"
            ? miningPlan.cost
            : currentPlanData.price;
    const planMiningRate =
        typeof miningPlan?.miningRate === "number"
            ? miningPlan.miningRate
            : currentPlanData.btcPerHour;
    const planSpeedBoost =
        typeof miningPlan?.speedBoost === "number"
            ? miningPlan.speedBoost
            : getDefaultSpeedBoost(activePlanKey);
    const planStatus = miningPlan?.status ?? activeEntry?.status ?? "Active";
    const planPaymentMethod = miningPlan?.paymentMethod ?? paymentMethod;
    const planStartLabel = miningPlan?.startDate
        ? formatDateTime(miningPlan.startDate)
        : null;
    const planEndLabel = miningPlan?.endDate
        ? formatDateTime(miningPlan.endDate)
        : null;
    const planWindowParts: string[] = [];
    if (planStartLabel) planWindowParts.push(planStartLabel);
    if (planEndLabel) planWindowParts.push(planEndLabel);
    const planWindowRange = planWindowParts.length
        ? planWindowParts.join(" – ")
        : "—";
    const displayMemberSince = planStartLabel ?? "—";
    const displayNextBillingDate = planEndLabel ?? "—";
    const formattedPlanMiningRate = formatMetric(planMiningRate);
    const formattedPlanSpeedBoost = formatMetric(planSpeedBoost);
    const planStatusPillClass = isActiveStatus(planStatus)
        ? "bg-green-500"
        : "bg-white/30";
    const isPaidPlan = !!activePlanDefinition;

    const handleLoginSuccess = () => {
        setIsLoginPopupOpen(false);
    };

    const handleCloseLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };

    const schedulePlanChange = useCallback(
        async (planKey: AvailablePlanKey) => {
            if (planKey === activePlanKey) return;
            if (!miningPlan?._id) {
                setPlanChangeFeedback({
                    type: "error",
                    message: "Unable to locate your active subscription.",
                });
                return;
            }

            setPlanChangeLoading(true);
            setPlanChangeTarget(planKey);
            setPlanChangeFeedback(null);

            try {
                const result = await changeSubscriptionPlan({
                    subscriptionId: miningPlan._id,
                    newPlanKey: planKey,
                });
                setPlanChangeFeedback({
                    type: "info",
                    message:
                        result.message ??
                        `Plan change to ${result.data?.name ?? planKey} scheduled.`,
                });
                await refreshMiningPlan();
            } catch (error) {
                setPlanChangeFeedback({
                    type: "error",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Unable to schedule the plan change.",
                });
            } finally {
                setPlanChangeLoading(false);
                setPlanChangeTarget(null);
            }
        },
        [activePlanKey, miningPlan?._id, refreshMiningPlan]
    );

    const handleUpgrade = (planName: PlanType, planKey?: AvailablePlanKey) => {
        const isCurrentPlan =
            (planKey && planKey === activePlanKey) ||
            (!planKey && planName === currentPlanDisplayName);
        if (isCurrentPlan || !planKey) return;
        void schedulePlanChange(planKey);
    };

    const handlePaymentMethodSelect = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
        setIsPaymentPopupOpen(false);
        setIsConfirmPopupOpen(true);
    };

    const handleBackToPaymentMethod = () => {
        setIsConfirmPopupOpen(false);
        setIsPaymentPopupOpen(true);
    };

    const handleSubscribe = async () => {
        if (!selectedPlan || !selectedPaymentMethod) return;
        if (!user?.email) {
            setIsLoginPopupOpen(true);
            return;
        }

        const planDefinition = plans.find((plan) => plan.name === selectedPlan);
        const planKey = planDefinition?.key ?? selectedPlan.toLowerCase();

        setIsConfirmPopupOpen(false);
        setIsSubmitting(true);
        setFeedback(null);

        try {
            // Map to supported providers (backend may only support paypal/stripe)
            const supportedProvider = getSupportedPaymentProvider(selectedPaymentMethod);

            const payload = {
                email: user.email,
                provider: supportedProvider,
                planKey,
                metadata: {
                    planName: selectedPlan,
                    page: "subscription-page",
                    originalPaymentMethod: selectedPaymentMethod, // Store original for reference
                },
            };

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
                    message: `Redirecting to ${selectedPaymentMethod} checkout...`,
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
                    message: `Subscription request created. ${fallbackMessageParts.join(" ")}`,
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
            setIsFailedPopupOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedPaymentProvider = selectedPaymentMethod
        ? getSupportedPaymentProvider(selectedPaymentMethod)
        : null;

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
                <p className="text-sm text-amber-300 mb-6">
                    {SUBSCRIPTION_PAUSED_MESSAGE}
                </p>
                {feedback && (
                    <p
                        className={`text-sm mb-6 ${feedback.type === "error" ? "text-red-500" : "text-green-400"
                            }`}
                    >
                        {feedback.message}
                    </p>
                )}
                {planLoading && (
                    <p className="text-sm text-white/70 mb-6">
                        Refreshing your mining subscription details…
                    </p>
                )}
                {planError && (
                    <p className="text-sm text-red-500 mb-6">{planError}</p>
                )}
                {planChangeLoading && (
                    <p className="text-sm text-white/70 mb-6">
                        Scheduling your plan change…
                    </p>
                )}
                {planChangeFeedback && (
                    <p
                        className={`text-sm mb-6 ${planChangeFeedback.type === "error"
                            ? "text-red-500"
                            : "text-green-400"
                            }`}
                    >
                        {planChangeFeedback.message}
                    </p>
                )}

                <div className=" border border-bg2 rounded-xl p-6 md:p-8 relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                            <div className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                Current Plan
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                                {currentPlanDisplayName}
                            </h2>
                            <p className="text-lg md:text-xl text-white mb-6">
                                {formatCurrency(planCostValue)} • {formattedPlanMiningRate} BTCY/hour
                            </p>
                            <ul className="space-y-3">
                                {currentPlanData.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span className="text-white">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white/80">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Speed Boost</p>
                                    <p className="text-lg text-white font-semibold">
                                        {formattedPlanSpeedBoost}×
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Mining Window</p>
                                    <p className="text-lg text-white font-semibold">{planWindowRange}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Status</p>
                                    <p className="text-lg text-white font-semibold">{planStatus}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Payment Method</p>
                                    <p className="text-lg text-white font-semibold">{planPaymentMethod}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 justify-between h-full">
                            {isPaidPlan && (
                                <div className="text-right">
                                    <p className="text-sm text-gray-400 mb-1">Next billing date</p>
                                    <p className="text-lg text-white font-medium">{displayNextBillingDate}</p>
                                </div>
                            )}

                            {isPaidPlan && (
                                <CustomButton2
                                    text="Cancel Subscription"
                                    onClick={handleCancelSubscription}
                                    image={CancelImage}
                                />
                            )}
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
                        const isCurrentPlan = plan.key ? plan.key === activePlanKey : false;
                        const isSchedulingThisPlan =
                            planChangeLoading && plan.key === planChangeTarget;
                        const upgradeButtonText = isSchedulingThisPlan
                            ? "Scheduling..."
                            : `Upgrade`;
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
                                        <CustomButton2 text="Current Plan" image={CheckIcon} onClick={() => { }} />
                                    ) : (
                                        <CustomButton2
                                            text={upgradeButtonText}
                                            image={UpgradeIcon}
                                            onClick={() => handleUpgrade(plan.name, plan.key)}
                                            disabled={planChangeLoading}
                                        />
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
                                <div className={`w-3 h-3 rounded-full ${planStatusPillClass}`}></div>
                                <p className="text-lg text-white font-medium">{planStatus}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Payment Method</p>
                            <p className="text-lg text-white font-medium capitalize">{planPaymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-2">Member Since</p>
                            <p className="text-lg text-white font-medium">{displayMemberSince}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription History Section */}
            <div className="mt-20 border border-bg2 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h2 className="text-2xl md:text-4xl font-semibold text-white">
                        Subscription History
                    </h2>
                    {(historyEntries.length > 0 || historyTotal > 0) && (
                        <p className="text-sm text-tertiary">
                            Showing {historyEntries.length} of {historyTotal || historyEntries.length} attempts
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {HISTORY_PROVIDER_OPTIONS.map((providerOption) => (
                        <button
                            key={providerOption}
                            type="button"
                            onClick={() => setPaymentMethod(providerOption)}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${paymentMethod === providerOption
                                    ? "border-primary bg-primary/20 text-white"
                                    : "border-white/20 text-tertiary hover:border-white/70"
                                }`}
                        >
                            {providerOption.toUpperCase()}
                        </button>
                    ))}
                </div>

                {historyLoading ? (
                    <p className="text-sm text-white/70">Loading history…</p>
                ) : historyError ? (
                    <p className="text-sm text-red-500">{historyError}</p>
                ) : !historyEntries.length ? (
                    <p className="text-sm text-tertiary">
                        {user?.email
                            ? "No subscription history found for this payment provider."
                            : "Log in to view your subscription history."}
                    </p>
                ) : (
                    <div className="mt-6 flex flex-col gap-4">
                        {historyEntries.map((entry) => (
                            <div
                                key={entry._id}
                                className="rounded-xl border border-white/10 bg-white/5 p-4"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-lg font-semibold text-white">
                                        {entry.planName ?? entry.planKey}
                                    </p>
                                    <span
                                        className={`text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 border ${getStatusBadgeClasses(
                                            entry.status
                                        )}`}
                                    >
                                        {entry.status}
                                    </span>
                                </div>
                                <p className="text-sm text-tertiary mt-1">
                                    {entry.provider?.toUpperCase()} ·{" "}
                                    {formatCurrency(entry.amount ?? 0, entry.currency ?? "USD")} ·{" "}
                                    {entry.miningInterval ?? "Monthly"}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Created {formatDateTime(entry.createdAt)}
                                </p>
                                {entry.couponCode && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        Coupon {entry.couponCode} (
                                        {entry.couponDiscountPercent ?? 0}%)
                                    </p>
                                )}
                                {entry.events?.length ? (
                                    <p className="text-xs text-gray-400 mt-1">
                                        Latest event: {entry.events[entry.events.length - 1].type}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}
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

                    {selectedPaymentProvider && (
                        <SubscriptionConfirmPopup
                            isOpen={isConfirmPopupOpen}
                            onClose={() => setIsConfirmPopupOpen(false)}
                            onBack={handleBackToPaymentMethod}
                            onSubscribe={handleSubscribe}
                            paymentMethod={selectedPaymentProvider}
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
