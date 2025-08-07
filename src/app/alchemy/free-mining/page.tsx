"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import FreeMiningButtonImage from "@/assets/images/alchemy/home/free-art.webp";
import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/free-mining/art-1.webp";
import BitcoinYayLogo from "@/assets/images/logo2.webp";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";

import EmailSection from "@/components/EmailSection";

import { getAlchemyConfig, AlchemyConfigItem } from "@/lib/alchemy";

const CustomCard = ({
  inputBTCY,
  multiplier,
  planIndex,
}: {
  inputBTCY: string;
  multiplier: string;
  planIndex: number;
}) => {
  return (
    <Link
      href={`/alchemy/free-mining/${planIndex}`}
      className="w-100 bg-primary z-10 hover:scale-105 transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src={BitcoinYayLogo}
          alt="Bitcoin Yay Logo"
          className="mt-10 w-50"
        />
      </div>
      <div className="mt-10 bg-[#F97400] flex flex-col items-center justify-center py-10">
        <p className="text-3xl md:text-4xl font-semibold">{inputBTCY}</p>
        <p className="mt-2 text-xl md:text-2xl font-semibold">{multiplier}</p>
      </div>
    </Link>
  );
};

export default function FreeMiningPage() {
  const [freePlans, setFreePlans] = useState<AlchemyConfigItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreePlans = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAlchemyConfig();

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch alchemy config");
        }

        if (response.session?.free) {
          setFreePlans(response.session.free);
        }
      } catch (err) {
        console.error("Failed to fetch free plans:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch free plans"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreePlans();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto mt-40 lg:mt-60 px-4 md:px-20 xl:px-40">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <p className="text-2xl font-semibold">Loading Free Plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-40 lg:mt-60 px-4 md:px-20 xl:px-40">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-500 mb-4">
              Failed to Load Free Plans
            </p>
            <p className="text-lg text-tertiary">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-40 lg:mt-60 px-4 md:px-20 xl:px-40">
      <div className="flex items-center gap-6">
        <Image src={AlchemyLogo} alt="Alchemy Logo" className="w-16" />
        <h1 className="text-3xl md:text-[52px] font-semibold">
          Alchemy Gateway
        </h1>
      </div>
      <div className="mt-20 flex flex-col items-center text-center">
        <Image src={FreeMiningButtonImage} alt="Free Mining" className="w-32" />
        <h1 className="mt-10 text-5xl md:text-[80px] font-bold">
          FREE MINING GOPHER
        </h1>
        <h2 className="mt-2 text-3xl md:text-[50px] font-bold">
          ALCHEMY GATEWAY
        </h2>
        <p className="mt-6 text-xl font-light">
          You are eligible to join the Free Mining Gopher Alchemy Gateway
        </p>
      </div>
      <div className="mt-40 flex flex-wrap justify-center items-center gap-10 p-4 z-20">
        {freePlans.map((plan, index) => (
          <CustomCard
            key={index}
            inputBTCY={`Input: ${plan.input.toLocaleString()} BTCY`}
            multiplier={`Multiplier: ${plan.multiplierRange}`}
            planIndex={index}
          />
        ))}
      </div>
      <div className="-mt-40 mx-auto z-0 w-full flex justify-center">
        <Image
          src={ArtImage1}
          alt="Bg Art Image 1"
          className="z-0 w-70 md:w-140 xl:w-200"
        />
      </div>
      <div className="mx-4 md:mx-10 lg:mx-24">
        <EmailSection
          colorVariant="primary"
          buttonImage={PointingButtonImage}
        />
      </div>
    </div>
  );
}
