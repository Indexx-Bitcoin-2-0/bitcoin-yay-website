"use client";

import Image from "next/image";
import React from "react";


import pricePool1 from "@/assets/images/airdrop/price_pool_1.svg";
import pricePool2 from "@/assets/images/airdrop/price_pool_2.svg";
import pricePool3 from "@/assets/images/airdrop/price_pool_3.svg";
import pricePool4 from "@/assets/images/airdrop/price_pool_4.svg";

export default function PrizeBreakdown() {
    return (
        <div className="mt-80 px-4 md:px-20 xl:px-20">
            <h2 className="text-6xl lg:text-8xl text-center font-bold">PRIZE BREAKDOWN</h2>
            <h3 className="mt-4 text-3xl lg:text-5xl font-bold text-primary text-center">Total Pool: $150 USDT</h3>

            <p className="mt-20 text-2xl lg:text-3xl text-center text-white font-light mx-auto max-w-4xl">
                The top 10 posts with the most engagement will receive rewards.
            </p>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-end">
                <div className="flex flex-col items-center text-center">
                    <Image src={pricePool1} alt="1st Place" className="w-60 md:w-80" />
                    <h4 className="mt-6 text-3xl font-bold">1st Place</h4>
                    <p className="mt-2 text-xl font-medium text-gray-400">$40 USDT</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image src={pricePool2} alt="2nd Place" className="w-50 md:w-70" />
                    <h4 className="mt-6 text-3xl font-bold">2nd Place</h4>
                    <p className="mt-2 text-xl font-medium text-gray-400">$25 USDT</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image src={pricePool3} alt="3rd Place" className="w-50 md:w-70" />
                    <h4 className="mt-6 text-3xl font-bold">3rd Place</h4>
                    <p className="mt-2 text-xl font-medium text-gray-400">$15 USDT</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image src={pricePool4} alt="4th-10th Place" className="w-45 md:w-60" />
                    <h4 className="mt-6 text-3xl font-bold">4th-10th Place</h4>
                    <p className="mt-2 text-xl font-medium text-gray-400">$10 USDT</p>
                </div>
            </div>

            <div className="mt-60 max-w-5xl mx-auto text-center">
                <h3 className="text-5xl lg:text-6xl font-bold text-primary mb-10">Didn’t Win?</h3>
                <p className="text-2xl lg:text-4xl text-white font-light mb-10">
                    If your post did not reach the top engagement rankings, don't worry.
                </p>
                <p className="text-2xl lg:text-4xl text-white font-semibold mb-10">
                    You will still get 7 days Nuclear Power Mining for participating.
                </p>
                <p className="text-2xl lg:text-3xl font-semibold text-primary">
                    Follow our social channels to stay updated on the next opportunities.
                </p>
            </div>
        </div>
    );
}

