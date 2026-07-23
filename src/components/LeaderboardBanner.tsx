"use client";

import Image from "next/image";
import CustomButton2 from "./CustomButton2";
import MiningStationLogo from "@/assets/images/mining-station/mining-station-logo.png";
import ViewAllButtonImage from "@/assets/images/buttons/view-all-button.webp";

// Mining Station Leaderboard promo banner — shows the current top 3 winners.
// Rendered inside the home page banner slider (src/components/HomeBannerSlider.tsx).
// TODO(backend): replace TOP3 with the live top-3 from the leaderboard endpoint.
const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

// Ordered for a podium layout: 2nd · 1st · 3rd.
const TOP3 = [
  { rank: 2, name: "Sarah J.", referrals: 187 },
  { rank: 1, name: "John S.", referrals: 210 },
  { rank: 3, name: "David M.", referrals: 165 },
];

const LeaderboardBanner = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#2a2a2a] p-8 md:p-10">
      {/* Soft accent */}
      <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(242,129,50,0.30),transparent_60%)] md:block" />

      {/* Top - Mining Station logo (centered) */}
      <div className="relative flex flex-col items-center">
        <Image
          src={MiningStationLogo}
          alt="Mining Station"
          className="h-20 w-auto object-contain md:h-28"
        />
      </div>

      {/* Content row */}
      <div className="relative mt-6 flex flex-col items-center gap-6 md:flex-row">
        {/* Left Section - Content */}
        <div className="flex flex-[1.1] flex-col p-4 md:p-8">
          <div className="mb-3 self-start rounded-full bg-[#f28132]/15 px-4 py-1">
            <span className="text-sm font-semibold text-[#f28132]">
              🏆 Updated Weekly
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold uppercase leading-[1] tracking-tight text-white md:text-5xl">
            Mining Station
            <br />
            <span className="text-[#f28132]">Leaderboard</span>
          </h1>

          <p className="mb-5 max-w-xs text-sm text-white/80 md:text-base">
            This week&apos;s top Mining Station owners ranked by their active
            referrals.
          </p>

          <div className="self-start">
            <CustomButton2
              image={ViewAllButtonImage}
              text="View Leaderboard"
              link="/leaderboard"
              imageStyling="w-16 h-16 md:w-28 md:h-28 object-contain mb-[-16px]"
            />
          </div>
        </div>

        {/* Right Section - Podium (top 3) */}
        <div className="flex flex-1 items-end justify-center gap-3 md:gap-4">
          {TOP3.map((winner, index) => {
            const first = winner.rank === 1;
            return (
              <div
                key={winner.rank}
                className={`flex w-[106px] flex-col items-center rounded-2xl border bg-[#202020] px-3 pt-5 transition-transform duration-300 hover:-translate-y-1.5 md:w-[190px] md:pt-7 ${
                  first
                    ? "border-[#f28132] pb-8 shadow-[0_0_30px_-6px_rgba(242,129,50,0.55)] md:pb-14"
                    : "border-white/10 pb-5 hover:border-[#f28132]/60 md:pb-8"
                }`}
              >
                <span
                  className="text-3xl [animation:lb-float_3s_ease-in-out_infinite] md:text-5xl"
                  style={{ animationDelay: `${index * 0.4}s` }}
                  aria-hidden
                >
                  {MEDALS[winner.rank]}
                </span>
                <div
                  className={`my-2 flex items-center justify-center rounded-full font-bold md:my-3 ${
                    first
                      ? "h-16 w-16 bg-[#f28132]/25 text-xl text-[#f28132] md:h-24 md:w-24 md:text-3xl"
                      : "h-12 w-12 bg-white/10 text-lg text-white/70 md:h-20 md:w-20 md:text-2xl"
                  }`}
                >
                  {winner.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-full truncate text-center text-sm font-semibold text-white md:text-lg">
                  {winner.name}
                </span>
                <span className="text-base font-bold text-[#f28132] md:text-2xl">
                  {winner.referrals}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-white/50 md:text-sm">
                  Referrals
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardBanner;
