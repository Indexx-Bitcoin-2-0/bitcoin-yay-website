import Image from "next/image";
import Link from "next/link";

import PowerMiningButtonImage from "@/assets/images/mining/power-mining-icon.webp";
import PowerMiningArtImage1 from "@/assets/images/mining/power-mining-art-1.webp";

import ElectricPowerButtonImage from "@/assets/images/mining/electric-icon.webp";
import TurboPowerButtonImage from "@/assets/images/mining/turbo-icon.webp";
import NuclearPowerButtonImage from "@/assets/images/mining/nuclear-icon.webp";

const PowerMiningPage = () => {
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col items-center justify-center gap-20">
        <h1 className="text-5xl md:text-8xl font-bold">Power Mining</h1>
        <Image
          src={PowerMiningButtonImage}
          alt="Free Mining"
          className="w-80 md:w-120 lg:w-140"
        />

        <div className="text-center max-w-5xl">
          <p className="text-3xl font-bold">In Power Mining</p>
          <p className="text-2xl font-light mt-4">
            Keep going! Once you reach 10,000 BTCY, you&apos;ll unlock the Lotto
            feature. With your current plan, you already have access to the Shop
            and Indexx.ai - no upgrade needed! Want even more perks and faster
            mining? You can upgrade to a higher plan anytime. Boost your
            earnings by completing daily tasks, referring friends, and staying
            active!
          </p>
          <p className="text-2xl font-light mt-2 text-primary">
            Have at least 5 Referrals
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-40 items-center justify-center my-40">
        <Link
          href="/mining/electric-mining"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={ElectricPowerButtonImage}
              alt="Electric Mining"
              className="w-18 group-hover:hidden"
            />
            <Image
              src={ElectricPowerButtonImage}
              alt="Electric Mining"
              className="w-18 hidden group-hover:block"
            />
          </div>
          <p className="mt-2 text-lg font-semibold group-hover:text-primary">
            ELECTRIC
          </p>
        </Link>
        <Link
          href="/mining/turbo-mining"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={TurboPowerButtonImage}
              alt="Electric Mining"
              className="w-28 group-hover:hidden"
            />
            <Image
              src={TurboPowerButtonImage}
              alt="Electric Mining"
              className="w-28 hidden group-hover:block"
            />
          </div>
          <p className="mt-2 text-lg font-semibold group-hover:text-primary">
            TURBO
          </p>
        </Link>
        <Link
          href="/mining/nuclear-mining"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center">
            <Image
              src={NuclearPowerButtonImage}
              alt="Electric Mining"
              className="w-30 group-hover:hidden"
            />
            <Image
              src={NuclearPowerButtonImage}
              alt="Electric Mining"
              className="w-30 hidden group-hover:block"
            />
          </div>
          <p className="mt-2 text-lg font-semibold group-hover:text-primary">
            NUCLEAR
          </p>
        </Link>
      </div>

      <div className="flex items-center justify-center my-20">
        <Image
          src={PowerMiningArtImage1}
          alt="Power Mining Art"
          className="w-300"
        />
      </div>

      <div className="text-lg mt-40 mb-40">
        <h2 className="text-3xl font-bold">Alchemy Stages</h2>
        <h3 className="text-2xl font-bold mt-10">1. Alchemy Gateway</h3>
        <ul className="list-disc list-inside mt-6 flex flex-col gap-6">
          <li>Required first checkpoint.</li>
          <li>
            This serves as the entry ritual for activating BTCY in the external
            economy.
          </li>
        </ul>
        <h3 className="text-2xl font-bold mt-10">2. Alchemy Trade</h3>
        <ul className="list-disc list-inside mt-6 flex flex-col gap-6">
          <li>Unlocked only after Gateway is completed.</li>
          <li>
            Allows the user to Sell BTCY, Buy BTCY, convert BTCY to other assets
            or tokens.
          </li>
        </ul>
        <h3 className="text-2xl font-bold mt-10">3. Shop and Lotto</h3>
        <ul className="list-disc list-inside mt-6 flex flex-col gap-6">
          <li>Unlocked once the user passes through the Gateway and Trade.</li>
          <li>Enables BTCY-based purchases and lottery participation.</li>
          <p>
            This flow ensures controlled token circulation and increases
            platform engagement.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default PowerMiningPage;
