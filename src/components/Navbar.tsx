"use client";

import { useState } from "react";
import Image from "next/image";
import BitcoinYayIcon from "../assets/images/main-logo.png";
import SearchIcon from "../assets/images/search-icon.svg";
import DownMenuIcon from "../assets/images/down-icon.svg";
import MenuIcon from "../assets/images/menu-icon.svg";

import {
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  Menubar,
  MenubarMenu,
} from "@/components/ui/menubar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(isSearchVisible);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 md:px-10 lg:px-20 py-8 ">
        <div className="flex justify-center bg-bg  ">
          <div className="flex justify-center items-center lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center mr-4 justify-center lg:hidden"
              aria-controls="navbar-menu"
              aria-expanded={isOpen}
            >
              <Image src={MenuIcon} alt="Menu Icon" width={30} height={30} />
            </button>
          </div>
          <a href="./" className="flex items-center space-x-3">
            <Image
              src={BitcoinYayIcon}
              alt="Logo"
              className="w-[165px] md:w-[270px] hover:scale-105 transition-transform duration-300"
              height={50}
            />
          </a>
        </div>
        <div
          className={`absolute left-0 top-20 w-full p-8 bg-bg shadow-lg transform z-20  ${
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
          <Accordion type="single" collapsible className=" mt-8">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="py-2 text-xl font-normal data-[state=open]:text-primary">
                Bitcoin Yay Blockchain
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <a className="block text-lg my-2 hover:text-primary">
                  Whiteapaper Chapter
                </a>
                <a className="block text-lg my-2 hover:text-primary">Roadmap</a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="py-2 text-xl font-normal data-[state=open]:text-primary">
                Community
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <a className="block text-lg my-2 hover:text-primary">
                  News & Blogs
                </a>
                <a className="block text-lg my-2 hover:text-primary">
                  Safety Center
                </a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-0">
              <a className="block text-xl py-2 ">Developers</a>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-0">
              <a href="/about" className="block text-xl py-2">
                About
              </a>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-0">
              <div className="cursor-pointer">
                <a
                  href="/support"
                  className="block text-lg my-2 hover:text-primary"
                >
                  Support
                </a>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="hidden lg:flex md:space-x-4 text-tertiary text-lg ">
          <Menubar className=" border-0 gap-8">
            <MenubarMenu>
              <MenubarTrigger className="text-tertiary font-normal text-lg p-0 hover:text-primary focus:bg-transparent focus:text-tertiary data-[state=open]:bg-transparent data-[state=open]:text-primary">
                Bitcoin Yay Blockchain <Image src={DownMenuIcon} alt="" />
              </MenubarTrigger>
              <MenubarContent className="w-80 bg-transparent rounded-2xl border-bg2 text-tertiary p-4">
                <MenubarItem className="hover:text-primary focus:text-primary focus:bg-transparent text-xl">
                  Whiteapaper Chapter
                </MenubarItem>
                <MenubarItem className="hover:text-primary focus:text-primary focus:bg-transparent text-xl">
                  Roadmap
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-tertiary font-normal text-lg p-0 hover:text-primary focus:bg-transparent focus:text-tertiary data-[state=open]:bg-transparent data-[state=open]:text-primary">
                Community <Image src={DownMenuIcon} alt="" />
              </MenubarTrigger>
              <MenubarContent className="w-68 bg-transparent rounded-2xl border-bg2 text-tertiary p-4">
                <MenubarItem className="hover:text-primary focus:text-primary focus:bg-transparent text-xl">
                  News & Blogs
                </MenubarItem>
                <MenubarItem className="hover:text-primary focus:text-primary focus:bg-transparent text-xl">
                  Safety Center
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <div className=" cursor-pointer">Developers</div>
            </MenubarMenu>
            <MenubarMenu>
              <a href="/about" className=" cursor-pointer">
                About
              </a>
            </MenubarMenu>
            <MenubarMenu>
              <a className=" cursor-pointer" href="/support">
                Support
              </a>
            </MenubarMenu>
          </Menubar>
        </div>
        <div
          className={`relative ${
            isSearchVisible ? "block" : "hidden"
          } lg:block`}
        >
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              id="search-navbar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-2 text-sm border border-[#2F2F2F] rounded-lg outline-none hover:border-primary focus:border-primary"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
              <Image
                src={SearchIcon}
                alt="Search Icon"
                width={20}
                height={20}
              />
            </button>
          </form>
        </div>
        <button
          type="button"
          onClick={toggleSearch}
          className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Search</span>
          <Image src={SearchIcon} alt="Search Icon" width={20} height={20} />
        </button>
      </div>
    </nav>
  );
}
