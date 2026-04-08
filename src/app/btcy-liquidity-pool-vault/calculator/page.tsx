"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Info,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

import React, { useState, useEffect, Suspense } from "react";

import CustomButton2 from "@/components/CustomButton2";
import DisclaimerComponent from "@/components/DisclaimerComponent";

import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import electricIcon from '@/assets/images/liquidity_pool/electric_icon.svg'
import nuclearIcon from '@/assets/images/liquidity_pool/nuclear_icon.svg'
import turboIcon from '@/assets/images/liquidity_pool/turbo_icon.svg'

const TIERS = {
  starter: {
    name: "Starter Pool",
    icon: electricIcon,
    tier: "Electric Mining Tier",
    lockMonths: 3,
    rewardRate: 0.3,
    minDeposit: 250,
    benefits: ["Electric Mining Tier (3x)", "No Ads", "Alchemy Priority", "Reduced Trading Fees"]
  },
  growth: {
    name: "Growth Pool",
    icon: turboIcon,
    tier: "Turbo Mining Tier",
    lockMonths: 6,
    rewardRate: 0.4,
    minDeposit: 500,
    benefits: ["Turbo Mining Tier (6x)", "No Ads", "Alchemy Priority", "Reduced Trading Fees"]
  },
  founder: {
    name: "Founder Pool",
    icon: nuclearIcon,
    tier: "Nuclear Mining Tier",
    lockMonths: 12,
    rewardRate: 0.5,
    minDeposit: 1000,
    benefits: ["Nuclear Mining Tier (9x)", "No Ads", "Alchemy Priority", "Reduced Trading Fees"]
  }
};

const BTCY_PRICE = 0.0034; // Implied price from user screenshot

