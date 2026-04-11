"use client";

import { useState } from "react";
import Image from "next/image";

import CustomButton2 from "@/components/CustomButton2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Placeholders for the images to match the screenshot
// Given the repo structure, utilizing some existing assets
import HeroArtImage from "@/assets/images/sell_Art.svg";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
import HowItWorksArt from "@/assets/images/quantum-mining/art-4.webp";
import ArtImage5 from "@/assets/images/quantum-mining/art-5.webp";
import KycVerificationPopup from "./KycVerificationPopup";
import SellStatusPopup from "./SellStatusPopup";
import TransactionFailedPopup from "./TransactionFailedPopup";

export default function SellBtcyPage() {
  const [btcyAmount, setBtcyAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [isKycPopupOpen, setIsKycPopupOpen] = useState(false);
  const [isSellStatusPopupOpen, setIsSellStatusPopupOpen] = useState(false);
  const [isTransactionFailedPopupOpen, setIsTransactionFailedPopupOpen] = useState(false);

  // Mock state for user KYC status
  const [isKycCompleted, setIsKycCompleted] = useState(true);

  const handleSellRequest = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Sell requested:", { btcyAmount, usdtAddress });

    // Logic to demonstrate Error popup
    if (Number(btcyAmount) < 100) {
      setIsTransactionFailedPopupOpen(true);
      return;
    }

    if (isKycCompleted) {
      setIsSellStatusPopupOpen(true);
    } else {
      setIsKycPopupOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-3 w-full lg:w-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-10">
              Sell BTCY — Convert<br />to USDT Instantly
            </h1>
            <p className="text-xl md:text-2xl text-[#EAEAEA] mb-8 md:mb-10 max-w-xl">
              Add your USDT wallet address on the BNB smart chain.
            </p>
            <p className="text-lg md:text-xl text-primary font-medium">
              Only verified users can sell BTCY.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="flex-2 w-full lg:w-auto flex items-center justify-center lg:justify-end">
            <Image
              src={HeroArtImage}
              alt="Falling BTCY Coins"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-40 border-0 md:border-1 border-bg2 rounded-2xl p-8 md:p-12 max-w-5xl mx-3  md:mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Sell Request Form
          </h2>
          <p className="text-xl md:text-2xl text-white font-medium mb-4">
            1 BTCY = $0.1
          </p>
          <p className="text-lg md:text-xl text-primary font-bold">
            Your BTCY Balance: 25,450 BTCY Token
          </p>
        </div>

        <form onSubmit={handleSellRequest} className="mx-auto flex flex-col gap-8 md:gap-10">
          {/* BTCY Amount Field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="btcyAmount" className="text-sm md:text-base text-gray-300 font-medium ml-2">
              BTCY Amount
            </label>
            <input
              id="btcyAmount"
              type="number"
              value={btcyAmount}
              onChange={(e) => setBtcyAmount(e.target.value)}
              placeholder="Enter the amount of BTCY you want to sell from your available balance"
              className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg focus:outline-none focus:border-primary hover:border-primary "
            />
            <div className="flex flex-wrap items-center gap-4 ml-2 mt-1">
              <span className="text-sm text-primary">Available: 25,450 BTCY</span>
              <span className="text-sm text-primary">Minimum: 100 BTCY</span>
            </div>
          </div>

          {/* USDT Deposit Address Field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="usdtAddress" className="text-sm md:text-base text-gray-300 font-medium ml-2">
              USDT Deposit Address
            </label>
            <input
              id="usdtAddress"
              type="text"
              value={usdtAddress}
              onChange={(e) => setUsdtAddress(e.target.value)}
              placeholder="Paste your USDT deposit address"
              className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg focus:outline-none focus:border-primary hover:border-primary "
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center justify-center mt-6">
            <CustomButton2
              image={CartButtonImage}
              text="Sell Now"
              onClick={() => {
                handleSellRequest();
              }}
              imageStyling="w-40"
            />
            <p className="text-sm md:text-base text-gray-400 text-center max-w-xl leading-relaxed">
              You need to complete KYC before you can sell BTCY. This helps keep your account secure and allows withdrawals.
            </p>
          </div>
        </form>

      </div>

      {/* How it works Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          {/* Left Illustration */}
          <div className="flex-1 w-full lg:w-auto flex items-center justify-center">
            <Image
              src={HowItWorksArt}
              alt="Hand holding Bitcoin"
              className="w-full max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right Content List */}
          <div className="flex-1 w-full lg:w-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-12">
              HOW IT WORKS
            </h2>

            <div className="flex flex-col gap-8 md:gap-10">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                1. Choose how much BTCY you want to sell.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                2. Copy your Binance USDT deposit address and paste it.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                3. Complete KYC Verification is required before Selling.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                4. Confirm your details and submit your sell request.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                5. USDT will be sent after processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[1200px] mb-40">
        <div className="flex items-center justify-center gap-6 mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center">
            FAQ
          </h2>
          <Image
            src={ArtImage5}
            alt="Gnome carrying Bitcoin"
            className="w-24 md:w-32 h-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full flex flex-col gap-4 md:gap-6">
            <AccordionItem
              value="item-1"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                Why is my sell button disabled?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                You need to complete KYC and enter valid details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                Where do I get my USDT address?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                Open Binance → USDT → Deposit → Copy address.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                How long does it take?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                Processing time may vary.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                Can I cancel after submitting?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                No, once submitted it cannot be reversed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <KycVerificationPopup
        isOpen={isKycPopupOpen}
        onClose={() => setIsKycPopupOpen(false)}
      />

      <SellStatusPopup
        isOpen={isSellStatusPopupOpen}
        onClose={() => setIsSellStatusPopupOpen(false)}
        usdtAmount={btcyAmount ? Number(btcyAmount) * 0.1 : 14.26562}
      />

      <TransactionFailedPopup
        isOpen={isTransactionFailedPopupOpen}
        onClose={() => setIsTransactionFailedPopupOpen(false)}
      />
    </div >
  );
}
