"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NewYearPromotionalBanner from "./NewYearPromotionalBanner";
import SlateLotteryBanner from "./SlateLotteryBanner";
import BlackFridayAirdropBanner from "./BlackFridayAirdropBanner";
import LeaderboardBanner from "./LeaderboardBanner";

// Time each banner stays before auto-advancing (ms).
const AUTOPLAY_INTERVAL = 6000;

// Home page hero banner slider. Every slide is as tall as the tallest one
// (flex stretch; no explicit height on the items) and each banner centres its
// content in that space, so all slides look the same size. Auto-advances on an interval (pauses on hover),
// with manual prev/next arrows. Slides stretch to equal height via the flex
// container's default align-stretch plus `h-full` on each banner root.
const HomeBannerSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api || isPaused) return;

    const id = setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(id);
  }, [api, isPaused]);

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      setApi={setApi}
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <CarouselContent className="items-stretch">
        {/* The current airdrop goes first. */}
        <CarouselItem>
          <BlackFridayAirdropBanner />
        </CarouselItem>
        <CarouselItem>
          <NewYearPromotionalBanner />
        </CarouselItem>
        <CarouselItem>
          <SlateLotteryBanner />
        </CarouselItem>
        <CarouselItem>
          <LeaderboardBanner />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="left-2 h-10 w-10 cursor-pointer border-none bg-transparent text-primary transition-transform duration-200 hover:scale-125 hover:bg-transparent hover:text-primary md:-left-12" />
      <CarouselNext className="right-2 h-10 w-10 cursor-pointer border-none bg-transparent text-primary transition-transform duration-200 hover:scale-125 hover:bg-transparent hover:text-primary md:-right-12" />
    </Carousel>
  );
};

export default HomeBannerSlider;
