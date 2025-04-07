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
import bgArtImage1 from "../../assets/images/bitcoin-art-2.png";

const faqsContent = [
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },
  {
    title: "What is Bitcoin Yay?",
    content:
      "Bitcoin Yay is a platform that provides real-time Bitcoin updates, market insights, and tools to help users navigate the crypto world.",
  },

  {
    title: "Is Bitcoin Yay free to use?",
    content:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    title: "Is it animated?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
  {
    title: "What is crypto diversification, and why is it important?",
    content:
      "Crypto diversification is the practice of spreading your investments across different cryptocurrencies to reduce risk. It is important because it helps mitigate the impact of poor performance from any single asset, allowing for a more stable overall portfolio.",
  },
];

const CustomAccordionItem = ({ value, title, content }) => {
  return (
    <AccordionItem value={value} className="border-b-1 rounded-lg">
      <AccordionTrigger className="text-base font-semibold text-tertiary p-5 hover:no-underline">
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  return (
    <div className="container mx-auto max-w-[90vw] px-4 py-8">
      <div className="lg:h-100 overflow-hidden border border-bg2 rounded-lg p-5 lg:p-15 w-full mt-10 mx-auto relative ">
        <Image
          src={bgArtImage1}
          alt="Background Art"
          className="absolute -z-10 -top-5 md:top-0 right-0 w-50 lg:w-100"
        />
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

      {/* Part 2 */}
      <div className="my-20">
        <Accordion type="single" collapsible className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {faqsContent.map((faq, index) => (
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
