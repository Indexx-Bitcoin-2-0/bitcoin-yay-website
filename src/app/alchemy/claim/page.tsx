"use client";

import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import TronWeb from "tronweb";
import { Check } from "lucide-react";
import CustomButton2 from "@/components/CustomButton2";
import PopupComponent from "@/components/PopupComponent";
import WalletIcon from '@/assets/images/alchemy/home/walletIcon.png';
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";

const availableBalance = "250,000";

const SOLANA_CLAIM_ADDRESS = "7RUbRcqvQ7gXNmfuxsoUoputPXT85fGzoPSu6xXi6U9p";
const TRON_CLAIM_ADDRESS = "TJVh7pdziZHNaEwfmBcwZN5JjuEjnN1xzB";

const initialWalletState = {
  phantom: {
    installed: false,
    connected: false,
    address: "",
  },
  tronLink: {
    installed: false,
    connected: false,
    address: "",
  },
};

const claimDestinations = [
  {
    id: "tron",
    name: "Tron",
    description: "Decentralized wallet on Tron Network",
    recommended: "TronLink",
    walletName: "TronLink",
    installUrl: "https://www.tronlink.org",
    claimAddress: TRON_CLAIM_ADDRESS,
  },
  {
    id: "solana",
    name: "Solana",
    description: "Decentralized wallet on Solana Network",
    recommended: "Phantom",
    walletName: "Phantom",
    installUrl: "https://phantom.app",
    claimAddress: SOLANA_CLAIM_ADDRESS,
  },
  {
    id: "indexx",
    name: "Indexx Asset Wallet",
    description: "Centralized exchange wallet",
  },
];

type PhantomProvider = {
  isPhantom?: boolean;
  publicKey?: {
    toString: () => string;
  };
  connect: () => Promise<{
    publicKey: {
      toString: () => string;
    };
  }>;
  disconnect?: () => void;
  on?: (event: string, handler: (args: unknown) => void) => void;
  removeListener?: (event: string, handler: (args: unknown) => void) => void;
};

declare global {
  interface Window {
    solana?: PhantomProvider;
    tronWeb?: TronWeb | null;
    tronLink?: {
      request?: (options: { method: string }) => Promise<string[]>;
    };
  }
}

