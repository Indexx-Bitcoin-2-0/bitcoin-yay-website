"use client";
import Image, { StaticImageData } from "next/image";
import BenefitCard from "@/components/BenefitCard";
import HeroComponent from "@/components/HeroComponent";

import IndexxLogo1 from "@/assets/images/indexx-logo-1.svg";
import DownloadLogo from "../assets/images/download-button.svg";
import AppleLogo from "@/assets/images/home/apple-logo.svg";
import PlaystoreLogo from "@/assets/images/home/playstore-logo.svg";

import PhoneImage1 from "../assets/images/home/phone-1.svg";
import PhoneImage2 from "../assets/images/home/phone-2.svg";
import PhoneImage3 from "../assets/images/home/phone-3.svg";
import PhoneImage4 from "../assets/images/home/phone-4.svg";

import BenefitLogo1 from "../assets/images/home/benefits/1.svg";
import BenefitLogo2 from "../assets/images/home/benefits/2.svg";
import BenefitLogo3 from "../assets/images/home/benefits/3.svg";
import BenefitLogo4 from "../assets/images/home/benefits/4.svg";

import CardImage1 from "@/assets/images/home/card-1.svg";
import CardImage2 from "@/assets/images/home/card-2.svg";
import CardImage3 from "@/assets/images/home/card-3.svg";
import CardImage4 from "@/assets/images/home/card-4.svg";

import bgArtImage1 from "../assets/images/bitcoin-art-2.png";

import ArtImage1 from "@/assets/images/home/art-1.svg";
import ArtImage2 from "@/assets/images/home/art-2.svg";
import ArtImage3 from "@/assets/images/home/art-3.svg";

import UserReviewCards from "@/components/UserReviewCards";
import Link from "next/link";
import DisclaimerComponent from "@/components/DisclaimerComponent";

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

