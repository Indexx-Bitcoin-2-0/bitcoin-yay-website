"use client";

import { useState } from "react";
import Image from "next/image";

import CustomButton from "@/components/CustomButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SearchIcon from "../../assets/images/search-icon.svg";
import CustomStyledConatiner from "@/components/CustomStyledContainer";

import faqData from "./data.json";

const CustomAccordionItem = ({ value, title, content }) => {
  return (
    <AccordionItem value={value} className="border-b-1 rounded-lg">
      <AccordionTrigger className="text-base font-semibold text-tertiary p-5 hover:no-underline cursor-pointer">
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-sx text-tertiary px-5">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
};

export default function support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("general");

  const categoryIndexs = {
    0: "general",
    1: "bitcoinyay",
    2: "pricing",
    3: "app",
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setSelectedCategory(categoryIndexs[index]);
  };

  return (
    <div className="container mx-auto max-w-[90vw] px-4 py-8">
      <CustomStyledConatiner>
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
        <div>
          <div className="flex md:gap-4 items-center mt-8">
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
      </CustomStyledConatiner>

      {/* Part 2 */}
      <div className="my-20">
        <Accordion type="single" collapsible className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {faqData[selectedCategory].map((faq, index) => (
              <div key={index}>
                <div className="border-1 border-bg2 rounded-lg">
                  <CustomAccordionItem
                    value={`item-${index}`}
                    title={faq.title}
                    content={faq.content}
                  />
                </div>
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
