"use client";

import Image from "next/image";

import DisclaimerComponent from "@/components/DisclaimerComponent";

import ArtImage1 from "@/assets/images/bible/story/art-1.webp";
import ArtImage2 from "@/assets/images/bible/story/art-2.webp";
import ArtImage3 from "@/assets/images/bible/story/art-3.webp";
import ArtImage4 from "@/assets/images/bible/story/art-4.webp";
import ArtImage5 from "@/assets/images/bible/story/art-5.webp";
import ArtImage6 from "@/assets/images/bible/story/art-6.webp";

// export const metadata = {
//   title: "Bitcoin Yay Story - The Hidden Genesis & Nakamoto Legacy",
//   description:
//     "Discover the origin story of Bitcoin Yay (BTCY) and its connection to Satoshi Nakamoto's vision. Learn how the forgotten code patterns led to the creation of a sustainable, AI-powered cryptocurrency alternative.",
//   openGraph: {
//     title: "Bitcoin Yay Story - The Hidden Genesis & Nakamoto Legacy",
//     description:
//       "Discover the origin story of Bitcoin Yay (BTCY) and its connection to Satoshi Nakamoto's vision. Learn how the forgotten code patterns led to the creation of a sustainable, AI-powered cryptocurrency alternative.",
//   },
// };

