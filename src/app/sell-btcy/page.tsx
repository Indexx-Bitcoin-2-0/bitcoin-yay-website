"use client";

import { useState, useEffect, type FormEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { PublicKey } from "@solana/web3.js";
import { isAddress } from "viem";

import CustomButton2 from "@/components/CustomButton2";
import LoginPopup from "@/components/LoginPopup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import HeroArtImage from "@/assets/images/salesPageArt.svg";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
import HowItWorksArt from "@/assets/images/quantum-mining/art-4.webp";
import ArtImage5 from "@/assets/images/quantum-mining/art-5.webp";

import KycVerificationPopup from "./KycVerificationPopup";
import SellStatusPopup from "./SellStatusPopup";
import TransactionFailedPopup from "./TransactionFailedPopup";

import { useAuth } from "@/contexts/AuthContext";
import { SELL_BTCY_CREATE_ORDER_ROUTE } from "@/routes";
import { fetchPrices } from "@/lib/quantum-mining";
import { getUserWalletBalance } from "@/lib/alchemy";

// Define the valid network types globally for clarity
type NetworkType = "ethereum" | "solana";
type CurrencyType = "USDT" | "USDC";

const DEFAULT_SELL_FAILURE_MESSAGE =
  "Something went wrong while processing your request. Please try again. If the issue continues, contact customer support.";
const BTCY_SYMBOL = "BTCY";
const TOKEN_WALLET_NETWORK = "Ying Yang Chain";

const getSellOrderFailureMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const message =
      responseData?.data?.message ??
      responseData?.message ??
      error.message;

    return typeof message === "string" && message.trim()
      ? message
      : DEFAULT_SELL_FAILURE_MESSAGE;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return DEFAULT_SELL_FAILURE_MESSAGE;
};

const getSellOrderResponseMessage = (responseData: unknown) => {
  if (
    responseData &&
    typeof responseData === "object" &&
    "data" in responseData
  ) {
    const nestedData = responseData.data;
    if (
      nestedData &&
      typeof nestedData === "object" &&
      "message" in nestedData &&
      typeof nestedData.message === "string" &&
      nestedData.message.trim()
    ) {
      return nestedData.message;
    }
  }

  return DEFAULT_SELL_FAILURE_MESSAGE;
};

const isValidSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

const isValidDestinationAddress = (address: string, network: NetworkType) => {
  if (network === "ethereum") {
    return isAddress(address);
  }

  return isValidSolanaAddress(address);
};

const getAddressValidationMessage = (
  currency: CurrencyType,
  network: NetworkType
) =>
  network === "ethereum"
    ? `Enter a valid Ethereum address for ${currency}.`
    : `Enter a valid Solana address for ${currency}.`;

