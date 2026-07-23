import Image from "next/image";
import Link from "next/link";

import BgImage1 from "@/assets/images/airdrop/bg-art-1.webp";
import BgImage2 from "@/assets/images/airdrop/bg-art-2.webp";
import PopupArt4 from "@/assets/images/airdrop/popup-art-3.svg";
import PopupArt5 from "@/assets/images/airdrop/popup-art-4.png";
import BackButton from "@/assets/images/buttons/back-button.webp";
import BackArrowIcon1 from "@/assets/images/icons/back-arrow-1.webp";
import BackArrowIcon2 from "@/assets/images/icons/back-arrow-2.webp";

import CustomButton2 from "@/components/CustomButton2";

export default function AirdropRegisterPage() {
  return (
    <div className="container mx-auto mt-60 flex flex-col items-center justify-center">
      <div className="absolute inset-0 mt-40 -z-10 bg-cover bg-center">
        <Image
          src={BgImage1}
          alt="Background Image 1"
          className="absolute left-0 top-0 w-80 md:w-60 xl:w-120"
        />
        <Image
          src={BgImage2}
          alt="Background Image 2"
          className="absolute right-0 top-0 hidden md:block md:w-60 xl:w-120"
        />
      </div>

      <div className="group -mt-20 flex w-full justify-start">
        <Link href="/airdrop">
          <Image
            src={BackArrowIcon1}
            alt="Back Arrow"
            className="h-12 w-12 cursor-pointer group-hover:hidden md:h-16 md:w-16"
          />
          <Image
            src={BackArrowIcon2}
            alt="Back Arrow"
            className="hidden h-12 w-12 cursor-pointer group-hover:block md:h-16 md:w-16"
          />
        </Link>
      </div>

      <div className="flex max-w-4xl flex-col items-center px-4 text-center">
        <h4 className="text-xl font-semibold text-primary md:text-3xl">
          Airdrop Registration
        </h4>
        <h1 className="mt-4 text-4xl md:mt-6 md:text-7xl lg:text-9xl">
          Closed
        </h1>
        <p className="mt-8 max-w-3xl text-lg font-medium md:mt-12 md:text-2xl">
          The Bitcoin Yay social media airdrop registration is no longer
          accepting entries.
        </p>
      </div>

      <div className="mb-40 mt-12 w-full max-w-4xl px-4">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090909]/80 px-6 py-10 text-center md:px-10 md:py-14">
          <Image
            src={PopupArt5}
            alt="Decorative Art"
            className="absolute right-4 top-4 w-20 opacity-80 md:right-8 md:top-8 md:w-28"
          />
          <Image
            src={PopupArt4}
            alt="Airdrop Ended"
            className="mx-auto w-56 md:w-72"
          />
          <h2 className="mt-8 text-3xl font-bold md:text-5xl">
            Airdrop <span className="text-primary">Ended</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold uppercase md:text-2xl">
            Thank you for your interest. This registration page has been closed.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#d5d5d5] md:text-lg">
            Check the main airdrop page for future campaign updates and new
            event announcements.
          </p>

          <div className="mt-10 flex justify-center">
            <CustomButton2
              image={BackButton}
              text="Back to Airdrop"
              link="/airdrop"
              imageStyling="w-22"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
