"use client";

import React, { useEffect, useState } from "react";
import PopupComponent from "@/components/PopupComponent";

interface MfaCodePopupProps {
  isOpen: boolean;
  error?: string;
  isSubmitting: boolean;
  onSubmit: (code: string) => void;
  onCancel: () => void;
}

// Second sign-in step for accounts with two-factor on:
// the 6-digit code from the authenticator app, or a recovery code.
const MfaCodePopup: React.FC<MfaCodePopupProps> = ({
  isOpen,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [code, setCode] = useState("");
  const [useRecovery, setUseRecovery] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode("");
      setUseRecovery(false);
    }
  }, [isOpen]);

  const cleaned = useRecovery
    ? code.trim().toUpperCase()
    : code.replace(/\D/g, "");
  const canSubmit =
    !isSubmitting &&
    (useRecovery
      ? cleaned.replace(/[^A-Z0-9]/g, "").length === 10
      : cleaned.length === 6);

  return (
    <PopupComponent isOpen={isOpen} onClose={onCancel}>
      <form
        className="w-90 md:w-120 bg-bg p-8 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) onSubmit(cleaned);
        }}
      >
        <h2 className="text-primary text-2xl md:text-3xl text-center mb-3">
          Enter your code
        </h2>
        <p className="text-tertiary text-base text-center mb-6">
          {useRecovery
            ? "Enter one of the recovery codes you saved when you turned on two-factor."
            : "Open your authenticator app and enter the 6-digit code for your account."}
        </p>

        <input
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputMode={useRecovery ? "text" : "numeric"}
          autoComplete="one-time-code"
          maxLength={useRecovery ? 11 : 6}
          placeholder={useRecovery ? "XXXXX-XXXXX" : "123456"}
          disabled={isSubmitting}
          className="w-full text-2xl p-3 text-center tracking-[0.3em] text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
        />

        {error && (
          <p className="mt-3 text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="button"
          onClick={() => {
            setUseRecovery(!useRecovery);
            setCode("");
          }}
          className="mt-4 text-tertiary text-sm hover:text-primary underline cursor-pointer"
        >
          {useRecovery
            ? "Use my authenticator app instead"
            : "Use a recovery code instead"}
        </button>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-bg3 py-3 text-tertiary hover:border-primary cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-1 rounded-md bg-primary py-3 font-semibold text-bg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Checking…" : "Verify"}
          </button>
        </div>
      </form>
    </PopupComponent>
  );
};

export default MfaCodePopup;
