import Image from "next/image";
import Link from "next/link";

import BitcoinYayLogo from "@/assets/images/logo.svg";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="relative w-48 h-48 mx-auto">
          <Image
            src={BitcoinYayLogo}
            alt="Bitcoin Yay Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Coming Soon Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Coming Soon
          </h1>
          <p className="text-gray-400 text-lg">
            We&apos;re working on something exciting! Stay tuned for updates.
          </p>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block  text-white px-8 py-3  hover:text-[#ff7c26] transition-colors mt-8"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
