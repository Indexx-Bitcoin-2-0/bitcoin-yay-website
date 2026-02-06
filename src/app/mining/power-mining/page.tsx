import Image from "next/image";
import Link from "next/link";

import PowerMiningButtonImage from "@/assets/images/mining/power-mining-icon.webp";
import PowerMiningArtImage1 from "@/assets/images/mining/electric-mining-art-1.webp";

import ElectricPowerButtonImage from "@/assets/images/mining/electric-icon.webp";
import TurboPowerButtonImage from "@/assets/images/mining/turbo-icon.webp";
import NuclearPowerButtonImage from "@/assets/images/mining/nuclear-icon.webp";

const PowerMiningPage = () => {
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40 relative max-w-8xl">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 my-40 max-w-7xl mx-auto items-start">
        <Link
          href="/mining/electric-mining"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center mb-6">
            <Image
              src={ElectricPowerButtonImage}
              alt="Electric Mining"
              className="w-20 md:w-24 lg:w-28 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 text-center uppercase">
            ELECTRIC MINING PLAN
          </h3>
          <p className="text-base  text-white text-center leading-relaxed">
            Charge your mining speed with extra power double your earning rate and keep your sessions running stronger, longer.
          </p>
        </Link>

        <Link
          href="/mining/turbo-mining"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center mb-6">
            <Image
              src={TurboPowerButtonImage}
              alt="Turbo Mining"
              className="w-24 md:w-28 lg:w-32 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 text-center uppercase">
            TURBO MINING PLAN
          </h3>
          <p className="text-base  text-white text-center leading-relaxed">
            Experience 6x faster mining climb to Alchemy in record time and multiply your BTCY rewards.
          </p>
        </Link>

        <Link
          href="/mining/nuclear-mining"
          className="flex flex-col items-center justify-center group"
        >
          <div className="h-32 flex justify-center items-center mb-6">
            <Image
              src={NuclearPowerButtonImage}
              alt="Nuclear Mining"
              className="w-28 md:w-32 lg:w-36 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-4 text-center uppercase">
            NUCLEAR MINING PLAN
          </h3>
          <p className="text-base  text-white text-center leading-relaxed">
            The ultimate boost maximum power, maximum output. Unlock BTCY&apos;s highest earning potential with unstoppable mining energy.
          </p>
        </Link>
      </div>

      {/*  We need to add video container here with youtube video iframe link  */}
      <div className="flex items-center justify-center my-20 max-w-7xl mx-auto aspect-video">
        <iframe
          src="https://www.youtube.com/embed/tuppsYWEDGI"
          title="Power Mining"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      <div className="flex items-center justify-center my-20">
        <Image
          src={PowerMiningArtImage1}
          alt="Power Mining Art"
          className="w-150"
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
