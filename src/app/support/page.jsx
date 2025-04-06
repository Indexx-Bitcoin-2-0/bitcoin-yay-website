"use client";

import { useState } from "react";
import Image from "next/image";

import CustomButton from "@/components/CustomButton";

import SearchIcon from "../../assets/images/search-icon.svg";
import bgArtImage1 from "../../assets/images/bitcoin-art-2.png";

export default function support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  return (
    <div className="constainer mx-auto max-w-[90vw] px-4 py-8">
      <div
        className="border border-bg2 rounded-lg p-5 lg:p-15 w-full mt-10 mx-auto relative bg-[120px_-80px] md:bg-[400px_-100px] lg:bg-[1100px_-100px] bg-size-[250px_auto] md:bg-size-[300px_auto] lg:bg-size-[540px_auto] bg-no-repeat"
        style={{
          backgroundImage: `url(${bgArtImage1.src})`,
        }}
      >
        <h1 className="text-2xl md:text-5xl font-bold mt-6">
          Welcome to the FAQ & Support Page
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Follow these steps to find the right resources for your support needs.
        </p>
        <form onSubmit={handleSearch} className="relative max-w-2xl my-6">
          <input
            type="text"
            id="search-navbar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-12 lg:h-15 p-5 text-lg border border-[#2F2F2F] rounded-lg bg-[#B7B7B733]"
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
        <div>
          <div className="flex flex-wrap gap-4 items-center mt-8">
            {["General", "Bitcoin Yay", "Pricing", "App"].map(
              (category, index) => (
                <CustomButton
                  key={index}
                  index={index}
                  text={category}
                  handleButtonClick={handleButtonClick}
                  isActive={activeButton === index}
                />
              )
            )}
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
