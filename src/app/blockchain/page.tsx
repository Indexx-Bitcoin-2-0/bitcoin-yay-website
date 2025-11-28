"use client";

import YingYangLogo from "@/assets/images/blockchain/yingyang-logo.svg";
import YingLogo from "@/assets/images/blockchain/ying.svg";
import YangLogo from "@/assets/images/blockchain/yang.svg";
import Art1 from "@/assets/images/blockchain/art-1.svg";
import Art2 from "@/assets/images/home/art-2.svg";
import Art3 from "@/assets/images/blockchain/art-2.svg";
import YingYangBB from "@/assets/images/blockchain/yingyang-bb.svg";
import BitcoinLogo from "@/assets/images/blockchain/bitcoin-logo.svg";
import BitcoinYayLogo from "@/assets/images/logo.svg";
import BalancerLogo from "@/assets/images/blockchain/balancer-logo.svg";
import Image from "next/image";
import DisclaimerComponent from "@/components/DisclaimerComponent";

const BlockchainPage = () => {
  return (
    <div className="mt-40 container mx-auto px-4 py-8">
      {/* Part 1 */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-primary">Welcome to</p>
          <h1 className="text-4xl md:text-7xl font-semibold my-6">
          bitcoin-yay Blockchain
          </h1>
          <p className="text-lg max-w-150">
            Where ancient philosophy meets next-gen crypto. Powered by AI,
            governed by balance, and driven by you.
          </p>
        </div>
        <Image src={YingYangLogo} alt="Ying Yang Logo" className="mt-20" />
      </div>

      {/* Part 2 */}
      <div className="mt-80 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-primary">What is</p>
        <h3 className="text-4xl md:text-5xl font-semibold my-6">
        bitcoin-yay Blockchain
        </h3>
        <div className="my-10 flex flex-col md:flex-row items-center justify-center">
          <Image
            src={YingLogo}
            alt="Ying Logo"
            className="w-80 lg:w-100 2xl:w-auto "
          />
          <Image
            src={YangLogo}
            alt="Yang Logo"
            className="w-80 lg:w-100 2xl:w-auto "
          />
        </div>
        <p className="text-base max-w-160 mt-10 text-tertiary">
          <strong>Balance in Motion.</strong> At its core, bitcoin-yay Blockchain
          channels the dual forces of Yin (passive, efficient) and Yang (active,
          secure) into a dynamic, AI-optimized ecosystem. It’s a philosophy
          turned into code — balancing off-chain speed with on-chain security,
          all seamlessly managed by artificial intelligence.
        </p>
      </div>

      {/* Part 03 */}
      <div className="relative -mx-4 mt-60 w-screen left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
        <Image src={Art1} alt="art-image" className="w-full" />
        <Image
          src={Art2}
          alt="art-image"
          className="-mt-24 md:-mt-40 lg:-mt-100 w-1/2 max-w-120"
        />
      </div>

      {/* Part 04 */}
      <div className="mt-80 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-primary">bitcoin-yay</p>
        <h3 className="text-4xl md:text-5xl font-semibold my-6">
          Philosophy in Blockchain
        </h3>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Image src={Art3} alt="art-image" className="w-full" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col gap-4 mt-20 lg:mt-[80%] max-w-150 text-left text-[#797979]">
              <div className="flex flex-col md:flex-row">
                <Image
                  src={YingYangLogo}
                  alt="Ying Yang Logo"
                  className="w-10 h-10"
                />
                <p className="md:pl-4 mt-4 md:mt-0">
                  <strong className="text-tertiary">
                    Yin and Yang Relationship:
                  </strong>{" "}
                  Just as Bitcoin and bitcoin-yay complement each other, so too
                  should every component of the blockchain operate with duality
                  in mind — one supports or balances the other.
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <Image
                  src={BalancerLogo}
                  alt="Balancer Logo"
                  className="w-10 h-10"
                />
                <p className="md:pl-4 mt-4 md:mt-0 ">
                  <strong className="text-tertiary">
                    AI as the Balancer:{" "}
                  </strong>
                  AI decides when to activate Yin (passive, stable, off-chain)
                  and Yang (active, aggressive, on-chain) processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 05 */}
      <div className="mt-80 md:px-20 flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-primary">
          Bitcoin / Bitcoin-YAY as{" "}
        </p>
        <h3 className="text-4xl md:text-5xl font-semibold my-6">Ying & Yang</h3>
        <Image src={YingYangBB} alt="Ying Yang Logo" />
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 mt-20 max-w-150 text-left text-[#797979] ">
            <div className="flex flex-col md:flex-row">
              <Image
                src={BitcoinLogo}
                alt="Ying Yang Logo"
                className="w-10 h-10"
              />
              <p className="md:pl-4 mt-4 md:mt-0 ">
                <strong className="text-tertiary">Bitcoin</strong> represents
                the stable, established, store-of-value component (Yin).
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <Image
                src={BitcoinYayLogo}
                alt="Balancer Logo"
                className="w-10 h-10"
              />
              <p className="md:pl-4 mt-4 md:mt-0 ">
                <strong className="text-tertiary"> bitcoin-yay (BTCY) </strong>
                represents the innovative, fast-moving, user-centric governance
                and mining coin (Yang).
              </p>
            </div>
            <p className="md:pl-4 mt-8">
              Together, they form a dynamic duality, powering and stabilizing
              the ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Part 06 */}
      <DisclaimerComponent />
    </div>
  );
};

export default BlockchainPage;
