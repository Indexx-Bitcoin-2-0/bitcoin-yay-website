"use client";

import Image from "next/image";
import React from "react";


import top5Miners from "@/assets/images/airdrop/top5miner.svg"
import top10Miners from "@/assets/images/airdrop/top10miner.svg"
import top35Miners from "@/assets/images/airdrop/top35miner.svg"

import ArtImage1 from "@/assets/images/btcy-airdrop/btcyairdrop.png"

export default function PrizeBreakdown() {
    return (
        <div className="mt-80 px-4 md:px-20 xl:px-20">
            <h2 className="text-6xl lg:text-8xl  text-center mb-10">PRIZE BREAKDOWN</h2>
            <h3 className="text-2xl lg:text-4xl font-semibold text-primary text-center">Total Pool: $50,000 USD</h3>

            <div className="mt-20 flex flex-col items-center gap-10">
                <p className="text-2xl lg:text-4xl text-center max-w-4xl">
                    The total investment pool is split equally among all eligible participants.
                </p>
                <div className="relative">
                    <Image
                        src={ArtImage1}
                        alt="Airdrop Art"
                        className="w-80 md:w-120"
                    />
                </div>
            </div>

            <div className="mt-40 max-w-4xl mx-auto text-center">
                <h3 className="text-4xl lg:text-6xl font-bold text-[#FF8A00] mb-10">Didn’t qualify?</h3>
                <p className="text-xl lg:text-3xl mb-10">
                    If you don’t reach 100 BTCY during the eligibility window, you won’t qualify for this round, but future mining events may follow.
                </p>
                <p className="text-xl lg:text-3xl font-semibold text-[#FF8A00]">
                    Stay active. Mine consistently. Participate in the ecosystem.
                </p>
            </div>
        </div>
    );
}
