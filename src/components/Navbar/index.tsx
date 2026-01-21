"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
  Suspense,
  useMemo,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/main-logo.svg";
import mobLogo from "@/assets/images/logo.webp";
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
import { X } from "lucide-react";
import {
  getMiningStatus,
  getUserMiningBalance,
  getUserWalletBalance,
} from "@/lib/alchemy";
import { balanceCopy } from "@/content/balanceCopy";

import CustomButton2 from "@/components/CustomButton2";
import PopupComponent from "@/components/PopupComponent";
import PowerButtonImage from "@/assets/images/buttons/power-button.webp";
import BuyNowButtonImage from "@/assets/images/buttons/buy-now-button.webp";

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
  dropDownContent?: DropdownSection[];
}

// Extract backdrop component for readability
const Backdrop = memo(({ visible }: { visible: boolean }) => (
  <div
    className={`fixed left-0 w-full top-30 z-[10] backdrop-blur-md transition-opacity duration-300 delay-100 bg-black/50 ${visible ? "opacity-100 h-screen" : "opacity-0 h-0"
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

const MobileLogo = () => (
  <div className="">
    <Link href="/" className="">
      <Image
        src={mobLogo}
        alt="logo"
        className="w-[80px] hover:scale-105 transition-transform duration-300"
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
        className={`${isMainList ? "text-[25px] font-semibold" : "text-xs mt-4"
          } text-tertiary block relative after:absolute after:left-0 after:-bottom-1 after:w-5 after:h-[3px] after:bg-primary after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300`}
      >
        {link.name}
      </a>
    </li>
  )
);

DropdownLink.displayName = "DropdownLink";

type BalanceModalType = "nugget" | "token";

interface BalanceWidgetProps {
  nuggetBalance: number;
  withdrawnBalance: number;
  tokenBalance: number;
  isLoading: boolean;
  onOpenModal: (type: BalanceModalType, trigger?: HTMLElement | null) => void;
  layout?: "horizontal" | "vertical";
  errorMessage?: string | null;
  className?: string;
}

interface BalanceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: ReadonlyArray<string>; // <-- was: string[]
  ctaLabel: string;
  ctaHref: string;
  variant: BalanceModalType;
}

const BTCY_SYMBOL = "BTCY";
const WITHDRAWN_WALLET_NETWORK = "Stellar";
const TOKEN_WALLET_NETWORK = "Ying Yang Chain";
const HOUR_IN_MS = 60 * 60 * 1000;
const MINING_SESSION_DURATION_HOURS = 6;
const MINING_TICKER_INTERVAL_MS = 1000;

const toSafeNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatBalance = (value: number) => {
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: safeValue < 1 ? 4 : 2,
  }).format(safeValue);
};

const BalanceWidget = memo(
  ({
    nuggetBalance,
    withdrawnBalance,
    tokenBalance,
    isLoading,
    onOpenModal,
    layout = "horizontal",
    errorMessage,
    className = "",
  }: BalanceWidgetProps) => {
    const nuggetDescriptionId = useId();
    const tokenDescriptionId = useId();

    const items: Array<{
      type: BalanceModalType;
      label: string;
      value: number;
      description: string;
      descriptionId: string;
    }> = [
        {
          type: "nugget",
          label: "BTCY Nugget",
          value: nuggetBalance,
          description: balanceCopy.utilities.nuggetBody,
          descriptionId: nuggetDescriptionId,
        },
        {
          type: "token",
          label: "BTCY Token",
          value: tokenBalance,
          description: balanceCopy.utilities.tokenBody,
          descriptionId: tokenDescriptionId,
        },
      ];

    const containerClasses =
      layout === "vertical"
        ? "flex w-full flex-col gap-3"
        : "flex items-stretch gap-2";

    const displayValue = (value: number) =>
      errorMessage ? "--" : formatBalance(value);

    return (
      <div className={className}>
        <div className={containerClasses}>
          {items.map((item) => {
            const openWithTarget = (target: HTMLElement) => {
              onOpenModal(item.type, target);
            };

            const handleClick = (
              event: React.MouseEvent<HTMLButtonElement>
            ) => {
              openWithTarget(event.currentTarget);
            };

            const handleKeyDown = (
              event: React.KeyboardEvent<HTMLButtonElement>
            ) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openWithTarget(event.currentTarget);
              }
            };

            return (
              <button
                key={item.type}
                type="button"
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                className={`group relative flex flex-1 flex-col items-start gap-1 px-2 py-1 text-left text-tertiary transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${layout === "vertical" ? "w-full" : "min-w-[140px]"} ${isLoading ? "cursor-wait" : "cursor-pointer"
                  }`}
                aria-label={`View details about ${item.label}`}
                aria-describedby={item.descriptionId}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tertiary/70 transition-colors group-hover:text-primary">
                  {item.label}
                </span>
                <span
                  className="text-xl font-semibold text-secondary transition-colors group-hover:text-primary"
                  aria-live="polite"
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="inline-block h-5 w-16 animate-pulse rounded bg-primary/30"
                      aria-hidden="true"
                    />
                  ) : (
                    displayValue(item.value)
                  )}
                </span>
                {item.type === "nugget" ? (
                  <span className="text-[11px] font-medium text-tertiary/60">
                    Withdrawn: {displayValue(withdrawnBalance)}
                  </span>
                ) : null}
                <span className="h-px w-full bg-primary/20 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                <span id={item.descriptionId} className="sr-only">
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>
        {errorMessage ? (
          <p
            role="status"
            className="mt-2 text-xs font-medium text-red-400"
          >
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  }
);

BalanceWidget.displayName = "BalanceWidget";

const BalanceInfoModal: React.FC<BalanceInfoModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  ctaLabel,
  ctaHref,
  variant,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const titleId = useId();
  const bodyId = useId();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<
          HTMLElement
        >(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) {
          event.preventDefault();
          return;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (!event.shiftKey && activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  if (!isMounted || !isOpen || typeof window === "undefined") {
    return null;
  }

  const ctaImage = variant === "nugget" ? PowerButtonImage : BuyNowButtonImage;

  const handleCtaClick = () => {
    onClose();
    requestAnimationFrame(() => {
      router.push(ctaHref);
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-8"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        className="relative w-full max-w-[460px] rounded-3xl border border-primary/40 bg-bg1 px-8 py-10 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center text-tertiary transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>
        <h2 id={titleId} className="text-3xl font-bold text-secondary">
          {title}
        </h2>
        <div id={bodyId} className="mt-6 space-y-4 text-base text-tertiary">
          {body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <CustomButton2
            image={ctaImage}
            text={ctaLabel}
            onClick={handleCtaClick}
            imageStyling="w-32 md:w-36"
            ariaLabel={ctaLabel}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

const BALANCE_MODAL_CONTENT = balanceCopy.modals;
const LOGOUT_REDIRECT_PATH = (() => {
  const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

  if (!rawBasePath || rawBasePath === "/" || rawBasePath === ".") {
    return "/";
  }

  const prefixedPath = rawBasePath.startsWith("/")
    ? rawBasePath
    : `/${rawBasePath}`;

  return prefixedPath.endsWith("/") && prefixedPath.length > 1
    ? prefixedPath.slice(0, -1)
    : prefixedPath;
})();

const redirectToBasePath = (router: ReturnType<typeof useRouter>) => {
  const sanitizedPath =
    !LOGOUT_REDIRECT_PATH || LOGOUT_REDIRECT_PATH === "/"
      ? "/"
      : LOGOUT_REDIRECT_PATH;

  if (typeof window !== "undefined") {
    const targetUrl = sanitizedPath.startsWith("http")
      ? sanitizedPath
      : `${window.location.origin.replace(/\/$/, "")}${sanitizedPath}`;
    window.location.assign(targetUrl);
    return;
  }

  router.push(sanitizedPath);
};

// Main component
const Navbar: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const balanceTriggerRef = useRef<HTMLElement | null>(null);
  const miningTickerRef = useRef<NodeJS.Timeout | null>(null);
  const baseNuggetRef = useRef(0);
  const miningRateRef = useRef(0);
  const miningStartRef = useRef<number | null>(null);
  const miningEndRef = useRef<number | null>(null);
  const isMiningActiveRef = useRef(false);
  const [backdropVisibility, setBackdropVisibility] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();

  // Auth related states
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [balances, setBalances] = useState({
    nugget: 0,
    withdrawn: 0,
    token: 0,
  });
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [activeBalanceModal, setActiveBalanceModal] =
    useState<BalanceModalType | null>(null);

  const handleReferralDetected = useCallback((code: string) => {
    setReferralCode(code);
    setIsRegisterPopupOpen(true);
  }, []);

  // Compute active state dynamically based on current path
  const headerData = useMemo<HeaderItem[]>(() => {
    if (currentPath === "/coming-soon") {
      return Data;
    }

    const isPathActive = (path: string): boolean => {
      if (path === "/") {
        return currentPath === "/";
      }
      return currentPath.startsWith(path);
    };

    return Data.map((item) => {
      let active = isPathActive(item.href);

      if (!active && item.dropDownContent) {
        active = item.dropDownContent.some((section) =>
          section.links.some((link) => isPathActive(link.href))
        );
      }

      return {
        ...item,
        active,
      };
    });
  }, [currentPath]);

  // Optimized resize handler with debounce
  useEffect(() => {
    const handleResize = () => {
      // Match Tailwind's xl breakpoint (1280px) used in className="xl:hidden" and "xl:flex"
      const mobileView = window.innerWidth < 1280;
      setIsMobile(mobileView);
      if (!mobileView && menuOpen) {
        setMenuOpen(false);
      }
    };

    // Initial check - run immediately to set correct initial state
    if (typeof window !== "undefined") {
      handleResize();
    }

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
    setBalances({ nugget: 0, withdrawn: 0, token: 0 });
    setBalanceError(null);
    setIsBalanceLoading(false);
    setActiveBalanceModal(null);
    balanceTriggerRef.current = null;
    closeMobileMenu();
    redirectToBasePath(router);
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


  useEffect(() => {
    if (!isAuthenticated) {
      setActiveBalanceModal(null);
    }
  }, [isAuthenticated]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Check if popup should be shown
  useEffect(() => {
    // Don't show popup on /download, /sales, /quantum-sale, or /power-mining-funnel pages
    if (
      currentPath === "/download" ||
      currentPath === "/sales" ||
      currentPath === "/quantum-sale" ||
      currentPath === "/power-mining-funnel"
    ) {
      setIsPopupOpen(false);
      return;
    }

    const checkPopupTiming = () => {
      const lastPopupClosed = localStorage.getItem("bitcoinYayPopupLastClosed");
      if (!lastPopupClosed) {
        setIsPopupOpen(true);
        return;
      }

      const now = Date.now();
      const thirtyMinutesInMs = 30 * 60 * 1000;
      const lastClosedTime = parseInt(lastPopupClosed);

      if (now - lastClosedTime >= thirtyMinutesInMs) {
        setIsPopupOpen(true);
      }
    };

    const timer = setTimeout(checkPopupTiming, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPath]);

  // Handle popup close
  const handlePopupClose = () => {
    setIsPopupOpen(false);
    // Store current time in localStorage
    localStorage.setItem(
      "bitcoinYayPopupLastClosed",
      new Date().getTime().toString()
    );
  };

  const calculateDisplayedNugget = useCallback(() => {
    const base = baseNuggetRef.current;
    if (!isMiningActiveRef.current) return base;

    const start = miningStartRef.current;
    const rate = miningRateRef.current;

    if (!start || rate <= 0) return base;

    const sessionEnd =
      miningEndRef.current ??
      start + MINING_SESSION_DURATION_HOURS * HOUR_IN_MS;
    const now = Date.now();
    const clampedNow = Math.min(now, sessionEnd);
    const elapsedHours = Math.max(0, (clampedNow - start) / HOUR_IN_MS);
    return base + elapsedHours * rate;
  }, []);

  const stopMiningTicker = useCallback(() => {
    if (miningTickerRef.current) {
      clearInterval(miningTickerRef.current);
      miningTickerRef.current = null;
    }
  }, []);

  const syncNuggetTicker = useCallback(() => {
    const nextValue = calculateDisplayedNugget();
    setBalances((previous) =>
      previous.nugget === nextValue ? previous : { ...previous, nugget: nextValue }
    );
  }, [calculateDisplayedNugget]);

  const startMiningTicker = useCallback(() => {
    if (!isMiningActiveRef.current) {
      stopMiningTicker();
      setBalances((previous) =>
        previous.nugget === baseNuggetRef.current
          ? previous
          : { ...previous, nugget: baseNuggetRef.current }
      );
      return;
    }

    stopMiningTicker();
    syncNuggetTicker();
    miningTickerRef.current = setInterval(
      syncNuggetTicker,
      MINING_TICKER_INTERVAL_MS
    );
  }, [stopMiningTicker, syncNuggetTicker]);

  useEffect(() => {
    return () => {
      stopMiningTicker();
    };
  }, [stopMiningTicker]);

  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      baseNuggetRef.current = 0;
      miningRateRef.current = 0;
      miningStartRef.current = null;
      miningEndRef.current = null;
      isMiningActiveRef.current = false;
      stopMiningTicker();
      setBalances({ nugget: 0, withdrawn: 0, token: 0 });
      setBalanceError(null);
      setIsBalanceLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchBalances = async () => {
      setIsBalanceLoading(true);
      setBalanceError(null);

      try {
        const [
          miningResult,
          statusResult,
          withdrawnResult,
          tokenResult,
        ] = await Promise.allSettled([
          getUserMiningBalance(user.email),
          getMiningStatus(user.email),
          getUserWalletBalance(user.email, BTCY_SYMBOL, WITHDRAWN_WALLET_NETWORK),
          getUserWalletBalance(user.email, BTCY_SYMBOL, TOKEN_WALLET_NETWORK),
        ]);

        if (isCancelled) return;

        if (miningResult.status !== "fulfilled") {
          setBalances({ nugget: 0, withdrawn: 0, token: 0 });
          setBalanceError(
            "Unable to load BTCY Nugget balance. Please try again."
          );
          isMiningActiveRef.current = false;
          stopMiningTicker();
          return;
        }

        const miningData = miningResult.value.data;
        const baseNugget =
          toSafeNumber(miningData?.transferableBalance) +
          toSafeNumber(miningData?.unverifiedBalance) +
          toSafeNumber(miningData?.migratedBalance);

        baseNuggetRef.current = baseNugget;

        const withdrawnBalance =
          withdrawnResult.status === "fulfilled"
            ? toSafeNumber(withdrawnResult.value.data?.balance)
            : 0;

        const tokenBalance =
          tokenResult.status === "fulfilled"
            ? toSafeNumber(tokenResult.value.data?.balance)
            : 0;

        setBalances({
          nugget: baseNugget,
          withdrawn: withdrawnBalance,
          token: tokenBalance,
        });

        const partialErrors: string[] = [];
        if (withdrawnResult.status === "rejected") {
          partialErrors.push("withdrawn");
        }
        if (tokenResult.status === "rejected") {
          partialErrors.push("token");
        }
        if (statusResult.status === "rejected") {
          partialErrors.push("mining status");
        }

        setBalanceError(
          partialErrors.length
            ? `Unable to load ${partialErrors.join(", ")} data.`
            : null
        );

        if (statusResult.status === "fulfilled") {
          const statusData = statusResult.value.data;
          const resolvedRate = Math.max(0, toSafeNumber(statusData?.miningRate));
          const startTimestamp =
            statusData?.sessionStartTime ?? statusData?.lastClaimTime ?? null;
          const startTimeMs = startTimestamp
            ? new Date(startTimestamp).getTime()
            : null;
          const endTimestamp = statusData?.sessionEndTime;
          const endTimeMs = endTimestamp
            ? new Date(endTimestamp).getTime()
            : startTimeMs
              ? startTimeMs + MINING_SESSION_DURATION_HOURS * HOUR_IN_MS
              : null;

          const miningActive =
            Boolean(statusData?.isMiningActive) &&
            resolvedRate > 0 &&
            startTimeMs !== null;

          isMiningActiveRef.current = miningActive;
          miningRateRef.current = resolvedRate;
          miningStartRef.current = startTimeMs;
          miningEndRef.current = endTimeMs;

          if (miningActive) {
            startMiningTicker();
          } else {
            stopMiningTicker();
            setBalances((previous) =>
              previous.nugget === baseNugget
                ? previous
                : { ...previous, nugget: baseNugget }
            );
          }
        } else {
          isMiningActiveRef.current = false;
          stopMiningTicker();
          setBalances((previous) =>
            previous.nugget === baseNugget
              ? previous
              : { ...previous, nugget: baseNugget }
          );
        }
      } catch (error) {
        if (isCancelled) return;
        console.error("Failed to fetch BTCY balances", error);
        isMiningActiveRef.current = false;
        stopMiningTicker();
        setBalances({ nugget: 0, withdrawn: 0, token: 0 });
        setBalanceError(
          "Unable to load BTCY balances right now. Please try again."
        );
      } finally {
        if (!isCancelled) {
          setIsBalanceLoading(false);
        }
      }
    };

    fetchBalances();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, startMiningTicker, stopMiningTicker, user?.email]);

  const handleOpenBalanceModal = useCallback(
    (type: BalanceModalType, trigger?: HTMLElement | null) => {
      balanceTriggerRef.current = trigger ?? null;
      setActiveBalanceModal(type);
    },
    []
  );

  const handleCloseBalanceModal = useCallback(() => {
    setActiveBalanceModal(null);
    const trigger = balanceTriggerRef.current;
    balanceTriggerRef.current = null;
    if (trigger) {
      requestAnimationFrame(() => {
        trigger.focus();
      });
    }
  }, []);

  const activeModalContent = activeBalanceModal
    ? BALANCE_MODAL_CONTENT[activeBalanceModal]
    : null;

  return (
    <nav className="w-full bg-bg fixed top-0 left-0 right-0 z-50">
      {/* Referral Handler with Suspense boundary */}
      <Suspense fallback={null}>
        <ReferralHandler onReferralDetected={handleReferralDetected} />
      </Suspense>

      {/* Notice popup disabled - showing New Year Airdrop popup instead */}
      {/* {currentPath !== "/download" && currentPath !== "/" && (
        <PopupComponent isOpen={isPopupOpen} onClose={handlePopupClose}>
          <div className="mt-10 mx-2 px-10 flex flex-col items-center justify-center w-90 md:w-120 xl:w-140 relative">
            <Image src={PopupArt1} alt="Popup Art 1" className="w-30 md:w-40" />
            <h1 className="mt-4 text-3xl xl:text-4xl text-center font-bold text-primary">
              "Notice"
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
                onClick={() => {
                  handlePopupClose();
                  router.push("/support/#contact-us");
                }}
                imageStyling="w-20 lg:w-24"
              />
            </div>
          </div>
        </PopupComponent>
      )} */}

      <div className="relative flex items-center justify-between h-[150px] px-4 lg:px-[60px] mx-auto">
        {/* {!isMobile && <Backdrop visible={backdropVisibility} />}
        {isMobile && <Backdrop visible={menuOpen} />} */}

        <div className="flex items-center w-full xl:justify-start xl:w-auto">
          {isMobile ? <MobileLogo /> : <Logo />}

          {/* Mobile Balance Widget - Center */}
          {(isAuthenticated && user) ? (
            <div className="flex-1 flex justify-center xl:hidden px-2">
              <BalanceWidget
                nuggetBalance={balances.nugget}
                withdrawnBalance={balances.withdrawn}
                tokenBalance={balances.token}
                isLoading={isBalanceLoading}
                errorMessage={balanceError}
                onOpenModal={handleOpenBalanceModal}
                layout="horizontal"
                className="max-w-[280px]"
              />
            </div>
          ) : ""}

          {/* Mobile menu toggle button */}
          <button
            className="flex xl:hidden text-secondry ml-auto"
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
        <div className="hidden xl:flex items-center">
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
                  className={`text-sm font-normal transition-all duration-300 hover:text-primary ${element.active ? "text-primary" : "text-tertiary"
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
                      {element.dropDownContent?.map((section, elemIdx) => (
                        <div
                          className={`w-[calc(25%-30px)] leading-[35px] flex flex-col ${section.mainList &&
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
        <div className="hidden xl:flex items-center gap-8">
          {isAuthenticated && user ? (
            <>
              <BalanceWidget
                nuggetBalance={balances.nugget}
                withdrawnBalance={balances.withdrawn}
                tokenBalance={balances.token}
                isLoading={isBalanceLoading}
                errorMessage={balanceError}
                onOpenModal={handleOpenBalanceModal}
                className="flex-shrink-0 max-w-[320px]"
              />
              <div className="text-sm font-normal transition-all duration-300 flex items-center gap-6 pr-2">
                <button
                  onClick={handleLogout}
                  className="hover:text-primary text-tertiary cursor-pointer"
                >
                  Logout
                </button>
                <div className="flex items-center gap-2">
                  <Image
                    src={ProfileIcon}
                    alt="Profile Icon"
                    className="w-14"
                  />
                  <span className="text-tertiary">{user.email}</span>
                </div>
              </div>
            </>
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
          className={`absolute left-0 top-26 w-full p-8 bg-bg shadow-lg transform z-20 ${menuOpen ? "translate-y-0" : "-translate-y-[130%]"
            }  xl:hidden max-h-[calc(100vh-150px)] overflow-y-auto`}
        >
          {/* Auth Section (Mobile) */}
          <div className="mb-6">
            {isAuthenticated && user ? (
              <div className="text-xl lg:text-sm font-normal transition-all duration-300 flex flex-col items-center justify-center w-full gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={ProfileIcon}
                    alt="Profile Icon"
                    className="w-14"
                  />
                  <span className="text-tertiary">{user.email}</span>
                </div>
                <Link
                  href="/subscription"
                  className="hover:text-primary text-tertiary cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Subscription
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-primary text-tertiary cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-xl xl:text-sm font-normal transition-all duration-300 flex flex-col items-start justify-center w-full gap-10">
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
                    {element.dropDownContent?.map((section, sectionIdx) => (
                      <div key={sectionIdx} className="mb-6">
                        <header className="text-sm font-medium text-muted-foreground mb-3 pb-2">
                          {section.heading}
                        </header>
                        <div className="">
                          {section.links.map((link, linkIdx) => (
                            <Link
                              key={linkIdx}
                              href={link.href}
                              className={`block text-lg my-3 hover:text-primary ${section.mainList ? "font-bold text-xl" : ""
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

      {activeBalanceModal && activeModalContent ? (
        <BalanceInfoModal
          isOpen
          onClose={handleCloseBalanceModal}
          title={activeModalContent.title}
          body={activeModalContent.body}
          ctaLabel={activeModalContent.ctaLabel}
          ctaHref={activeModalContent.ctaHref}
          variant={activeBalanceModal}
        />
      ) : null}

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={() => setIsLoginPopupOpen(false)}
        onRegisterClick={() => {
          setIsLoginPopupOpen(false);
          setIsRegisterPopupOpen(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Register Popup */}
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={() => setIsRegisterPopupOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        onLoginClick={() => {
          setIsRegisterPopupOpen(false);
          setIsLoginPopupOpen(true);
        }}
        referralCode={referralCode}
      />
    </nav>
  );
};

export default Navbar;
