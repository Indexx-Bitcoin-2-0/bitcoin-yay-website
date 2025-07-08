import Image from "next/image";

import ArtImage1 from "@/assets/images/bible/wallet/art-1.webp";
import ArtImage2 from "@/assets/images/bible/wallet/art-2.webp";
import ArtImage3 from "@/assets/images/bible/wallet/art-3.webp";

export const metadata = {
  title: "Ying Yang Wallet - Next-Generation Digital Crypto Wallet",
  description:
    "Discover Ying Yang Wallet, the secure digital wallet for Bitcoin Yay (BTCY) and crypto assets. Features include local private key storage, multi-asset support, cross-chain bridging, and real-time notifications.",
  openGraph: {
    title: "Ying Yang Wallet - Next-Generation Digital Crypto Wallet",
    description:
      "Discover Ying Yang Wallet, the secure digital wallet for Bitcoin Yay (BTCY) and crypto assets. Features include local private key storage, multi-asset support, cross-chain bridging, and real-time notifications.",
  },
};

export default function YingYangWalletPage() {
  return (
    <div className="mx-auto overflow-hidden mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Bitcoin-YAY
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">
          Ying Yang Wallet
        </h1>
        <Image
          src={ArtImage1}
          alt="Art Image 1"
          className="w-100 md:w-150 lg:w-200 2xl:w-320 mt-20"
        />
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-40">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Ying Yang Wallet
        </h2>
        <h1 className="mt-2 text-5xl md:text-7xl mb-4 font-semibold">
          The next-generation digital wallet
        </h1>
        <p className="mt-10 text-lg">
          that empowers users to manage their BTCY (Bitcoin Yay) tokens and
          other crypto assets built on the Yin Yang blockchain. Designed for
          simplicity, security, and real-world utility, it provides users with a
          seamless way to send, receive, mine, stake, and bridge their assets —
          all from a single app. Whether you&apos;re new to crypto or an
          experienced user, YinYang Wallet ensures an intuitive experience
          backed by robust technology.
        </p>
      </div>
      <div className="mt-28 flex flex-col items-center justify-center">
        <Image
          src={ArtImage2}
          alt="Art Image 2"
          className="w-100 md:w-150 lg:w-200 2xl:w-200 mt-20"
        />
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-40">
        <h1 className="mt-2 text-5xl md:text-7xl mb-4 font-semibold">
          Key Benefits of Ying Yang Wallet
        </h1>

        <h3 className="mt-10 text-[40px] font-bold">1. Secure and Private</h3>
        <p className="mt-4 text-lg">
          Security is the core of YinYang Wallet. Your private keys — the
          digital credentials that give you control over your funds — are stored
          locally on your device, never uploaded to the cloud or centralized
          servers. This ensures that only you can access your wallet. The app
          also supports advanced security features like PIN protection,
          biometric login (fingerprint or facial recognition), and encrypted
          backup options.
        </p>
        <h3 className="mt-10 text-[40px] font-bold">2. Multi-Asset Support</h3>
        <p className="mt-4 text-lg">
          YinYang Wallet allows you to hold more than just BTCY. You can store,
          manage, and transact with various tokens from the Yin Yang blockchain
          as well as those based on Stellar. The app displays your token
          balances in real time and provides a clear history of transactions,
          giving you full control and transparency over your portfolio.
        </p>

        <h3 className="mt-10 text-[40px] font-bold">3. Bridging Made Easy</h3>
        <p className="mt-4 text-lg">
          With YinYang Wallet, you can easily bring tokens from other popular
          blockchains — such as Ethereum and Binance Smart Chain — into your
          wallet. This is achieved through a seamless bridge system, which locks
          your original tokens on their native chain and provides an equivalent
          token inside YinYang. Similarly, you can bridge tokens out, allowing
          full interoperability across chains.
        </p>

        <h3 className="mt-10 text-[40px] font-bold">4. In-App Notifications</h3>
        <p className="mt-4 text-lg">
          Stay informed in real time. The wallet sends you notifications
          whenever a transaction is processed, a mining session ends, staking
          rewards are available, or token balances change. These updates help
          users stay in control without having to constantly check the app.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 my-80">
        <Image
          src={ArtImage3}
          alt="Airdrop Art 2"
          className="w-full lg:w-1/2 -ml-6 max-w-300"
        />
        <div className="flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-0">
          <h3 className="text-5xl md:text-7xl font-semibold">Who it is for</h3>
          <p className="mt-10 text-[40px] font-bold max-w-164">
            YinYang Wallet is designed for a wide range of users:
          </p>
          <ul className="mt-4 list-disc text-lg list-inside">
            <li>
              Newcomers to cryptocurrency are looking for a wallet that’s easy
              to set up and use.
            </li>
            <li>
              BTCY miners who want a reliable tool to mine tokens and receive
              rewards instantly.
            </li>
            <li>
              Crypto investors who hold Stellar-based or cross-chain tokens and
              want a simple interface.
            </li>
            <li>
              Tech-savvy users looking to manage and bridge assets across
              multiple blockchains
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
