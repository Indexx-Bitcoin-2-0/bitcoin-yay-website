"use client";

import Image from "next/image";
import {
  Zap,
  Megaphone,
  Atom,
} from "lucide-react";
import React from "react";



import CustomButton2 from "@/components/CustomButton2";
import DisclaimerComponent from "@/components/DisclaimerComponent";


import ArrowRightButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import BitcoinArtWatermark from "@/assets/images/liquidity_pool/liquidity_pool_bg.png";
import PointButton from '@/assets/images/buttons/point-button.webp'
import whyChoose1 from '@/assets/images/liquidity_pool/why_choose_1.svg'
import whyChoose2 from '@/assets/images/liquidity_pool/why_choose_2.svg'
import whyChoose3 from '@/assets/images/liquidity_pool/why_choose_3.svg'
import whyChoose4 from '@/assets/images/liquidity_pool/why_choose_4.svg'
import buttonBorderActive from '@/assets/images/button-border-active.webp'
import electricIcon from '@/assets/images/liquidity_pool/electric_icon.svg'
import nuclearIcon from '@/assets/images/liquidity_pool/nuclear_icon.svg'
import turboIcon from '@/assets/images/liquidity_pool/turbo_icon.svg'
const PoolTierCard = ({
  icon: Icon,
  tier,
  amount,
  lockPeriod,
  reward,
  recommended = false
}: {
  icon: any,
  tier: string,
  amount: string,
  lockPeriod: string,
  reward: string,
  recommended?: boolean
}) => {

  return (
    <div className={`relative flex flex-col items-start p-8 rounded-3xl bg-[#252525] border-2 ${recommended ? 'border-primary' : 'border-white/10'} w-full max-w-[400px]`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Recommended
        </div>
      )}
      <Image src={Icon} alt="" className="w-12 h-12 text-primary mb-3" />
      <h3 className="text-2xl font-bold text-white mb-2">{tier}</h3>
      <div className="flex items-baseline gap-2 mb-8">
        <span className="text-4xl font-bold text-primary">${amount}</span>
        <span className="text-tertiary uppercase text-sm">USDT</span>
      </div>

      <div className="space-y-4 mb-10 w-full">
        <div className="flex items-center gap-3 text-tertiary">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
          <span>{lockPeriod} lock</span>
        </div>
        <div className="flex items-center gap-3 text-tertiary">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
          </div>
          <span>{reward} BTCY at maturity</span>
        </div>
        <div className="flex items-center gap-3 text-tertiary">
          <div className="w-5 h-5 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <span>Ecosystem privileges</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <CustomButton2
          image={PointButton}
          text="Select Tier"
          link="/btcy-liquidity-pool-vault/select-tier"
          imageStyling="w-24"
        />

      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start gap-6 p-8 rounded-3xl bg-[#252525] border border-white/5 h-full">
    <Image src={Icon} alt="" className="w-14 h-14" />
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-tertiary text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);


const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <div className="p-8 rounded-3xl bg-[#252525] border border-white/5 mb-6 group cursor-pointer transition-colors hover:border-primary/30">
      <h4 className="text-lg font-bold text-white mb-4 group-hover:text-primary transition-colors">{question}</h4>
      <p className="text-tertiary text-sm leading-relaxed">{answer}</p>
    </div>
  );
};

