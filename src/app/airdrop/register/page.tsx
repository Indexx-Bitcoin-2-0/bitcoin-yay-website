"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

import BgImage1 from "@/assets/images/airdrop/bg-art-1.webp";
import BgImage2 from "@/assets/images/airdrop/bg-art-2.webp";
import CopyIcon from "@/assets/images/icons/copy-icon.svg";
import SubmitButtomImage from "@/assets/images/submit-button.webp";

interface FormErrors {
  email?: string;
  username?: string;
  acceptTerms?: string;
  general?: string; // For general form errors, e.g., from API
}

export default function AirdropRegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [referralLink, setReferralLink] = useState<string>(
    "bitcoinyay.com/airdrop?ref=username123"
  ); // Initial value from image

  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      try {
        // --- Simulate API call ---
        // In a real application, you would send this data to your backend:
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, username, acceptTerms, referralLink }),
        // });
        // const data = await response.json();

        // if (!response.ok) {
        //   // Handle API errors (e.g., username taken, invalid data)
        //   setErrors(data.errors || { general: data.message || 'Registration failed.' });
        //   return; // Stop execution if API returns an error
        // }

        console.log("Form data submitted:", { email, username, acceptTerms });

        // Optionally clear form after successful submission
        setEmail("");
        setUsername("");
        setAcceptTerms(false);
        setErrors({});
        setFormSubmitted(false);
      } catch (error) {
        console.error("Submission error:", error);
        setErrors({
          general: "Network error or server unavailable. Please try again.",
        });
      }
    }
  };

  const copyReferralLink = (): void => {
    navigator.clipboard.writeText(referralLink);
  };
  return (
    <div className="container mx-auto mt-60 flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-cover bg-center mt-40">
        <Image
          src={BgImage1}
          alt="Background Image 1"
          className="w-80 md:w-60 xl:w-120 absolute top-0 left-0"
        />
        <Image
          src={BgImage2}
          alt="Background Image 2"
          className="hidden md:block md:w-60 xl:w-120 absolute top-0 right-0"
        />
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <h4 className="text-3xl font-semibold text-primary">Sign Up for the</h4>
        <h2 className="mt-6 text-5xl md:text-7xl font-bold">
          Turbo Mining Gopher
          <br />
          Free Airdrop
        </h2>
        <p className="mt-16 text-xl font-medium">
          This airdrop is exclusive to all indexxers. Don’t have an account?
        </p>
        <p className="mt-2 text-xl font-medium">
          Register{" "}
          <a className="text-primary hover:underline hover:underline-offset-4 cursor-pointer">
            Here!
          </a>
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="p-8 flex flex-col justify-center max-w-3xl"
        >
          <div className="mb-6">
            <label htmlFor="email" className="block text-tertiary text-xl mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={
                "w-full text-lg p-3 text-tertiary border border-tertiary rounded-md focus:border-primary focus:outline-none  hover:border-primary"
              }
              placeholder="Enter the email address you used on Indexx.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formSubmitted && errors.email && (
              <p className="text-red-700 text-base mt-2">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-tertiary text-xl mb-2"
            >
              User name
            </label>
            <input
              type="text"
              id="username"
              className={
                "w-full text-lg p-3 text-tertiary border border-tertiary rounded-md focus:border-primary focus:outline-none  hover:border-primary"
              }
              placeholder="Enter the desired user name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formSubmitted && errors.username && (
              <p className="text-red-700 text-base mt-2">{errors.username}</p>
            )}
          </div>

          <div className="mb-6 items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                className="h-5 w-5 text-orange-500 transition duration-150 ease-in-out bg-transparent border-tertiary rounded"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 text-gray-300 text-sm"
              >
                Accept Terms and conditions
              </label>
            </div>
            {formSubmitted && errors.acceptTerms && (
              <p className="text-red-600 text-base mt-2">
                {errors.acceptTerms}
              </p>
            )}
          </div>

          <div className="mb-6 mt-20">
            <label
              htmlFor="referralLink"
              className="block text-tertiary text-xl mb-2"
            >
              Referral link
            </label>
            <div className="relative">
              <input
                type="text"
                id="referralLink"
                className="w-full text-lg p-3 text-tertiary border border-tertiary rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                value={referralLink}
                readOnly
              />
              <button
                type="button"
                onClick={copyReferralLink}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-orange-400 focus:outline-none"
              >
                <Image
                  src={CopyIcon}
                  alt="Copy Icon"
                  className="w-6 h-6 z-10"
                />
              </button>
            </div>
          </div>

          <p className="text-primary text-base italic text-center mb-6">
            Share the link with your family and friends to increase your chances
            of extending your Turbo Mining Power by another day or more.
          </p>
          <div className="flex justify-center mt-10">
            <button type="submit">
              <Image
                src={SubmitButtomImage}
                alt="Submit Button"
                className="w-36 hover:scale-105 cursor-pointer"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
