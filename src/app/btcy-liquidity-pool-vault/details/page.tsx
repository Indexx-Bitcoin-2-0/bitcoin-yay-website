"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Clock,
  FileText,
  CreditCard,
  History,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

import React, { Suspense, useEffect, useState } from "react";

import DisclaimerComponent from "@/components/DisclaimerComponent";

import electric_icon from '@/assets/images/liquidity_pool/electric_icon.svg'
import nuclear_icon from '@/assets/images/liquidity_pool/nuclear_icon.svg'
import turbo_icon from '@/assets/images/liquidity_pool/turbo_icon.svg'
import OvalImage from "@/assets/images/button-border-active.webp";


const TIERS = {
  starter: {
    name: "Starter Pool",
    icon: electric_icon,
    lockMonths: 3,
    rewardRate: 0.3,
    miningTier: "Electric",
    benefits: [
      { title: "Electric Mining Tier", desc: "Enhanced mining rewards and priority processing" },
      { title: "Ad-Free Experience", desc: "No advertisements across the platform" },
      { title: "Alchemy Priority", desc: "Priority access to Alchemy features and services" },
      { title: "Reduced Trading Fees", desc: "Lower fees on all Indexx platform trades" }
    ]
  },
  growth: {
    name: "Growth Pool",
    icon: turbo_icon,
    lockMonths: 6,
    rewardRate: 0.4,
    miningTier: "Turbo",
    benefits: [
      { title: "Turbo Mining Tier", desc: "Enhanced mining rewards and priority processing" },
      { title: "Ad-Free Experience", desc: "No advertisements across the platform" },
      { title: "Alchemy Priority", desc: "Priority access to Alchemy features and services" },
      { title: "Reduced Trading Fees", desc: "Lower fees on all Indexx platform trades" }
    ]
  },
  founder: {
    name: "Founder Pool",
    icon: nuclear_icon,
    lockMonths: 12,
    rewardRate: 0.5,
    miningTier: "Nuclear",
    benefits: [
      { title: "Nuclear Mining Tier", desc: "Enhanced mining rewards and priority processing" },
      { title: "Ad-Free Experience", desc: "No advertisements across the platform" },
      { title: "Alchemy Priority", desc: "Priority access to Alchemy features and services" },
      { title: "Reduced Trading Fees", desc: "Lower fees on all Indexx platform trades" }
    ]
  },
};

const BTCY_PRICE = 0.0034;

