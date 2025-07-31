"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ArtImage1 from "@/assets/images/coming-soon/art-1.webp";

import AppStoreImage from "@/assets/images/buttons/get-on-applestore-button.webp";
import GooglePlayImage from "@/assets/images/buttons/get-on-playstore-button.webp";

export default function ReferralPage() {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState("");
  useEffect(() => {
    // Try ?code=xyz format
    let code = searchParams.get("code");

    // Fallback to path format: /referral=xyz
    if (!code) {
      const raw = window.location.href;
      const match = raw.match(/referral=([^&]+)/);
      if (match?.[1]) code = match[1];
    }

    if (code) setReferralCode(code);
  }, [searchParams]);

  return (
    <div className="container mt-40 mx-auto py-20 px-4 text-center">
      <h2 className="text-5xl md:text-6xl font-bold">You&#39;re Invited!</h2>

      <Image
        src={ArtImage1}
        alt="Coming Soon"
        className="mt-12 w-80 md:w-120 xl:w-200 mx-auto"
      />

      <div className="mt-12 max-w-md mx-auto">
        <input
          type="text"
          value={referralCode}
          readOnly
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Your Referral Code"
          className="w-full px-4 py-3 border rounded-md shadow-sm text-lg"
        />
      </div>

      <p className="text-sm md:text-lg font-normal text-tertiary my-4">
        Use this code while signing up in the app
      </p>
      <div className="mt-2 flex flex-col md:flex-row md:gap-20 justify-center items-center">
        <Link
          href="https://apps.apple.com/ph/app/bitcoin-yay/id6744868017"
          target="_blank"
        >
          <Image
            src={AppStoreImage}
            alt="Get on Apple Store"
            className="w-50 h-18 mt-10 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en"
          target="_blank"
        >
          <Image
            src={GooglePlayImage}
            alt="Get on Play Store"
            className="w-50 h-18 mt-10 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </Link>
      </div>
    </div>
  );
}