export default function Home() {
  return (
    <div className="overflow-hidden relative mt-40">
      {/* Part 01 */}
      <HeroComponent />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Part 02 */}
        <div className="mt-120 text-center" id="mobile-mining">
          <div className="flex flex-col justify-center ">
            <p className="text-2xl">Bitcoin Yay</p>
            <h2 className="text-4xl md:text-7xl font-bold my-4">
              Your Mobile Mining
            </h2>
            <h3 className="text-2xl md:text-4xl">Micro Token of Bitcoin</h3>
          </div>
          <div className="my-10 flex flex-col justify-center items-center">
            <Image
              src={PhoneImage1}
              alt="Phone Image 1"
              className="w-80 md:w-140 lg:w-240"
            />
            <p className="text-2xl font-bold my-10">
              Bitcoin Yay is your petty cash for Bitcoin!{" "}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <Link
              href="/coming-soon"
              className="cursor-pointer text-tertiary group"
            >
              <Image
                src={DownloadLogo}
                alt="Download Logo"
                className="mt-8 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex justify-center">
                <p className="text-lg group-hover:text-primary">
                  Download the App
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Part 03 */}
        <div className="mt-60 mb-20 items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={PhoneImage2}
              alt="Phone Image 2"
              className="w-80 md:w-140 lg:w-240"
            />
            <h2 className="text-4xl md:text-7xl font-bold my-20 text-center">
              Download The Bitcoin Yay App
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <Link
              href="/coming-soon"
              className="cursor-pointer text-tertiary group"
            >
              <Image
                src={DownloadLogo}
                alt="Download Logo"
                className="mt-8 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex justify-center">
                <p className="text-lg group-hover:text-primary">
                  Download the App
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Part 04 */}

        <div className="flex flex-wrap gap-6 items-start justify-center md:mx-10 mt-80 ">
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
            desc="Investing in crypto should be simple, secure, and open to all. Start with any amount and grow your portfolio at your own pace. Bitcoin Yay makes crypto investing easy, informative, and accessible."
          />
          <CustomCard
            image={CardImage4}
            title="Trading Charts – Visualize the Market Like a Pro."
            desc="Track real-time price movements with advanced crypto charts. Analyze trends, patterns, and indicators for smarter trading. Make data-driven decisions with interactive and customizable charts."
          />
        </div>

        <div className="lg:-mx-auto mt-20 w-screen relative right-0 flex items-end justify-end">
          <Image src={bgArtImage1} alt="art-image" className="w-150 lg:w-190" />
        </div>

        {/* Part 05 */}
        <div className=" flex flex-col justify-center items-center">
          <div className="text-center">
            <p className="text-2xl">Discover the</p>
            <h2 className="text-4xl md:text-7xl font-bold my-4">
              Benefits Of Our App
            </h2>
          </div>
          <div className="my-10">
            <Image
              src={PhoneImage3}
              alt="Phone Image 3"
              className="w-80 md:w-140 lg:w-240"
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
              description="Farewell unexpected charges! Bitcoin Yay  guarantees transparency through detailed breakdowns."
            />
            <BenefitCard
              image={BenefitLogo4}
              title="Secure platform"
              description="To ensure client security and fund protection, we offer secure offline storage and conduct regular security evaluations."
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-40">
            <Link
              href="/coming-soon"
              className="cursor-pointer text-tertiary group"
            >
              <Image
                src={DownloadLogo}
                alt="Download Logo"
                className="mt-8 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex justify-center">
                <p className="text-lg group-hover:text-primary">
                  Download the App
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Part 06 */}
        <div className="flex flex-col md:flex-row gap-20 justify-center items-center mt-80 mx-10">
          <div className="flex flex-col items-center justify-center" id="apple-store-download">
            <div className="flex flex-col items-center justify-center relative">
              <Image src={PhoneImage4} alt="Phone Image 4" />
              <Image
                src={AppleLogo}
                alt="Apple Logo"
                className="absolute bottom-0"
              />
            </div>
            <p className="text-tertiary mt-10 text-lg">
              Download on the Apple Store
            </p>
          </div>
          <div className="flex flex-col items-center justify-center" id="google-play-download">
            <div className="flex flex-col items-center justify-center relative">
              <Image src={PhoneImage4} alt="Phone Image 4" />
              <Image
                src={PlaystoreLogo}
                alt="Apple Logo"
                className="absolute bottom-0"
              />
            </div>
            <p className="text-tertiary mt-10 text-lg">
              Download on the Google Play
            </p>
          </div>
        </div>

        {/* Part 07 */}

        <div className="flex flex-col items-center justify-center mt-40 md:mt-80">
          <Image src={IndexxLogo1} alt="Indexx Logo" />
          <h2 className="text-4xl md:text-6xl font-medium my-4">
            Crypto Paradise
          </h2>
          <div className="flex items-center justify-center gap-10 mt-10">
            <Link
              href="https://indexx.ai/"
              className="text-lg hover:text-primary"
            >
              Learn more
            </Link>
            <Link
              href="https://cex.indexx.ai/"
              className="text-lg text-primary hover:text-[#f96e0d]"
            >
              Buy Token
            </Link>
          </div>
        </div>
        <div className="mt-20 md:mt-40 w-screen relative left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
          <Image src={ArtImage3} alt="art-image" className="w-full min-w-260" />
          <h2 className="text-3xl md:text-5xl px-2 font-medium text-center mt-60 max-w-280 leading-16">
            Celebrating Bitcoin-YAY, mobile mining, in the community. Earning
            crypto on the go with Bitcoin-YAY mining.
          </h2>
        </div>

        {/* Part 7 */}
        <div className="-mx-4 mt-20 w-screen relative left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center">
          <Image src={ArtImage1} alt="art-image" className="w-full" />
          <Image
            src={ArtImage2}
            alt="art-image"
            className="-mt-24 md:-mt-40 lg:-mt-80 w-1/2"
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
        {/* Part 8 */}

        <div className="mt-40 md:mt-100 flex flex-col items-center justify-center text-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold my-6">
              What Our Minners Say?
            </h2>
          </div>
          <UserReviewCards />
        </div>

        {/* Part 09 */}
        <DisclaimerComponent />
      </div>
    </div>
  );
}
