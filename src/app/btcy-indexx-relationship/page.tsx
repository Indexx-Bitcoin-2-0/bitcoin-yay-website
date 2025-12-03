import Image from "next/image";
import Link from "next/link";

import HandImage from "@/assets/images/btcy-index-relationship/hands.webp";

import BitcoinYayLogo from "@/assets/images/btcy-index-relationship/yay.webp";
import CustomButton2 from "@/components/CustomButton2";
import UpArrow from '@/assets/images/UpArrow.png'
import IndexxLogo from '@/assets/images/indexx.ai.svg'
export const metadata = {
  title: "BTCY & Indexx.ai Relationship - Complete Crypto Ecosystem",
  description:
    "Discover how Bitcoin-Yay (BTCY) integrates with the Indexx.ai ecosystem. Mine BTCY, shop with rewards, trade on exchanges, and learn through academy courses in one complete platform.",
  openGraph: {
    title: "BTCY & Indexx.ai Relationship - Complete Crypto Ecosystem",
    description:
      "Discover how Bitcoin-Yay (BTCY) integrates with the Indexx.ai ecosystem. Mine BTCY, shop with rewards, trade on exchanges, and learn through academy courses in one complete platform.",
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
          BTCY Relationship with Indexx.ai
        </h1>
        <p className="mt-6 text-base max-w-2xl">
          Indexx.ai is the official host of Bitcoin-Yay (BTCY) — powering its blockchain wallet, ecosystem, and utilities like Alchemy and Quantum Mining. It’s where BTCY becomes real, secure, and trade-ready. </p>
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
          <Link href={"https://indexx.ai"} target="_blank">
            <Image
              src={IndexxLogo}
              alt="Indexx.ai"
              className="w-96 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="mt-4">
            <CustomButton2 imageStyling="w-24" image={UpArrow} text="Visit Indexx.ai" link="https://indexx.ai" />
          </div>

        </div>
      </div>
    </div>
  );
}
