"use client";

import Image from "next/image";
import { Users, Upload, Gift } from "lucide-react";
import CustomButton2 from "./CustomButton2";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import StarButtonImage from "@/assets/images/buttons/star-button.webp";
import CampaignArt from "@/assets/images/mining/turbo-mining-art-1.webp";

// Social Media Campaign promo banner. Rendered inside the home page banner
// slider (src/components/HomeBannerSlider.tsx). Reward: 2 weeks Turbo Mining Power.
const STEPS = [
  { Icon: Users, text: "Follow Bitcoin Yay & EMMM", accent: false },
  { Icon: Upload, text: "Upload your screenshots", accent: false },
  { Icon: Gift, text: "Get 2 Weeks of Turbo Mining Power", accent: true },
];

const SocialCampaignBanner = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#2a2a2a] p-8 md:p-10">
      {/* Soft accent */}
      <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(242,129,50,0.30),transparent_60%)] md:block" />

      {/* Top - Logo + Powered By (centered, matching the other banners) */}
      <div className="relative flex flex-col items-center">
        <div className="mb-2 flex items-center justify-center gap-4 md:gap-5">
          <Image
            src={LogoImage}
            alt="Bitcoin Yay"
            className="h-12 w-auto object-contain md:h-16"
          />
        </div>
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
          <h1 className="mb-5 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            Social Media
            <br />
            <span className="text-[#f28132]">Campaign</span>
          </h1>

          {/* Steps */}
          <div className="mb-5 flex flex-col gap-3">
            {STEPS.map(({ Icon, text, accent }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon
                  className={accent ? "text-[#f28132]" : "text-white"}
                  size={22}
                  strokeWidth={2}
                />
                <p
                  className={`text-sm font-bold uppercase tracking-wide md:text-base ${
                    accent ? "text-[#f28132]" : "text-white"
                  }`}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Reward pill */}
          <div className="mb-4 self-start rounded-lg bg-[#f28132] px-5 py-2">
            <p className="text-sm font-bold uppercase tracking-wide text-black md:text-base">
              🎁 Reward · 2 Weeks Turbo Mining Power
            </p>
          </div>

          {/* CTA — join the campaign */}
          <div className="mt-2 self-start">
            <CustomButton2
              image={StarButtonImage}
              text="Join Campaign"
              link="/social-campaign"
              imageStyling="w-16 h-16 md:w-28 md:h-28 object-contain mb-[-16px]"
            />
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex flex-1 items-center justify-center md:justify-end">
          <Image
            src={CampaignArt}
            alt="Social Media Campaign"
            className="h-auto w-full max-w-[260px] object-contain md:max-w-[293px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SocialCampaignBanner;