export default function SellBtcyPage() {
  const [btcyAmount, setBtcyAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");

  const [network, setNetwork] = useState<NetworkType>("ethereum");
  const [currency, setCurrency] = useState<CurrencyType>("USDT");

  // State to hold the dynamic live price
  const [btcyPrice, setBtcyPrice] = useState<number>(0);

  const [isKycPopupOpen, setIsKycPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSellStatusPopupOpen, setIsSellStatusPopupOpen] = useState(false);
  const [isTransactionFailedPopupOpen, setIsTransactionFailedPopupOpen] =
    useState(false);
  const [transactionFailedMessage, setTransactionFailedMessage] = useState(
    DEFAULT_SELL_FAILURE_MESSAGE
  );

  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [btcyBalance, setBtcyBalance] = useState<number | null>(null);
  const [sellError, setSellError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();
  const [isKycCompleted] = useState(true);

  const currencyOptions: Record<NetworkType, CurrencyType[]> = {
    ethereum: ["USDT", "USDC"],
    solana: ["USDT", "USDC"],
  };

  // Fetch the live price when the component mounts
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const { btcyPrice } = await fetchPrices();
        setBtcyPrice(btcyPrice);
      } catch (error) {
        console.error("Failed to fetch live BTCY price:", error);
      }
    };
    loadPrices();
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadBtcyBalance = async () => {
      if (isAuthLoading) {
        return;
      }

      if (!user?.email) {
        setBtcyBalance(null);
        setBalanceLoading(false);
        return;
      }

      setBalanceLoading(true);
      try {
        const response = await getUserWalletBalance(
          user.email,
          BTCY_SYMBOL,
          TOKEN_WALLET_NETWORK
        );
        if (!isActive) return;

        if (response.error) {
          console.error("Failed to fetch BTCY token balance:", response.error);
          setBtcyBalance(null);
          return;
        }

        setBtcyBalance(response.data?.balance ?? 0);
      } catch (error) {
        if (!isActive) return;
        console.error("Failed to fetch BTCY balance:", error);
        setBtcyBalance(null);
      } finally {
        if (isActive) {
          setBalanceLoading(false);
        }
      }
    };

    loadBtcyBalance();

    return () => {
      isActive = false;
    };
  }, [user?.email, isAuthLoading]);

  // Calculate the converted amount based on live price
  const expectedReceiveAmount = btcyAmount ? Number(btcyAmount) * btcyPrice : 0;
  const formattedBtcyBalance =
    btcyBalance !== null
      ? btcyBalance.toLocaleString("en-US", {
          maximumFractionDigits: 8,
        })
      : null;
  const balanceLabel = user?.email
    ? `Your BTCY Token Balance: ${
        balanceLoading ? "Loading..." : (formattedBtcyBalance ?? "Unavailable")
      } BTCY`
    : "Log in to view your BTCY token balance.";
  const requestedBtcyAmount = Number(btcyAmount);
  const destinationWallet = usdtAddress.trim();

  const getAmountValidationError = (showRequiredError: boolean) => {
    if (!btcyAmount) {
      return showRequiredError ? "Enter a valid BTCY amount." : null;
    }

    if (Number.isNaN(requestedBtcyAmount) || requestedBtcyAmount < 1) {
      return "Enter a valid BTCY amount.";
    }

    if (btcyBalance !== null && requestedBtcyAmount > btcyBalance) {
      return `Amount exceeds your available balance of ${
        formattedBtcyBalance ?? "0"
      } BTCY.`;
    }

    return null;
  };

  const getAddressValidationErrorForField = (showRequiredError: boolean) => {
    if (!destinationWallet) {
      return showRequiredError
        ? `Enter your ${currency} destination wallet address.`
        : null;
    }

    if (!isValidDestinationAddress(destinationWallet, network)) {
      return getAddressValidationMessage(currency, network);
    }

    return null;
  };

  const amountError = getAmountValidationError(hasAttemptedSubmit);
  const addressError = getAddressValidationErrorForField(
    hasAttemptedSubmit || addressTouched
  );

  const handleSellRequest = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (loading) return;

    setHasAttemptedSubmit(true);
    setSellError(null);
    setTransactionFailedMessage(DEFAULT_SELL_FAILURE_MESSAGE);

    if (isAuthLoading) {
      setSellError("Checking your login status. Please wait.");
      return;
    }

    if (!user?.email) {
      setIsLoginPopupOpen(true);
      return;
    }

    if (balanceLoading) {
      setSellError("Checking your BTCY balance. Please wait.");
      return;
    }

    if (btcyBalance === null) {
      setSellError(
        "Unable to read your BTCY token balance. Please refresh or log in again."
      );
      return;
    }

    const nextAmountError = getAmountValidationError(true);
    const nextAddressError = getAddressValidationErrorForField(true);
    if (nextAmountError || nextAddressError) {
      return;
    }

    if (!isKycCompleted) {
      setIsKycPopupOpen(true);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        email: user.email,
        btcyAmount: requestedBtcyAmount,
        // Adding the dynamically converted USDT/USDC amount to the payload
        receiveAmount: expectedReceiveAmount,
        receiveCurrency: currency,
        destinationWallet,
        network,
      };

      const res = await axios.post(SELL_BTCY_CREATE_ORDER_ROUTE, payload);

      console.log("SELL ORDER RESPONSE:", res.data);

      if (res.data?.status === 200) {
        setIsSellStatusPopupOpen(true);
      } else {
        setTransactionFailedMessage(getSellOrderResponseMessage(res.data));
        setIsTransactionFailedPopupOpen(true);
      }
    } catch (error) {
      console.error("Sell Order Error:", error);
      setTransactionFailedMessage(getSellOrderFailureMessage(error));
      setIsTransactionFailedPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-3 w-full lg:w-auto">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-10">
              Sell BTCY — Convert
              <br />
              to {currency} Instantly
            </h1>
            <p className="text-xl md:text-2xl text-[#EAEAEA] mb-8 md:mb-10 max-w-xl">
              Add your {currency} wallet address on the selected network.
            </p>
            <p className="text-lg md:text-xl text-primary font-medium">
              Only verified users can sell BTCY.
            </p>
          </div>

          <div className="flex-2 w-full lg:w-auto flex items-center justify-center lg:justify-end">
            <Image
              src={HeroArtImage}
              alt="Falling BTCY Coins"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-40 border-0 md:border-1 border-bg2 rounded-2xl p-8 md:p-12 max-w-5xl mx-3 md:mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Sell Request Form
          </h2>
          <p className="text-xl md:text-2xl text-white font-medium mb-4">
            {/* Displaying dynamic price fallback */}1 BTCY = $
            {btcyPrice > 0 ? btcyPrice.toFixed(4) : "Loading..."}
          </p>
          <p className="text-lg md:text-xl text-primary font-bold">
            {balanceLabel}
          </p>
        </div>

        <form
          onSubmit={handleSellRequest}
          className="mx-auto flex flex-col gap-8 md:gap-10"
        >
          {/* BTCY Amount */}
          <div className="flex flex-col gap-3">
            <input
              type="number"
              value={btcyAmount}
              max={btcyBalance ?? undefined}
              onChange={(e) => {
                setBtcyAmount(e.target.value);
                setSellError(null);
              }}
              placeholder="Enter BTCY amount"
              className={`w-full px-4 py-3 border rounded-lg text-lg bg-transparent text-white focus:outline-none ${
                amountError ? "border-red-500" : "border-bg3"
              }`}
            />
            {amountError && (
              <span className="text-sm text-red-400 ml-2">{amountError}</span>
            )}
            {btcyAmount && (
              <span className="text-sm text-gray-400 ml-2">
                You will receive roughly:{" "}
                <strong className="text-white">
                  ${expectedReceiveAmount.toFixed(2)} {currency}
                </strong>
              </span>
            )}
          </div>

          {/* Network Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-300 ml-2">Select Network</label>
            <select
              value={network}
              onChange={(e) => {
                setNetwork(e.target.value as NetworkType);
                setCurrency("USDT"); // Reset currency to default when network changes
              }}
              className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg bg-transparent text-white focus:outline-none appearance-none"
            >
              <option value="ethereum" className="bg-[#1a1a1a]">
                Ethereum
              </option>
              <option value="solana" className="bg-[#1a1a1a]">
                Solana
              </option>
            </select>
          </div>

          {/* Currency Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-300 ml-2">
              Select Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyType)}
              className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg bg-transparent text-white focus:outline-none appearance-none"
            >
              {currencyOptions[network].map((coin) => (
                <option key={coin} value={coin} className="bg-[#1a1a1a]">
                  {coin}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={usdtAddress}
              onBlur={() => setAddressTouched(true)}
              onChange={(e) => {
                setUsdtAddress(e.target.value);
                setSellError(null);
              }}
              placeholder={
                network === "ethereum"
                  ? `Enter ${currency} address`
                  : `Enter ${currency} Solana address`
              }
              className={`w-full px-4 py-3 border rounded-lg text-lg bg-transparent text-white focus:outline-none ${
                addressError ? "border-red-500" : "border-bg3"
              }`}
            />
            {addressError && (
              <span className="text-sm text-red-400 ml-2">{addressError}</span>
            )}
          </div>

          {/* Button */}
          <div className="flex flex-col items-center justify-center mt-6">
            {sellError && (
              <p className="mb-4 text-sm md:text-base text-red-400 text-center max-w-xl">
                {sellError}
              </p>
            )}
            <CustomButton2
              image={CartButtonImage}
              text={loading ? "Processing..." : "Sell Now"}
              onClick={() => handleSellRequest()}
              imageStyling="w-40"
              disabled={loading}
            />
            <p className="text-sm md:text-base text-gray-400 text-center max-w-xl leading-relaxed">
              You need to complete KYC before you can sell BTCY. This helps keep
              your account secure and allows withdrawals.
            </p>
          </div>
        </form>
      </div>

      {/* How it works Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          {/* Left Illustration */}
          <div className="flex-1 w-full lg:w-auto flex items-center justify-center">
            <Image
              src={HowItWorksArt}
              alt="Hand holding Bitcoin"
              className="w-full max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
            />
          </div>

          {/* Right Content List */}
          <div className="flex-1 w-full lg:w-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-12">
              HOW IT WORKS
            </h2>

            <div className="flex flex-col gap-8 md:gap-10">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                1. Choose how much BTCY you want to sell.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                2. Copy your Binance USDT deposit address and paste it.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                3. Complete KYC Verification is required before Selling.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                4. Confirm your details and submit your sell request.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
                5. USDT will be sent after processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[1200px] mb-40">
        <div className="flex items-center justify-center gap-6 mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center">
            FAQ
          </h2>
          <Image
            src={ArtImage5}
            alt="Gnome carrying Bitcoin"
            className="w-24 md:w-32 h-auto object-contain"
          />
        </div>

        <div className="space-y-6">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 md:gap-6"
          >
            <AccordionItem
              value="item-1"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                Why is my sell button disabled?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                You need to complete KYC and enter valid details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                Where do I get my USDT address?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                Open Binance → USDT → Deposit → Copy address.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                How long does it take?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                Processing time may vary.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-[#2D2D2D]  rounded-2xl px-6 md:px-8"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline py-6">
                Can I cancel after submitting?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-400 pt-0 pb-6">
                No, once submitted it cannot be reversed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <KycVerificationPopup
        isOpen={isKycPopupOpen}
        onClose={() => setIsKycPopupOpen(false)}
      />

      <SellStatusPopup
        isOpen={isSellStatusPopupOpen}
        onClose={() => setIsSellStatusPopupOpen(false)}
        usdtAmount={expectedReceiveAmount}
      />

      <TransactionFailedPopup
        isOpen={isTransactionFailedPopupOpen}
        onClose={() => setIsTransactionFailedPopupOpen(false)}
        message={transactionFailedMessage}
      />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onRegisterClick={() => setIsLoginPopupOpen(false)}
        onClose={() => setIsLoginPopupOpen(false)}
        onLoginSuccess={() => setIsLoginPopupOpen(false)}
      />
    </div>
  );
}
