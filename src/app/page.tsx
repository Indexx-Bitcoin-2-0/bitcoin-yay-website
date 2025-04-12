"use client";
import Image from "next/image";
import InfoCard from "@/components/InfoCard";
import BenefitCard from "@/components/BenefitCard";

import DownloadLogo from "../assets/images/download-button.png";
import BitcoinYayLogo from "../assets/images/logo.png";

import PhoneImage1 from "../assets/images/home/phone-1.svg";
import PhoneImage2 from "../assets/images/home/phone-2.svg";
import PhoneImage3 from "../assets/images/home/phone-3.png";
import PhoneImage4 from "../assets/images/home/phone-4.png";
import PhoneImage5 from "../assets/images/home/phone-5.png";

import InfoImage1 from "../assets/images/home/info-1.png";
import InfoImage2 from "../assets/images/home/info-2.png";
import InfoImage3 from "../assets/images/home/info-3.png";
import InfoImage4 from "../assets/images/home/info-4.png";

import BenefitLogo1 from "../assets/images/home/benefits/1.png";
import BenefitLogo2 from "../assets/images/home/benefits/2.png";
import BenefitLogo3 from "../assets/images/home/benefits/3.png";
import BenefitLogo4 from "../assets/images/home/benefits/4.png";

import bgArtImage1 from "../assets/images/bitcoin-art-3.png";
import bgArtImage2 from "../assets/images/bitcoin-art-4.png";
import bgArtImage3 from "../assets/images/bitcoin-art.png";
import UserReviewCards from "@/components/UserReviewCards";

