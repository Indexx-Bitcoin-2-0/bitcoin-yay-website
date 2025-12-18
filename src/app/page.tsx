"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import BenefitCard from "@/components/BenefitCard";
import HeroComponent from "@/components/HeroComponent";

import IndexxLogo1 from "@/assets/images/indexx-logo-1.svg";
import IndexxAiLogo from "@/assets/images/indexx.ai.svg";
import BitcoinYayLogo from "@/assets/images/main-logo.svg";
import DownloadLogo from "../assets/images/download-button.svg";
import AppleLogo from "@/assets/images/home/apple-logo.svg";
import PlaystoreLogo from "@/assets/images/home/playstore-logo.svg";

import PhoneImage1 from "../assets/images/home/phone-1.svg";
import PhoneImage2 from "../assets/images/home/phone-2.svg";
import PhoneImage3 from "../assets/images/home/phone-3.svg";
import PhoneImage4 from "../assets/images/home/phone-4.webp";

import AppStoreQR from "@/assets/images/apple-qr.webp";
import PlayStoreQR from "@/assets/images/playstore-qr.webp";

import BenefitLogo1 from "../assets/images/home/benefits/1.svg";
import BenefitLogo2 from "../assets/images/home/benefits/2.svg";
import BenefitLogo3 from "../assets/images/home/benefits/3.svg";
import BenefitLogo4 from "../assets/images/home/benefits/4.svg";

import CardImage1 from "@/assets/images/home/card-1.webp";
import CardImage2 from "@/assets/images/home/card-2.webp";
import CardImage3 from "@/assets/images/home/card-3.webp";
import CardImage4 from "@/assets/images/home/card-4.webp";

import GopherImage1 from "@/assets/images/home/gophers/gopher-1.webp";
import GopherImage2 from "@/assets/images/home/gophers/gopher-2.webp";
import GopherImage3 from "@/assets/images/home/gophers/gopher-3.webp";
import GopherImage4 from "@/assets/images/home/gophers/gopher-4.webp";
import GopherImage5 from "@/assets/images/home/gophers/gopher-5.webp";
import GopherImage6 from "@/assets/images/home/gophers/gopher-6.webp";

// import BirthdayBanner from "@/assets/images/home/airdrop-1-aug-banner-desktop.webp";
// import BirthdayBannerTablet from "@/assets/images/home/airdrop-1-aug-banner-tablet.webp";
// import BirthdayBannerMobile from "@/assets/images/home/airdrop-1-aug-banner-mobile.webp";
// import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
// import ApplestoreDownloadButton from "@/assets/images/buttons/get-on-applestore-button.webp";
// import PlaystoreDownloadButton from "@/assets/images/buttons/get-on-playstore-button.webp";

import FreeMiningButtonImage from "@/assets/images/mining/free-mining-icon.webp";
import PowerMiningButtonImage from "@/assets/images/mining/power-mining-icon.webp";
import QuantumMiningButtonImage from "@/assets/images/mining/quantum-mining-icon.webp";

import ElectricMiningButtonImage from "@/assets/images/mining/electric-icon.webp";
import TurbineMiningButtonImage from "@/assets/images/mining/turbo-icon.webp";
import NuclearMiningButtonImage from "@/assets/images/mining/nuclear-icon.webp";

import bgArtImage1 from "../assets/images/bitcoin-art-2.png";
import BitcoinArtWatermark from "@/assets/images/coin-bg.png";

import ArtImage1 from "@/assets/images/home/art-1.svg";
import ArtImage2 from "@/assets/images/home/art-2.svg";
import ArtImage3 from "@/assets/images/home/art-3.svg";

import DollarButtonImage from "@/assets/images/buttons/dollar-button.webp";
import InfoButtonImage from "@/assets/images/buttons/info-button.webp";

import UserReviewCards from "@/components/UserReviewCards";
import DisclaimerComponent from "@/components/DisclaimerComponent";
import CustomButton2 from "@/components/CustomButton2";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <p className="text-tertiary text-lg my-10">
        <span className="text-primary font-semibold">{title}</span>
        {desc}
      </p>
    </div>
  );
};

