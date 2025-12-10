"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/home/art-1.png";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";

import FreeMiningButtonImage from "@/assets/images/alchemy/home/free-art.webp";
import PowerMiningButtonImage from "@/assets/images/alchemy/home/power-mining-art.webp";
import ClickConvertIcon from "@/assets/images/alchemy/home/click&convert.svg";

import BgArtImage1 from "@/assets/images/bitcoin-art-3.svg";

import HowItWorksArt from "@/assets/images/alchemy/home/howItWorks.png";
import WalletIcon from '@/assets/images/alchemy/home/walletIcon.png'

import CustomButton2 from "@/components/CustomButton2";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import {
  getUserBTCYBalance,
  processAlchemyConversion,
  saveClickConvertSessionState,
  getClickConvertSessionState,
  ClickConvertSessionState,
} from "@/lib/alchemy";
import { MINIMUM_BTCY_BALANCE_FOR_ALCHEMY } from "@/app/alchemy/constants";
import { getAuthenticatedWalletUrl } from "@/lib/authenticated-wallet";
import {
  fetchActiveLiquidityPool,
  DEFAULT_ACTIVE_LIQUIDITY_POOL,
  NormalizedActiveLiquidityPool,
} from "@/services/alchemy.service";
import axios from "axios";

import FortuneFunnelIcon from "@/assets/images/alchemy/fortuneFunnel.svg";
import MegaPathIcon from "@/assets/images/alchemy/mega_path.svg";
import AlchemyGatewayIcon from "@/assets/images/alchemy/AlchemyGateway.svg";
import DownArrowIcon from '@/assets/images/alchemy/downArrow.svg'
import StartAlchemyImage from "@/assets/images/alchemy/startAlchemySVG.svg";
const MAX_NUGGET_INPUT = 1000;
const WALLET_OVERVIEW_BASE_URL = "https://cex.indexx.ai/wallet/overview";
const MINIMUM_BALANCE_MESSAGE = `You need at least ${MINIMUM_BTCY_BALANCE_FOR_ALCHEMY.toLocaleString(
  "en-US"
)} BTCY to start an Alchemy`;

