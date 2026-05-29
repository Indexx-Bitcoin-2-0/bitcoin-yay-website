"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import cion from "../../../public/coin.png";
import { PublicKey } from "@solana/web3.js";
import { isAddress } from "viem";
import { useAuth } from "@/contexts/AuthContext";
import { SELL_BTCY_CREATE_ROUTE } from "@/routes";
import { getAuthenticatedWalletUrl } from "@/lib/authenticated-wallet";
import {
  applyReceivedAmountDeduction,
  RECEIVED_AMOUNT_MULTIPLIER,
} from "@/lib/quantum-mining";
import KycVerificationPopup from "../sell-btcy/KycVerificationPopup";
import TransactionFailedPopup from "../sell-btcy/TransactionFailedPopup";

type Step = "form" | "success";

interface SellFormData {
  btcyAmount: string;
  receiveAddress: string; // Changed from usdtAddress to be generic
  network: "SOLANA" | "ETH" | "binance";
  receiveCurrency: "USDT" | "USDC"; // Added currency selector
}

const KYC_ACCOUNT_URL = "https://cex.indexx.ai/indexx-exchange/account";
const BTCY_PRICE_USD = 0.1;
const MIN_SELL_USD = 10;
const MIN_SELL_BTCY =
  MIN_SELL_USD / (BTCY_PRICE_USD * RECEIVED_AMOUNT_MULTIPLIER);
const DEFAULT_KYC_MESSAGE =
  "To sell BTCY and receive USDT, you need to complete identity verification (KYC).";
const DEFAULT_SELL_FAILURE_MESSAGE =
  "Something went wrong while processing your request. Please try again. If the issue continues, contact customer support.";

const getSellOrderMessage = (responseData: unknown) => {
  if (
    responseData &&
    typeof responseData === "object" &&
    "data" in responseData
  ) {
    const data = responseData.data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string" &&
      data.message.trim()
    ) {
      return data.message;
    }
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

  return "Server error occurred.";
};

const isKycBlockedSellOrderResponse = (responseData: unknown) =>
  getSellOrderMessage(responseData).toLowerCase().includes("kyc");

const getKycPopupMessage = (responseData: unknown) => {
  const message = getSellOrderMessage(responseData);
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("review") ||
    normalizedMessage.includes("pending")
  ) {
    return DEFAULT_KYC_MESSAGE;
  }

  return message;
};

const isValidSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

const isValidDestinationAddress = (
  address: string,
  network: SellFormData["network"]
) => (network === "SOLANA" ? isValidSolanaAddress(address) : isAddress(address));

const getAddressValidationMessage = (
  currency: SellFormData["receiveCurrency"],
  network: SellFormData["network"]
) =>
  network === "binance"
    ? `Enter a valid BNB Smart Chain address for ${currency}.`
    : network === "ETH"
    ? `Enter a valid Ethereum address for ${currency}.`
    : `Enter a valid Solana address for ${currency}.`;

