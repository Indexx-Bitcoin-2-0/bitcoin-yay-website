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

// Placeholders for the images to match the screenshot
// Given the repo structure, utilizing some existing assets
import HeroArtImage from "@/assets/images/sell_Art.svg";
import SellButtonImage from "@/assets/images/buttons/price-tag-button.webp";
import OrderHistoryButtonImage from "@/assets/images/buttons/note-button.webp";
import HowItWorksArt from "@/assets/images/quantum-mining/art-4.webp";
import ArtImage5 from "@/assets/images/quantum-mining/art-5.webp";

import KycVerificationPopup from "./KycVerificationPopup";
import SellStatusPopupV2 from "./SellStatusPopupV2";
import TransactionFailedPopup from "./TransactionFailedPopup";

import { useAuth } from "@/contexts/AuthContext";
import {
  SELL_BTCY_CREATE_ORDER_ROUTE,
  SELL_BTCY_ELIGIBILITY_ROUTE,
} from "@/routes";
import { getAuthenticatedWalletUrl } from "@/lib/authenticated-wallet";
import {
  applyReceivedAmountDeduction,
  fetchPrices,
  RECEIVED_AMOUNT_MULTIPLIER,
} from "@/lib/quantum-mining";
import { getUserWalletBalance } from "@/lib/alchemy";

// Define the valid network types globally for clarity
type NetworkType = "binance" | "ethereum" | "solana";
type CurrencyType = "USDT" | "USDC";
type SellEligibilityData = {
  email?: string;
  canCreateSellOrder?: boolean;
  sellAllowanceEligible?: boolean;
  kycStatus?: string;
  serviceStatus?: string;
  purchasedAmount?: number;
  usedAmount?: number;
  remainingAmount?: number;
  message?: string;
};

const DEFAULT_SELL_FAILURE_MESSAGE =
  "Something went wrong while processing your request. Please try again. If the issue continues, contact customer support.";
const DEFAULT_KYC_MESSAGE =
  "To sell BTCY and receive USDT, you need to complete identity verification (KYC).";
const BTCY_SYMBOL = "BTCY";
const TOKEN_WALLET_NETWORK = "Ying Yang Chain";
const MIN_SELL_USD = 10;
const KYC_ACCOUNT_URL = "https://cex.indexx.ai/indexx-exchange/account";

const getSellOrderPayloadData = (responseData: unknown) => {
  if (
    responseData &&
    typeof responseData === "object" &&
    "data" in responseData
  ) {
    return responseData.data;
  }

  return null;
};

const getSellOrderResponseMessage = (responseData: unknown) => {
  const payloadData = getSellOrderPayloadData(responseData);

  if (
    payloadData &&
    typeof payloadData === "object" &&
    "message" in payloadData &&
    typeof payloadData.message === "string" &&
    payloadData.message.trim()
  ) {
    return payloadData.message;
  }

  if (
    responseData &&
    typeof responseData === "object" &&
    "message" in responseData &&
    typeof responseData.message === "string" &&
    responseData.message.trim()
  ) {
    return responseData.message;
  }

  return DEFAULT_SELL_FAILURE_MESSAGE;
};

const isKycBlockedSellOrderResponse = (responseData: unknown) =>
  getSellOrderResponseMessage(responseData).toLowerCase().includes("kyc");

const getKycPopupMessage = (responseData: unknown) => {
  const message = getSellOrderResponseMessage(responseData);
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("review") ||
    normalizedMessage.includes("pending")
  ) {
    return DEFAULT_KYC_MESSAGE;
  }

  return message;
};

const normalizeSellEligibility = (responseData: unknown) => {
  const payloadData = getSellOrderPayloadData(responseData);

  if (payloadData && typeof payloadData === "object") {
    return payloadData as SellEligibilityData;
  }

  if (responseData && typeof responseData === "object") {
    return responseData as SellEligibilityData;
  }

  return null;
};

const getEligibilityMessage = (eligibility: SellEligibilityData | null) =>
  eligibility?.message?.trim() || DEFAULT_SELL_FAILURE_MESSAGE;

