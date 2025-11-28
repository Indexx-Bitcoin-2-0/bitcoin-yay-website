"use client";

import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useSearchParams } from "next/navigation";
import TronWeb from "tronweb";
import type { TronWeb as TronWebConstructor } from "tronweb";
import { Check } from "lucide-react";
import CustomButton2 from "@/components/CustomButton2";
import PopupComponent from "@/components/PopupComponent";
import WalletIcon from '@/assets/images/alchemy/home/walletIcon.png';
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import { TRONABI } from "@/contracts/tron/abi";
import { finalizeClickConvertSessionState } from "@/lib/alchemy";

const SOLANA_CLAIM_ADDRESS = "7RUbRcqvQ7gXNmfuxsoUoputPXT85fGzoPSu6xXi6U9p";
const TRON_CLAIM_ADDRESS = "TJVh7pdziZHNaEwfmBcwZN5JjuEjnN1xzB";
const BSC_CHAIN_ID = "0x38";
const BSC_NETWORK_PARAMS = {
  chainId: BSC_CHAIN_ID,
  chainName: "BNB Smart Chain Mainnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
};

type ClaimDestinationId = "tron" | "solana" | "indexx" | "ethereum" | "binance";

type ClaimDestination = {
  id: ClaimDestinationId;
  name: string;
  description: string;
  walletName: string;
  recommended?: string;
  installUrl?: string;
  claimAddress?: string;
  fastTrack?: boolean;
  note?: string;
};

type TronWebInstance = InstanceType<typeof TronWebConstructor>;

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

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

const ETHEREUM_CLAIM_ADDRESS = "0x22726F15677F6a569F42ea9a4de6e5e5eEd9B93b";

const claimDestinations: ClaimDestination[] = [
  {
    id: "indexx",
    name: "Indexx Asset Wallet",
    description: "Centralized exchange wallet",
    recommended: "Indexx Asset Wallet (fast-track claims)",
    walletName: "Indexx Asset Wallet",
    fastTrack: true,
  },
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
    id: "ethereum",
    name: "Ethereum",
    description: "Decentralized wallet on Ethereum Network",
    recommended: "MetaMask",
    walletName: "MetaMask",
    installUrl: "https://metamask.io/download/",
    note:
      "Ethereum claims are routed through the Indexx Asset Wallet dashboard while MetaMask integration is being finalized.",
    claimAddress: ETHEREUM_CLAIM_ADDRESS,
  },
  {
    id: "binance",
    name: "Binance Smart Chain",
    description: "Decentralized wallet on BNB Smart Chain",
    recommended: "MetaMask",
    walletName: "MetaMask",
    installUrl: "https://metamask.io/download/",
    note:
      "MetaMask is recommended for BSC claims. Switch your network to BNB Smart Chain before submitting a claim.",
    claimAddress: ETHEREUM_CLAIM_ADDRESS,
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
    tronWeb?: TronWebInstance | null;
    tronLink?: {
      request?: (options: { method: string }) => Promise<string[]>;
    };
    ethereum?: EthereumProvider;
  }
}

type TronClaimStatusState = {
  checking: boolean;
  isWhitelisted: boolean | null;
  hasClaimed: boolean | null;
};

