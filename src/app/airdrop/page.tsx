import Image from "next/image";

// import CountdownTimer from "@/components/CounterComponent";
import CustomButton2 from "@/components/CustomButton2";

import ArtImage1 from "@/assets/images/lotto-airdrop/art-1.webp";
import LottoLogo from "@/assets/images/lotto-airdrop/lotto-logo.webp";
import ArtImage2 from "@/assets/images/lotto-airdrop/art-2.webp";
import ArtImage3 from "@/assets/images/lotto-airdrop/art-3.webp";
import ArtImage4 from "@/assets/images/lotto-airdrop/art-4.webp";
// import ArtImage5 from "@/assets/images/airdrop/art-5.webp";
// import ArtImage6 from "@/assets/images/airdrop/art-6.webp";

import WhatYouGetImage1 from "@/assets/images/lotto-airdrop/what-you-get-1.webp";
import WhatYouGetImage2 from "@/assets/images/lotto-airdrop/what-you-get-2.webp";
import WhatYouGetImage3 from "@/assets/images/lotto-airdrop/what-you-get-3.webp";
import WhatYouGetImage4 from "@/assets/images/lotto-airdrop/what-you-get-4.webp";
// import WorldMapImage from "@/assets/images/airdrop/political-map-world.webp";

import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
// import PowerButtonImage from "@/assets/images/buttons/power-button.webp";
// import PointFingerButtonImage from "@/assets/images/buttons/point-button.webp";

import UserReviewCards from "@/components/UserReviewCards";

export const metadata = {
  title: "Bitcoin Yay Airdrop - 4th July Freedom Boost FREE Mining",
  description:
    "Join the Bitcoin Yay Freedom Boost Airdrop! Get 5 days of FREE turbo mining power on July 4th. Register now for the worldwide airdrop and start earning BTCY tokens instantly.",
  openGraph: {
    title: "Bitcoin Yay Airdrop - 4th July Freedom Boost FREE Mining",
    description:
      "Join the Bitcoin Yay Freedom Boost Airdrop! Get 5 days of FREE turbo mining power on July 4th. Register now for the worldwide airdrop and start earning BTCY tokens instantly.",
  },
};

