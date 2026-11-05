"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import PopupComponent from "@/components/PopupComponent";
import ForgotPasswordPopup from "@/components/ForgotPasswordPopup";
import EmailVerificationPopup from "@/components/EmailVerificationPopup";
import ResetPasswordPopup from "@/components/ResetPasswordPopup";
// import RegisterPopup from "@/components/RegisterPopup";
import JoinPopup from "@/components/JoinPopup";
import SetPasswordPopup from "@/components/SetPasswordPopup";
import { useAuth } from "@/contexts/AuthContext";
import {
  GOOGLE_LOGIN_API_ROUTE,
  LOGIN_API_ROUTE,
  LOGIN_MFA_API_ROUTE,
} from "@/routes";
import MfaCodePopup from "@/components/MfaCodePopup";
import { extractApiMessage } from "@/lib/utils";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "@/constants/recaptcha";

import MainLogo from "@/assets/images/main-logo.svg";
import LoginButtonImage from "@/assets/images/buttons/login-button.webp";
import GoogleLoginButtonImage from "@/assets/images/buttons/google-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

interface GoogleTokenResponse {
  access_token: string;
}

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onRegisterClick: () => void;
}
const LoginPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterClick,
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
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password flow states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const isLoginButtonDisabled = isSubmitting || !recaptchaToken;

  // Two-factor sign-in step (only for accounts that turned it on).
  const [mfa, setMfa] = useState<{
    token: string;
    method: "password" | "google";
  } | null>(null);
  const [mfaError, setMfaError] = useState("");
  const [mfaSubmitting, setMfaSubmitting] = useState(false);

  // A closed login popup drops any half-finished two-factor step.
  useEffect(() => {
    if (!isOpen) {
      setMfa(null);
      setMfaError("");
    }
  }, [isOpen]);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishPasswordLogin = (apiData: any) => {
    login({
      email: apiData.email,
      name: apiData.name || email.split("@")[0], // Use email prefix as fallback for name
      access_token: apiData.access_token,
      refresh_token: apiData.refresh_token,
      role: apiData.role,
      userType: apiData.userType,
      shortToken: apiData.shortToken,
    });
    onLoginSuccess();
    onClose();
    setEmail("");
    setPassword("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishGoogleLogin = (data: any) => {
    login({
      email: data.email,
      name: data.name || data.email.split("@")[0],
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      role: data.role || "Standard",
      userType: data.userType || "Indexx Exchange",
      shortToken: data.shortToken || "google-short-token",
    });
    onLoginSuccess();
    onClose();
    // Check if password needs to be set and show popup
    if (data.isPasswordSet === false) {
      setShowSetPassword(true);
    }
  };

  const startMfaStep = (token: string, method: "password" | "google") => {
    setMfaError("");
    setMfa({ token, method });
  };

  const cancelMfaStep = () => {
    setMfa(null);
    setMfaError("");
  };

  const submitMfaCode = async (code: string) => {
    if (!mfa) return;
    setMfaSubmitting(true);
    setMfaError("");
    try {
      const res = await axios.post(LOGIN_MFA_API_ROUTE, {
        mfaToken: mfa.token,
        code,
      });
      const data = res.data?.data;
      if (!data?.access_token) {
        setMfaError("Sign-in failed. Please try again.");
        return;
      }
      const method = mfa.method;
      setMfa(null);
      if (method === "google") finishGoogleLogin(data);
      else finishPasswordLogin(data);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? extractApiMessage(error.response?.data)
        : undefined;
      if (message && /expired|sign in again/i.test(message)) {
        // Too many tries or too slow: back to the login form.
        setMfa(null);
        setErrors({ general: message });
      } else {
        setMfaError(message || "That code is not right.");
      }
    } finally {
      setMfaSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLogin();
  };

  const submitLogin = async () => {
    setIsSubmitting(true);
    setErrors({});

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    if (!recaptchaToken) {
      setRecaptchaError("Please verify you are not a robot.");
      setIsSubmitting(false);
      return;
    }

    const resetCaptcha = () => {
      captchaRef.current?.reset();
      setRecaptchaToken("");
      setRecaptchaError("");
    };

    try {
      const response = await axios.post(LOGIN_API_ROUTE, {
        email: email.trim(),
        password: password,
        recaptchaToken,
      });

      if (response.data?.data?.mfaRequired && response.data.data.mfaToken) {
        // Two-factor is on: ask for the authenticator code next.
        startMfaStep(response.data.data.mfaToken, "password");
      } else if (response.status === 200 && response.data) {
        // API returns data inside 'data' property
        finishPasswordLogin(response.data.data);
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
          extractApiMessage(error.response?.data) ||
          "Login failed. Please try again.";
        setErrors({ general: errorMessage });
      } else {
        setErrors({ general: "Login failed. Please try again." });
      }
    } finally {
      resetCaptcha();
      setIsSubmitting(false);
    }
  };

  const handleLoginButtonClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isLoginButtonDisabled) {
      return;
    }
    submitLogin();
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
        if (res?.data?.data?.mfaRequired && res.data.data.mfaToken) {
          // Two-factor is on: ask for the authenticator code next.
          startMfaStep(res.data.data.mfaToken, "google");
        } else if (res?.status === 200 && res.data?.data?.access_token) {
          finishGoogleLogin(res.data.data);
        } else {
          // Any other backend response
          const errorMessage =
            res?.data?.data ||
            res?.data?.data?.message ||
            res?.data?.message ||
            "Google login failed. Please try again.";
          setErrors({ general: errorMessage });
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            extractApiMessage(error.response?.data) ||
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
    setShowSetPassword(false);
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

  const handleRegisterSuccess = () => {
    closeAllPopups();
    onLoginSuccess();
    onClose();
  };

  const handleCloseRegister = () => {
    closeAllPopups();
    // Main login popup will automatically show when sub-popup is closed
  };

  const handlePasswordSet = () => {
    // Password has been set successfully, just close the popup
    closeAllPopups();
  };

  const handleCloseSetPassword = () => {
    closeAllPopups();
  };

  const handleSkipPassword = () => {
    // User chose to skip setting password, just close the popup
    closeAllPopups();
  };

  // Check if any sub-popup is active
  const isSubPopupActive =
    showForgotPassword ||
    showEmailVerification ||
    showResetPassword ||
    showRegister ||
    showSetPassword ||
    Boolean(mfa);

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
              alt="bitcoin-yay"
              className="w-48 md:w-60 xl:w-80 mx-auto mb-4"
            />
            <h2 className="text-primary text-xl md:text-3xl">
              bitcoin-yay Is The Micro Token
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  className="w-full text-lg p-3 pr-12 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bg3 hover:text-primary cursor-pointer"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
              </div>
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

            <div className="mb-4 flex justify-center">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(token:any) => {
                  setRecaptchaToken(token ?? "");
                  if (token) {
                    setRecaptchaError("");
                  }
                }}
                onExpired={() => setRecaptchaToken("")}
                ref={captchaRef}
                className="mx-auto"
              />
            </div>
            {recaptchaError && (
              <p className="mb-4 text-center text-xs text-red-500">
                {recaptchaError}
              </p>
            )}

            {/* Login Button */}
            <div className="flex justify-center mb-4">
              <CustomButton2
                image={LoginButtonImage}
                text={""}
                imageStyling="w-30"
                onClick={handleLoginButtonClick}
                disabled={isLoginButtonDisabled}
                className="mb-6"
              />
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
                onClick={onRegisterClick}
                className="text-primary text-sm hover:underline cursor-pointer"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </PopupComponent>

      {/* Sub-Popups - rendered independently */}
      <MfaCodePopup
        isOpen={isOpen && Boolean(mfa)}
        error={mfaError}
        isSubmitting={mfaSubmitting}
        onSubmit={submitMfaCode}
        onCancel={cancelMfaStep}
      />

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
        email={resetEmail}
      />

      {/* <RegisterPopup
        isOpen={showRegister}
        onClose={handleCloseRegister}
        onLoginClick={onRegisterClick}
        onRegisterSuccess={handleRegisterSuccess}
      /> */}

      <JoinPopup
        isOpen={showRegister}
        onClose={handleCloseRegister}
      />

      <SetPasswordPopup
        isOpen={showSetPassword}
        onClose={handleCloseSetPassword}
        onPasswordSet={handlePasswordSet}
        onSkip={handleSkipPassword}
      />
    </>
  );
};

export default LoginPopup;
