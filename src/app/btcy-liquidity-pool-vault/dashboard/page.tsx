"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Zap,
  Clock,
  TrendingUp,
  CheckCircle2,
  Lock,
  History,
  Info,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import React, { Suspense, useEffect, useState } from "react";

import DisclaimerComponent from "@/components/DisclaimerComponent";

import electric_icon from '@/assets/images/liquidity_pool/electric_icon.svg'
import nuclear_icon from '@/assets/images/liquidity_pool/nuclear_icon.svg'
import turbo_icon from '@/assets/images/liquidity_pool/turbo_icon.svg'
import OvalImage from "@/assets/images/button-border-active.webp";
import GreyOvalImage from "@/assets/images/button-border.webp";


const TIERS = {
  starter: { name: "Starter Pool", icon: electric_icon, lockMonths: 3, rewardRate: 0.3, benefits: ["Electric Mining", "No Ads", "Alchemy Priority", "Reduced Trading Fees"] },
  growth: { name: "Growth Pool", icon: turbo_icon, lockMonths: 6, rewardRate: 0.4, benefits: ["Turbo Mining", "No Ads", "Alchemy Priority", "Reduced Trading Fees"] },
  founder: { name: "Founder Pool", icon: nuclear_icon, lockMonths: 12, rewardRate: 0.5, benefits: ["Nuclear Mining", "No Ads", "Alchemy Priority", "Reduced Trading Fees"] },
};

const BTCY_PRICE = 0.0034;

