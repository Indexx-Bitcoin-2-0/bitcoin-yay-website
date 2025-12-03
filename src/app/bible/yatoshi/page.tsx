import Image from "next/image";

import ArtImage1 from "@/assets/images/bible/yatoshi/art-1.webp";
import ArtImage2 from "@/assets/images/bible/yatoshi/art-2.webp";
import ArtImage3 from "@/assets/images/bible/yatoshi/art-3.webp";
import ArtImage4 from "@/assets/images/bible/yatoshi/art-4.webp";

export const metadata = {
  title: "Yatoshi Nakamoto - Meet Satoshi's Sibling & Bitcoin-Yay Creator",
  description:
    "Learn about Yatoshi Nakamoto, the mysterious sibling of Bitcoin creator Satoshi Nakamoto. Discover how Yatoshi created Bitcoin-Yay (BTCY) as a smarter, mobile-first evolution of Bitcoin through partnership with Indexx.ai.",
  openGraph: {
    title: "Yatoshi Nakamoto - Meet Satoshi's Sibling & Bitcoin-Yay Creator",
    description:
      "Learn about Yatoshi Nakamoto, the mysterious sibling of Bitcoin creator Satoshi Nakamoto. Discover how Yatoshi created Bitcoin-Yay (BTCY) as a smarter, mobile-first evolution of Bitcoin through partnership with Indexx.ai.",
  },
};

export default function YatoshiPage() {
  return (
    <div className="container mx-auto mt-40 px-4">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          The Story of
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">
          Yatoshi Nakamoto
        </h1>
        <Image
          src={ArtImage1}
          alt="Art Image 1"
          className="mt-20 w-100 md:w-150 lg:w-200"
        />
      </div>

      {/* Part 02 */}

      <div className="mt-80 flex flex-col lg:flex-row items-center justify-center gap-10">
        <Image
          src={ArtImage4}
          alt="Art Image 2"
          className="w-full md:w-120 xl:w-150"
        />
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-2xl text-tertiary">
          <h3 className="text-4xl md:text-[50px] font-bold mt-4">
            It’s whispered that Yatoshi Nakamoto
          </h3>
          <p className="text-lg mt-6">
            brother of Bitcoin’s enigmatic creator, Satoshi Nakamoto—foresaw
            Bitcoin’s limitations and even embedded hints for a better
            blockchain in Bitcoin’s earliest code. Whether myth or reality,
            Bitcoin-Yay (BTCY) picks up where Bitcoin left off—designed as a
            “Micro Token of Bitcoin” that carries Bitcoin’s legacy into a
            faster, more accessible era. Built on a high-performance
            Stellar-based blockchain, Bitcoin-Yay combines fast, low-cost
            transactions with cutting-edge features like AI-driven mobile
            mining, smart contracts, and decentralized governance. In essence,
            Bitcoin-Yay is positioned as a new and smarter version of Bitcoin
            tailored for everyday use, aiming to create a sustainable,
            community-driven financial network.
          </p>
        </div>
      </div>

      {/* Part 03 */}

      <div className="mt-80 flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-2xl text-tertiary lg:text-right">
          <h3 className="text-4xl md:text-[50px] font-bold mt-4">
            Born from the vision of Yatoshi Nakamoto
          </h3>
          <p className="text-lg mt-6">
            and executed through a strategic partnership with Indexx.ai—acting
            as the third-party contractor responsible for hosting, developing,
            and running the Bitcoin-Yay ecosystem—BTCY bridges the gap between
            Bitcoin’s original philosophy and the demands of the modern era.
            Yatoshi created Bitcoin-Yay to honor his brother’s legacy as
            “digital gold” while evolving it into a mobile-first,
            energy-efficient, and utility-rich ecosystem accessible to anyone
            with a smartphone. By lowering entry barriers and fostering
            inclusivity, Bitcoin-Yay aspires to bring practical crypto usage to
            everyday people—from shopping and gaming to savings and
            micro-investments. To connect with Yatoshi directly, one must
            approach Indexx, the appointed custodian of BTCY’s development and
            governance.
          </p>
        </div>
        <Image
          src={ArtImage3}
          alt="Art Image 2"
          className="w-full md:w-120 xl:w-150"
        />
      </div>

      {/* part 04 */}

      <div className="mt-80 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Who is
        </h2>
        <h2 className="text-5xl md:text-7xl mb-4 font-semibold">
          Yatoshi Nakamoto
        </h2>
        <Image src={ArtImage2} alt="Art Image 1" className="mt-20 w-60" />

        <div className="my-40 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 gap-x-100 text-left">
            <div className="space-y-2">
              <h4 className="text-primary text-[22px]">Date of Birth</h4>
              <p className="text-4xl">Unknown</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-primary text-[22px]">Profession</h4>
              <p className="text-4xl">Programmer</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-primary text-[22px]">Country of Origin</h4>
              <p className="text-4xl">Unknown</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-primary text-[22px]">Message</h4>
              <p className="text-4xl">N/A</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <h4 className="text-primary text-[22px]">
                Relationship to Satoshi Nakamoto
              </h4>
              <p className="text-4xl">Sibling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
