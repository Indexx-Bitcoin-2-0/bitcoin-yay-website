"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import CustomButton2 from "@/components/CustomButton2";
import WalletIcon from '@/assets/images/alchemy/home/walletIcon.png';

const availableBalance = "250,000";

const claimDestinations = [
  {
    id: "tron",
    name: "Tron",
    description: "Decentralized wallet on Tron Network",
    recommended: "TronLink",
  },
  {
    id: "solana",
    name: "Solana",
    description: "Decentralized wallet on Solana Network",
    recommended: "Phantom",
  },
  {
    id: "indexx",
    name: "Indexx Asset Wallet",
    description: "Centralized exchange wallet",
  },
];

export default function ClaimPage() {
  const [selectedDestination, setSelectedDestination] = useState("tron");

  const handleClaim = () => {
    // Handle claim logic here
    console.log("Claiming tokens to:", selectedDestination);
  };

  return (
    <div className="min-h-screen bg-bg0 text-white">
      <div className="mx-auto max-w-3xl px-6 py-20 mt-40">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-xl md:text-xl font-bold text-white mb-4">
            Claim Your Tokens
          </h1>
          <p className="text-base md:text-base text-tertiary">
            Transform your mined Bitcoin-Yay Nuggets into real digital tokens
          </p>
        </div>

        {/* Available Balance */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base text-tertiary mb-3 md:mb-4">AVAILABLE BALANCE</p>
          <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">{availableBalance}</p>
          <p className="text-xl md:text-xl text-tertiary mt-2 md:mt-3">BTCY</p>
        </div>

        {/* Select Claim Destination */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-xl text-white mb-6 md:mb-8">
            Select Claim Destination
          </h2>
          <div className="space-y-4 md:space-y-5">
            {claimDestinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => setSelectedDestination(destination.id)}
                className={`relative p-5 md:p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedDestination === destination.id
                  ? "border-bg2"
                  : "border-bg2 hover:border-bg3"
                  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {destination.name}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-tertiary mb-1 md:mb-2">
                      {destination.description}
                    </p>
                    {destination.recommended && (
                      <p className="text-xs md:text-sm text-white">
                        Recommended: {destination.recommended}
                      </p>
                    )}
                  </div>
                  {selectedDestination === destination.id && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Tokens Button */}
        <div className="flex justify-center mb-6 md:mb-8">
          <CustomButton2
            text="Claim Tokens"
            image={WalletIcon}
            imageStyling="w-20 md:w-30"
            onClick={handleClaim}
          />
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-tertiary max-w-2xl mx-auto leading-relaxed">
            All claims are final and cannot be reversed. Gas fees may apply for decentralized wallets.
          </p>
        </div>
      </div>
    </div>
  );
}
