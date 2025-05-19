import Image from "next/image";

import ArtImage5 from "@/assets/images/bitcoin/art-5.svg";
export default function NextBillion() {
  return (
    <div className="container mx-auto px-4 overflow-visible">
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          WHY BTCY IS
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">
          Bitcoin for the Next Billion
        </h1>
        <Image src={ArtImage5} alt="Art Image 1" />
      </div>
      <div className="mt-20 flex flex-col items-center justify-center">
        <ul className="list-disc pl-6 text-2xl font-light flex flex-col gap-4">
          <li>
            BTCY is mobile-native, designed to run on any smartphone with
            minimal power
          </li>

          <li>
            BTCY is human-centered, earned through behavior, not hashpower
          </li>

          <li>
            BTCY is pegged to Bitcoin’s legacy, yet built to be transacted,
            staked, and lived with daily
          </li>

          <li>
            BTCY is globally accessible, with 21 trillion tokens enabling true
            micro-ownership and community wealth
          </li>
        </ul>
      </div>
    </div>
  );
}
