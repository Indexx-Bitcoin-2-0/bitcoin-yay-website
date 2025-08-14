"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";

import BitcoinYayLogo from "@/assets/images/logo.webp";
import BgArtImage1 from "@/assets/images/alchemy/turbo/bg-art-1.webp";
import PointingHandButtonImage from "@/assets/images/buttons/point-button.webp";
import ActionButtonImage from "@/assets/images/buttons/action-primary-button.webp"

import CustomButton2 from "@/components/CustomButton2";
import EmailSection from "@/components/EmailSection";

import { getAuthData } from "@/lib/auth";
import {
  createAlchemy,
  completeAlchemy,
  getAlchemyConfig,
  AlchemyConfigItem,
  getUserSubscription,
  ALCHEMY_DISABLED,
  // isPlanAllowed,
} from "@/lib/alchemy";

import CongratulationsPage from "@/app/alchemy/congratulations/page";
import RetainedPage from "@/app/alchemy/retained/page";

interface AlchemyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Turbo alchemy data for different tiers

export default function AlchemyDetailPage({ params }: AlchemyDetailPageProps) {
  const resolvedParams = use(params) as { slug: string };
  const planIndex = parseInt(resolvedParams.slug);
  // const router = useRouter();

  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<AlchemyConfigItem | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showResult, setShowResult] = useState<
    "congratulations" | "retained" | null
  >(null);
  const [alchemyResult, setAlchemyResult] = useState<{
    inputAmount: number;
    resultAmount: number;
    multiplier: number;
  } | null>(null);

  // Fetch alchemy config on component mount
  useEffect(() => {
    const fetchAlchemyConfig = async () => {
      try {
        if (ALCHEMY_DISABLED) {
          setConfigLoading(false);
          setConfigError(null); // we’ll render the disabled UI instead of an error
          return;
        }
        setConfigLoading(true);
        setConfigError(null);

        const response = await getAlchemyConfig();

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch alchemy config");
        }

        if (response.session?.turbo) {
          if (planIndex >= 0 && planIndex < response.session.turbo.length) {
            setCurrentPlan(response.session.turbo[planIndex]);
          } else {
            throw new Error("Invalid plan index");
          }
        } else {
          throw new Error("No turbo plans found");
        }
      } catch (err) {
        console.error("Failed to fetch alchemy config:", err);
        setConfigError(
          err instanceof Error ? err.message : "Failed to fetch alchemy config"
        );
      } finally {
        setConfigLoading(false);
      }
    };

    // Only fetch if planIndex is a valid number
    if (!isNaN(planIndex)) {
      fetchAlchemyConfig();
    } else {
      setConfigError("Invalid plan index");
      setConfigLoading(false);
    }
  }, [planIndex]);

  const handleStartAlchemy = async () => {
    if (!currentPlan) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const authData = getAuthData();

      if (!authData || !authData.email) {
        throw new Error("User not authenticated");
      }

      // ✅ Check user's subscription eligibility
      const subscriptionResult = await getUserSubscription(authData.email);
      if (!subscriptionResult.data?.userType) {
        throw new Error("Unable to fetch user subscription type");
      }

      const userType = subscriptionResult.data.userType?.toLowerCase(); // "free mining" or "power mining"
      const subscriptionPlan = subscriptionResult.data.plan?.toLowerCase(); // e.g., "turbo power"
      const planType = "turbo"; // current page type

      const userTypeAccessMap: Record<string, string[]> = {
        "free mining": ["free"],
        "power mining": ["electric", "turbo", "nuclear"],
        "quantum mining": ["quantum"],
      };

      // const redirectMap: Record<string, string> = {
      //   free: "/alchemy/free",
      //   electric: "/alchemy/electric",
      //   turbo: "/alchemy/turbo",
      //   nuclear: "/alchemy/nuclear",
      //   quantum: "/alchemy/quantum",
      // };

      const normalizedUserType = userType?.trim().toLowerCase() || "";
      const normalizedPlan = subscriptionPlan?.trim().toLowerCase() || "";
      const normalizedPlanType = planType?.trim().toLowerCase() || "";

      const isUserTypeAllowed =
        userTypeAccessMap[normalizedUserType]?.includes(normalizedPlanType);

      const isPlanMatch = normalizedPlan.includes(normalizedPlanType);

      if (!isUserTypeAllowed || !isPlanMatch) {
        let redirectPath = "/alchemy/free";

        if (normalizedUserType === "free mining") {
          redirectPath = "/alchemy/free";
        } else if (normalizedUserType === "power mining") {
          if (normalizedPlan.includes("electric"))
            redirectPath = "/alchemy/electric";
          else if (normalizedPlan.includes("turbo"))
            redirectPath = "/alchemy/turbo";
          else if (normalizedPlan.includes("nuclear"))
            redirectPath = "/alchemy/nuclear";
        } else if (normalizedUserType === "quantum mining") {
          redirectPath = "/alchemy/quantum";
        }

        setError(
          `❌ Your current user type "${subscriptionResult.data.userType}" with plan "${subscriptionResult.data.plan}" does not allow access to this page.\n\n👉 Please go to: ${redirectPath}`
        );
        setIsLoading(false);
        return;
      }

      // Step 1: Create alchemy session
      const createResult = await createAlchemy({
        email: authData.email,
        inputAmount: currentPlan.input,
        userType: "turbo",
      });

      if (!createResult.success) {
        throw new Error(
          createResult.error || "Failed to start alchemy session"
        );
      }

      // Step 2: Complete alchemy session immediately
      if (createResult.session?.sessionId) {
        const completeResult = await completeAlchemy({
          sessionId: createResult.session.sessionId,
        });

        if (!completeResult.success) {
          throw new Error(
            completeResult.error || "Failed to complete alchemy session"
          );
        }

        // Check multiplier and show result component
        if (completeResult.session) {
          const session = completeResult.session;
          setAlchemyResult({
            inputAmount: session.inputAmount,
            resultAmount: session.resultAmount,
            multiplier: session.multiplier,
          });

          // Show result based on multiplier
          if (session.multiplier >= 1) {
            setShowResult("congratulations");
          } else {
            setShowResult("retained");
          }
        } else {
          setSuccess(true);
        }
      } else {
        // If complete alchemy failed, show success for create but note the completion issue
        setError("Alchemy created but failed to complete. Please try again.");
      }
    } catch (err) {
      console.error("Failed to start alchemy session:", err);
      setError(
        err instanceof Error ? err.message : "Failed to start alchemy session"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // If showing result, render the appropriate component
  if (showResult === "congratulations" && alchemyResult) {
    const gainedAmount = Math.max(
      0,
      alchemyResult.resultAmount - alchemyResult.inputAmount
    );
    return <CongratulationsPage gainedAmount={gainedAmount} />;
  }

  if (showResult === "retained" && alchemyResult) {
    return <RetainedPage retainedAmount={alchemyResult.resultAmount} />;
  }

  // Show loading state while fetching config
  if (configLoading) {
    return (
      <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
        <div className="bg-bg2 max-w-7xl mx-auto z-10">
          <div className="pt-20 flex justify-center items-center min-h-96">
            <div className="text-center">
              <p className="text-2xl font-semibold">
                Loading Alchemy Configuration...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if config fetch failed
  if (configError) {
    return (
      <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
        <div className="bg-bg2 max-w-7xl mx-auto z-10">
          <div className="pt-20 flex justify-center items-center min-h-96">
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-500 mb-4">
                Failed to Load Alchemy Configuration
              </p>
              <p className="text-lg text-tertiary">{configError}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback if no current plan is available
  if (!currentPlan) {
    return (
      <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
        <div className="bg-bg2 max-w-7xl mx-auto z-10">
          <div className="pt-20 flex justify-center items-center min-h-96">
            <div className="text-center">
              <p className="text-2xl font-semibold text-yellow-500 mb-4">
                No Alchemy Plan Available
              </p>
              <p className="text-lg text-tertiary">
                Unable to find the requested alchemy plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (ALCHEMY_DISABLED) {
    return (
      <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
        <div className="bg-bg2 max-w-7xl mx-auto z-10">
          <div className="pt-20 flex justify-center items-center min-h-96">
            <div className="text-center max-w-xl">
              <p className="text-3xl font-semibold mb-4">Alchemy is temporarily unavailable</p>
              <p className="text-lg text-tertiary">
                We’re making improvements. Please check back soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div className="bg-bg2 max-w-7xl mx-auto z-10 rounded-b-2xl">
        <div className="absolute top-105 left-0 w-full h-full -z-20">
          <Image src={BgArtImage1} alt="Bg Art 1" className="w-full" />
        </div>
        <div className="pt-20 flex flex-col lg:flex-row justify-center items-center gap-20 px-4 md:px-10 xl:px-20 relative z-10">
          <div className="w-full lg:w-1/2 flex justify-center items-center relative z-10">
            <Image
              src={BitcoinYayLogo}
              alt="BitcoinYay Logo"
              className="w-60 md:w-100 lg:w-120"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-start items-start relative z-10">
            <h1 className="text-5xl font-semibold">Turbo Mining Alchemy</h1>
            <p className="mt-4 text-lg text-tertiary">
              This Alchemy will turn your current BTCY as Nuggets into BTCY
              microtoken
            </p>

            <div className="mt-16 w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-3xl md:text-4xl">Input:</p>
                <p className="text-4xl xl:text-5xl font-bold">
                  {currentPlan.input.toLocaleString()} BTCY
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-3xl md:text-4xl">Multiplier:</p>
                <p className="text-4xl xl:text-5xl font-bold">
                  {currentPlan.multiplierRange}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-40 flex flex-col items-center justify-center relative z-10">
          {success ? (
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-500 mb-4">
                Alchemy Session Started Successfully!
              </p>
              <p className="text-lg text-tertiary">
                Your alchemy has been processed. Redirecting you to results...
              </p>
            </div>
          ) : (
            <>
              <div
                className={`${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
              >
                <CustomButton2
                  image={PointingHandButtonImage}
                  text={isLoading ? "Starting..." : "Start Alchemy"}
                  onClick={handleStartAlchemy}
                  imageStyling="w-36 mt-8"
                />
              </div>
              {error && (
                <p className="mt-4 text-red-500 text-center max-w-md">
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        <EmailSection
          colorVariant="[#2056BA]"
          buttonImage={ActionButtonImage}
        />
      </div>
    </div>
  );
}
