"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/home/art-1.webp";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";

import FreeMiningButtonImage from "@/assets/images/alchemy/home/free-art.webp";
import PowerMiningButtonImage from "@/assets/images/alchemy/home/power-mining-art.webp";
import QuantumMiningButtonImage from "@/assets/images/alchemy/home/quantum-art.webp";

import ElectricMiningButtonImage from "@/assets/images/alchemy/home/electric-art.webp";
import ElectricMiningButtonImage2 from "@/assets/images/alchemy/home/electric2-art.webp";
import TurbineMiningButtonImage from "@/assets/images/alchemy/home/turbo-art.webp";
import TurbineMiningButtonImage2 from "@/assets/images/alchemy/home/turbo2-art.webp";
import NuclearMiningButtonImage from "@/assets/images/alchemy/home/nuclear-art.webp";
import NuclearMiningButtonImage2 from "@/assets/images/alchemy/home/nuclear-02-art.webp";

import BgArtImage1 from "@/assets/images/bitcoin-art-3.svg";
import BgArtImage2 from "@/assets/images/bitcoin-art-4.svg";

import AlchemyGatewayIcon1 from "@/assets/images/alchemy/alchemy-gateway-logo.webp";
import AlchemyGatewayIcon2 from "@/assets/images/alchemy/alchemy-gateway-logo-primary.webp";
import AlchemyTradeIcon1 from "@/assets/images/alchemy/alchemy-trade-logo.webp";
import AlchemyTradeIcon2 from "@/assets/images/alchemy/alchemy-trade-logo-primary.webp";

import CustomButton2 from "@/components/CustomButton2";

