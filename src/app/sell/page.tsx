"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import cion from "../../../public/coin.png";
import { useAuth } from "@/contexts/AuthContext";
import { SELL_BTCY_CREATE_ROUTE } from "@/routes";

type Step = "form" | "success";

interface SellFormData {
  btcyAmount: string;
  receiveAddress: string; // Changed from usdtAddress to be generic
  network: "SOLANA" | "ETH";
  receiveCurrency: "USDT" | "USDC"; // Added currency selector
}

export default function SellPage() {
  const { user } = useAuth();

  // Hardcoded fallback for balance if it's not in your context yet
  const btcyBalance = "25,450";

  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState<SellFormData>({
    btcyAmount: "",
    receiveAddress: "",
    network: "SOLANA",
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

    setLoading(true);
    setFormError("");

    try {
      const res = await axios.post(SELL_BTCY_CREATE_ROUTE, {
        email: user.email,
        btcyAmount: Number(formData.btcyAmount),
        receiveCurrency: formData.receiveCurrency, // Now dynamic
        destinationWallet: formData.receiveAddress, // Using the dynamic address field
        network: formData.network,
      });

      if (res.data.status === 200) {
        setOrderId(res.data.data.orderId);
        setStep("success");
      }
    } catch (err: any) {
      setFormError(
        err.response?.data?.data?.message || "Server error occurred."
      );
    } finally {
      setLoading(false);
    }
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
                      Min: <span className="text-[#ff6b00]">100</span>
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
                    {formData.network === "ETH"
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
    </div>
  );
}
