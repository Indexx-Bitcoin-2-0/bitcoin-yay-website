import { useEffect, useState } from "react";
import Image from "next/image";
import { Copy } from "lucide-react";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";

import CrossImage from "@/assets/images/icons/cross-icon.webp";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";

export default function UnsuccessPopup({
  isOpen,
  onClose,
  onSubmitTxHash,
  isSubmitting = false,
  errorMessage,
  orderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTxHash?: (txHash: string) => void;
  isSubmitting?: boolean;
  errorMessage?: string;
  orderId?: string;
}) {
  const [txId, setTxId] = useState("");
  const canSubmitTxHash = typeof onSubmitTxHash === "function";

  useEffect(() => {
    if (!isOpen) {
      setTxId("");
    }
  }, [isOpen]);

  const handleCopy = () => {
    if (txId) {
      navigator.clipboard.writeText(txId);
    }
  };

  const handleSubmit = () => {
    const trimmedTxId = txId.trim();
    if (!canSubmitTxHash) {
      onClose();
      return;
    }
    if (!trimmedTxId || isSubmitting) return;
    onSubmitTxHash(trimmedTxId);
  };

  return (
    <div>
      <PopupComponent isOpen={isOpen} onClose={onClose}>
        <div className="w-90 md:w-140 lg:w-150 p-6 md:p-8 xl:p-12 text-center">
          <div className="flex flex-col items-center justify-center">
            <Image src={CrossImage} alt="Unsuccessful" className="w-20 h-20 md:w-24 md:h-24 mb-4" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Payment Unsuccessful
            </h1>

            <div className="space-y-4 text-tertiary text-base md:text-lg lg:text-xl leading-relaxed">
              <p>
                Something went wrong while processing your payment. We weren’t able to automatically detect your transaction. This can happen due to network delays or incorrect payment details.
              </p>
              {canSubmitTxHash && (
                <p>
                If you’ve already completed the payment, please enter your transaction hash (TxID) below so we can verify it manually.
                </p>
              )}
            </div>

            {canSubmitTxHash && (
              <div className="w-full mt-8 text-left">
                <label className="block text-sm md:text-base text-tertiary mb-2">
                  Transaction Hash (TxID)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    placeholder="jsdeiu26923rifhsjy372509ujsty639t487qtegdkjsk"
                    className="w-full px-4 py-3 bg-bg2 border border-bg3 rounded-lg text-sm md:text-base focus:outline-none focus:border-primary pr-12"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-tertiary hover:text-white transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                {orderId && (
                  <p className="mt-3 text-xs text-tertiary">Order: {orderId}</p>
                )}
                {errorMessage && (
                  <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            )}
            {!canSubmitTxHash && errorMessage && (
              <p className="mt-8 text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center">
            <CustomButton2
              image={CheckMarkButtonImage}
              text={
                canSubmitTxHash
                  ? isSubmitting
                    ? "Verifying..."
                    : "Verify Tx Hash"
                  : "OK"
              }
              onClick={handleSubmit}
              imageStyling="w-24 md:w-32 lg:w-40"
            />
          </div>
        </div>
      </PopupComponent>
    </div>
  );
}
