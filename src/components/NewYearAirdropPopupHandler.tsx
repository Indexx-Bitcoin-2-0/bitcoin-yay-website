"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NewYearAirdropPopup from "@/components/NewYearAirdropPopup";

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
            const newYearAirdropPopupClosed = localStorage.getItem(
                "newYearAirdropPopupClosed"
            );
            const now = new Date().getTime();

            // Show popup if it hasn't been closed before, or if it was closed more than 30 minutes ago
            if (!newYearAirdropPopupClosed) {
                setIsOpen(true);
            } else {
                const lastClosedTime = parseInt(newYearAirdropPopupClosed);
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
            "newYearAirdropPopupClosed",
            new Date().getTime().toString()
        );
    };

    return (
        <NewYearAirdropPopup
            isOpen={isOpen}
            onClose={handleClose}
        />
    );
};

export default NewYearAirdropPopupHandler;

