import Image from "next/image";

import ArtImage1 from "@/assets/images/alchemy/congratulations/art-1.webp";
import ArtImage2 from "@/assets/images/alchemy/congratulations/art-2.webp";
import ArtImage3 from "@/assets/images/alchemy/congratulations/art-3.webp";

import StarButtonImage from "@/assets/images/buttons/star-button.webp";

import CustomButton2 from "@/components/CustomButton2";

export default function CongratulationsPage() {
  return (
    <div className="mx-auto mt-20 lg:mt-60 relative">
      <div className="absolute w-full">
        <Image
          src={ArtImage2}
          alt="Art 2"
          className="w-[20vw] -top-10 right-0 absolute"
        />
        <Image
          src={ArtImage3}
          alt="Art 3"
          className="w-[20vw] -top-10 left-0 absolute"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image src={ArtImage1} alt="Art 1" className="w-[40vw]" />
        <h1 className="mt-10 text-8xl font-bold">Congratulations</h1>
      </div>
      <div className="mt-30 flex flex-col items-center justify-center">
        <h2 className=" text-6xl ">You gained</h2>
        <p className="text-[160px] font-bold">
          3,000 <span className="text-8xl">BTCY</span>
        </p>
      </div>
      <div className="mt-20 mb-40 flex items-center justify-center">
        <CustomButton2 image={StarButtonImage} text="Claim" link="#" imageStyling="w-30" />
      </div>
    </div>
  );
}
