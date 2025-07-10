"use client";

import React, { useState } from "react";
import PopupComponent from "@/components/PopupComponent";
import { InputOTP } from "@/components/ui/input-otp";
import SendButtonImage from "@/assets/images/buttons/send-button.webp";
import CustomButton2 from "@/components/CustomButton2";

interface EmailVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified: () => void;
  onResendCode: () => void;
}

const EmailVerificationPopup: React.FC<EmailVerificationPopupProps> = ({
  isOpen,
  onClose,
  email,
  onVerified,
  onResendCode,
}) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const submitForm = async () => {
    setError("");
    setIsSubmitting(true);

    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call for verifying code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any 6-digit code
      if (verificationCode.length === 6) {
        onVerified();
        setVerificationCode("");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch {
      setError("Verification failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onResendCode();
    } catch {
      setError("Failed to resend code. Please try again.");
    }

    setIsResending(false);
  };

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-100 bg-bg p-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Verify Your Email
          </h2>
          <p className="text-tertiary text-base">
            Please enter the 6 digits code sent to
          </p>
          <p className="text-tertiary text-base">{email}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          {/* OTP Input */}
          <div className="mb-6">
            <InputOTP
              length={6}
              value={verificationCode}
              onChange={setVerificationCode}
              disabled={isSubmitting}
              className="mb-4"
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>

          {/* Send Button */}
          <div className="flex justify-center mb-6">
            <div
              onClick={(e) => {
                e.preventDefault();
                if (!isSubmitting && verificationCode.length === 6) {
                  submitForm();
                }
              }}
              className={
                isSubmitting || verificationCode.length !== 6
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            >
              <CustomButton2
                image={SendButtonImage}
                text={"Send"}
                link="#"
                imageStyling="w-30"
              />
            </div>
          </div>

          {/* Resend Link */}
          <div className="text-center">
            <span className="text-tertiary text-sm">
              Didn&apos;t receive the code?{" "}
            </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-primary text-sm hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </div>
        </form>
      </div>
    </PopupComponent>
  );
};

export default EmailVerificationPopup;
