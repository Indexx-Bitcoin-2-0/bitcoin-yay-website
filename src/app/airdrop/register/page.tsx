"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { AIRDROP_REGISTER_API_ROUTE } from "@/routes";

import BgImage1 from "@/assets/images/airdrop/bg-art-1.webp";
import BgImage2 from "@/assets/images/airdrop/bg-art-2.webp";
import BackArrowIcon1 from "@/assets/images/icons/back-arrow-1.webp";
import BackArrowIcon2 from "@/assets/images/icons/back-arrow-2.webp";
import CopyIcon1 from "@/assets/images/icons/copy-icon-1.webp";
import CopyIcon2 from "@/assets/images/icons/copy-icon-2.webp";
import InfoIcon from "@/assets/images/icons/info-icon.webp";
import DownloadButton from "@/assets/images/buttons/download-button.webp";
import BackButton from "@/assets/images/buttons/back-button.webp";
import IndexxButton from "@/assets/images/buttons/indexx-button.webp";
import SubmitButtomImage from "@/assets/images/buttons/submit-button.webp";
import PopupArt1 from "@/assets/images/airdrop/popup-art.webp";
import PopupArt2 from "@/assets/images/airdrop/popup-art-1.webp";
import PopupArt3 from "@/assets/images/airdrop/popup-art-2.webp";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";

interface FormErrors {
  email?: string;
  username?: string;
  acceptTerms?: string;
  general?: string; // For general form errors, e.g., from API
}

