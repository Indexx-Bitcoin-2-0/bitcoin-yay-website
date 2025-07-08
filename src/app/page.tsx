"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import BenefitCard from "@/components/BenefitCard";
import HeroComponent from "@/components/HeroComponent";

import IndexxLogo1 from "@/assets/images/indexx-logo-1.svg";
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

import BirthdayBanner from "@/assets/images/home/airdrop-4-july-banner.webp";
import BirthdayBannerMobile from "@/assets/images/home/airdrop-4-july-banner-mobile.webp";
// import ApplestoreDownloadButton from "@/assets/images/buttons/get-on-applestore-button.webp";
// import PlaystoreDownloadButton from "@/assets/images/buttons/get-on-playstore-button.webp";

import bgArtImage1 from "../assets/images/bitcoin-art-2.png";

import ArtImage1 from "@/assets/images/home/art-1.svg";
import ArtImage2 from "@/assets/images/home/art-2.svg";
import ArtImage3 from "@/assets/images/home/art-3.svg";

import UserReviewCards from "@/components/UserReviewCards";
import DisclaimerComponent from "@/components/DisclaimerComponent";
import CustomButton2 from "@/components/CustomButton2";

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
  return (
    <div className="overflow-hidden relative mt-40">
      <div className="mt-6 flex justify-center text-center">
        <h1 className="px-4 text-4xl md:text-5xl xl:text-6xl font-bold text-primary max-w-250 leading-10 md:leading-18">
          Bitcoin Yay Is The Micro Token And Petty Cash Of Bitcoin{" "}
        </h1>
      </div>
      {/* Part 01 */}
      <HeroComponent />

      <div
        id="download-app"
        className="mt-120 md:mt-40 lg:mt-120 relative flex flex-col items-center justify-center"
      >
        <Image
          src={BirthdayBanner}
          alt="Birthday Banner"
          className="w-full hidden md:block"
        />
        <Image
          src={BirthdayBannerMobile}
          alt="Birthday Banner"
          className="w-full md:hidden"
        />
        <Link
          href="/airdrop"
          className="mb-10 mt-4 absolute bottom-40 md:-bottom-20 xl:-bottom-10 "
        >
          <button className="border-2 border-primary text-primary px-4 py-2 md:py-4 rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
            <p className="text-primary text-2xl md:text-3xl xl:text-4xl font-semibold">
              COUNT ME IN
            </p>
          </button>
        </Link>
        {/* <div className="mt-10 flex flex-col md:flex-row gap-10 md:gap-20 justify-center items-center">
          <Link
            href="https://apps.apple.com/ph/app/bitcoin-yay/id6744868017"
            target="_blank"
          >
            <Image
              src={ApplestoreDownloadButton}
              alt="Get on Apple Store"
              className="w-64 h-24 mt-10 hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en"
            target="_blank"
          >
            <Image
              src={PlaystoreDownloadButton}
              alt="Get on Play Store"
              className="w-64 h-24 mt-10 hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </Link>
        </div> */}
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Part 02 */}
        <div
          className="mt-60 text-center flex flex-col items-center"
          id="mobile-mining"
        >
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
              className="w-80 md:w-140 lg:w-240"
            />
            <h2 className="text-4xl md:text-7xl font-bold my-20 text-center">
              Download The Bitcoin Yay App
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <CustomButton2
              image={DownloadLogo}
              text="Download the Mining App"
              link="/#apple-store-download"
            />
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
            <p className="text-2xl text-primary">Discover the</p>
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
            <CustomButton2
              image={DownloadLogo}
              text="Download the Mining App"
              link="/#apple-store-download"
            />
          </div>
        </div>

        <div className="mt-40 flex flex-col justify-center text-center items-center">
          <h1 className="px-4 text-4xl md:text-5xl xl:text-6xl font-bold text-primary max-w-250 leading-10 md:leading-18">
            Bitcoin Yay Is The Micro Token And Petty Cash Of Bitcoin{" "}
          </h1>
          <h2 className="mt-20 text-3xl md:text-[54px] max-w-250 font-semibold">
            Download the App for Free Mining
          </h2>
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
                className="w-50 lg:w-72 xl:w-84 2xl:w-100 absolute hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              />
              <Image src={PhoneImage4} alt="Phone Image 4" />
              <Image
                src={AppleLogo}
                alt="Apple Logo"
                className="absolute bottom-0"
              />
            </div>
            <p className="text-tertiary mt-10 text-lg max-w-86 text-center">
              Scan or Click on the QR to Download from the Apple Store
            </p>
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
                className="w-50 lg:w-72 xl:w-84 2xl:w-100 absolute hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
              />

              <Image src={PhoneImage4} alt="Phone Image 4" />
              <Image
                src={PlaystoreLogo}
                alt="Apple Logo"
                className="absolute bottom-0"
              />
            </div>
            <p className="text-tertiary mt-10 text-lg max-w-86 text-center">
              Scan or Click on the QR to Download from the Google Play
            </p>
          </div>
        </div>

        <div className="mt-40 flex flex-col justify-center text-center items-center">
          <h2 className="mt-20 text-3xl md:text-[54px] font-semibold">
            Download the app now to start the free mining.
          </h2>
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
          <h2 className="text-3xl md:text-5xl px-2 font-medium text-center mt-60 max-w-280 md:leading-16">
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

        {/* Part 08 */}

        <div className="mt-80">
          <div className="text-center mt-40 flex flex-col items-center">
            <p className="text-2xl font-medium text-primary">Get to know our</p>
            <h2 className="text-5xl md:text-8xl font-bold mt-2">Gophers</h2>
            <p className="text-lg font-light max-w-176 mt-8">
              Meet the hardworking Bitcoin Yay miner gophers behind your BTCY
              earnings! These tireless miners work quietly in the background of
              your phone helping you mine BTCY anytime, anywhere. Get to know
              their unique powers and choose your mining buddy. Download your
              favorite gopher and set it as your screen saver. It’s mining time
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
        </div>

        {/* Part 9 */}

        <div className="mt-80 md:mt-100 flex flex-col items-center justify-center text-center">
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