export default function ClaimPage() {
  const { user, isLoading } = useAuth();
  const [selectedDestination, setSelectedDestination] = useState<ClaimDestinationId>("tron");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [walletState, setWalletState] = useState(initialWalletState);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [sessionFinalized, setSessionFinalized] = useState(false);
  const [isSessionFinalizing, setIsSessionFinalizing] = useState(false);
  const [tronClaimStatus, setTronClaimStatus] = useState<TronClaimStatusState>({
    checking: false,
    isWhitelisted: null,
    hasClaimed: null,
  });
  const [tronStatusError, setTronStatusError] = useState<string | null>(null);
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string | null>(null);
  const [ethereumState, setEthereumState] = useState({
    installed: false,
    connected: false,
    address: "",
    chainId: "",
  });
  const [ethereumError, setEthereumError] = useState<string | null>(null);

  const selectedDestinationData =
    claimDestinations.find((destination) => destination.id === selectedDestination) ??
    claimDestinations[0];

  const walletInfo =
    selectedDestination === "solana"
      ? walletState.phantom
      : selectedDestination === "tron"
      ? walletState.tronLink
      : ["ethereum", "binance"].includes(selectedDestination)
      ? ethereumState
      : null;

  const isBinanceNetworkReady =
    ethereumState.chainId?.toLowerCase() === BSC_CHAIN_ID.toLowerCase();
  const walletRequired = ["solana", "tron", "ethereum", "binance"].includes(
    selectedDestination
  );
  const walletReady =
    selectedDestination === "solana"
      ? walletState.phantom.connected
      : selectedDestination === "tron"
      ? walletState.tronLink.connected
      : selectedDestination === "binance"
      ? ethereumState.connected && isBinanceNetworkReady
      : selectedDestination === "ethereum"
      ? ethereumState.connected
      : true;

  const walletWarningMessage = `Connect ${selectedDestinationData.walletName} to proceed with claiming on ${selectedDestinationData.name}.`;
  const walletErrorMessage = `Connect ${selectedDestinationData.walletName} before claiming on ${selectedDestinationData.name}.`;

  const searchParams = useSearchParams();
  const rawAmountParam = searchParams.get("amount");
  const numericAmount =
    rawAmountParam && rawAmountParam.trim() !== ""
      ? Number(rawAmountParam)
      : undefined;
  const parsedClaimAmount =
    numericAmount !== undefined && !Number.isNaN(numericAmount)
      ? numericAmount
      : undefined;
  const formatAvailableBalance = (value?: number, decimals = 2) => {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "—";
    }
    const hasFractionalPart = value % 1 !== 0;
    return value.toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: hasFractionalPart ? decimals : 0,
    });
  };
  const availableBalance = formatAvailableBalance(parsedClaimAmount, 2);

  useEffect(() => {
    if (!isLoading && !user) {
      setIsLoginPopupOpen(true);
    }
  }, [isLoading, user]);

  async function fetchTronClaimStatus(address: string) {
    if (!window.tronWeb) {
      throw new Error("TronLink wallet not available");
    }

    const contract = await window.tronWeb.contract(TRONABI, TRON_CLAIM_ADDRESS);
    const [whitelistRaw, claimedRaw] = await Promise.all([
      contract.methods.airdropWhitelist(address).call(),
      contract.methods.hasClaimedAirdrop(address).call(),
    ]);

    return {
      isWhitelisted: Boolean(whitelistRaw),
      hasClaimed: Boolean(claimedRaw),
    };
  }

  async function refreshTronClaimStatus(address: string) {
    setTronClaimStatus((prev) => ({ ...prev, checking: true }));
    const status = await fetchTronClaimStatus(address);
    setTronClaimStatus({ ...status, checking: false });
    return status;
  }

  const handleManualTronStatusRefresh = async () => {
    if (!walletState.tronLink.address) {
      return;
    }

    setTronStatusError(null);
    try {
      await refreshTronClaimStatus(walletState.tronLink.address);
    } catch (error) {
      console.error("Unable to refresh Tron claim status", error);
      setTronStatusError("Unable to refresh Tron claim status.");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const refreshWalletState = () => {
      const phantomAddress = window.solana?.publicKey?.toString() ?? "";
      const tronAddress = String(
        window.tronWeb?.defaultAddress?.base58 ??
          window.tronWeb?.defaultAddress?.hex ??
          ""
      );

      setWalletState({
        phantom: {
          installed: Boolean(window.solana?.isPhantom),
          connected: Boolean(phantomAddress),
          address: phantomAddress,
        },
        tronLink: {
          installed: Boolean(window.tronWeb) || Boolean(window.tronLink),
          connected: Boolean(tronAddress),
          address: tronAddress,
        },
      });
    };

    refreshWalletState();

    const handlePhantomConnectListener = (args: unknown) => {
      const publicKey = (args as { publicKey?: { toString: () => string } })?.publicKey;
      if (!publicKey) return;
      const address = publicKey.toString();
      setWalletState((prev) => ({
        ...prev,
        phantom: {
          installed: true,
          connected: true,
          address,
        },
      }));
    };

    const handlePhantomDisconnectListener = () => {
      setWalletState((prev) => ({
        ...prev,
        phantom: {
          ...prev.phantom,
          connected: false,
        },
      }));
    };

    window.solana?.on?.("connect", handlePhantomConnectListener);
    window.solana?.on?.("disconnect", handlePhantomDisconnectListener);

    return () => {
      window.solana?.removeListener?.("connect", handlePhantomConnectListener);
      window.solana?.removeListener?.("disconnect", handlePhantomDisconnectListener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const provider = window.ethereum;
    if (!provider) {
      setEthereumState({
        installed: false,
        connected: false,
        address: "",
        chainId: "",
      });
      return;
    }

    const syncEthereumState = async () => {
      try {
        const accounts = (await provider.request({
          method: "eth_accounts",
        })) as string[];
        const chainId = (await provider.request({
          method: "eth_chainId",
        })) as string;
        setEthereumState({
          installed: true,
          connected: Boolean(accounts?.length),
          address: accounts?.[0] ?? "",
          chainId: chainId ?? "",
        });
        setEthereumError(null);
      } catch (error) {
        console.error("Unable to synchronize MetaMask state", error);
      }
    };

    syncEthereumState();

    const handleAccountsChanged = (accounts: string[]) => {
      setEthereumState((prev) => ({
        ...prev,
        connected: Boolean(accounts?.length),
        address: accounts?.[0] ?? "",
      }));
    };

    const handleChainChanged = (chainId: string) => {
      setEthereumState((prev) => ({ ...prev, chainId }));
    };

    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, []);

  useEffect(() => {
    if (!walletState.tronLink.connected || !walletState.tronLink.address) {
      setTronClaimStatus({
        checking: false,
        isWhitelisted: null,
        hasClaimed: null,
      });
      setTronStatusError(null);
      return;
    }

    setTronStatusError(null);
    refreshTronClaimStatus(walletState.tronLink.address).catch((error) => {
      console.error("Unable to load Tron claim status", error);
      setTronStatusError("Unable to load Tron claim status.");
    });
  }, [walletState.tronLink.address, walletState.tronLink.connected]);

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

  const connectMetaMaskWallet = async () => {
    setClaimError(null);
    setEthereumError(null);

    if (typeof window === "undefined" || !window.ethereum) {
      setClaimError("MetaMask or a compatible Web3 wallet is required.");
      return;
    }

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      const chainId = (await window.ethereum.request({
        method: "eth_chainId",
      })) as string;
      setEthereumState({
        installed: true,
        connected: Boolean(accounts?.length),
        address: accounts?.[0] ?? "",
        chainId: chainId ?? "",
      });
      setClaimStatus("MetaMask wallet connected.");
    } catch (error) {
      console.error("Unable to connect MetaMask", error);
      const message = error instanceof Error ? error.message : "Failed to connect MetaMask.";
      setClaimError(message);
      setEthereumError(message);
    }
  };

  const switchToBscNetwork = async () => {
    setClaimError(null);
    if (typeof window === "undefined" || !window.ethereum) {
      setClaimError("MetaMask is required to switch networks.");
      return;
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_CHAIN_ID }],
      });
      setEthereumError(null);
      setClaimStatus("Switched to BNB Smart Chain.");
    } catch (error) {
      const err = error as { code?: number };
      if (err.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BSC_NETWORK_PARAMS],
          });
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BSC_CHAIN_ID }],
          });
          setEthereumError(null);
          setClaimStatus("Switched to BNB Smart Chain.");
        } catch (addError) {
          console.error("Unable to add BSC to MetaMask", addError);
          const message =
            addError instanceof Error
              ? addError.message
              : "Unable to add BNB Smart Chain to MetaMask.";
          setClaimError(message);
          setEthereumError(message);
        }
      } else {
        console.error("Unable to switch network", error);
        const message =
          error instanceof Error
            ? error.message
            : "Unable to switch MetaMask to BNB Smart Chain.";
        setClaimError(message);
        setEthereumError(message);
      }
    }
  };

  const handleWalletConnectClick = async () => {
    if (selectedDestination === "solana" || selectedDestination === "tron") {
      await connectWallet(selectedDestination);
    } else if (selectedDestination === "ethereum" || selectedDestination === "binance") {
      await connectMetaMaskWallet();
    }
  };

  const finalizeSessionBeforeClaim = async () => {
    if (sessionFinalized) return true;
    setIsSessionFinalizing(true);
    setClaimStatus("Finalizing your session before claiming...");
    try {
      const res = await finalizeClickConvertSessionState({ forceComplete: true });
      console.log("Session finalized:", res);
      setSessionFinalized(true);
      setClaimStatus("Session finalized. Proceed with your claim.");
      return true;
    } catch (error) {
      setClaimError(
        error instanceof Error
          ? error.message
          : "Unable to finalize the session before claiming."
      );
      setClaimStatus(null);
      return false;
    } finally {
      setIsSessionFinalizing(false);
    }
  };

  /**
   * The Solana claim instruction layout is defined by the on-chain program.
   * Run `anchor idl fetch 7RUbRcqvQ7gXNmfuxsoUoputPXT85fGzoPSu6xXi6U9p > solana-claim-idl.json`
   * (or ask the program owner for the IDL) so you know which accounts and data are required.
   * Use the IDL definition (or BufferLayout) to build a `TransactionInstruction` and send it
   * via `connection.sendTransaction` using the connected Phantom wallet.
   */
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
    const isAddressValid =
      window.tronWeb?.utils?.address?.isAddress?.(address) ??
      (typeof TronWeb?.utils?.address?.isAddress === "function" &&
        TronWeb.utils.address.isAddress(address));

    if (!isAddressValid) {
      throw new Error("The connected Tron address is invalid");
    }

    setTronStatusError(null);
    const status = await refreshTronClaimStatus(address);
    if (!status.isWhitelisted) {
      throw new Error("Your address is not whitelisted for the Tron claim yet.");
    }
    if (status.hasClaimed) {
      throw new Error("This address has already claimed via the Tron contract.");
    }

    const contract = await window.tronWeb.contract(TRONABI, TRON_CLAIM_ADDRESS);
    const claimTx = (await contract.methods.claim().send({
      from: address,
    })) as { txid?: string; result?: string } | null;

    const balanceSun = await window.tronWeb.trx.getBalance(address);
    const balanceTrx = (balanceSun ?? 0) / 1_000_000;

    await refreshTronClaimStatus(address).catch(() => {});

    return `TronLink wallet ${formatShortAddress(
      address
    )} ready (${balanceTrx.toFixed(4)} TRX). Claim transaction sent: ${
      claimTx?.txid ?? claimTx?.result ?? "pending"
    }. BTCY tokens will arrive through ${TRON_CLAIM_ADDRESS}.`;
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
        setClaimSuccessMessage(message);
      } else if (selectedDestination === "tron") {
        if (!walletState.tronLink.connected) {
          throw new Error("Please connect your TronLink wallet before claiming.");
        }
        const message = await claimOnTron(walletState.tronLink.address);
        setClaimStatus(message);
        setClaimSuccessMessage(message);
      } else {
        const message =
          "Indexx Asset Wallet claims are custodial and will be processed within your Indexx wallet dashboard.";
        setClaimStatus(message);
        setClaimSuccessMessage(message);
      }
    } catch (error) {
      setClaimError(
        error instanceof Error ? error.message : "Unable to claim tokens right now."
      );
    } finally {
      setIsClaiming(false);
    }
  };

  const openConfirmPopup = async () => {
    setClaimError(null);
    if (walletRequired && !walletReady) {
      setClaimError(walletErrorMessage);
      return;
    }

    if (isSessionFinalizing) {
      return;
    }

    const finalized = await finalizeSessionBeforeClaim();
    if (!finalized) return;

    setIsConfirmPopupOpen(true);
  };

  const claimButtonDisabled =
    isSessionFinalizing || isClaiming || Boolean(claimSuccessMessage);
  const claimButtonLabel = isSessionFinalizing
    ? "Finalizing..."
    : isClaiming
    ? "Claiming..."
    : "Claim Tokens";

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
          <p className="text-xl md:text-xl text-tertiary mt-2 md:mt-3">BTCY TOKEN</p>
        </div>

        {/* Select Claim Destination */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-xl text-white mb-6 md:mb-8">
            Select Claim Destination
          </h2>
          <div className="space-y-4 md:space-y-5">
            {claimDestinations.map((destination) => {
              const isRecommendedLayout = destination.id === "indexx";
              const isSelected = selectedDestination === destination.id;
              return (
                <div
                  key={destination.id}
                  onClick={() => setSelectedDestination(destination.id)}
                  className={`p-5 md:p-6 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                    ? "border-primary shadow-[0_0_0_2px_rgba(255,159,20,0.5)]"
                    : "border-bg2 hover:border-bg3"
                    } ${isRecommendedLayout && !isSelected ? "bg-white/5" : ""}`}
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
                        <div className="flex flex-wrap gap-2 text-[11px]">
                          <span className="text-xs text-white">
                            Recommended: {destination.recommended}
                          </span>
                          {destination.fastTrack && (
                            <span className="rounded-full border border-primary px-2 py-0.5 uppercase tracking-[0.3em] text-white/80">
                              Fast Track
                            </span>
                          )}
                        </div>
                      )}
                      {isRecommendedLayout && (
                        <div className="text-xs text-white/70">
                          Liquidity pool support coming soon for withdrawals.
                        </div>
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
              );
            })}
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
                : selectedDestinationData.note ??
                  "Your Indexx Asset Wallet claim is processed inside the centralized dashboard."}
            </p>
            {ethereumError && (
              <p className="text-xs text-red-400">{ethereumError}</p>
            )}
            {selectedDestination === "binance" && ethereumState.installed && (
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  onClick={switchToBscNetwork}
                  disabled={isBinanceNetworkReady}
                  className="rounded-full border border-bg2 px-4 py-2 text-xs font-semibold text-white transition hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBinanceNetworkReady
                    ? "BNB Smart Chain active"
                    : "Switch to BNB Smart Chain"}
                </button>
                {!isBinanceNetworkReady && ethereumState.chainId && (
                  <p className="text-xs text-amber-300">
                    Currently on {ethereumState.chainId}. Switch to BNB Smart Chain.
                  </p>
                )}
              </div>
            )}
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
                  onClick={() => {
                    const claimAddress = selectedDestinationData.claimAddress;
                    if (claimAddress) handleCopyAddress(claimAddress);
                  }}
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

        {selectedDestination === "tron" && (
          <div className="mb-6 rounded-2xl border border-bg2 bg-bg1 p-5 space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-tertiary">Tron Claim Status</p>
                <p className="text-sm text-white">Live on-chain state for the connected wallet</p>
              </div>
              <button
                type="button"
                onClick={handleManualTronStatusRefresh}
                disabled={!walletState.tronLink.connected || tronClaimStatus.checking}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${walletState.tronLink.connected && !tronClaimStatus.checking
                  ? "border-primary text-primary hover:bg-primary/10"
                  : "border-white/20 text-white/60 cursor-not-allowed"
                  }`}
              >
                {tronClaimStatus.checking ? "Refreshing…" : "Refresh status"}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-tertiary">Whitelist</p>
                <p className="text-sm text-white">
                  {tronClaimStatus.checking
                    ? "Checking…"
                    : tronClaimStatus.isWhitelisted === null
                    ? "Unknown"
                    : tronClaimStatus.isWhitelisted
                    ? "Whitelisted"
                    : "Not whitelisted yet"}
                </p>
              </div>
              <div>
                <p className="text-xs text-tertiary">Claimed</p>
                <p className="text-sm text-white">
                  {tronClaimStatus.checking
                    ? "Checking…"
                    : tronClaimStatus.hasClaimed === null
                    ? "Unknown"
                    : tronClaimStatus.hasClaimed
                    ? "Already claimed"
                    : "Not claimed yet"}
                </p>
              </div>
            </div>
            <p className="text-xs text-tertiary">
              These values mirror the on-chain view functions before you confirm a claim.
            </p>
            {tronStatusError && (
              <p className="text-xs text-red-400">{tronStatusError}</p>
            )}
          </div>
        )}

        {/* Claim Tokens Button */}
        <div
          className={`flex justify-center mb-6 md:mb-8 ${claimButtonDisabled ? "pointer-events-none opacity-70" : ""}`}
        >
          <div className="relative">
            <CustomButton2
              text={claimButtonLabel}
              image={WalletIcon}
              imageStyling="w-20 md:w-30"
              onClick={openConfirmPopup}
            />
            {claimButtonDisabled && (
              <span className="absolute inset-x-0 bottom-[-28px] text-xs text-primary text-center">
                {isSessionFinalizing ? "Finalizing your session…" : "Claim transaction in progress…"}
              </span>
            )}
          </div>
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

        {claimSuccessMessage && (
          <PopupComponent isOpen onClose={() => setClaimSuccessMessage(null)}>
            <div className="w-72 md:w-96 bg-bg p-6 rounded-2xl flex flex-col gap-4">
              <p className="text-base text-white leading-relaxed">
                {claimSuccessMessage}
              </p>
              <button
                type="button"
                onClick={() => setClaimSuccessMessage(null)}
                className="w-full rounded-full border border-primary/70 bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition"
              >
                Close
              </button>
            </div>
          </PopupComponent>
        )}

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
