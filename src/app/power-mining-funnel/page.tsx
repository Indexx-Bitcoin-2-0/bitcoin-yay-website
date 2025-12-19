"use client";

import Image from "next/image";
import Link from "next/link";
import CustomButton2 from "@/components/CustomButton2";
import StarsRating from "@/components/StarsRating";
import DisclaimerComponent from "@/components/DisclaimerComponent";

// Import images - using the copied images from assets
import NuclearArtImage from "@/assets/images/power-mining-funnel/NuclearArt.png";
import CoinsArtImage from "@/assets/images/coin-bg.png";
import HeroCoinsImage from "@/assets/images/power-mining-funnel/HeroCoins.png";

import CardImage1 from "@/assets/images/home/card-1.webp";
import CardImage2 from "@/assets/images/home/card-2.webp";
import CardImage3 from "@/assets/images/home/card-3.webp";

import CartButtonImage from "@/assets/images/UpgradeNowSalesPage.svg";
import NuclearMiningButtonImage from "@/assets/images/mining/nuclear-icon.webp";
import logo from "@/assets/images/main-logo.svg";

export default function PowerMiningFunnelPage() {
  // Logo component
  const Logo = () => (
    <div className="">
      <Link href="/" className="">
        <Image
          src={logo}
          alt="logo"
          className="w-[165px] md:w-[300px] hover:scale-105 transition-transform duration-300"
        />
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      {/* Logo Section */}
      <div className="flex items-center justify-center mt-20 md:mt-20">
        <Logo />
      </div>

      {/* Product Detail Section - Nuclear Mining */}
      <section className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-20 xl:px-40 py-20 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <Image
                src={NuclearArtImage}
                alt="Nuclear Mining Illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-sm md:text-base text-gray-400">Power Mining Subscription</p>

            <div className="flex items-center gap-3">
              <Image
                src={NuclearMiningButtonImage}
                alt="Nuclear Mining Icon"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Nuclear Mining
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <StarsRating rating={5} />
              <span className="text-sm md:text-base text-gray-400">(1120+ Reviews)</span>
            </div>

            <div className="space-y-2">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                $180 / month  <span className="text-base md:text-lg text-gray-400">(~13.5 BTCY / hour)</span>
              </p>

            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">

                <p className="text-base md:text-lg text-white">Maximum power</p>
              </div>
              <div className="flex items-center gap-3">

                <p className="text-base md:text-lg text-white">Fastest progress</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-bg2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-bold text-primary">9x</span>
                <span className="text-lg md:text-xl text-white">Base Rate Mining</span>
              </div>
              <div className="md:px-4">
                <span className="text-lg md:text-xl font-semibold text-primary">
                  13.5 BTCY/hour
                </span>
              </div>
            </div>

            <div className="pt-6">
              <CustomButton2
                image={CartButtonImage}
                text="Add to Cart"
                link="/mining/nuclear-mining"
                imageStyling="w-16 h-16 md:w-20 md:h-20"
                textMaxWidth="150px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section - Snatch Mining vs Nuclear Mining */}
      <section className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-20 xl:px-40 py-20 relative">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center mb-12 md:mb-16">
          Differentiate between Snatch Mining and Nuclear Mining
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
          {/* Left: Free Mining (Snatch Mining) */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              1. Free Mining (Snatch Mining) – 1.5 BTCY/hour
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 1: <span className="text-white">Total BTCY in 30 days</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  Total BTCY = 1.5 × 720 = 1080 BTCY
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 2: <span className="text-white">Dollar Equivalent</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  1080 × 0.10 = $108
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 3: <span className="text-white">Bitcoin Equivalent</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  Total BTC = 1080 × 0.000001 = 0.00108 BTC
                </p>
              </div>
            </div>
          </div>

          {/* Right: 9x Base Rate Mining (Nuclear Mining) */}
          <div className="flex-1  p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              2. 9× Base Rate Mining – 13.5 BTCY/hour
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 1: <span className="text-white">Hourly BTCY</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  1.5 × 9 = 13.5 BTCY/hour
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 2: <span className="text-white">Total BTCY in 30 days</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  13.5 × 720 = 9720 BTCY
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 3: <span className="text-white">Dollar Equivalent</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  9720 × 0.10 = $972
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                  Step 4: <span className="text-white">Bitcoin Equivalent</span>
                </h4>
                <p className="text-base md:text-lg text-white">
                  9720 × 0.000001 = 0.00972 BTC
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Bitcoin Coins (subtle) */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
            {/* Bitcoin coins background - can be added if image available */}
            <Image
              src={CoinsArtImage}
              alt="Coins Art"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Why Power Mining Section */}
      <section className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-20 xl:px-40 py-20">
        <h2 className="text-3xl md:text-[60px] font-bold text-primary text-center mb-12 md:mb-16">
          Why Power Mining?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* No Mining Required */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage1}
              alt="No Mining Required"
              className="w-full max-w-xs h-100 object-contain mb-6"
            />
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-4">
              Faster Mining Speed
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              Earn more BTCY per hour with boosted power.
            </p>
          </div>

          {/* Indexx.ai Asset Wallet */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage2}
              alt="Indexx.ai Asset Wallet"
              className="w-full max-w-xs h-100 object-contain mb-6"
            />
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-4">
              24 Hr Auto Mining

            </h3>
            <p className="text-base md:text-lg text-gray-300">
              No need to restart mining every 6 hours.

            </p>
          </div>

          {/* Buy at Low Price */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage3}
              alt="Buy at Low Price"
              className="w-full max-w-xs h-100 object-contain mb-6"
            />
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mb-4">
              Fewer Ads
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              Clean experience with priority access.

            </p>
          </div>
        </div>
      </section>

      {/* How Power Mining Works & Safe, Secure & Verified Section */}
      <section className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-20 xl:px-40 py-20">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-20 text-center">
          {/* How Power Mining Works */}
          <div>
            <h2 className="text-3xl md:text-[60px] font-bold text-primary mb-8 md:mb-10">
              How Power Mining Works
            </h2>
            <ol className="space-y-4 md:space-y-6 pl-6 flex flex-col items-start max-w-sm mx-auto">
              <li className="flex items-start gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary flex-shrink-0">
                  1.
                </span>
                <p className="text-lg md:text-xl text-white pt-1">
                  Download Bitcoin-YAY App
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary flex-shrink-0">
                  2.
                </span>
                <p className="text-lg md:text-xl text-white pt-1">
                  Activate Mining Power
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary flex-shrink-0">
                  3.
                </span>
                <p className="text-lg md:text-xl text-white pt-1">
                  Earn BTCY Automatically
                </p>
              </li>
            </ol>
          </div>

          {/* Safe, Secure & Verified */}
          <div>
            <h2 className="text-3xl md:text-[60px] font-bold text-primary mb-8 md:mb-10">
              Safe, Secure & Verified
            </h2>
            <ul className="space-y-4 md:space-y-6 pl-6 flex flex-col items-start max-w-sm mx-auto">
              <li className="flex items-start gap-4">
                <span className="text-xl flex-shrink-0 mt-1">•</span>
                <p className="text-lg md:text-xl text-white">
                  Available on Google Play & App Store
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className=" text-xl flex-shrink-0 mt-1">•</span>
                <p className="text-lg md:text-xl text-white">
                  Wallet linked with Indexx.ai
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className=" text-xl flex-shrink-0 mt-1">•</span>
                <p className="text-lg md:text-xl text-white">
                  Secure mining ecosystem
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className=" text-xl flex-shrink-0 mt-1">•</span>
                <p className="text-lg md:text-xl text-white">
                  Transparent utility model
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hero Section - Upgrade Today */}
      <section className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-20 xl:px-40 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text and CTA */}
          <div className="flex-3 w-full lg:w-auto">
            <h1 className="text-3xl md:text-[60px] font-bold text-primary mb-6 md:mb-8">
              Upgrade Today. Mine Faster  Tomorrow.
            </h1>
            <div className="flex flex-col items-start gap-4 mt-8">
              <CustomButton2
                image={CartButtonImage}
                text="Buy Subscription Now"
                link="/mining/nuclear-mining"
                imageStyling="w-20 h-20 md:w-24 md:h-24"
                textMaxWidth="200px"
              />
            </div>
          </div>

          {/* Right: Coins Illustration */}
          <div className="flex-2 w-full flex items-center justify-center lg:justify-end">
            <div className="w-full">
              <Image
                src={HeroCoinsImage}
                alt="BTCY Coins"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-20 xl:px-40 py-20">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
            Disclaimer
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Bitcoin Yay mining rewards you with in-app &quot;nuggets,&quot; not direct
            cryptocurrency. Nuggets are a loyalty/reward balance inside the app that
            can later be converted into BTCY tokens once Alchemy and token conversion
            features are available, and when/if BTCY is listed or tradable on supported
            platforms. Listing, liquidity, and the future value of BTCY tokens are not
            guaranteed, can change at any time, and may be zero. Mining and Power Mining
            do <strong>not represent an investment product</strong>, do not guarantee
            profit, and should not be treated as financial advice. Always do your own
            research and only participate if you understand the risks of crypto and
            digital assets.
          </p>
        </div>
      </section>


    </div>
  );
}
