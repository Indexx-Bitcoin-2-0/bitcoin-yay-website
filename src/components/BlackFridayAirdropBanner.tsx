"use client";

import Image from "next/image";
import CustomButton2 from "./CustomButton2";
import LogoImage from "@/assets/images/main-logo.svg";
import IndexxLogo from "@/assets/images/indexx.ai.svg";
import StarButtonImage from "@/assets/images/buttons/star-button.webp";
import EagleArt from "@/assets/images/usdxx/usdxx-airdrop-eagle-color.webp";
import UsdxxMark from "@/assets/images/usdxx/usdxx-mark.webp";

// Black Friday Airdrop banner, first slide of the home page banner slider
// (src/components/HomeBannerSlider.tsx). Same design as the Black Friday
// pop-up ("Something big is coming!"), with USDXX coins instead of INEX.
const BlackFridayAirdropBanner = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#2a2a2a] p-8 md:p-10">
      {/* Soft accent behind the eagle */}
      <div className="pointer-events-none absolute -left-10 top-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_35%_55%,rgba(242,129,50,0.25),transparent_60%)] md:block" />

      {/* Top - Logo + Powered By (centered, matching the other banners) */}
      <div className="relative flex flex-col items-center">
        <div className="mb-2 flex items-center justify-center">
          <Image src={LogoImage} alt="Bitcoin Yay" className="h-12 w-auto object-contain md:h-16" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base text-white md:text-lg">Powered By</span>
          <Image src={IndexxLogo} alt="Indexx.ai" className="h-8 w-auto md:h-10" />
        </div>
      </div>

      {/* Content row: eagle on the left, message on the right (as in the pop-up) */}
      <div className="relative mt-6 flex flex-col items-center gap-6 md:flex-row">
        <div className="flex flex-1 items-center justify-center">
          <Image
            src={EagleArt}
            alt="An eagle carrying a bag of USDXX coins"
            className="h-auto w-full max-w-[220px] object-contain md:max-w-[300px]"
            priority
          />
        </div>

        <div className="flex flex-[1.3] flex-col items-center p-2 text-center md:p-6">
          <h1 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            Something big
            <br />
            is coming!
          </h1>
          <div className="mt-5 h-1 w-40 rounded bg-[#f28132]" />
          <p className="mt-5 text-2xl font-extrabold uppercase leading-tight text-[#f28132] md:text-4xl">
            Black Friday is closer
            <br />
            than you think.
          </p>
          <p className="mt-5 text-base font-bold text-white md:text-xl">
            Stay active. Keep mining. Keep following.
          </p>

          {/* Prize line */}
          <div className="mt-6 flex items-center gap-3 rounded-full border border-[#73bf6b]/50 px-5 py-2">
            <Image src={UsdxxMark} alt="USDXX" className="h-8 w-8" />
            <p className="text-sm font-bold text-white md:text-base">
              <span className="text-[#73bf6b]">200 USDXX</span> prize pool · 20 winners
            </p>
          </div>

          <div className="mt-4">
            <CustomButton2
              image={StarButtonImage}
              text="Join the Airdrop"
              link="/airdrop"
              imageStyling="w-16 h-16 md:w-28 md:h-28 object-contain mb-[-16px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayAirdropBanner;
