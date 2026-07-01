"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Gift, Trophy } from "lucide-react";
import CustomButton2 from "./CustomButton2";
import LogoImage from "@/assets/images/main-logo.svg";
import PartnerLogo from "@/assets/images/image.webp";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import VisitButtonImage from "@/assets/images/buttons/arrow-right-button.svg";
import TigerArt from "@/assets/images/slate-lottery/tiger.png";
import { useAuth } from "@/contexts/AuthContext";
import { getAuthenticatedWalletUrl } from "@/lib/authenticated-wallet";

const VISIT_URL = "https://emmm.io/";

// Slate Lottery promo banner. Rendered inside the home page banner slider
// (src/components/HomeBannerSlider.tsx) alongside NewYearPromotionalBanner.
const SlateLotteryBanner = () => {
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
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#2a2a2a] p-8 md:p-10">
      {/* Soft orange accent behind the tiger (echoes the brush strokes) */}
      <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(242,129,50,0.30),transparent_60%)] md:block" />

      {/* Top - Co-branded logos + Powered By (centered, matching Bet Smart banner) */}
      <div className="relative flex flex-col items-center">
        <div className="mb-2 flex items-center justify-center gap-5 md:gap-7">
          <Image
            src={LogoImage}
            alt="Bitcoin Yay"
            className="h-12 w-auto object-contain md:h-16"
          />
          <span className="text-xl font-light text-white/60 md:text-2xl">×</span>
          {/* TODO: swap PartnerLogo for the tiger-team badge if a dedicated asset is provided */}
          <Image
            src={PartnerLogo}
            alt="Partner"
            className="h-12 w-auto object-contain md:h-16"
          />
        </div>

        {/* Powered By */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-base text-white md:text-lg">Powered By</span>
          <Image src={IndexxLogo} alt="Indexx.ai" className="h-8 w-auto md:h-10" />
        </div>
      </div>

      {/* Content row */}
      <div className="relative mt-6 flex flex-col items-center gap-6 md:flex-row">
        {/* Left Section - Content */}
        <div className="flex flex-[1.4] flex-col p-6 md:p-8">
          {/* Headline */}
          <h1 className="mb-5 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-5xl lg:text-6xl">
            Slate  Lottery
            <br />
            <span>Is </span>
            <span className="text-[#f28132]">Live.</span>
          </h1>

          {/* Benefit cards */}
          <div className="mb-5 flex flex-wrap gap-4">
            <div className="flex min-w-[140px] flex-1 flex-col items-center gap-1 rounded-xl border border-[#f28132]/70 px-5 py-3 text-center">
              <p className="text-sm font-semibold uppercase text-white">Get 4+ Right</p>
              <Gift className="my-1 text-[#f28132]" size={26} strokeWidth={1.75} />
              <p className="text-sm font-bold uppercase text-[#f28132]">Win Prizes</p>
            </div>
            <div className="flex min-w-[140px] flex-1 flex-col items-center gap-1 rounded-xl border border-white/25 px-5 py-3 text-center">
              <p className="text-sm font-semibold uppercase text-white">Get All 7 Right</p>
              <Trophy className="my-1 text-[#f28132]" size={26} strokeWidth={1.75} />
              <p className="text-sm font-bold uppercase text-[#f28132]">Grand Jackpot</p>
            </div>
          </div>

          {/* Tagline pill */}
          <div className="mb-4 self-start rounded-lg bg-[#f28132] px-5 py-2">
            <p className="text-sm font-bold uppercase tracking-wide text-black md:text-base">
              Pick 7 Outcomes. Real Events. Real Money.
            </p>
          </div>

          {/* Sub-line */}
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80 md:text-base">
            You see what others don&apos;t.{" "}
            <span className="text-[#f28132]">Prove it.</span>
          </p>

          {/* Oval CTA — redirects to emmm.io (authenticated wallet URL when signed in) */}
          <div className="mt-2 self-start">
            <CustomButton2
              image={VisitButtonImage}
              text="Visit"
              link={visitUrl}
              _blank
              imageStyling="w-16 h-16 md:w-28 md:h-28 object-contain mb-[-16px]"
            />
          </div>
        </div>

        {/* Right Section - Tiger illustration */}
        <div className="flex flex-1 items-center justify-center md:justify-end">
          <Image
            src={TigerArt}
            alt="Slate Lottery tiger mascot"
            className="h-auto w-full max-w-[260px] object-contain md:max-w-[293px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SlateLotteryBanner;