const GopherCard = ({
  image,
  title,
  desc,
}: {
  image: StaticImageData;
  title: string;
  desc: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Image src={image} alt={title} className="w-80 md:w-100" />
      <div className="mt-10">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-lg font-light text-bg3 mt-4">{desc}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [btcyPrice, setBtcyPrice] = useState<number | null>(null);

  const [isPowerMiningActive, setIsPowerMiningActive] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin",
              vs_currencies: "usd",
            },
          }
        );
        const btc = res.data.bitcoin.usd;
        const btcy = btc / 1_000_000;
        setBtcPrice(btc);
        setBtcyPrice(btcy);
      } catch (error) {
        console.error("Failed to fetch BTC price:", error);
      }
    };
    fetchPrices();
  }, []);

  return (
    <div className="overflow-hidden relative mt-40 mx-auto">
      <div className="mt-6 flex flex-col items-center text-center">
        <div className="px-4 text-2xl font-bold text-primary max-w-250 leading-tight">
          Bitcoin-Yay Is The Micro Token
        </div>
        <div className="px-4 text-2xl font-bold text-primary max-w-250 leading-tight">
          And Petty Cash Of Bitcoin
        </div>

        <div className="px-4 mt-4 text-5xl font-bold text-primary max-w-250 leading-snug">
          {btcPrice !== null && btcyPrice !== null ? (
            <>
              Bitcoin ${btcPrice.toLocaleString()}, Bitcoin-Yay $
              {btcyPrice.toFixed(4)}
            </>
          ) : (
            "Loading prices..."
          )}
        </div>

        <div className="px-4 mt-2 text-xs font-bold text-primary max-w-250">
          1 Bitcoin = 1 Million Bitcoin-Yay
        </div>
      </div>

      {/* Part 01 */}
      <HeroComponent />

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
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-8">
            <span className="text-primary">Indexx.ai</span>
            <span className="text-primary"> — The Official Home of BTCY</span>
          </h1>

          {/* Subtitle/Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 md:mb-10 font-medium">
            All BTCY utilities, storage, and future trading live on Indexx.ai
          </p>

          {/* Descriptive Paragraph */}
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-12 md:mb-16 leading-relaxed max-w-4xl mx-auto">
            Bitcoin Yay is where BTCY is mined — Indexx.ai is where BTCY lives, moves, and is used. Once you reach 10,000 mined BTCY, withdrawals are sent directly to your Indexx Asset Wallet, which also hosts all BTCY utilities including Lotto, Shop, and future Alchemy conversions. Indexx.ai is the official platform powering the Bitcoin Yay ecosystem.
          </p>

          {/* Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-24">
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

          {/* Features Section - Numbered List */}
          <div className="text-left max-w-3xl mx-auto space-y-10 md:space-y-12 lg:space-y-14 relative">
            {/* background Image - Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <Image
                src={BitcoinArtWatermark}
                alt=""
                className="w-full max-w-2xl h-auto opacity-10 md:opacity-15"
                aria-hidden="true"
              />
            </div>

            {/* Feature 1 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                1. Official BTCY Wallet
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  Indexx Asset Wallet is the only official wallet for BTCY withdrawals from Bitcoin Yay.
                </li>
                <li className="list-disc">
                  Secure, ecosystem-native, and automatically linked to your Bitcoin Yay account.
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                2. 10K Withdrawal Gateway
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  BTCY can be withdrawn to Indexx once you mine 10,000 BTCY.
                </li>
                <li className="list-disc">
                  Withdrawn BTCY is used inside the Indexx ecosystem (Lotto, Shop, utilities).
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                3. All BTCY Utilities Live on Indexx
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">Lotto (games & rewards)</li>
                <li className="list-disc">Shop (ecosystem purchases)</li>
                <li className="list-disc">Future utilities built directly on Indexx</li>
                <li className="list-disc">Alchemy conversions when unlocked</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                4. Future Trading & Liquidity
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  Indexx will host future BTCY trading pairs once liquidity is enabled.
                </li>
                <li className="list-disc">
                  Alchemy converts mined BTCY into tradable form when conditions are met.
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 md:mb-6">
                5. One Account, One Ecosystem
              </h2>
              <ul className="space-y-3 text-base md:text-lg lg:text-xl text-white pl-6">
                <li className="list-disc">
                  Your Bitcoin Yay account automatically creates your Indexx account.
                </li>
                <li className="list-disc">
                  No extra sign-ups, no fragmentation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mining Navigation button #######################################################################################  */}
      <div className="flex mt-40 mb-40 gap-30 flex-wrap justify-center max-w-7xl mx-auto">
        <Link
          href="/mining/free-mining"
          className="flex flex-col items-center justify-start group"
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={FreeMiningButtonImage}
              alt="Free Mining"
              className="w-54 group-hover:scale-105 transition-all duration-300"
            />
          </div>
          <p className="mt-4 text-lg font-semibold group-hover:text-primary">
            SNATCH MINING
          </p>
          <p className="mt-2 text-base text-white">Free</p>
          <p className="mt-2 text-sm text-white max-w-xs text-center">
            Mine BTCY for free no rigs, no costs, just tap and earn directly from your phone.
          </p>

        </Link>
        <button
          type="button"
          onClick={() => setIsPowerMiningActive(!isPowerMiningActive)}
          className="flex flex-col items-center justify-start group cursor-pointer"
        >
          <div className="h-32 flex justify-center items-center" >
            <Image
              src={PowerMiningButtonImage}
              alt="Electric Mining"
              className="w-60 group-hover:scale-105 transition-all duration-300 mb-8"
            />
          </div>
          <p
            className={`mt-4 text-lg font-semibold group-hover:text-primary ${isPowerMiningActive ? "text-primary" : ""
              }`}
          >
            POWER MINING
          </p>
          <p className="mt-2 text-base text-white">Subscribe</p>
          <p className="mt-2 text-sm text-white max-w-xs text-center">
            Upgrade your mining speed up to 6x earn faster, reach Alchemy sooner, and maximize every session.
          </p>
        </button>
        <Link
          href="/mining/quantum-mining"
          className="flex flex-col items-center justify-start group "
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={QuantumMiningButtonImage}
              alt="Electric Mining"
              className="w-56 group-hover:scale-105 transition-all duration-300 mb-4"
            />
          </div>
          <p className="mt-4 text-lg font-semibold group-hover:text-primary">
            QUANTUM MINING
          </p>
          <p className="mt-2 text-base text-white">Buy</p>
          <p className="mt-2 text-sm text-white max-w-xs text-center">
            Get tradable BTCY instantly skip the 100K grind and unlock real-time access to BTCY's value.
          </p>
        </Link>
        {isPowerMiningActive && (
          <>
            <div className="w-full text-center mt-20 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                3 Subscriptions Power Mining Plans
              </h2>
            </div>
            <div className="flex flex-wrap gap-30  justify-center w-full">
              <Link
                href="/mining/electric-mining"
                className="flex flex-col items-center justify-center group"
              >
                <div className="h-32 flex justify-center items-center">
                  <Image
                    src={ElectricMiningButtonImage}
                    alt="Electric Mining"
                    className="w-18 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <p className="mt-2 text-lg font-semibold group-hover:text-primary">
                  ELECTRIC MINING PLAN
                </p>
                <p className="mt-2 text-sm text-white max-w-xs text-center">
                  Charge your mining speed with extra power double your earning rate and keep your sessions running stronger, longer.
                </p>
              </Link>
              <Link
                href="/mining/turbo-mining"
                className="flex flex-col items-center justify-start group "
              >
                <div className="h-32 flex justify-center items-center ">
                  <Image
                    src={TurbineMiningButtonImage}
                    alt="Electric Mining"
                    className="w-28 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <p className="mt-2 text-lg font-semibold group-hover:text-primary">
                  TURBO MINING PLAN
                </p>
                <p className="mt-2 text-sm text-white max-w-xs text-center">
                  Experience 6x faster mining climb to Alchemy in record time and multiply your BTCY rewards.
                </p>
              </Link>
              <Link
                href="/mining/nuclear-mining"
                className="flex flex-col items-center justify-start group "
              >
                <div className="h-32 flex justify-center items-center ">
                  <Image
                    src={NuclearMiningButtonImage}
                    alt="Electric Mining"
                    className="w-30 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <p className="mt-2 text-lg font-semibold group-hover:text-primary">
                  NUCLEAR MINING PLAN
                </p>
                <p className="mt-2 text-sm text-white max-w-xs text-center">
                  The ultimate boost maximum power, maximum output. Unlock BTCY's highest earning potential with unstoppable mining energy.
                </p>
              </Link>
            </div>
          </>

        )}
      </div>

      {/* Mining Navigation button #######################################################################################  */}

      <div className="container mx-auto px-4 py-8 relative">
        {/* Part 02 */}
        <div
          className="mt-20 text-center flex flex-col items-center"
          id="mobile-mining"
        >
          <div className="flex flex-col justify-center ">
            <p className="text-2xl">Bitcoin-Yay</p>
            <h2 className="text-4xl md:text-[68px] font-bold my-4">
              Your Mobile Mining
            </h2>
            <h3 className="text-2xl md:text-4xl mb-4">Micro Token of Bitcoin</h3>
            <p className="text-2xl">Bitcoin Yay is your petty cash for Bitcoin! </p>


          </div>
          <div className="mt-10 flex flex-col justify-center items-center">
            <Image
              src={PhoneImage1}
              alt="Phone Image 1"
              className="w-80 md:w-140 lg:w-140"
            />

          </div>
          <CustomButton2
            image={DownloadLogo}
            text="Download the Mining App"
            link="/#apple-store-download"
          />
        </div>

        {/* Part 03 */}
        <div className="mt-60 mb-20 items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={PhoneImage2}
              alt="Phone Image 2"
              className="w-80 md:w-90 lg:w-90"
            />
            <h2 className="text-4xl md:text-[48px] font-bold mt-20 text-center">
              Download The Bitcoin-Yay App
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <CustomButton2
              image={DownloadLogo}
              text="Download the Mining App"
              link="/#apple-store-download"
            />
          </div>
        </div>

        {/* Part 04 */}
        <div className="flex flex-col items-start mt-60 mx-10">
          <p className="text-xl text-left mb-10 max-w-100 ">Get real-time updates, smart insights, and seamless crypto management.</p>
        </div>

        <div className="flex flex-wrap gap-6 items-start justify-center mx-10 ">
          <CustomCard
            image={CardImage1}
            title="Bitcoin  Diversification."
            desc="Diversify your crypto investments to minimize risk and maximize potential returns. Balance Bitcoin, altcoins, and stable coins to create a resilient portfolio. Stay ahead in the crypto market with a well-diversified strategy."
          />
          <CustomCard
            image={CardImage2}
            title="Dynamic Rebalancing – Keep Your Portfolio on Track."
            desc=" Markets change, and so should your crypto portfolio. Automatically adjust asset allocations to maintain optimal balance. Stay ahead with smart, data-driven rebalancing strategies."
          />
          <CustomCard
            image={CardImage3}
            title="Accessible Investing- Bitcoin for Everyone."
            desc="Investing in crypto should be simple, secure, and open to all. Start with any amount and grow your portfolio at your own pace. Bitcoin-Yay makes crypto investing easy, informative, and accessible."
          />
          <CustomCard
            image={CardImage4}
            title="Trading Charts – Visualize the Market Like a Pro."
            desc="Track real-time price movements with advanced crypto charts. Analyze trends, patterns, and indicators for smarter trading. Make data-driven decisions with interactive and customizable charts."
          />
        </div>

        <div className="lg:-mx-auto mt-20 w-screen absolute right-[-150px] flex items-end justify-end">
          <Image src={bgArtImage1} alt="art-image" className="w-100 lg:w-140" />
        </div>

        {/* Part 05 */}
        <div className=" flex flex-col justify-center relative items-center mt-60 z-10">
          <div className="text-center">
            <p className="text-2xl text-primary">Discover the</p>
            <h2 className="text-4xl md:text-[68px] font-bold my-4">
              Benefits Of Our App
            </h2>
          </div>
          <div className="my-10">
            <Image
              src={PhoneImage3}
              alt="Phone Image 3"
              className="w-80 md:w-100 lg:w-100"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-2">
            <BenefitCard
              image={BenefitLogo1}
              title="Customer assistance"
              description="Quickly find answers through our support resources, or reach out to us 24/7 via live chat, phone, or email."
            />
            <BenefitCard
              image={BenefitLogo2}
              title="Fee-free exchanges"
              description="Start trading with us today and enjoy your initial three exchanges without incurring any fees."
            />
            <BenefitCard
              image={BenefitLogo3}
              title="Transparent fees"
              description="Farewell unexpected charges! Bitcoin-Yay  guarantees transparency through detailed breakdowns."
            />
            <BenefitCard
              image={BenefitLogo4}
              title="Secure platform"
              description="To ensure client security and fund protection, we offer secure offline storage and conduct regular security evaluations."
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <CustomButton2
              image={DownloadLogo}
              text="Download the Mining App"
              link="/#apple-store-download"
            />
          </div>
        </div>



        {/* Part 06 */}
        <div className="flex flex-col md:flex-row gap-20 justify-center items-center mt-40 md:mt-80 mx-10">
          <div
            className="flex flex-col items-center justify-center"
            id="apple-store-download"
          >
            <div className="flex flex-col items-center justify-center relative">
              <Image
                src={AppStoreQR}
                alt="App Store QR"
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/ph/app/bitcoin-yay/id6744868017",
                    "_blank"
                  );
                }}
                className="w-40 lg:w-56 xl:w-64 2xl:w-72 absolute hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              />
              <Image src={PhoneImage4} alt="Phone Image 4" className="w-100 lg:w-100" />
              <Image
                src={AppleLogo}
                alt="Apple Logo"
                className="absolute bottom-0"
              />
            </div>
            <p className="text-tertiary mt-10 text-lg max-w-86 text-center">
              Scan or Click on the QR to Download from the Apple Store
            </p>
            <div className="flex flex-col items-center justify-center mt-10">
              <CustomButton2
                image={DownloadLogo}
                text="Download the Mining App"
                onClick={() => {
                  window.open(
                    "https://apps.apple.com/ph/app/bitcoin-yay/id6744868017",
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
          <div
            className="flex flex-col items-center justify-center"
            id="google-play-download"
          >
            <div className="flex flex-col items-center justify-center relative">
              <Image
                src={PlayStoreQR}
                alt="Play Store QR"
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en",
                    "_blank"
                  );
                }}
                className="w-40 lg:w-56 xl:w-64 2xl:w-72 absolute hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              />

              <Image src={PhoneImage4} alt="Phone Image 4" className="w-100 lg:w-100" />
              <Image
                src={PlaystoreLogo}
                alt="Apple Logo"
                className="absolute bottom-0"
              />
            </div>
            <p className="text-tertiary mt-10 text-lg max-w-86 text-center">
              Scan or Click on the QR to Download from the Google Play
            </p>
            <div className="flex flex-col items-center justify-center mt-10">
              <CustomButton2
                image={DownloadLogo}
                text="Download the Mining App"
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en",
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
        </div>
        {/* 
        <div className="mt-40 flex flex-col justify-center text-center items-center">
          <h2 className="mt-20 text-3xl md:text-[54px] font-semibold">
            Download the app now to start the free mining.
          </h2>
        </div> */}

        {/* Part 07 */}

        <div className="flex flex-col items-center justify-center mt-40 md:mt-70">
          <Image src={IndexxLogo1} alt="Indexx Logo" />
          <h2 className="text-4xl md:text-6xl font-medium my-4">
            Crypto Paradise
          </h2>
          <div className="flex items-center justify-center gap-30 mt-10 mx-10">
            <CustomButton2
              image={DollarButtonImage}
              text="Buy Token"
              link="https://cex.indexx.ai/"
              imageStyling="w-30"
              ariaLabel="Buy Bitcoin-Yay tokens on Indexx exchange"
            />
            <CustomButton2
              image={InfoButtonImage}
              text="Discover Indexx.ai"
              link="https://indexx.ai/"
              imageStyling="w-30"
              ariaLabel="Learn more about Indexx AI platform and services"
            />
          </div>
        </div>
        <div className="mt-20 md:mt-40 w-screen relative left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
          <Image src={ArtImage3} alt="art-image" className="w-full min-w-260" />
          <h2 className="text-3xl md:text-5xl px-2 font-medium text-center mt-60 max-w-280 md:leading-16">
            Celebrating Bitcoin-YAY, mobile mining, in the community. Earning
            crypto on the go with Bitcoin-YAY mining.
          </h2>
        </div>

        {/* Part 7 */}
        <div className="-mx-4 mt-20 w-screen relative left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center">
          <Image
            src={ArtImage1}
            alt="art-image"
            className="w-full max-w-[1920px]"
          />
          <Image
            src={ArtImage2}
            alt="art-image"
            className="-mt-24 md:-mt-40 lg:-mt-80 w-1/2 max-w-[1000px]"
          />
        </div>

        <div className="text-center mt-40 flex flex-col items-center">
          <p className="text-2xl font-medium text-primary">Community</p>
          <h2 className="text-4xl md:text-7xl font-bold mb-6">
            Stay connected
          </h2>
          <p className="text-3xl max-w-170">
            Stay ahead with real-time Bitcoin updates, expert insights, and a
            thriving community.
          </p>
        </div>

        {/* Part 08 */}
        {/* 
        <div className="mt-80">
          <div className="text-center mt-40 flex flex-col items-center">
            <p className="text-2xl font-medium text-primary">Get to know our</p>
            <h2 className="text-5xl md:text-8xl font-bold mt-2">Gophers</h2>
            <p className="text-lg font-light max-w-176 mt-8">
              Meet the hardworking bitcoin-yay miner gophers behind your BTCY
              earnings! These tireless miners work quietly in the background of
              your phone helping you mine BTCY anytime, anywhere. Get to know
              their unique powers and choose your mining buddy. Download your
              favorite gopher and set it as your screen saver. It's mining time
              in style!
            </p>
          </div>
          <div className="mt-40 md:mx-20 grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            <GopherCard
              image={GopherImage1}
              title="AI Gopher"
              desc="Uses artificial intelligence to optimize the mining system—making it faster, smarter, and more energy-efficient."
            />
            <GopherCard
              image={GopherImage2}
              title="Blockchain Gopher"
              desc="Your reliable builder! It keeps the chain running smoothly, ensuring secure and traceable mining operations."
            />
            <GopherCard
              image={GopherImage3}
              title="DAO Gopher"
              desc="The voice of the community! It believes in teamwork, helping miners vote and shape the future of BTCY."
            />
            <GopherCard
              image={GopherImage4}
              title="Smart Contract Gopher"
              desc="Automates everything! This clever gopher executes tasks with precision—no human needed, no errors allowed."
            />
            <GopherCard
              image={GopherImage5}
              title="Token Gopher"
              desc="The master of digital assets! This gopher specializes in spotting and stacking BTCY tokens efficiently."
            />
            <GopherCard
              image={GopherImage6}
              title="Wallet Gopher"
              desc="The keeper of your treasures! This gopher secures your BTCY earnings and keeps your balance safe and sound."
            />
          </div>
        </div> */}

        {/* Part 9 */}

        <div className="mt-60 md:mt-60 flex flex-col items-center justify-center text-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold my-6">
              What Our Minners Say?
            </h2>
          </div>
          <UserReviewCards />
        </div>

        {/* Part 10 */}
        <DisclaimerComponent />
      </div>
    </div>
  );
}
