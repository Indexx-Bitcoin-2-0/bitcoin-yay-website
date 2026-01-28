"use client";

import Image from "next/image";

import CustomButton2 from "@/components/CustomButton2";

import QuantumMiningButtonImage from "@/assets/images/mining/quantum-mining-icon.webp";
import QuantumMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import BuyNowButtonImage from "@/assets/images/buttons/buy-now-button.webp"
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
const PowerMiningPage = () => {
  return (
    <div className="mx-auto mt-40 max-w-[1800px] px-4 md:px-10 xl:px-20">
      {/* Hero Section */}
      <div className="flex items-center justify-items-center gap-12">
        <div className="mt-10 md:mt-20 w-full flex flex-col justify-items-center items-center">
          <h1 className="text-[40px] md:text-7xl font-bold lg:leading-28">
            Quantum Mining
          </h1>
          <h2 className="text-[30px] md:text-4xl font-semibold">
            Purchase Plan
          </h2>

          <h3 className="mt-14 text-2xl md:text-3xl font-semibold max-w-3xl">
            Own BTCY — Before It Gets Listed
          </h3>

          <p className="mt-6 text-lg md:text-xl max-w-3xl text-center text-primary">
            No mining required.Buy BTCY directly at an early-stage price.
            <br />
            BTCY is a pre-listed digital asset connected with Indexx.ai
          </p>

          {/* Buy Now Button */}
          <div className="mt-10">
            <CustomButton2
              link="/quantum-mining"
              image={BellButtonImage}
              text="Buy Now"
            />

          </div>
        </div>


      </div>

      {/* Video Section */}
      <div className="flex items-center justify-center my-40 md:my-60 max-w-7xl mx-auto aspect-video">
        <iframe
          src="https://www.youtube.com/embed/bVbsQwh_GCI"
          title="Quantum Mining"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-2xl shadow-2xl"
        ></iframe>
      </div>

      {/* Quantum Mining Pro (2026 Edition) Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left: Product Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src={NuclearMiningArtImage1}
              alt="Quantum Mining Pro"
              className="w-80 md:w-96 lg:w-120 xl:w-140"
            />
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2">
            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff8728"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="text-gray-400 text-lg ml-2">(1120+ Reviews)</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Quantum Mining Pro (2026 Edition)
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
              Quantum Mining is for people who don't want to tap and mine every day. Instead of slowly collecting nuggets, you can buy BTCY tokens directly in the pre-sale and lock in your position immediately. BTCY purchased through Quantum Mining represents a pre-sale of tokens, not mined nuggets, and the BTCY token is not currently listed on any exchange. Access to liquidity, trading, or cashing out is not guaranteed and depends on future listings, market demand, regulatory approvals, and technical implementation.
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff8728"
                  className="w-6 h-6 mt-1 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg md:text-xl">Skip Daily Mining – Get BTCY Instantly</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff8728"
                  className="w-6 h-6 mt-1 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg md:text-xl">Buy While the Price Is Low</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff8728"
                  className="w-6 h-6 mt-1 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg md:text-xl">Aligned with Bitcoin – Pegged Ratio</span>
              </div>
            </div>

            {/* Holiday Special Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-[0.5px] bg-primary"></div>
              <span className="text-primary text-lg font-semibold">Holiday Special</span>
              <div className="flex-1 h-[0.5px] bg-primary"></div>
            </div>

            {/* Bonus Banner */}
            <div className="border border-bg2 rounded-lg p-6 mb-8">
              <p className="text-primary text-2xl md:text-3xl font-bold text-center">
                Buy BTCY & Get 10% Bonus
              </p>
            </div>

            {/* Buy Now Button */}
            <div className="flex justify-center lg:justify-start">
              <CustomButton2
                link="/quantum-mining"
                image={BellButtonImage}
                text="Buy Now"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Alchemy Stages Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px] mb-40">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-center mb-16">
          Alchemy Stages
        </h2>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* Stage 1 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              1. Alchemy Gateway
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-300">
              <li>Required First Checkpoint.</li>
              <li>This Serves As The Entry Ritual For Activating BTCY In The External Economy.</li>
            </ul>
          </div>

          {/* Stage 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              2. Alchemy Trade
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-300">
              <li>
                Unlocked Only After <span className="font-semibold text-white">Gateway Is Completed</span>.
              </li>
              <li>Allows The User To Sell BTCY, Buy BTCY, Convert BTCY To Other Assets Or Tokens.</li>
            </ul>
          </div>

          {/* Stage 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              3. Shop And Lotto
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg text-gray-300">
              <li>
                Unlocked Once The User <span className="font-semibold text-white">Passes Through The Gateway And Trade</span>.
              </li>
              <li>Enables BTCY-Based Purchases And Lottery Participation.</li>
            </ul>
          </div>

          <p className="text-base md:text-lg text-gray-300 mt-4">
            This Flow Ensures Controlled Token Circulation And Increases Platform Engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PowerMiningPage;

