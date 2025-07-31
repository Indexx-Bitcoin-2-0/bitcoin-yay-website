"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import PopupComponent from "@/components/PopupComponent";
import ForgotPasswordPopup from "@/components/ForgotPasswordPopup";
import EmailVerificationPopup from "@/components/EmailVerificationPopup";
import ResetPasswordPopup from "@/components/ResetPasswordPopup";
import RegisterPopup from "@/components/RegisterPopup";
import { useAuth } from "@/contexts/AuthContext";
import { GOOGLE_LOGIN_API_ROUTE, LOGIN_API_ROUTE } from "@/routes";

import MainLogo from "@/assets/images/main-logo.svg";
import LoginButtonImage from "@/assets/images/buttons/login-button.webp";
import GoogleLoginButtonImage from "@/assets/images/buttons/google-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import { useGoogleLogin } from "@react-oauth/google";

interface GoogleTokenResponse {
  access_token: string;
}

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => 
    void;
}
const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password flow states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLogin();
  };

  const submitLogin = async () => {
    setIsSubmitting(true);
    setErrors({});

    if (validateForm()) {
      try {
        const response = await axios.post(LOGIN_API_ROUTE, {
          email: email.trim(),
          password: password,
        });

        if (response.status === 200 && response.data) {
          // Extract user data from API response
          const apiData = response.data.data; // API returns data inside 'data' property

          const userData = {
            email: apiData.email,
            name: apiData.name || email.split("@")[0], // Use email prefix as fallback for name
            access_token: apiData.access_token,
            refresh_token: apiData.refresh_token,
            role: apiData.role,
            userType: apiData.userType,
            shortToken: apiData.shortToken,
          };

          login(userData);
          onLoginSuccess();
          onClose();

          // Reset form
          setEmail("");
          setPassword("");
        } else {
          setErrors({
            general:
              "Login failed. Please check your credentials and try again.",
          });
        }
      } catch (error: unknown) {
        console.error("Login error:", error);

        // Show server message directly
        if (axios.isAxiosError(error)) {
          console.log("Login error:", error);
          const errorMessage =
            error.response?.data?.data?.message ||
            error.response?.data?.message ||
            "Login failed. Please try again.";
          console.log("Login error message:", errorMessage);
          setErrors({ general: errorMessage });
        } else {
          setErrors({ general: "Login failed. Please try again." });
        }
      }
    }

    setIsSubmitting(false);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: GoogleTokenResponse) => {
      const googleToken = tokenResponse.access_token;

      try {
        const language = navigator.language || "en";
        const codeToLabel: { [key: string]: string } = {
          en: "English",
          zh: "Chinese",
          es: "Spanish",
          fr: "French",
        };
        const selectedLanguageLabel =
          codeToLabel[language.slice(0, 2)] || "English";

        const res = await axios.post(GOOGLE_LOGIN_API_ROUTE, {
          googleToken,
          language: selectedLanguageLabel,
        });
        console.log("Google login response:", res);
        if (res?.status === 200 && res.data?.data?.access_token) {
          // Success
          login({
            email: res.data?.data?.email,
            name: res.data?.data?.name || res.data?.data?.email.split("@")[0],
            access_token: res.data?.data.access_token,
            refresh_token: res.data?.data.refresh_token,
            role: res.data?.data.role || "Standard",
            userType: res.data?.data.userType || "Indexx Exchange",
            shortToken: res.data?.data.shortToken || "google-short-token",
          });

          onLoginSuccess();
          onClose();
        } else {
          // Any other backend response
          const errorMessage =
            res?.data?.data?.message ||
            res?.data?.message ||
            "Google login failed. Please try again.";
          setErrors({ general: errorMessage });
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.data?.message ||
            error.response?.data?.message ||
            "Google login failed. Please try again.";
          setErrors({ general: errorMessage });
        } else {
          setErrors({
            general: "Unexpected error occurred. Please try again.",
          });
        }
      }
    },
    onError: () => {
      setErrors({ general: "Google Login failed or was cancelled." });
    },
  });

  // Close all popups helper
  const closeAllPopups = () => {
    setShowForgotPassword(false);
    setShowEmailVerification(false);
    setShowResetPassword(false);
    setShowRegister(false);
  };

  // Forgot password flow handlers
  const handleForgotPasswordClick = () => {
    closeAllPopups();
    setShowForgotPassword(true);
  };

  const handleForgotPasswordEmailSent = (email: string) => {
    setResetEmail(email);
    closeAllPopups();
    setShowEmailVerification(true);
  };

  const handleEmailVerified = () => {
    closeAllPopups();
    setShowResetPassword(true);
  };

  const handlePasswordReset = () => {
    closeAllPopups();
    setResetEmail("");
    // Optionally show a success message or redirect
  };

  const handleResendCode = () => {
    // Resend verification code logic
    console.log("Resending verification code to", resetEmail);
  };

  const handleCloseForgotPassword = () => {
    closeAllPopups();
    // Main login popup will automatically show when sub-popup is closed
  };

  const handleCloseEmailVerification = () => {
    closeAllPopups();
    setShowForgotPassword(true);
  };

  const handleCloseResetPassword = () => {
    closeAllPopups();
    setResetEmail("");
    // Main login popup will automatically show when sub-popup is closed
  };

  const handleRegisterClick = () => {
    closeAllPopups();
    setShowRegister(true);
  };

  const handleRegisterSuccess = () => {
    closeAllPopups();
    onLoginSuccess();
    onClose();
  };

  const handleCloseRegister = () => {
    closeAllPopups();
    // Main login popup will automatically show when sub-popup is closed
  };

  // Check if any sub-popup is active
  const isSubPopupActive =
    showForgotPassword ||
    showEmailVerification ||
    showResetPassword ||
    showRegister;

  return (
    <>
      {/* Main Login Popup */}
      <PopupComponent isOpen={isOpen && !isSubPopupActive} onClose={onClose}>
        <div className="w-90 md:w-120 xl:w-160 bg-bg p-8 md:p-8 flex flex-col items-center max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-tertiary text-lg mb-4">Welcome To</p>
            <Image
              src={MainLogo}
              alt="Bitcoin Yay"
              className="w-48 md:w-60 xl:w-80 mx-auto mb-4"
            />
            <h2 className="text-primary text-xl md:text-3xl">
              Bitcoin Yay Is The Micro Token
            </h2>
            <p className="text-primary text-xl md:text-3xl">
              And Petty Cash Of Bitcoin
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full">
            {/* Email Field */}
            <div className="mb-2">
              <label
                htmlFor="login-email"
                className="block text-bg3 text-lg mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-2">
              <label
                htmlFor="login-password"
                className="block text-bg3 text-lg mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-tertiary text-sm hover:text-primary cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 text-red-500 text-sm text-center">
                {errors.general}
              </div>
            )}

            {/* Login Button */}
            <div className="flex justify-center mb-4">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  if (!isSubmitting) {
                    submitLogin();
                  }
                }}
                className={
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              >
                <CustomButton2
                  image={LoginButtonImage}
                  text={""}
                  link="#"
                  imageStyling="w-30"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-bg3"></div>
              <span className="px-4 text-bg3 text-sm">Or Login With</span>
              <div className="flex-1 border-t border-bg3"></div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center mb-4 mt-10">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  if (!isSubmitting) {
                    handleGoogleLogin();
                  }
                }}
                className={
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              >
                <CustomButton2
                  image={GoogleLoginButtonImage}
                  text="Google"
                  link="#"
                  imageStyling="w-30"
                />
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-tertiary text-sm">
                Don&apos;t have an account?{" "}
              </span>
              <button
                type="button"
                onClick={handleRegisterClick}
                className="text-primary text-sm hover:underline"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </PopupComponent>

      {/* Sub-Popups - rendered independently */}
      <ForgotPasswordPopup
        isOpen={showForgotPassword}
        onClose={handleCloseForgotPassword}
        onEmailSent={handleForgotPasswordEmailSent}
      />

      <EmailVerificationPopup
        isOpen={showEmailVerification}
        onClose={handleCloseEmailVerification}
        email={resetEmail}
        onVerified={handleEmailVerified}
        onResendCode={handleResendCode}
      />

      <ResetPasswordPopup
        isOpen={showResetPassword}
        onClose={handleCloseResetPassword}
        onPasswordReset={handlePasswordReset}
      />

      <RegisterPopup
        isOpen={showRegister}
        onClose={handleCloseRegister}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
};

export default LoginPopup;
