"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import YingYangLogo from "@/assets/images/bible/blockchain/ying-yang-logo.webp";
import ArtImage1 from "@/assets/images/bible/blockchain/art-3.webp";
import ArtImage2 from "@/assets/images/bible/blockchain/art-4.webp";
import ArtImage3 from "@/assets/images/bible/blockchain/art-5.webp";
import ArtImage4 from "@/assets/images/bible/blockchain/art-6.webp";
import SearchIcon from "@/assets/images/search-icon-2.svg";
import DownloadButtonImage from "@/assets/images/buttons/download-button.webp";

import BlockchainFilterButtons from "@/components/BlockchainFIlterButtons";
import CustomButton2 from "@/components/CustomButton2";

const tempOps = [
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    transaction: "dfaklsmfd;lsmdf;laskdmflaasdfmlasdfaklsdfnm",
    type: "Payment",
    time: "5 Minutes ago",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    transaction: "dfaklsmfd;lsmdf;laskdmflaasdfmlasdfaklsdfnm",
    type: "Payment",
    time: "5 Minutes ago",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    transaction: "dfaklsmfd;lsmdf;laskdmflaasdfmlasdfaklsdfnm",
    type: "Payment",
    time: "5 Minutes ago",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    transaction: "dfaklsmfd;lsmdf;laskdmflaasdfmlasdfaklsdfnm",
    type: "Payment",
    time: "5 Minutes ago",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    transaction: "dfaklsmfd;lsmdf;laskdmflaasdfmlasdfaklsdfnm",
    type: "Payment",
    time: "5 Minutes ago",
  },
  {
    account: "DSKNCK",
    operation: "Pay",
    amount: "223.342",
    operationLink: "skjfnlasdnflaksdnflksadfl",
    transaction: "dfaklsmfd;lsmdf;laskdmflaasdfmlasdfaklsdfnm",
    type: "Payment",
    time: "5 Minutes ago",
  },
];

export default function DetailsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImage, setCurrentImage] = useState(ArtImage1);

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeChainType, setActveChainType] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedChainType, setSelectedChainType] = useState(0);

  useEffect(() => {
    switch (selectedCategory) {
      case 0:
        setCurrentImage(ArtImage1);
        break;
      case 1:
        setCurrentImage(ArtImage2);
        break;
      case 2:
        setCurrentImage(ArtImage3);
        break;
      case 3:
        setCurrentImage(ArtImage4);
        break;
      default:
        setCurrentImage(ArtImage1);
        break;
    }
  }, [selectedCategory]);

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
    <div className="container mx-auto mt-60 px-4 md:px-20 xl:px-0">
      <div className="flex flex-col items-center justify-center">
        <Image src={YingYangLogo} alt="logo" className="w-100" />
        <h1 className="mt-20 text-4xl md:text-6xl xl:text-8xl font-bold text-center">
          Bitcoin-Yay Blockchain Explorer
        </h1>
      </div>

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

      <div className="mt-40 flex items-center justify-center">
        <Image src={currentImage} alt="image" className="w-150" />
      </div>

      {/* Table  */}
      <div className="flex flex-col justify-center items-center max-w-440">
        <div className="mt-40 relative w-full">
          <div className="absolute top-4 right-4">
            <CustomButton2
              image={DownloadButtonImage}
              text="Export Data as CSV"
              link="#"
              imageStyling="w-20 md:w-24 lg:w-36"
            />
          </div>
          <div className="overflow-x-auto border border-secondary rounded-2xl p-4 md:p-8 ">
            <h3 className="text-3xl md:text-5xl xl:text-8xl font-bold">
              Payments
            </h3>

            <table className="mt-20 w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-secondary [&>th]:text-2xl [&>th]:md:text-3xl [&>th]:font-semibold [&>th]:text-left [&>th]:py-4">
                  <th>Account</th>
                  <th>Operation</th>
                  <th>Transaction</th>
                  <th>Type</th>
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
                    <td>{operation.transaction.substring(0, 16)}...</td>
                    <td>{operation.type}</td>
                    <td className="py-4 px-2">{operation.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
