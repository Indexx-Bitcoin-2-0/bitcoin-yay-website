"use client";

import React, { useState } from "react";
import PopupComponent from "@/components/PopupComponent";
import ResetPasswordButtonImage from "@/assets/images/buttons/reset-password-button.webp";
import CustomButton2 from "@/components/CustomButton2";

interface ResetPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordReset: () => void;
}

const ResetPasswordPopup: React.FC<ResetPasswordPopupProps> = ({
  isOpen,
  onClose,
  onPasswordReset,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const submitForm = async () => {
    setErrors({});
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        // Simulate API call for resetting password
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onPasswordReset();
        setPassword("");
        setConfirmPassword("");
      } catch {
        setErrors({ password: "Failed to reset password. Please try again." });
      }
    }

    setIsSubmitting(false);
  };

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 bg-bg p-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Reset Password
          </h2>
          <p className="text-tertiary text-base">
            Please enter strong password mixer of words,
          </p>
          <p className="text-tertiary text-base">
            digits and symbols must contain 8 characters
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Password Field */}
          <div className="mb-2">
            <label
              htmlFor="new-password"
              className="block text-bg3 text-lg mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="new-password"
              className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-2">
            <label
              htmlFor="confirm-password"
              className="block text-bg3 text-lg mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <div className="flex justify-center mt-6">
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
                image={ResetPasswordButtonImage}
                text={"Reset Password"}
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

export default ResetPasswordPopup;
