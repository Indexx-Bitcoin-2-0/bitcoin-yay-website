import Image from "next/image";

import ArtImage1 from "@/assets/images/alchemy/claim/art-1.webp";

import NodeButtonImage from "@/assets/images/buttons/nodes-button.webp";
import DexButtonImage from "@/assets/images/buttons/dex-button.webp";

import CustomButton2 from "@/components/CustomButton2";

export default function Claim() {
  return (
    <div className="mx-auto mt-40 lg:mt-60 px-4 md:px-20 xl:px-40">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-20">
        <Image src={ArtImage1} alt="art 1" className="w-60 md:w-60 xl:w-80" />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-bold">
            Claim your BTCY
          </h1>
          <h4 className="mt-10 md:mt-20 text-3xl md:text-5xl font-semibold">
            Chose your ------
          </h4>
        </div>
      </div>
      <div className="mt-20 mb-40 flex items-center justify-center gap-40 px-10">
        <CustomButton2
          image={NodeButtonImage}
          text="CEX"
          link="#"
          imageStyling="w-30"
        />
        <CustomButton2
          image={DexButtonImage}
          text="DEX"
          link="#"
          imageStyling="w-30"
        />
      </div>

      <div className="mt-80 font-light flex flex-col gap-2 mb-40">
        <h3 className="text-xl font-semibold">Disclaimer</h3>
        <p>
          By participating in the BTCY Alchemy process, you acknowledge the
          following:
        </p>

        <p>Claim Options:</p>

        <p>CEX (Centralized Exchange – Indexx Exchange)</p>
        <p>
          Claiming to CEX will send your reward directly to your Indexx Exchange
          account.
        </p>
        <ul className="list-disc pl-4">
          <li>Fast processing</li>
          <li>No gas fees</li>
          <li>Managed by Indexx</li>
        </ul>

        <p>You need a registered and verified Indexx account.</p>

        <p>DEX (Decentralized Exchange – Wallet Claim, e.g., MetaMask)</p>
        <p>
          Claiming to DEX sends your reward to your connected blockchain wallet.
        </p>
        <ul className="list-disc pl-4">
          <li>Full user control</li>
          <li>Can interact with DeFi, staking, swaps</li>
        </ul>

        <p>You pay gas fees (on the blockchain network)</p>
        <p>
          Make sure your wallet is connected and ready (MetaMask, WalletConnect,
          etc.)
        </p>

        <p>Important Notes:</p>
        <ul className="list-disc pl-4">
          <li>You can “only claim once per reward”</li>
          <li>
            Claims are “recorded on-chain or in our backend” for verification.
          </li>
          <li>
            If you choose DEX, ensure you understand how to manage blockchain
            wallets.
          </li>
          <li>Lost tokens due to incorrect addresses are “non-recoverable”.</li>
          <li>
            For CEX claims, Indexx manages all custody and record-keeping.
          </li>
        </ul>

        <p>Security Reminder:</p>
        <ul className="list-disc pl-4">
          <li>Never share your wallet private keys or seed phrases.</li>
          <li>Only use official Indexx DApp links for claiming.</li>
        </ul>
      </div>
    </div>
  );
}
