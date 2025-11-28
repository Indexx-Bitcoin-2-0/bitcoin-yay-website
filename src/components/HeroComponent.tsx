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
    <div className="h-full relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:px-20 lg:px-40">
      <div className="w-full z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4">
          Bitcoin Yay
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4 max-w-2/3">
          The Micro Token of Bitcoin
        </h3>
        <p className="text-lg md:text-xl lg:text-2xl hidden md:block max-w-1/2 mt-4">
          A Bitcoin-backed micro-token powering real utility, mining, and
          community ownership
        </p>
      </div>
      <Image
        src={Image1}
        alt="Carousel Frame"
        className="absolute bottom-0 right-0 md:right-10 lg:right-20 w-60 md:w-80 lg:w-100 xl:w-120 2xl:w-140 opacity-80 md:opacity-100"
      />
    </div>
  );
};

const CarouselFrame2 = () => {
  return (
    <div className="h-full relative flex flex-col md:flex-row justify-between items-center text-center md:text-left md:px-20 lg:px-40">
      <div className="w-full z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4">
          Mobile Mining
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4">is Here!</h3>
        <p className="text-lg md:text-xl xl:text-2xl hidden md:block max-w-1/2 mt-4">
          AI-Powered Mobile Mining. No Expensive Rigs. Just You, Your Phone, and
          BTCY. Earn Bitcoin Yay effortlessly by participating daily. Fully
          decentralized, mobile-first.
        </p>
      </div>
      <Image
        src={Image2}
        alt="Carousel Frame"
        className="absolute bottom-0 right-0 md:right-10 lg:right-20 w-60 md:w-80 lg:w-100 xl:w-120 2xl:w-140 opacity-80 md:opacity-100"
      />
    </div>
  );
};

const CarouselFrame3 = () => {
  return (
    <div className="h-full relative flex flex-col lg:flex-row justify-between items-center text-center md:text-left md:px-20 lg:px-40">
      <div className="w-full flex flex-col justify-center z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold my-2 md:my-4 md:max-w-2/3">
          Pick Up Your Gopher to Mine BTCY
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl hidden md:block max-w-1/2 mt-4">
          Start free. Upgrade for speed, perks, and priority rewards. Everyone
          starts somewhere.
        </p>
      </div>
      <Image
        src={Image3}
        alt="Carousel Frame"
        className="absolute bottom-0 right-0 md:right-10 lg:right-20 w-60 md:w-80 lg:w-100 xl:w-120 2xl:w-140 opacity-80 md:opacity-100"
      />
    </div>
  );
};

const CarouselFrame4 = () => {
  return (
    <div className="h-full relative flex flex-col md:flex-col-reverse lg:flex-col justify-between items-center text-center md:text-left md:px-20 lg:px-40">
      <div className="w-full flex justify-center order-2 md:order-1">
        <Image
          src={Image4}
          alt="Carousel Frame"
          className="w-48 md:w-64 lg:w-80 xl:w-100 2xl:w-120"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center text-center order-1 md:order-2 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2 md:mt-4">
          Built on Bitcoin.
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2">
          Powered by You.
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mt-4 hidden md:block lg:max-w-1/2">
          Every mined token earns you ownership. The more you contribute, the
          more you shape the future.
        </p>
      </div>
    </div>
  );
};

const CarouselFrame5 = () => {
  return (
    <div className="h-full relative flex flex-col md:flex-col-reverse lg:flex-col justify-between items-center text-center md:text-left md:px-20 lg:px-40">
      <div className="w-full flex justify-center order-2 md:order-1">
        <Image
          src={Image5}
          alt="Carousel Frame"
          className="w-56 md:w-72 lg:w-80 xl:w-100 2xl:w-120"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center text-center order-1 md:order-2 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2 md:mt-4">
          Use BTCY
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2">
          for Peer-to-peer
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold my-2 md:my-4">Payment Transaction</h3>
        <p className="text-lg md:text-xl lg:text-2xl mt-4 hidden md:block lg:max-w-1/2">
          From gaming to gifting – BTCY is a real micro-currency for the new
          digital world.
        </p>
      </div>
    </div>
  );
};

const CarouselFrame6 = () => {
  return (
    <div className="h-full relative flex items-center justify-center">
      <Image
        src={Image6a}
        alt="Carousel Frame"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-40 md:w-60 lg:w-80 xl:w-100 opacity-60 md:opacity-100"
      />
      <div className="text-center flex flex-col items-center z-10 px-4">
        <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[120px] font-bold leading-tight">
          21
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2">Trillion</h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mt-2 max-w-2/3">
          BTCY for Everyone to Mine
        </h3>
        <p className="text-base md:text-lg lg:text-xl mt-4 hidden md:block max-w-md lg:max-w-lg">
          Bitcoin-YAY: The micro token of Bitcoin, bringing fun and energy to
          every satoshi-sized move!
        </p>
      </div>
      <Image
        src={Image6b}
        alt="Carousel Frame"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-40 md:w-60 lg:w-80 xl:w-100 opacity-60 md:opacity-100"
      />
    </div>
  );
};

const CarouselFrame7 = () => {
  return (
    <div className="h-full relative flex flex-col lg:flex-row justify-between items-center text-center md:text-left md:px-20 lg:px-40 gap-6 md:gap-10">
      <div className="w-full lg:w-2/3 z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4">
          Who Is
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold my-2 md:my-4">
          Bitcoin Satoshi
        </h2>
        <p className="mt-4 md:mt-6 text-base md:text-lg xl:text-xl 2xl:text-2xl hidden md:block max-w-3xl lg:max-w-4xl leading-relaxed">
          In the digital shadows, the mysterious Satoshi entrusted a creator to
          craft a meme coin, NFTs, and ordinals that reflected his
          essence—without revealing his identity. Each piece bore a symbolic
          mask, the emblem of his anonymity. Entrusted to Indexx.ai, the Who is
          Bitcoin Satoshi tokens became a legacy of mystery, forever echoing one
          question: Who is Bitcoin Satoshi?
        </p>
      </div>
      <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
        <Image
          src={Image7}
          alt="Carousel Frame"
          className="w-48 md:w-64 lg:w-80 xl:w-100 2xl:w-120"
        />
      </div>
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
      className="mt-20 relative w-full h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px] overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame1 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame2 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame3 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame4 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 4 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame5 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 5 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame6 />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === 6 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <CarouselFrame7 />
      </div>
    </div>
  );
}
