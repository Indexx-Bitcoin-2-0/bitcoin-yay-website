import Image from "next/image";
import Link from "next/link";
// import CountdownTimer from "@/components/CounterComponent";
import CustomButton2 from "@/components/CustomButton2";

import ArtImage1 from "@/assets/images/btcy-airdrop/btcyairdrop.png"
import ArtImage4 from "@/assets/images/wibs-airdrop/art-4.webp";


import CalendarArt from "@/assets/images/wibs-airdrop/calander-art.webp";


import howItWorksImage1 from "@/assets/images/airdrop/how_it_works_1.svg";
import howItWorksImage2 from "@/assets/images/airdrop/how_it_works_2.svg";
import howItWorksImage3 from "@/assets/images/airdrop/how_it_works_3.svg";
import howItWorksImage4 from "@/assets/images/airdrop/how_it_works_4.svg";


import socialMediaAirdropArt from "@/assets/images/airdrop/social_media_airdrop_art.png";
// import WorldMapImage from "@/assets/images/airdrop/political-map-world.webp";

import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
import DownloadLogo from "@/assets/images/download-button.svg";
import ThumbsUpImage from "@/assets/images/buttons/thumbs-up-button.webp";

import WalletImage from "@/assets/images/buttons/price-tag-button.webp"; // Using price-tag as a wallet placeholder if dedicated wallet doesn't exist, wait, I saw cart-button and price-tag-button. The image shows a wallet. Let me check buttons again.

import UserReviewCards from "@/components/UserReviewCards";
import PrizeBreakdown from "@/components/PrizeBreakdown";

export const metadata = {
  title: "BTCY Social Media Airdrop",
  description:
    "Create a post about Bitcoin Yay, tag us, and submit your link for a chance to win USDT rewards.",
  openGraph: {
    title: "BTCY Social Media Airdrop",
    description:
      "Create a post about Bitcoin Yay, tag us, and submit your link for a chance to win USDT rewards.",
  },
};

