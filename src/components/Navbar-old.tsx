"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import BitcoinYayIcon from "../assets/images/main-logo.svg";
import SearchIcon from "../assets/images/search-icon.svg";
import DownMenuIcon from "../assets/images/down-icon.svg";
import MenuIcon from "../assets/images/menu-icon.svg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [bitcoinDropdownOpen, setBitcoinDropdownOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const bitcoinDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const communityDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleBitcoinMouseEnter = () => {
    clearTimeout(bitcoinDropdownTimeout.current as NodeJS.Timeout);
    setBitcoinDropdownOpen(true);
  };

  const handleBitcoinMouseLeave = () => {
    bitcoinDropdownTimeout.current = setTimeout(() => {
      setBitcoinDropdownOpen(false);
    }, 150);
  };

  const handleBitcoinContentMouseEnter = () => {
    clearTimeout(bitcoinDropdownTimeout.current as NodeJS.Timeout);
  };

  const handleBitcoinContentMouseLeave = () => {
    bitcoinDropdownTimeout.current = setTimeout(() => {
      setBitcoinDropdownOpen(false);
    }, 150);
  };

  const handleCommunityMouseEnter = () => {
    clearTimeout(communityDropdownTimeout.current as NodeJS.Timeout);
    setCommunityDropdownOpen(true);
  };

  const handleCommunityMouseLeave = () => {
    communityDropdownTimeout.current = setTimeout(() => {
      setCommunityDropdownOpen(false);
    }, 150);
  };

  const handleCommunityContentMouseEnter = () => {
    clearTimeout(communityDropdownTimeout.current as NodeJS.Timeout);
  };

  const handleCommunityContentMouseLeave = () => {
    communityDropdownTimeout.current = setTimeout(() => {
      setCommunityDropdownOpen(false);
    }, 150);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-bg relative">
      {isOpen && (
        <div
          className="fixed top-[96px] inset-x-0 bottom-0 bg-black/30 backdrop-blur-sm z-10"
          onClick={closeMobileMenu}
        />
      )}
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:px-10 lg:px-20 py-8 ">
        <div className="flex justify-center bg-bg  ">
          <div className="flex justify-center items-center xl:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center mr-4 justify-center xl:hidden"
              aria-controls="navbar-menu"
              aria-expanded={isOpen}
            >
              <Image src={MenuIcon} alt="Menu Icon" width={30} height={30} />
            </button>
          </div>
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={BitcoinYayIcon}
              alt="Logo"
              className="w-[165px] md:w-[270px] hover:scale-105 transition-transform duration-300"
              height={50}
            />
          </Link>
        </div>
        <div
          className={`absolute left-0 top-24 w-full p-8 bg-bg shadow-lg transform z-20  ${
            isOpen ? "translate-y-0 " : "-translate-y-[130%]"
          }`}
        >
          <div className="">
            <form
              onSubmit={handleSearch}
              className="relative border-primary focus-within:border-0"
            >
              <input
                type="text"
                id="search-navbar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block h-15 w-full p-3 text-lg text-tertiary bg-transparent border border-[#2F2F2F] rounded-lg focus:border-primary hover:border-primary outline-none"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 mt-2 mr-2"
              >
                <Image
                  src={SearchIcon}
                  alt="Search Icon"
                  width={30}
                  height={30}
                />
              </button>
            </form>
          </div>
          <Accordion
            type="single"
            collapsible
            className=" mt-8 flex flex-col gap-8"
          >
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="py-2 text-xl font-normal data-[state=open]:text-primary">
                Bitcoin-Yay Blockchain
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <Link
                  href="/blockchain"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Bitcoin-Yay Blockchain
                </Link>
                <Link
                  href="/coming-soon"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Block Explore
                </Link>
                <Link
                  href="/whitepaper"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Whiteapaper Chapter
                </Link>
                <Link
                  href="/roadmap"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Roadmap
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="py-2 text-xl font-normal data-[state=open]:text-primary">
                Community
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <Link
                  href="/blogs"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  News & Blogs
                </Link>
                <Link
                  href="/safety-center"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Safety Center
                </Link>
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-3" className="border-0">
              <Link
                href="#"
                className="block text-xl py-2 "
                onClick={closeMobileMenu}
              >
                Developers
              </Link>
            </AccordionItem> */}
            <AccordionItem value="item-4" className="border-0">
              <Link
                href="/about"
                className="block text-xl py-2"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-0">
              <div className="cursor-pointer">
                <Link
                  href="/support"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Support
                </Link>
              </div>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-0">
              <div className="cursor-pointer">
                <Link
                  href="/pricing"
                  className="block text-lg my-2 hover:text-primary"
                  onClick={closeMobileMenu}
                >
                  Pricing
                </Link>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="hidden xl:flex md:space-x-4 text-tertiary text-lg">
          <div className=" border-0 gap-8 flex">
            <div
              className="group "
              onMouseEnter={handleBitcoinMouseEnter}
              onMouseLeave={handleBitcoinMouseLeave}
            >
              <button
                className={`flex cursor-pointer font-normal text-sm p-0 hover:text-primary ${
                  bitcoinDropdownOpen ? "text-primary" : "text-tertiary"
                }`}
              >
                Bitcoin-Yay Blockchain
                <Image src={DownMenuIcon} alt="" width={20} />
              </button>
              {bitcoinDropdownOpen && (
                <div
                  className="absolute left-0 mt-6 w-full rounded-2xl border-1 border-bg2 bg-bg1 text-tertiary p-8 z-10"
                  onMouseEnter={handleBitcoinContentMouseEnter}
                  onMouseLeave={handleBitcoinContentMouseLeave}
                >
                  <div className="flex flex-col gap-4 my-6 ml-[35%] w-fit">
                    <Link
                      href="/blockchain"
                      className="block hover:text-primary focus:text-primary focus:bg-transparent text-xl"
                    >
                      Bitcoin-Yay Blockchain
                    </Link>
                    <Link
                      href="/coming-soon"
                      className="block hover:text-primary focus:text-primary focus:bg-transparent text-xl"
                    >
                      Block Explore
                    </Link>
                    <Link
                      href="/whitepaper"
                      className="block hover:text-primary focus:text-primary focus:bg-transparent text-xl"
                    >
                      Whiteapaper Chapter
                    </Link>
                    <Link
                      href="/roadmap"
                      className="block hover:text-primary focus:text-primary focus:bg-transparent text-xl"
                    >
                      Roadmap
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div
              className="group"
              onMouseEnter={handleCommunityMouseEnter}
              onMouseLeave={handleCommunityMouseLeave}
            >
              <button
                className={`flex cursor-pointer font-normal text-sm p-0 hover:text-primary ${
                  communityDropdownOpen ? "text-primary" : "text-tertiary"
                }`}
              >
                Community <Image src={DownMenuIcon} alt="" width={20} />
              </button>
              {communityDropdownOpen && (
                <div
                  className="absolute left-0 mt-4 w-full rounded-2xl border-1 border-bg2 bg-bg1 text-tertiary p-8 z-10"
                  onMouseEnter={handleCommunityContentMouseEnter}
                  onMouseLeave={handleCommunityContentMouseLeave}
                >
                  <div className="flex flex-col gap-4 my-6 ml-[46%] w-fit">
                    <Link
                      href="/blogs"
                      className="block hover:text-primary focus:text-primary focus:bg-transparent text-xl"
                    >
                      News & Blogs
                    </Link>
                    <Link
                      href="/safety-center"
                      className="block hover:text-primary focus:text-primary focus:bg-transparent text-xl"
                    >
                      Safety Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className={`cursor-pointer font-normal text-sm p-0 hover:text-primary ${
                pathname === "/about" ? "text-primary" : "text-tertiary"
              }`}
            >
              About
            </Link>
            <Link
              className={`cursor-pointer font-normal text-sm p-0 hover:text-primary ${
                pathname === "/support" ? "text-primary" : "text-tertiary"
              }`}
              href="/support"
            >
              Support
            </Link>
            <Link
              className={`cursor-pointer font-normal text-sm p-0 hover:text-primary ${
                pathname === "/pricing" ? "text-primary" : "text-tertiary"
              }`}
              href="/pricing"
            >
              Pricing
            </Link>
          </div>
        </div>
        <div className={`relative hidden xl:block`}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              id="search-navbar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-80 h-15 p-2 text-lg text-tertiary border border-[#2F2F2F] rounded-lg outline-none hover:border-primary focus:border-primary"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-2 top-2 mt-2 mr-2">
              <Image
                src={SearchIcon}
                alt="Search Icon"
                width={30}
                height={30}
              />
            </button>
          </form>
        </div>
        {/* <button
          type="button"
          onClick={toggleSearch}
          className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Search</span>
          <Image src={SearchIcon} alt="Search Icon" width={20} height={20} />
        </button> */}
      </div>
    </nav>
  );
}
