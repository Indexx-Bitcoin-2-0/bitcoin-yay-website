"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import ArtImage1 from "@/assets/images/alchemy/congratulations/art-1.webp";
import ArtImage2 from "@/assets/images/alchemy/congratulations/art-2.webp";
import ArtImage3 from "@/assets/images/alchemy/congratulations/art-3.webp";

// import StarButtonImage from "@/assets/images/buttons/star-button.webp";

// import CustomButton2 from "@/components/CustomButton2";

export default function CongratulationsPage() {
  const [alchemyResult, setAlchemyResult] = useState<{
    inputAmount: number;
    resultAmount: number;
    multiplier: number;
  } | null>(null);

  useEffect(() => {
    // Load alchemy result from localStorage
    const savedResult = localStorage.getItem("lastAlchemyResult");
    if (savedResult) {
      setAlchemyResult(JSON.parse(savedResult));
    }
  }, []);

  // Calculate gained amount (result - input)
  const gainedAmount = alchemyResult
    ? Math.max(0, alchemyResult.resultAmount - alchemyResult.inputAmount)
    : 0; // fallback value

  return (
    <div className="mx-auto mt-20 lg:mt-60 relative">
      <div className="absolute w-full">
        <Image
          src={ArtImage2}
          alt="Art 2"
          className="w-50 lg:w-80 2xl:w-100 top-20 md:-top-10 right-0 absolute hidden md:block"
        />
        <Image
          src={ArtImage3}
          alt="Art 3"
          className="w-50 lg:w-80 2xl:w-100 top-20 md:-top-10 left-0 absolute  hidden md:block"
        />
      </div>
      <div className="mt-40 flex flex-col items-center justify-center">
        <Image src={ArtImage1} alt="Art 1" className="w-80 lg:w-120 xl:w-180" />
        <h1 className="mt-10 text-5xl md:text-6xl xl:text-8xl font-bold">
          Congratulations
        </h1>
      </div>
      <div className="mt-20 md:mt-30 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl xl:text-6xl ">You gained</h2>
        <p className="mt-10 text-6xl md:text-7xl xl:text-[160px] font-bold">
          {gainedAmount.toLocaleString()}{" "}
          <span className="text-5xl md:text-6xl xl:text-8xl">BTCY</span>
        </p>
      </div>
      <div className="mt-20 mb-40 flex items-center justify-center">
        {/* <CustomButton2
          image={StarButtonImage}
          text="Claim"
          link="#"
          imageStyling="w-30"
        /> */}
      </div>
    </div>
  );
}