export default function Airdrop() {
  return (
    <div className="mx-auto mt-40 max-w-[1800px]">
      <div className="relative">
        <div className="mt-10 w-full lg:w-[90%] flex flex-col justify-items-center px-4 md:px-20 xl:pl-30">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold">
            Join the Bitcoin Yay
            <br />
            <span className="text-primary">Lotto Airdrop</span>!
          </h2>

          <p className="mt-10 text-xl lg:text-2xl max-w-220 text-bg3">
            Get your free ticket + bonus entries for referrals
          </p>
          <p className="mt-10 text-2xl md:text-3xl font-semibold">
            Registration opens{" "}
            <span className="text-primary">
              {" "}
              21 July – Rewards drop 1 August.
            </span>
            <br /> Good luck, miners!
          </p>

          <div className="font-bold mt-10 flex flex-col justify-center items-center md:items-start">
            <CustomButton2
              image={RegisterButtonImage}
              text="Register Now!"
              link="/airdrop/register"
              imageStyling="w-30"
            />
          </div>
        </div>

        <Image
          src={ArtImage1}
          alt="Airdrop Art 1"
          className="w-90 md:w-140 xl:w-120 2xl:w-172 absolute top-0 left-1/2 xl:left-auto xl:right-0 transform xl:transform-none -translate-x-1/2 xl:translate-x-0 -z-10 mt-160 md:mt-180 xl:mt-26"
        />
      </div>
      {/* <div className="mt-120 md:mt-160 xl:mt-100 flex items-center justify-center flex-col text-center px-4 md:px-20 xl:px-40">
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
      </div> */}

      {/* Part 2 */}

      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-140 md:mt-180">
        <div className="mt-10 flex-1 flex items-center justify-center">
          <Image
            src={LottoLogo}
            alt="Airdrop Art 1"
            className="w-80 md:w-140"
          />
        </div>
        <div className="max-w-4xl flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-6">
          <p className="text-xl md:text-3xl font-bold text-primary">
            Offer Details
          </p>
          <h3 className="text-[40px] md:text-7xl font-bold">
            <span className="text-primary">1 FREE lotto ticket</span> and If
            you’ve{" "}
            <span className="text-primary">Referred 10 Friends or more</span>,
            we’ll top you up with
            <span className="text-primary"> 4 extra tickets!</span>
          </h3>
          <p className="text-xl md:text-3xl font-light">
            Sign up now to claim{" "}
            <span className="font-semibold">1 FREE lotto ticket </span>and if
            you’ve referred 10 friends or more, we’ll top you up with{" "}
            <span className="font-semibold">4 extra tickets!</span> Enter for
            your chance to win massive BTCY prizes in our first-ever lotto draw.
          </p>
          <div className="mt-10">
            <CustomButton2
              image={RegisterButtonImage}
              text="Register Now!"
              link="/airdrop/register"
              imageStyling="w-30"
            />
          </div>
        </div>
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-20">
        <h2 className="text-6xl lg:text-8xl font-semibold">How It Works</h2>
        <div className="mt-20 w-full mx-auto grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-20">
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center items-center">
              <Image
                src={WhatYouGetImage1}
                alt="What you get 1"
                className="w-60"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-24 flex items-center justify-center">
              Registration
            </h4>
            <p className="text-xl font-light">
              Open to all Bitcoin Yay users. Sign up starting July 21.
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className="h-70 flex justify-center items-center">
              <Image
                src={WhatYouGetImage2}
                alt="What you get 1"
                className="w-64"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-24 flex items-center justify-center">
              Free Ticket
            </h4>
            <p className="text-xl font-light">
              Every registrant receives 1 free lotto ticket on August 1
            </p>
          </div>

          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center items-center">
              <Image
                src={WhatYouGetImage3}
                alt="What you get 1"
                className="w-64"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-24 flex items-center justify-center">
              Bonus Tickets
            </h4>
            <p className="text-xl font-light">
              Earn 4 extra tickets if you have 10 referrals or more by August 1
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center items-center">
              <Image
                src={WhatYouGetImage4}
                alt="What you get 1"
                className="w-64"
              />
            </div>
            <h4 className="mt-6 text-4xl font-semibold h-24 flex items-center justify-center">
              Draw Date
            </h4>
            <p className="text-xl font-light">
              Winners announced after the draw on August 1
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

      {/* <div className="mt-80 flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-8xl font-bold">Eligibility</h2>
        <p className="mt-10 text-3xl font-light">World Wide call-out</p>
        <Image src={WorldMapImage} alt="World Map" className="w-full" />
      </div> */}

      <div className="mt-60 ">
        <h2 className="text-[40px] md:text-7xl xl:text-[100px] text-center font-bold">
          Key Dates
        </h2>
        <div className="flex flex-wrap w-full justify-center items-start gap-20 mt-10 md:mt-20 px-4 md:px-10 xl:px-20">
          <div className="w-110 flex flex-col ">
            <h3 className="text-[40px] md:text-6xl font-bold">July 21</h3>
            <p className="mt-2 md:mt-10 text-xl md:text-3xl">
              Registration opens
            </p>
          </div>
          <div className="w-110 flex flex-col ">
            <h3 className="text-[40px] md:text-6xl font-bold">
              July 21 – Aug 1
            </h3>
            <p className="mt-2 md:mt-10 text-xl md:text-3xl">
              Referral period (10-referral target)
            </p>
          </div>{" "}
          <div className="w-110 flex flex-col ">
            <h3 className="text-[40px] md:text-6xl font-bold">August 1</h3>
            <p className="mt-2 md:mt-10 text-xl md:text-3xl">
              Tickets distributed & draw takes place
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 mt-60 px-4 md:px-10 xl:px-20">
        <div className="max-w-4xl flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-6">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold">
            Eligibility & Rules
          </h2>
          <ul className="mt-10 list-disc pl-6 text-xl md:text-3xl flex flex-col gap-6 md:gap-10">
            <li>Must have a valid Bitcoin Yay account.</li>
            <li>One sign-up per user.</li>
            <li>Bonus tickets capped at 4 (for 10+ referrals).</li>
            <li>Open worldwide.</li>
          </ul>
        </div>
        <div className="mt-10 flex-1 flex items-center justify-center">
          <Image
            src={ArtImage2}
            alt="Airdrop Art 1"
            className="w-80 md:w-140"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-60 px-4 md:px-10 xl:px-20">
        <div className="mt-10 flex-1 flex items-center justify-center">
          <Image
            src={ArtImage3}
            alt="Airdrop Art 1"
            className="w-80 md:w-140"
          />
        </div>
        <div className="max-w-4xl flex flex-col items-start justify-center gap-4 mt-20 flex-1 px-4 md:px-20 xl:px-6">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold">
            Track Your Referrals
          </h2>
          <ul className="mt-10 list-disc pl-6 text-xl md:text-3xl flex flex-col gap-6 md:gap-10">
            <li>Referral link and copy button</li>
            <li>Friends joined count</li>
            <li>Tickets earned (free + bonus)</li>
          </ul>
          <div className="mt-20 w-full flex justify-center lg:justify-start">
            <CustomButton2
              image={RegisterButtonImage}
              text="Register for the FREE Airdrop Now!"
              link="/airdrop/register"
              imageStyling="w-30"
            />
          </div>
        </div>
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
        <Image src={ArtImage4} alt="Airdrop Art 6" className="w-80" />
        <h2 className="mt-10 text-[40px] md:text-[100px] font-semibold">
          FAQs
        </h2>
        <div className="text-tertiary mt-20 max-w-5xl">
          <h5 className="mt-6 text-3xl font-bold">Q: How do I register?</h5>
          <p className="mt-4 text-lg">
            A: Tap the Register Now button at the top of this page, log in or
            sign up for a Bitcoin Yay account, and you’re in!
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: When will I receive my tickets?
          </h5>
          <p className="mt-4 text-lg">
            A: All participants receive their tickets on{" "}
            <span className="font-bold">August 1, 2025</span>. Your free ticket
            and any earned bonus tickets will appear automatically in your app.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: How are referrals tracked?
          </h5>
          <p className="mt-4 text-lg">
            A: Each user has a unique referral link in their dashboard. When a
            friend registers using that link and completes sign-up, our system
            credits it to your count—no extra steps needed.
          </p>

          <h5 className="mt-6 text-3xl font-bold">
            Q: Can I earn more than 4 bonus tickets?
          </h5>
          <p className="mt-4 text-lg">
            A: Bonus tickets are capped at <span className="font-bold">4</span>.
            Once you hit <span className="font-bold">10 referrals</span>, you’ll
            receive the full set of 4 bonus tickets; additional referrals do not
            increase this bonus.
          </p>
        </div>
      </div>
    </div>
  );
}
