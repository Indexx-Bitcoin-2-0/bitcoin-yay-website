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

// Time each banner stays before auto-advancing (ms).
const AUTOPLAY_INTERVAL = 6000;

// Home page hero banner slider. Auto-advances on an interval (pauses on hover),
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
        <CarouselItem className="h-full">
          <NewYearPromotionalBanner />
        </CarouselItem>
        <CarouselItem className="h-full">
          <SlateLotteryBanner />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="left-2 h-10 w-10 cursor-pointer border-[#f28132] text-white hover:border-[#f28132] hover:bg-black/60 hover:text-[#f28132] md:-left-12" />
      <CarouselNext className="right-2 h-10 w-10 cursor-pointer border-[#f28132] text-white hover:border-[#f28132] hover:bg-black/60 hover:text-[#f28132] md:-right-12" />
    </Carousel>
  );
};

export default HomeBannerSlider;
