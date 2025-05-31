import Image from "next/image";

import CountdownTimer from "@/components/CounterComponent";
import CustomButton2 from "@/components/CustomButton2";

import ArtImage1 from "@/assets/images/airdrop/art-1.webp";
import ArtImage2 from "@/assets/images/airdrop/art-2.webp";
import ArtImage3 from "@/assets/images/airdrop/art-3.webp";
import ArtImage4 from "@/assets/images/airdrop/art-4.webp";
import ArtImage5 from "@/assets/images/airdrop/art-5.webp";
import ArtImage6 from "@/assets/images/airdrop/art-6.webp";

import WhatYouGetImage1 from "@/assets/images/airdrop/what-you-get-1.webp";
import WhatYouGetImage2 from "@/assets/images/airdrop/what-you-get-2.webp";
import WhatYouGetImage3 from "@/assets/images/airdrop/what-you-get-3.webp";

import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
import PowerButtonImage from "@/assets/images/buttons/power-button.webp";
import PointFingerButtonImage from "@/assets/images/buttons/point-button.webp";

import UserReviewCards from "@/components/UserReviewCards";

export default function Airdrop() {
  return (
    <div className="mx-auto mt-40">
      <div className="relative">
        <div className="w-full lg:w-[80%] flex items-start justify-center">
          <div className="px-4 md:px-20 xl:px-40 lg:items-start lg:justify-start">
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
          </div>
        </div>
        <Image
          src={ArtImage1}
          alt="Airdrop Art 1"
          className="w-90 md:w-140 2xl:w-220 absolute top-0 left-1/2 xl:left-auto xl:right-0 transform xl:transform-none -translate-x-1/2 xl:translate-x-0 -z-10 mt-190 xl:mt-0"
        />
      </div>
      <div className="mt-120 md:mt-140 xl:mt-100 flex items-center justify-center flex-col text-center px-4 md:px-20 xl:px-40">
        <p className="text-5xl font-bold mb-20">
          Remaining days before the Airdrop
        </p>
        <CountdownTimer targetDate={new Date("2025-06-15")} />
      </div>

      <div className="mt-40 md:mt-160 lg:mt-60 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      {/* Part 2 */}

      <div className="flex flex-col lg:flex-row gap-10 mt-80">
        <Image
          src={ArtImage2}
          alt="Airdrop Art 2"
          className="w-full md:w-160 lg:w-120 xl:w-200"
        />
        <div className="flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-0">
          <h4 className="text-3xl font-bold text-primary">WHAT IS</h4>
          <h3 className="text-5xl md:text-7xl font-semibold">
            Turbo Mining Gopher
          </h3>
          <p className="text-3xl font-light max-w-164">
            It&apos;s a Super-Speed Mining Gopher capability — 6× the mining
            speed of BTCY, generating up to 18 BTCY per hour.
          </p>
        </div>
      </div>

      <div className="my-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      <div className="mt-40 px-4 md:px-20 xl:px-40">
        <h2 className="text-6xl lg:text-8xl font-semibold">What you get</h2>
        <div className="mt-20 w-full flex flex-col lg:flex-row justify-between items-center gap-20">
          <div className="max-w-100">
            <div className=" h-70 flex justify-center">
              <Image
                src={WhatYouGetImage1}
                alt="What you get 1"
                className="w-full"
              />
            </div>
            <h4 className="mt-6 text-[40px] font-semibold">6× Mining Power</h4>
            <p className="text-xl font-light">
              Mine six times faster than standard users.
            </p>
          </div>
          <div className="max-w-100">
            <div className=" h-70 flex justify-center">
              <Image
                src={WhatYouGetImage2}
                alt="What you get 1"
                className="w-60"
              />
            </div>
            <h4 className="mt-6 text-[40px] font-semibold">5-Day Trial</h4>
            <p className="text-xl font-light">
              Mine six times faster than standard users.
            </p>
          </div>
          <div className="max-w-100">
            <div className=" h-70 flex justify-center">
              <Image
                src={WhatYouGetImage3}
                alt="What you get 1"
                className="w-60"
              />
            </div>
            <h4 className="mt-6 text-[40px] font-semibold">Bonus Days</h4>
            <p className="text-xl font-light">
              Earn 2 extra days for every 4 referrals.
            </p>
          </div>
        </div>
      </div>

      <div className="my-80 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      {/* Part 3 */}
      <div className="mt-80 flex flex-col lg:flex-row items-center justify-center gap-20 px-4 md:px-20 xl:px-40">
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
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-40">
        <Image src={ArtImage6} alt="Airdrop Art 6" className="w-80" />
        <h2 className="mt-10 text-8xl font-semibold">FAQs</h2>
        <div className="text-tertiary">
          <h5 className="mt-6 text-3xl font-bold">
            Q: Will I be charged after the 5-day trial?
          </h5>
          <p className="mt-4 text-lg">
            A: No—your trial expires automatically. To continue at Turbo speeds,
            choose a monthly or yearly plan in Settings.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: How do I see my referral count?
          </h5>
          <p className="mt-4 text-lg">
            A: Open the Referral tab in the app menu to view your active invites
            and earned bonus days.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: Can I stack multiple free mining opportunity?
          </h5>
          <p className="mt-4 text-lg">
            A: Only one initial free mining opportunity is granted per account,
            but bonus days from referrals will extend your turbo period.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: What happens when my turbo days run out?
          </h5>
          <p className="mt-4 text-lg">
            A: Your mining rate returns to the standard level (1×), but your
            accumulated BTCY remains in your wallet.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-80 px-4 md:px-20 xl:px-40">
        <h2 className="text-6xl md:text-7xl lg:text-[110px] font-semibold text-center max-w-320">
          Ready to Turbo-Charge Your Earnings?
        </h2>
      </div>

      <div className="mt-40 flex justify-center">
        <CustomButton2
          image={PowerButtonImage}
          text="Activate 5-Day Free Mining Oppurtunity"
          link="/airdrop/register"
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="mt-80 md:mt-100 flex flex-col items-center justify-center text-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold my-6">
              What Our Minners Say?
            </h2>
          </div>
          <UserReviewCards />
        </div>
      </div>
    </div>
  );
}
