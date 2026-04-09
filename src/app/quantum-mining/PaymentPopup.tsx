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
  onPaymentConfirmed,
  onCancel,
}: {
  isOpen: boolean;
  onClose: () => void;
  cryptoType: "USDT" | "USDC" | string;
  order: CryptoOrderData | null;
  onPaymentConfirmed?: () => void;
  onCancel?: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}) {
  const [qrSrc, setQrSrc] = useState<string>("");
  const [copied, setCopied] = useState(false);

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

  const sanitizedReceiverAddress = useMemo(() => {
    if (!order?.receiverAddress) return "";
    return sanitizeReceiverAddress(order.receiverAddress);
  }, [order?.receiverAddress]);


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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order) return null;
  if (!isOpen) return null;

  return (
    <PopupComponent isOpen={isOpen} onClose={onCancel || onClose}>
      <div className="w-90 md:w-120 lg:w-160 p-4 md:p-6 xl:p-10 text-left">

        <div className="mt-2 flex flex-col items-center">
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
            <p className="mt-4 text-center text-sm text-tertiary">
              Click or Scan the QR Code
              {copied && <span className="text-green-500 ml-2 animate-pulse">Copied!</span>}
            </p>
          </div>

          {/* countdown */}
          {/* <div className="text-2xl md:text-3xl font-bold mt-6">
            Time Remaining: <span className="text-orange-500">{formatTime(timeLeft)}</span>
          </div> */}
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
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-10">
          <div>
            <p className="text-sm md:text-base leading-relaxed">
              <span className="text-orange-500 font-bold">Step 1:</span>{" "}
              <span className="text-secondary">Scan the QR with your wallet. OR</span>
            </p>
            <p className="text-sm md:text-base text-tertiary leading-relaxed mt-1">
              Copy the receiver address and paste it manually, then open your
              crypto wallet app and select {cryptoType} on the {order.blockchain}{" "}
              network. Paste the copied address into the recipient field, review
              the details, and confirm the transaction. After sending, return to
              this page and tap Payment Confirmed so we can verify the transfer.
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

          </div>
        </div>

        {/* Order id footer */}
        <div className="mt-8 text-xs text-tertiary text-left">Order: {order.orderId}</div>

        {/* Action Buttons */}
        <div className="mt-10 flex items-start justify-around gap-6 md:gap-10">
          <CustomButton2
            image={CheckMarkButtonImage}
            text="Payment Confirmed"
            onClick={() => {
              if (onPaymentConfirmed) onPaymentConfirmed();
              console.log("Payment confirmed by user");
            }}
            imageStyling="w-24 md:w-30"
          />
          <CustomButton2
            image={CancelOrderImage}
            text="Cancel order"
            onClick={onCancel || onClose}
            imageStyling="w-24 md:w-30"
          />
        </div>
      </div>
    </PopupComponent>
  );
}
