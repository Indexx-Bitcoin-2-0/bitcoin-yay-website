import Image from "next/image";
import Link from "next/link";

import HandImage from "@/assets/images/btcy-index-relationship/hands.webp";

import BitcoinYayLogo from "@/assets/images/btcy-index-relationship/yay.webp";
import WibsLogo from "@/assets/images/wibs_logo.png";
import CustomButton2 from "@/components/CustomButton2";
import UpArrow from '@/assets/images/UpArrow.png'

export const metadata = {
  title: "BTCY & WIBS Relationship - Complete Crypto Ecosystem",
  description:
    "Discover how Bitcoin-Yay (BTCY) integrates with the WIBS ecosystem. ",
  openGraph: {
    title: "BTCY & WIBS Relationship - Complete Crypto Ecosystem",
    description:
      "Discover how Bitcoin-Yay (BTCY) integrates with the WIBS ecosystem.",
  },
};

export default function BtcyIndexRelationship() {
  return (
    <div className="container mx-auto mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl md:text-3xl mt-10 font-semibold text-primary">
          From Mining to Marketplace:
        </h2>
        <h1 className="text-4xl md:text-7xl mt-6 font-semibold">
          BTCY Relationship with WIBS
        </h1>
        <p className="mt-6 text-base max-w-2xl">
          WIBS is the official meme coin of BTCY — the fun, viral side of the Bitcoin-Yay movement that turns community energy into real value.
        </p>
      </div>

      {/* Part 02 */}

      <div className="mt-20 lg:mt-40 flex flex-col lg:flex-row lg:mx-20 justify-center items-center gap-40 px-4">
        <Link href="/">
          <Image
            src={BitcoinYayLogo}
            alt="Bitcoin-Yay Logo"
            className="w-80 hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div>
          <Image
            src={HandImage}
            alt="Hands Image"
            className="w-full max-w-md"
          />
        </div>
        <div className="flex flex-col justify-center items-center" >
          <Link href={"https://whoisbitcoinsatoshi.wtf"} target="_blank">
            <Image
              src={WibsLogo}
              alt="WibsLogo"
              className="w-96 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="w-22">
            <CustomButton2 image={UpArrow} text="Visit WIBS" link="https://whoisbitcoinsatoshi.wtf" />
          </div>

        </div>
      </div>

    </div>
  );
}
