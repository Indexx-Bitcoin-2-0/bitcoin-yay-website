import Image from "next/image";

import CustomButton2 from "@/components/CustomButton2";

import QuantumMiningButtonImage from "@/assets/images/mining/quantum-mining-icon.webp";
import QuantumMiningArtImage1 from "@/assets/images/mining/quantum-mining-art-1.webp";
import BuyNowButtonImage from "@/assets/images/buttons/buy-now-button.webp"

const PowerMiningPage = () => {
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col items-center justify-center gap-20">
        <h1 className="text-5xl md:text-8xl font-bold">Quantum Mining</h1>
        <Image
          src={QuantumMiningButtonImage}
          alt="Free Mining"
          className="w-80 md:w-120 lg:w-140"
        />

        <div className="text-center max-w-5xl">
          <p className="text-3xl font-bold">In Quantum Mining</p>
          <p className="text-2xl font-light mt-4">
            Keep going! Once you reach 100k BTCY, you&apos;ll unlock the Lotto
            feature. With your current plan, you already have access to the Shop
            and indexx.ai - no upgrade needed! Want even more perks and faster
            mining? You can upgrade to a higher plan anytime. Boost your
            earnings by completing daily tasks, referring friends, and staying
            active!
          </p>
          <p className="text-2xl font-light mt-2 text-primary">
            Have at least 15 referrals.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center my-20">
        <Image
          src={QuantumMiningArtImage1}
          alt="Quantum Mining Art"
          className="w-300"
        />
      </div>

      <div className="mt-30 flex flex-col items-center justify-center gap-4">
        <div className="text-3xl text-center flex flex-col gap-2">
          <p>Secure large-scale BTCY purchases</p>
          <p className="font-bold">($5K – $100K+)</p>
          <p>via bank wires, stable coins, and global OTC solutions.</p>
        </div>
        <CustomButton2
          link="/quantum-mining"
          image={BuyNowButtonImage}
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
