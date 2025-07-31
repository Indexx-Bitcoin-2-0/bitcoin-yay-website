"use client";

import Image from "next/image";
import Link from "next/link";

import TradingViewWidgets from "@/components/TradingViewWidgets";
import OrderBook from "@/components/OrderBook";
import CustomButton2 from "@/components/CustomButton2";

import ConnectBUttonImage from "@/assets/images/buttons/dex-button.webp";

import AlchemyGatewayIcon1 from "@/assets/images/alchemy/alchemy-gateway-logo.webp";
import AlchemyGatewayIcon2 from "@/assets/images/alchemy/alchemy-gateway-logo-primary.webp";
import AlchemyTradeIcon1 from "@/assets/images/alchemy/alchemy-trade-logo.webp";
import AlchemyTradeIcon2 from "@/assets/images/alchemy/alchemy-trade-logo-primary.webp";

import ArtImage1 from "@/assets/images/alchemy/home/art-1.webp";

export default function AlchemyTradePage() {
  return (
    <div className="max-w-[2000px] mx-auto">
      <div className="mx-auto mt-50 px-4 md:px-20 xl:px-40 relative">
        <div className="flex flex-col items-center justify-center">
          <p className="max-w-200 text-center text-xl">
            Alchemy is BTCY’s gamified system where users stake tokens for a
            chance at rewards or losses, using game theory to boost engagement
            and control inflation.
          </p>
          <div
            id="alchemy-options"
            className="mt-10 flex gap-20 md:gap-40 justify-center items-center"
          >
            <Link
              href="/alchemy#alchemy-gateway"
              className="flex flex-col items-center justify-center group"
            >
              <div className="h-32 flex justify-center items-center">
                <Image
                  src={AlchemyGatewayIcon1}
                  alt="Alchemy Gateway"
                  className="w-24 group-hover:hidden"
                />
                <Image
                  src={AlchemyGatewayIcon2}
                  alt="Alchemy Gateway"
                  className="w-24 hidden group-hover:block"
                />
              </div>
              <p className="text-lg md:text-2xl font-semibold text-center group-hover:text-primary ">
                Alchemy
                <br />
                Gateway
              </p>
            </Link>
            <Link
              href="/alchemy/trade"
              className="flex flex-col items-center justify-center group"
            >
              <div className="h-32 flex justify-center items-center">
                <Image
                  src={AlchemyTradeIcon1}
                  alt="Alchemy Trade"
                  className="w-24 group-hover:hidden"
                />
                <Image
                  src={AlchemyTradeIcon2}
                  alt="Alchemy Trade"
                  className="w-24 hidden group-hover:block"
                />
              </div>
              <p className="text-lg md:text-2xl font-semibold text-center group-hover:text-primary ">
                Alchemy
                <br />
                Trade
              </p>
            </Link>
          </div>
        </div>
        <div className="mt-40 flex flex-col lg:flex-row justify-between">
          <div className="flex">
            <div className="mr-2 lg:mr-4 min-w-10">
              <Image
                src={AlchemyTradeIcon1}
                alt="Alchemy Logo"
                className="w-20 lg:w-18"
              />
            </div>
            <div className="">
              <h1 className="text-4xl md:text-6xl font-semibold">
                Alchemy Trade
              </h1>
              <p className="mt-4 text-xl max-w-200">
                A peer-to-peer trading of BTCY tokens between users through a
                decentralized order book, with flexible pricing independent of
                the pegged BTCY:BTC price.
              </p>
            </div>
          </div>
          <div className="mt-10 lg:mt-2 flex gap-20 justify-center p-4">
            <CustomButton2
              text="Connect"
              image={ConnectBUttonImage}
              link="/coming-soon"
              imageStyling="w-30"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col lg:flex-row gap-2 p-2 lg:p-6">
        <div className="w-full lg:w-3/4">
          <TradingViewWidgets />
        </div>
        <div className="w-full lg:w-1/4">
          <div className="">
            <OrderBook />
          </div>
          <div className="mt-10 lg:mt-4 flex gap-20 md:gap-20 justify-center items-center">
            <CustomButton2
              text="Buy"
              image={ConnectBUttonImage}
              link="#"
              imageStyling="w-30"
            />
            <CustomButton2
              text="Sell"
              image={ConnectBUttonImage}
              link="#"
              imageStyling="w-30"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-80 pl-4 md:pl-20 xl:pl-40">
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-2xl px-4">
          <h3 className="text-5xl md:text-8xl font-bold mt-4">How It Works</h3>
          <h4 className="mt-10 text-3xl font-bold">Market Roles</h4>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-5xl text-lg md:text-2xl">
              <thead>
                <tr>
                  <th className="text-left font-bold text-xl md:text-3xl py-4 pr-8 md:pr-16 w-1/3">
                    Role
                  </th>
                  <th className="text-left font-bold text-xl md:text-3xl py-4 w-2/3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left py-3 pr-8 md:pr-16 align-top">
                    Buyer
                  </td>
                  <td className="text-left py-3 align-top">
                    Places a bid to purchase BTCY
                  </td>
                </tr>
                <tr>
                  <td className="text-left py-3 pr-8 md:pr-16 align-top">
                    Seller
                  </td>
                  <td className="text-left py-3 align-top">
                    Places an ask to sell BTCY
                  </td>
                </tr>
                <tr>
                  <td className="text-left py-3 pr-8 md:pr-16 align-top">
                    Gateway
                  </td>
                  <td className="text-left py-3 align-top">
                    Matches orders, executes trade, takes fee
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={ArtImage1}
            alt="Art Image 3"
            className="w-full md:w-120 xl:w-160 2xl:w-200"
          />
        </div>
      </div>
    </div>
  );
}
