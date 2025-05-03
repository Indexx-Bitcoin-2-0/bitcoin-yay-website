"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Image1 from "@/assets/images/home/hero-section/1.svg";
import Image2 from "@/assets/images/home/hero-section/2.svg";
import Image3 from "@/assets/images/home/hero-section/3.svg";
import Image4 from "@/assets/images/home/hero-section/4.svg";
// import Image5 from "@/assets/images/home/hero-section/5.svg";
// import Image6 from "@/assets/images/home/hero-section/6.svg";

const CarouselFrame1 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="w-full">
        <h2 className="text-5xl lg:text-9xl font-bold my-4">Bitcoin Yay</h2>
        <h3 className="text-xl lg:text-7xl my-4">The Micro token of Bitcoin</h3>
        <p className="text-2xl hidden md:block max-w-1/2">
          A Bitcoin-backed micro-token powering real utility, mining, and
          community ownership
        </p>
      </div>
      <Image
        src={Image1}
        alt="Carousel Frame"
        className="absolute -bottom-90 md:-right-20 md:-bottom-50 w-100 lg:w-180"
      />
    </div>
  );
};

const CarouselFrame2 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="md:mt-20 w-full">
        <h2 className="text-5xl lg:text-9xl font-bold my-4">Mobile Mining </h2>
        <h3 className="text-4xl lg:text-8xl my-4">is Here!</h3>
        <p className="text-xl lg:text-2xl hidden md:block max-w-1/2">
          AI-Powered Mobile Mining. No Expensive Rigs. Just You, Your Phone, and
          BTCY. Earn Bitcoin Yay effortlessly by participating daily. Fully
          decentralized, mobile-first.
        </p>
      </div>
      <Image
        src={Image2}
        alt="Carousel Frame"
        className="absolute -bottom-110 md:-right-20 md:-bottom-100 w-100 lg:w-180"
      />
    </div>
  );
};

const CarouselFrame3 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-5xl lg:text-9xl font-bold my-4 md:max-w-2/3">
          Pick Up Your Gopher to mine BTCY
        </h2>
        <p className="text-2xl hidden md:block max-w-1/2">
          Start free. Upgrade for speed, perks, and priority rewards. Everyone
          starts somewhere.
        </p>
      </div>
      <Image
        src={Image3}
        alt="Carousel Frame"
        className="absolute -bottom-90 md:-right-20 md:-bottom-50 w-100 lg:w-180"
      />
    </div>
  );
};

const CarouselFrame4 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col-reverse mt-60 md:mt-0 md:flex-col justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="w-full flex justify-center mt-20">
        <Image
          src={Image4}
          alt="Carousel Frame"
          className="w-80 md:w-100 lg:w-140 md:-mt-16"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <h2 className="text-5xl lg:text-7xl font-bold mt-4 md:max-w-2/3">
          Built on Bitcoin.
        </h2>
        <h2 className="text-5xl lg:text-7xl font-bold mt-2 md:max-w-2/3">
          Powered by You.
        </h2>
        <p className="text-2xl mt-4 hidden md:block lg:max-w-1/2">
          Every mined token earns you ownership. The more you contribute, the
          more you shape the future.
        </p>
      </div>
    </div>
  );
};

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[600px] lg:h-[700px]">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame1 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame2 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame3 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 3 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame4 />
      </div>
    </div>
  );
}
