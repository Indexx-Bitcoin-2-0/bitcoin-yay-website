import Image from "next/image";
import Link from "next/link";

import HandImage from "@/assets/images/btcy-index-relationship/hands.webp";

import BitcoinYayLogo from "@/assets/images/btcy-index-relationship/yay.webp";
import IndexxLogo from "@/assets/images/btcy-index-relationship/indexx.ai.webp";
import LotoLogo from "@/assets/images/btcy-index-relationship/lotto.webp";
import ExchangeLogo from "@/assets/images/btcy-index-relationship/exchange.webp";
import ShopLogo from "@/assets/images/btcy-index-relationship/shop.webp";
import AcademyLogo from "@/assets/images/btcy-index-relationship/academy.webp";

export const metadata = {
  title: "BTCY & Indexx.ai Relationship - Complete Crypto Ecosystem",
  description:
    "Discover how Bitcoin Yay (BTCY) integrates with the Indexx.ai ecosystem. Mine BTCY, shop with rewards, trade on exchanges, and learn through academy courses in one complete platform.",
  openGraph: {
    title: "BTCY & Indexx.ai Relationship - Complete Crypto Ecosystem",
    description:
      "Discover how Bitcoin Yay (BTCY) integrates with the Indexx.ai ecosystem. Mine BTCY, shop with rewards, trade on exchanges, and learn through academy courses in one complete platform.",
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
          BTCY on Indexx.ai
        </h1>
      </div>

      {/* Part 02 */}

      <div className="mt-20 lg:mt-40 flex flex-col lg:flex-row lg:mx-20 justify-center items-center gap-40 px-4">
        <Link href="/">
          <Image
            src={BitcoinYayLogo}
            alt="Bitcoin Yay Logo"
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
        <div className="flex flex-col items-start justify-start gap-10 lg:mb-100">
          <Link href={"https://indexx.ai"} target="_blank">
            <Image
              src={IndexxLogo}
              alt="Indexx Logo"
              className="w-70 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Link href={"https://lotto.indexx.ai"} target="_blank">
            <Image
              src={LotoLogo}
              alt="Loto Logo"
              className="w-80 mt-40 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Link
            href={"https://cex.indexx.ai/update/home?buyToken=INEX"}
            target="_blank"
          >
            <Image
              src={ExchangeLogo}
              alt="Exchange Logo"
              className="w-64 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Link href={"https://shop.indexx.ai"} target="_blank">
            <Image
              src={ShopLogo}
              alt="Shop Logo"
              className="w-46 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Link href={"https://academy.indexx.ai"} target="_blank">
            <Image
              src={AcademyLogo}
              alt="Academy Logo"
              className="w-64 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      <div className="mt-20 lg:mt-0 mb-40 mx-auto justify-center text-center max-w-160">
        <h3 className="text-3xl font-bold">BTCY on indexx ecosystem</h3>
        <p className="mt-6 text-base">
          Bitcoin Yay, Indexx Shop, and Indexx Exchange create a complete crypto
          experience. The Indexx Ecosystem fully supports Bitcoin Yay, making it
          more than just a mining app. Mine BTCY daily with Bitcoin Yay while
          learning through the Bitcoin Yay Academy — offering guided courses on
          mining, the BTCY Bible, and expanding your crypto knowledge. Use your
          BTCY earnings at the Indexx Shop for gift cards and exclusive rewards,
          then invest or trade securely on the Indexx Exchange. Together, these
          platforms help you mine smarter, spend wisely, and grow your digital
          wealth.
        </p>
      </div>
    </div>
  );
}