function DashboardContent() {
  const searchParams = useSearchParams();
  const tierKey = (searchParams.get("tier") as keyof typeof TIERS) || "starter";
  const amountStr = searchParams.get("amount") || "250";
  const amount = Number(amountStr);
  const tier = TIERS[tierKey] || TIERS.starter;

  const [dates, setDates] = useState({
    start: "",
    earlyExit: "",
    maturity: ""
  });

  useEffect(() => {
    const now = new Date();
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
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

  const btcyReward = (amount * tier.rewardRate) / BTCY_PRICE;
  const earlyExitReward = btcyReward * 0.5;

  return (
    <div className="mx-auto mt-40 px-4 md:px-20 xl:px-40 relative max-w-[1600px] mb-40">
      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Active Pool Dashboard</h1>
        <p className="text-tertiary text-xl">Monitor your pool progress and manage your investment</p>
      </div>

      {/* Top Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#232323] rounded-3xl p-6 border border-white/5 flex items-center gap-4">
          <div className=" p-3  ">
            <Image src={tier.icon} alt="" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-tertiary text-sm   ">Pool Tier</p>
            <p className="text-white font-bold text-xl">{tier.name}</p>
          </div>
        </div>
        <div className="bg-[#232323] rounded-3xl p-6 border border-white/5">
          <p className="text-tertiary text-sm ">Deposit Amount</p>
          <p className="text-white font-bold text-3xl">{amount.toLocaleString()} <span className="text-sm font-normal text-tertiary">USDT</span></p>
        </div>
        <div className="bg-[#232323] rounded-3xl p-6 border border-white/5">
          <p className="text-tertiary text-sm ">Days Remaining</p>
          <p className="text-primary font-bold text-3xl">{tier.lockMonths * 30}</p>
        </div>
        <div className="bg-[#232323] rounded-3xl p-6 border border-primary/30">
          <p className="text-tertiary text-sm ">Estimated BTCY Reward</p>
          <p className="text-white font-bold text-2xl">{btcyReward.toLocaleString(undefined, { maximumFractionDigits: 3 })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Progress & Status */}
        <div className="lg:col-span-3 space-y-8">
          {/* Lifecycle Progress Card */}
          <div className="bg-[#232323] rounded-[40px] p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-10">Pool Lifecycle Progress</h3>

            <div className="relative mb-12">
              <div className="flex justify-between text-xs text-tertiary mb-3">
                <span>0 days elapsed</span>
                <span>{tier.lockMonths * 30} days remaining</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[2%] rounded-full shadow-[0_0_10px_rgba(255,135,40,0.5)]"></div>
              </div>
            </div>

            <div className="space-y-10 relative">
              {/* Vertical line connector */}
              <div className="absolute left-[24px] top-6 bottom-6 w-0.5 bg-white/5"></div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  <CheckCircle2 className="w-5 h-5 text-white relative z-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Pool Started</h4>
                  <p className="text-tertiary text-sm mb-1">{dates.start}</p>
                  <p className="text-white/70 text-xs font-medium ">Deposit confirmed • Benefits activated</p>
                </div>
              </div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image src={GreyOvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  <Lock className="w-5 h-5 text-gray-500 relative z-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white/50">Early Exit Eligible</h4>
                  <p className="text-tertiary text-sm">{dates.earlyExit}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 relative z-10 opacity-40">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image src={GreyOvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  <TrendingUp className="w-5 h-5 text-gray-500 relative z-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Maturity Date</h4>
                  <p className="text-tertiary text-sm mb-1">{dates.maturity}</p>
                  <p className="text-xs uppercase tracking-widest font-medium">100% reward unlocked • USDT available for withdrawal</p>
                </div>
              </div>
            </div>

          </div>

          {/* Reward Status Card */}
          <div className="bg-[#232323] rounded-[40px] p-8 md:p-12 border border-primary/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain px-1" />
                <TrendingUp className="w-8 h-8 text-primary relative z-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Reward Status: Locked</h3>
                <p className="text-tertiary text-sm">Your BTCY reward will be calculated using the live BTCY price at withdrawal/maturity</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-6 rounded-3xl bg-[#202020]/[0.02]  transition-all ">
                <p className="text-tertiary text-xs  mb-2">Current Estimate (100%)</p>
                <p className="text-2xl font-bold text-white">
                  {btcyReward.toLocaleString(undefined, { maximumFractionDigits: 3 })} <span className=" text-tertiary">BTCY</span>
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-[#202020]/[0.02] ">
                <p className="text-tertiary text-xs mb-2 ">If Early Exit (50%)</p>
                <p className="text-2xl font-bold text-primary transition-colors">
                  {earlyExitReward.toLocaleString(undefined, { maximumFractionDigits: 3 })} <span className="">BTCY</span>
                </p>
              </div>
            </div>



          </div>
          <div className="bg-[#232323] border border-white/5 rounded-2xl p-4 flex gap-3 mb-10">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-tertiary leading-relaxed">
              <span className="font-bold text-white mb-1 block">Important:</span>
              The BTCY reward amounts shown are estimates based on the current BTCY price of $0.0034. The final amount will be calculated using the live market price at the time of withdrawal or maturity.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href={`/btcy-liquidity-pool-vault/details?tier=${tierKey}&amount=${amount}`}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl border border-white/10 transition-all text-center flex items-center justify-center"
            >
              View Full Details
            </Link>
            <button disabled className="flex-1 bg-white/[0.02] text-gray-500 font-bold py-5 rounded-2xl border border-white/5 cursor-not-allowed">Early Exit Not Eligible</button>
          </div>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Benefits Section */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Active Benefits
            </h3>
            <div className="space-y-4 mb-8">
              {tier.benefits.map((benefit, idx) => {
                let BenefitIcon = Zap;
                if (benefit.toLowerCase().includes("no ads")) BenefitIcon = ShieldCheck;
                if (benefit.toLowerCase().includes("priority") || benefit.toLowerCase().includes("fees")) BenefitIcon = TrendingUp;

                return (
                  <div key={idx} className="flex items-center gap-3 text-sm text-gray-300 group">
                    <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                      <BenefitIcon className="w-5 h-5 text-white relative z-10  transition-opacity" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#202020] rounded-lg p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-[12px] text-white ">All benefits active</span>
            </div>
          </div>

          {/* KYC Status Section */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">KYC Status</h3>
            <div className="flex items-center gap-4 mb-8">
              <Clock className="w-10 h-10 text-tertiary" />
              <div>
                <p className="text-white font-bold text-lg">Not Required Yet</p>
                <p className="text-tertiary text-[10px] leading-relaxed uppercase tracking-widest mt-1">KYC verification will be required when you&apos;re ready to withdraw</p>
              </div>
            </div>
            <button className="w-full bg-[#202020] hover:bg-white/10 text-white text-sm py-3  rounded-lg  transition-all ">Start KYC Early (Optional)</button>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" /> Recent Activity
            </h3>
            <div className="space-y-6">
              {[
                { title: "Pool Activated", date: dates.start },
                { title: "Benefits Enabled", date: dates.start },
                { title: "Deposit Confirmed", date: dates.start }
              ].map((activity, idx) => (
                <div key={idx} className="border-b-1 border-white/5  py-2 pb-4">
                  <p className="text-sm font-bold text-white mb-0.5">{activity.title}</p>
                  <p className="text-tertiary text-[10px]">{activity.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: "Create New Pool", link: "/btcy-liquidity-pool-vault/select-tier" },
                { label: "View Pool History", link: "#" }
              ].map((action, idx) => (
                <Link key={idx} href={action.link} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-bold text-tertiary hover:text-white hover:border-primary/20 transition-all group">
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DisclaimerComponent />
    </div>
  );
}

export default function PoolDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <DashboardContent />
    </Suspense>
  );
}