export default function LiquidityPoolVaultPage() {
  return (
    <div className="mx-auto mt-40 md:mt-40 px-4 md:px-20 xl:px-40 relative max-w-[2000px] overflow-hidden">


      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 pb-40">
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 top-[-15%]">
          <Image
            src={BitcoinArtWatermark}
            alt=""
            className="w-full max-w-4xl h-auto opacity-5"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            BTCY Liquidity Pool Vault
          </h1>
          <p className="text-lg md:text-xl text-tertiary mb-12 max-w-2xl mx-auto leading-relaxed">
            Lock USDT to support BTCY liquidity and unlock structured rewards.<br />
            Earn upto 50% BTCY at maturity plus exclusive ecosystem privileges.
          </p>

          <div className="flex flex-wrap justify-center gap-10 md:gap-20 mb-20 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-primary">50%</span>
              <span className="text-xs uppercase tracking-widest text-tertiary mt-2">BTCY Reward</span>
            </div>
            <div className="w-px h-16 bg-white/10 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-white">3-12</span>
              <span className="text-xs uppercase tracking-widest text-tertiary mt-2">Month Terms</span>
            </div>
            <div className="w-px h-16 bg-white/10 hidden md:block"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-white">$250+</span>
              <span className="text-xs uppercase tracking-widest text-tertiary mt-2">Min. Deposit</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <CustomButton2
              image={ArrowRightButtonImage}
              text="Create Pool"
              link="/btcy-liquidity-pool-vault/select-tier"
              imageStyling="w-32"
            />
          </div>
        </div>
      </section>

      {/* Pool Tiers Section */}
      <section className="py-20 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">Choose Your Pool Tier</h2>
        <p className="text-tertiary text-lg mb-16 text-center">Select the perfect pool tier for your investment strategy</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl justify-items-center">
          <PoolTierCard
            icon={electricIcon}
            tier="Starter Pool"
            amount="250"
            lockPeriod="3 months"
            reward="30%"
          />
          <PoolTierCard
            icon={turboIcon}
            tier="Growth Pool"
            amount="500"
            lockPeriod="6 months"
            reward="40%"
            recommended={true}
          />
          <PoolTierCard
            icon={nuclearIcon}
            tier="Founder Pool"
            amount="1000"
            lockPeriod="12 months"
            reward="50%"
          />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 md:py-40">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-20 text-center">Why Choose BTCY Pools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto px-4">
          <FeatureCard
            icon={whyChoose1}
            title="Secure Liquidity Support"
            description="Your USDT deposits directly support BTCY ecosystem liquidity and growth"
          />
          <FeatureCard
            icon={whyChoose2}
            title="Structured Rewards"
            description="Earn 30% BTCY rewards at maturity calculated at live market rates"
          />
          <FeatureCard
            icon={whyChoose4}
            title="Not a Yield Product"
            description="This is a liquidity support program, not traditional staking or yield farming"
          />
          <FeatureCard
            icon={whyChoose3}
            title="Ecosystem Privileges"
            description="Active benefits include Alchemy Priority, reduced Indexx trading fees, and premium mining tiers"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-tertiary text-lg">Simple three-step process to start earning</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 px-4">
          <div className="flex gap-8 group">
            <div className="flex-shrink-0 relative w-16 h-12 flex items-center justify-center">
              <Image
                src={buttonBorderActive}
                alt=""
                className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative z-10 text-white font-bold text-2xl">1</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Choose Your Pool Tier</h4>
              <p className="text-tertiary leading-relaxed">Select from Starter, Growth, or Founder pools based on your deposit amount and preferred lock duration</p>
            </div>
          </div>
          <div className="flex gap-8 group">
            <div className="flex-shrink-0 relative w-16 h-12 flex items-center justify-center">
              <Image
                src={buttonBorderActive}
                alt=""
                className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative z-10 text-white font-bold text-2xl">2</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Deposit USDT</h4>
              <p className="text-tertiary leading-relaxed">Lock your USDT for the selected term and immediately activate your ecosystem benefits</p>
            </div>
          </div>
          <div className="flex gap-8 group">
            <div className="flex-shrink-0 relative w-16 h-12 flex items-center justify-center">
              <Image
                src={buttonBorderActive}
                alt=""
                className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative z-10 text-white font-bold text-2xl">3</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Claim at Maturity</h4>
              <p className="text-tertiary leading-relaxed">Complete KYC and claim your 50% BTCY reward plus your original USDT deposit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20 md:py-40">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-20 text-center">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto px-4">
          <FAQItem
            question="What happens if I need to exit early?"
            answer="Early exit is allowed after 50% of your pool duration has passed. You'll receive 50% of your BTCY reward and forfeit the remaining 50%. All ecosystem benefits terminate immediately upon early exit."
          />
          <FAQItem
            question="How is my BTCY reward calculated?"
            answer="Your BTCY reward is always upto 50% of your USDT deposit value. The final amount of BTCY tokens is calculated using the live BTCY price at withdrawal/maturity."
          />
          <FAQItem
            question="When do I receive my ecosystem benefits?"
            answer="All ecosystem benefits (mining tier upgrades, Alchemy Priority, reduced trading fees) activate immediately upon successful deposit and remain active throughout your pool period."
          />
          <FAQItem
            question="Is KYC required?"
            answer="KYC verification is required at withdrawal time to claim your BTCY rewards and USDT deposit."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 mb-40">
        <div className="rounded-[40px] border-2 border-[#FF87284D] p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden group">
          {/* Subtle glow effect */}

          <h2 className="text-[40px] md:text-[48px] font-bold text-white mb-2 tracking-tight relative z-10">
            Ready to Get Started?
          </h2>
          <p className="text-[16px] md:text-[20px] text-tertiary mb-8 relative z-10 max-w-3xl mx-auto">
            Join the BTCY ecosystem and start earning structured rewards today
          </p>
          <div className="flex flex-col items-center relative z-10">
            <CustomButton2
              image={ArrowRightButtonImage}
              text="Create Your First Pool"
              link="/btcy-liquidity-pool-vault/select-tier"
              imageStyling="w-36"
            />
          </div>
        </div>
      </section>

      <DisclaimerComponent />
    </div>
  );
}
