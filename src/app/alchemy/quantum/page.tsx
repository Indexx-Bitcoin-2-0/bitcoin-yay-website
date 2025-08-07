"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import QuantumMiningButtonImage from "@/assets/images/alchemy/home/quantum-art.webp";
import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/quantum/art-1.webp";
import BitcoinYayLogo from "@/assets/images/logo.webp";
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
      href={`/alchemy/quantum/${planIndex}`}
      className="w-100 bg-[#5A4BCC] z-10 hover:scale-105 transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src={BitcoinYayLogo}
          alt="Bitcoin Yay Logo"
          className="mt-10 w-50"
        />
      </div>
      <div className="mt-10 bg-[#4939C1] flex flex-col items-center justify-center py-10">
        <p className="text-3xl md:text-4xl font-semibold">{inputBTCY}</p>
        <p className="mt-2 text-xl md:text-2xl font-semibold">{multiplier}</p>
      </div>
    </Link>
  );
};

export default function QuantumMiningPage() {
  const [quantumPlans, setQuantumPlans] = useState<AlchemyConfigItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuantumPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAlchemyConfig();

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch alchemy config");
        }

        if (response.session?.quantum) {
          setQuantumPlans(response.session.quantum);
        }
      } catch (err) {
        console.error("Failed to fetch quantum plans:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch quantum plans"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuantumPlans();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto mt-40 lg:mt-60 px-4 md:px-20 xl:px-40">
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <p className="text-2xl font-semibold">Loading Quantum Plans...</p>
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
              Failed to Load Quantum Plans
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
        <Image
          src={QuantumMiningButtonImage}
          alt="Quantum Mining"
          className="w-40"
        />
        <h1 className="mt-10 text-5xl md:text-[80px] font-bold">
          QUANTUM MINING GOPHER
        </h1>
        <h2 className="mt-2 text-3xl md:text-[50px] font-bold">
          ALCHEMY GATEWAY
        </h2>
        <p className="mt-6 text-xl font-light max-w-5xl">
          Eligibility for the Quantum Mining Gopher Alchemy Gateway requires an
          active Turbo Power Mining subscription.
        </p>
      </div>
      <div className="mt-40 flex flex-wrap justify-center items-center gap-10 p-4 z-20">
        {quantumPlans.map((plan, index) => (
          <CustomCard
            key={index}
            inputBTCY={`Input: ${plan.input.toLocaleString()} BTCY`}
            multiplier={`Multiplier: ${plan.multiplierRange}`}
            planIndex={index}
          />
        ))}
      </div>
      <div className="md:-mt-10 mx-auto z-0 w-full flex justify-center">
        <Image
          src={ArtImage1}
          alt="Bg Art Image 1"
          className="z-0 w-80 md:w-140 xl:w-200 2xl:w-260"
        />
      </div>
      <div className="mx-4 md:mx-10 lg:mx-24">
        <EmailSection
          colorVariant="[#5A4BCC]"
          buttonImage={PointingButtonImage}
        />
      </div>
    </div>
  );
}
