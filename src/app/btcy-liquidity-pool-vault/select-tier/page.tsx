"use client";

import {
  Zap,
  Megaphone,
  Atom,
  Check,
} from "lucide-react";
import React from "react";


import CustomButton2 from "@/components/CustomButton2";
import DisclaimerComponent from "@/components/DisclaimerComponent";

import PointButton from '@/assets/images/buttons/point-button.webp'
import electricIcon from '@/assets/images/liquidity_pool/electric_icon.svg'
import nuclearIcon from '@/assets/images/liquidity_pool/nuclear_icon.svg'
import turboIcon from '@/assets/images/liquidity_pool/turbo_icon.svg'
import Image from "next/image";

const SelectionCard = ({
  icon: Icon,
  tier,
  slug,
  amount,
  details,
  recommended = false
}: {
  icon: any,
  tier: string,
  slug: string,
  amount: string,
  details: string[],
  recommended?: boolean
}) => {

  return (
    <div className={`relative flex flex-col items-start p-8 rounded-3xl bg-[#1E1E1E] border-2 ${recommended ? 'border-primary shadow-[0_0_30px_rgba(255,135,40,0.1)]' : 'border-white/5'} w-full transition-all hover:border-primary/40`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest z-20 shadow-lg">
          Recommended
        </div>
      )}
      <Image src={Icon} alt="" className="w-12 h-12 text-primary mb-3" />

      <h3 className="text-3xl font-bold text-white mb-2">{tier}</h3>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-primary">${amount}+</span>
      </div>
      <p className="text-tertiary text-sm mb-8">minimum USDT deposit</p>

      <div className="space-y-4 mb-10 w-full flex-grow">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span>{detail}</span>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col items-center mt-auto">
        <CustomButton2
          image={PointButton}
          text={`Select ${tier.split(' ')[0]} Pool`}
          link={`/btcy-liquidity-pool-vault/calculator?tier=${slug}`}
          imageStyling="w-24"
        />

      </div>
    </div>
  );
};

export default function SelectTierPage() {
  const tiers = [
    {
      icon: electricIcon,
      tier: "Starter Pool",
      slug: "starter",
      amount: "250",
      details: [
        "Minimum 250 USDT deposit",
        "3-month lock period",
        "30% BTCY reward at maturity",
        "Ecosystem privileges"
      ]
    },
    {
      icon: turboIcon,
      tier: "Growth Pool",
      slug: "growth",
      amount: "500",
      details: [
        "Minimum 500 USDT deposit",
        "6-month lock period",
        "40% BTCY reward at maturity",
        "Ecosystem privileges"
      ],
      recommended: true
    },
    {
      icon: nuclearIcon,
      tier: "Founder Pool",
      slug: "founder",
      amount: "1000",
      details: [
        "Minimum 1,000 USDT deposit",
        "12-month lock period",
        "50% BTCY reward at maturity",
        "Ecosystem privileges"
      ]
    }

  ];

  const comparisonData = [
    { feature: "BTCY Reward", starter: "30%", growth: "40%", founder: "50%", highlight: true },
    { feature: "Minimum Deposit", starter: "250 USDT", growth: "500 USDT", founder: "1,000 USDT" },
    { feature: "Lock Duration", starter: "3 months", growth: "6 months", founder: "12 months" },
    { feature: "Early Exit Eligible After", starter: "45 days", growth: "90 days", founder: "182 days" },
    { feature: "Ad-Free Experience", starter: true, growth: true, founder: true },
    { feature: "Alchemy Priority", starter: true, growth: true, founder: true },
    { feature: "Reduced Trading Fees", starter: true, growth: true, founder: true },
    { feature: "Mining Tier", starter: "Electric 3x", growth: "Turbo 6x", founder: "Nuclear 9x" },
  ];

  const renderValue = (value: string | number | boolean) => {
    if (typeof value === "boolean") {
      return value ? <Check className="w-5 h-5 text-primary mx-auto" /> : null;
    }
    return value;
  };

  return (
    <div className="mx-auto mt-40 md:mt-40 px-4 md:px-20 xl:px-40 relative max-w-[2000px] mb-40">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Select Your Pool Tier</h1>
        <p className="text-tertiary text-xl">Choose the pool tier that best fits your investment goals</p>
      </div>

      {/* Tier Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-32 max-w-7xl mx-auto">
        {tiers.map((tier, idx) => (
          <SelectionCard key={idx} {...tier} />
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="rounded-[40px] bg-[#1E1E1E] border border-white/5 overflow-hidden">
          <div className="p-10 border-b border-white/5">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Detailed Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-8 text-tertiary font-medium">Feature</th>
                  <th className="p-8 text-white font-bold text-center">Starter Pool</th>
                  <th className="p-8 text-white font-bold text-center">Growth Pool</th>
                  <th className="p-8 text-white font-bold text-center">Founder Pool</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="p-8 text-white font-medium">{row.feature}</td>
                    <td className={`p-8 text-center ${row.highlight ? 'text-primary font-bold' : 'text-gray-300'}`}>
                      {renderValue(row.starter)}
                    </td>
                    <td className={`p-8 text-center ${row.highlight ? 'text-primary font-bold' : 'text-gray-300'}`}>
                      {renderValue(row.growth)}
                    </td>
                    <td className={`p-8 text-center ${row.highlight ? 'text-primary font-bold' : 'text-gray-300'}`}>
                      {renderValue(row.founder)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Important Information Section */}
      <div className="max-w-7xl mx-auto mb-40">
        <div className="rounded-3xl border border-white/10 p-10 bg-[#1E1E1E]/50">
          <h3 className="text-2xl font-bold text-white mb-6">Important Information</h3>
          <ul className="space-y-4 list-disc list-inside text-tertiary">
            <li>All BTCY rewards are calculated using the live BTCY price at withdrawal/maturity</li>
            <li>No BTCY is released during the active pool period</li>
            <li>Early exit forfeits 50% of BTCY reward and immediately terminates all ecosystem benefits</li>
            <li>KYC verification is required at withdrawal</li>
            <li>USDT remains locked until maturity or eligible early exit</li>
          </ul>
        </div>
      </div>

      <DisclaimerComponent />
    </div>
  );
}
