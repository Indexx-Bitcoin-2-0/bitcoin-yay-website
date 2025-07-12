import Image from "next/image";

import CountdownTimer from "@/components/CounterComponent";
import CustomButton2 from "@/components/CustomButton2";

import ArtImage1 from "@/assets/images/airdrop/art-1.webp";
// import ArtImage2 from "@/assets/images/airdrop/art-2.webp";
import ArtImage3 from "@/assets/images/airdrop/art-3.webp";
// import ArtImage4 from "@/assets/images/airdrop/art-4.webp";
// import ArtImage5 from "@/assets/images/airdrop/art-5.webp";
import ArtImage6 from "@/assets/images/airdrop/art-6.webp";

import WhatYouGetImage1 from "@/assets/images/airdrop/what-you-get-1.webp";
import WhatYouGetImage2 from "@/assets/images/airdrop/what-you-get-2.webp";
// import WhatYouGetImage3 from "@/assets/images/airdrop/what-you-get-3.webp";
import WhatYouGetImage4 from "@/assets/images/airdrop/what-you-get-4.webp";
import WorldMapImage from "@/assets/images/airdrop/political-map-world.webp";

import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
// import PowerButtonImage from "@/assets/images/buttons/power-button.webp";
import PointFingerButtonImage from "@/assets/images/buttons/point-button.webp";

import UserReviewCards from "@/components/UserReviewCards";

