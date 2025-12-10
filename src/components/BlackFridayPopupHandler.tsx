"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BlackFridayPopup from "@/components/BlackFridayPopup";
import { useRouter } from "next/navigation";

const BlackFridayPopupHandler = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Don't show popup on /download or /sales pages
        if (pathname === "/download" || pathname === "/sales") {
            setIsOpen(false);
            return;
        }

        const checkPopupTiming = () => {
            const blackFridayPopupClosed = localStorage.getItem(
                "blackFridayPopupClosed"
            );
            const now = new Date().getTime();

            // Show popup if it hasn't been closed before, or if it was closed more than 30 minutes ago
            if (!blackFridayPopupClosed) {
                setIsOpen(true);
            } else {
                const lastClosedTime = parseInt(blackFridayPopupClosed);
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
            "blackFridayPopupClosed",
            new Date().getTime().toString()
        );

        // Trigger default popup to show after Black Friday popup is closed
        // Dispatch a custom event that Navbar can listen to
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("blackFridayPopupClosed"));
        }
    };

    const handleStartMining = (planName: "Electric" | "Turbo" | "Nuclear") => {
        handleClose();
        // Navigate to the appropriate mining page
        const planRoutes: Record<"Electric" | "Turbo" | "Nuclear", string> = {
            Electric: "/mining/electric-mining",
            Turbo: "/mining/turbo-mining",
            Nuclear: "/mining/nuclear-mining",
        };
        router.push(planRoutes[planName]);
    };

    return (
        <BlackFridayPopup
            isOpen={isOpen}
            onClose={handleClose}
            onStartMining={handleStartMining}
        />
    );
};

export default BlackFridayPopupHandler;

