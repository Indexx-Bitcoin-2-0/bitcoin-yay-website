"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Image1 from "@/assets/images/home/hero-section/1.webp";
import Image2 from "@/assets/images/home/hero-section/2.webp";
import Image3 from "@/assets/images/home/hero-section/3.webp";
import Image4 from "@/assets/images/home/hero-section/4.webp";
import Image5 from "@/assets/images/home/hero-section/5.webp";
import Image6a from "@/assets/images/home/hero-section/6-1.webp";
import Image6b from "@/assets/images/home/hero-section/6-2.webp";
import Image7 from "@/assets/images/home/hero-section/7.webp";

const CarouselFrame1 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="w-full">
        <h2 className="text-5xl lg::text-7xl xl:text-7xl 2xl:text-9xl font-bold my-4">
          Bitcoin Yay
        </h2>
        <h3 className="text-xl lg-text-3xl xl:text-5xl 2xl:text-6xl my-4">
          The Micro token of Bitcoin
        </h3>
        <p className="text-2xl hidden md:block max-w-1/2">
          A Bitcoin-backed micro-token powering real utility, mining, and
          community ownership
        </p>
      </div>
      <Image
        src={Image1}
        alt="Carousel Frame"
        className="absolute -bottom-90 md:-right-20 md:-bottom-50 lg:-bottom-0 xl:-bottom-50 w-100 lg:w-120 xl:w-180"
      />
    </div>
  );
};

const CarouselFrame2 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="md:mt-20 w-full">
        <h2 className="text-5xl xl:text-7xl 2xl:text-8xl font-bold my-4">
          Mobile Mining
        </h2>
        <h3 className="text-4xl xl:text-5xl 2xl:text-7xl my-4">is Here!</h3>
        <p className="text-xl xl:text-2xl hidden md:block max-w-1/2">
          AI-Powered Mobile Mining. No Expensive Rigs. Just You, Your Phone, and
          BTCY. Earn Bitcoin Yay effortlessly by participating daily. Fully
          decentralized, mobile-first.
        </p>
      </div>
      <Image
        src={Image2}
        alt="Carousel Frame"
        className="absolute -bottom-110 md:-right-20 md:-bottom-100 lg:-bottom-0 xl:-bottom-50 2xl:-bottom-100 w-100 xl:w-140 2xl:w-170"
      />
    </div>
  );
};

const CarouselFrame3 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[500px] xl:h-[700px] relative flex flex-col lg:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="w-full flex flex-col justify-center">
        <h2 className="text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold my-4 md:max-w-2/3">
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
        className="absolute -bottom-90 md:-right-20 md:-bottom-50 w-100 lg:w-140 xl:w-180"
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
          className="w-80 md:w-120 lg:w-180 md:-mt-16"
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

const CarouselFrame5 = () => {
  return (
    <div className="h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col-reverse mt-60 md:mt-0 md:flex-col justify-between items-center text-center md:text-left md:mx-20 lg:mx-40">
      <div className="w-full flex justify-center mt-20">
        <Image
          src={Image5}
          alt="Carousel Frame"
          className="w-100 md:w-140 lg:w-200 md:-mt-16"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <h2 className="text-6xl lg:text-8xl font-bold mt-4 md:max-w-200">
          Use BTCY
        </h2>
        <h2 className="text-5xl lg:text-8xl font-bold mt-2 md:max-w-200">
          for Peer-to-peer
        </h2>
        <h3 className="text-3xl lg:text-5xl my-4">payement transaction</h3>
        <p className="text-2xl mt-4 hidden md:block lg:max-w-1/2">
          From gaming to gifting – BTCY is a real micro-currency for the new
          digital world.
        </p>
      </div>
    </div>
  );
};

const CarouselFrame6 = () => {
  return (
    <div className="relative mt-10">
      <Image
        src={Image6a}
        alt="Carousel Frame"
        className="absolute left-0 top-40 md:-top-10 lg:-top-20 w-60 md:w-100 lg:w-120"
      />
      <div className="text-center flex flex-col items-center">
        <h2 className="text-8xl lg:text-[200px] xl:text-[250px] 2xl:text-[350px] font-bold xl:leading-60 2xl:leading-100">
          21
        </h2>
        <h2 className="text-7xl lg:text-6xl xl:text-8xl font-bold">Trillion</h2>
        <h3 className="text-3xl lg:text-4xl xl:text-5xl">
          BTCY for everyone to mine
        </h3>
        <p className="text-2xl lg:text-xl mt-4 hidden md:block md:max-w-120 lg:max-w-120">
          Bitcoin-YAY: The micro token of Bitcoin, bringing fun and energy to
          every satoshi-sized move!
        </p>
      </div>
      <Image
        src={Image6b}
        alt="Carousel Frame"
        className="absolute right-0 top-40 md:-top-20 lg:-top-60 w-60 md:w-100 lg:w-120"
      />
    </div>
  );
};

const CarouselFrame7 = () => {
  return (
    <div className="mt-10 h-[300px] md:h-[300px] lg:h-[700px] relative flex flex-col lg:flex-row justify-between items-center text-center md:text-left md:mx-20 lg:mx-40 gap-10">
      <div className="lg:mt-10 w-full">
        <h2 className="text-5xl xl:text-7xl 2xl:text-8xl font-bold my-4">
          Who Is
        </h2>
        <h2 className="mt-4 text-5xl xl:text-7xl 2xl:text-8xl font-bold my-4">
          Bitcoin Satoshi
        </h2>
        <p className="mt-10 text-xl xl:text-2xl hidden md:block max-w-4xl leading-10">
          In the digital shadows, the mysterious Satoshi entrusted a creator to
          craft a meme coin, NFTs, and ordinals that reflected his
          essence—without revealing his identity. Each piece bore a symbolic
          mask, the emblem of his anonymity. Entrusted to Indexx.ai, the Who is
          Bitcoin Satoshi tokens became a legacy of mystery, forever echoing one
          question: Who is Bitcoin Satoshi?
        </p>
      </div>
      <Image
        src={Image7}
        alt="Carousel Frame"
        className=" w-80 xl:w-100 2xl:w-140"
      />
    </div>
  );
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(6);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 7);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused]);

  const handleMouseDown = () => setPaused(true);
  const handleMouseUp = () => setPaused(false);

  return (
    <div
      className="mt-20 relative w-full h-[300px] md:h-[600px] lg:h-[700px]"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
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
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame5 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 5 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame6 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          currentIndex === 6 ? "opacity-100" : "opacity-0"
        }`}
      >
        <CarouselFrame7 />
      </div>
    </div>
  );
}
