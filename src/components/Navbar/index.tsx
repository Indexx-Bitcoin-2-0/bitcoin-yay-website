"use client";

import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/main-logo.svg";
import SearchIcon from "@/assets/images/search-icon.svg";
import Data from "./data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Types for better type safety
interface LinkItem {
  name: string;
  href: string;
}

interface DropdownSection {
  heading: string;
  mainList?: boolean;
  links: LinkItem[];
}

interface HeaderItem {
  mainTextDesktop: string;
  mainTextMob: string;
  active: boolean;
  href: string;
  hasMegaDrop: boolean;
  dropDownContent: DropdownSection[];
}

// Extract backdrop component for readability
const Backdrop = memo(({ visible }: { visible: boolean }) => (
  <div
    className={`fixed left-0 w-full top-30 z-[10] backdrop-blur-md transition-opacity duration-300 delay-100 bg-black/50 ${
      visible ? "opacity-100 h-screen" : "opacity-0 h-0"
    }`}
  />
));

Backdrop.displayName = "Backdrop";

// Extract logo component
const Logo = () => (
  <div className="">
    <Link href="/" className="">
      <Image
        src={logo}
        alt="logo"
        className="w-[165px] md:w-[270px] hover:scale-105 transition-transform duration-300"
      />
    </Link>
  </div>
);

// Extract dropdown link component
const DropdownLink = memo(
  ({ link, isMainList }: { link: LinkItem; isMainList?: boolean }) => (
    <li className="list-none flex flex-col text-left my-2">
      <Link
        href={link.href}
        className={`${
          isMainList ? "text-[25px] font-semibold" : "text-xs"
        } text-tertiary block relative after:absolute after:left-0 after:-bottom-1 after:w-5 after:h-[3px] after:bg-primary after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300`}
      >
        {link.name}
      </Link>
    </li>
  )
);

DropdownLink.displayName = "DropdownLink";

// Main component
const Navbar: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [headerData] = useState<HeaderItem[]>(Data);
  const [backdropVisibility, setBackdropVisibility] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Optimized resize handler with debounce
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 1024;
      setIsMobile(mobileView);
      if (!mobileView && menuOpen) {
        setMenuOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [menuOpen]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setBackdropVisibility(true);
    }, 200);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setBackdropVisibility(false);
    }, 200);
  }, [isMobile]);

  const updateBackDropVisibility = useCallback(
    (type: string) => {
      if (type === "enter") handleMouseEnter();
      if (type === "leave") handleMouseLeave();
    },
    [handleMouseEnter, handleMouseLeave]
  );

  const toggleMobileMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Initial check for dropdown visibility
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setBackdropVisibility(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="w-full bg-bg fixed top-0 left-0 right-0 z-50">
      <div className="relative flex items-center justify-between h-[150px] px-4 lg:px-[100px] mx-auto">
        {/* {!isMobile && <Backdrop visible={backdropVisibility} />}
        {isMobile && <Backdrop visible={menuOpen} />} */}

        <div className="flex items-center justify-between w-full lg:justify-start lg:w-auto">
          <Logo />

          {/* Mobile menu toggle button */}
          <button
            className="flex lg:hidden text-secondry"
            onClick={toggleMobileMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <ul className="inline-flex my-0 flex-1">
            {headerData.map((element, idx) => (
              <li
                key={idx}
                className="list-none p-[9px_15px] group"
                onMouseEnter={() =>
                  updateBackDropVisibility(!element.hasMegaDrop ? "" : "enter")
                }
                onMouseLeave={() =>
                  updateBackDropVisibility(!element.hasMegaDrop ? "" : "leave")
                }
              >
                <Link
                  href={element.href}
                  className={`text-tertiary text-sm font-normal transition-all duration-300 hover:text-primary ${
                    element.active ? "text-primary" : ""
                  } group-hover:text-primary`}
                  onMouseEnter={() =>
                    updateBackDropVisibility(
                      !element.hasMegaDrop ? "" : "enter"
                    )
                  }
                  aria-expanded={
                    element.hasMegaDrop ? backdropVisibility : undefined
                  }
                >
                  {element.mainTextDesktop}
                </Link>

                {element.hasMegaDrop && (
                  <div
                    className="absolute left-0 w-full bg-[#161617] h-auto z-[10] pt-0 pr-[30px] pb-[50px] pl-0 top-30 opacity-0 invisible transition-all duration-100 delay-300 group-hover:opacity-100 group-hover:visible"
                    ref={elementRef}
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <div className="flex w-full justify-between h-auto my-10 px-[20px] pl-[210px]">
                      {element.dropDownContent.map((section, elemIdx) => (
                        <div
                          className="w-[calc(25%-30px)] leading-[35px] flex flex-col"
                          key={elemIdx}
                        >
                          <header className="text-xs font-medium my-6">
                            {section.heading}
                          </header>
                          <ul
                            className={section.mainList ? "main" : ""}
                            role="menu"
                          >
                            {section.links.map((link, linkIdx) => (
                              <DropdownLink
                                key={linkIdx}
                                link={link}
                                isMainList={section.mainList}
                              />
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="w-[calc(25%-30px)] leading-[35px]" />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Search Input (Desktop) */}
        <div className="hidden xl:block">
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

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-30 w-full p-8 bg-bg shadow-lg transform z-20 ${
            menuOpen ? "translate-y-0" : "-translate-y-[130%]"
          }  lg:hidden`}
        >
          {/* Search Input (Mobile) */}
          <div className="mb-6">
            <form
              onSubmit={handleSearch}
              className="relative border-primary focus-within:border-0"
            >
              <input
                type="text"
                id="search-navbar-mobile"
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
            className="mt-8 flex flex-col gap-8"
          >
            {headerData.map((element, idx) =>
              element.hasMegaDrop ? (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-0"
                >
                  <AccordionTrigger className="py-2 text-xl font-normal data-[state=open]:text-primary">
                    {element.mainTextMob}
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    {element.dropDownContent.map((section, sectionIdx) => (
                      <div key={sectionIdx} className="mb-6">
                        <header className="text-sm font-medium text-muted-foreground mb-3 pb-2">
                          {section.heading}
                        </header>
                        <div className="">
                          {section.links.map((link, linkIdx) => (
                            <Link
                              key={linkIdx}
                              href={link.href}
                              className={`block text-lg my-3 hover:text-primary ${
                                section.mainList ? "font-bold text-xl" : ""
                              }`}
                              onClick={closeMobileMenu}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-0"
                >
                  <Link
                    href={element.href}
                    className="block text-xl py-2 hover:text-primary"
                    onClick={closeMobileMenu}
                  >
                    {element.mainTextMob}
                  </Link>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
