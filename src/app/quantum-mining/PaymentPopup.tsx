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
  const [now, setNow] = useState<Date>(new Date());
  const [qrSrc, setQrSrc] = useState<string>("");

  const icon = cryptoType === "USDT" ? USDTIcon : USDCIcon;
  // Strip schemes/query params so QR scan only provides the raw address.
  const sanitizeReceiverAddress = (raw: string) => {
    const trimmed = raw.trim();
    const withoutParams = trimmed.split("?")[0];
    if (!withoutParams) return trimmed;
    if (withoutParams.includes(":")) {
      const [maybeScheme, ...rest] = withoutParams.split(":");
      if (rest.length > 0 && maybeScheme.length <= 10) {
        return rest.join(":") || trimmed;
      }
    }
    return withoutParams;
  };

  // countdown based on server expiresAt (10 mins)
  const timeLeft = useMemo(() => {
    if (!order?.expiresAt) return 0;
    const end = new Date(order.expiresAt).getTime();
    const diffSec = Math.ceil((end - now.getTime()) / 1000); // ceil avoids instant 9:59
    return Math.max(0, diffSec);
  }, [order?.expiresAt, now]);

  const sanitizedReceiverAddress = useMemo(() => {
    if (!order?.receiverAddress) return "";
    return sanitizeReceiverAddress(order.receiverAddress);
  }, [order?.receiverAddress]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  // tick every second when open
  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && order?.expiresAt) {
      setNow(new Date());
    }
  }, [isOpen, order?.orderId, order?.expiresAt]);


  // generate QR of the address (simple + widely supported)
  useEffect(() => {
    const run = async () => {
      if (!isOpen || !sanitizedReceiverAddress) return;
      try {
        const url = await QRCode.toDataURL(sanitizedReceiverAddress, {
          width: 512,
          margin: 1,
        });
        setQrSrc(url);
      } catch (e) {
        console.error("QR gen failed", e);
      }
    };
    run();
  }, [isOpen, sanitizedReceiverAddress]);

  const handleCopyAddress = () => {
    const address = sanitizedReceiverAddress || order.receiverAddress;
    if (address) {
      navigator.clipboard.writeText(address);
      // Optional: Add a simple feedback if needed, although user specifically asked for implementation
    }
  };

  if (!order) return null;
  if (!isOpen) return null;

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 lg:w-160 p-4 md:p-6 xl:p-10 text-left">
        <div className="space-y-6">
          <div>
            <p className="text-sm md:text-base leading-relaxed">
              <span className="text-orange-500 font-bold">Step 1:</span>{" "}
              <span className="text-secondary">Scan the QR with your wallet. OR</span>
            </p>
            <p className="text-sm md:text-base text-tertiary leading-relaxed mt-1">
              Copy the receiver address below and paste it manually, then open your crypto wallet app and select {cryptoType} on the {order.blockchain} network. Paste the copied address into the recipient field, review the details, and confirm the transaction. After sending, return to this page and wait for automatic confirmation.
            </p>
          </div>

          <div>
            <p className="text-sm md:text-base leading-relaxed">
              <span className="text-orange-500 font-bold">Step 2:</span>{" "}
              <span className="text-secondary">Enter and send the exact amount.</span>
            </p>
          </div>

          <div>
            <p className="text-sm md:text-base leading-relaxed">
              <span className="text-orange-500 font-bold">Step 3:</span>{" "}
              <span className="text-secondary">Confirm the transaction and wait 1–2 minutes</span>
            </p>
            <p className="text-sm md:text-base text-tertiary leading-relaxed mt-1">
              Do not close this window until you see “Payment Successful” message.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Image src={icon} alt="icon" className="w-8 lg:w-10" />
            <p className="text-xl md:text-2xl font-medium">{cryptoType} • {order.blockchain}</p>
          </div>

          <div className="flex items-center mt-4">
            <p className="text-base font-medium">Send {cryptoType} using the {order.blockchain} blockchain</p>
          </div>

          {/* QR */}
          <div className="mt-6">
            {qrSrc ? (
              <Image
                src={qrSrc}
                alt="Payment QR"
                width={300}
                height={300}
                onClick={handleCopyAddress}
                className="w-60 h-60 lg:w-72 lg:h-72 rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            ) : (
              <div className="w-60 h-60 lg:w-72 lg:h-72 rounded-xl bg-bg2 animate-pulse" />
            )}
            <p className="mt-4 text-center text-sm text-tertiary">Click or Scan the QR Code</p>
          </div>

          {/* countdown */}
          <div className="text-2xl md:text-3xl font-bold mt-6">
            Time Remaining: <span className="text-orange-500">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <p className="text-sm text-tertiary">Deposit</p>
            <p className="text-lg md:text-xl font-bold mt-1">{order.amount} {cryptoType}</p>
          </div>

          <div>
            <p className="text-sm text-tertiary">Network</p>
            <p className="text-lg md:text-xl font-bold mt-1">{order.blockchain}</p>
          </div>

          <div>
            <p className="text-sm text-tertiary">Receiver Address</p>
            <div className="mt-2 flex items-start gap-3">
              <code className="text-sm md:text-base font-bold break-all flex-1">
                {sanitizedReceiverAddress || order.receiverAddress}
              </code>
              <button
                className="shrink-0 p-1 text-primary hover:text-white transition-colors hover:cursor-pointer"
                onClick={handleCopyAddress}
                title="Copy"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Order id footer */}
        <div className="mt-8 text-xs text-tertiary text-center">Order: {order.orderId}</div>
      </div>
    </PopupComponent>
  );
}
