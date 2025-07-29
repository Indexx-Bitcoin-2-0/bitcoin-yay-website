"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";

import BitcoinYayLogo from "@/assets/images/logo.webp";
import BgArtImage1 from "@/assets/images/alchemy/electric/bg-art-1.webp";
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

// Electric alchemy data for different tiers
const alchemyData = {
  basic: {
    input: "2,500 BTCY",
    inputAmount: 2500,
    multiplier: "0.3x - 1.3x",
  },
  premium: {
    input: "5,000 BTCY",
    inputAmount: 5000,
    multiplier: "0.4x - 1.7x",
  },
  elite: {
    input: "20,000 BTCY",
    inputAmount: 20000,
    multiplier: "0.2x - 2.8x",
  },
  ultra: {
    input: "50,000 BTCY",
    inputAmount: 50000,
    multiplier: "0.2x - 3.0x",
  },
};

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AlchemyDetailPage({ params }: AlchemyDetailPageProps) {
  const deadline = new Date("2025-07-16T12:00:00Z");
  const resolvedParams = use(params) as { slug: string };
  const data =
    alchemyData[resolvedParams.slug as keyof typeof alchemyData] ||
    alchemyData.basic;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 1,
    minutes: 1,
    seconds: 1,
  });

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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = deadline.getTime() - now;

      if (difference > 0) {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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
        userType: "electric",
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
      {/* Countdown Timer */}
      <div className="flex justify-center relative z-20">
        <div className="bg-[#22B868] rounded-t-2xl px-8 py-6 md:px-10 md:py-8 lg:py-6 w-80 md:w-full max-w-xl relative z-20">
          <div className="text-center">
            <h2 className="text-lg mb-6">This Alchemy will end</h2>
            <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="text-[40px] font-bold leading-none">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-xs mt-2">Hours</div>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="text-[40px] font-bold leading-none">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-xs mt-2">Minutes</div>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="text-[40px] font-bold leading-none">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-xs mt-2">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-bg2 max-w-7xl mx-auto z-10">
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
            <h1 className="text-5xl font-semibold">Electric Mining Alchemy</h1>
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
            {/* Progress bar */}
            <div className="mt-20 w-full">
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">20</p>
                <p className="text-base font-semibold">100</p>
              </div>
              <div className="w-full mt-2 h-[10px] bg-bg3 rounded-full">
                <div
                  className="h-full bg-[#22B868] rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-tertiary">
                Only 80 participants remaining!
              </p>
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
          <div className="bg-[#22B868] rounded-2xl px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
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
