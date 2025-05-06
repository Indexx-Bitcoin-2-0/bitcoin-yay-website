"use client";
import Image, { StaticImageData } from "next/image";
import BenefitCard from "@/components/BenefitCard";
import HeroComponent from "@/components/HeroComponent";

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

import UserReviewCards from "@/components/UserReviewCards";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center">
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
    <div className="overflow-hidden relative">
      {/* Part 01 */}
      <HeroComponent />

      <div className="container mx-auto px-4 py-8 relative">
        {/* Part 02 */}
        <div className="mt-120 text-center">
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
              className="w-80 md:w-140 lg:w-auto"
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
              className="w-80 md:w-140 lg:w-auto"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:mx-10 mt-80">
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

        <div className="lg:-mx-auto mt-60 w-screen relative right-0 flex items-end justify-end">
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
              className="w-80 md:w-140 lg:w-auto"
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
          <div className="flex flex-col items-center justify-center">
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
          <div className="flex flex-col items-center justify-center">
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

        {/* Part 7 */}
        <div className="-mx-4 mt-60 w-screen relative left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center">
          <Image src={ArtImage1} alt="art-image" className="w-full" />
          <Image
            src={ArtImage2}
            alt="art-image"
            className="-mt-24 md:-mt-40 lg:-mt-80 w-1/2"
          />
        </div>

        <div className="text-center mt-40 flex flex-col items-center">
          <p className="text-5xl font-medium text-primary">Community</p>
          <h2 className="text-4xl md:text-7xl font-bold my-6">
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
        <div className="mt-80">
          <p className="my-4">Bitcoin Yay Disclaimer</p>

          <ul className="list-decimal pl-6 space-y-4">
            <li>
              General Information and Risks: Bitcoin Yay (&quot;BTCY&quot;) is a
              utility token intended solely for use within the Bitcoin Yay
              ecosystem. Participation in Bitcoin Yay activities, including
              mobile mining, holding tokens, and engaging with ecosystem
              features, involves inherent risks, including but not limited to
              market volatility, technological disruptions, regulatory changes,
              and cybersecurity threats. Users acknowledge these risks by
              engaging with Bitcoin Yay services.
            </li>
            <li>
              Not Financial Advice: Information provided by Bitcoin Yay, whether
              via website, mobile application, documentation, or communications,
              is for informational purposes only and does not constitute
              financial advice, investment guidance, or recommendations to
              purchase, sell, or hold any cryptocurrency. Users should
              independently evaluate their participation based on their personal
              financial circumstances and risk tolerance.
            </li>
            <li>
              Token Nature: BTCY tokens are not classified as securities or
              financial instruments. They do not represent shares, equity,
              ownership rights, dividends, or profit-sharing arrangements in
              Bitcoin Yay or any related entities. BTCY tokens have utility
              functions strictly within the Bitcoin Yay ecosystem, such as
              facilitating transactions, engaging in ecosystem activities, and
              accessing platform-specific features.
            </li>
            <li>
              Regulatory Compliance: Bitcoin Yay proactively adheres to
              applicable laws and regulations, including Anti-Money Laundering
              (AML), Know Your Customer (KYC), and data privacy legislation.
              Compliance measures may require users to provide personal
              identification documents and undergo identity verification
              processes. Failure to comply with these procedures may result in
              account limitations or suspension.
            </li>
            <li>
              Data Privacy and Protection: Bitcoin Yay collects, processes, and
              stores user data in accordance with applicable data protection
              regulations, including GDPR for European users. All personal data,
              especially sensitive KYC information, is encrypted and securely
              handled. Users have rights concerning their data, including the
              right to access, rectify, delete, and restrict processing of their
              information.
            </li>
            <li>
              Intellectual Property: The name &quot;Bitcoin Yay,&quot; its logo,
              branding, and associated trademarks are proprietary assets of
              Bitcoin Yay. Users may not use these trademarks without explicit
              permission. Open-source components of Bitcoin Yay’s technology are
              subject to the terms of their respective licenses. Proprietary
              elements such as mobile application code or specific AI
              technologies remain protected intellectual property.
            </li>
            <li>
              Limitation of Liability: Bitcoin Yay, its affiliates, partners,
              employees, and representatives shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              arising out of or related to user engagement with Bitcoin Yay or
              related services. Users engage with the Bitcoin Yay ecosystem at
              their own risk and agree to indemnify Bitcoin Yay against any
              claims or liabilities arising from their use.
            </li>
            <li>
              Global Accessibility and Jurisdiction: Bitcoin Yay services may
              not be accessible in jurisdictions subject to international
              sanctions or where cryptocurrency services are prohibited. Users
              must ensure their local laws and regulations permit participation.
              Bitcoin Yay reserves the right to limit access to features or
              services based on jurisdictional compliance requirements.
            </li>
            <li>
              Policy Changes: Bitcoin Yay reserves the right to modify or update
              this disclaimer at any time to reflect changes in the legal
              landscape, operational practices, or platform functionalities.
              Continued use of Bitcoin Yay services after updates signifies
              acceptance of these changes.
            </li>
            <li>
              Contact Information: For any questions or concerns regarding this
              disclaimer, please contact us directly at{" "}
              <span
                className="text-primary cursor-pointer hover:underline underline-offset-3"
                onClick={() => {
                  window.location.href = "mailto:privacy@bitcoinyay.com";
                }}
              >
                privacy@bitcoinyay.com
              </span>
              .
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
