"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CustomButton2 from "@/components/CustomButton2";

import ArtImage1 from "@/assets/images/quantum-mining/quantum-mining-icon.webp";
import ArtImage2 from "@/assets/images/quantum-mining/bitcoin-art-3.svg";
import ArtImage3 from "@/assets/images/quantum-mining/art-1.webp";
import ArtImage4 from "@/assets/images/quantum-mining/art-4.webp";
import ArtImage5 from "@/assets/images/quantum-mining/art-5.webp";

import USDTIcon from "@/assets/images/quantum-mining/tether.webp";
import USDCIcon from "@/assets/images/quantum-mining/usdc.webp";
import PaypalIcon from "@/assets/images/quantum-mining/paypal.webp";
import USDIcon from "@/assets/images/quantum-mining/usd.webp";
import BTCYIcon from "@/assets/images/quantum-mining/btcy-icon.webp";

import FlagIcon from "@/assets/images/quantum-mining/american-flag.webp";
import GlobeIcon from "@/assets/images/quantum-mining/globe-icon.webp";

import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
import BuyNowButtonImage from "@/assets/images/buttons/buy-now-button.webp";
import ButtonBorder from "@/assets/images/button-border.webp";
import ButtonBorderActive from "@/assets/images/button-border-active.webp";

const QuantumMiningPage = () => {
  const [payAmount, setPayAmount] = useState("");
  const [getAmount, setGetAmount] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(0);

  const handlePaymentOptionClick = (index: number) => {
    setSelectedPaymentOption(index);
  };

  const handlePayAmountChange = (value: string) => {
    setPayAmount(value);
    if (value && !isNaN(Number(value))) {
      const usdValue = Number(value);
      const btcyAmount = usdValue / 0.1;
      setGetAmount(btcyAmount.toFixed(2));
    } else {
      setGetAmount("");
    }
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked!");
  };

  return (
    <div className="mx-auto mt-40 max-w-[1800px] px-4 md:px-10 xl:px-20">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="mt-10 md:mt-20 w-full lg:w-[90%] flex flex-col justify-items-center">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold  lg:leading-28">
            Quantum Mining: <br /> Larger Scale Grade <br />
            BTCY Access
          </h2>

          <p className="mt-10 text-2xl md:text-3xl max-w-3xl">
            Secure large-scale BTCY purchases{" "}
            <span className="font-bold">($5K – $100K+)</span> via bank wires,
            stable coins, and global OTC solutions.
          </p>

          <div className="font-bold mt-10 flex flex-col justify-center items-center md:items-start">
            <CustomButton2
              image={RegisterButtonImage}
              text="Register"
              link="#"
              imageStyling="w-30"
            />
          </div>
        </div>
        <div className="xl:mt-26 flex justify-center items-center relative">
          <Image
            src={ArtImage1}
            alt="Quantum Mining Icon"
            className="w-90 md:w-140 xl:w-140 2xl:w-200"
          />
          <Image
            src={ArtImage2}
            alt="Bitcoin Art 3"
            className="w-90 md:w-140 xl:w-140 2xl:w-200 absolute top-0 left-1/2 xl:left-auto xl:right-0 transform xl:transform-none -translate-x-1/2 xl:translate-x-0 "
          />
        </div>
      </div>
      <div className="mt-40">
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-bold text-center">
          Register and Purchase BTCY
        </h1>
        <div className="flex flex-col lg:flex-row justify-center mt-20 gap-30 p-4 md:p-10 xl:p-20">
          <div>
            <div className="flex items-center gap-4">
              <Image src={FlagIcon} alt="Flag" className="w-10" />
              <h4 className="text-3xl md:text-4xl font-bold">For US Users</h4>
            </div>
            <ul className="list-disc text-2xl md:text-3xl mt-10 text-tertiary pl-6">
              <li>USDT / USDC</li>
              <li>USD bank wire</li>
              <li>Paypal</li>
              <li>USD credit/debit card (via Stripe, Circle)</li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4">
              <Image src={GlobeIcon} alt="Globe" className="w-10" />
              <h4 className="text-3xl md:text-4xl font-bold">
                For Global Users
              </h4>
            </div>
            <ul className="list-disc text-2xl md:text-3xl mt-10 text-tertiary pl-6">
              <li>USDT / USDC</li>
              <li>Local currencies: EUR, GBP, JPY, AED, INR</li>
              <li>Bank wires (SWIFT/SEPA)</li>
              <li>Paypal</li>
              <li>Local methods: Alipay, UPI, M-Pesa</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-40 border-2 border-bg3 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl xl:text-8xl font-bold text-center mb-8">
          Buy BTCY
        </h2>

        {/* Funding Progress */}
        <div className="mb-8 mt-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg md:text-2xl xl:text-3xl">USD Raised</span>
            <span className="text-lg md:text-2xl xl:text-3xl">
              556,435.925 / 750,000
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-6 relative">
            <div
              className="bg-orange-500 h-6 rounded-full"
              style={{ width: "79.3%" }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              79.3%
            </span>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="mb-8">
          <p className="text-xl md:text-[40px] font-semibold">1 BTCY = $0.1</p>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2 mb-8 justify-items-center">
          {[
            { name: "USDT", icon: USDTIcon, color: "green" },
            { name: "USDC", icon: USDCIcon, color: "blue" },
            { name: "Paypal", icon: PaypalIcon, color: "blue" },
            { name: "USD", icon: USDIcon, color: "yellow" },
          ].map((option, index) => (
            <div
              key={option.name}
              className="relative cursor-pointer transition-all duration-200"
              onClick={() => handlePaymentOptionClick(index)}
            >
              {index === selectedPaymentOption ? (
                <Image
                  src={ButtonBorderActive}
                  alt="Button Border Active"
                  className="w-32 md:w-38 lg:w-44"
                />
              ) : (
                <Image
                  src={ButtonBorder}
                  alt="Button Border"
                  className="w-32 md:w-38 lg:w-44"
                />
              )}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="mb-2">
                  <Image
                    src={option.icon}
                    alt={option.name}
                    className="w-10 h-10"
                  />
                </span>
                <span className="text-lg">{option.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xl mb-2">
              Pay with{" "}
              {["USDT", "USDC", "Paypal", "USD"][selectedPaymentOption]}
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg focus:outline-none focus:border-primary hover:border-primary "
                placeholder="0"
                value={payAmount}
                onChange={(e) => handlePayAmountChange(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span>
                  {selectedPaymentOption === 0 ? (
                    <Image src={USDTIcon} alt="USDT" className="w-10 h-10" />
                  ) : selectedPaymentOption === 1 ? (
                    <Image src={USDCIcon} alt="USDC" className="w-10 h-10" />
                  ) : selectedPaymentOption === 2 ? (
                    <Image
                      src={PaypalIcon}
                      alt="Paypal"
                      className="w-10 h-10"
                    />
                  ) : (
                    <Image src={USDIcon} alt="USD" className="w-14 h-10" />
                  )}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xl mb-2">You Get</label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg focus:outline-none focus:border-primary hover:border-primary "
                placeholder="0"
                value={getAmount}
                onChange={(e) => setGetAmount(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-primary text-xl">
                  <Image src={BTCYIcon} alt="BTCY" className="w-10 h-10" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="flex justify-center mt-20">
          <CustomButton2
            image={BuyNowButtonImage}
            text="With Quantum Power"
            onClick={() => handleBuyNow()}
            imageStyling="w-30"
          />
        </div>
      </div>

      <div className="mt-40 flex flex-col justify-center items-center">
        <Image src={ArtImage3} alt="Art 1" className="w-80 md:w-100" />
        <h1 className="mt-10 text-4xl md:text-6xl xl:text-8xl font-bold">
          Compliance
        </h1>

        <div className="mt-10 w-full max-w-6xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse border-b border-tertiary rounded-lg text-tertiary">
            <thead>
              <tr className="border-b ">
                <th className="text-left p-4 md:p-6 text-sm md:text-lg xl:text-xl font-semibold"></th>
                <th className="text-left p-4 md:p-6 text-sm md:text-lg xl:text-xl font-semibold">
                  US Version
                </th>
                <th className="text-left p-4 md:p-6 text-sm md:text-lg xl:text-xl font-semibold">
                  Global Version
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-tertiary">
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  KYC / AML
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl ">
                  Strict (OFAC-compliant)
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Aligned to local laws
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl ">
                  Institutional Onboarding
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl ">
                  Required
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Aligned to local laws
                </td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Licensing
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Registered MSB required
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  May need local licenses
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-start gap-20 mt-80">
        <Image
          src={ArtImage4}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-140 -ml-20"
        />
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-3xl md:text-5xl xl:text-7xl font-bold">
            Onboarding Flow Steps
          </h3>
          <ul className="list-disc mt-16 text-2xl md:text-3xl font-medium pl-4 md:pl-10 flex flex-col gap-16">
            <li>Register as Institutional Buyer</li>
            <li>Submit KYC Documents</li>
            <li>Get Verified</li>
            <li>Submit Buy Request (e.g., 50,000 USDT)</li>
            <li>Receive Invoice & Pay</li>
            <li>BTCY Tokens Delivered</li>
          </ul>
        </div>
      </div>

      {/* FAQs section */}
      <div className="my-80 flex flex-col items-center justify-center px-4 max-w-[1000px] mx-auto">
        <div className="w-full flex justify-between md:justify-start">
          <h2 className="text-5xl md:text-5xl lg:text-8xl font-bold mt-10">
            FAQs
          </h2>
          <Image src={ArtImage5} alt="Art Image 5" className="w-54" />
        </div>

        {/* FAQ Accordions */}
        <div className="w-full mt-16">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                What documents are required for KYC?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                To complete KYC for Quantum Mining, individuals must provide a
                government-issued photo ID, a recent proof of address (like a
                utility bill or bank statement), and a selfie holding their ID.
                For institutions, documents include a certificate of
                incorporation, company proof of address, ID of the authorized
                representative, and ownership structure details. In some cases,
                a source of funds declaration or AML questionnaire may also be
                required to comply with regulatory standards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Can I use a company account?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                temp
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Is there a minimum holding period?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                temp
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-bg3 last:border-b-1 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Do you offer escrow for large trades?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                temp
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default QuantumMiningPage;
