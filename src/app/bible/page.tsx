"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import ArtImage1 from "@/assets/images/bible/art-1.webp";
import ArtImage2 from "@/assets/images/bible/art-2.webp";

import CardImage1 from "@/assets/images/bible/card-1.webp";
import CardImage2 from "@/assets/images/bible/card-2.webp";
import CardImage3 from "@/assets/images/bible/card-3.webp";
import CardImage4 from "@/assets/images/bible/card-4.webp";
import CardImage5 from "@/assets/images/bible/card-5.webp";
import CardImage6 from "@/assets/images/bible/card-6.webp";

import DisclaimerComponent from "@/components/DisclaimerComponent";
import CustomButton from "@/components/CustomButton";

const CustomCard = ({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) => {
  return (
    <div className="flex w-full md:w-[48vw] h-160 px-2 flex-col items-center justify-center text-center bg-[#181818]">
      <div className="py-20 h-60 flex items-center justify-center">
        <Image src={image} alt={title} className="w-54" />
      </div>
      <h3 className="text-4xl font-bold mt-10">{title}</h3>
      <p className="text-lg mt-3">{description}</p>
      <Link href={buttonLink} className="mt-6">
        <CustomButton
          text={buttonText}
          handleButtonClick={() => {}}
          isActive={false}
          index={0}
        />
      </Link>
    </div>
  );
};

export default function Bible() {
  return (
    <div className="mx-auto px-4 mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Bitcoin-YAY
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">Bible</h1>
        <Image
          src={ArtImage1}
          alt="Art Image 1"
          className="w-100 md:w-150 lg:w-320"
        />
        <p className="text-lg font-light max-w-140">
          BTCY Bible Is the essential documentation—whitepaper, tokenomics,
          governance, and ecosystem design—for understanding and building within
          the BTCY network.
        </p>
      </div>
      <div className="mt-40 max-w-screen overflow-hidden">
        <Image src={ArtImage2} alt="Art Image 2" className="min-w-200" />
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-40">
        <h2 className="text-5xl md:text-7xl font-bold">
          What’s inside BTCY Bible
        </h2>
        <p className="text-xl mt-4">
          Core docs—whitepaper, tokenomics, and governance for BTCY.
        </p>
      </div>

      <div className="flex items-center justify-center w-full mt-20">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomCard
            image={CardImage1}
            title="Story"
            description="A Crypto based lottery where you can earn big rewards"
            buttonText="Read More"
            buttonLink="/bible/story"
          />
          <CustomCard
            image={CardImage6}
            title="Yatoshi Nakamoto"
            description="Satoshi Nakamoto’s sibling"
            buttonText="Read More"
            buttonLink="/bible/yatoshi"
          />
          <CustomCard
            image={CardImage2}
            title="Whitepaper"
            description="Project guide"
            buttonText="Read More"
            buttonLink="/bible/whitepaper"
          />
          <CustomCard
            image={CardImage3}
            title="Tokenomics"
            description="Crypto Exchange where you Buy/Sell and Convert Crypto Currencies"
            buttonText="Read More"
            buttonLink="/bible/tokenomics"
          />
          <CustomCard
            image={CardImage4}
            title="bitcoin-yay Blockchain"
            description="Dynamic, AI-optimized ecosystem. "
            buttonText="Read More"
            buttonLink="/blockchain"
          />
          <CustomCard
            image={CardImage5}
            title="bitcoin-yay Wallet"
            description="A Crypto based lottery where you can earn big rewards"
            buttonText="Read More"
            buttonLink="/bible/bitcoin-yay-wallet"
          />
        </div>
      </div>

      <div className="mt-20 px-2 md:px-20 xl:px-40">
        <DisclaimerComponent />
      </div>
    </div>
  );
}