export default function ClaimPage() {
  const { user, isLoading } = useAuth();
  const [selectedDestination, setSelectedDestination] = useState<"tron" | "solana" | "indexx">("tron");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [walletState, setWalletState] = useState(initialWalletState);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  const selectedDestinationData =
    claimDestinations.find((destination) => destination.id === selectedDestination) ??
    claimDestinations[0];

  const walletInfo =
    selectedDestination === "solana"
      ? walletState.phantom
      : selectedDestination === "tron"
      ? walletState.tronLink
      : null;

  const walletRequired = ["solana", "tron"].includes(selectedDestination);
  const walletReady =
    selectedDestination === "solana"
      ? walletState.phantom.connected
      : selectedDestination === "tron"
      ? walletState.tronLink.connected
      : true;

  const walletWarningMessage = `Connect ${selectedDestinationData.walletName} to proceed with claiming on ${selectedDestinationData.name}.`;
  const walletErrorMessage = `Connect ${selectedDestinationData.walletName} before claiming on ${selectedDestinationData.name}.`;

  useEffect(() => {
    if (!isLoading && !user) {
      setIsLoginPopupOpen(true);
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const refreshWalletState = () => {
      const phantomAddress = window.solana?.publicKey?.toString() ?? "";
      const tronAddress = window.tronWeb?.defaultAddress?.base58 ?? "";

      setWalletState({
        phantom: {
          installed: Boolean(window.solana?.isPhantom),
          connected: Boolean(phantomAddress),
          address: phantomAddress,
        },
        tronLink: {
          installed: Boolean(window.tronWeb?.installed) || Boolean(window.tronLink),
          connected: Boolean(tronAddress),
          address: tronAddress,
        },
      });
    };

    refreshWalletState();

    const handlePhantomConnect = (publicKey: { toString: () => string }) => {
      setWalletState((prev) => ({
        ...prev,
        phantom: {
          installed: true,
          connected: true,
          address: publicKey.toString(),
        },
      }));
    };

    const handlePhantomDisconnect = () => {
      setWalletState((prev) => ({
        ...prev,
        phantom: {
          ...prev.phantom,
          connected: false,
        },
      }));
    };

    window.solana?.on?.("connect", handlePhantomConnect);
    window.solana?.on?.("disconnect", handlePhantomDisconnect);

    return () => {
      window.solana?.removeListener?.("connect", handlePhantomConnect);
      window.solana?.removeListener?.("disconnect", handlePhantomDisconnect);
    };
  }, []);

  useEffect(() => {
    setClaimStatus(null);
    setClaimError(null);
  }, [selectedDestination]);

  const handleLoginSuccess = () => setIsLoginPopupOpen(false);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
  const handleRegisterClick = () => setIsLoginPopupOpen(false);

  const formatShortAddress = (value: string) =>
    value ? `${value.slice(0, 6)}...${value.slice(-4)}` : "";

  const handleCopyAddress = async (address: string) => {
    if (!address) return;

    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setCopyFeedback("Copy not supported on this device");
      return;
    }

    try {
      await navigator.clipboard.writeText(address);
      setCopyFeedback("Address copied");
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback("Failed to copy address");
    }
  };

  const connectWallet = async (network: "solana" | "tron") => {
    setClaimError(null);

    if (typeof window === "undefined") {
      setClaimError("Wallet integration is unavailable in this environment.");
      return;
    }

    try {
      if (network === "solana") {
        if (!window.solana?.isPhantom) {
          throw new Error("Phantom wallet not detected. Please install it first.");
        }
        const response = await window.solana.connect();
        const address = response.publicKey.toString();
        setWalletState((prev) => ({
          ...prev,
          phantom: {
            installed: true,
            connected: true,
            address,
          },
        }));
        setClaimStatus("Phantom wallet connected.");
      } else {
        if (!window.tronWeb && !window.tronLink) {
          throw new Error("TronLink wallet not detected. Please install it first.");
        }
        if (window.tronLink?.request) {
          await window.tronLink.request({ method: "tron_requestAccounts" });
        }
        const address = window.tronWeb?.defaultAddress?.base58;
        if (!address) {
          throw new Error("Unable to read your Tron address. Please unlock your wallet.");
        }
        setWalletState((prev) => ({
          ...prev,
          tronLink: {
            installed: true,
            connected: true,
            address,
          },
        }));
        setClaimStatus("TronLink wallet connected.");
      }
    } catch (error) {
      setClaimError(error instanceof Error ? error.message : "Failed to connect wallet.");
    }
  };

  const handleWalletConnectClick = () => {
    if (selectedDestination === "solana" || selectedDestination === "tron") {
      connectWallet(selectedDestination);
    }
  };

  async function claimOnSolana(address: string) {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const publicKey = new PublicKey(address);
    const lamports = await connection.getBalance(publicKey);
    const balanceSol = lamports / LAMPORTS_PER_SOL;
    return `Phantom wallet ${formatShortAddress(publicKey.toBase58())} ready (${balanceSol.toFixed(
      4
    )} SOL). BTCY tokens will arrive through ${SOLANA_CLAIM_ADDRESS}.`;
  }

  async function claimOnTron(address: string) {
    if (!window.tronWeb) {
      throw new Error("TronLink wallet not available");
    }
    if (!TronWeb.isAddress(address)) {
      throw new Error("The connected Tron address is invalid");
    }
    const balanceSun = await window.tronWeb.trx.getBalance(address);
    const balanceTrx = (balanceSun ?? 0) / 1_000_000;
    return `TronLink wallet ${formatShortAddress(address)} ready (${balanceTrx.toFixed(
      4
    )} TRX). BTCY tokens will arrive through ${TRON_CLAIM_ADDRESS}.`;
  }

  const executeClaim = async () => {
    setClaimStatus(null);
    setClaimError(null);
    setIsClaiming(true);

    try {
      if (selectedDestination === "solana") {
        if (!walletState.phantom.connected) {
          throw new Error("Please connect your Phantom wallet before claiming.");
        }
        const message = await claimOnSolana(walletState.phantom.address);
        setClaimStatus(message);
      } else if (selectedDestination === "tron") {
        if (!walletState.tronLink.connected) {
          throw new Error("Please connect your TronLink wallet before claiming.");
        }
        const message = await claimOnTron(walletState.tronLink.address);
        setClaimStatus(message);
      } else {
        setClaimStatus(
          "Indexx Asset Wallet claims are custodial and will be processed within your Indexx wallet dashboard."
        );
      }
    } catch (error) {
      setClaimError(
        error instanceof Error ? error.message : "Unable to claim tokens right now."
      );
    } finally {
      setIsClaiming(false);
    }
  };

  const openConfirmPopup = () => {
    setClaimError(null);
    if (walletRequired && !walletReady) {
      setClaimError(walletErrorMessage);
      return;
    }

    setIsConfirmPopupOpen(true);
  };

  const closeConfirmPopup = () => setIsConfirmPopupOpen(false);

  const confirmClaim = async () => {
    closeConfirmPopup();
    await executeClaim();
  };

  if (isLoading) {
    return <div className="mt-40 text-center text-3xl">Loading...</div>;
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-bg0 text-white flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-xl text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Claim Your Tokens
            </h1>
            <p className="text-sm md:text-base text-tertiary">
              Please log in to view your BTCY balance and claim destinations.
            </p>
            <CustomButton2
              text="Log in to continue"
              image={WalletIcon}
              imageStyling="w-20 md:w-30"
              onClick={() => setIsLoginPopupOpen(true)}
            />
          </div>
        </div>
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={handleCloseLoginPopup}
          onLoginSuccess={handleLoginSuccess}
          onRegisterClick={handleRegisterClick}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-bg0 text-white">
      <div className="mx-auto max-w-3xl px-6 py-20 mt-40">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-xl md:text-xl font-bold text-white mb-4">
            Claim Your Tokens
          </h1>
          <p className="text-base md:text-base text-tertiary">
            Transform your mined Bitcoin-Yay Nuggets into real digital tokens
          </p>
        </div>

        {/* Available Balance */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base text-tertiary mb-3 md:mb-4">AVAILABLE BALANCE</p>
          <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">{availableBalance}</p>
          <p className="text-xl md:text-xl text-tertiary mt-2 md:mt-3">BTCY</p>
        </div>

        {/* Select Claim Destination */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-xl text-white mb-6 md:mb-8">
            Select Claim Destination
          </h2>
          <div className="space-y-4 md:space-y-5">
            {claimDestinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => setSelectedDestination(destination.id)}
                className={`relative p-5 md:p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedDestination === destination.id
                  ? "border-bg2"
                  : "border-bg2 hover:border-bg3"
                  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {destination.name}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-tertiary mb-1 md:mb-2">
                      {destination.description}
                    </p>
                    {destination.recommended && (
                      <p className="text-xs md:text-sm text-white">
                        Recommended: {destination.recommended}
                      </p>
                    )}
                  </div>
                  {selectedDestination === destination.id && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Integration Guidance */}
        <div className="mb-8">
          <div className="rounded-2xl border border-bg2 bg-bg1 p-5 space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-tertiary">
                  Recommended Wallet
                </p>
                <p className="text-lg font-semibold text-white">
                  {selectedDestinationData.walletName ?? selectedDestinationData.name}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!walletInfo?.installed && selectedDestinationData.installUrl && (
                  <a
                    href={selectedDestinationData.installUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary hover:text-primary"
                  >
                    Install {selectedDestinationData.walletName}
                  </a>
                )}
                {walletInfo?.installed && !walletInfo.connected && (
                  <button
                    type="button"
                    onClick={handleWalletConnectClick}
                    className="rounded-full border border-bg2 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary hover:text-primary"
                  >
                    Connect {selectedDestinationData.walletName}
                  </button>
                )}
                {walletInfo?.connected && (
                  <span className="rounded-full border border-primary/60 px-4 py-2 text-xs font-semibold text-primary">
                    Connected
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-tertiary">
              {walletInfo
                ? walletInfo.connected
                  ? `Connected as ${formatShortAddress(
                      walletInfo.address
                    )} on ${selectedDestinationData.name}.`
                  : walletInfo.installed
                  ? `${selectedDestinationData.walletName} detected. Tap connect to continue.`
                  : `Install ${selectedDestinationData.walletName} to claim on ${selectedDestinationData.name}.`
                : "Your Indexx Asset Wallet claim is processed inside the centralized dashboard."}
            </p>
            {selectedDestinationData.claimAddress && (
              <div className="flex flex-col gap-2 rounded-xl border border-dashed border-white/20 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs text-tertiary">Claim Address</p>
                  <p className="text-sm font-mono text-white">
                    {selectedDestinationData.claimAddress}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyAddress(selectedDestinationData.claimAddress)}
                  className="rounded-full border border-bg2 px-3 py-1 text-xs font-semibold text-white transition hover:border-primary hover:text-primary"
                >
                  Copy
                </button>
                {copyFeedback && (
                  <p className="text-xs text-primary md:ml-3 md:text-right">
                    {copyFeedback}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Claim Tokens Button */}
        <div className="flex justify-center mb-6 md:mb-8">
          <CustomButton2
            text="Claim Tokens"
            image={WalletIcon}
            imageStyling="w-20 md:w-30"
            onClick={openConfirmPopup}
          />
        </div>
        <PopupComponent isOpen={isConfirmPopupOpen} onClose={closeConfirmPopup}>
          <div className="w-72 md:w-96 bg-bg p-6 rounded-2xl flex flex-col gap-4">
            <p className="text-base text-white leading-relaxed">
              Are you sure you want to claim tokens to{" "}
              <span className="font-semibold text-primary">
                {selectedDestinationData.walletName ??
                  selectedDestinationData.name}
              </span>
              ?
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={closeConfirmPopup}
                className="w-full rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-primary/80 hover:text-primary md:w-auto"
              >
                No, cancel
              </button>
              <button
                type="button"
                onClick={confirmClaim}
                className="w-full rounded-full border border-primary/70 bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition md:w-auto"
              >
                Yes, proceed
              </button>
            </div>
          </div>
        </PopupComponent>
        <div className="text-center space-y-1">
          {walletRequired && !walletReady && (
            <p className="text-xs text-amber-300">{walletWarningMessage}</p>
          )}
          {isClaiming && (
            <p className="text-xs text-tertiary">
              Claiming tokens on the {selectedDestinationData.name} network...
            </p>
          )}
          {claimStatus && (
            <p className="text-sm text-primary">{claimStatus}</p>
          )}
          {claimError && (
            <p className="text-sm text-red-400">{claimError}</p>
          )}
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-tertiary max-w-2xl mx-auto leading-relaxed">
            All claims are final and cannot be reversed. Gas fees may apply for decentralized wallets.
          </p>
        </div>
      </div>
    </div>
  );
}