const isKycBlockedEligibility = (eligibility: SellEligibilityData | null) => {
  const kycStatus = eligibility?.kycStatus?.toLowerCase();
  const message = getEligibilityMessage(eligibility).toLowerCase();

  return (
    kycStatus === "missing" ||
    kycStatus === "pending" ||
    message.includes("kyc")
  );
};

const fetchSellEligibility = (email: string) =>
  axios.get(SELL_BTCY_ELIGIBILITY_ROUTE, {
    params: { email },
    validateStatus: () => true,
  });

const isValidSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

const isValidDestinationAddress = (address: string, network: NetworkType) => {
  if (network === "binance" || network === "ethereum") {
    return isAddress(address);
  }

  return isValidSolanaAddress(address);
};

const getAddressValidationMessage = (
  currency: CurrencyType,
  network: NetworkType
) =>
  network === "binance"
    ? `Enter a valid BNB Smart Chain address for ${currency}.`
    : network === "ethereum"
      ? `Enter a valid Ethereum address for ${currency}.`
      : `Enter a valid Solana address for ${currency}.`;

export default function SellBtcyPage() {
  const [btcyAmount, setBtcyAmount] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");

  const [network] = useState<NetworkType>("binance");
  const [currency] = useState<CurrencyType>("USDT");

  // State to hold the dynamic live price
  const [btcyPrice, setBtcyPrice] = useState<number>(0);

  const [isKycPopupOpen, setIsKycPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSellStatusPopupOpen, setIsSellStatusPopupOpen] = useState(false);
  const [isTransactionFailedPopupOpen, setIsTransactionFailedPopupOpen] =
    useState(false);
  const [transactionFailedTitle, setTransactionFailedTitle] =
    useState("Transaction Failed");
  const [transactionFailedMessage, setTransactionFailedMessage] = useState(
    DEFAULT_SELL_FAILURE_MESSAGE
  );
  const [kycMessage, setKycMessage] = useState<string | undefined>();

  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [eligibilityLoading, setEligibilityLoading] = useState(false);
  const [btcyBalance, setBtcyBalance] = useState<number | null>(null);
  const [sellEligibility, setSellEligibility] =
    useState<SellEligibilityData | null>(null);
  const [sellError, setSellError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();

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

  useEffect(() => {
    let isActive = true;

    const loadSellEligibility = async () => {
      if (isAuthLoading) {
        return;
      }

      if (!user?.email) {
        setSellEligibility(null);
        setEligibilityLoading(false);
        return;
      }

      setEligibilityLoading(true);
      try {
        const response = await fetchSellEligibility(user.email);
        if (!isActive) return;

        setSellEligibility(normalizeSellEligibility(response.data));
      } catch (error) {
        if (!isActive) return;
        console.error("Failed to fetch BTCY sell eligibility:", error);
        setSellEligibility(null);
      } finally {
        if (isActive) {
          setEligibilityLoading(false);
        }
      }
    };

    loadSellEligibility();

    return () => {
      isActive = false;
    };
  }, [user?.email, isAuthLoading]);

  // Calculate the converted amount based on live price
  const expectedGrossReceiveAmount = btcyAmount
    ? Number(btcyAmount) * btcyPrice
    : 0;
  const expectedReceiveAmount = applyReceivedAmountDeduction(
    expectedGrossReceiveAmount
  );
  const minimumSellBtcy =
    btcyPrice > 0
      ? MIN_SELL_USD / (btcyPrice * RECEIVED_AMOUNT_MULTIPLIER)
      : null;
  const formattedMinimumSellBtcy =
    minimumSellBtcy !== null
      ? minimumSellBtcy.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      : "Loading...";
  const formattedBtcyBalance =
    btcyBalance !== null
      ? btcyBalance.toLocaleString("en-US", {
        maximumFractionDigits: 8,
      })
      : null;
  const eligibleSellAmount =
    typeof sellEligibility?.remainingAmount === "number"
      ? Math.max(0, sellEligibility.remainingAmount)
      : null;
  const formattedEligibleSellAmount =
    eligibleSellAmount !== null
      ? eligibleSellAmount.toLocaleString("en-US", {
        maximumFractionDigits: 8,
      })
      : null;
  const maxSellableBtcy =
    btcyBalance !== null && eligibleSellAmount !== null
      ? Math.min(btcyBalance, eligibleSellAmount)
      : (eligibleSellAmount ?? btcyBalance);
  const balanceLabel = user?.email
    ? `Your BTCY Token Balance: ${balanceLoading ? "Loading..." : (formattedBtcyBalance ?? "Unavailable")
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

    if (btcyPrice <= 0) {
      return "BTCY price is loading. Please wait.";
    }

    if (expectedReceiveAmount <= MIN_SELL_USD) {
      return `Minimum sell amount is more than ${formattedMinimumSellBtcy} BTCY, so your net payable is greater than $${MIN_SELL_USD} after the 3% fee.`;
    }

    if (btcyBalance !== null && requestedBtcyAmount > btcyBalance) {
      return `Amount exceeds your available balance of ${formattedBtcyBalance ?? "0"
        } BTCY.`;
    }

    if (
      eligibleSellAmount !== null &&
      requestedBtcyAmount > eligibleSellAmount
    ) {
      return `Amount exceeds your eligible sell balance of ${formattedEligibleSellAmount ?? "0"
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
    setTransactionFailedTitle("Transaction Failed");
    setTransactionFailedMessage(DEFAULT_SELL_FAILURE_MESSAGE);

    if (isAuthLoading) {
      setSellError("Checking your login status. Please wait.");
      return;
    }

    if (!user?.email) {
      setIsLoginPopupOpen(true);
      return;
    }

    const nextAmountError = getAmountValidationError(true);
    const nextAddressError = getAddressValidationErrorForField(true);
    if (nextAmountError || nextAddressError) {
      return;
    }

    try {
      setLoading(true);

      const eligibilityResponse = await fetchSellEligibility(user.email);
      const eligibility = normalizeSellEligibility(eligibilityResponse.data);
      setSellEligibility(eligibility);

      if (!eligibility?.canCreateSellOrder) {
        if (isKycBlockedEligibility(eligibility)) {
          setKycMessage(getEligibilityMessage(eligibility));
          setIsKycPopupOpen(true);
          return;
        }

        setTransactionFailedTitle("Unable to Sell BTCY");
        setTransactionFailedMessage(getEligibilityMessage(eligibility));
        setIsTransactionFailedPopupOpen(true);
        return;
      }

      if (
        typeof eligibility.remainingAmount === "number" &&
        requestedBtcyAmount > eligibility.remainingAmount
      ) {
        setTransactionFailedTitle("Sell Amount Exceeds Allowance");
        setTransactionFailedMessage(
          `You can sell up to ${eligibility.remainingAmount.toLocaleString(
            "en-US",
            { maximumFractionDigits: 8 }
          )} BTCY from your eligible purchased BTCY allowance.`
        );
        setIsTransactionFailedPopupOpen(true);
        return;
      }

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
      } else if (isKycBlockedSellOrderResponse(res.data)) {
        setKycMessage(getKycPopupMessage(res.data));
        setIsKycPopupOpen(true);
      } else {
        setTransactionFailedMessage(DEFAULT_SELL_FAILURE_MESSAGE);
        setIsTransactionFailedPopupOpen(true);
      }
    } catch (error) {
      console.error("Sell Order Error:", error);
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;
        if (isKycBlockedSellOrderResponse(responseData)) {
          setKycMessage(getKycPopupMessage(responseData));
          setIsKycPopupOpen(true);
          return;
        }
      }

      setTransactionFailedMessage(DEFAULT_SELL_FAILURE_MESSAGE);
      setIsTransactionFailedPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteKyc = async () => {
    const url = await getAuthenticatedWalletUrl(KYC_ACCOUNT_URL, {
      includeBuyToken: false,
    });
    window.location.href = url;
  };

  const handleSellStatusPopupClose = () => {
    window.location.reload();
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
            <p className="text-lg md:text-xl text-primary font-medium mb-8 md:mb-10">
              Only verified users can sell BTCY.
            </p>
            <div className="flex flex-row items-start gap-10">
              <CustomButton2
                image={SellButtonImage}
                text="Sell Now"
                onClick={() => {
                  document
                    .getElementById("sell-request-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                imageStyling="w-24"
              />
              <CustomButton2
                image={OrderHistoryButtonImage}
                text="Order History"
                link="/order-history"
                imageStyling="w-24"
              />
            </div>
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
      <div
        id="sell-request-form"
        className="mt-40 border-0 md:border-1 border-bg2 rounded-2xl p-8 md:p-12 max-w-5xl mx-3 md:mx-auto scroll-mt-32"
      >
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
            <label className="text-base md:text-lg font-semibold text-white ml-2">
              BTCY Amount
            </label>
            <input
              type="number"
              value={btcyAmount}
              max={maxSellableBtcy ?? undefined}
              onChange={(e) => {
                setBtcyAmount(e.target.value);
                setSellError(null);
              }}
              placeholder="Enter the amount of BTCY you want to sell from your available balance"
              className={`w-full px-4 py-3 border rounded-lg text-lg bg-transparent text-white focus:outline-none ${amountError ? "border-red-500" : "border-bg3"
                }`}
            />
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 ml-2 text-sm md:text-base">
              <span className="text-gray-300">
                <span className="text-primary font-semibold">Available:</span>{" "}
                {formattedBtcyBalance ?? "0"} BTCY
              </span>
              <span className="text-gray-300">
                <span className="text-primary font-semibold">Eligible:</span>{" "}
                {eligibilityLoading
                  ? "Loading..."
                  : `${formattedEligibleSellAmount ?? "Unavailable"} BTCY`}
              </span>
              <span className="text-gray-300">
                <span className="text-primary font-semibold">Minimum:</span>{" "}
                More than {formattedMinimumSellBtcy} BTCY to receive over ${MIN_SELL_USD} after fees
              </span>
            </div>
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
            <span className="text-xs md:text-sm text-gray-500 ml-2">
              Amount shown is the final {currency} you&apos;ll receive, including a 3% transaction fee.
            </span>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3">
            <label className="text-base md:text-lg font-semibold text-white ml-2">
              Your USDT Deposit Address on BNB Smart Chain
            </label>
            <input
              type="text"
              value={usdtAddress}
              onBlur={() => setAddressTouched(true)}
              onChange={(e) => {
                setUsdtAddress(e.target.value);
                setSellError(null);
              }}
              placeholder="Paste your USDT deposit address"
              className={`w-full px-4 py-3 border rounded-lg text-lg bg-transparent text-white focus:outline-none ${addressError ? "border-red-500" : "border-bg3"
                }`}
            />
            {addressError && (
              <span className="text-sm text-red-400 ml-2">{addressError}</span>
            )}
            <div className="mt-2 ml-2 text-sm md:text-base leading-relaxed">
              <p className="text-primary font-semibold">
                How to get your USDT deposit address:
              </p>
              <p className="text-gray-300">
                Open your wallet or exchange → select USDT → tap Deposit → choose
                BNB Smart Chain (BEP-20) → copy the address → paste it here
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex flex-col items-center justify-center mt-6">
            {sellError && (
              <p className="mb-4 text-sm md:text-base text-red-400 text-center max-w-xl">
                {sellError}
              </p>
            )}
            <CustomButton2
              image={SellButtonImage}
              text={loading ? "Processing..." : "Sell Now"}
              onClick={() => {
                handleSellRequest();
              }}
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
        message={kycMessage}
        onCompleteKyc={handleCompleteKyc}
      />

      <SellStatusPopupV2
        isOpen={isSellStatusPopupOpen}
        onClose={handleSellStatusPopupClose}
        usdtAmount={expectedReceiveAmount}
        currency={currency}
      />

      <TransactionFailedPopup
        isOpen={isTransactionFailedPopupOpen}
        onClose={() => setIsTransactionFailedPopupOpen(false)}
        title={transactionFailedTitle}
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
