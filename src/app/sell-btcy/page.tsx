"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ComingSoonImage from "@/assets/images/sell-btcy/coming-soon.png";
import { analytics } from "@/lib/analytics";
import CustomButton2 from "@/components/CustomButton2";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
export default function SellBTCYPage() {
  useEffect(() => {
    analytics.trackSellIntent({ amount: 0 });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg overflow-hidden py-20 px-4">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="container max-w-4xl mx-auto text-center z-10 mt-20">


        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Sell <span className="text-primary">BTCY</span>
        </h1>

        <p className="text-xl md:text-2xl text-tertiary mb-12 max-w-2xl mx-auto leading-relaxed">
          This feature will be <span className="text-white font-semibold">operational on 15 May</span>.
          Get ready for a seamless way to liquidate your tokens.
        </p>



        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Exclusive <span className="text-primary">30% Bonus Promotion</span>
          </h2>
          <p className="text-tertiary mb-10 text-lg md:text-xl">
            Don't wait! Take advantage of our current promotion while you wait for the selling feature to launch.
          </p>
          <div className="flex justify-center align-center">
            <CustomButton2
              onClick={() => window.open("/quantum-mining", "_blank")}
              text="Buy BTCY Now"
              image={CartButtonImage}
              imageStyling="w-40"
            />
          </div>


        </div>
      </div>
    </div>
  );
}