export default function AlchemyPage() {
  const [isPowerMiningActive, setIsPowerMiningActive] = useState(false);

  return (
    <div className="mx-auto mt-40 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col xl:flex-row ">
        <div className="flex w-full xl:w-[50%]">
          <div className="mt-6 mr-6 xl:min-w-25">
            <Image
              src={AlchemyLogo}
              alt="Alchemy Logo"
              className="w-16 md:w-25"
            />
          </div>
          <div className="w-9/10">
            <h1 className="text-5xl md:text-[120px] font-semibold">
              Alchemy
            </h1>
            <p className="mt-10 text-xl md:text-2xl">
              This is the beginning of the transformation layer between mined
              BTCY and real BTCY tokens on the Bitcoin Yay network. Inspired by
              the ancient idea of alchemy — turning base metals into gold — this
              gateway transforms raw mined rewards into real, liquid assets,
              ensuring fairness, sustainability, and long-term ecosystem growth.
            </p>
          </div>
        </div>
        <div className="mt-10 xl:mt-40 flex justify-center items-center -z-10 xl:absolute xl:top-0 xl:right-0">
          <Image
            src={ArtImage1}
            alt="Alchemy Art 1"
            className="w-100 md:w-160 xl:w-[800px] 2xl:w-[1000px]"
          />
        </div>
      </div>

      <div id="alchemy-options" className="mt-40 md:mt-160 flex gap-20 md:gap-40 px-10 justify-center items-center">
        <Link
          href="/alchemy#alchemy-gateway"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={AlchemyGatewayIcon2}
              alt="Alchemy Gateway"
              className="w-40 group-hover:hidden"
            />
            <Image
              src={AlchemyGatewayIcon1}
              alt="Alchemy Gateway"
              className="w-40 hidden group-hover:block"
            />
          </div>
          <p className="mt-6 text-lg md:text-4xl font-semibold text-center text-primary group-hover:text-secondary leading-12">
            Alchemy
            <br />
            Gateway
          </p>
        </Link>
        <Link
          href="/coming-soon"
          // href="/alchemy/trade"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={AlchemyTradeIcon2}
              alt="Alchemy Trade"
              className="w-40 group-hover:hidden"
            />
            <Image
              src={AlchemyTradeIcon1}
              alt="Alchemy Trade"
              className="w-40 hidden group-hover:block"
            />
          </div>
          <p className="mt-6 text-lg md:text-4xl font-semibold text-center text-primary group-hover:text-secondary leading-12">
            Alchemy
            <br />
            Trade
          </p>
        </Link>
      </div>

      <div className="mt-40 xl:mt-120 2xl:mt-160">
        <h2 className="text-4xl md:text-5xl xl:text-9xl font-bold text-center max-w-7xl mx-auto ">
          Turn your BTCY
          <br /> into passive income!
        </h2>
        <p className="mt-10 text-xl font-light text-center max-w-7xl mx-auto">
          Secure the network, earn rewards, and grow your holdings. Stake your
          Bitcoin Yay now and let your crypto work for you.
        </p>
        {/* <div className="flex justify-center items-center mt-20">
          <CustomButton2
            text="Start Alchemy"
            image={PointingButtonImage}
            imageStyling="w-20 md:w-30"
            link="#"
          />
        </div> */}
      </div>

      <div className="relative mt-100">
        <Image
          src={BgArtImage1}
          alt="Bg Art 1"
          className="absolute -top-60 left-0 -z-20"
        />
      </div>
      <div id="alchemy-gateway">
        <div className="flex justify-center items-center">
          <Image
            src={AlchemyGatewayIcon1}
            alt="Alchemy Gateway"
            className="w-36"
          />
        </div>
        <h2 className="mt-10 text-5xl md:text-7xl xl:text-[120px] font-semibold text-center">
          ALCHEMY GATEWAY
        </h2>
        <p className="mt-10 text-xl text-center">
          Select an input, start alchemy, and get a random multiplier result
          based on the category odds!
        </p>

        <div className="flex mt-30 gap-24 flex-wrap justify-center items-center max-w-4xl mx-auto">
          <Link
            href="/alchemy/free-mining"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={FreeMiningButtonImage}
                alt="Free Mining"
                className="w-40 group-hover:scale-105 transition-all duration-300"
              />
            </div>
            <p className="mt-2 text-lg font-semibold group-hover:text-primary">
              FREE MINING
            </p>
          </Link>
          <button
            type="button"
            onClick={() => setIsPowerMiningActive(!isPowerMiningActive)}
            className="flex flex-col items-center justify-center group cursor-pointer"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={PowerMiningButtonImage}
                alt="Electric Mining"
                className="w-42 group-hover:scale-105 transition-all duration-300 mb-8"
              />
            </div>
            <p
              className={`mt-4 text-lg font-semibold group-hover:text-primary ${
                isPowerMiningActive ? "text-primary" : ""
              }`}
            >
              POWER MINING
            </p>
          </button>
          <Link
            href="/alchemy/quantum"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={QuantumMiningButtonImage}
                alt="Electric Mining"
                className="w-50 group-hover:scale-105 transition-all duration-300 mb-4"
              />
            </div>
            <p className="mt-2 text-lg font-semibold group-hover:text-primary">
              QUANTUM MINING
            </p>
          </Link>
          {isPowerMiningActive && (
            <div className="flex flex-wrap gap-30 items-center justify-center">
              <Link
                href="/alchemy/electric"
                className="flex flex-col items-center justify-center group"
              >
                <div className="h-32 flex justify-center items-center">
                  <Image
                    src={ElectricMiningButtonImage}
                    alt="Electric Mining"
                    className="w-18 group-hover:hidden"
                  />
                  <Image
                    src={ElectricMiningButtonImage2}
                    alt="Electric Mining"
                    className="w-18 hidden group-hover:block"
                  />
                </div>
                <p className="mt-2 text-lg font-semibold group-hover:text-primary">
                  ELECTRIC
                </p>
              </Link>
              <Link
                href="/alchemy/turbo"
                className="flex flex-col items-center justify-center group"
              >
                <div className="h-32 flex justify-center items-center">
                  <Image
                    src={TurbineMiningButtonImage}
                    alt="Electric Mining"
                    className="w-28 group-hover:hidden"
                  />
                  <Image
                    src={TurbineMiningButtonImage2}
                    alt="Electric Mining"
                    className="w-28 hidden group-hover:block"
                  />
                </div>
                <p className="mt-2 text-lg font-semibold group-hover:text-primary">
                  TURBO
                </p>
              </Link>
              <Link
                href="/alchemy/nuclear"
                className="flex flex-col items-center justify-center group"
              >
                <div className="h-32 flex justify-center items-center">
                  <Image
                    src={NuclearMiningButtonImage}
                    alt="Electric Mining"
                    className="w-30 group-hover:hidden"
                  />
                  <Image
                    src={NuclearMiningButtonImage2}
                    alt="Electric Mining"
                    className="w-30 hidden group-hover:block"
                  />
                </div>
                <p className="mt-2 text-lg font-semibold group-hover:text-primary">
                  NUCLEAR
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-120">
        <Image
          src={BgArtImage2}
          alt="Bg Art 2"
          className="absolute -bottom-100 right-0 max-w-260 -z-20"
        />
      </div>

      <div className="">
        <div className="flex justify-center items-center">
          <Image
            src={AlchemyTradeIcon1}
            alt="Alchemy Trade"
            className="w-36"
          />
        </div>
        <h2 className="mt-10 text-5xl md:text-7xl xl:text-[120px] font-semibold text-center">
          ALCHEMY TRADE
        </h2>
        <div className="flex justify-center items-center mt-40">
          <CustomButton2
            text="Start Alchemy"
            image={PointingButtonImage}
            imageStyling="w-20 md:w-30"
            link="#alchemy-options"
          />
        </div>
      </div>

      <div className="mt-80 mb-80">
        <h2 className="text-5xl md:text-7xl xl:text-[120px] font-semibold">
          How Alchemy works
        </h2>
        <div className="mt-10 text-xl">
          <ul className="list-decimal leading-10 pl-4 md:pl-10">
            <li>
              Select Input Amount <br /> Choose how many BTCY to commit —
              options depend on your user tier (Free, Electric, Turbo, Nuclear,
              Quantum).
            </li>
            <li>
              Start Alchemy <br /> Click Start Alchemy → your BTCY enters a
              1-hour randomized process.
            </li>
            <li>
              Wait 1 Hour <br /> After 1 hour, the system reveals your outcome:
              Gain (small or big) Partial loss
            </li>
            <li>
              {" "}
              Receive Outcome <br /> Based on your multiplier (e.g., 0.5x, 1.2x,
              2x, 3x), you’ll see how much BTCY you get back.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-80 font-light flex flex-col gap-2 mb-40">
        <h3 className="text-xl font-semibold">Disclaimer</h3>
        <p>
          By participating in the BTCY Alchemy process, you acknowledge the
          following:
        </p>

        <p>Claim Options:</p>

        <p>CEX (Centralized Exchange – Indexx Exchange)</p>
        <p>
          Claiming to CEX will send your reward directly to your Indexx Exchange
          account.
        </p>
        <ul className="list-disc pl-4">
          <li>Fast processing</li>
          <li>No gas fees</li>
          <li>Managed by Indexx</li>
        </ul>

        <p>You need a registered and verified Indexx account.</p>

        <p>DEX (Decentralized Exchange – Wallet Claim, e.g., MetaMask)</p>
        <p>
          Claiming to DEX sends your reward to your connected blockchain wallet.
        </p>
        <ul className="list-disc pl-4">
          <li>Full user control</li>
          <li>Can interact with DeFi, staking, swaps</li>
        </ul>

        <p>You pay gas fees (on the blockchain network)</p>
        <p>
          Make sure your wallet is connected and ready (MetaMask, WalletConnect,
          etc.)
        </p>

        <p>Important Notes:</p>
        <ul className="list-disc pl-4">
          <li>You can “only claim once per reward”</li>
          <li>
            Claims are “recorded on-chain or in our backend” for verification.
          </li>
          <li>
            If you choose DEX, ensure you understand how to manage blockchain
            wallets.
          </li>
          <li>Lost tokens due to incorrect addresses are “non-recoverable”.</li>
          <li>
            For CEX claims, Indexx manages all custody and record-keeping.
          </li>
        </ul>

        <p>Security Reminder:</p>
        <ul className="list-disc pl-4">
          <li>Never share your wallet private keys or seed phrases.</li>
          <li>Only use official Indexx DApp links for claiming.</li>
        </ul>
      </div>
    </div>
  );
}
