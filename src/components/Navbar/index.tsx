"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
  Suspense,
} from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/main-logo.svg";
import ProfileIcon from "@/assets/images/profile-icon.webp";
import Data from "./data";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import RegisterPopup from "@/components/RegisterPopup";
import ReferralHandler from "@/components/ReferralHandler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PopupArt1 from "@/assets/images/popup/attention.webp";
import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
import ThumbsUpButtonImage from "@/assets/images/buttons/thumbs-up-button.webp";

import CustomButton2 from "@/components/CustomButton2";
import PopupComponent from "@/components/PopupComponent";

// Types for better type safety
interface LinkItem {
  name: string;
  href: string;
  openInNewTab?: boolean;
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
  openInNewTab?: boolean;
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
      <a
        href={link.href}
        target={link.openInNewTab ? "_blank" : undefined}
        className={`${
          isMainList ? "text-[25px] font-semibold" : "text-xs mt-4"
        } text-tertiary block relative after:absolute after:left-0 after:-bottom-1 after:w-5 after:h-[3px] after:bg-primary after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300`}
      >
        {link.name}
      </a>
    </li>
  )
);

DropdownLink.displayName = "DropdownLink";

// Main component
const Navbar: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [headerData, setHeaderData] = useState<HeaderItem[]>(Data);
  const [backdropVisibility, setBackdropVisibility] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();

  // Auth related states
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const handleReferralDetected = useCallback((code: string) => {
    setReferralCode(code);
    setIsRegisterPopupOpen(true);
  }, []);

  // Update the active item
  useEffect(() => {
    if (currentPath == "/coming-soon") {
      setHeaderData(Data);
      return;
    }
    const updatedHeaderData = headerData.map((item) => {
      const currentActivePath: string[] = [];
      currentActivePath.push(item.href);
      item.dropDownContent.forEach((section) => {
        currentActivePath.push(...section.links.map((link) => link.href));
      });

      return {
        ...item,
        active: currentActivePath.includes(currentPath),
      };
    });

    setHeaderData(updatedHeaderData);
  }, [currentPath]);

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

  // Auth handlers
  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
  };

  const handleRegisterSuccess = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
  };

  const handleLogout = () => {
    logout();
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Check if popup should be shown
  useEffect(() => {
    const checkPopupTiming = () => {
      const lastPopupClosed = localStorage.getItem("bitcoinYayPopupLastClosed");
      const now = new Date().getTime();

      if (!lastPopupClosed) {
        setIsPopupOpen(true);
      } else {
        const lastClosedTime = parseInt(lastPopupClosed);
        const timeDifference = now - lastClosedTime;
        const thirtyMinutesInMs = 30 * 60 * 1000; // 30 minutes in milliseconds

        if (timeDifference >= thirtyMinutesInMs) {
          setIsPopupOpen(true);
        }
      }
    };

    checkPopupTiming();
  }, []);

  // Handle popup close
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    // Store current time in localStorage
    localStorage.setItem(
      "bitcoinYayPopupLastClosed",
      new Date().getTime().toString()
    );
  };

  return (
    <nav className="w-full bg-bg fixed top-0 left-0 right-0 z-50">
      {/* Referral Handler with Suspense boundary */}
      <Suspense fallback={null}>
        <ReferralHandler onReferralDetected={handleReferralDetected} />
      </Suspense>

      <PopupComponent isOpen={isPopupOpen} onClose={handlePopupClose}>
        {/* <div className="mt-10 mx-2 md:mx-4 flex flex-col items-center justify-center w-90 md:w-120 xl:w-140 relative">
          <Image src={PopupArt1} alt="Popup Art 1" className="w-full" />
          <Link
            href="/airdrop"
            onClick={handlePopupClose}
            className="mb-10 mt-4"
          >
            <CustomButton2
              image={RegisterButtonImage}
              text={"REGISTER NOW!"}
              link="/airdrop"
              imageStyling="w-20 md:w-30"
            />
          </Link>
        </div> */}

        <div className="mt-10 mx-2 px-10 flex flex-col items-center justify-center w-90 md:w-120 xl:w-140 relative">
          <Image src={PopupArt1} alt="Popup Art 1" className="w-30 md:w-40" />
          <h1 className="mt-4 text-3xl xl:text-4xl text-center font-bold text-[#5000AD]">
            “Notice”
          </h1>
          <p className="mt-4 text-lg xl:text-xl font-light text-center">
            All features are in beta and subject to change. Your feedback helps
            us improve. Please let us know via our Contact Us page.
          </p>
          <div className="flex gap-20 my-4 xl:my-8">
            <CustomButton2
              image={ThumbsUpButtonImage}
              text={"Got it"}
              onClick={() => handlePopupClose()}
              imageStyling="w-20 lg:w-24"
            />
            <CustomButton2
              image={RegisterButtonImage}
              text={"Contact Us"}
              link="/support/#contact-us"
              imageStyling="w-20 lg:w-24"
            />
          </div>
        </div>
      </PopupComponent>

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
                <a
                  href={element.href}
                  target={element.openInNewTab ? "_blank" : undefined}
                  className={`text-sm font-normal transition-all duration-300 hover:text-primary ${
                    element.active ? "text-primary" : "text-tertiary"
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
                </a>

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
                          className={`w-[calc(25%-30px)] leading-[35px] flex flex-col ${
                            section.mainList &&
                            element.mainTextDesktop !== "Eco"
                              ? "min-w-100"
                              : "min-w-60"
                          }`}
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

        {/* Auth Section (Desktop) */}
        <div className="hidden lg:block">
          {isAuthenticated && user ? (
            <div className="text-sm font-normal transition-all duration-300 flex gap-10">
              <button
                onClick={handleLogout}
                className="hover:text-primary text-tertiary cursor-pointer"
              >
                Logout
              </button>
              <div className="flex items-center gap-2">
                <Image src={ProfileIcon} alt="Profile Icon" className="w-14" />
                <span className="text-tertiary">{user.email}</span>
              </div>
            </div>
          ) : (
            <div className="text-sm font-normal transition-all duration-300 flex gap-10">
              <button
                onClick={() => setIsLoginPopupOpen(true)}
                className="hover:text-primary text-tertiary cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setIsRegisterPopupOpen(true)}
                className="hover:text-primary text-tertiary cursor-pointer"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-26 w-full p-8 bg-bg shadow-lg transform z-20 ${
            menuOpen ? "translate-y-0" : "-translate-y-[130%]"
          }  lg:hidden max-h-[calc(100vh-150px)] overflow-y-auto`}
        >
          {/* Auth Section (Mobile) */}
          <div className="mb-6">
            {isAuthenticated && user ? (
              <div className="text-xl lg:text-sm font-normal transition-all duration-300 flex flex-col items-center justify-center w-full gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={ProfileIcon}
                    alt="Profile Icon"
                    className="w-14"
                  />
                  <span className="text-tertiary">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="hover:text-primary text-tertiary cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-xl lg:text-sm font-normal transition-all duration-300 flex items-center justify-center w-full gap-10">
                <button
                  onClick={() => {
                    setIsLoginPopupOpen(true);
                    closeMobileMenu();
                  }}
                  className="hover:text-primary text-tertiary cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsRegisterPopupOpen(true);
                    closeMobileMenu();
                  }}
                  className="hover:text-primary text-tertiary cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
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

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Register Popup */}
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={() => setIsRegisterPopupOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        referralCode={referralCode}
      />
    </nav>
  );
};

export default Navbar;