export default function Airdrop() {
  return (
    <div className="mx-auto mt-40">
      <div className="relative">
        <div className="w-full lg:w-[80%] flex flex-col px-4 md:px-20 xl:pl-30">
          {/* <div className="px-4 md:px-20 xl:px-40 lg:items-start lg:justify-start">
            <h2 className="text-5xl md:text-7xl xl:text-[110px] font-bold">
              FREE Airdrop
            </h2>
            <h2 className="text-5xl md:text-7xl xl:text-[110px] font-bold">
              5 Days Turbo Mining Power On Us!
            </h2>
            <p className="mt-2 text-2xl lg:text-3xl max-w-220 text-tertiary">
              Supported by our Turbo Gopher to supercharge your Bitcoin Yay
              earnings to earn an extra
            </p>
            <h3 className="mt-6 text-9xl md:text-[150px] font-bold flex items-start text-tertiary leading-30">
              <p className="text-7xl font-normal">$</p>250
            </h3>
            <div className="font-bold mt-10 flex flex-col justify-center items-center md:items-start">
              <CustomButton2
                image={PointFingerButtonImage}
                text="Join the Airdrop"
                link="/airdrop/register"
              />
              <p className="mt-2 text-base font-light italic text-bg3">
                No credit card required. Instant activation. Cancel anytime
              </p>
            </div>
          </div> */}

          <div className="flex items-end">
            <div className=" text-primary relative">
              <h1 className="text-[200px] md:text-[310px] xl:text-[200px] 2xl:text-[310px] font-bold leading-50 md:leading-72 xl:leading-50 2xl:leading-72">
                4
              </h1>
              <p className="text-7xl font-medium absolute top-10 -right-20">
                th
              </p>
            </div>
            <div className="text-7xl md:text-9xl xl:text-6xl 2xl:text-9xl font-bold">
              July
            </div>
          </div>
          <h2 className="mt-10 text-5xl md:text-7xl 2xl:text-[100px] font-bold xl:max-w-3xl 2xl:max-w-5xl">
            Freedom Boost <br />
            <span className="text-primary">FREE Airdrop 5 Days</span>
            <br />
            Turbo Mining Power On Us!
          </h2>
        </div>
        <Image
          src={ArtImage1}
          alt="Airdrop Art 1"
          className="w-90 md:w-140 xl:w-160 2xl:w-172 absolute top-0 left-1/2 xl:left-auto xl:right-0 transform xl:transform-none -translate-x-1/2 xl:translate-x-0 -z-10 mt-140 md:mt-180 xl:mt-0"
        />
      </div>
      <div className="mt-120 md:mt-160 xl:mt-100 flex items-center justify-center flex-col text-center px-4 md:px-20 xl:px-40">
        <p className="text-5xl font-bold mb-20">
          Remaining days before the Airdrop
        </p>
        <CountdownTimer targetDate={new Date("2025-07-14")} />
      </div>

      <div className="mt-20 flex justify-center">
        <CustomButton2
          image={PointFingerButtonImage}
          text="Join the Freedom Boost"
          link="/airdrop/register"
        />
      </div>

      {/* Part 2 */}

      <div className="flex flex-col lg:flex-row items-center gap-10 mt-80">
        <Image
          src={ArtImage1}
          alt="Airdrop Art 1"
          className="w-full md:w-160 lg:w-120 xl:w-160 2xl:w-180"
        />
        <div className="max-w-4xl flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-6">
          <h4 className="text-3xl font-bold text-primary">Offer Details</h4>
          <h3 className="text-5xl md:text-7xl xl:text-8xl font-semibold">
            5 DAYS OF TURBO MINING POWER
          </h3>
          <p className="text-3xl font-light">
            Referral mechanic: illustrated flow (“Refer 2 → Earn 1 Bonus Day”)
          </p>
        </div>
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-20">
        <h2 className="text-6xl lg:text-8xl font-semibold">How It Works</h2>
        <div className="mt-20 w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-20">
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center">
              <Image
                src={WhatYouGetImage2}
                alt="What you get 1"
                className="w-60"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-36 flex items-center justify-center">
              Sign up / log in on Indexx Wallet
            </h4>
            <p className="text-xl font-light">
              Create your account or log in to access your digital assets
              securely with Indexx Wallet
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center">
              <Image
                src={WhatYouGetImage1}
                alt="What you get 1"
                className="w-full"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-36 flex items-center justify-center">
              Activate Freedom Boost
            </h4>
            <p className="text-xl font-light">
              Unlock faster earnings and extra rewards by activating your
              Freedom Boost!
            </p>
          </div>

          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center">
              <Image src={ArtImage3} alt="What you get 1" className="w-60" />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-36 flex items-center justify-center">
              Share your referral link & mine at turbo speed
            </h4>
            <p className="text-xl font-light">
              Share your referral link to start mining at turbo speed and earn
              even faster!
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center">
              <Image
                src={WhatYouGetImage4}
                alt="What you get 1"
                className="w-64"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-36 flex items-center justify-center">
              Get 10
              <br /> Referrals to Join
            </h4>
            <p className="text-xl font-light">
              You must refer at least 10 active users to become eligible to join
              a mining plan
            </p>
          </div>
        </div>
      </div>

      <div className="mt-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      <div className="mt-80 flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-8xl font-bold">Eligibility</h2>
        <p className="mt-10 text-3xl font-light">World Wide call-out</p>
        <Image src={WorldMapImage} alt="World Map" className="w-full" />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="mt-80 flex flex-col items-center justify-center text-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold my-6">
              What Our Minners Say?
            </h2>
          </div>
          <UserReviewCards />
        </div>
      </div>

      {/* Part 3 */}
      {/* <div className="mt-80 flex flex-col lg:flex-row items-center justify-center gap-20 px-4 md:px-20 xl:px-40">
        <div className="flex items-start">
          <Image src={ArtImage3} alt="art image" className="w-120" />
        </div>
        <div>
          <h2 className="mt-6 text-5xl md:text-8xl font-semibold">
            How it works
          </h2>
          <ol className="list-decimal px-6 text-2xl font-bold">
            <li className="mt-10">
              <h5>Sign Up Instantly</h5>
              <ul className="list-disc px-6 text-lg font-light">
                <li>
                  Tap “Start My Trial” and register with your phone or email.
                </li>
              </ul>
            </li>
            <li className="mt-10">
              <h5>Activate Turbo Mode</h5>
              <ul className=" list-disc px-6 text-lg font-light">
                <li>
                  Once inside the app, hit the “Turbo Mining Gopher” badge to
                  enable 6× mining.
                </li>
              </ul>
            </li>
            <li className="mt-10">
              <h5>Track Your Earnings</h5>
              <ul className=" list-disc px-6 text-lg font-light">
                <li>
                  Watch your BTCY balance grow faster—view real-time stats on
                  the dashboard.
                </li>
              </ul>
            </li>
            <li className="mt-10">
              <h5>Extend Your Trial</h5>
              <ul className=" list-disc px-6 text-lg font-light">
                <li>
                  Share your unique referral link. Every 4 friends who join
                  gives you +2 days of turbo power.
                </li>
              </ul>
            </li>
            <li className="mt-10">
              <h5>Enjoy & Decide</h5>
              <ul className=" list-disc px-6 text-lg font-light">
                <li>
                  After your trial ends, upgrade to a paid Turbo Mining Gopher
                  subscription or revert to the free plan.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      <div className="relative mt-80 w-full lg:overflow-hidden px-4 md:px-20 xl:px-40">
        <div className="w-full lg:w-[80%]">
          <h2 className="mt-6 text-5xl md:text-8xl font-semibold">
            Referral Program Details
          </h2>
          <h4 className="mt-20 text-3xl font-bold">How to Refer: </h4>
          <p className="mt-2 text-lg">
            Copy and share your in-app link via WhatsApp, Telegram, or social
            feeds.
          </p>
          <ul className="mt-10 list-disc pl-6 text-2xl font-bold">
            <li>
              <h5>Bonus Structure:</h5>
              <ul className="mt-6 [&>li]:mt-4 list-disc pl-6 text-lg font-normal">
                <li>4 referrals → +2 free days</li>
                <li>8 referrals → +4 free days</li>
                <li>And so on—stack up unlimited bonus days!</li>
              </ul>
            </li>
          </ul>
          <h4 className="mt-20 text-3xl font-bold">Referral Dashboard:</h4>
          <p className="mt-2 text-lg">
            {" "}
            Displays progress toward your next bonus.
          </p>
        </div>
        <Image
          src={ArtImage4}
          alt="art"
          className="w-full mt-20 lg:w-160 xl:w-200 2xl:w-240 lg:absolute lg:-bottom-0 lg:-right-10"
        />
      </div>

      <div className="mt-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      <div className="mt-80 flex flex-col lg:flex-row items-center justify-center gap-20 px-4 md:px-20 xl:px-40">
        <div className="flex items-start">
          <Image src={ArtImage5} alt="art image" className="w-120" />
        </div>
        <div>
          <h4 className="text-3xl font-bold text-primary">BENEFITS OF</h4>
          <h2 className="mt-6 text-5xl md:text-7xl font-semibold">
            Turbo Mining Gopher
          </h2>
          <ul className="list-disc pl-6 text-2xl font-bold text-tertiary">
            <li className="mt-6">
              <h5>Maximized Earnings:</h5>
              <p className="text-xl font-normal">
                Six-fold mining rate exponentially boosts your daily BTCY yield.
              </p>
            </li>
            <li className="mt-6">
              <h5>Risk-Free Mining Opportunity</h5>
              <p className="text-xl font-normal">
                No payment details needed—evaluate before you upgrade.
              </p>
            </li>
            <li className="mt-6">
              <h5>Viral Growth: </h5>
              <p className="text-xl font-normal">
                Earn free bonus days simply by inviting friends.
              </p>
            </li>
            <li className="mt-6">
              <h5>Seamless Experience:</h5>
              <p className="text-xl font-normal">
                One-tap activation; withdrawals processed instantly.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div> */}

      <div className="mt-80 mb-80 px-4 md:px-20 xl:px-40">
        <Image src={ArtImage6} alt="Airdrop Art 6" className="w-80" />
        <h2 className="mt-10 text-8xl font-semibold">FAQs</h2>
        <div className="text-tertiary mt-20 max-w-5xl">
          <h5 className="mt-6 text-3xl font-bold">
            Q: Who Qualifies for Freedom Boost?
          </h5>
          <p className="mt-4 text-lg">
            A: To qualify for Freedom Boost, you need to have at least 3 active
            referrals, a minimum balance of 1,000 BTCY in your wallet, and be
            subscribed to any paid mining plan. Once these conditions are met,
            you can activate Freedom Boost to enjoy faster mining speeds and
            bonus rewards, helping you reach your goals even quicker.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: How is turbo power applied?
          </h5>
          <p className="mt-4 text-lg">
            A: Turbo Power kicks in automatically when you activate Freedom
            Boost and meet the requirements. It boosts your mining speed based
            on your plan, referrals, and wallet balance — helping you earn BTCY
            faster for as long as you stay qualified.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: When do bonus days arrive?
          </h5>
          <p className="mt-4 text-lg">
            A: Bonus Days are announced periodically and usually arrive during
            special events, community milestones, or promotional campaigns.
            You’ll be notified in advance through the app or email, so keep an
            eye out to make the most of your boosted rewards during those
            limited-time periods.
          </p>
        </div>
      </div>
    </div>
  );
}
