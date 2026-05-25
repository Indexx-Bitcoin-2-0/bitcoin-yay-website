"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BirthdayPopup from "@/components/BirthdayPopup";

const STORAGE_KEY = "btcyBirthdayPopupClosed";
const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes

const BirthdayPopupHandler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't show popup on these paths
    if (
      pathname === "/download" ||
      pathname === "/sales" ||
      pathname === "/quantum-sale" ||
      pathname === "/power-mining-funnel" ||
      pathname === "/airdrop" ||
      pathname.startsWith("/airdrop/")
    ) {
      setIsOpen(false);
      return;
    }

    const checkPopupTiming = () => {
      const lastClosed = localStorage.getItem(STORAGE_KEY);
      if (!lastClosed) {
        setIsOpen(true);
        return;
      }
      const lastClosedTime = parseInt(lastClosed, 10);
      if (Number.isFinite(lastClosedTime) && Date.now() - lastClosedTime >= COOLDOWN_MS) {
        setIsOpen(true);
      }
    };

    const timer = setTimeout(checkPopupTiming, 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  };

  return <BirthdayPopup isOpen={isOpen} onClose={handleClose} />;
};

export default BirthdayPopupHandler;
