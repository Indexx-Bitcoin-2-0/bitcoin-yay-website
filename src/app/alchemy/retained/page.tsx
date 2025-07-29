"use client";

import Image from "next/image";

import ArtImage1 from "@/assets/images/alchemy/retained/art-1.webp";

// import RetryButtonImage from "@/assets/images/buttons/retry-button.webp";
// import StarButtonImage from "@/assets/images/buttons/star-button.webp";

// import CustomButton2 from "@/components/CustomButton2";

interface RetainedPageProps {
  retainedAmount?: number;
  inputAmount?: number;
  resultAmount?: number;
  multiplier?: number;
  sessionId?: string;
  tier?: string;
}

export default function RetainedPage({
  retainedAmount = 0,
}: RetainedPageProps) {
  return (
    <div className="mx-auto mt-20 lg:mt-60">
      <Image
        src={ArtImage1}
        alt="Art 1"
        className="w-60 md:w-80 xl:w-120 absolute top-40 left-20"
      />

      <div className="mt-120 lg:mt-80 flex flex-col items-center justify-center">
        <h2 className=" text-8xl font-bold">Ops!</h2>
        <h2 className="mt-20 text-4xl md:text-6xl">You retained</h2>
        <p className="mt-10 text-7xl md:text-[160px] font-bold">
          {retainedAmount.toLocaleString()}{" "}
          <span className="text-5xl md:text-8xl">BTCY</span>
        </p>
      </div>
      <div className="mt-20 xl:mt-40 mb-40 flex items-center justify-center gap-40 px-10">
        {/* <CustomButton2
          image={RetryButtonImage}
          text="Re-enter"
          link="#"
          imageStyling="w-30"
        />
        <CustomButton2
          image={StarButtonImage}
          text="Claim"
          link="#"
          imageStyling="w-30"
        /> */}
      </div>
    </div>
  );
}
