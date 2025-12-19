import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import HandImage from "@/assets/images/btcy-index-relationship/hands.webp";

import IndexxAiLogo from "@/assets/images/indexx.ai.svg";
import BitcoinYayLogo from "@/assets/images/main-logo.svg";


import CardImage1 from "@/assets/images/home/card-1.webp";
import CardImage2 from "@/assets/images/home/card-2.webp";
import CardImage3 from "@/assets/images/home/card-3.webp";
import CardImage4 from "@/assets/images/home/card-4.webp";
import CartImg from '@/assets/images/cartImg.png'

import CustomButton2 from "@/components/CustomButton2";
import UpArrow from '@/assets/images/UpArrow.png'
import IndexxLogo from '@/assets/images/indexx.ai.svg'
export const metadata = {
  title: "BTCY & Indexx.ai Relationship - Complete Crypto Ecosystem",
  description:
    "Discover how bitcoin-yay (BTCY) integrates with the Indexx.ai ecosystem. Mine BTCY, shop with rewards, trade on exchanges, and learn through academy courses in one complete platform.",
  openGraph: {
    title: "BTCY & Indexx.ai Relationship - Complete Crypto Ecosystem",
    description:
      "Discover how bitcoin-yay (BTCY) integrates with the Indexx.ai ecosystem. Mine BTCY, shop with rewards, trade on exchanges, and learn through academy courses in one complete platform.",
  },
};

const CustomCard = ({
  image,
  title,
  desc,
}: {
  image: StaticImageData;
  title: string;
  desc: string;
}) => {
  return (
    <div className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] flex flex-col items-center justify-center">
      <div className="bg-bg1 rounded-2xl">
        <Image src={image} alt={title} />
      </div>
      <p className="text-tertiary text-lg my-10 text-center">
        <span className="text-primary font-semibold ">{title}</span>
        <br />
        {desc}
      </p>
    </div>
  );
};

export default function BtcyIndexRelationship() {
  return (
    <div className="container mx-auto mt-40">
      <div className="h-full relative flex flex-col md:flex-row justify-between items-center text-center md:text-left  gap-6 md:gap-10">
        <div className="w-full md:w-1/2 z-10">

          <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4">
            The Bitcoin Yay Ecosystem Runs on Indexx.ai

          </h3>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl hidden md:block max-w-2xl mt-4 leading-relaxed">
            Mining, storage, utilities, and future trading — all connected through one platform
          </p>

          {/* Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-center  md:justify-start gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24 mt-20">
            <Image
              src={IndexxAiLogo}
              alt="Indexx.ai Logo"
              className="w-48 md:w-56 lg:w-64 h-auto"
            />
            <Image
              src={BitcoinYayLogo}
              alt="Bitcoin-Yay Logo"
              className="w-48 md:w-56 lg:w-64 h-auto"
            />
          </div>

        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
          <Image
            src={HandImage}
            alt="Hands Illustration"
            className="w-40 md:w-60 lg:w-80 xl:w-100 2xl:w-100 h-auto object-contain opacity-80 md:opacity-100"
          />
        </div>
      </div>

      {/* Indexx.ai — Official Home of BTCY Section */}
      <div className="relative mt-20 md:mt-30 px-4 md:px-8 lg:px-20 xl:px-40 py-20 md:py-32">
        {/* Background subtle coin graphics - optional overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            {/* Placeholder for coin stack graphic - can be added if asset is available */}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-2xl md:text-6xl font-bold mb-6 md:mb-8">
            <span className="text-primary">What Is Indexx.ai?
            </span>
          </h1>

          {/* Subtitle/Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 md:mb-10 font-medium">
            Indexx.ai — The Infrastructure Behind Bitcoin Yay
          </p>

          {/* Descriptive Paragraph */}
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-12 md:mb-16 leading-relaxed max-w-4xl mx-auto">
            Indexx.ai is the official ecosystem platform for Bitcoin Yay.
            While Bitcoin Yay focuses on free, accessible BTCY mining, Indexx.ai powers everything that happens after mining — including wallets, utilities, rewards, and future trading.

          </p>



          {/* Features Section - Numbered List */}
          <div className="text-left max-w-3xl mx-auto space-y-10 md:space-y-12 lg:space-y-14 relative mt-30">
            <h1 className="text-2xl md:text-6xl font-bold mb-6 md:mb-8 text-center">
              <span className="text-primary">How Bitcoin Yay & Indexx.ai Work Together
              </span>
            </h1>

            {/* Subtitle/Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 md:mb-10 font-medium text-center">
              Indexx.ai — The Infrastructure Behind Bitcoin Yay

            </p>
            {/* Feature 1 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                1. Mine BTCY on Bitcoin Yay
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  Free mining for everyone.

                </li>
                <li className="list-disc">
                  No upfront investment required.

                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                2. Withdraw at 10,000 BTCY

              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  BTCY moves from the app to your Indexx Asset Wallet.
                </li>

              </ul>
            </div>

            {/* Feature 3 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                3. Use BTCY Inside the Ecosystem

              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">  Play Lotto</li>
                <li className="list-disc">  Access Shop</li>
                <li className="list-disc">Participate in ecosystem features
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                4. Convert via Alchemy (When Eligible)

              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  BTCY can be converted into tradable form once Alchemy conditions are met
                </li>

              </ul>
            </div>

          </div>
        </div>

        <div className="h-full relative flex flex-col md:flex-row justify-between items-center text-center md:text-left  gap-6 md:gap-10 mt-40">
          <div className="w-full md:w-1/2 z-10">

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                Why Indexx.ai Is Required
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  Secure asset custody
                </li>
                <li className="list-disc">
                  Unified ecosystem utilities
                </li>

                <li className="list-disc">
                  Controlled token supply and stability

                </li>
                <li className="list-disc">
                  Compliance-ready for future expansion

                </li>
                <li className="list-disc">
                  Scalable infrastructure for millions of users


                </li>


              </ul>
            </div>

          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
            <Image
              src={CartImg}
              alt="Hands Illustration"
              className="w-40 md:w-60 lg:w-80 xl:w-100 2xl:w-100 h-auto object-contain opacity-80 md:opacity-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-start justify-between mx-10 mt-30">
          <CustomCard
            image={CardImage1}
            title="Lotto"
            desc="Skill & chance-based games using BTCY"
          />
          <CustomCard
            image={CardImage2}
            title="Shop"
            desc="Skill & chance-based games using BTCY"
          />
          <CustomCard
            image={CardImage3}
            title="Alchemy"
            desc="Controlled conversion from mined BTCY to tradable BTCY"
          />
          <CustomCard
            image={CardImage4}
            title="Future Utilities"
            desc="Additional features will be launched directly on Indexx.ai"
          />
        </div>
      </div>

    </div>
  );
}
