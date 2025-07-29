"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";

import BitcoinYayLogo from "@/assets/images/logo.webp";
import BgArtImage1 from "@/assets/images/alchemy/quantum/bg-art-1.webp";
import PointingHandButtonImage from "@/assets/images/buttons/point-button.webp";
import CustomButton2 from "@/components/CustomButton2";

import { getAuthData } from "@/lib/auth";
import { createAlchemy, completeAlchemy } from "@/lib/alchemy";

import CongratulationsPage from "@/app/alchemy/congratulations/page";
import RetainedPage from "@/app/alchemy/retained/page";

interface AlchemyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Quantum alchemy data for different tiers
const alchemyData = {
  basic: {
    input: "10,000 BTCY",
    inputAmount: 10000,
    multiplier: "0.5x - 1.4x",
  },
  pro: {
    input: "20,000 BTCY",
    inputAmount: 20000,
    multiplier: "0.4x - 2x",
  },
  premium: {
    input: "50,000 BTCY",
    inputAmount: 50000,
    multiplier: "0.3x - 2.5x",
  },
  ultra: {
    input: "100,000 BTCY",
    inputAmount: 100000,
    multiplier: "0.2x - 3x",
  },
  exactive: {
    input: "150,000 BTCY",
    inputAmount: 150000,
    multiplier: "0.2x - 3x",
  },
  elite: {
    input: "200,000 BTCY",
    inputAmount: 200000,
    multiplier: "0.1x - 3.2x",
  },
};

export default function AlchemyDetailPage({ params }: AlchemyDetailPageProps) {
  const resolvedParams = use(params) as { slug: string };
  const data =
    alchemyData[resolvedParams.slug as keyof typeof alchemyData] ||
    alchemyData.basic;

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

  const handleStartAlchemy = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const authData = getAuthData();

      if (!authData || !authData.email) {
        throw new Error("User not authenticated");
      }

      // Step 1: Create alchemy session
      const createResult = await createAlchemy({
        email: authData.email,
        inputAmount: data.inputAmount,
        userType: "quantum",
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

  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div className="bg-bg2 max-w-7xl mx-auto z-10">
        <div className="absolute top-20 left-0 w-full h-full -z-20">
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
            <h1 className="text-5xl font-semibold">Quantum Mining Alchemy</h1>
            <p className="mt-4 text-lg text-tertiary">
              This Alchemy will turn your current BTCY as Nuggets into BTCY
              microtoken
            </p>

            <div className="mt-16 w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-3xl md:text-4xl">Input:</p>
                <p className="text-4xl xl:text-5xl font-bold">{data.input}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-3xl md:text-4xl">Multiplier:</p>
                <p className="text-4xl xl:text-5xl font-bold">
                  {data.multiplier}
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
                onClick={handleStartAlchemy}
                className={`${
                  isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <CustomButton2
                  image={PointingHandButtonImage}
                  text={isLoading ? "Starting..." : "Start Alchemy"}
                  link="#"
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

        <div className="mt-60 mb-20">
          <div className="bg-[#5A4BCC] rounded-2xl px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                  To Get Exclusive Benefits
                </h3>
                <p className="text-secondary font-light text-lg md:text-xl lg:text-2xl opacity-90">
                  Please drop in your email
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center w-full max-w-120">
                <div className="relative flex w-full">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full sm:flex-1 px-4 py-3 md:px-6 md:py-4 pr-24 md:pr-28 rounded-full border border-secondary text-secondary placeholder-secondary focus:outline-none text-base md:text-lg bg-secondary/20"
                  />
                  <Link
                    href="#"
                    className="absolute right-1 top-1 bottom-1 px-6 py-2 md:px-8 md:py-3 bg-primary hover:bg-[#F97400] font-semibold rounded-full transition-colors duration-200 text-base md:text-lg font-boldwhitespace-nowrap"
                  >
                    ACTION
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