export default function Airdrop() {
  return (
    <div className="mx-auto mt-40 max-w-[1800px]">
      <div className="relative flex flex-col lg:flex-row">
        <div className="mt-10 w-full lg:w-[90%] flex flex-col justify-items-center px-4 md:pl-20 xl:pl-30">
          <h2 className="text-[40px] md:text-8xl">
            BTCY Social Media
            <br />
            Airdrop
          </h2>

          <p className="mt-10 text-2xl md:text-4xl text-white font-medium">
            Create a post about Bitcoin Yay, tag us, and submit your link for a chance to win USDT rewards.
          </p>
          <p className="mt-4 text-2xl text-primary font-semibold">
            The posts with the highest engagement will win.
          </p>
          <p className="mt-4 text-2xl text-white">
            Help spread the word about Bitcoin Yay and get rewarded.
          </p>

          <div className="font-bold mt-10 flex flex-col justify-center md:justify-start items-center md:items-start text-center">
            <CustomButton2
              image={RegisterButtonImage}
              text="Join Airdrop Now"
              link="/airdrop/register"
              imageStyling="w-30"
            />
          </div>
        </div>
        <div className="relative mx-auto lg:mx-0">
          <Image
            src={socialMediaAirdropArt}
            alt="Airdrop Art 1"
            className="w-90 md:w-140 lg:w-180 xl:w-240 mt-10"
          />
        </div>

        {/* <Image
          src={ArtImage1}
          alt="Airdrop Art 1"
          className="w-90 md:w-140 xl:w-120 2xl:w-172 absolute top-0 left-1/2 xl:left-auto xl:right-0 transform xl:transform-none -translate-x-1/2 xl:translate-x-0 -z-10 mt-160 md:mt-180 xl:mt-26"
        /> */}
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

      {/* <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-140 md:mt-180">
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
      </div> */}

      <div className="mt-80 px-4 md:px-20 xl:px-20">
        <h2 className="text-6xl lg:text-8xl  text-center ">How It Works</h2>
        <div className="mt-20 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center items-center">
              <Image
                src={howItWorksImage1}
                alt="Create a Post"
                className="w-50"
              />
            </div>
            <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
              Create a Post
            </h4>
            <p className="text-xl font-light">
              Create a social media post about Bitcoin Yay. Your post can be a video, meme, screenshot, or text.
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className="h-70 flex justify-center items-center">
              <Image
                src={howItWorksImage2}
                alt="Tag Bitcoin Yay"
                className="w-50"
              />
            </div>
            <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
              Tag Bitcoin Yay
            </h4>
            <p className="text-xl font-light">
              Make sure your post tags the official Bitcoin Yay account so we can track it.
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center items-center">
              <Image
                src={howItWorksImage3}
                alt="Submit Your Link"
                className="w-50"
              />
            </div>
            <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
              Submit Your Link
            </h4>
            <p className="text-xl font-light">
              Register on the airdrop page and submit the link to your post.
            </p>
          </div>
          <div className="max-w-100 text-center mx-auto">
            <div className=" h-70 flex justify-center items-center">
              <Image
                src={howItWorksImage4}
                alt="Earn Engagement"
                className="w-50"
              />
            </div>
            <h4 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">
              Earn Engagement
            </h4>
            <p className="text-xl font-light">
              The posts with the highest engagement (likes, comments, shares, views) will win rewards.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Join Airdrop Now"
          link="/airdrop/register"
        />
      </div>

      {/* Add new section here  */}
      <PrizeBreakdown />
      <div className="mt-80 ">
        <Image src={CalendarArt} alt="Calendar Art" className="mx-auto w-30" />
        <h2 className="mt-10 text-[40px] md:text-7xl xl:text-[100px] text-center font-bold">
          Key Dates
        </h2>
        <div className="flex flex-wrap w-full justify-center items-start gap-20 mt-10 md:mt-30 px-4 md:px-10 xl:px-20">
          <div className="w-90 flex flex-col ">
            <h3 className="text-[40px] md:text-4xl font-bold text-center md:text-left">March 16 , 2026</h3>
            <p className="mt-2 md:mt-10 text-xl md:text-3xl text-center md:text-left">
              Campaign Start
            </p>
          </div>
          <div className="w-90 flex flex-col ">
            <h3 className="text-[40px] md:text-4xl font-bold text-center md:text-left">Until March 30, 2026</h3>
            <p className="mt-2 md:mt-10 text-xl md:text-3xl text-center md:text-left">
              End of campaign period
            </p>
          </div>{" "}
          <div className="w-90 flex flex-col ">
            <h3 className="text-[40px] md:text-4xl font-bold text-center md:text-left">March 31, 2026</h3>
            <p className="mt-2 md:mt-10 text-xl md:text-3xl text-center md:text-left">
              Winners announced
            </p>
          </div>
        </div>
      </div>

      <div className="flex  items-center justify-center gap-10 mt-60 px-4 md:px-10 xl:px-20">
        <div className="max-w-4xl flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-6">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold">
            Eligibility & Rules
          </h2>
          <ul className="mt-10 list-disc pl-6 text-xl md:text-3xl flex flex-col gap-6 md:gap-10 mx-auto md:mx-0">
            <li>Only one entry per participant</li>
            <li>Posts must tag Bitcoin Yay</li>
            <li>Posts must remain public</li>
            <li>Fake engagement (bots / purchased likes) will disqualify entries</li>
            <li>Content must follow platform guidelines</li>
          </ul>
          <div className="mx-auto md:mx-0 mt-10 flex justify-center md:justify-start items-center md:items-start gap-10 md:gap-20">
            <CustomButton2
              image={DownloadLogo}
              text="Download on App Store"
              link="/#apple-store-download"
              imageStyling="w-40"
            />
            <CustomButton2
              image={DownloadLogo}
              text="Get it on Google Play"
              link="/#google-play-download"
              imageStyling="w-40"
            />
          </div>
        </div>

      </div>

      {/* <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mt-60 px-4 md:px-10 xl:px-20">
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
      </div> */}

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
          <h5 className="mt-6 text-3xl font-bold text-white">Q: What is the BTCY Social Media Airdrop?</h5>
          <p className="mt-4 text-xl">
            A: A campaign where users create posts about Bitcoin Yay and compete for rewards based on engagement.
          </p>

          <h5 className="mt-6 text-3xl font-bold text-white">
            Q: What kind of posts can I create?
          </h5>
          <p className="mt-4 text-xl">
            A: Videos, memes, screenshots, text posts, threads, or educational content.
          </p>

          <h5 className="mt-6 text-3xl font-bold text-white">Q: Do I need to tag Bitcoin Yay?</h5>
          <p className="mt-4 text-xl">
            A: Yes. Your post must tag our official account.
          </p>
        </div>
      </div>
    </div>
  );
}
