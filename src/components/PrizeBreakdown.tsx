"use client";

import Image from "next/image";
import React from "react";


import top5Miners from "@/assets/images/airdrop/top5miner.svg"
import top10Miners from "@/assets/images/airdrop/top10miner.svg"
import top35Miners from "@/assets/images/airdrop/top35miner.svg"

export default function PrizeBreakdown() {
    return (
        <div className="mt-80 px-4 md:px-20 xl:px-20">
            <h2 className="text-6xl lg:text-8xl  text-center mb-10">PRIZE BREAKDOWN</h2>
            <h3 className="text-2xl lg:text-4xl font-semibold text-primary text-center">Total Pool: 50,000 BTCY</h3>

            {/* Hourly Prize Pool */}
            <div className="mt-20 w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
                <div className="max-w-100 text-center mx-auto">
                    <div className=" h-70 flex justify-center items-center">
                        <Image
                            src={top5Miners}
                            alt="What you get 1"
                            className="w-60"
                        />
                    </div>
                    <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
                        Top 5 Miners
                    </h4>
                    <p className="text-xl font-light">
                        2,000 BTCY each
                    </p>
                </div>
                <div className="max-w-100 text-center mx-auto">
                    <div className="h-70 flex justify-center items-center">
                        <Image
                            src={top10Miners}
                            alt="What you get 1"
                            className="w-64"
                        />
                    </div>
                    <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
                        Top 10 Miners
                    </h4>
                    <p className="text-xl font-light">
                        1,200 BTCY each
                    </p>
                </div>
                <div className="max-w-100 text-center mx-auto">
                    <div className=" h-70 flex justify-center items-center">
                        <Image
                            src={top35Miners}
                            alt="What you get 1"
                            className="w-64"
                        />
                    </div>
                    <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
                        Top 35 Miners
                    </h4>
                    <p className="text-xl font-light">
                        800 BTCY each        </p>
                </div>
            </div>

            <div className="mt-40 max-w-200 mx-auto">
                <h3 className="text-2xl lg:text-4xl font-semibold text-primary text-center mb-10">Didn’t win BTCY?</h3>
                <p className="text-xl lg:text-3xl text-center">Every registered miner who doesn’t win will receive <span className="font-semibold  text-primary">7 Days of Turbo Mining Power</span> as a loyalty reward.</p>
            </div>


        </div>
    );
}