function CalculatorContent() {
  const searchParams = useSearchParams();
  const tierKey = (searchParams.get("tier") as keyof typeof TIERS) || "starter";
  const tier = TIERS[tierKey] || TIERS.starter;

  const [depositAmount, setDepositAmount] = useState<number>(tier.minDeposit);
  const [dates, setDates] = useState({
    start: "",
    earlyExit: "",
    maturity: ""
  });

  useEffect(() => {
    const now = new Date();
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    };

    const earlyExitDate = new Date();
    earlyExitDate.setMonth(now.getMonth() + tier.lockMonths / 2);

    const maturityDate = new Date();
    maturityDate.setMonth(now.getMonth() + tier.lockMonths);

    setDates({
      start: formatDate(now),
      earlyExit: formatDate(earlyExitDate),
      maturity: formatDate(maturityDate)
    });
  }, [tier]);

  const btcyReward = (depositAmount * tier.rewardRate) / BTCY_PRICE;
  const usdReward = depositAmount * tier.rewardRate;

  return (
    <div className=" mt-40 mx-auto md:mt-40 px-4 md:px-20 xl:px-40 relative max-w-[1600px]">
      {/* Back Link */}
      <Link
        href="/btcy-liquidity-pool-vault/select-tier"
        className="flex items-center gap-2 text-[#FF8728] hover:text-[#FF8728]/80 transition-colors mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Tier Selection</span>
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Pool Calculator</h1>
        <p className="text-tertiary text-xl">Calculate your potential rewards and configure your pool</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Configuration */}
        <div className="space-y-8">
          {/* Selected Tier Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-[#fff] text-[24px] font-bold  mb-6">Selected Tier</h3>
            <div className="flex items-center gap-6 mb-8">
              <Image src={tier.icon} alt={tier.name} className="w-16 h-16" />
              <div>
                <h4 className="text-2xl font-bold text-white">{tier.name}</h4>
                <p className="text-tertiary text-sm">{tier.tier}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-[#202020] rounded-2xl p-6">
              <div>
                <p className="text-tertiary text-xs uppercase mb-1">Lock Duration</p>
                <p className="text-white font-bold">{tier.lockMonths} months</p>
              </div>
              <div>
                <p className="text-tertiary text-xs uppercase mb-1">Reward Rate</p>
                <p className="text-primary font-bold">{tier.rewardRate * 100}% BTCY</p>
              </div>
            </div>
            <Link
              href="/btcy-liquidity-pool-vault/select-tier"
              className="block text-center text-primary text-sm font-bold mt-6 hover:underline"
            >
              Change Tier
            </Link>
          </div>

          {/* Deposit Amount Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8">Deposit Amount</h3>
            <div className="space-y-4">
              <label className="text-tertiary text-sm mb-2">Enter USDT Amount</label>
              <div className="relative group">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-[#202020] border-1 mt-2 border-white/10 rounded-2xl p-6 text-3xl font-bold text-white focus:outline-none focus:border-primary/50 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-tertiary text-2xl font-bold">USDT</span>
              </div>
              <p className="text-tertiary text-sm">Minimum deposit: <span className="text-white font-bold">{tier.minDeposit} USDT</span></p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex flex-col items-center pt-8">
            <CustomButton2
              image={ArrowRightButtonImage}
              text="Continue to Payment"
              link={`/btcy-liquidity-pool-vault/payment?tier=${tierKey}&amount=${depositAmount}`}
              imageStyling="w-32"
            />
          </div>

        </div>

        {/* Right Column: Summaries */}
        <div className="space-y-8">
          {/* Estimated Rewards Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-primary/20 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-8">Estimated Rewards</h3>
            <div className="space-y-8">
              <div>
                <p className="text-tertiary text-sm mb-1">Your Deposit</p>
                <p className="text-4xl font-bold text-white">{depositAmount.toLocaleString()} USDT</p>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              <div>
                <p className="text-tertiary text-sm mb-2">Estimated BTCY Reward ({tier.rewardRate * 100}%)</p>
                <p className="text-5xl font-black text-primary leading-tight">
                  {btcyReward.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })} BTCY
                </p>
                <p className="text-tertiary text-sm mt-2">≈ ${usdReward.toLocaleString()} at current price</p>
              </div>

              <div className=" flex gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs text-tertiary leading-relaxed">
                  <p className="font-bold text-primary mb-1 uppercase tracking-wider">Important</p>
                  Final BTCY amount will be calculated using the live BTCY price at withdrawal/maturity. This is an estimate for reference only.
                </div>
              </div>
            </div>
          </div>

          {/* Pool Timeline Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8">Pool Timeline</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className=" p-2">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-tertiary text-xs uppercase mb-0.5">Pool Start</p>
                  <p className="text-white font-bold">{dates.start}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className=" p-2  ">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-tertiary text-xs uppercase mb-0.5">Early Exit Eligible</p>
                  <p className="text-white font-bold">{dates.earlyExit}</p>
                  <p className="text-tertiary text-xs">50% reward if exited early</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 ">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-tertiary text-xs uppercase mb-0.5">Maturity Date</p>
                  <p className="text-white font-bold">{dates.maturity}</p>
                  <p className="text-tertiary text-xs">100% reward unlocked</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Benefits Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-8">Active Benefits</h3>
            <div className="space-y-4 mb-8">
              {tier.benefits.map((benefit, idx) => {
                let BenefitIcon = Zap;
                if (benefit.toLowerCase().includes("no ads")) BenefitIcon = ShieldCheck;
                if (benefit.toLowerCase().includes("priority") || benefit.toLowerCase().includes("fees")) BenefitIcon = TrendingUp;

                return (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                    <BenefitIcon className="w-4 h-4 text-primary" />
                    <span>{benefit}</span>
                  </div>
                );
              })}
            </div>
            <div className=" border border-primary/20 rounded-xl p-3 ">
              <p className="text-[12px] text-primary font-medium">Benefits activate immediately and remain active until maturity or early exit</p>
            </div>
          </div>
          {/* Footer Notes */}
          <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
            <ul className="grid grid-cols-1  gap-x-12 gap-y-4 text-xs text-tertiary/60 list-disc list-inside">
              <li>USDT is locked until maturity or eligible early exit</li>
              <li>No BTCY released during pool period</li>
              <li>KYC required at withdrawal</li>
              <li>Early exit forfeits 50% of reward</li>
            </ul>
          </div>
        </div>
      </div>



      <DisclaimerComponent />
    </div>
  );
}

export default function PoolCalculatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CalculatorContent />
    </Suspense>
  );
}