export default function SellPage() {
  const { user } = useAuth();

  // Hardcoded fallback for balance if it's not in your context yet
  const btcyBalance = "25,450";

  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [isKycPopupOpen, setIsKycPopupOpen] = useState(false);
  const [kycMessage, setKycMessage] = useState<string | undefined>();
  const [isTransactionFailedPopupOpen, setIsTransactionFailedPopupOpen] =
    useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState<SellFormData>({
    btcyAmount: "",
    receiveAddress: "",
    network: "binance",
    receiveCurrency: "USDT", // Default to USDT
  });

  const handleFormSubmit = async () => {
    if (!user?.email) {
      setFormError("You must be logged in to perform this action.");
      return;
    }

    if (!formData.btcyAmount || !formData.receiveAddress) {
      setFormError("Please fill in all fields.");
      return;
    }

    const btcyAmount = Number(formData.btcyAmount);
    const grossReceiveAmount = btcyAmount * BTCY_PRICE_USD;
    const receiveAmount = applyReceivedAmountDeduction(grossReceiveAmount);
    if (Number.isNaN(btcyAmount) || btcyAmount < 1) {
      setFormError("Please enter a valid BTCY amount.");
      return;
    }

    if (receiveAmount <= MIN_SELL_USD) {
      setFormError(
        `Minimum sell amount is more than ${MIN_SELL_BTCY.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} BTCY, so your net payable is greater than $${MIN_SELL_USD} after the 3% fee.`
      );
      return;
    }

    if (!isValidDestinationAddress(formData.receiveAddress, formData.network)) {
      setFormError(
        getAddressValidationMessage(formData.receiveCurrency, formData.network)
      );
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      const res = await axios.post(SELL_BTCY_CREATE_ROUTE, {
        email: user.email,
        btcyAmount,
        receiveAmount,
        receiveCurrency: formData.receiveCurrency, // Now dynamic
        destinationWallet: formData.receiveAddress, // Using the dynamic address field
        network: formData.network,
      });

      if (res.data.status === 200) {
        setOrderId(res.data.data.orderId);
        setStep("success");
      } else if (isKycBlockedSellOrderResponse(res.data)) {
        setKycMessage(getKycPopupMessage(res.data));
        setIsKycPopupOpen(true);
      } else {
        setIsTransactionFailedPopupOpen(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data;
        if (isKycBlockedSellOrderResponse(responseData)) {
          setKycMessage(getKycPopupMessage(responseData));
          setIsKycPopupOpen(true);
          return;
        }

        setIsTransactionFailedPopupOpen(true);
        return;
      }

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

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="relative max-w-6xl mx-auto px-6 pt-[180px] pb-20">
        <div className="hidden md:block absolute right-[-80px] top-[80px] w-[420px] pointer-events-none">
          <Image
            src={cion}
            alt="tokens"
            width={400}
            height={40}
            className="w-full h-auto object-contain opacity-90"
            priority
          />
        </div>

        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Sell BTCY — Convert <br />
            <span className="text-white/90">to Stablecoins Instantly</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Add your wallet address and select your preferred network and
            currency.
          </p>

          <p className="text-[#ff6b00] mt-2 font-medium">
            Only verified users can sell BTCY.
          </p>
        </div>

        {step === "form" ? (
          <div className="flex justify-center">
            <div className="w-full max-w-xl bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 md:p-10 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Sell Request Form
                </h2>

                <p className="text-gray-400 mt-2">1 BTCY = $0.1</p>

                <p className="text-[#ff6b00] mt-1 font-semibold">
                  Your BTCY Balance: {btcyBalance} BTCY
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Account: {user?.email}
                </p>
              </div>

              <div className="space-y-6">
                {/* AMOUNT FIELD */}
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    BTCY Amount
                  </label>

                  <input
                    type="number"
                    className="w-full mt-2 bg-[#121212] border border-white/10 rounded-lg px-4 py-3 focus:border-[#ff6b00] outline-none"
                    placeholder="Enter amount"
                    value={formData.btcyAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        btcyAmount: e.target.value,
                      })
                    }
                  />

                  <div className="flex justify-between text-xs mt-2 text-gray-500">
                    <span>
                      Available:{" "}
                      <span className="text-[#ff6b00]">{btcyBalance}</span>
                    </span>
                    <span>
                      Min:{" "}
                      <span className="text-[#ff6b00]">
                        {MIN_SELL_BTCY.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        BTCY (net &gt; ${MIN_SELL_USD} after fee)
                      </span>
                    </span>
                  </div>
                </div>

                {/* CURRENCY SELECTOR */}
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    Select Currency
                  </label>

                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, receiveCurrency: "USDT" })
                      }
                      className={`flex-1 py-2 rounded-lg border transition-colors ${
                        formData.receiveCurrency === "USDT"
                          ? "bg-[#ff6b00] text-white border-[#ff6b00]"
                          : "bg-[#121212] border-white/10 hover:border-white/30"
                      }`}
                    >
                      USDT
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, receiveCurrency: "USDC" })
                      }
                      className={`flex-1 py-2 rounded-lg border transition-colors ${
                        formData.receiveCurrency === "USDC"
                          ? "bg-[#ff6b00] text-white border-[#ff6b00]"
                          : "bg-[#121212] border-white/10 hover:border-white/30"
                      }`}
                    >
                      USDC
                    </button>
                  </div>
                </div>

                {/* NETWORK SELECTOR */}
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    Select Network
                  </label>

                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, network: "SOLANA" })
                      }
                      className={`flex-1 py-2 rounded-lg border transition-colors ${
                        formData.network === "SOLANA"
                          ? "bg-[#ff6b00] text-white border-[#ff6b00]"
                          : "bg-[#121212] border-white/10 hover:border-white/30"
                      }`}
                    >
                      Solana
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, network: "binance" })
                      }
                      className={`flex-1 py-2 rounded-lg border transition-colors ${
                        formData.network === "binance"
                          ? "bg-[#ff6b00] text-white border-[#ff6b00]"
                          : "bg-[#121212] border-white/10 hover:border-white/30"
                      }`}
                    >
                      BNB
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, network: "ETH" })
                      }
                      className={`flex-1 py-2 rounded-lg border transition-colors ${
                        formData.network === "ETH"
                          ? "bg-[#ff6b00] text-white border-[#ff6b00]"
                          : "bg-[#121212] border-white/10 hover:border-white/30"
                      }`}
                    >
                      Ethereum
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-2">
                    Select the network for receiving funds.
                  </p>
                </div>

                {/* ADDRESS FIELD */}
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    {formData.receiveCurrency} Address ({formData.network})
                  </label>

                  <input
                    type="text"
                    className="w-full mt-2 bg-[#121212] border border-white/10 rounded-lg px-4 py-3 focus:border-[#ff6b00] outline-none"
                    placeholder={`Paste ${formData.network} wallet address`}
                    value={formData.receiveAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        receiveAddress: e.target.value,
                      })
                    }
                  />

                  <p className="text-[11px] text-gray-500 mt-2">
                    Ensure this address supports {formData.receiveCurrency} on
                    the{" "}
                    {formData.network === "binance"
                      ? "BNB Smart Chain (BEP-20)"
                      : formData.network === "ETH"
                      ? "Ethereum (ERC-20)"
                      : "Solana"}{" "}
                    network.
                  </p>
                </div>

                {formError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg">
                    {formError}
                  </div>
                )}

                <div className="flex flex-col items-center pt-4">
                  <button
                    onClick={handleFormSubmit}
                    disabled={loading || !user}
                    className="group"
                  >
                    <div className="w-20 h-20 bg-[#ff6b00] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition disabled:opacity-50">
                      🛒
                    </div>
                  </button>

                  <span className="mt-3 font-semibold">
                    {loading ? "Processing..." : "Sell Now"}
                  </span>

                  <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
                    Complete KYC to enable selling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="bg-[#1a1a1a] p-10 rounded-2xl text-center border border-white/5">
              <div className="text-green-500 text-4xl mb-4">✓</div>
              <h2 className="text-xl font-bold">Request Submitted</h2>
              <p className="text-gray-400 mt-2">Order ID: {orderId}</p>

              <button
                onClick={() => setStep("form")}
                className="mt-6 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
      <KycVerificationPopup
        isOpen={isKycPopupOpen}
        onClose={() => setIsKycPopupOpen(false)}
        message={kycMessage}
        onCompleteKyc={handleCompleteKyc}
      />
      <TransactionFailedPopup
        isOpen={isTransactionFailedPopupOpen}
        onClose={() => setIsTransactionFailedPopupOpen(false)}
        message={DEFAULT_SELL_FAILURE_MESSAGE}
      />
    </div>
  );
}
