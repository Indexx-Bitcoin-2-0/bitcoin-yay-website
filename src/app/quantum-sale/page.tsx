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

export default function QuantumSalePage() {
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
            <div className="flex items-center justify-center mt-20 md:mt-20">
                <Logo />
            </div>


            {/* Hero Banner Section */}
            <div className="mx-auto mt-20 md:mt-30 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
                <div className="flex items-center justify-center">
                    <Image
                        src={ChristmasTreeImage}
                        alt="Christmas Tree"
                        className="w-30 h-30 object-contain"
                    />
                </div>
                {/* Main Offer */}
                <div className="mb-4 md:mb-6 flex flex-col gap-2">
                    <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">
                        CHRISTMAS SALE — LIMITED •
                    </span>
                    <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white">
                        + 10% Bonus
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
                    {/* Left Content */}

                    <div className="flex-3 w-full lg:w-auto">
                        {/* Christmas Sale Tag */}




                        {/* Offer Lead-in */}
                        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-2">
                            Get up to
                        </p>

                        {/* Main Offer */}
                        <div className="mb-4 md:mb-6">
                            <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary">
                                +10% Bonus
                            </span>
                            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white ml-2">
                                BTCY Token Purchases
                            </span>
                        </div>

                        {/* Sale Duration */}
                        <p className="text-base md:text-lg lg:text-xl text-white mb-4 md:mb-6">
                            Limited Only from 12th to 28th December
                        </p>

                        {/* Descriptive Paragraph */}
                        <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed">
                            Skip the daily taps. Jump straight into the BTCY ecosystem with Quantum Mining – a limited pre-sale of BTCY tokens before launch.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-start justify-start gap-4 md:gap-6 mb-6 md:mb-8">
                            {/* Buy BTCY Button */}
                            <CustomButton2
                                text="Buy BTCY to get 10% Bonus"
                                image={CartButtonImage}
                                link="/quantum-mining"
                                imageStyling="w-24 h-24"
                                textMaxWidth="130px"
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
                    </div>

                    {/* Right Illustration */}
                    <div className="flex-2 w-full lg:w-auto flex items-center justify-center lg:justify-end">
                        <Image
                            src={Image1}
                            alt="Mine Cart with BTCY Coins"
                            className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Email Subscription Section */}
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

            {/* Benefits Section - Three Cards */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                    {/* No Mining Required */}
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={CardImage1}
                            alt="No Mining Required"
                            className="w-full max-w-xs h-auto object-contain mb-6"
                        />
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
                            No Mining Required
                        </h3>
                        <p className="text-base md:text-lg text-gray-300">
                            Quantum system auto-generates BTCY — no manual mining needed.
                        </p>
                    </div>

                    {/* Indexx.ai Asset Wallet */}
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={CardImage2}
                            alt="Indexx.ai Asset Wallet"
                            className="w-full max-w-xs h-auto object-contain mb-6"
                        />
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
                            Indexx.ai Asset Wallet
                        </h3>
                        <p className="text-base md:text-lg text-gray-300">
                            BTCY Tokens go direct to indexx.ai Asset Wallet
                        </p>
                    </div>

                    {/* Buy at Low Price */}
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={CardImage3}
                            alt="Buy at Low Price"
                            className="w-full max-w-xs h-auto object-contain mb-6"
                        />
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
                            Buy at Low Price
                        </h3>
                        <p className="text-base md:text-lg text-gray-300">
                            BTCY is in early low-price phase — perfect time to enter.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Quantum Mining Section */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
                <div className="flex flex-col items-center justify-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary text-center mb-12 md:mb-16">
                        Why Choose Quantum Mining?
                    </h2>

                    {/* Benefits List */}
                    <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 max-w-4xl">
                        {/* Benefit 1 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                1. Skip Daily Mining – Get BTCY Instantly
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                Quantum Mining is for people who don&apos;t want to tap and mine every day. Instead of slowly collecting nuggets, you can buy BTCY tokens directly in the pre-sale and lock in your position immediately.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                2. Buy While the Price Is Low (12.12 Discount)
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                With the 12.12 sale, you get 10% off your BTCY token purchase for a limited time. You&apos;re entering at an early stage, before launch and before potential future price movements once BTCY is live and tradable (if and when it gets listed).
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                3. Aligned with Bitcoin – Pegged Ratio
                            </h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                BTCY is designed with a target peg of 1,000,000 BTCY = 1 BTC, connecting the ecosystem to Bitcoin&apos;s price. Quantum Mining lets you participate in that vision early—while understanding that the peg, listing, and future market price are not guaranteed and can change.
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

            {/* FAQ Section */}
            <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[1200px] mb-40">
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center mb-4 md:mb-6">
                    FAQ
                </h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary text-center mb-12 md:mb-16">
                    Quantum Mining, BTCY & 12.12 Sale
                </h3>

                <div className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem
                            value="item-1"
                            className="border border-bg2 rounded-lg px-4 md:px-6"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                What is Quantum Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Quantum Mining is our pre-sale route for BTCY. Instead of mining nuggets inside the app and converting later, you buy BTCY tokens directly before launch. It&apos;s designed for users who want to secure tokens upfront rather than tap and mine daily.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-2"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                How is Quantum Mining different from Power Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                <ul className="list-disc list-inside space-y-2">
                                    <li><strong>Power Mining:</strong> You mine nuggets in the app faster and with longer sessions, then later convert those nuggets into BTCY via Alchemy when the feature is live.</li>
                                    <li><strong>Quantum Mining:</strong> You skip nuggets entirely and purchase BTCY tokens directly as a pre-sale. It&apos;s about getting tokens now rather than grinding daily mining sessions.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-3"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                What exactly am I buying with Quantum Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                You are purchasing an allocation of BTCY tokens in advance, under our pre-sale terms. These tokens are not yet listed or tradable on public exchanges. They will be delivered/activated according to the project&apos;s launch and token release schedule, subject to the platform&apos;s terms and any applicable regulations.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-4"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                How does the 12.12 Quantum Mining sale work?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                On 12 December (12.12), Quantum Mining purchases of BTCY made through the sales funnel will receive a 10% discount on the token price shown. The discount will be clearly displayed at checkout. This promotion is time-limited and only valid during the 12.12 sale window.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-5"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                What does the 1,000,000 BTCY = 1 BTC ratio mean?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                This ratio is a target peg used inside the Bitcoin Yay ecosystem to conceptually link BTCY to Bitcoin (1,000,000 BTCY representing the value of 1 BTC in the design). It is not a guaranteed exchange rate and does not mean you can always swap 1,000,000 BTCY for 1 BTC. Actual market prices, if and when BTCY lists, will depend on supply, demand, and market conditions.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-6"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Is BTCY listed on any exchange right now?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                No. BTCY is not currently listed on any exchange. Quantum Mining is a pre-launch token purchase. Future listings, if they happen, will be announced separately and are not guaranteed.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-7"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Does Quantum Mining guarantee that BTCY will go up in value?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                No. There is no guarantee that BTCY will increase in value, be listed on exchanges, or be tradeable in your region. Crypto tokens are highly volatile, and you should assume you can lose some or all of the funds you commit.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-8"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Who is Quantum Mining best suited for?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Quantum Mining is aimed at users who:
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Don&apos;t want to tap and mine every day</li>
                                    <li>Prefer buying tokens directly instead of grinding nuggets</li>
                                    <li>Want to take advantage of early pricing and limited-time discounts (like the 12.12 10% off sale) while understanding the high risk and speculative nature of pre-launch tokens.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-9"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Can I still mine for free or use Power Mining if I choose Quantum Mining?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Yes. Quantum Mining is optional. You can still:
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Mine for free inside the app</li>
                                    <li>Upgrade to Power Mining for faster nugget earning</li>
                                    <li>Or combine all three: free mining, Power Mining, and Quantum Mining depending on your strategy and risk appetite.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem
                            value="item-10"
                            className="border border-bg2 rounded-lg px-4 md:px-6 mt-4"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-white hover:no-underline">
                                Where do my purchased BTCY tokens and withdrawn nuggets go?
                            </AccordionTrigger>
                            <AccordionContent className="text-base md:text-lg text-gray-300 pt-2 pb-4">
                                Your BTCY app account is directly linked to your Indexx.ai asset wallet. When you buy BTCY through Quantum Mining or withdraw mined nuggets via Alchemy, the resulting BTCY tokens are sent to your Indexx.ai asset wallet automatically. You can log into Indexx.ai using your Bitcoin Yay (BTCY) account, view your BTCY balance there, and use any supported features on the exchange once BTCY is live and available.
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
                <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4">
                    <p>
                        BTCY purchased through Quantum Mining represents a pre-sale of tokens, not mined nuggets, and the BTCY token is not currently listed on any exchange. Access to liquidity, trading, or cashing out is not guaranteed and depends on future listings, market demand, regulatory approvals, and technical implementation.
                    </p>
                    <p>
                        The stated target ratio of 1,000,000 BTCY = 1 BTC is an internal design/pegging reference and not a guaranteed price, promise of value, or binding commitment. The value of BTCY may go up, down, or become zero.
                    </p>
                    <p>
                        Quantum Mining, Power Mining, and all BTCY products are not investment products, do not guarantee any profit or return, and should not be treated as financial advice. Participation may involve a high level of risk. Always do your own research and only spend what you can afford to lose, especially in experimental or pre-launch crypto ecosystems.
                    </p>
                    <p>
                        Availability of Quantum Mining and any discounts (including the 12.12 sale) may be subject to change, regional restrictions, and updated terms without prior notice.
                    </p>
                </div>
            </div>
        </div>
    );
}
