"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarsRating from "./StarsRating";

import ReviewPic1 from "../assets/images/home/review/review-pic-1.png";
import ReviewPic2 from "../assets/images/home/review/review-pic-2.png";
import ReviewPic3 from "../assets/images/home/review/review-pic-3.png";

const userReviews = [
  {
    star: 5,
    time: "1 day ago",
    review:
      "Using this platform has been such a breeze! I feel completely secure knowing my assets are protected, and whenever I need help, the support is top-notch. Managing my crypto has never been easier!",
    name: "Ava Foster, Software Engineer",
    image: ReviewPic1.src,
  },
  {
    star: 5,
    time: "1 day ago",
    review:
      "Pleasantly surprised by the increase in funds, percentage-wise. It's a promising start for me as an investor.",
    name: "Michael Gray, Banker",
    image: ReviewPic2.src,
  },
  {
    star: 5,
    time: "2 days ago",
    review:
      "I enjoy using this app because they offer excellent customer support and assistance.",
    name: "Bella Adams, Artist",
    image: ReviewPic3.src,
  },
  {
    star: 5,
    time: "2 days ago",
    review:
      "I enjoy using this app because they offer excellent customer support and assistance.",
    name: "Bella Adams, Artist",
    image: ReviewPic3.src,
  },
];

export default function UserReviewCards() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="p-4 mt-10 flex items-center justify-center max-w-full ">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className=" gap-1">
          {userReviews.map((review, index) => (
            <CarouselItem
              key={index}
              className="basis-full lg:basis-[33%] flex items-center justify-center"
            >
              <Card className=" lg:h-72 flex items-center justify-center flex-col border border-bg2 rounded-xl bg-bg1 text-tertiary w-[300px] md:w-[400px] lg:w-[500px]">
                <CardContent className="px-7">
                  <div className="">
                    <div className="border-b border-bg2 flex items-center justify-between pb-4">
                      <StarsRating rating={review.star} />
                      <p className="text-sm font-normal text-tertiary">
                        {review.time}
                      </p>
                    </div>
                    <div className="py-4 h-40 lg:h-30 block">
                      <p className="leading-normal font-normal text-base text-start text-tertiary">
                        {review.review}
                      </p>
                    </div>
                    <div className="flex items-center justify-start mt-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={review.image}
                          alt="User Avatar"
                          className="rounded-full"
                        />
                        <AvatarFallback>
                          {review.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="flex flex-col items-start ml-2 text-base font-regular text-tertiary">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="relative">
          <CarouselPrevious className="absolute w-10 h-10 top-[calc(100%+0.5rem)] left-[48%] -translate-x-12 translate-y-6 hover:text-primary hover:bg-transparent hover:border-primary" />
          <CarouselNext className="absolute w-10 h-10 top-[calc(100%+0.5rem)] left-[48%] translate-x-12 translate-y-6 hover:text-primary hover:bg-transparent hover:border-primary" />
        </div>
      </Carousel>
    </div>
  );
}
