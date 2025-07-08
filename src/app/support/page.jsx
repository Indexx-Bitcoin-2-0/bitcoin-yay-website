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
import ContactForm from "@/components/ContactForm";

import SearchIcon1 from "@/assets/images/search-icon-1.svg";
import SearchIcon2 from "../../assets/images/search-icon-2.svg";
import CustomStyledConatiner from "@/components/CustomStyledContainer";
import ArtImage1 from "@/assets/images/support/art-1.svg";

import faqData from "./data.json";

export const metadata = {
  title: "Bitcoin Yay Support - Customer Help & Contact Information",
  description:
    "Get help with Bitcoin Yay. Find answers to common questions, contact our support team, and access resources for using our mobile mining app and BTCY cryptocurrency platform.",
  openGraph: {
    title: "Bitcoin Yay Support - Customer Help & Contact Information",
    description:
      "Get help with Bitcoin Yay. Find answers to common questions, contact our support team, and access resources for using our mobile mining app and BTCY cryptocurrency platform.",
  },
};

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
    <div className="container mx-auto max-w-[90vw] px-4 py-8 mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-6">
          Welcome to the FAQ & Support Page
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Follow these steps to find the right resources for your support needs.
        </p>
        {/* <form onSubmit={handleSearch} className="relative max-w-2xl my-6">
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
        </form> */}

        <form onSubmit={handleSearch} className="relative group max-w-2xl my-6">
          <input
            type="text"
            id="search-navbar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full h-15 p-5 text-lg text-tertiary border border-bg2 rounded-lg outline-none hover:border-primary focus:border-primary"
            placeholder="Search"
          />
          <button type="submit" className="absolute right-2 top-2 ">
            <Image
              src={SearchIcon1}
              alt="Search Icon"
              className="group-hover:hidden group-focus-within:hidden"
              width={44}
              height={44}
            />
            <Image
              src={SearchIcon2}
              alt="Search Icon"
              className="hidden group-hover:block group-focus-within:block mt-2 mr-2"
              width={30}
              height={30}
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

      <div id="contact-us">
        <div className="border border-bg2 rounded-lg p-5 lg:p-15 w-full mt-6 lg:mt-10 mx-auto flex flex-col lg:flex-row">
          <div className="flex-1">
            <h1 className="text-2xl md:text-5xl font-bold mt-6">Contact Us</h1>
            <p className="text-lg font-medium mt-6">
              Have a question or need help?
            </p>
            <p className="text-sm max-w-100 mt-2">
              We’re here to support you every step of the way. Whether it’s
              about your account, mining, referrals, or app features — reach out
              and we’ll get back to you as soon as possible.
            </p>
            <Image
              src={ArtImage1}
              alt="Wallet Art"
              className="w-full md:w-100 h-auto mt-20 flex items-center justify-center"
            />
          </div>
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
