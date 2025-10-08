"use client";

import Image from "next/image";

import ArtImage1 from "@/assets/images/bitcoin/art-1.webp";
import ArtImage2 from "@/assets/images/bitcoin/art-2.webp";
import ArtImage3 from "@/assets/images/bitcoin/art-3.webp";
import ArtImage4 from "@/assets/images/bitcoin/art-4.webp";

import DisclaimerComponent from "@/components/DisclaimerComponent";

export default function Bitcoin() {
  return (
    <div className="container mx-auto px-4 overflow-visible mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          BTCY AND BTC
        </h2>
        <h1 className="text-5xl md:text-7xl font-semibold">Relationship</h1>
        <Image src={ArtImage1} alt="Art Image 1" className="mt-10" />
      </div>
      <div className="mt-20">
        <h3 className="text-xl md:text-3xl font-bold mb-2">
          BTC & BTCY Relationship:
        </h3>
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Bitcoin for the Next Billion
        </h2>
        <p className="text-lg font-light mb-6">
          In the beginning, Bitcoin was built for revolutionaries — developers,
          libertarians, and those who dared to imagine a world without
          centralized control. With a cap of 21 million coins, it promised
          scarcity and security. Over time, it grew into something greater — a
          store of value, a digital gold. But with success came limitations.
          Fees rose. Transactions slowed. Accessibility faded.
        </p>
        <p className="text-lg font-light mb-6">
          That’s where Bitcoin Yay (BTCY) enters the story.
        </p>
        <p className="text-lg font-light mb-6">
          Imagine taking the original spirit of Bitcoin — decentralization,
          sovereignty, ownership — and adapting it for mobile phones, real-world
          participation, and the next billion users. Not just those with mining
          rigs or finance degrees, but students, workers, creators, and
          communities in every corner of the world.
        </p>
      </div>
      <div className="mt-80 flex flex-col lg:flex-row justify-center items-center">
        <div className="relative lg:-left-40 w-full lg:w-1/2">
          <Image src={ArtImage2} alt="Art Image 2" className="" />
        </div>

        <div className="w-full lg:w-1/2 mt-20">
          <h2 className="text-lg md:text-2xl font-bold mb-2">
            The Conversion:
          </h2>
          <h1 className="text-5xl md:text-7xl font-semibold mb-2 leading-14 md:leading-20">
            Scarcity Meets Scalability
          </h1>
          <p className="text-lg font-light mb-4">
            We created a direct lineage from Bitcoin to Bitcoin Yay:
          </p>
          <p className="text-lg font-bold mb-4">1 BTC = 1,000,000 BTCY</p>
          <p className="text-lg font-light mb-4">
            This isn’t just a technical bridge — it’s a philosophical expansion.
          </p>
          <ul className="list-disc mb-4 pl-4">
            <li>21 Million BTC becomes 21 Trillion BTCY</li>
            <li>
              We mirror Bitcoin’s total supply, but scale it to allow
              micro-ownership, utility, and engagement
            </li>
            <li>
              BTCY isn&apos;t inflating the system — it’s fractionalizing the
              vision for broader access
            </li>
          </ul>
          <p className="text-lg font-light mb-4">
            Now, a single BTC can be divided into one million BTCY — meaning the
            value can reach across economies, from large investors to local
            merchants to everyday mobile users. BTCY becomes the currency of
            action, rewards, and digital work.
          </p>
        </div>
      </div>

      <div className="mt-80 flex flex-col items-center justify-center text-center">
        <h2 className="text-lg md:text-2xl mb-2 font-bold text-primary">
          MINING BY ENGAGEMENT
        </h2>
        <h1 className="text-5xl md:text-7xl font-semibold">Not Electricity</h1>
        <Image src={ArtImage3} alt="Art Image 3" className="mt-20 max-w-4xl" />
        <p className="text-lg font-light my-10 max-w-160">
          Bitcoin mining was designed for those who could afford hardware,
          space, and energy. But in 2025, the world has changed.
        </p>
      </div>

      <div className="mt-80 flex flex-col lg:flex-row justify-center items-center">
        <div className="relative w-full lg:w-1/2">
          <Image src={ArtImage4} alt="Art Image 2" className="" />
        </div>

        <div className="w-full lg:w-1/2 mt-20">
          <h2 className="text-lg md:text-2xl font-bold text-primary mb-2">
            BTCY introduces a new form of participation:
          </h2>
          <h1 className="text-5xl md:text-7xl font-semibold mb-2 leading-14 md:leading-20">
            Mobile-based, AI-verified Proof of Engagement
          </h1>
          <p className="text-lg font-light mt-20">
            Here, mining means tapping a button, inviting a friend, completing a
            task, or staking to secure the network. You mine not because you
            burn electricity, but because you contribute value to the ecosystem.
            <br />
            It’s mining for creators.
            <br />
            It’s mining for learners.
            <br />
            It’s mining for the billions who never got a chance to mine Bitcoin
            in 2011.
          </p>
        </div>
      </div>

      <DisclaimerComponent />
    </div>
  );
}