export default function AirdropRegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [referralLink, setReferralLink] = useState<string>("");
  const [userReferralLink, setUserReferralLink] = useState<string>(
    "bitcoinyay.com/airdrop?ref="
  );

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isRegistraionSuccessful, setIsRegistrationSuccessful] =
    useState<boolean>(false);

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
      newErrors.username = "Name is required.";
    } else if (username.length < 3) {
      newErrors.username = "Name must be at least 3 characters long.";
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
        const res = await axios.post(AIRDROP_REGISTER_API_ROUTE, {
          email: email,
          referralCode: referralLink,
          userType: "Indexx Exchange",
          walletAddress: "",
          walletProvider: "",
          airdropAmount: 0,
          tokenName: "BTCY",
          eventType: "Bitcoin Yay Birthday airdrop",
        });

        if (res.status === 200 || res.status === 201) {
          setIsRegistrationSuccessful(true);
        } else {
          setIsRegistrationSuccessful(false);
        }

        console.log("Form data submitted:", { email, username, acceptTerms });
        setUserReferralLink(userReferralLink + email);
        setIsPopupOpen(true);
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
    navigator.clipboard.writeText(userReferralLink);
  };
  return (
    <div className="container mx-auto mt-60 flex flex-col justify-center items-center">
      {/* ###############  Bsckgroung Images   ############################# */}
      <div className="absolute inset-0 bg-cover bg-center mt-40 -z-10">
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

      {/* ###############  Popups   ############################# */}

      <div>
        <PopupComponent
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        >
          {isRegistraionSuccessful ? (
            <div className="py-6 w-90 md:w-140 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center -z-10">
                <Image
                  src={PopupArt3}
                  alt="Background Image 1"
                  className="w-40 absolute top-0 -left-10"
                />
                <Image
                  src={PopupArt2}
                  alt="Background Image 2"
                  className="w-40 absolute top-0 -right-10"
                />
              </div>
              <Image src={PopupArt1} alt="art" className="w-48 lg:w-56" />
              <h2 className="mt-10 text-3xl md:text-5xl font-medium text-primary">
                Congratulations!
              </h2>
              <p className="mt-6 max-w-100 lg:text-xl">
                You have successfully registered for the FREE Turbo Mining
                Gopher airdrop.
              </p>

              <div className="mb-6 mt-2 lg:mt-8 w-full px-4 md:px-8 text-start">
                <label
                  htmlFor="referralLink"
                  className="block text-bg3 text-xl mb-2"
                >
                  Referral link
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="referralLink"
                    className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                    value={userReferralLink}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={copyReferralLink}
                    className="absolute group inset-y-0 right-3 cursor-pointer"
                  >
                    <Image
                      src={CopyIcon1}
                      alt="Copy Icon"
                      className="group-hover:hidden w-6 h-6 z-10"
                    />
                    <Image
                      src={CopyIcon2}
                      alt="Copy Icon"
                      className="hidden group-hover:block w-6 h-6 z-10"
                    />
                  </button>
                </div>
                <p className="text-primary text-xs italic mt-2">
                  Share the link with your family and friends to increase your
                  chances of extending your Turbo Mining Power by another day or
                  more.
                </p>
              </div>

              <button
                className="text-bg3 text-base hover:text-primary cursor-pointer"
                onClick={copyReferralLink}
              >
                Copy your referral link
              </button>

              <CustomButton2
                image={DownloadButton}
                text="Download the Mining App"
                link="/#apple-store-download"
                imageStyling="w-22 mt-8"
              />
            </div>
          ) : (
            <div className="w-80 md:w-100 flex flex-col justify-center items-center text-center p-10">
              <Image src={InfoIcon} alt="Info Icon" className="w-22" />
              <h3 className="text-4xl font-medium mt-6">Email not found</h3>
              <p className="mt-6">
                The email entered is not registered with Indexx.ai. To continue
                and qualify for the free airdrop, please create an account at
                Indexx.ai.
              </p>
              <div className="flex justify-between w-full mt-10 px-4">
                <CustomButton2
                  image={IndexxButton}
                  text="Go to indexx.ai"
                  link="https://indexx.ai"
                  imageStyling="w-22"
                />
                <CustomButton2
                  image={BackButton}
                  text="Back"
                  link="/airdrop/register"
                  imageStyling="w-22"
                />
              </div>
            </div>
          )}
        </PopupComponent>
      </div>

      {/* ###################   Back arrow  ##################### */}
      <div className="w-full flex justify-start group -mt-20">
        <Link href="#" onClick={() => window.history.back()}>
          <Image
            src={BackArrowIcon1}
            alt="Back Arrow"
            className="group-hover:hidden w-16 h-16 cursor-pointer"
          />
          <Image
            src={BackArrowIcon2}
            alt="Back Arrow"
            className="hidden group-hover:block w-16 h-16 cursor-pointer"
          />
        </Link>
      </div>

      {/* ###################   Main Content  ##################### */}
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
          <Link
            href="https://indexx.ai"
            className="text-primary hover:underline hover:underline-offset-4 cursor-pointer"
          >
            Here!
          </Link>
        </p>
      </div>
      <div className="w-full flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="w-full p-8 flex flex-col justify-center max-w-3xl"
        >
          <div className="mb-6">
            <label htmlFor="username" className="block text-bg3 text-xl mb-2">
              Name
            </label>
            <input
              type="text"
              id="username"
              className={
                "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
              }
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formSubmitted && errors.username && (
              <p className="text-red-700 text-base mt-2">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-bg3 text-xl mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={
                "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
              }
              placeholder="Enter the email address you used on Indexx.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formSubmitted && errors.email && (
              <p className="text-red-700 text-base mt-2">{errors.email}</p>
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
              <label htmlFor="acceptTerms" className="ml-2 text-bg3 text-sm">
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
              className="block text-bg3 text-xl mb-2"
            >
              Referral link
            </label>
            <div className="relative">
              <input
                type="text"
                id="referralLink"
                className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                value={referralLink}
                placeholder="Enter the referral link you received"
                onChange={(e) => setReferralLink(e.target.value)}
              />
            </div>
          </div>

          <p className="text-primary text-base italic text-center mb-6">
            Note: This link is from the user who shared the free Turbo Mining
            Gopher Airdrop with you. After you sign up, you’ll get your own
            referral link to share.
          </p>
          <div className="flex justify-center mt-20">
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