export default function AlchemyPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isPowerMiningActive, setIsPowerMiningActive] = useState(false);

  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [btcyPrice, setBtcyPrice] = useState<number | null>(null);
  const [nuggetInput, setNuggetInput] = useState("");
  const [tokenOutput, setTokenOutput] = useState("");
  const [showIgnited, setShowIgnited] = useState(false);
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [walletUrl, setWalletUrl] = useState(WALLET_OVERVIEW_BASE_URL);
  const popupTimerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [isProcessingAlchemy, setIsProcessingAlchemy] = useState(false);
  const [liquidityPoolData, setLiquidityPoolData] = useState<
    NormalizedActiveLiquidityPool
  >(DEFAULT_ACTIVE_LIQUIDITY_POOL);
  const [poolStatusMessage, setPoolStatusMessage] = useState<string | null>(null);
  const [poolLoading, setPoolLoading] = useState(false);

  const {
    current: poolCurrent,
    target: poolTarget,
    remainingBalanceUsd,
  } = liquidityPoolData;
  const liquidityProgressPercent = Math.min(
    100,
    Math.round((poolCurrent / Math.max(poolTarget, 1)) * 100)
  );

  const handleLoginSuccess = () => setIsLoginPopupOpen(false);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
  const handleRegisterClick = () => setIsLoginPopupOpen(false);

  const handleNuggetInputChange = (rawValue: string) => {
    setFormError(null);
    const digitsOnly = rawValue.replace(/[^0-9]/g, "");
    if (!digitsOnly) {
      setNuggetInput("");
      setInputError(null);
      return;
    }

    const numericValue = Number(digitsOnly);
    const clampedValue = Math.min(numericValue, MAX_NUGGET_INPUT);
    setNuggetInput(String(clampedValue));

    if (numericValue > MAX_NUGGET_INPUT) {
      setInputError(
        `You can only convert up to ${MAX_NUGGET_INPUT.toLocaleString(
          "en-US"
        )} BTCY per session.`
      );
    } else {
      setInputError(null);
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin",
              vs_currencies: "usd",
            },
          }
        );
        const btc = res.data.bitcoin.usd;
        const btcy = btc / 1_000_000;
        setBtcPrice(btc);
        setBtcyPrice(btcy);
      } catch (error) {
        console.error("Failed to fetch BTC price:", error);
      }
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    const storedSession = getClickConvertSessionState();
    if (!storedSession) return;

    if (storedSession.resultAmount !== undefined) {
      setTokenOutput(
        Number(storedSession.resultAmount).toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })
      );
    }

    if (!storedSession.completedAt) {
      setStatusMessage(
        "Awaiting completion—your Nuggets are still refining through Alchemy."
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadBalance = async () => {
      if (isAuthLoading) {
        return;
      }

      if (!user?.email) {
        if (isActive) {
          setUserBalance(null);
          setBalanceError(null);
          setBalanceLoading(false);
        }
        return;
      }

      setBalanceLoading(true);
      setBalanceError(null);
      try {
        const response = await getUserBTCYBalance(user.email);
        if (!isActive) return;

        const totalBalance =
          response.data?.totalBTCYBalance ?? response.data?.balance ?? 0;

        setUserBalance(totalBalance);
        if (totalBalance < MINIMUM_BTCY_BALANCE_FOR_ALCHEMY) {
          setBalanceError(MINIMUM_BALANCE_MESSAGE);
        } else {
          setBalanceError(null);
        }
      } catch (error) {
        if (!isActive) return;
        setBalanceError(
          "Unable to read your BTCY balance. Please refresh or log in again."
        );
      } finally {
        if (isActive) {
          setBalanceLoading(false);
        }
      }
    };

    loadBalance();

    return () => {
      isActive = false;
    };
  }, [user, isAuthLoading]);

  useEffect(() => {
    let isActive = true;

    const buildWalletLink = async () => {
      const url = await getAuthenticatedWalletUrl(WALLET_OVERVIEW_BASE_URL);
      if (isActive) {
        setWalletUrl(url);
      }
    };

    buildWalletLink();

    return () => {
      isActive = false;
    };
  }, [user?.email]);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadLiquidityPool = async () => {
      setPoolLoading(true);
      setPoolStatusMessage(null);

      try {
        const data = await fetchActiveLiquidityPool(
          user?.access_token,
          controller.signal
        );
        if (isActive) {
          setLiquidityPoolData(data);
        }
      } catch (error) {
        if (!isActive) return;
        console.error("Failed to load liquidity pool data", error);
        setPoolStatusMessage(
          error instanceof Error
            ? error.message
            : "Unable to load the liquidity pool."
        );
      } finally {
        if (isActive) {
          setPoolLoading(false);
        }
      }
    };

    loadLiquidityPool();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [user?.access_token]);

  const normalizeAlchemyUserType = (raw?: string): string => {
    if (!raw) return "free";
    const normalized = raw.trim().toLowerCase();
    if (normalized.includes("quantum")) return "quantum";
    if (normalized.includes("nuclear")) return "nuclear";
    if (normalized.includes("turbo")) return "turbo";
    if (normalized.includes("electric")) return "electric";
    if (normalized.includes("free")) return "free";
    return "free";
  };

  const handleConvert = async () => {
    if (isProcessingAlchemy) return;

    setFormError(null);
    setStatusMessage(null);

    if (inputError) {
      setFormError("Please fix the nugget amount before converting.");
      return;
    }

    if (!user) {
      setIsLoginPopupOpen(true);
      return;
    }

    if (balanceLoading) {
      setFormError("Checking your BTCY balance. Please wait...");
      return;
    }

    if (userBalance === null) {
      setFormError("Unable to read your BTCY balance yet.");
      return;
    }

    if (userBalance < MINIMUM_BTCY_BALANCE_FOR_ALCHEMY) {
      setFormError(MINIMUM_BALANCE_MESSAGE);
      return;
    }

    if (!nuggetInput) {
      setFormError("Enter the amount of nuggets you want to refine.");
      return;
    }

    const amount = Number(nuggetInput);
    if (Number.isNaN(amount) || amount <= 0) {
      setFormError("Enter a valid nugget amount.");
      return;
    }

    setIsProcessingAlchemy(true);
    setStatusMessage("Processing your Nuggets with the Alchemy engine...");
    try {
      const processResult = await processAlchemyConversion({
        email: user.email,
        nuggetTokens: amount,
        userType: normalizeAlchemyUserType(user.userType),
        referralCodeUsed: "",
        nftBoostApplied: false,
      });

      if (!processResult.success || !processResult.session?.sessionId) {
        throw new Error(
          processResult.error || "Failed to queue your Alchemy conversion."
        );
      }

      const sessionPayload: ClickConvertSessionState = {
        ...processResult.session,
        sessionId: processResult.session.sessionId,
        email: user.email,
        inputAmount: amount,
        createdAt: new Date().toISOString(),
        startedAt:
          processResult.session.startedAt ?? new Date().toISOString(),
      };

      saveClickConvertSessionState(sessionPayload);
      setTokenOutput("");
      setStatusMessage(
        "Alchemy queued—your Nuggets will be processed in the next 60 minutes."
      );
      setShowIgnited(true);
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      popupTimerRef.current = setTimeout(() => {
        setShowIgnited(false);
        router.push("/alchemy/outcome");
      }, 10000);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to start the conversion. Please try again.";
      setFormError(message);
    } finally {
      setIsProcessingAlchemy(false);
    }
  };

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
              Alchemy is a magic algorithm that transforms your mined Bitcoin-Yay Nuggets into real digital tokens, crypto currency on multiple blockchain.Engage Alchemy, and let the magic turn your effort into real value.
            </p>
            <p className="mt-10 text-xl md:text-2xl">
              This is the beginning of the transformation layer between mined Bitcoin-Yay nuggets and real Bitcoin-Yay tokens on the bitcoin-yay system. Inspired by the ancient idea of alchemy — turning base metals into gold — this gateway transforms raw mined nuggets into real, liquid assets, ensuring fairness, sustainability, and long-term wealth growth.
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

      <div className="mt-100 flex flex-col items-center text-center">
        <div className="px-4 text-2xl font-bold text-primary max-w-250 leading-tight">
          bitcoin-yay Is The Micro Token
        </div>
        <div className="px-4 text-2xl font-bold text-primary max-w-250 leading-tight">
          And Petty Cash Of Bitcoin
        </div>

        <div className="px-4 mt-4 text-5xl font-bold text-white max-w-250 leading-snug">
          {btcPrice !== null && btcyPrice !== null ? (
            <>
              Bitcoin ${btcPrice.toLocaleString()}, bitcoin-yay $
              {btcyPrice.toFixed(4)}
            </>
          ) : (
            "Loading prices..."
          )}
        </div>

        <div className="px-4 mt-2 text-xs font-bold text-primary max-w-250">
          1 Bitcoin = 1 Million bitcoin-yay
        </div>
        <div className="mt-8 w-full max-w-3xl px-4">
          <div className="flex items-center justify-between text-[11px] uppercase text-tertiary">
            <span>Liquidity pool</span>
            <span>{liquidityProgressPercent}% funded</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${liquidityProgressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-tertiary">
            {poolCurrent.toLocaleString("en-US")} /{" "}
            {poolTarget.toLocaleString("en-US")} BTCY secured to back the
            liquidity pool.
          </p>
          {remainingBalanceUsd !== undefined && (
            <p className="mt-1 text-[11px] text-tertiary">
              Remaining balance: ${remainingBalanceUsd.toLocaleString("en-US")}
            </p>
          )}
          {poolLoading ? (
            <p className="mt-2 text-[11px] text-primary text-center">
              Refreshing liquidity status…
            </p>
          ) : poolStatusMessage ? (
            <p className="mt-2 text-[11px] text-red-500 text-center">
              {poolStatusMessage}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center items-center mt-40">
        <CustomButton2
          text="How It Works?"
          image={HowItWorksArt}
          imageStyling="w-20 md:w-30"
          link="#alchemy-how-it-works"
        />
      </div>

      <div id="alchemy-nuggets-input" className="mt-40 bg-bg0/30 rounded-3xl p-6 md:p-14 flex flex-col gap-16">
        <div className="text-center">
          <h3 className="text-4xl md:text-6xl font-bold text-primary">
            Bitcoin-Yay Nuggets
          </h3>
          <input
            type="text"
            inputMode="numeric"
            value={nuggetInput}
            onChange={(e) => handleNuggetInputChange(e.target.value)}
            placeholder="Enter Nuggets Amount"
            className="mt-10 w-full rounded-2xl bg-bg2/70 border border-bg2 px-6 py-4 text-center text-xl text-white placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {inputError && (
            <p className="mt-4 text-sm text-red-500 text-center">{inputError}</p>
          )}
          {user ? (
            <p className="mt-4 text-sm text-tertiary">
              Available balance:
              {balanceLoading
                ? " Checking..."
                : userBalance !== null
                  ? ` ${userBalance.toLocaleString()} BTCY`
                  : " — BTCY"}
            </p>
          ) : (
            <p className="mt-4 text-sm text-tertiary">
              Log in to view your Bitcoin-Yay balance and start converting.
            </p>
          )}

          <div className="flex justify-center items-center mt-10">
            <Image src={DownArrowIcon} alt="Down Arrow" className="w-20 h-20" />
          </div>
          <div className="flex flex-col items-center gap-4 mt-10 hover:text-primary transition-colors">
            <CustomButton2
              text="Click & Convert"
              image={ClickConvertIcon}
              onClick={handleConvert}
              imageStyling="w-20 md:w-30"
            />
          </div>

          <p className="mt-6 text-base md:text-lg text-red-500 text-center max-w-2xl mx-auto">
            Alchemy unlocks after you mine 50,000 Bitcoin-Yay nuggets. Then you can convert any amount you want.
          </p>

          {(formError || balanceError || statusMessage) && (
            <div className="mt-4 flex justify-center">
              {formError ? (
                <p className="text-sm text-red-500 text-center max-w-md">
                  {formError}
                </p>
              ) : balanceError ? (
                <p className="text-sm text-red-500 text-center max-w-md">
                  {balanceError}
                </p>
              ) : statusMessage ? (
                <p className="text-sm text-primary text-center max-w-md">
                  {statusMessage}
                </p>
              ) : null}
            </div>
          )}
          <div className="flex justify-center items-center mt-10">
            <Image src={DownArrowIcon} alt="Down Arrow" className="w-20 h-20" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-4xl md:text-6xl font-bold text-primary">
            Bitcoin-Yay Tokens
          </h3>
          <input
            type="text"
            value={tokenOutput}
            readOnly
            placeholder="Tokens"
            className="mt-10 w-full rounded-2xl bg-bg2/70 border border-bg2 px-6 py-4 text-center text-xl text-tertiary placeholder:text-tertiary focus:outline-none cursor-not-allowed"
          />
          <div className="flex flex-col items-center mt-10">
            <CustomButton2
              text="Review your wallet"
              image={WalletIcon}
              imageStyling="w-20 md:w-30"
              link={walletUrl}
              _blank
            />
          </div>
        </div>
      </div>


      {/* <div id="alchemy-options" className="mt-40  flex gap-20 md:gap-40 px-10 justify-center items-center">
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
      </div> */}

      <div className="mt-40 ">
        <h2 className="text-4xl md:text-5xl xl:text-8xl font-bold text-center max-w-7xl mx-auto ">
          Turn your BTCY
          <br /> into passive income!
        </h2>
        <p className="mt-10 text-xl font-light text-center max-w-7xl mx-auto">
          Secure the network, earn rewards, and grow your holdings. Stake your
          bitcoin-yay now and let your crypto work for you.
        </p>
        {/* <div className="flex justify-center items-center mt-20">
          <CustomButton2
            text="Start Alchemy"
            image={PointingButtonImage}
            imageStyling="w-20 md:w-30"
            link="#"
          />
        </div> */}
        <div className="mt-80 max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-5xl xl:text-8xl font-bold text-center max-w-7xl mx-auto">
            Potential Multipliers
          </h3>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div className="text-center">
              <p className="text-primary font-semibold text-3xl">Best Case</p>
              <p className="text-3xl font-bold mt-4">x1.5 – x2.5</p>
              <p className="text-sm md:text-base text-tertiary mt-4">
                Maximum gain potential
              </p>
            </div>
            <div className="text-center">
              <p className="text-primary font-semibold text-3xl">Normal Case</p>
              <p className="text-3xl font-bold mt-4">x0.9 – x1.2</p>
              <p className="text-sm md:text-base text-tertiary mt-4">
                Balanced outcome
              </p>
            </div>
            <div className="text-center">
              <p className="text-primary font-semibold text-3xl">Risk Case</p>
              <p className="text-3xl font-bold mt-4">x0.5 – x0.8</p>
              <p className="text-sm md:text-base text-tertiary mt-4">
                Potential partial loss
              </p>
            </div>
          </div>
          <p className="text-center text-sm md:text-base text-tertiary mt-8 max-w-4xl mx-auto">
            The Alchemy Gateway conversion process is algorithm-based and may
            result in variable token yields. The number of Bitcoin-Yay Tokens you
            receive can be higher or lower than your input, depending on the
            current refinement tier and system logic. Converted tokens are final
            and cannot be reversed. By proceeding, you confirm that you
            understand and accept these terms.
          </p>
        </div>

        <div className="mt-70 max-w-5xl mx-auto">
          <h3 className="text-4xl md:text-5xl xl:text-8xl font-bold text-center max-w-7xl mx-auto">
            Alchemy Stages
          </h3>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div className=" text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center text-2xl">
                <Image src={FortuneFunnelIcon} alt="Fortune Funnel" className="w-20 h-20" />
              </div>
              <p className="text-2xl font-semibold">Fortune Funnel</p>
              <p className="text-sm md:text-base text-tertiary">
                Your starting stage at 50,000 Nuggets. High risk with lower
                rewards, good for early conversions but results can vary.
              </p>
            </div>
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20  flex items-center justify-center text-2xl">
                <Image src={MegaPathIcon} alt="Mega Path" className="w-20 h-20" />
              </div>
              <p className="text-2xl font-semibold">Mega Path</p>
              <p className="text-sm md:text-base text-tertiary">
                Unlocked at 100,000 Nuggets. Balanced risk and reward, a steady,
                more predictable stage for conversions.
              </p>
            </div>
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-20 h-20  flex items-center justify-center text-2xl">
                <Image src={AlchemyGatewayIcon} alt="Alchemy Gateway" className="w-20 h-20" />
              </div>
              <p className="text-2xl font-semibold">Alchemy Gateway</p>
              <p className="text-sm md:text-base text-tertiary">
                Reached at 200,000 Nuggets. Lowest risk and highest reward, the
                best stage for strong conversion outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-60">
        <Image
          src={BgArtImage1}
          alt="Bg Art 1"
          className="absolute -top-60 left-0 -z-20"
        />
      </div>
      {/* <div id="alchemy-gateway">
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
              className={`mt-4 text-lg font-semibold group-hover:text-primary ${isPowerMiningActive ? "text-primary" : ""
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
      </div> */}

      <div className="mt-60 mb-80" id="alchemy-how-it-works">
        <h2 className="text-4xl md:text-5xl xl:text-8xl font-bold text-center max-w-7xl" >
          How Alchemy works
        </h2>
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-20">
          <div className="flex flex-col items-center text-center max-w-xs ">
            <Image
              src={FreeMiningButtonImage}
              alt="Free Snatch Mining"
              className="h-30 w-auto"
            />
            <p className="mt-6 text-2xl font-semibold">Free Snatch Mining</p>
            <p className="mt-4 text-base text-tertiary">
              Free Mining enters Alchemy with lower stability.
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-sm">
            <Image
              src={PowerMiningButtonImage}
              alt="Subscription Power Mining"
              className="h-30 w-auto"
            />
            <p className="mt-6 text-2xl font-semibold">
              Subscription Power Mining
            </p>
            <p className="mt-4 text-base text-tertiary">
              Power Mining subscriptions feed Alchemy with higher success
            </p>
          </div>
        </div>

        <div className="mt-10 text-xl">
          <ul className=" leading-10 pl-4 md:pl-10">
            <li className="text-[16px] ">
              <span className="font-semibold text-[20px]">1. Select Input Amount</span> <br /> Choose how many BTCY to commit —
              options depend on your user tier (Free, Electric, Turbo, Nuclear,
              Quantum).
            </li>
            <li className="text-[16px]">
              <span className="font-semibold text-[20px]">2. Start Alchemy</span> <br /> Click Start Alchemy → your BTCY enters a
              60-minutes randomized process.
            </li>
            <li className="text-[16px]">
              <span className="font-semibold text-[20px]">3. Wait for 60 Minutes</span> <br /> After 60 minutes, the system reveals your outcome:
              Gain (small or big) or a Partial loss.
            </li>
            <li className="text-[16px]">

              <span className="font-semibold text-[20px]">4. Receive Outcome</span> <br /> Based on your multiplier (e.g., 0.5x, 1.2x,
              2x, 3x), you'll see how much BTCY you get back.
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center mt-20">
          <CustomButton2
            text="Start Alchemy"
            image={StartAlchemyImage}
            imageStyling="w-20 md:w-30"
            link="#alchemy-nuggets-input"
          />
        </div>
      </div>



      {showIgnited && (
        <div className="fixed inset-0 bg-white/40 z-50 flex items-center justify-center px-4">
          <div className="bg-bg1 p-10 max-w-3xl">
            <div className="flex justify-center mb-8">

              <div className=" inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-36 h-36"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Logo glow - orange + gold */}
                  <div
                    className="absolute inset-0 rounded-full blur-[50px]"
                    style={{
                      background: "radial-gradient(circle, rgba(255,135,40,0.5) 0%, rgba(255,215,0,0.3) 100%)",
                    }}
                  />
                  {/* Logo image */}
                  <Image
                    src={ClickConvertIcon}
                    alt="BTCY Logo"
                    className="relative z-10 w-full h-full object-contain"
                    style={{
                      filter: "drop-shadow(0 0 25px rgba(255,135,40,0.7))",
                    }}
                  />
                </motion.div>
              </div>
            </div>
            <h3 className="text-4xl md:text-6xl font-semibold mb-10 text-center">
              Alchemy Ignited
            </h3>
            <p className="text-lg mb-3">
              Your Nuggets are now entering the BTCY Alchemy Engine.
            </p>
            <p className="text-lg mb-3">
              The system will run its preset algorithm, analyzing your mining
              activity, stage level, and referral impact.
            </p>
            <p className="text-lg mb-3">
              Your final outcome may be a gain, neutral result, or loss of
              Nuggets.
            </p>
            <p className="text-lg mb-6">
              This process can take up to 60 minutes, and your Nuggets remain
              locked during analysis.
            </p>
            <p className="text-sm text-tertiary">
              Returns are algorithm-driven and may vary.
            </p>
          </div>
        </div>
      )}

      <div className="mt-80 font-light flex flex-col gap-4 mb-40">
        <h3 className="text-xl font-semibold">Disclaimer</h3>
        <p>
          By participating in the BTCY Alchemy process (“Alchemy”), you
          acknowledge and agree to the following terms and conditions:
        </p>

        <div>
          <p className="font-semibold mt-4">1. Nature Of The Alchemy Process</p>
          <ul className="list-disc pl-4">
            <li>
              Voluntary, randomized yield: Alchemy is a voluntary, server-side
              randomized mechanism. You choose an amount of BTCY to commit (e.g.
              5,000 – 15,000), and after one hour you will receive a return
              based on a randomly selected multiplier, which may result in a
              gain or partial loss.
            </li>
            <li>
              No guaranteed returns: All returns are probabilistic. Past
              outcomes do not predict future results.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">2. Risk Disclosure</p>
          <ul className="list-disc pl-4">
            <li>
              Partial loss possible: Committed BTCY may return at any multiplier
              within the published range—including outcomes down to 0.3x
              (losing 70% of your stake).
            </li>
            <li>
              Volatility: Larger stake tiers offer higher maximum multiplier, but
              inherently carry higher risk of substantial loss.
            </li>
            <li>
              Pool cap & dynamic odds: A fixed daily BTCY payout pool (e.g. 30
              million BTCY) caps total Alchemy rewards. As the pool depletes,
              odds and/or returns may adjust automatically to preserve remaining
              balance.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">3. Fairness & Transparency</p>
          <ul className="list-disc pl-4">
            <li>
              Secure RNG: Alchemy uses a cryptographically secure, server-based
              random number generator to determine outcomes.
            </li>
            <li>
              Provable fairness option: You may verify each result against a
              seed hash prior to execution, enabling on-chain auditability if
              you choose.
            </li>
            <li>
              Play limits: Each user may participate only once per hour, and may
              commit only predefined percentages of their mined BTCY.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">4. Claiming Your Rewards</p>
          <ul className="list-disc pl-4">
            <li>
              Claim destinations:
              <ul className="list-disc pl-4">
                <li>
                  <span className="font-semibold">CEX (Indexx Exchange):</span>
                  Rewards credited instantly to your verified Indexx account,
                  with no blockchain gas fees. Requires a registered, KYC-verified
                  Indexx account.
                </li>
                <li>
                  <span className="font-semibold">
                    DEX (Connected Wallet):
                  </span>
                  Rewards sent on-chain to your linked wallet. You bear all
                  applicable gas fees and are responsible for providing a correct
                  address.
                </li>
              </ul>
            </li>
            <li>
              One claim per batch: Each Alchemy result can be claimed only once.
              Attempting duplicate or manual replays of the same result will be
              rejected.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">
            5. Pool Management & Suspension
          </p>
          <ul className="list-disc pl-4">
            <li>
              Automatic suspension: If the daily pool is exhausted or nears
              depletion, Alchemy will automatically pause new entries or reduce
              reward odds to prevent over-distribution.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">6. Optional Enhancements</p>
          <ul className="list-disc pl-4">
            <li>
              Alchemy streaks: Consecutive daily participation may improve your
              odds within published tiers.
            </li>
            <li>
              Mystery boxes: Select from three unopened “boxes” for hidden
              multipliers—risks and rewards as defined by the same RNG logic.
            </li>
            <li>
              NFT catalysts: Holding certain qualifying NFTs grants preferential
              odds (reduced loss probability or boosted gain chances).
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">
            7. No Financial Advice & Assumption Of Risk
          </p>
          <ul className="list-disc pl-4">
            <li>
              Not investment advice: Alchemy is a game-style mechanism, not an
              investment service. By committing BTCY, you acknowledge understanding
              of and acceptance of all associated risks, including partial or
              total loss of your stake.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mt-4">8. Security & Compliance</p>
          <ul className="list-disc pl-4">
            <li>
              Identity verification: Conversions of large BTCY amounts to external
              assets may require KYC/AML verification.
            </li>
            <li>
              Immutable blockchain records: All DEX claims and on-chain
              transactions are permanently recorded on the blockchain and cannot
              be reversed.
            </li>
            <li>
              Protect your credentials: Never share private keys, seed phrases,
              or account credentials. BTCY sent to incorrect or malicious
              addresses cannot be recovered.
            </li>
          </ul>
        </div>

        <p className="font-semibold mt-6">
          By clicking “Start Alchemy”, you confirm that you have read,
          understood, and agree to all the above terms.
        </p>
      </div>
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClick={handleRegisterClick}
      />
    </div >
  );
}
