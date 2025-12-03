"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios, { AxiosError } from "axios";

import { AIRDROP_REGISTER_API_ROUTE } from "@/routes";
import { getGmailAliasInfo } from "@/lib/utils";

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
import PointFingerButtonImage from "@/assets/images/buttons/point-button.webp";
import PopupArt1 from "@/assets/images/airdrop/popup-art.webp";
import PopupArt2 from "@/assets/images/airdrop/popup-art-1.webp";
import PopupArt3 from "@/assets/images/airdrop/popup-art-2.webp";
import PopupArt4 from "@/assets/images/airdrop/popup-art-3.svg";
import PopupArt5 from "@/assets/images/airdrop/popup-art-4.png";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";

interface FormErrors {
  email?: string;
  username?: string;
  acceptTerms?: string;
  walletAddress?: string;
  general?: string; // For general form errors, e.g., from API
}

export default function AirdropRegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [referralLink, setReferralLink] = useState<string>("");
  const [userReferralLink, setUserReferralLink] = useState<string>(
    "bitcoinyay.com/referral="
  );

  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isRegistraionSuccessful, setIsRegistrationSuccessful] =
    useState<boolean>(false);
  const [isRegistrationClosed] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailAliasInfo = getGmailAliasInfo(email);

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    } else if (emailAliasInfo.isGmail && emailAliasInfo.hasAlias) {
      newErrors.email =
        "Gmail aliases (like using '+' tags or @googlemail.com) aren't supported. Please use your primary Gmail address.";
    }

    if (!username.trim()) {
      newErrors.username = "Name is required.";
    } else if (username.length < 3) {
      newErrors.username = "Name must be at least 3 characters long.";
    }

    if (!walletAddress.trim()) {
      newErrors.walletAddress = "Wallet address is required.";
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log("handleSubmit");

    // Check if registration is closed first
    if (isRegistrationClosed) {
      setIsPopupOpen(true);
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      setFormSubmitted(true);
      return;
    }

    // Clear any previous errors and set form as submitted
    setErrors({});
    setFormSubmitted(true);

    try {
      const res = await axios.post(AIRDROP_REGISTER_API_ROUTE, {
        email: email,
        referralCode: referralLink,
        userType: "Indexx Exchange",
        walletAddress: walletAddress,
        walletProvider: "",
        airdropAmount: 0,
        tokenName: "WIBS",
        eventType: "bitcoin-yay WIBS Airdrop",
      });

      if (res.status === 200 || res.status === 201) {
        setIsRegistrationSuccessful(true);
        setUserReferralLink(userReferralLink + res.data?.data?.referralCode);
        // Reset form only on successful submission
        setEmail("");
        setUsername("");
        setWalletAddress("");
        setAcceptTerms(false);
        setReferralLink("");
      } else {
        setIsRegistrationSuccessful(false);
      }
      setIsPopupOpen(true);
      setFormSubmitted(false);
    } catch (error) {
      let errorMessage = (error as AxiosError).response?.data;
      errorMessage = (errorMessage as { data?: object })?.data;
      setIsRegistrationSuccessful(false);
      setErrors({
        general:
          error instanceof Error && "response" in error
            ? (errorMessage as { message?: string })?.message ||
            "An error occurred"
            : "Network error or server unavailable. Please try again.",
      });
      setIsPopupOpen(true);
      setFormSubmitted(false);
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
          {isRegistrationClosed ? (
            <div>
              <div className="flex flex-col items-center justify-center text-center w-90 md:w-164 p-4 md:p-8">
                <Image
                  src={PopupArt4}
                  alt="Popup Art 4"
                  className="w-64 md:w-80 mt-4"
                />
                <div className="relative mt-10">
                  <Image
                    src={PopupArt5}
                    alt="Popup Art 5"
                    className="w-20 md:w-34 absolute -top-10 md:-top-24 right-0"
                  />
                  <h3 className="text-2xl md:text-5xl font-bold">
                    Airdrop <span className="text-primary"> Ended!</span>
                  </h3>
                  <p className="mt-2 text-xl md:text-2xl font-semibold uppercase">
                    The recent airdrop has ended — thank you for participating
                    and mining with Turbo Power!
                  </p>
                </div>
                <div className="mt-10 mb-4 relative">
                  <Image
                    src={PopupArt5}
                    alt="Popup Art 5"
                    className="w-20 md:w-34 absolute -top-10 md:-top-20 left-0"
                  />
                  <h3 className="text-2xl md:text-5xl font-bold md:leading-16">
                    Stay Tuned for
                    <br />
                    <span className="text-primary">
                      Upcoming Airdrop Events
                    </span>
                  </h3>
                  <p className="mt-2 text-xl md:text-2xl font-semibold uppercase">
                    More power-packed events are on the way.{" "}
                    <span className="text-primary">Get ready to:</span>
                  </p>
                  <p className="mt-2 text-xl md:text-2xl font-semibold uppercase">
                    Unlock Free Power mining and Earn bonus days through
                    referrals
                  </p>
                  <p className="mt-2 text-xl md:text-2xl font-semibold uppercase text-primary">
                    Celebrate special occasions with exclusive airdrops
                  </p>
                </div>
              </div>
            </div>
          ) : isRegistraionSuccessful ? (
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
                You have successfully registered for the Lotto Airdrop.
              </p>

              {/* <div className="mb-6 mt-2 lg:mt-8 w-full px-4 md:px-8 text-start">
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
              </button> */}

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
              <h3 className="text-5xl font-medium mt-6">Oops</h3>
              <p className="mt-6">
                {errors.general ||
                  "An error occurred while processing your request. Please try again."}
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
                  link="/airdrop"
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
          bitcoin-yay
          <br />
          <span className="text-primary">WIBS Airdrop!</span>
        </h2>
        <p className="mt-16 text-xl font-medium">
          To claim airdrop you need to be a Miner. Download the app and join now
          if you haven&apos;t already!
        </p>
        <p className="mt-2 text-xl font-medium">
          <Link
            href="/#apple-store-download"
            className="text-primary hover:underline hover:underline-offset-4 cursor-pointer"
          >
            Download Now!
          </Link>
        </p>
      </div>
      <div className="w-full flex justify-center mt-10 mb-40">
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

          <div className="mb-6">
            <label
              htmlFor="walletAddress"
              className="block text-bg3 text-xl mb-2"
            >
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              className={
                "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
              }
              placeholder="Enter your pump.fun wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            {formSubmitted && errors.walletAddress && (
              <p className="text-red-700 text-base mt-2">
                {errors.walletAddress}
              </p>
            )}
          </div>
          <p className="text-primary text-base italic mb-6">
            <span className="font-bold">Note:</span> If you don&apos;t have a
            pump.fun wallet address, please sign up on{" "}
            <Link
              href="https://pump.fun"
              target="_blank"
              className="text-primary hover:underline hover:underline-offset-4 cursor-pointer"
            >
              pump.fun
            </Link>
          </p>

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

          {/* <div className="mb-6 mt-20">
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
          </p> */}
          <div className="flex justify-center mt-20">
            {/* <button type="submit">
              <Image
                src={PointFingerButtonImage}
                alt="Submit Button"
                className="w-36 hover:scale-105 cursor-pointer"
              />
            </button> */}
            <CustomButton2
              image={PointFingerButtonImage}
              text="Submit"
              onClick={(e) => {
                e.preventDefault();
                // Create a synthetic form event to pass to handleSubmit
                const formEvent = {
                  ...e,
                  preventDefault: () => e.preventDefault(),
                  currentTarget: e.currentTarget.closest(
                    "form"
                  ) as HTMLFormElement,
                  target: e.currentTarget.closest("form") as HTMLFormElement,
                } as FormEvent<HTMLFormElement>;
                handleSubmit(formEvent);
              }}
              imageStyling="w-36"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
