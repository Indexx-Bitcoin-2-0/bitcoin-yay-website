"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

import PopupComponent from "@/components/PopupComponent";
import USDTIcon from "@/assets/images/quantum-mining/tether.webp";
import USDCIcon from "@/assets/images/quantum-mining/usdc.webp";
import { Copy } from "lucide-react";

type CryptoOrderData = {
  orderId: string;
  paymentMethod: "usdt" | "usdc";
  amount: number;
  receiverAddress: string;
  expiresAt: string;
  message?: string;
  blockchain: "Ethereum" | "Solana";
};

const COUNTDOWN_SECONDS = 600;

export default function PaymentPopup({
  isOpen,
  onClose,
  cryptoType,
  order,
}: {
  isOpen: boolean;
  onClose: () => void;
  cryptoType: "USDT" | "USDC" | string;
  order: CryptoOrderData | null;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(COUNTDOWN_SECONDS);
  const [qrSrc, setQrSrc] = useState<string>("");
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

  const icon = cryptoType === "USDT" ? USDTIcon : USDCIcon;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  // Derived amount string for UI
  const formattedAmount = useMemo(() => {
    if (!order?.amount) return "";
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
    return formatter.format(order.amount);
  }, [order?.amount]);

  const qrPayload = useMemo(() => {
    if (!order?.receiverAddress) return "";

    const address = order.receiverAddress.trim();
    const numericAmount = Number(order.amount ?? 0);

    if (!(numericAmount > 0)) {
      return address;
    }

    const ethereumConfig = {
      usdt: {
        contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chainId: 1,
        decimals: 6,
      },
      usdc: {
        contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48",
        chainId: 1,
        decimals: 6,
      },
    } as const;

    const solanaConfig = {
      usdt: {
        mint: "Es9vMFrzaCER8ZqD2n7R6puj949iMmcWZHe9G39Tqjtz",
        decimals: 6,
      },
      usdc: {
        mint: "EPjFWdd5AufqSSqeM2q9wXwUkdzzShHJPcnCBpiyKvnb",
        decimals: 6,
      },
    } as const;

    if (order.blockchain === "Ethereum") {
      const token = ethereumConfig[order.paymentMethod];
      if (token) {
        const factor = Math.pow(10, token.decimals);
        const amountInMinor = Math.round(numericAmount * factor);
        const amountMinor = BigInt(amountInMinor);
        const methodId = "0xa9059cbb";
        const toParam = address.replace(/^0x/, "").toLowerCase().padStart(64, "0");
        const valueParam = amountMinor.toString(16).padStart(64, "0");
        const dataParam = `${methodId}${toParam}${valueParam}`;

        const params = new URLSearchParams({
          value: "0",
          gas: "90000",
          data: dataParam,
          address,
          uint256: amountInMinor.toString(),
        });

        return `ethereum:${token.contract}@${token.chainId}?${params.toString()}`;
      }
    }

    if (order.blockchain === "Solana") {
      const mint = solanaConfig[order.paymentMethod];
      if (mint) {
        const params = new URLSearchParams({
          amount: numericAmount.toFixed(mint.decimals),
          "spl-token": mint.mint,
        });
        return `solana:${address}?${params.toString()}`;
      }
    }

    const fallbackParams = new URLSearchParams({
      amount: numericAmount.toString(),
    });
    return `${address}?${fallbackParams.toString()}`;
  }, [order?.amount, order?.blockchain, order?.paymentMethod, order?.receiverAddress]);

  // tick every second when open
  useEffect(() => {
    if (!isOpen || !order) return;

    setTimeLeft(COUNTDOWN_SECONDS);
    const id = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [COUNTDOWN_SECONDS, isOpen, order?.orderId]);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(COUNTDOWN_SECONDS);
      setQrSrc("");
    }
  }, [COUNTDOWN_SECONDS, isOpen]);

  // generate QR of the address (simple + widely supported)
  useEffect(() => {
    const run = async () => {
      if (!isOpen || !qrPayload) return;
      try {
        const url = await QRCode.toDataURL(qrPayload, { width: 512, margin: 1 });
        setQrSrc(url);
      } catch (e) {
        console.error("QR gen failed", e);
      }
    };
    run();
  }, [isOpen, qrPayload]);

  const handleRequestClose = () => {
    if (timeLeft > 0) {
      setConfirmCloseOpen(true);
      return;
    }
    onClose();
  };

  const handleCancelPayment = () => {
    setConfirmCloseOpen(false);
    onClose();
  };

  if (!order) return null;
  if (!isOpen) return null;

  return (
    <>
      <PopupComponent isOpen={isOpen} onClose={handleRequestClose}>
        <div className="w-90 md:w-120 lg:w-160 p-4 md:p-6 xl:p-10 text-center">
          <div>
            <h1 className="text-xl md:text-2xl lg:3xl font-bold">
              Pay with QR Code
            </h1>
            <p className="lg:text-xl text-tertiary mt-2">
              Scan the QR with your wallet and send the exact amount.
              <br />
              This session expires in 10 minutes.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <Image src={icon} alt="icon" className="w-8 lg:w-10" />
            <p className="text-2xl lg:text-3xl">
              {cryptoType} • {order.blockchain}
            </p>
          </div>

          <p className="mt-4 text-xl md:text-2xl">
            Send{" "}
            <span className="font-bold">
              {formattedAmount || order.amount}
            </span>{" "}
            {cryptoType}
          </p>

          <div className="text-3xl font-semibold mt-2">
            {formatTime(timeLeft)}
          </div>

          <div className="mt-4 flex items-center justify-center">
            {qrSrc ? (
              <Image
                src={qrSrc}
                alt="Payment QR"
                width={300}
                height={300}
                className="w-64 h-64 lg:w-80 lg:h-80 rounded-md border border-bg3"
              />
            ) : (
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-md border border-bg3 animate-pulse" />
            )}
          </div>

          <div className="mt-4 text-left">
            <p className="text-sm md:text-base text-tertiary">Receiver address</p>
            <div className="mt-2 flex items-center gap-2 bg-bg2 border border-bg3 rounded-md p-3 overflow-hidden">
              <code className="text-xs md:text-sm break-all">
                {order.receiverAddress}
              </code>
              <button
                className="ml-auto p-2 rounded hover:bg-bg"
                onClick={() =>
                  navigator.clipboard.writeText(order.receiverAddress)
                }
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            {order.message && (
              <p className="mt-3 text-sm text-tertiary">{order.message}</p>
            )}
          </div>

          <div className="mt-4 text-xs text-tertiary">Order: {order.orderId}</div>
        </div>
      </PopupComponent>

      <PopupComponent
        isOpen={confirmCloseOpen}
        onClose={() => setConfirmCloseOpen(false)}
      >
        <div className="w-80 md:w-96 p-6 text-center space-y-4">
          <h2 className="text-2xl font-bold">Cancel payment?</h2>
          <p className="text-sm md:text-base text-tertiary">
            Closing this window before the timer ends will cancel your payment
            session. Are you sure you want to exit?
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              className="w-full md:w-auto px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary/10 transition"
              onClick={() => setConfirmCloseOpen(false)}
            >
              Continue payment
            </button>
            <button
              className="w-full md:w-auto px-6 py-3 rounded-md bg-primary text-bg font-semibold hover:opacity-90 transition"
              onClick={handleCancelPayment}
            >
              Cancel payment
            </button>
          </div>
        </div>
      </PopupComponent>
    </>
  );
}
