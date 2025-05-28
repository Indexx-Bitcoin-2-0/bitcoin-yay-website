import Image from "next/image";

import CountdownTimer from "@/components/CounterComponent";
import CustomButton2 from "@/components/CustomButton2";

import ArtImage1 from "@/assets/images/airdrop/art-1.webp";
import ArtImage2 from "@/assets/images/airdrop/art-2.webp";
import ArtImage3 from "@/assets/images/airdrop/art-3.webp";
import ArtImage4 from "@/assets/images/airdrop/art-4.webp";
import ArtImage5 from "@/assets/images/airdrop/art-5.webp";

import BgArt1 from "@/assets/images/airdrop/bg-art/bg-art1.webp";
import BgArt2 from "@/assets/images/airdrop/bg-art/bg-art2.webp";

import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";

export default function Airdrop() {
  return (
    <div className="mx-auto mt-40">
      <div className="relative">
        <div className="w-full lg:w-[66%] flex items-start justify-center">
          <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
            <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-bold text-start">
              FREE AIRDROP
            </h1>
            <h2 className="text-4xl lg:text-[68px] font-bold">
              5 Days Turbo Mining Gopher
            </h2>
            <p className="text-5xl lg:text-8xl font-bold">+ </p>
            <h3 className="text-4xl lg:text-8xl font-bold">2 Days</h3>
            <h3 className="text-3xl lg:text-5xl font-bold mt-6">
              Extended Turbo Mining Gopher
            </h3>
            <p className="text-sm text-primary mt-10">
              Remaining days before the airdrop
            </p>
            <CountdownTimer targetDate={new Date("2025-06-15")} />
          </div>
        </div>
        <Image
          src={ArtImage1}
          alt="Airdrop Art 1"
          className="w-90 md:w-140 2xl:w-240 absolute top-0 left-1/2 lg:left-auto lg:right-0 transform lg:transform-none -translate-x-1/2 lg:translate-x-0 -z-10 mt-160 lg:mt-0"
        />
        <div className="mt-130 md:mt-160 lg:mt-60 flex justify-center">
          <CustomButton2
            image={RegisterButtonImage}
            text="Register for the FREE Airdrop Now!"
            link="/airdrop/register"
          />
        </div>
      </div>

      {/* Part 2 */}

      <div className="flex flex-col lg:flex-row gap-10 mt-80">
        <Image
          src={ArtImage2}
          alt="Airdrop Art 2"
          className="w-full lg:w-1/2"
        />
        <div className="flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-0">
          <h4 className="text-3xl font-bold text-primary">WHAT IS</h4>
          <h3 className="text-5xl md:text-7xl font-semibold">
            Turbo Mining Power
          </h3>
          <p className="text-3xl font-light max-w-164">
            It’s a Super-Speed Mining Power capability — 6× the mining speed of
            BTCY, generating up to 18 BTCY per hour.
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

      <div className="mt-80 flex flex-col justify-center text-center relative">
        <div className="absolute w-[98vw] h-full -z-10">
          <Image src={BgArt1} alt="" className="absolute w-80 top-0 right-0" />
          <Image
            src={BgArt2}
            alt=""
            className="absolute w-80 -bottom-40 md:-bottom-20 left-0"
          />
        </div>
        <div>
          <h4 className="text-2xl md:text-3xl font-bold text-primary">
            TURBO MINING POWER{" "}
          </h4>
          <h2 className="mt-6 text-4xl md:text-8xl font-semibold">
            Earnings in 5 Days
          </h2>
          <p className="text-xl mt-4 md:mt-16">
            Normal Mining vs. Turbo Mining Power
          </p>
        </div>
        <div className="px-4 flex justify-center">
          <div className="my-10 overflow-x-auto max-w-screen mx-auto">
            <table className="max-w-300 min-w-200 bg-transparent border-2 border-bg2 text-sm lg:text-xl lg:table-fixed">
              <thead>
                <tr className="border-b border-2 border-bg2 [&>th]:border-2 [&>th]:border-bg2 [&>th]:py-10 [&>th]:px-4 [&>th]:text-center [&>th]:min-w-32 [&>th]:whitespace-nowrap [&>th]:lg:w-1/6">
                  <th>Mining Power</th>
                  <th>Mining Speed</th>
                  <th>Mining Rate (per hour)</th>
                  <th>Total BTCY (per day)</th>
                  <th>Total BTCY (in 5 days)</th>
                  <th>Earnings in 5 Days (in USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-10 [&>td]:px-4 [&>td]:text-center [&>td]:min-w-32 [&>td]:lg:w-1/6">
                  <td className="font-normal">Normal Mining</td>
                  <td>1x</td>
                  <td>3 BTCY</td>
                  <td>72</td>
                  <td>360</td>
                  <td>$36</td>
                </tr>
                <tr className="border-b border-2 border-bg2 text-2xl lg:text-3xl font-bold text-orange-400 [&>td]:border-2 [&>td]:border-bg2 xl:[&>td]:py-10 [&>td]:px-2 md:[&>td]:py-4 [&>td]:text-center [&>td]:min-w-32 [&>td]:lg:w-1/8">
                  <td className="text-white">Turbo Mining Power</td>
                  <td className="text-white">6x</td>
                  <td className="text-white">18 BTCY</td>
                  <td className="text-white">432</td>
                  <td className="text-orange-400 text-3xl lg:text-5xl">2160</td>
                  <td className="text-orange-400 text-3xl lg:text-5xl">$216</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <p className="text-primary text-xl max-w-260">
            <span className="font-bold">Note: </span>Start mining in the app
            once it becomes available on the App Store and Google Play Store on
            June 15, 2025. Keep mining for 5 straight days to ensure you don’t
            forfeit your daily earnings.
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

      {/* Part 3 */}
      <div className="mt-80 flex flex-col lg:flex-row items-center justify-center gap-20 px-4 md:px-20 xl:px-40">
        <Image
          src={ArtImage3}
          alt="art image"
          className="w-90 md:w-140 lg:w-90 2xl:w-150"
        />
        <div>
          <h4 className="text-2xl md:text-3xl font-bold text-primary">
            HOW TO MINE WITH
          </h4>
          <h2 className="mt-6 text-4xl md:text-8xl font-semibold">
            Turbo Mining Power
          </h2>
          <ul className="list-decimal list-inside text-xl font-light mt-10">
            <li>
              User must already be registered on{" "}
              <a className="hover:underline hover:underline-offset-4 cursor-pointer hover:text-primary">
                indexx.ai
              </a>{" "}
              to proceed with the airdrop registration.
            </li>
            <li>
              Make sure you read and understand the terms and condition of the
              airdrop.
            </li>
            <li>
              Click the{" "}
              <span className="font-bold">
                “Register for FREE Airdrop Now!”
              </span>{" "}
              button.
            </li>
            <li>Fill out the registration form.</li>
            <li>Agree to the terms and conditions.</li>
            <li>
              Click <span className="font-bold">Submit.</span>
            </li>
            <li>
              Download the Mining App and log in using the email you registered
              with for the airdrop.
            </li>
            <li>
              Enjoy mining BTCY with{" "}
              <span className="font-bold">Turbo Mining Power</span> for{" "}
              <span className="font-bold">5 days!</span>
            </li>
          </ul>
          <p className="text-primary text-xl max-w-220 mt-10">
            <span className="font-bold">Note: </span>On the airdrop date, June
            15, 2025, download the BTCY Mining App from the Apple App Store or
            Google Play Store.
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

      {/* Part 4 */}
      <div className="mt-80 flex flex-col items-center justify-center px-4 md:px-20 xl:px-40">
        <div className="flex flex-col items-center text-center">
          <h4 className="text-2xl md:text-3xl font-bold text-primary">
            REFER TO EXTEND TO
          </h4>
          <h2 className="mt-6 text-4xl md:text-5xl xl:text-8xl font-semibold md:leading-16 xl:leading-26">
            2 or More days of
            <br /> Free Turbo Mining Power
          </h2>
          <p className="mt-10 text-3xl font-light max-w-200">
            Refer more people and get a chance to extend your Turbo Mining Power
            by an extra day or more!
          </p>
        </div>
        <Image
          src={ArtImage4}
          alt="art"
          className="mt-20 w-full md:w-140 lg:w-200 xl:w-260"
        />
        <div className="w-full md:w-180">
          <div className="mt-20">
            <h4 className="text-2xl font-bold text-primary">How it works:</h4>
            <ul className="text-xl font-light list-decimal list-inside flex flex-col gap-2">
              <li>Sign up for the Free Turbo Mining Power Airdrop.</li>
              <li>Copy your unique referral code.</li>{" "}
              <li>
                Share it with your family and friends on WhatsApp, Telegram,
                Instagram, and other platforms.
              </li>
              <li>
                All successful referral sign-ups will be counted and
                accumulated.
              </li>
            </ul>
          </div>
          <div className="mt-20">
            <h4 className="text-2xl font-bold text-primary">
              Refer to Extend Turbo Mining Power Table
            </h4>

            <table className="w-full mt-10 bg-transparent border-2 border-bg2 lg:text-xl lg:table-fixed">
              <thead>
                <tr className="border-b border-2 border-bg2 [&>th]:border-2 [&>th]:border-bg2 [&>th]:py-2 [&>th]:px-2 [&>th]:text-center [&>th]:min-w-32 [&>th]:whitespace-nowrap">
                  <th>Number of Referrals</th>
                  <th>Turbo Mining Power </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32">
                  <td>3</td>
                  <td>Extended to 2 Days</td>
                </tr>
                <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32">
                  <td>6</td>
                  <td>Extended to 3 Days</td>
                </tr>{" "}
                <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32">
                  <td>9</td>
                  <td>Extended to 4 Days</td>
                </tr>{" "}
                <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32">
                  <td>12</td>
                  <td>Extended to 5 Days</td>
                </tr>{" "}
                <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32">
                  <td>15</td>
                  <td>Extended to 6 Days</td>
                </tr>
              </tbody>
            </table>

            <p className="text-primary text-xl max-w-220 mt-10">
              <span className="font-bold">Note: </span>The list continues using
              a 3:1 ratio.
            </p>
          </div>
        </div>
      </div>

      <div className="my-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      {/* Part 05 */}
      <div className="mt-80 px-4 md:px-20 xl:px-40">
        <div className="flex flex-col items-center text-center">
          <h4 className="text-2xl md:text-3xl font-bold text-primary">
            BITCOIN YAY
          </h4>
          <h2 className="mt-6 text-4xl md:text-5xl xl:text-8xl font-semibold md:leading-16 xl:leading-26">
            Mining Comparison Chart
          </h2>
          <p className="mt-10 text-3xl font-light max-w-200">
            Bitcoin Yay offers mining plans from free to powerful upgrades.
            Choose your plan and start mining!
          </p>
        </div>

        <div className="my-10 overflow-x-auto max-w-screen">
          <table className="min-w-200 bg-transparent border-2 border-bg2 text-sm lg:text-xl lg:table-fixed">
            <thead>
              <tr className="border-b border-2 border-bg2 [&>th]:border-2 [&>th]:border-bg2 [&>th]:py-4 [&>th]:px-2 [&>th]:text-center [&>th]:min-w-32 [&>th]:whitespace-nowrap [&>th]:lg:w-1/6">
                <th>Mining Power</th>
                <th>Mining Speed</th>
                <th>Cost ($/month)</th>
                <th>Mining Rate (per hour)</th>
                <th>Total BTCY (per day)</th>
                <th>Total BTCY (per month)</th>
                <th>Earnings per Month (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-6 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32 [&>td]:lg:w-1/6">
                <td className="font-normal">Snatch Gopher (Free)</td>
                <td>1x</td>
                <td>$0 (ads/tasks)</td>
                <td>~3 BTCY</td>
                <td>72 BTCY</td>
                <td>2,160 BTCY</td>
                <td>$216.00</td>
              </tr>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-6 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32 [&>td]:lg:w-1/6">
                <td className="font-normal">Electric Mining Power</td>
                <td>300x</td>
                <td>$100.00</td>
                <td>~9 BTCY</td>
                <td>216 BTCY</td>
                <td>6,400 BTCY</td>
                <td>$648.00</td>
              </tr>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-6 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32 [&>td]:lg:w-1/6">
                <td>Turbo Mining Power</td>
                <td>600x</td>
                <td>$300.00</td>
                <td>~18 BTCY</td>
                <td>432 BTCY</td>
                <td>12,960 BTCY</td>
                <td>$1,296.00</td>
              </tr>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-6 [&>td]:px-2 [&>td]:text-center [&>td]:min-w-32 [&>td]:lg:w-1/6">
                <td className="font-normal">Nuclear Mining Power</td>
                <td>900x</td>
                <td>$600.00</td>
                <td>~27 BTCY</td>
                <td>648 BTCY</td>
                <td>19,440 BTCY</td>
                <td>$1,944.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-40 flex justify-center">
        <CustomButton2
          image={RegisterButtonImage}
          text="Register for the FREE Airdrop Now!"
          link="/airdrop/register"
        />
      </div>

      {/* Part 06 */}
      <div className="mt-80 px-4 md:mx-20 xl:px-40">
        <div className="flex flex-col items-center text-center">
          <h4 className="text-2xl md:text-3xl font-bold text-primary">
            HURRY! DON’T FORGET TO
          </h4>
          <h2 className="mt-6 text-4xl md:text-5xl xl:text-8xl font-semibold md:leading-16 xl:leading-26">
            Mark your calendar
          </h2>
          <Image
            src={ArtImage5}
            alt="art"
            className="mt-20 w-90 md:w-160 xl:w-300"
          />
          <p className="mt-10 text-3xl font-light max-w-200">
            Don&apos;t miss out on the upcoming FREE airdrop! Mark your calendar
            and get ready to receive your Turbo Mining Power.
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
    </div>
  );
}
