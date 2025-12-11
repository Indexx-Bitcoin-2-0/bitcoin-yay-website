"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import CustomButton2 from "@/components/CustomButton2";

import CartButtonImage from "@/assets/images/UpgradeNowSalesPage.svg";
import GooglePlayButtonImage from "@/assets/images/buttons/get-on-playstore-button.webp";
import AppleStoreButtonImage from "@/assets/images/buttons/get-on-applestore-button.webp";
import ArrowDownButtonImage from "@/assets/images/buttons/arrow-up-button.webp";
import DollarButtonImage from "@/assets/images/buttons/dollar-button.webp";
import InfoButtonImage from "@/assets/images/buttons/info-button.webp";
import logo from "@/assets/images/main-logo.svg";

import Image1 from "@/assets/images/home/hero-section/1.webp";
import DownloadLogo from "@/assets/images/download-button.svg";
import ElectricMiningButtonImage from "@/assets/images/mining/electric-icon.webp";
import TurboMiningButtonImage from "@/assets/images/mining/turbo-icon.webp";
import NuclearMiningButtonImage from "@/assets/images/mining/nuclear-icon.webp";
import CardImage1 from "@/assets/images/home/card-1.webp";
import CardImage2 from "@/assets/images/home/card-2.webp";
import CardImage3 from "@/assets/images/home/card-3.webp";
import SalesPageArt from '@/assets/images/salesPageArt.svg';
import SalesBackground from '@/assets/images/salesCoinBG.png';
import ChristmasTreeImage from "@/assets/images/christmas_icon.png";

import { EMAIL_TO_ADMIN_API_ROUTE } from "@/routes";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Placeholder for mine cart illustration - will need to be added to assets
// import MineCartImage from "@/assets/images/sale/mine-cart.webp";
// Placeholder for email section illustration - will need to be added to assets
// import EmailSectionIllustration from "@/assets/images/sale/email-section-illustration.webp";

