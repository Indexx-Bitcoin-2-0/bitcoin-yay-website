"use client";

import React, { useState } from "react";
import Image from "next/image";
import PopupComponent from "@/components/PopupComponent";
import { saveAuthData } from "@/lib/auth";
import MainLogo from "@/assets/images/main-logo.svg";
import RegisterButtonImage from "@/assets/images/buttons/register-text-button.webp";
import GoogleRegisterButtonImage from "@/assets/images/buttons/google-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import { ChevronDown, Check } from "lucide-react";

interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    country: "United States (+1)",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countryOptions = [
    "United States (+1)",
    "Canada (+1)",
    "United Kingdom (+44)",
    "Australia (+61)",
    "Germany (+49)",
    "France (+33)",
    "Japan (+81)",
    "Other",
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (formData.username.length < 8 || formData.username.length > 20) {
      newErrors.username =
        "Username must be 8 to 20 characters, only number and letters";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username =
        "Username must be 8 to 20 characters, only number and letters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
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
    setIsSubmitting(true);
    setErrors({});

    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userData = {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          token: "mock-jwt-token-" + Date.now(),
        };

        saveAuthData(userData);
        onRegisterSuccess();
        onClose();

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          country: "United States (+1)",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleGoogleRegister = () => {
    // Implement Google OAuth registration here
    console.log("Google register clicked");
    // For demo purposes, simulate a successful Google registration
    const userData = {
      email: "demo@google.com",
      name: "Google User",
      token: "google-mock-token-" + Date.now(),
    };
    saveAuthData(userData);
    onRegisterSuccess();
    onClose();
  };

  return (
    <PopupComponent isOpen={isOpen} onClose={onClose}>
      <div className="w-90 md:w-120 xl:w-160 bg-bg p-6 md:p-8 flex flex-col items-center max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-tertiary text-lg mb-4">Welcome To</p>
          <Image
            src={MainLogo}
            alt="Bitcoin Yay"
            className="w-40 md:w-48 xl:w-80 mx-auto mb-4"
          />
          <h2 className="text-primary text-xl md:text-3xl">
            Bitcoin Yay Is The Micro Token
          </h2>
          <p className="text-primary text-xl md:text-3xl">
            And Petty Cash Of Bitcoin
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="w-full">
          {/* First Name */}
          <div className="mb-2">
            <label
              htmlFor="firstName"
              className="block text-bg3 text-base mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-2">
            <label htmlFor="lastName" className="block text-bg3 text-base mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-2">
            <label htmlFor="username" className="block text-bg3 text-base mb-2">
              Username
            </label>
            <p className="text-tertiary text-xs my-1">
              This will also be your code for referring others
            </p>
            <input
              type="text"
              id="username"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              disabled={isSubmitting}
            />

            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
            {!errors.username && (
              <p className="text-tertiary text-xs mt-1">
                Username must be 4 to 20 characters, only number and letters
              </p>
            )}
          </div>

          {/* Country */}
          <div className="mb-2">
            <label htmlFor="country" className="block text-bg3 text-base mb-2">
              Country
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-3 p-3 hover:border-primary rounded-md cursor-pointer text-tertiary border border-bg3 w-full focus:border-primary focus:outline-none"
                disabled={isSubmitting}
              >
                <span className="text-base flex-1 text-left">
                  {formData.country}
                </span>
                <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
              </button>

              {showCountryDropdown && (
                <div className="absolute left-0 top-full mt-1 w-full bg-bg2 rounded-md shadow-lg z-10 border border-bg3">
                  <div className="py-1">
                    {countryOptions.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          handleInputChange("country", option);
                          setShowCountryDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left text-tertiary hover:bg-primary hover:text-bg transition-colors text-base cursor-pointer flex items-center gap-3"
                      >
                        <span className="flex-1">{option}</span>
                        {formData.country === option && (
                          <Check
                            className="w-5 h-5 ml-auto"
                            strokeWidth={2.5}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-2">
            <label
              htmlFor="phoneNumber"
              className="block text-bg3 text-base mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label htmlFor="email" className="block text-bg3 text-base mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="block text-bg3 text-base mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-bg3 text-base mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full text-base p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
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

          {/* Register Button */}
          <div className="flex justify-center mb-4 mt-10">
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
                image={RegisterButtonImage}
                text={""}
                link="#"
                imageStyling="w-30"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 border-t border-bg3"></div>
            <span className="px-4 text-bg3 text-sm">Or Register With</span>
            <div className="flex-1 border-t border-bg3"></div>
          </div>

          {/* Google Register */}
          <div className="flex justify-center mb-4 mt-10">
            <div
              onClick={(e) => {
                e.preventDefault();
                if (!isSubmitting) {
                  handleGoogleRegister();
                }
              }}
              className={
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            >
              <CustomButton2
                image={GoogleRegisterButtonImage}
                text="Google"
                link="#"
                imageStyling="w-30"
              />
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-tertiary text-sm">
              Don&apos;t have an account?{" "}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-primary text-sm hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </PopupComponent>
  );
};

export default RegisterPopup;
