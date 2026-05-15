"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

import PopupComponent from "@/components/PopupComponent";
import USDTIcon from "@/assets/images/quantum-mining/tether.webp";
import USDCIcon from "@/assets/images/quantum-mining/usdc.webp";
import { Copy, Check } from "lucide-react";
import CustomButton2 from "@/components/CustomButton2";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import CancelOrderImage from "@/assets/images/buttons/cancelOrder.svg";

type CryptoOrderData = {
  orderId: string;
  paymentMethod: "usdt" | "usdc";
  amount: number; // 👈 already FINAL (WITH FEE from backend)
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
  onPaymentConfirmed,
  onCancel,
}: {
  isOpen: boolean;
  onClose: () => void;
  cryptoType: "USDT" | "USDC" | string;
  order: CryptoOrderData | null;
  onPaymentConfirmed?: () => void;
  onCancel?: () => void;
}) {
  const [qrSrc, setQrSrc] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const icon = cryptoType === "USDT" ? USDTIcon : USDCIcon;

  const sanitizeReceiverAddress = (raw: string) => {
    const trimmed = raw.trim();
    const withoutParams = trimmed.split("?")[0];
    if (!withoutParams) return trimmed;
    if (withoutParams.includes(":")) {
      const [, ...rest] = withoutParams.split(":");
      return rest.join(":") || trimmed;
    }
    return withoutParams;
  };

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    }).format(value);
  };
  const sanitizedReceiverAddress = useMemo(() => {
    if (!order?.receiverAddress) return "";
    return sanitizeReceiverAddress(order.receiverAddress);
  }, [order?.receiverAddress]);

  useEffect(() => {
    const run = async () => {
      if (!isOpen || !sanitizedReceiverAddress) return;
      const url = await QRCode.toDataURL(sanitizedReceiverAddress, {
        width: 512,
        margin: 1,
      });
      setQrSrc(url);
    };
    run();
  }, [isOpen, sanitizedReceiverAddress]);

  const handleCopyAddress = () => {
    const address = sanitizedReceiverAddress || order?.receiverAddress;
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order || !isOpen) return null;

  return (
    <PopupComponent isOpen={isOpen} onClose={onCancel || onClose}>
      <div className="w-90 md:w-120 lg:w-160 p-4 md:p-6 xl:p-10 text-left">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Image src={icon} alt="icon" className="w-8 lg:w-10" />
            <p className="text-xl font-medium">
              {cryptoType} • {order.blockchain}
            </p>
          </div>

          <p className="mt-4 text-base">
            Send {cryptoType} using {order.blockchain}
          </p>

          {/* QR */}
          <div className="mt-6">
            {qrSrc ? (
              <Image
                src={qrSrc}
                alt="QR"
                width={300}
                height={300}
                onClick={handleCopyAddress}
                className="w-60 h-60 rounded-xl cursor-pointer"
              />
            ) : (
              <div className="w-60 h-60 bg-bg2 animate-pulse rounded-xl" />
            )}
          </div>

          {copied && <p className="text-green-500 mt-2">Copied!</p>}
        </div>

        {/* ONLY SHOW BACKEND VALUE */}
        <div className="mt-10 space-y-6">
          <div>
            <p className="text-sm text-tertiary">Amount to Send</p>
            <p className="text-xl font-bold mt-1">
              {formatAmount(order.amount)} {cryptoType}
            </p>
          </div>

          <div>
            <p className="text-sm text-tertiary">Network</p>
            <p className="text-xl font-bold mt-1">{order.blockchain}</p>
          </div>

          <div>
            <p className="text-sm text-tertiary">Receiver Address</p>
            <div className="flex gap-3 mt-2">
              <code className="break-all flex-1 text-sm font-bold">
                {sanitizedReceiverAddress}
              </code>
              <button onClick={handleCopyAddress}>
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-10 space-y-4 text-sm">
          <p>
            <b>Step 1:</b> Send exact amount shown above
          </p>
          <p>
            <b>Step 2:</b> Use correct network
          </p>
          <p>
            <b>Step 3:</b> Confirm transaction
          </p>
        </div>

        <div className="mt-10 flex justify-around">
          <CustomButton2
            image={CheckMarkButtonImage}
            text="Payment Confirmed"
            onClick={() => onPaymentConfirmed?.()}
          />
          <CustomButton2
            image={CancelOrderImage}
            text="Cancel"
            onClick={onCancel || onClose}
          />
        </div>
      </div>
    </PopupComponent>
  );
}
