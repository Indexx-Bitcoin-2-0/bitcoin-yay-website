"use client";

import Image from "next/image";
import Link from "next/link";

import CustomStyledConatiner from "@/components/CustomStyledContainer";

import PhoneImage1 from "@/assets/images/eula/phone-1.svg";
import PhoneImage2 from "@/assets/images/eula/phone-2.svg";
import DownloadLogo from "@/assets/images/download-button.svg";

export default function EULA() {
  return (
    <div className="container mx-auto px-4 overflow-visible mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-6 max-w-200  md:leading-16">
          End-User License Agreement (EULA) for Bitcoin-Yay
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: May 19, 2025
        </p>
      </CustomStyledConatiner>

      <div className="flex flex-col items-center justify-center mt-40">
        <div className="flex flex-col items-center justify-center max-w-200 text-center">
          <h2 className="text-2xl md:text-5xl font-bold mt-6 md:leading-16">
             Bitcoin-Yay App Description
          </h2>
          <p className="text-lg md:text-2xl font-medium text-tertiary mt-4">
            Start Your Bitcoin Journey with Bitcoin-Yay – Effortless Mining for
            All!
          </p>
          <p className="text-sm md:text-base font-semibold text-tertiary my-4">
            Embark on a seamless Bitcoin mining experience with Bitcoin-Yay.
            Designed for both novices and seasoned crypto enthusiasts, our app
            simplifies the mining process, allowing you to earn BTCY tokens with
            just a tap.
          </p>
        </div>
        <Image
          src={PhoneImage1}
          alt="Phone Image 1"
          className="w-80 md:w-140 lg:w-240 mt-20"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center mt-80">
        <div className="flex-1 w-screen">
          <h2 className="text-4xl md:text-5xl font-bold">Key Features</h2>
          <ul className="list-disc pl-6 text-lg md:text-2xl flex flex-col gap-10 md:gap-14 lg:gap-18 mt-10">
            <li>
              <span className="font-medium">One-Tap Mining:</span> Activate
              daily mining sessions effortlessly.
            </li>
            <li>
              <span className="font-medium">No Hardware Needed:</span>
              Cloud-based mining eliminates the need for expensive equipment.
            </li>
            <li>
              <span className="font-medium">Secure Wallet:</span> Your earnings
              are stored safely until you&apos;re ready to withdraw.
            </li>
            <li>
              <span className="font-medium">Transparent Operations:</span>{" "}
              Real-time tracking of your mining progress and earnings.
            </li>
            <li>
              <span className="font-medium">Community Engagement:</span> Join a
              growing community and benefit from our referral program.
            </li>
          </ul>
        </div>

        <div className="flex-1 flex flex-col mt-40 lg:mt-0 justify-center items-center">
          <h2 className="text-3xl md:text-5xl font-bold text-center">
            Download The Bitcoin-Yay App
          </h2>
          <Image
            src={PhoneImage2}
            alt="Phone Image 2"
            className="w-80 md:w-140 lg:w-100 mt-10"
          />
          <div className="flex flex-col items-center justify-center mt-20">
            <Link
              href="/coming-soon"
              className="cursor-pointer text-tertiary group"
            >
              <Image
                src={DownloadLogo}
                alt="Download Logo"
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex justify-center">
                <p className="text-lg group-hover:text-primary">
                  Download the App
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-80 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">
          Experience the future of cryptocurrency with Bitcoin-Yay – where
          mining is made simple, secure, and accessible.
        </h2>
      </div>

      <div className="mt-80">
        <h2 className="text-3xl md:text-5xl font-bold">
          End-User License Agreement (EULA) for Bitcoin-Yay
        </h2>
        <p className="text-2xl font-medium mt-10 text-primary">
          Effective Date: May 19, 2025
        </p>
        <p className="text-base font-semibold mt-2">
          Embark on a seamless Bitcoin mining experience with Bitcoin-Yay.
          Designed for both novices and seasoned crypto enthusiasts, our app
          simplifies the mining process, allowing you to earn BTCY tokens with
          just a tap.
        </p>
        <div>
          <h3 className="text-2xl font-semibold mt-10">
            1. Acceptance of Terms
          </h3>
          <p className="text-base font-semibold mt-2">
            By downloading, installing, or using the Bitcoin-Yay application
            (&quot;App&quot;), you agree to be bound by this End-User License
            Agreement (&quot;Agreement&quot;). If you do not agree to this
            Agreement, do not use the App.
          </p>
          <h3 className="text-2xl font-semibold mt-10">2. License Grant</h3>
          <p className="text-base font-semibold mt-2">
            Bitcoin-Yay grants you a non-exclusive, non-transferable, revocable
            license to use the App for personal, non-commercial purposes,
            subject to the terms outlined herein.
          </p>
          <h3 className="text-2xl font-semibold mt-10">3. Restrictions</h3>
          <p className="text-base font-semibold mt-2">You agree not to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-10 text-base font-semibold mt-2">
            <li>
              Modify, reverse-engineer, or create derivative works of the App.
            </li>
            <li>
              Use the App for unlawful purposes or in violation of applicable
              laws.
            </li>
            <li>
              Distribute, sublicense, or transfer the App to third parties.
            </li>
          </ul>
          <h3 className="text-2xl font-semibold mt-10">
            4. Intellectual Property
          </h3>
          <p className="text-base font-semibold mt-2">
            All rights, titles, and interests in and to the App, including all
            intellectual property rights, are and will remain the exclusive
            property of Bitcoin-Yay.
          </p>
          <h3 className="text-2xl font-semibold mt-10">5. Privacy</h3>
          <p className="text-base font-semibold mt-2">
            Your use of the App is also governed by our Privacy Policy, which
            outlines how we collect, use, and protect your information.
          </p>
          <h3 className="text-2xl font-semibold mt-10">6. Termination</h3>
          <p className="text-base font-semibold mt-2">
            This Agreement is effective until terminated. Your rights under this
            Agreement will terminate automatically without notice if you fail to
            comply with any term(s) of this Agreement.
          </p>

          <h3 className="text-2xl font-semibold mt-10">
            7. Disclaimer of Warranties
          </h3>
          <p className="text-base font-semibold mt-2">
            The App is provided &quot;as is&quot; without warranty of any kind.
            Bitcoin-Yay disclaims all warranties, express or implied, including,
            but not limited to, implied warranties of merchantability and
            fitness for a particular purpose.
          </p>
          <h3 className="text-2xl font-semibold mt-10">
            8. Limitation of Liability
          </h3>
          <p className="text-base font-semibold mt-2">
            In no event shall Bitcoin-Yay be liable for any damages arising out
            of or in connection with your use or inability to use the App.
          </p>
          <h3 className="text-2xl font-semibold mt-10">9. Governing Law</h3>
          <p className="text-base font-semibold mt-2">
            This Agreement shall be governed by and construed in accordance with
            the laws of the jurisdiction in which Bitcoin-Yay operates, without
            regard to its conflict of law provisions.
          </p>
          <h3 className="text-2xl font-semibold mt-10">
            10. Contact Information
          </h3>
          <p className="text-base font-semibold mt-2">
            For any questions regarding this Agreement, please contact us at:
          </p>
          <p className="text-primary text-base font-semibold mt-2">
            Email:{" "}
            <span
              className=" cursor-pointer hover:underline underline-offset-3"
              onClick={() => {
                window.location.href = "mailto:privacy@bitcoinyay.com";
              }}
            >
              privacy@bitcoinyay.com
            </span>
          </p>
          <p className="text-base font-semibold mt-2 text-primary">
            Address: Bitcoin-Yay, San Francisco, California, USA
          </p>
        </div>
      </div>
    </div>
  );
}
