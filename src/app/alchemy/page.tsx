import Image from "next/image";
import Link from "next/link";

import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/home/art-1.webp";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";

import CustomButton2 from "@/components/CustomButton2";
import FreeMiningButtonImage from "@/assets/images/alchemy/home/free-art.webp";
import FreeMiningButtonImage2 from "@/assets/images/alchemy/home/free02-art.webp";
import ElectricMiningButtonImage from "@/assets/images/alchemy/home/electric-art.webp";
import ElectricMiningButtonImage2 from "@/assets/images/alchemy/home/electric2-art.webp";
import TurbineMiningButtonImage from "@/assets/images/alchemy/home/turbo-art.webp";
import TurbineMiningButtonImage2 from "@/assets/images/alchemy/home/turbo2-art.webp";
import NuclearMiningButtonImage from "@/assets/images/alchemy/home/nuclear-art.webp";
import NuclearMiningButtonImage2 from "@/assets/images/alchemy/home/nuclear-02-art.webp";
import QuantumMiningButtonImage from "@/assets/images/alchemy/home/quantum-art.webp";
import QuantumMiningButtonImage2 from "@/assets/images/alchemy/home/quantum2-art.webp";

export default function AlchemyPage() {
  return (
    <div className="mx-auto mt-40 px-4 md:px-20 xl:px-40 relative max-w-[2000px]">
      <div className="flex flex-col xl:flex-row ">
        <div className="flex w-full xl:w-[50%]">
          <div className="mt-6 mr-6 xl:min-w-25">
            <Image
              src={AlchemyLogo}
              alt="Alchemy Logo"
              className="w-16 md:w-25"
            />
          </div>
          <div className="w-9/10">
            <h1 className="text-5xl md:text-[120px] font-semibold">
              Alchemy Gateway
            </h1>
            <p className="mt-10 text-xl md:text-3xl">
              This is the beginning of the transformation layer between mined
              BTCY and real BTCY tokens on the Bitcoin Yay network. Inspired by
              the ancient idea of alchemy — turning base metals into gold — this
              gateway transforms raw mined rewards into real, liquid assets,
              ensuring fairness, sustainability, and long-term ecosystem growth.
            </p>
          </div>
        </div>
        <div className="mt-10 xl:mt-40 flex justify-center items-center -z-10 xl:absolute xl:top-0 xl:right-0">
          <Image
            src={ArtImage1}
            alt="Alchemy Art 1"
            className="w-100 md:w-160 xl:w-[800px] 2xl:w-[1000px]"
          />
        </div>
      </div>

      <div className="mt-40 xl:mt-120 2xl:mt-160">
        <h2 className="text-4xl md:text-5xl xl:text-7xl font-medium text-center max-w-7xl mx-auto xl:leading-20">
          Turn your BTCY into passive income! Secure the network, earn rewards,
          and grow your holdings—stake your Bitcoin Yay now and let your crypto
          work for you.
        </h2>
        <div className="flex justify-center items-center mt-20">
          <CustomButton2
            text="Start Alchemy"
            image={PointingButtonImage}
            imageStyling="w-20 md:w-30"
            link="#"
          />
        </div>
      </div>

      <div className="mt-80">
        <h2 className="text-5xl md:text-7xl xl:text-[120px] font-semibold">
          ALCHEMY GATEWAY
        </h2>
        <p className="mt-10 text-xl md:text-4xl">
          Select an input, start alchemy, and get a random multiplier result
          based on the category odds!
        </p>

        <div className="flex mt-30 gap-30 flex-wrap justify-center items-center">
          <Link
            href="/alchemy/free-mining"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={FreeMiningButtonImage}
                alt="Free Mining"
                className="w-32 group-hover:hidden"
              />
              <Image
                src={FreeMiningButtonImage2}
                alt="Free Mining"
                className="w-32 hidden group-hover:block"
              />
            </div>
            <p className="mt-2 text-2xl font-semibold group-hover:text-primary">
              FREE MINING
            </p>
          </Link>
          <Link
            href="/alchemy/electric"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={ElectricMiningButtonImage}
                alt="Electric Mining"
                className="w-32 group-hover:hidden"
              />
              <Image
                src={ElectricMiningButtonImage2}
                alt="Electric Mining"
                className="w-32 hidden group-hover:block"
              />
            </div>
            <p className="mt-2 text-2xl font-semibold group-hover:text-primary">
              ELECTRIC
            </p>
          </Link>
          <Link
            href="/alchemy/turbo"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={TurbineMiningButtonImage}
                alt="Electric Mining"
                className="w-32 group-hover:hidden"
              />
              <Image
                src={TurbineMiningButtonImage2}
                alt="Electric Mining"
                className="w-32 hidden group-hover:block"
              />
            </div>
            <p className="mt-2 text-2xl font-semibold group-hover:text-primary">
              TURBO
            </p>
          </Link>
          <Link
            href="/alchemy/nuclear"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={NuclearMiningButtonImage}
                alt="Electric Mining"
                className="w-32 group-hover:hidden"
              />
              <Image
                src={NuclearMiningButtonImage2}
                alt="Electric Mining"
                className="w-32 hidden group-hover:block"
              />
            </div>
            <p className="mt-2 text-2xl font-semibold group-hover:text-primary">
              NUCLEAR
            </p>
          </Link>
          <Link
            href="/alchemy/quantum"
            className="flex flex-col items-center justify-center group"
          >
            <div className="h-32 flex justify-center items-center">
              <Image
                src={QuantumMiningButtonImage}
                alt="Electric Mining"
                className="w-32 group-hover:hidden"
              />
              <Image
                src={QuantumMiningButtonImage2}
                alt="Electric Mining"
                className="w-32 hidden group-hover:block"
              />
            </div>
            <p className="mt-2 text-2xl font-semibold group-hover:text-primary">
              QUANTUM
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-80 mb-80">
        <h2 className="text-5xl md:text-7xl xl:text-[120px] font-semibold">
          How BTCY Alchemy works
        </h2>
        <div className="mt-10 text-xl md:text-3xl xl:text-4xl">
          <ul className="list-decimal leading-10 md:leading-16 pl-4 md:pl-10">
            <li>
              Select Input Amount <br /> Choose how many BTCY to commit —
              options depend on your user tier (Free, Electric, Turbo, Nuclear,
              Quantum).
            </li>
            <li>
              Start Alchemy <br /> Click Start Alchemy → your BTCY enters a
              1-hour randomized process.
            </li>
            <li>
              Wait 1 Hour <br /> After 1 hour, the system reveals your outcome:
              Gain (small or big) Partial loss
            </li>
            <li>
              {" "}
              Receive Outcome <br /> Based on your multiplier (e.g., 0.5x, 1.2x,
              2x, 3x), you’ll see how much BTCY you get back.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
