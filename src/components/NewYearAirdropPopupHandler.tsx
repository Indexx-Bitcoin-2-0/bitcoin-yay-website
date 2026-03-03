"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HoliSalePopup from "@/components/HoliSalePopup";

const NewYearAirdropPopupHandler = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Don't show popup on /download, /sales, /quantum-sale, /power-mining-funnel, or /airdrop pages
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
            const holiSalePopupClosed = localStorage.getItem(
                "holiSalePopupClosed"
            );
            const now = new Date().getTime();

            // Show popup if it hasn't been closed before, or if it was closed more than 30 minutes ago
            if (!holiSalePopupClosed) {
                setIsOpen(true);
            } else {
                const lastClosedTime = parseInt(holiSalePopupClosed);
                const timeDifference = now - lastClosedTime;
                const thirtyMinutesInMs = 30 * 60 * 1000; // 30 minutes in milliseconds

                if (timeDifference >= thirtyMinutesInMs) {
                    setIsOpen(true);
                }
            }
        };

        // Small delay to ensure it shows after page load
        const timer = setTimeout(() => {
            checkPopupTiming();
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname]);

    const handleClose = () => {
        setIsOpen(false);
        // Store current time in localStorage
        localStorage.setItem(
            "holiSalePopupClosed",
            new Date().getTime().toString()
        );
    };

    return (
        <HoliSalePopup
            isOpen={isOpen}
            onClose={handleClose}
        />
    );
};

export default NewYearAirdropPopupHandler;
