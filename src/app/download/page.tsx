"use client";

import Image from "next/image";
import Link from "next/link";
import MainLogo from "@/assets/images/main-logo.svg";
import GopherImage1 from "@/assets/images/downloadPageArt.png";

// App Store and Google Play links
const APP_STORE_LINK = "https://apps.apple.com/ph/app/bitcoin-yay/id6744868017";
const GOOGLE_PLAY_LINK = "https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en";

export default function DownloadPage() {
    return (
        <div className="min-h-screen bg-bg0 text-white flex flex-col items-center justify-center px-4 py-6 md:py-8">
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center mt-40">
                {/* Logo */}


                {/* Headline */}
                <div className="text-center mb-4 md:mb-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-1 md:mb-1 leading-tight">
                        FREE CRYPTO
                    </h1>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary leading-tight">
                        RIGHT NOW
                    </h1>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base lg:text-lg text-white text-center max-w-xl mb-6 md:mb-8 px-4">
                    Easy, fast, and free mining with the Bitcoin-Yay app. Start earning
                    cryptocurrency today without any investment.
                </p>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 w-full">
                    {/* App Store Button */}
                    <Link
                        href={APP_STORE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] border border-white rounded-lg bg-bg0 hover:bg-bg1 transition-colors px-4 py-3 md:px-5 md:py-4 flex items-center gap-3"
                    >
                        <svg
                            className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] md:text-xs text-white leading-tight">
                                Download on the
                            </span>
                            <span className="text-base md:text-lg font-bold text-white leading-tight">
                                App Store
                            </span>
                        </div>
                    </Link>

                    {/* Google Play Button */}
                    <Link
                        href={GOOGLE_PLAY_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] border border-white rounded-lg bg-bg0 hover:bg-bg1 transition-colors px-4 py-3 md:px-5 md:py-4 flex items-center gap-3"
                    >
                        <svg
                            className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] md:text-xs text-white leading-tight">
                                GET IT ON
                            </span>
                            <span className="text-base md:text-lg font-bold text-white leading-tight">
                                Google Play
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Illustration */}
                <div className="w-full max-w-xl md:max-w-1xl mb-6 md:mb-8 flex items-center justify-center">
                    <div className="relative w-full">
                        <Image
                            src={GopherImage1}
                            alt="Bitcoin-Yay Character Illustration"
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="w-full max-w-3xl px-4 md:px-6">
                    <p className="text-[10px] md:text-xs text-white text-center leading-relaxed">
                        Bitcoin Yay (BTCY) is a mobile mining app that allows users to earn
                        BTCY tokens through free mining. The app is not a financial product
                        and does not guarantee any specific returns. Earnings and rewards are
                        based on user activity, such as daily mining and ads watched.{" "}
                        <span className="font-semibold">
                            &quot;Free money&quot; is not a guarantee
                        </span>{" "}
                        and is subject to app terms and conditions. By downloading the
                        Bitcoin Yay app, you agree to the app&apos;s Terms of Service and
                        Privacy Policy. Bitcoin Yay is not responsible for any financial
                        loss or damage related to app use. Please use responsibly and
                        understand that BTCY tokens are non-transferable until official token
                        listing.
                    </p>
                </div>
            </div>
        </div>
    );
}

