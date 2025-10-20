import Image from "next/image";

import FreeMiningButtonImage from "@/assets/images/mining/free-mining-icon.webp";
import FreeMiningArtImage1 from "@/assets/images/mining/free-mining-art-1.webp";

const FreeMiningPage = () => {
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col items-center justify-center gap-20">
        <h1 className="text-5xl md:text-8xl font-bold">Free Mining</h1>
        <Image
          src={FreeMiningButtonImage}
          alt="Free Mining"
          className="w-80 md:w-120 lg:w-140"
        />
        <div className="text-center max-w-3xl">
          <p className="text-3xl font-bold">
            In Free Mining Plan, it&apos;s completely Free!{" "}
          </p>
          <p className="text-2xl font-light mt-4">
            Keep going! Once you reach 10,000 BTCY, you&apos;ll unlock access to
            the Lotto feature. Earn BTCY by completing daily tasks, referring
            friends, or staying active in the app!
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center my-20">
        <Image
          src={FreeMiningArtImage1}
          alt="Free Mining Art"
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

export default FreeMiningPage;
