"use client";

import React, { useState } from "react";
import axios from "axios";
import PopupComponent from "@/components/PopupComponent";
import SetPasswordButtonImage from "@/assets/images/buttons/submit-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import { SET_PASSWORD_API_ROUTE } from "@/routes";

interface SetPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordSet: () => void;
  onSkip: () => void;
}

const SetPasswordPopup: React.FC<SetPasswordPopupProps> = ({
  isOpen,
  onClose,
  onPasswordSet,
  onSkip,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
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
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem("bitcoinYayAuth") || "{}");
        const email = userData.email;
        const accessToken = userData.access_token;

        if (!email || !accessToken) {
          setErrors({
            general: "Unable to get user information. Please login again.",
          });
          setIsSubmitting(false);
          return;
        }

        // Call the set password API
        const response = await axios.post(
          SET_PASSWORD_API_ROUTE,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Set password response", response);

        if (response.status === 200) {
          onPasswordSet();
          setPassword("");
          setConfirmPassword("");
        } else {
          setErrors({
            general: "Failed to set password. Please try again.",
          });
        }
      } catch (error: unknown) {
        console.error("Set password error:", error);

        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.data?.message ||
            error.response?.data?.message ||
            "Failed to set password. Please try again.";
          setErrors({ general: errorMessage });
        } else {
          setErrors({
            general: "An unexpected error occurred. Please try again.",
          });
        }
      }
    }

    setIsSubmitting(false);
  };

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 xl:w-160 bg-bg p-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Set Your Password
          </h2>
          <p className="text-tertiary text-base">
            Set a password for your account to enhance security.
          </p>
          <p className="text-tertiary text-sm mt-2">
            You can skip this step and set it later from your profile.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* Password Field */}
          <div className="mb-2">
            <label
              htmlFor="set-password"
              className="block text-bg3 text-lg mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="set-password"
              className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
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
              htmlFor="confirm-set-password"
              className="block text-bg3 text-lg mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-set-password"
              className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
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

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 text-red-500 text-sm text-center">
              {errors.general}
            </div>
          )}

          {/* Set Password Button */}
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
                image={SetPasswordButtonImage}
                text={""}
                link="#"
                imageStyling="w-30"
              />
            </div>
          </div>
        </form>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onSkip}
            className="text-tertiary text-sm hover:text-primary cursor-pointer hover:underline"
            disabled={isSubmitting}
          >
            Skip for now
          </button>
        </div>
      </div>
    </PopupComponent>
  );
};

export default SetPasswordPopup;
