import Image from "next/image";
import Link from "next/link";

import CustomButton2 from "@/components/CustomButton2";

import NuclearMiningButtonImage from "@/assets/images/mining/nuclear-icon.webp";
import NuclearMiningArtImage1 from "@/assets/images/mining/nuclear-mining-art-1.webp";
import BellButtonImage from "@/assets/images/buttons/bell-button.webp";

const NuclearMiningPage = () => {
  return (
    <div className="mx-auto mt-40 md:mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col items-center justify-center gap-20">
        <div className="flex items-center gap-10">
          <Image
            src={NuclearMiningButtonImage}
            alt="Nuclear Mining"
            className="w-20 md:w-40"
          />
          <h1 className="text-4xl md:text-5xl xl:text-8xl font-bold">
            Nuclear Mining Plan
          </h1>
        </div>
        <Image
          src={NuclearMiningArtImage1}
          alt="Nuclear Mining"
          className="w-90 md:w-120 lg:w-200"
        />
        <div className="mt-20 flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-bold text-center">Generate</p>
          <p className="text-6xl md:text-9xl font-bold text-center">
            27 BTCY/<span className="text-3xl md:text-6xl font-bold">Hr</span>
          </p>
          <ul className="mt-20 list-disc list-inside text-xl flex flex-col gap-6">
            <li> <span className="font-bold line-through">
              $600
            </span> $ 180/m subscription fee</li>
            <li>1 BTCY ~ $ 0.10</li>
            <li>~27 BTCY/hour ~ $ 2.70</li>
            <li className="text-primary">Referral Bonuses</li>
            <li>Priority Mining Support</li>
          </ul>
        </div>
        <CustomButton2
          text="Subscribe"
          image={BellButtonImage}
          link="/#apple-store-download"
          imageStyling="w-34"
        />
      </div>

      <div className="text-base mt-40 flex flex-col gap-20 max-w-5xl leading-8 mb-40">
        <div>
          <p className="text-3xl font-bold mb-4">
            Bitcoin Yay Subscription Disclaimer
          </p>
          <p className="font-bold">
            Please Read Carefully Before Purchasing Any Subscription Plan
          </p>
          <p>
            By purchasing or activating any subscription plan on the Bitcoin Yay
            platform, you acknowledge and agree to the following:
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            1. Utility-Only, Not Financial Investment
          </p>
          <p>
            Bitcoin Yay (BTCY) and all associated subscription plans—including
            Snatch Gopher, Electric Gopher, Turbo Gopher, and Nuclear Gopher—are
            designed solely to enhance your participation in the BTCY ecosystem.
            These plans grant access to increased virtual mining speed and other
            in-app utilities. They are not investment contracts, securities, or
            profit-generating instruments.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">2. No Guarantee of Value</p>
          <p>
            BTCY is a utility token earned through daily app interaction (mobile
            mining). The token’s market price may fluctuate and is not
            guaranteed. Subscription plans do not promise any fixed return,
            profit, or appreciation of BTCY.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            3. Access to Virtual Mining Only
          </p>
          <p>
            Each subscription level provides users with enhanced mining power
            within the app’s virtual AI-based tap-to-mine system. These tiers
            (e.g., Turbo Gopher, Nuclear Gopher) do not mine real Bitcoin (BTC)
            and instead increase the user’s in-app BTCY generation capacity.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            4. Limited-Time Bonuses and Referral Mechanics
          </p>
          <p>
            Some plans or features may include free access tiers or reward
            multipliers through referrals (e.g., earning special mining power
            when referring 10+ users). These features are promotional and
            subject to change. Access to higher-tier mining power is based on
            reaching specific referral milestones and does not imply ownership
            rights or investment privileges.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">
            5. Non-Refundable, App-Based Subscription
          </p>
          <p>
            All purchases of subscription plans are final and non-refundable.
            Subscription features are app-based and may only be accessed within
            the official Bitcoin Yay app (TestFlight or live release, depending
            on platform availability).
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">6. Ecosystem Integration</p>
          <p>
            BTCY earned via subscriptions can be used in the broader Indexx
            ecosystem (e.g., Indexx Lotto, Indexx Shop), where tokens may be
            burned or redeemed for products, upgrades, or bonus entries. These
            features are utility-based and subject to ecosystem availability and
            terms.
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold mb-4">7. Eligibility & Access</p>
          <p>
            Subscriptions are available to users aged 18+ and residing in
            jurisdictions where virtual crypto mining applications are legally
            permitted. Bitcoin Yay reserves the right to suspend accounts or
            restrict access where illegal, fraudulent, or abusive activity is
            detected.
          </p>
          <p className="font-bold">
            If you do not agree to these terms, do not proceed with any
            subscription purchase.
          </p>
          <div>
            For support or questions, please contact{" "}
            <Link
              href="mailto:support@bitcoinyay.com"
              className="text-primary hover:text-primary/80"
            >
              support@bitcoinyay.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuclearMiningPage;
