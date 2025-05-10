"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarsRating from "./StarsRating";

import ReviewPic1 from "../assets/images/home/review/review-pic-1.svg";
import ReviewPic2 from "../assets/images/home/review/review-pic-2.svg";
import ReviewPic3 from "../assets/images/home/review/review-pic-3.svg";
import ReviewPic4 from "../assets/images/home/review/review-pic-4.svg";

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
    star: 4,
    time: "3 days ago",
    review:
      "It's great to hear you're finding the platform intuitive and appreciate the clear layout! And you're right, knowing your investments are secure is a fantastic foundation to build on.",
    name: "David Carter, Marketing Manager",
    image: ReviewPic4.src,
  },
];

export default function UserReviewCards() {
  return (
    <div className="lg:p-4 my-10 flex items-center justify-center max-w-full ">
      <Carousel className="w-full">
        <CarouselContent className=" gap-1">
          {userReviews.map((review, index) => (
            <CarouselItem
              key={index}
              className="basis-full h-100 lg:basis-[33%] flex items-center justify-center"
            >
              <Card className=" lg:h-72 flex items-center justify-start flex-col border border-bg2 rounded-xl bg-bg1 text-tertiary w-full md:w-[450px] lg:w-[500px]">
                <CardContent className="px-7 relative ">
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
                  <div className="absolute -bottom-20 lg:-bottom-40  flex items-start justify-start mt-4">
                    <Avatar className="w-24 h-24">
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
