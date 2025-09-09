"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import PopupComponent from "@/components/PopupComponent";
import USDTIcon from "@/assets/images/quantum-mining/tether.webp";
import USDCIcon from "@/assets/images/quantum-mining/usdc.webp";

export default function PaymentPopup({
  isOpen,
  onClose,
  cryptoType,
  amount,
}: {
  isOpen: boolean;
  onClose: () => void;
  cryptoType: string;
  amount: number;
}) {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <div>
      <PopupComponent isOpen={isOpen} onClose={onClose}>
        <div className="w-90 md:w-120 lg:w-160 p-4 md:p-6 xl:p-10 text-center">
          <div>
            <h1 className="text-xl md:text-3xl font-bold"> Pay with QR Code</h1>
            <p className="md:text-xl text-tertiary mt-2">
              You can pay for your BTCY purchase through this QR code. Just scan
              using your crypto wallet or compatible payment app to complete the
              transaction.
              <br />
              You have 10 minutes to complete this payment. After that, the
              session will expire, and you’ll need to try again.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Image
              src={cryptoType == "USDT" ? USDTIcon : USDCIcon}
              alt="icon"
              className="w-8 md:w-10"
            />
            <p className="text-2xl md:text-3xl">{cryptoType}</p>
          </div>
          <p className="mt-3 text-xl md:text-2xl">
            You pay <span className="font-bold">${amount}</span>
          </p>
          <div className="text-3xl font-semibold mt-6">
            {formatTime(timeLeft)}
          </div>

          {/* qr code */}
          <div className="mt-4 h-60 md:h-80"></div>
        </div>
      </PopupComponent>
    </div>
  );
}
