import Link from "next/link";

import BitcoinYayaIcon from "../assets/images/main-logo.svg";
import Image from "next/image";
import AppQrCode from "../assets/images/bitcoin-yay-qr.svg";

import FbIcon from "../assets/images/socials/fb.svg";
import InstaIcon from "../assets/images/socials/insta.svg";
import TelegramIcon from "../assets/images/socials/telegram.svg";
import XIcon from "../assets/images/socials/x.svg";
import YoutubeIcon from "../assets/images/socials/youtube.svg";

const Footer = ({}) => {
  const menuItems = [
      {
        title: "Quick Links",
        links: [
          { text: "Bitcoin Yay Blockchain", url: "#" },
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
      <footer className="mx-auto border-t pt-20 border-tertiary text-secondry">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 lg:justify-start">
              <Image src={BitcoinYayaIcon} alt="Bitcoin Yay Icon" />
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
                {section.links.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="font-medium hover:text-primary leading-8"
                  >
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="min-w-44 ">
            <h3 className="mb-4 font-bold">
              Install app By Scanning The QR Code
            </h3>
            <Image
              src={AppQrCode}
              alt="App QR Code"
              className="h-44 w-44 md:mt-12 text-amber-50"
            />
          </div>
        </div>
        <div className="mt-24 flex flex-col justify-between items-center gap-4 border-t border-tertiary pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
          <p className="hidden md:flex">© 2025 | Bitcoin Yay</p>
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