export default function Home() {
  return (
    <div className="overflow-hidden relative">
      <Image
        src={bgArtImage2}
        alt="Background Art"
        className="absolute -z-10 top-0 lg:-top-30 -right-30 w-150 md:w-200 lg:w-400 max-w-[200%]"
      />

      <div className="container mx-auto px-4 py-8">
        <div>
          <div className="flex flex-col gap-8 items-center justify-between flex-wrap mt-0">
            <div className="w-full">
              <div className="">
                <Image
                  src={BitcoinYayLogo}
                  alt="Logo"
                  className="w-1/3 d:w-1/2 lg:w-[300px]"
                  height={200}
                />
                <p className="text-sm md:text-xl text-primary">
                  Stay ahead with real-time Bitcoin updates, expert insights,
                  and a thriving community.
                </p>
                <h3 className="text-4xl md:text-6xl lg:text-8xl font-bold my-6 md:leading-16 lg:leading-24 max-w-320">
                  Bitcoin Yay – Your Gateway to Crypto Freedom!
                </h3>
                <p className="text-sm md:text-xl leading-relaxed text-tertiary max-w-250">
                  Bitcoin Yay is your ultimate hub for everything Bitcoin!
                  Whether you&apos;re a seasoned investor or just starting your
                  crypto journey, we bring you the latest news, market trends,
                  and tools to navigate the world of digital currency with
                  confidence.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <button className="cursor-pointer text-tertiary group">
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
              </button>
            </div>
            <div className="mt-20">
              <div className="flex justify-center gap-6 lg:mt-40">
                <Image
                  src={PhoneImage1}
                  alt="Phone Image 1"
                  className="w-[150px] md:w-1/3 lg:w-1/2"
                  height={400}
                />
                <Image
                  src={PhoneImage2}
                  alt="Phone Image 2"
                  className="w-[150px] md:w-1/3 lg:w-1/2"
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2nd part */}
        {/* <div className="flex justify-center mt-20 absolute left-1/3 top-20 lg:top-[1200px]">
        <Image src={bgArtImage} alt="Background Art" className="w-[700px]" />
      </div> */}

        <div
          className="mt-30 pt-20 lg:pt-40 mx-auto relative bg-[center_-5px] md:bg-[center_-10px] bg-size-[400px_auto] md:bg-size-[700px_auto] bg-no-repeat"
          style={{
            backgroundImage: `url(${bgArtImage1.src})`,
          }}
        >
          <div className="flex flex-col items-center justify-center text-center lg:mt-20">
            <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold md:leading-16 lg:leading-24 my-10">
              Download the Bitcoin Yay App
            </h2>
            <p className="text-lg font-normal">
              Get real-time updates, smart insights, and seamless crypto
              management.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row mt-10 gap-2 justify-center">
            <div>
              <InfoCard
                image={InfoImage1}
                title="Bitcoin Diversification"
                desc="Diversify your crypto investments to minimize risk and maximize potential returns. Balance Bitcoin, altcoins, and stable coins to create a resilient portfolio. Stay ahead in the crypto market with a well-diversified strategy."
              />
              <InfoCard
                image={InfoImage2}
                title="Dynamic Rebalancing – Keep Your Portfolio on Track"
                desc="Markets change, and so should your crypto portfolio. Automatically adjust asset allocations to maintain optimal balance. Stay ahead with smart, data-driven rebalancing strategies."
              />
            </div>
            <div className="flex flex-col items-center justify-center pt-10 lg:pt-0">
              <Image
                src={PhoneImage3}
                alt="Phone Image 3"
                className="w-[250px] md:w-[500px]"
              />
              <div className="flex flex-col items-center justify-center mt-10">
                <button className="cursor-pointer text-tertiary group">
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
                </button>
              </div>
            </div>
            <div>
              <InfoCard
                image={InfoImage3}
                title="Accessible Investing- Bitcoin for Everyone"
                desc="Investing in crypto should be simple, secure, and open to all. Start with any amount and grow your portfolio at your own pace. Bitcoin Yay makes crypto investing easy, informative, and accessible."
              />
              <InfoCard
                image={InfoImage4}
                title="Trading Charts – Visualize the Market Like a Pro"
                desc="Track real-time price movements with advanced crypto charts. Analyze trends, patterns, and indicators for smarter trading. Make data-driven decisions with interactive and customizable charts."
              />
            </div>
          </div>
        </div>

        {/* Part 3 */}
        <div
          className="mt-10 pt-20 lg:pt-40 mx-auto relative bg-[center_-5px] md:bg-[center_-10px] md:bg-size-[1200px_auto] bg-no-repeat"
          style={{
            backgroundImage: `url(${bgArtImage2.src})`,
          }}
        >
          <div className="flex flex-col items-center justify-center text-center lg:mt-20">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold md:leading-16 lg:leading-24 my-10">
              Discover the benefits of our app
            </h2>
          </div>
          <div className="flex flex-col-reverse lg:flex-row mt-10 gap-2 justify-between">
            <div className="flex-1">
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
            <div className="flex-1">
              <div className="flex justify-center">
                <Image
                  src={PhoneImage4}
                  alt="Phone Image 4"
                  className="w-[250px] md:w-[400px]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button className="cursor-pointer text-tertiary group">
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
            </button>
          </div>
        </div>

        {/* Part 4 */}
        <div className="flex flex-col items-center justify-center text-center lg:mt-20 mx-aut0 mt-20">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold md:leading-16 lg:leading-24 my-10">
            Download Install Bitcoin Yay app By Scanning The QR Code
          </h2>
          <p className="text-lg lg:text-xl font-normal text-tertiary leading-8 w-100 lg:w-[520px]">
            Get real-time updates, smart insights, and seamless crypto
            management.
          </p>
          <div
            className="mt-10 w-full relative bg-[-40px_0px] md:bg-[40px_0px] lg:bg-[150px_0px] bg-size-[450px_auto] md:bg-size-[700px_auto] lg:bg-size-[700px_auto] bg-no-repeat flex items-center justify-center"
            style={{
              backgroundImage: `url(${bgArtImage3.src})`,
            }}
          >
            <div>
              <Image
                src={PhoneImage5}
                alt="QR Code"
                className="w-[270px] md:w-[400px] lg:w-[500px]"
              />
            </div>
          </div>
        </div>

        {/* Part 5 */}

        <div className="mt-40 flex flex-col items-center justify-center text-center">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold md:leading-16 lg:leading-24 my-10">
              What Our Users Say?
            </h2>
          </div>
          <UserReviewCards />
        </div>
      </div>
    </div>
  );
}