function DetailsContent() {
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

  const rewardUsdtValue = amount * tier.rewardRate;
  const btcyReward = rewardUsdtValue / BTCY_PRICE;

  return (
    <div className="mx-auto mt-40 px-4 md:px-20 xl:px-40 relative max-w-[1600px] mb-40">
      {/* Back Link */}
      <Link
        href={`/btcy-liquidity-pool-vault/dashboard?tier=${tierKey}&amount=${amount}`}
        className="flex items-center gap-2 text-[#FF8728] hover:text-[#FF8728]/80 transition-colors mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Dashboard</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Pool Details</h1>
        <p className="text-tertiary text-xl">Complete information about your pool</p>
      </div>

      {/* Top Header Card */}
      <div className="bg-[#232323] rounded-[40px] p-8 md:p-12 border border-white/5 mb-12 relative overflow-hidden">
        <div className="relative z-10">
          {/* Top Row: Icon, Title & Active Badge */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-6">
              <Image src={tier.icon} alt="" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{tier.name}</h2>
                <p className="text-tertiary text-sm font-medium tracking-widest uppercase opacity-60">Pool ID: POOL-2026-001234</p>
              </div>
            </div>

            <div className="relative w-24 h-16 flex items-center justify-center">
              <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
              <span className="text-primary font-bold uppercase tracking-widest text-xs relative z-10">Active</span>
            </div>
          </div>

          {/* Bottom Row: Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#202020] rounded-2xl p-6">
              <p className="text-tertiary text-xs uppercase tracking-widest mb-3 opacity-60">Deposit Amount</p>
              <p className="text-white font-bold text-2xl md:text-3xl">{amount.toLocaleString()} USDT</p>
            </div>

            <div className="bg-[#202020] rounded-2xl p-6">
              <p className="text-tertiary text-xs uppercase tracking-widest mb-3 opacity-60">Reward Rate</p>
              <p className="text-primary font-bold text-2xl md:text-3xl">{tier.rewardRate * 100}%</p>
            </div>

            <div className="bg-[#202020] rounded-2xl p-6">
              <p className="text-tertiary text-xs uppercase tracking-widest mb-3 opacity-60">Estimated BTCY</p>
              <p className="text-white font-bold text-2xl md:text-3xl">
                {btcyReward.toLocaleString(undefined, { maximumFractionDigits: 3 })}
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Pool Terms Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <FileText className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Pool Terms</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Tier", value: tier.name },
                { label: "Principal Amount", value: `${amount.toLocaleString()} USDT` },
                { label: "Lock Duration", value: `${tier.lockMonths} months (${tier.lockMonths * 30} days)` },
                { label: "Reward Rate", value: `${tier.rewardRate * 100}% BTCY`, isPrimary: true },
                { label: "Mining Tier", value: tier.miningTier },
                { label: "Early Exit Penalty", value: "50% reward forfeiture" },
              ].map((term, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-tertiary text-sm">{term.label}</span>
                  <span className={`font-bold text-sm ${term.isPrimary ? 'text-primary' : 'text-white'}`}>{term.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Mechanics Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Reward Mechanics</h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-tertiary text-[10px] uppercase tracking-widest mb-2 font-medium">Reward Amount (USDT Value)</p>
                <p className="text-4xl font-bold text-white">${rewardUsdtValue.toLocaleString()}</p>
                <p className="text-[10px] text-tertiary uppercase font-bold tracking-widest mt-1 opacity-60">{tier.rewardRate * 100}% of your {amount.toLocaleString()} USDT deposit</p>
              </div>

              <div className="h-px bg-white/5 w-full"></div>

              <div>
                <p className="text-tertiary text-[10px] uppercase tracking-widest mb-2 font-medium">Estimated BTCY Tokens</p>
                <p className="text-4xl font-black text-primary leading-tight">
                  {btcyReward.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                </p>
                <p className="text-[10px] text-tertiary uppercase font-bold tracking-widest mt-1 opacity-60">Based on current BTCY price: $0.0034</p>
              </div>

              <div className="bg-[#202020] border border-white/10 rounded-2xl p-6 flex gap-3">
                <div className="text-[11px] text-tertiary leading-relaxed">
                  <span className="font-bold text-white uppercase mb-1 block">Note:</span>
                  Final BTCY amount will be calculated using the live market price at withdrawal/maturity. The estimate above may change based on BTCY price fluctuations.
                </div>
              </div>
            </div>
          </div>

          {/* Ecosystem Privileges Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Ecosystem Privileges</h3>
            </div>
            <div className="space-y-6 mb-8">
              {tier.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{benefit.title}</h4>
                    <p className="text-tertiary text-xs leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-primary/20 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-[12px] text-primary ">All benefits are currently active and will remain so until maturity or early exit</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Pool Timeline Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-4 mb-10">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Pool Timeline</h3>
            </div>
            <div className="space-y-12 relative pb-4">


              <div className="flex items-start gap-6 relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  <Clock className="w-5 h-5 text-white relative z-10" />
                </div>
                <div>
                  <p className="text-tertiary text-[11px]  mb-1 opacity-60">Pool Start Date</p>
                  <h4 className="text-xl font-bold text-white mb-1">{dates.start}</h4>
                  <p className="text-xs text-tertiary opacity-80">Benefits activated</p>
                </div>
              </div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  <ShieldCheck className="w-5 h-5 text-white relative z-10" />
                </div>
                <div>
                  <p className="text-tertiary text-[11px]  mb-1 opacity-60">Early Exit Eligible</p>
                  <h4 className="text-xl font-bold text-white mb-1">{dates.earlyExit}</h4>
                  <p className="text-xs text-tertiary opacity-80">After 50% of term ({tier.lockMonths * 15} days)</p>
                </div>
              </div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <Image src={OvalImage} alt="" className="absolute inset-0 w-full h-full object-contain" />
                  <TrendingUp className="w-5 h-5 text-white relative z-10" />
                </div>
                <div>
                  <p className="text-tertiary text-[11px]  mb-1 opacity-60">Maturity Date</p>
                  <h4 className="text-xl font-bold text-white mb-1">{dates.maturity}</h4>
                  <p className="text-xs text-tertiary opacity-80">Full reward unlocked</p>
                </div>
              </div>
            </div>
          </div>


          {/* Payment Information Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <CreditCard className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Payment Information</h3>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-tertiary text-[10px] uppercase tracking-widest font-bold mb-2">Payment Method</p>
                <h4 className="text-lg font-bold text-white">Trust Wallet</h4>
              </div>
              <div>
                <p className="text-tertiary text-[10px] uppercase tracking-widest font-bold mb-2">Transaction Hash</p>
                <div className="flex items-center gap-3 bg-[#202020] rounded-xl p-3 border border-white/5 group">
                  <span className="text-[10px] text-tertiary font-mono truncate">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1</span>
                  <ExternalLink className="w-4 h-4 text-tertiary group-hover:text-primary transition-colors flex-shrink-0 cursor-pointer" />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-tertiary text-[10px] uppercase tracking-widest font-bold mb-1">Payment Date</p>
                  <h4 className="text-lg font-bold text-white">{dates.start}</h4>
                </div>
                <div className="text-right">
                  <p className="text-tertiary text-[10px] uppercase tracking-widest font-bold mb-1">Confirmation Status</p>
                  <h4 className="text-lg font-bold text-primary italic tracking-tight">Confirmed</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Card */}
          <div className="bg-[#232323] rounded-3xl p-8 border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <History className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-white">Activity Log</h3>
            </div>
            <div className="space-y-0 relative">
              {[
                { title: "Pool Activated", desc: "All benefits enabled and pool period started", date: "Mar 18" },
                { title: "Payment Confirmed", desc: `Deposit of ${amount.toLocaleString()} USDT confirmed`, date: "Mar 18" },
                { title: "Pool Created", desc: `${tier.name} configuration completed`, date: "Mar 18" },
              ].map((activity, idx) => (
                <div key={idx} className="flex justify-between items-start py-6 border-b border-white/5 last:border-0 group cursor-default">
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{activity.title}</h4>
                    <p className="text-tertiary text-[11px] leading-relaxed max-w-[200px]">{activity.desc}</p>
                  </div>
                  <span className="text-tertiary text-[10px] font-medium bg-white/5 px-3 py-1 rounded-full uppercase tracking-tighter">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DisclaimerComponent />
    </div>
  );
}

export default function PoolDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <DetailsContent />
    </Suspense>
  );
}
