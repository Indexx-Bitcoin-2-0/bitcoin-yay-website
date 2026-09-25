"use client";

import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import CancelOrderImage from "@/assets/images/buttons/cancelOrder.svg";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";

/**
 * Tries the inline path first (this site's own session, via the Zodiac
 * estate-token bridge -- see zodiacAuth.js) so most users can just confirm
 * and go. If that balance call ever fails -- expired estate token, some
 * future environment split like bitcoin-yay-mobile hit, anything -- this
 * still offers a way through: indexx_pay's own hosted page, where the user
 * authenticates directly rather than depending on this site's token working
 * for the Wallet API too.
 */
export default function IndexxPayPopup({
  isOpen,
  onClose,
  payAmount,
  btcyAmount,
  usdxxBalance,
  isLoadingBalance,
  balanceError,
  isConfirming,
  onConfirm,
  onOpenIndexxPayWebsite,
}: {
  isOpen: boolean;
  onClose: () => void;
  payAmount: string;
  btcyAmount: string;
  usdxxBalance: number | null;
  isLoadingBalance: boolean;
  balanceError: string | null;
  isConfirming: boolean;
  onConfirm: () => void;
  onOpenIndexxPayWebsite: () => void;
}) {
  const numericAmount = Number(payAmount) || 0;
  const canConfirmInline =
    !isLoadingBalance &&
    !balanceError &&
    usdxxBalance !== null &&
    numericAmount > 0 &&
    numericAmount <= usdxxBalance &&
    !isConfirming;

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 lg:w-140 p-6 md:p-8 xl:p-10 text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          Pay with Indexx Pay
        </h2>
        <p className="text-sm text-tertiary text-center mb-6">
          Spend your USDXX balance for BTCY at the live spot rate.
        </p>

        <div className="space-y-4 bg-white/[0.03] rounded-2xl p-4 md:p-6 border border-white/5">
          <div className="flex justify-between items-center py-2 border-b border-white/[0.05]">
            <span className="text-sm text-tertiary">USDXX balance</span>
            <span className="text-lg font-bold text-white">
              {isLoadingBalance
                ? "Loading…"
                : balanceError
                ? "Unavailable"
                : usdxxBalance !== null
                ? usdxxBalance.toFixed(2)
                : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/[0.05]">
            <span className="text-sm text-tertiary">You pay</span>
            <span className="text-lg font-bold text-white">{numericAmount.toFixed(2)} USDXX</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-tertiary">You get (est.)</span>
            <span className="text-lg font-bold text-primary">{btcyAmount || "0"} BTCY</span>
          </div>
        </div>

        {balanceError && (
          <div className="mt-6 border-l-4 border-red-500 bg-red-500/5 rounded-r-xl p-4">
            <p className="text-sm text-red-400 leading-relaxed">
              Couldn&apos;t load your USDXX balance: {balanceError}
            </p>
          </div>
        )}
        {!balanceError && !isLoadingBalance && usdxxBalance !== null && numericAmount > usdxxBalance && (
          <p className="mt-4 text-sm text-red-400 text-center">Insufficient USDXX balance.</p>
        )}

        <div className="mt-8 border-l-4 border-primary bg-primary/5 rounded-r-xl p-4">
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            Prefer to manage this on Indexx Pay directly? Open it below -- you&apos;ll sign
            in there and come right back here once it&apos;s done.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex justify-center gap-8">
            <CustomButton2
              image={CancelOrderImage}
              text="Close"
              imageStyling="w-20"
              onClick={onClose}
            />
            <CustomButton2
              image={CheckMarkButtonImage}
              text={isConfirming ? "Processing…" : "Confirm & Pay"}
              imageStyling="w-24"
              disabled={!canConfirmInline}
              onClick={onConfirm}
            />
          </div>
          <button
            type="button"
            onClick={onOpenIndexxPayWebsite}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Image src={CartButtonImage} alt="" className="w-5 h-5" />
            Open Indexx Pay website instead
          </button>
        </div>
      </div>
    </PopupComponent>
  );
}