export default function SalePage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous messages
        setMessage("");
        setMessageType("");

        setIsLoading(true);

        try {
            const response = await axios.post(EMAIL_TO_ADMIN_API_ROUTE, {
                email: email.trim(),
                website: "bitcoin-yay",
            });

            setMessage("Thank you! Your email has been successfully subscribed.");
            setMessageType("success");
            setEmail("");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                if (err.response?.data?.message) {
                    setMessage(err.response.data.message);
                } else if (err.response?.data?.data?.message) {
                    setMessage(err.response.data.data.message);
                } else if (err.response?.status === 400) {
                    setMessage("Invalid email address. Please check and try again.");
                } else if (err.response?.status === 409) {
                    setMessage("This email is already subscribed.");
                } else {
                    setMessage("Something went wrong. Please try again.");
                }
            } else {
                setMessage("An unexpected error occurred. Please try again.");
            }
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Clear message on typing
        if (message) {
            setMessage("");
            setMessageType("");
        }
    };

    // Extract logo component
    const Logo = () => (
        <div className="">
            <Link href="/" className="">
                <Image
                    src={logo}
                    alt="logo"
                    className="w-[165px] md:w-[300px] hover:scale-105 transition-transform duration-300"
                />
            </Link>
        </div>
    );


    return (
        <div className="min-h-screen ">
            {/* Hero Banner Section - First 1/4 */}
            <div className="flex items-center justify-center mt-20 md:mt-20">
                <Logo />
            </div>

            <div className="mx-auto mt-20 md:mt-30 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
                <div className="flex items-center justify-center">
                    <Image
                        src={ChristmasTreeImage}
                        alt="Christmas Tree"
                        className="w-30 h-30 object-contain"
                    />
                </div>
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white uppercase mb-4 md:mb-10">
                    CHRISTMAS SALE — LIMITED • 70% OFF
                </h1>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">


                    {/* Left Content */}
                    <div className="flex-1 w-full lg:w-auto">
                        {/* Main Headline */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                            Christmas Crypto Rush is Live — Upgrade & Mine Faster
                        </h2>

                        {/* Body Text */}
                        <div className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 space-y-4">
                            <p>
                                Experience up to 9x faster BTCY mining — many users already upgraded.
                            </p>
                            <p>
                                Christmas Sale is live: Get 70% OFF on all Power Mining plans until 28th December.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-start justify-start gap-4 md:gap-6 mb-6 md:mb-8">
                            {/* Upgrade Now Button */}
                            <CustomButton2
                                text="Upgrade Now  70% OFF"
                                image={CartButtonImage}
                                link="/mining/power-mining"
                                imageStyling="w-24 h-24"
                                textMaxWidth="120px"
                            />

                            {/* Google Play Button */}
                            <CustomButton2
                                text="Google Play"
                                image={DownloadLogo}
                                link="https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en"
                                _blank={true}
                                imageStyling="w-24 h-24"
                            />

                            {/* Apple Store Button */}
                            <CustomButton2
                                text="Apple"
                                image={DownloadLogo}
                                link="https://apps.apple.com/ph/app/bitcoin-yay/id6744868017"
                                _blank={true}
                                imageStyling="w-24 h-24"
                            />
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs md:text-sm text-gray-400 max-w-2xl">
                            Limited-time Christmas sale! Prices & availability apply.
                        </p>
                    </div>

                    {/* Right Illustration - Placeholder */}
                    <div className="flex-1 w-full lg:w-auto flex items-center justify-center lg:justify-end">


                        <Image
                            src={Image1}
                            alt="Mine Cart with BTCY Coins"
                            className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-contain"
                        />

                    </div>
                </div>
            </div>

            {/* Email Subscription Section - Second 2/4 */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-9xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 bg-bg2 ">


                    {/* Right Email Form */}
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="rounded-2xl p-6 md:p-8 lg:p-10 text-center">
                            <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-white mb-6 md:mb-8">
                                Submit your email for upcoming offers & updates.
                            </h3>

                            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
                                <div className="flex flex-col gap-2">

                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Email"
                                        disabled={isLoading}
                                        className="w-full px-4 py-3 md:px-6 md:py-4 rounded-lg bg-bg1 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors text-base md:text-lg"
                                    />
                                    {message && (
                                        <p
                                            className={`text-sm md:text-base ${messageType === "success"
                                                ? "text-green-500"
                                                : "text-red-500"
                                                }`}
                                        >
                                            {message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-center mt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-transparent border-none p-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <CustomButton2
                                            text="Submit"
                                            onClick={() => { }}
                                            image={ArrowDownButtonImage}
                                            imageStyling="w-16 h-16"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Power Mining Holiday Offer Section - Third 3/4 */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-8xl">
                <div className="flex flex-col items-center justify-center bg-bg2 px-4 py-8 md:p-8 lg:p-10">
                    {/* Title Section */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-primary mb-4 md:mb-6">
                            Power Mining —  Christmas Sale
                        </h2>
                        <p className="text-sm md:text-base lg:text-1xl text-[#D5D5D5] mb-4">
                            Boost your mining time & earnings with an exclusive discount
                        </p>
                        <p className="text-base md:text-lg lg:text-xl text-gray-300 font-bold">
                            Choose your plan — 70% OFF until 28/12
                        </p>
                    </div>

                    {/* Background Coins Illustration - Placeholder */}
                    <div className="absolute right-0 top-[-100px] w-40 md:w-60 lg:w-80 xl:w-100 opacity-20 pointer-events-none">

                        <Image
                            src={SalesBackground}
                            alt="Bitcoin Coins"
                            className="w-full h-auto object-contain"
                        />

                    </div>

                    {/* Plan Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-7xl mb-10 md:mb-16 relative z-10">
                        {/* Electric Mining Card */}
                        <div className="bg-bg1 rounded-2xl p-6 md:p-8 ">
                            <div className="flex flex-col text-left">

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    Electric Mining
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 mb-4">
                                    $30 / month ~9 BTCY/hr
                                </p>
                                <div className="flex flex-col gap-2 mb-4">
                                    <span className="text-base md:text-lg lg:text-xl font-bold text-gray-400 line-through">
                                        $100
                                    </span>
                                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                                        $30
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 text-sm md:text-base text-gray-300">
                                    <p className="">Referral + Priority</p>
                                </div>
                            </div>
                        </div>

                        {/* Turbo Mining Card */}
                        <div className="bg-bg1 rounded-2xl p-6 md:p-8 ">
                            <div className=" text-left">

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    Turbo Mining
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 mb-4">
                                    $90 / month ~18 BTCY/hr
                                </p>
                                <div className="flex flex-col gap-2 mb-4">
                                    <span className="text-base md:text-lg lg:text-xl font-bold text-gray-400 line-through">
                                        $300
                                    </span>
                                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                                        $90
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 text-sm md:text-base text-gray-300">
                                    <p className="">Referral + Priority</p>
                                </div>
                            </div>
                        </div>

                        {/* Nuclear Mining Card */}
                        <div className="bg-bg1 rounded-2xl p-6 md:p-8 ">
                            <div className="flex flex-col text-left">

                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                                    Nuclear Mining
                                </h3>
                                <p className="text-sm md:text-base text-gray-400 mb-4">
                                    $180 / month ~27 BTCY/hr
                                </p>
                                <div className="flex flex-col gap-2 mb-4">
                                    <span className="text-base md:text-lg lg:text-xl font-bold text-gray-400 line-through">
                                        $600
                                    </span>
                                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                                        $180
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2 text-sm md:text-base text-gray-300">
                                    <p className="">Referral + Priority</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-end justify-center gap-6 md:gap-8">
                        <CustomButton2
                            text="Buy Subscription"
                            image={CartButtonImage}
                            link="/mining/power-mining"
                            imageStyling="w-24 h-24 "
                        />
                        <CustomButton2
                            text="Learn More"
                            image={InfoButtonImage}
                            link="/mining/power-mining"
                            imageStyling="w-16 h-16 mb-4"
                        />
                    </div>
                </div>
            </div>

            {/* Benefits Section - Fourth 4/4 Part 1 */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                    {/* 9x Faster Mining */}
                    <div className="flex flex-col items-center text-center">

                        <Image
                            src={CardImage1}
                            alt="9x Faster Mining"
                            className="w-full max-w-xs h-auto object-contain mb-6"
                        />

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4">
                            9x Faster Mining
                        </h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Upgrade cycles increase hourly BTCY output.
                        </p>
                    </div>

                    {/* No heavy ads */}
                    <div className="flex flex-col items-center text-center">

                        <Image
                            src={CardImage2}
                            alt="No heavy ads"
                            className="w-full max-w-xs h-auto object-contain mb-6"
                        />

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4">
                            No heavy ads
                        </h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Cleaner experience — focused mining sessions.
                        </p>
                    </div>

                    {/* Unlock 24Hr Mining */}
                    <div className="flex flex-col items-center text-center">

                        <Image
                            src={CardImage3}
                            alt="Unlock 24Hr Mining"
                            className="w-full max-w-xs h-auto object-contain mb-6"
                        />

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-4">
                            Unlock 24Hr Mining
                        </h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Enjoy extended mining time beyond the standard 6-hour limit.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Power Mining Section */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
                <div className="flex flex-col items-center justify-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary text-center mb-12 md:mb-16">
                        Why Choose Power Mining?
                    </h2>

                    {/* Benefits List */}
                    <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 max-w-4xl">
                        {/* Benefit 1 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                1. Reach Alchemy Faster
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                Boost your mining speed so you can stack nuggets quicker and reach the Alchemy floor faster, where nuggets can be converted into BTCY tokens when the feature is live.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                2. Earn More, With Less Effort
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                Power Mining increases your effective earning rate (base free rate is 1.5 BTCY/hour) and lets you mine in longer sessions, so you tap less and earn more over time.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                3. Mine Without Constant Ads & Taps
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                Enjoy longer, smoother mining sessions with fewer interruptions—tap once every 24 hours instead of every 6 hours on the free plan, and reduce the need to watch ads to keep mining.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mining Characters Illustration */}
            <div className="mt-20 md:mt-40 flex justify-center">

                <Image
                    src={SalesPageArt}
                    alt="Mining Characters"
                    className="w-full h-auto object-contain"
                />

            </div>

            {/* FAQ Section - Fourth 4/4 Part 2 */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[1200px] mb-40">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-4 md:mb-6">
                    FAQ
                </h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary text-center mb-12 md:mb-16">
                    Power Mining, BTCY & Christmas Promo
                </h3>

                <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                            value="item-1"
                            className="border border-bg2 rounded-lg px-4 md:px-6"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                What is Power Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Power Mining is a paid upgrade inside Bitcoin Yay that boosts your mining experience. You get longer mining sessions, faster nugget accumulation compared to free mining, and fewer interruptions, so you can mine more BTCY with less effort.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-2"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Are Bitcoin-yay tokens backed by real blockchain technology?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Yes, Bitcoin-yay is secured by true blockchain technology, giving you transparent and tamper-proof ownership. With the official launch coming soon, the price is expected to increase — so buying now offers the highest benefit.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-3"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Is BTCY a real cryptocurrency?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                BTCY is a digital token created by the Bitcoin Yay ecosystem. Nuggets you mine in the app can be converted into BTCY tokens through Alchemy when that feature is active. BTCY is intended to be a real crypto asset, but like all tokens, availability, tradability, and price depend on market conditions and exchange support.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-4"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                How does the Christmas Power Mining promotion work?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                From Now to 28th December, you can get Power Mining at <strong>70% off</strong> the regular price. During this promotional period, any eligible Power Mining package you purchase inside the app will show the discounted price before you confirm payment.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-5"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Do I still have to watch ads if I get Power Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Power Mining is designed to reduce your reliance on ads and give you a smoother, less interrupted experience. You&apos;ll have longer sessions and fewer &quot;watch ad to continue&quot; moments compared to free mining, though occasional promotional content may still appear in the app.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-6"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                How often do I need to tap with Power Mining vs free mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                With free mining, you typically need to tap every 6 hours to keep your mining active. With Power Mining, you can unlock longer sessions so you only need to tap once every 24 hours, making it much easier to stay active without constantly checking the app.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-7"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Does Power Mining guarantee that my BTCY will be worth money in the future?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                No. Power Mining only affects how quickly and how comfortably you earn nuggets inside the app. Conversion to BTCY tokens, future listings, and token price are all subject to market and platform conditions. The value of BTCY can go up or down, and may be zero. There is no guaranteed profit.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-8"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Can I still mine for free without buying Power Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Yes. Free mining remains available to everyone. Power Mining is an optional upgrade for users who want to earn faster, reach Alchemy sooner, tap less frequently, and benefit from the limited-time from now to 28 December, Christmas 70% off promotion.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>

            {/* Disclaimer Section */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[1200px] mb-40">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 md:mb-8">
                    Disclaimer
                </h2>
                <div className="text-sm md:text-sm text-gray-300 leading-relaxed space-y-4">
                    <p>
                        Bitcoin Yay mining rewards you with in-app &quot;nuggets,&quot; not direct cryptocurrency. Nuggets are a loyalty/reward balance inside the app that can later be converted into BTCY tokens once Alchemy and token conversion features are available, and when/if BTCY is listed or tradable on supported platforms.
                    </p>
                    <p>
                        Listing, liquidity, and the future value of BTCY tokens are not guaranteed, can change at any time, and may be zero. Mining and Power Mining do <strong>not</strong> represent an investment product, do not guarantee profit, and should not be treated as financial advice. Always do your own research and only participate if you understand the risks of crypto and digital assets.
                    </p>
                </div>
            </div>
        </div>
    );
}