export default function BibleStory() {
  return (
    <div className="mx-auto mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Bitcoin-YAY
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">Story</h1>
        <Image
          src={ArtImage1}
          alt="Art Image 1"
          className="w-100 md:w-150 lg:w-320"
        />
      </div>

      <div className="mt-20 flex flex-col items-center justify-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary text-center">
          The Hidden Genesis of Bitcoin-Yay:
        </h2>
        <h2 className="text-5xl md:text-7xl mb-4 font-semibold text-center">
          The Nakamoto Legacy
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-30">
          <Image
            src={ArtImage2}
            alt="Art Image 2"
            className="w-full md:w-120 xl:w-150"
          />
          <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-2xl">
            <h4 className="text-3xl">Prologue:</h4>
            <h3 className="text-4xl md:text-6xl font-bold mt-4">
              The Forgotten Code
            </h3>
            <p className="text-lg mt-10">
              Satoshi Nakamoto, the mysterious creator of Bitcoin, introduced a
              decentralized financial system that disrupted traditional finance.
              However, Bitcoin&apos;s limitations—high energy consumption, slow
              transaction speeds, and scalability issues—became evident over
              time. While Bitcoin remained the gold standard of cryptocurrency,
              discussions within cryptographic circles speculated that Nakamoto
              had foreseen these challenges and left behind the foundation for a
              new evolution.
            </p>
            <p className="text-lg mt-10">
              Years after Nakamoto’s disappearance, cryptographers analyzing
              early Bitcoin transactions discovered a peculiar pattern in the
              metadata of the genesis block and several early transactions.
              These were not random, but rather contained structured data
              hinting at an alternative blockchain model—one that emphasized
              efficiency, accessibility, and artificial intelligence-driven
              consensus. This discovery led to the conceptualization of
              Bitcoin-Yay.
            </p>
          </div>
        </div>
      </div>

      {/* Part 3 */}
      <div className="flex flex-col lg:flex-row items-center justify-end gap-10 mt-80">
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-2xl px-4">
          <h4 className="text-3xl">The Awakening:</h4>
          <h3 className="text-4xl md:text-6xl font-bold mt-4">
            The Nakamoto Framework
          </h3>
          <p className="text-lg mt-10">
            In 2023, a group of blockchain researchers and developers, inspired
            by Nakamoto’s vision and guided by these hidden patterns, began
            working on Bitcoin-Yay. Instead of relying on energy-intensive
            mining, Bitcoin-Yay introduced Proof-of-Participation (PoP)—a system
            that rewards users based on engagement, transactions, and network
            contributions rather than computational power.
          </p>
          <p className="text-lg mt-10">
            Built on the Stellar blockchain, Bitcoin-Yay was designed to enhance
            speed, scalability, and accessibility while preserving Bitcoin’s
            core principles of decentralization and financial autonomy. By
            integrating AI-driven consensus mechanisms, Bitcoin-Yay aimed to
            eliminate inefficiencies and create a self-regulating financial
            network that adapts dynamically to global adoption trends.
          </p>
        </div>
        <Image
          src={ArtImage3}
          alt="Art Image 3"
          className="w-full lg:w-120 xl:w-220"
        />
      </div>

      {/* Part 04 */}

      <div className="mt-80 flex flex-col items-center justify-center">
        <div className="w-full md:px-20 lg:px-40 px-4">
          <h4 className="text-2xl">The Rise of </h4>
          <h2 className="text-5xl md:text-7xl font-bold">Bitcoin-YAY</h2>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 relative w-full overflow-hidden">
          <Image
            src={ArtImage4}
            alt="Art Image 4"
            className="min-w-440 w-screen absolute top-0 left-1/2 -translate-x-1/2 -z-10"
          />
          <p className="text-lg md:text-2xl max-w-320 mt-4 lg:mt-60 px-4">
            Bitcoin-Yay launched with a clear objective: to be an independent
            yet complementary system to Bitcoin, offering a more sustainable and
            user-friendly alternative. While maintaining a loose economic
            linkage to Bitcoin, Bitcoin-Yay implemented its own deflationary
            model, AI-powered governance, and real-world utility applications to
            establish independent value.
          </p>

          <p className="text-lg md:text-2xl max-w-320 mt-4 lg:mt-20 mb-10 px-4">
            As adoption grew, Bitcoin-Yay gained recognition as a bridge between
            traditional cryptocurrencies and modern financial technology. Its
            AI-managed liquidity systems and seamless integration with
            decentralized applications positioned it as a future-proof digital
            asset. Unlike speculative meme coins or centralized digital
            currencies, Bitcoin-Yay was designed as a sustainable alternative
            that aligned with Nakamoto’s original principles while addressing
            Bitcoin’s evolving challenges.
          </p>
        </div>
      </div>

      {/* Part 05 */}
      <div className="mt-80 flex flex-col items-center justify-center px-4 md:px-20 lg:px-40">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-center">
          Epilogue:
        </h2>
        <h2 className="text-5xl md:text-7xl mb-4 font-semibold text-center">
          A Vision Continued
        </h2>
        <Image
          src={ArtImage5}
          alt="Art Image 5"
          className="mt-20 w-100 md:w-120 lg:w-160"
        />
        <p className="text-lg font-light max-w-300 mt-20">
          While the true identity of Satoshi Nakamoto remains unknown,
          Bitcoin-Yay embodies the natural progression of decentralized
          financial innovation. Whether Nakamoto intentionally left behind the
          framework for its creation or whether it emerged as a collective
          effort by the crypto community, one thing is certain—Bitcoin-Yay is
          here to redefine blockchain scalability, sustainability, and financial
          inclusivity.
          <br /> It is not a replacement for Bitcoin but rather a response to
          its limitations, ensuring that the decentralized financial revolution
          continues to evolve for future generations.
        </p>
      </div>

      {/* Part 06 */}

      <div className="my-80 flex flex-col lg:flex-row items-center justify-center gap-10 px-4 md:px-20 lg:px-40">
        <Image
          src={ArtImage6}
          alt="Art Image 6"
          className="w-80 lg:w-80 xl:w-120"
        />
        <h2 className="text-4xl mt-10 lg:text-6xl xl:text-7xl font-bold">
          &quot;The Chains Must Evolve. Let Yay Lead the Way.&quot;
        </h2>
      </div>
      <div className="mt-20 px-2 md:px-20 xl:px-40">
        <DisclaimerComponent />
      </div>
    </div>
  );
}
