import Image from "next/image";
import Link from "next/link";

import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/free-mining/art-1.webp";
import BitcoinYayLogo from "@/assets/images/logo2.webp";

const CustomCard = ({
  inputBTCY,
  multiplier,
  slug,
}: {
  inputBTCY: string;
  multiplier: string;
  slug: string;
}) => {
  return (
    <Link
      href={`/alchemy/free-mining/${slug}`}
      className="w-100 bg-primary z-10 hover:scale-105 transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src={BitcoinYayLogo}
          alt="Bitcoin Yay Logo"
          className="mt-10 w-50"
        />
      </div>
      <div className="mt-10 bg-[#F97400] flex flex-col items-center justify-center py-10">
        <p className="text-3xl md:text-4xl font-semibold">{inputBTCY}</p>
        <p className="mt-2 text-xl md:text-2xl font-semibold">{multiplier}</p>
      </div>
    </Link>
  );
};

export default function FreeMiningPage() {
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div className="flex items-center gap-6">
        <Image src={AlchemyLogo} alt="Alchemy Logo" className="w-16" />
        <h1 className="text-3xl md:text-[52px] font-semibold">
          Alchemy Gateway
        </h1>
      </div>
      <div className="mt-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-[80px] font-bold">
          FREE MINING GOPHER{" "}
        </h1>
        <h2 className="mt-2 text-3xl md:text-[50px] font-bold">
          ALCHEMY GATEWAY
        </h2>
        <p className="mt-6 text-xl md:text-3xl font-light">
          You are eligible to join the Free Mining Gopher Alchemy Gateway
        </p>
      </div>
      <div className="mt-40 flex flex-wrap justify-center items-center gap-10 p-4 z-20">
        <CustomCard
          inputBTCY="Input: 5,000 BTCY"
          multiplier="Multiplier: 0.5x - 1.2x"
          slug="basic"
        />
        <CustomCard
          inputBTCY="Input: 10,000 BTCY"
          multiplier="Multiplier: 0.4x - 1.3x"
          slug="premium"
        />
        <CustomCard
          inputBTCY="Input: 50,000 BTCY"
          multiplier="Multiplier: 0.3x - 1.5x"
          slug="elite"
        />
      </div>
      <div className="-mt-40 mx-auto z-0 w-full flex justify-center">
        <Image
          src={ArtImage1}
          alt="Bg Art Image 1"
          className="z-0 w-70 md:w-140 xl:w-200"
        />
      </div>

      {/* Email Subscription Section */}
      <div className="mt-60 mb-20 mx-4 md:mx-10 lg:mx-24">
        <div className="bg-primary rounded-2xl px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                To Get Exclusive Benefits
              </h3>
              <p className="text-secondary font-light text-lg md:text-xl lg:text-2xl opacity-90">
                Please drop in your email
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center w-full max-w-120">
              <div className="relative flex w-full">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full sm:flex-1 px-4 py-3 md:px-6 md:py-4 pr-24 md:pr-28 rounded-full border border-secondary text-secondary placeholder-secondary focus:outline-none text-base md:text-lg bg-secondary/20"
                />
                <Link
                  href="#"
                  className="absolute right-1 top-1 bottom-1 px-6 py-2 md:px-8 md:py-3 bg-[#6B6B6B] hover:bg-[#5A5A5A] font-semibold rounded-full transition-colors duration-200 text-base md:text-lg font-boldwhitespace-nowrap"
                >
                  ACTION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
