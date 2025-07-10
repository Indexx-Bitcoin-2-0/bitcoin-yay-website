"use client";

import React, { useState } from "react";
import PopupComponent from "@/components/PopupComponent";
import SubmitButtonImage from "@/assets/images/buttons/submit-button.webp";
import CustomButton2 from "@/components/CustomButton2";

interface ForgotPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSent: (email: string) => void;
}

const ForgotPasswordPopup: React.FC<ForgotPasswordPopupProps> = ({
  isOpen,
  onClose,
  onEmailSent,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const submitForm = async () => {
    setError("");
    setIsSubmitting(true);

    if (!email.trim()) {
      setError("Email is required.");
      setIsSubmitting(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call for sending reset email
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onEmailSent(email);
      setEmail("");
    } catch {
      setError("Failed to send reset email. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 bg-bg p-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Forgot Password
          </h2>
          
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="reset-email"
              className="block text-bg3 text-lg mb-2"
            >
              Email/Phone Number 
            </label>
            <input
              type="email"
              id="reset-email"
              className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Send Button */}
          <div className="flex justify-center">
            <div
              onClick={(e) => {
                e.preventDefault();
                if (!isSubmitting) {
                  submitForm();
                }
              }}
              className={
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            >
              <CustomButton2
                image={SubmitButtonImage}
                text={""}
                link="#"
                imageStyling="w-30"
              />
            </div>
          </div>
        </form>
      </div>
    </PopupComponent>
  );
};

export default ForgotPasswordPopup;
