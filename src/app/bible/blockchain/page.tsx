"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import YingYangLogo from "@/assets/images/bible/blockchain/ying-yang-logo.webp";
import YingYangLogo2 from "@/assets/images/bible/blockchain/ying-yang-logo-text.webp";
import ArtImage1 from "@/assets/images/bible/blockchain/art-1.webp";
import ArtImage2 from "@/assets/images/bible/blockchain/art-2.webp";
import SearchIcon from "@/assets/images/search-icon-2.svg";
import ViewAllButtonImage from "@/assets/images/buttons/view-all-button.webp";

import BlockchainFilterButtons from "@/components/BlockchainFIlterButtons";

const tempOps = [
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    time: "asdjkfnasdjkfnasjk",
  },
];

const tempTrans = [
  {
    id: "asdsadsfkjnfklasdnflaksndlfnasldfnas",
    blocks: "1323423423",
    Ops: "2",
    time: "as lasd falsdk fasd ",
  },
  {
    id: "asdsadsfkjnfklasdnflaksndlfnasldfnas",
    blocks: "1323423423",
    Ops: "2",
    time: "as lasd falsdk fasd ",
  },
  {
    id: "asdsadsfkjnfklasdnflaksndlfnasldfnas",
    blocks: "1323423423",
    Ops: "2",
    time: "as lasd falsdk fasd ",
  },
  {
    id: "asdsadsfkjnfklasdnflaksndlfnasldfnas",
    blocks: "1323423423",
    Ops: "2",
    time: "as lasd falsdk fasd ",
  },
];

const BlockchainPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeChainType, setActveChainType] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedChainType, setSelectedChainType] = useState(0);

  useEffect(() => {
    console.log(selectedCategory, selectedChainType);
  }, [selectedCategory, selectedChainType]);

  const categoryIndexs = {
    0: "Operations",
    1: "Payments",
    2: "Transaction",
    3: "Blocks",
  };

  const chainType = {
    0: "TestNet",
    1: "MainNet",
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCategoryButtonClick = (index: number) => {
    setActiveCategory(index);
    setSelectedCategory(index);
  };

  const handleChainTypeButtonClick = (index: number) => {
    setActveChainType(index);
    setSelectedChainType(index);
  };

  return (
    <div className="mt-40 px-4 py-8 max-w-screen overflow-hidden">
      {/* Part 1 */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-primary">Welcome to</p>
          <h1 className="text-4xl md:text-7xl font-semibold my-6">
            YingYang Blockchain
          </h1>
          <p className="text-lg max-w-150">
            Where ancient philosophy meets next-gen crypto. Powered by AI,
            governed by balance, and driven by you.
          </p>
        </div>
        <Image
          src={YingYangLogo}
          alt="Ying Yang Logo"
          className="mt-20 w-90 md:w-120 lg:w-160 xl:w-200"
        />
      </div>
      {/* Part 02 */}
      <div className="mt-40 container mx-auto">
        <form onSubmit={handleSearch} className="relative my-6">
          <input
            type="text"
            id="search-navbar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-12 lg:h-15 p-5 text-lg border border-[#2F2F2F] rounded-lg bg-bg2 outline-none focus:border-primary hover:border-primary placeholder:text-tertiary"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-5 top-3 ">
            <Image
              src={SearchIcon}
              alt="Search Icon"
              className="w-5 lg:w-8 h-5 lg:h-8"
            />
          </button>
        </form>
      </div>

      {/* Part 03 */}

      <div className="mt-40 container mx-auto">
        <BlockchainFilterButtons
          categoryIndexs={categoryIndexs}
          chainType={chainType}
          activeCategory={activeCategory}
          activeChainType={activeChainType}
          handleCategoryButtonClick={handleCategoryButtonClick}
          handleChainTypeButtonClick={handleChainTypeButtonClick}
        />
      </div>

      {/* Part 4 */}
      <div className="mt-60 container mx-auto flex flex-col items-center justify-center text-center">
        <p className="text-2xl font-bold text-primary">What is</p>
        <h3 className="text-4xl md:text-5xl font-semibold my-6">
          YingYang Blockchain
        </h3>
        <div className="my-10 flex items-center justify-center">
          <Image
            src={YingYangLogo2}
            alt="Ying Logo"
            className="w-80 md:w-120 lg:w-200 2xl:w-320 "
          />
        </div>
        <p className="text-base max-w-160 mt-10 text-tertiary">
          <strong>Balance in Motion.</strong> At its core, YinYang Blockchain
          channels the dual forces of Yin (passive, efficient) and Yang (active,
          secure) into a dynamic, AI-optimized ecosystem. It’s a philosophy
          turned into code — balancing off-chain speed with on-chain security,
          all seamlessly managed by artificial intelligence.
        </p>
      </div>

      {/* Part 05 */}
      <div className="container mx-auto">
        <div className=" border-2 border-secondary rounded-lg mt-40 p-4 md:p-8 max-w-260">
          <h2 className="text-4xl md:text-6xl xl:text-8xl font-bold">
            Mainnet metrics
          </h2>
          <div className="text-lg mt-10 flex flex-col items-center justify-center w-full">
            <div className="flex justify-between w-full mb-6">
              <p>Migrated Mining Rewards (R)</p>
              <p>7,147,544,668.845</p>
            </div>
            <div className="flex justify-between w-full mb-6">
              <p>Currently Locked Mining Rewards</p>
              <p>7,147,544,668.845</p>
            </div>
            <div className="flex justify-between w-full mb-6">
              <p>Currently Unlocked Mining Rewards</p>
              <p>7,147,544,668.845</p>
            </div>
            <div className="flex justify-between w-full mb-6">
              <p>Circulating Supply</p>
              <p>7,147,544,668.845</p>
            </div>
            <div className="flex justify-between w-full mb-6">
              <p>Circulating Supply</p>
              <p>7,147,544,668.845</p>
            </div>{" "}
            <div className="flex justify-between w-full mb-6">
              <p>Circulating Supply</p>
              <p>7,147,544,668.845</p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 06 */}

      <div className="container mx-auto mt-40 relative">
        <Link href={"#"}>
          <Image
            src={ViewAllButtonImage}
            alt="view all"
            className="w-20 md:w-24 lg:w-36 hover:scale-105 cursor-pointer absolute top-4 right-4"
          />
        </Link>
        <div className="overflow-x-auto border border-secondary rounded-2xl p-4 md:p-8 ">
          <h3 className="text-3xl md:text-5xl font-bold">Latest Operations</h3>

          <table className="mt-10 w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-secondary [&>th]:text-2xl [&>th]:md:text-3xl [&>th]:font-semibold [&>th]:text-left [&>th]:py-4">
                <th>Account</th>
                <th>Operation</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="py-4 text-base md:text-xl">
              {tempOps.map((operation, index) => (
                <tr key={index} className="">
                  <td className="py-2 md:py-4 px-2">
                    <div className="w-40 md:w-60 border border-primary rounded-full px-6 py-2 flex justify-center items-center">
                      <p className=" text-primary">{operation.account}</p>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    {operation.operation} {operation.amount} to{" "}
                    <a
                      href={operation.operationLink}
                      className="underline underline-offset-2 hover:text-primary"
                    >
                      {operation.operationLink.substring(0, 10)}...
                    </a>
                  </td>

                  <td className="py-4 px-2">{operation.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 07 */}
      <div className="mt-60 container mx-auto flex flex-col lg:flex-row lg:justify-end relative">
        <div className="lg:w-1/2">
          <Image
            src={ArtImage1}
            alt="art"
            className="lg:absolute top-0 lg:-left-100"
          />
        </div>
        <div className="lg:w-1/2 relative">
          <Link href={"#"}>
            <Image
              src={ViewAllButtonImage}
              alt="view all"
              className="w-20 md:w-24 lg:w-36 hover:scale-105 cursor-pointer absolute top-4 right-4"
            />
          </Link>
          <div className="overflow-x-auto border border-secondary rounded-2xl p-4 md:p-8">
            <h3 className="text-3xl md:text-5xl font-bold">
              Latest Transactions
            </h3>

            <table className="mt-10 w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-secondary [&>th]:text-2xl [&>th]:md:text-3xl [&>th]:font-semibold [&>th]:text-left [&>th]:py-4">
                  <th>#</th>
                  <th>Blocks</th>
                  <th>Ops</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody className="py-4 text-base md:text-xl">
                {tempTrans.map((operation, index) => (
                  <tr key={index} className="">
                    <td className="py-4 px-2 underline underline-offset-2">
                      {operation.id.substring(0, 6)}...
                    </td>
                    <td className="py-4 px-2">{operation.blocks}</td>
                    <td className="py-4 px-2">{operation.Ops}</td>
                    <td className="py-4 px-2">{operation.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Part 08 */}
      <div className="container mx-auto mt-160 mb-100 flex flex-col lg:flex-row lg:justify-start relative">
        <div className="lg:w-1/2 relative">
          <Link href={"#"}>
            <Image
              src={ViewAllButtonImage}
              alt="view all"
              className="w-20 md:w-24 lg:w-36 hover:scale-105 cursor-pointer absolute top-4 right-4"
            />
          </Link>
          <div className="overflow-x-auto border border-secondary rounded-2xl p-4 md:p-8">
            <h3 className="text-3xl md:text-5xl font-bold">
              Latest Transactions
            </h3>

            <table className="mt-10 w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-secondary [&>th]:text-2xl [&>th]:md:text-3xl [&>th]:font-semibold [&>th]:text-left [&>th]:py-4">
                  <th>#</th>
                  <th>Blocks</th>
                  <th>Ops</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody className="py-4 text-base md:text-xl">
                {tempTrans.map((operation, index) => (
                  <tr key={index} className="">
                    <td className="py-4 px-2 underline underline-offset-2">
                      {operation.id.substring(0, 6)}...
                    </td>
                    <td className="py-4 px-2">{operation.blocks}</td>
                    <td className="py-4 px-2">{operation.Ops}</td>
                    <td className="py-4 px-2">{operation.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            src={ArtImage2}
            alt="art"
            className="lg:absolute top-0 lg:-right-80"
          />
        </div>
      </div>
    </div>
  );
};

export default BlockchainPage;
