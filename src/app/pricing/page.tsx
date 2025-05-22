import CustomStyledConatiner from "@/components/CustomStyledContainer";
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

import PricingCardTitleImage1 from "@/assets/images/pricing/title-image-1.svg";
import PricingCardTitleImage2 from "@/assets/images/pricing/title-image-2.svg";
import PricingCardTitleImage3 from "@/assets/images/pricing/title-image-3.svg";
import PricingCardTitleImage4 from "@/assets/images/pricing/title-image-4.svg";
import PricingCardTitleImage5 from "@/assets/images/pricing/title-image-5.svg";

import PricingCardImage1 from "@/assets/images/pricing/pricing-card-1.svg";
import PricingCardImage2 from "@/assets/images/pricing/pricing-card-2.svg";
import PricingCardImage3 from "@/assets/images/pricing/pricing-card-3.svg";
import PricingCardImage4 from "@/assets/images/pricing/pricing-card-4.svg";
import PricingCardImage5 from "@/assets/images/pricing/pricing-card-5.svg";
import PricingCardImage6 from "@/assets/images/pricing/pricing-card-6.svg";

const PricingCard = ({
  titleImage,
  title,
  mainImage,
  numOfGophers,
  gophersDesc,
  price,
  priceDesc,
  featuresList,
}: {
  titleImage?: StaticImageData;
  title: string;
  mainImage: StaticImageData;
  numOfGophers?: string;
  gophersDesc: string;
  price?: string;
  priceDesc?: string;
  featuresList: ReactNode;
}) => {
  return (
    <div className="w-120 bg-bg2 shadow-lg rounded-lg p-6 m-4">
      <div className="flex items-center mb-4">
        {titleImage ? (
          <Image src={titleImage} alt={title} className="w-16 h-16 mr-2" />
        ) : (
          <div className="w-16 h-16 "></div>
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex justify-center items-center">
        <Image src={mainImage} alt={title} className="h-60" />
      </div>

      <p className="text-base font-bold mb-4 text-center flex flex-col items-center">
        {numOfGophers ? (
          <span className="text-6xl font-medium">{numOfGophers}</span>
        ) : (
          <span className="h-15"></span>
        )}
        {gophersDesc}
      </p>
      {price ? (
        <div className="flex justify-start items-center mt-14">
          <span className="text-3xl font-medium">$</span>
          <span className="text-8xl font-medium">
            {price}
            <span className="text-3xl">Month</span>
          </span>
        </div>
      ) : (
        <div className="h-35"></div>
      )}

      {priceDesc ? (
        <p className="text-lg h-30 my-8 text-center">{priceDesc}</p>
      ) : (
        <div className="h-36"></div>
      )}
      <ul className="list-disc pl-5 mb-4 mt-10 leading-10">{featuresList}</ul>
    </div>
  );
};

export default function PricingPage() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Bitcoin Yay Pricing
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: May 10, 2025
        </p>
      </CustomStyledConatiner>

      <div className="flex flex-wrap mt-20 justify-center">
        <PricingCard
          titleImage={PricingCardTitleImage1}
          title="Free Plan"
          mainImage={PricingCardImage1}
          numOfGophers="1"
          gophersDesc=" Snatch Gophers Mining Power"
          price="0"
          priceDesc="Standard 24 hours/day mining availability. No cost entry for all users. Requires simple engagement (e.g., watch ads) to maintain mining."
          featuresList={
            <>
              <li>Speed Boost 1x</li>
              <li>~3 BTCY/hour</li>
              <li>No Hidden Fees</li>
              <li>Instant Withdrawals</li>
              <li>User-Friendly Mining</li>
              <li>Secure &amp; Reliable</li>
              <li>Referral Bonuses</li>
              <li>24/7 Support</li>
            </>
          }
        />
        <PricingCard
          titleImage={PricingCardTitleImage2}
          title="Electric Plan"
          mainImage={PricingCardImage2}
          numOfGophers="300"
          gophersDesc=" Electric Gophers Mining Power"
          price="100"
          priceDesc="High-speed mining. Faster transaction processing on the network."
          featuresList={
            <>
              <li>Speed Boost 3x</li>
              <li>~9 BTCY/hour</li>
              <li>Priority Transactions</li>
              <li>Faster Payouts</li>
              <li>Exclusive Promotions</li>
              <li>Secure &amp; Reliable</li>
              <li>Bonus Rewards</li>
              <li>Priority Support</li>
            </>
          }
        />
        <PricingCard
          titleImage={PricingCardTitleImage3}
          title="Turbo Plan"
          mainImage={PricingCardImage3}
          numOfGophers="900"
          gophersDesc=" Turbo Gophers Mining Power"
          price="300"
          priceDesc="Super-speed mining. Priority withdrawal processing (withdrawals are prioritized for Turbo users)."
          featuresList={
            <>
              <li>Speed Boost 6x</li>
              <li>~18 BTCY/hour</li>
              <li>Priority Withdrawals</li>
              <li>Faster Payouts</li>
              <li>Early Access to Promotions</li>
              <li>Secure &amp; Reliable</li>
              <li>Exclusive Bonus Rewards</li>
              <li>VIP Support</li>
            </>
          }
        />
        <PricingCard
          titleImage={PricingCardTitleImage4}
          title="Nuclear Plan"
          mainImage={PricingCardImage4}
          numOfGophers="1,500"
          gophersDesc=" Nuclear Gophers Mining Power or More"
          price="600"
          priceDesc="Ultra-speed mining. VIP support (dedicated customer service, faster issue resolution, exclusive perks)."
          featuresList={
            <>
              <li>Speed Boost 9x</li>
              <li>~27 BTCY/hour</li>
              <li>Fast Instant Withdrawals</li>
              <li>Faster Payouts</li>
              <li>Lifetime Loyalty Rewards</li>
              <li>Enhanced Security</li>
              <li>Exclusive Bonus Rewards</li>
              <li>Premium VIP Support</li>
            </>
          }
        />
        <PricingCard
          titleImage={PricingCardTitleImage5}
          title="Nerdy Gopher"
          mainImage={PricingCardImage5}
          numOfGophers="1,000"
          gophersDesc="Snatch Gophers Mining Power"
          featuresList={
            <>
              <li>Speed Boost 9x</li>
              <li>Ultra-Fast Mining</li>
              <li>Fast Instant Withdrawals</li>
              <li>Faster Payouts</li>
              <li>Lifetime Loyalty Rewards</li>
              <li>Enhanced Security</li>
              <li>Exclusive Bonus Rewards</li>
              <li>Premium VIP Support</li>
            </>
          }
        />

        <PricingCard
          title="Referral Gopher"
          mainImage={PricingCardImage6}
          gophersDesc="Networking and Build your Mining Team"
          featuresList={
            <>
              <li>Speed Boost 9x</li>
              <li>Ultra-Fast Mining</li>
              <li>Fast Instant Withdrawals</li>
              <li>Faster Payouts</li>
              <li>Lifetime Loyalty Rewards</li>
              <li>Enhanced Security</li>
              <li>Exclusive Bonus Rewards</li>
              <li>Premium VIP Support</li>
            </>
          }
        />
      </div>
    </div>
  );
}
