"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import CustomButton2 from "./CustomButton2";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import HandsArt from "@/assets/images/btcy-index-relationship/hands.webp";
import PartnerLogo from "@/assets/images/image.webp";
import VisitButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import { useAuth } from "@/contexts/AuthContext";
import { getAuthenticatedWalletUrl } from "@/lib/authenticated-wallet";

// NOTE: This banner is rendered on the home page (src/app/page.tsx). The
// component keeps its legacy name to avoid touching the import there.
const VISIT_URL = "https://emmm.io/";

const NewYearPromotionalBanner = () => {
  const { user } = useAuth();
  const [visitUrl, setVisitUrl] = useState(VISIT_URL);

  useEffect(() => {
    let isActive = true;

    const buildVisitLink = async () => {
      const url = await getAuthenticatedWalletUrl(VISIT_URL, { includeBuyToken: false });
      if (isActive) setVisitUrl(url);
    };

    if (user?.email) {
      buildVisitLink();
    } else {
      setVisitUrl(VISIT_URL);
    }

    return () => {
      isActive = false;
    };
  }, [user?.email]);

  return (
    <div className="h-full w-full bg-[#2a2a2a] rounded-2xl overflow-hidden p-8 md:p-10">
      {/* Top - Co-branded logos + Powered By (centered, matching Alchemy layout) */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-5 md:gap-7 mb-2">
          <Image
            src={LogoImage}
            alt="Bitcoin Yay"
            className="h-12 md:h-16 w-auto object-contain"
          />
          <span className="text-white/60 text-xl md:text-2xl font-light">×</span>
          <Image
            src={PartnerLogo}
            alt="Partner"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        {/* Powered By */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-white text-base md:text-lg">Powered By</span>
          <Image src={IndexxLogo} alt="Indexx.ai" className="h-8 md:h-10 w-auto" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        {/* Left Section - Content */}
        <div className="flex-2 flex flex-col justify-center p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f28132] uppercase tracking-tight mb-6 md:mb-8">
            Bet Smart. Mine More.
          </h1>

          {/* Benefits — shared 2-col grid so both text blocks align */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 md:gap-x-5 gap-y-6 mb-8">
            {/* Benefit 1 — +10% */}
            <span className="justify-self-center text-4xl md:text-5xl font-extrabold text-[#f28132] shrink-0">
              +10%
            </span>
            <p className="text-base md:text-lg text-white leading-snug">
              Bet with BTCY and{" "}
              <span className="font-bold text-[#f28132]">Win 10% More</span>
              <br className="hidden md:block" /> on Every Prediction
            </p>

            {/* Benefit 2 — Turbo mining */}
            <span className="justify-self-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#f28132] flex items-center justify-center shrink-0">
              <Zap
                size={26}
                className="text-[#f28132]"
                fill="currentColor"
                strokeWidth={1}
              />
            </span>
            <p className="text-base md:text-lg leading-snug">
              <span className="font-bold text-[#f28132]">
                Place 1 Bet = Get 7 Days
              </span>
              <br />
              <span className="text-white">Turbo Mining</span>
            </p>
          </div>

          {/* Visit oval button */}
          <div className="self-center md:self-start">
            <CustomButton2
              image={VisitButtonImage}
              text="Visit"
              link={visitUrl}
              _blank
              imageStyling="w-16 h-16 md:w-28 md:h-28 object-contain mb-[-16px]"

            />
          </div>
        </div>

        {/* Right Section - Illustration (reduced size) */}
        <div className="flex-1 flex items-center justify-center md:justify-end">
          <Image
            src={HandsArt}
            alt="Bitcoin Yay × Indexx hands illustration"
            className="w-full h-auto object-contain max-w-[240px] md:max-w-[300px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default NewYearPromotionalBanner;
