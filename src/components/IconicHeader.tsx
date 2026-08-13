"use client";

import { EXTERNAL_URLS } from "@/lib/api-config";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAuthenticatedWalletUrl } from "@/lib/authenticated-wallet";

import AlchemyIcon from "@/assets/images/iconicHeader/alchemyIconicHeader.png";
import BuyBtcyIcon from "@/assets/images/iconicHeader/buyBtcyIconicHeader.png";
import SellBtcyIcon from "@/assets/images/iconicHeader/sellBtcyIconicHeader.png";
import MiningStationIcon from "@/assets/images/iconicHeader/miningStationIconicHeader.png";
import SubscriptionIcon from "@/assets/images/iconicHeader/powerMiningIconicHeader.png";

// Iconic quick-access header (icon + label row), styled after the indexx.ai bar.
interface IconicItem {
  name: string;
  href: string;
  icon: StaticImageData;
  openInNewTab?: boolean;
  // Mining Station needs the signed-in user's token appended to the URL.
  authTokenRedirect?: boolean;
}

const ITEMS: IconicItem[] = [
  {
    name: "Mining Station",
    href: EXTERNAL_URLS.app.miningStation,
    icon: MiningStationIcon,
    authTokenRedirect: true,
  },
  { name: "Alchemy", href: "/alchemy", icon: AlchemyIcon },
  { name: "Buy BTCY", href: "/quantum-mining", icon: BuyBtcyIcon },
  { name: "Sell BTCY", href: "/sell-btcy", icon: SellBtcyIcon },
  { name: "P2P", href: "/p2p", icon: SellBtcyIcon },

  { name: "Power Mining", href: "/mining/power-mining", icon: SubscriptionIcon },
];

const IconicHeader = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  // Active when the current route matches the item (internal links only).
  const isActive = (href: string) => {
    if (!href.startsWith("/")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleClick = async (
    item: IconicItem,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!item.authTokenRedirect) return; // normal Link navigation
    event.preventDefault();
    if (user) {
      const url = await getAuthenticatedWalletUrl(item.href, {
        includeBuyToken: false,
      });
      window.location.href = url;
    } else {
      window.location.href = item.href;
    }
  };

  return (
    <div className="absolute inset-x-0 top-[150px] z-[5] h-[84px] bg-bg md:h-[104px]">
      <div className="mx-auto flex h-full max-w-7xl items-center px-2 md:px-4">
        <div className="flex w-full items-center justify-start gap-6 overflow-x-auto px-1 [scrollbar-width:none] md:justify-center md:gap-14 lg:gap-20 [&::-webkit-scrollbar]:hidden">
          {ITEMS.map((item) => {
            const { name, href, icon, openInNewTab } = item;
            const active = isActive(href);
            return (
              <Link
                key={name}
                href={href}
                target={openInNewTab ? "_blank" : undefined}
                onClick={(event) => handleClick(item, event)}
                className="group flex min-w-fit flex-col items-center gap-1.5"
              >
                <Image
                  src={icon}
                  alt={name}
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12"
                />
                <span
                  className={`whitespace-nowrap text-xs transition-colors md:text-sm ${active
                    ? "text-primary"
                    : "text-tertiary group-hover:text-primary"
                    }`}
                >
                  {name}
                </span>
                {/* Active indicator bar (orange) */}
                <span
                  className={`h-[3px] w-6 rounded-full bg-primary transition-opacity ${active ? "opacity-100" : "opacity-0"
                    }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IconicHeader;
