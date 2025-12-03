"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import BitcoinYayaIcon from "../assets/images/main-logo.svg";
import Image from "next/image";
import AppleQrCode from "../assets/images/apple-qr.webp";
import PlaystoreQrCode from "../assets/images/playstore-qr.webp";

import FbIcon from "../assets/images/socials/fb.svg";
import InstaIcon from "../assets/images/socials/insta.svg";
import TelegramIcon from "../assets/images/socials/telegram.svg";
import XIcon from "../assets/images/socials/x.svg";
import YoutubeIcon from "../assets/images/socials/youtube.svg";

const Footer = ({ }) => {
  const pathname = usePathname();
  const menuItems = [
    {
      title: "Quick Links",
      links: [
        { text: "Bitcoin-Yay Blockchain", url: "#" },
        { text: "Community", url: "#" },
        { text: "Developers", url: "#" },
        { text: "About us", url: "/about" },
        { text: "Support", url: "/support" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Privacy Policy", url: "/privacy-policy" },
        { text: "Terms of Use", url: "#" },
        { text: "Terms of Services", url: "/term-of-service" },
      ],
    },
  ],
    bottomLinks = [
      {
        image: FbIcon,
        url: "https://www.facebook.com/profile.php?id=61574910722200",
      },
      { image: InstaIcon, url: "https://www.instagram.com/bitcoin.yay/" },
      { image: TelegramIcon, url: "https://t.me/+Cmz7QGEuxP5jY2U1" },
      { image: XIcon, url: "https://x.com/bitcoin_YAY" },
      { image: YoutubeIcon, url: "https://www.youtube.com/@BitcoinYay" },
    ];
  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      <footer className="mx-auto border-t pt-18 border-bg3 text-secondry">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 lg:justify-start">
              <Image src={BitcoinYayaIcon} alt="Bitcoin-Yay Icon" />
            </div>
            <p className="mt-12 w-80 ">
              Elevate your bitcoin trading experience to new heights with our
              advanced app and features.
            </p>
          </div>
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-6 text-tertiary font-bold">{section.title}</h3>
              <ul className="space-y-4 text-secondry font-normal">
                {section.links.map((link, linkIdx) => {
                  const isActive = pathname === link.url;
                  return (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary leading-8 "
                    >
                      <Link
                        href={link.url}
                        className={isActive ? "text-primary" : ""}
                      >
                        {link.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="min-w-44 col-span-2 flex flex-col items-start xl:items-end ">
            <div className="">
              <h3 className="mb-4 font-bold text-lg max-w-60">
                Install app By Scanning The QR Code
              </h3>
              <div className="flex flex-col md:flex-row gap-4 lg:gap-8 lg:mt-12">
                <div className="flex flex-col items-start justify-start mt-6">
                  <p className="text-sm font-semibold text-primary">
                    Scan or Click on the QR Code
                  </p>
                  <Link
                    href="https://apps.apple.com/ph/app/bitcoin-yay/id6744868017"
                    target="_blank"
                  >
                    <Image
                      src={AppleQrCode}
                      alt="App QR Code"
                      className="h-44 w-44 mt-2 text-amber-50 hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </Link>
                </div>
                <div className="flex flex-col items-start justify-start mt-6">
                  <p className="text-sm font-semibold text-primary">
                    Scan or Click on the QR Code
                  </p>
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en"
                    target="_blank"
                  >
                    <Image
                      src={PlaystoreQrCode}
                      alt="Google QR Code"
                      className="h-44 w-44 mt-2 text-amber-50 hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between items-center gap-4 border-t border-bg3 pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
          <p className="hidden md:flex">© 2025 | Bitcoin-Yay</p>
          <ul className="flex gap-4">
            {bottomLinks.map((link, linkIdx) => (
              <li
                key={linkIdx}
                className="underline hover:text-primary hover:scale-110"
              >
                <a href={link.url}>
                  <Image
                    src={link.image}
                    alt="Link Icon"
                    width={40}
                    height={40}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
