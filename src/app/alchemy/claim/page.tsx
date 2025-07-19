import Image from "next/image";

import ArtImage1 from "@/assets/images/alchemy/claim/art-1.webp";

import NodeButtonImage from "@/assets/images/buttons/nodes-button.webp";
import DexButtonImage from "@/assets/images/buttons/dex-button.webp";

import CustomButton2 from "@/components/CustomButton2";

export default function Claim() {
  return (
    <div className="mx-auto mt-40 lg:mt-60 px-4 md:px-20 xl:px-40">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-20">
        <Image src={ArtImage1} alt="art 1" className="w-60 md:w-60 xl:w-80"/>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold">Claim your BTCY</h1>
          <h4 className="mt-10 md:mt-20 text-3xl md:text-5xl font-semibold">Chose your ------</h4>
        </div>
      </div>
      <div className="mt-20 mb-40 flex items-center justify-center gap-40 px-10">
        <CustomButton2
          image={NodeButtonImage}
          text="CEX"
          link="#"
          imageStyling="w-30"
        />
        <CustomButton2
          image={DexButtonImage}
          text="DEX"
          link="#"
          imageStyling="w-30"
        />
      </div>
    </div>
  );
}
