"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  ShieldCheck,
} from "lucide-react";
import React, { Suspense } from "react";

import CustomButton2 from "@/components/CustomButton2";
import DisclaimerComponent from "@/components/DisclaimerComponent";

import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import OvalImage from "@/assets/images/button-border-active.webp";



const TIERS = {
  starter: { name: "Starter Pool", lockMonths: 3, rewardRate: 0.3 },
  growth: { name: "Growth Pool", lockMonths: 6, rewardRate: 0.4 },
  founder: { name: "Founder Pool", lockMonths: 12, rewardRate: 0.5 },
};

const BTCY_PRICE = 0.0034;

function PaymentContent() {
  const searchParams = useSearchParams();
  const tierKey = (searchParams.get("tier") as keyof typeof TIERS) || "starter";
  const amountStr = searchParams.get("amount") || "250";
  const amount = Number(amountStr);
  const tier = TIERS[tierKey] || TIERS.starter;

  const btcyReward = (amount * tier.rewardRate) / BTCY_PRICE;

  return (
    <div className="mx-auto mt-40 md:mt-40 px-4 md:px-20 xl:px-40 relative max-w-[1400px] mb-40">
      {/* Back Link */}
      <Link
        href={`/btcy-liquidity-pool-vault/calculator?tier=${tierKey}`}
        className="flex items-center gap-2 text-[#FF8728] hover:text-[#FF8728]/80 transition-colors mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Calculator</span>
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Select Payment Method</h1>
        <p className="text-tertiary text-xl">Choose how you&apos;d like to deposit USDT for your pool</p>
      </div>

      {/* Pool Summary Bar */}
      <div className="bg-[#232323] rounded-3xl p-6 md:p-8 border border-white/5 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-tertiary text-sm  mb-1">Pool Tier</p>
            <p className="text-white font-bold text-lg">{tier.name}</p>
          </div>
          <div>
            <p className="text-tertiary text-sm  mb-1">Deposit Amount</p>
            <p className="text-white font-bold text-lg">{amount.toLocaleString()} USDT</p>
          </div>
          <div>
            <p className="text-tertiary text-sm  mb-1">Duration</p>
            <p className="text-white font-bold text-lg">{tier.lockMonths} months</p>
          </div>
          <div>
            <p className="text-tertiary text-sm  mb-1">Estimated Reward</p>
            <p className="text-primary font-bold text-lg">
              {btcyReward.toLocaleString(undefined, { maximumFractionDigits: 0 })} BTCY
            </p>
          </div>
        </div>
      </div>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* On-Chain Transfer Card */}
        <div className="bg-[#232323] rounded-[40px] p-10 md:p-16 border border-white/5 text-center transition-all relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-8 mx-auto">
              <Image
                src={OvalImage}
                alt=""
                className="absolute inset-0 w-full h-full object-contain pointer-events-none "
              />
              <ExternalLink className="w-10 h-10 text-primary relative z-10" />
            </div>


            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">On-Chain USDT Transfer</h2>
            <p className="text-tertiary text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Send USDT directly from your wallet to our deposit address. Suitable for external wallets like MetaMask, Trust Wallet, etc.
            </p>

            <div className="flex flex-col  justify-center gap-6 mb-12 text-sm text-tertiary">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Activation: 5-15 minutes after confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Requires network confirmation</span>
              </div>
            </div>

            <CustomButton2
              image={ArrowRightButtonImage}
              text="Continue with On-chain"
              link={`/btcy-liquidity-pool-vault/dashboard?tier=${tierKey}&amount=${amount}`}
              imageStyling="w-32"
            />

          </div>
        </div>
      </div>

      {/* Important Information Section */}
      <div className=" mx-auto">
        <div className="rounded-3xl border border-primary/20 p-10 bg-[#232323]">
          <h3 className="text-2xl font-bold text-white mb-8">Important Information</h3>
          <ul className="space-y-4 text-tertiary text-sm list-disc list-inside">
            <li>Only USDT deposits are accepted for pool activation</li>
            <li>Ensure you send the exact amount specified in your pool configuration</li>
            <li>For on-chain transfers, use only supported networks (ERC-20, TRC-20, BEP-20)</li>
            <li>Your pool will activate only after payment confirmation</li>
            <li>Ecosystem benefits will activate immediately upon successful payment</li>
          </ul>
        </div>
      </div>

      <DisclaimerComponent />
    </div>
  );
}

export default function PaymentSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PaymentContent />
    </Suspense>
  );
}
