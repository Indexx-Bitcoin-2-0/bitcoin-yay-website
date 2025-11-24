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

  if (!order) return null;
  if (!isOpen) return null;

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 lg:w-160 p-4 md:p-6 xl:p-10 text-center">
        <div>
          <h1 className="text-xl md:text-2xl lg:3xl font-bold">Pay with QR Code</h1>
          <p className="lg:text-xl text-tertiary mt-2">
            Scan the QR with your wallet and send the exact amount.
            <br />
            This session expires in 10 minutes.
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Image src={icon} alt="icon" className="w-8 lg:w-10" />
          <p className="text-2xl lg:text-3xl">{cryptoType} • {order.blockchain}</p>
        </div>

        <p className="mt-4 text-xl md:text-2xl">
          Send <span className="font-bold">{order.amount}</span> {cryptoType}
        </p>

        {/* countdown */}
        <div className="text-3xl font-semibold mt-2">{formatTime(timeLeft)}</div>

        {/* QR */}
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

        {/* address + copy */}
        <div className="mt-4 text-left">
          <p className="text-sm md:text-base text-tertiary">Receiver address</p>
          <div className="mt-2 flex items-center gap-2 bg-bg2 border border-bg3 rounded-md p-3 overflow-hidden">
            <code className="text-xs md:text-sm break-all">
              {sanitizedReceiverAddress || order.receiverAddress}
            </code>
            <button
              className="ml-auto p-2 rounded hover:bg-bg"
              onClick={() =>
                navigator.clipboard.writeText(
                  sanitizedReceiverAddress || order.receiverAddress,
                )
              }
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Optional instructions */}
          {/* {order.message && (
            <p className="mt-3 text-sm text-tertiary">{order.message}</p>
          )} */}
        </div>

        {/* Order id footer */}
        <div className="mt-4 text-xs text-tertiary">Order: {order.orderId}</div>
      </div>
    </PopupComponent>
  );
}
