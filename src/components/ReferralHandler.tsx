"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ReferralHandlerProps {
  onReferralDetected: (code: string) => void;
}

const ReferralHandler: React.FC<ReferralHandlerProps> = ({
  onReferralDetected,
}) => {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) return; // Don't open if user is already logged in

    // Keep only the code itself; links can carry tracking tags after it
    // (e.g. referral=ABC?utm_source=app), which must not end up in the code.
    let code = (searchParams.get("referral") || "").match(/^[A-Za-z0-9_-]+/)?.[0] || null;

    if (!code) {
      const raw = window.location.href;
      const match = raw.match(/referral=([A-Za-z0-9_-]+)/);
      if (match?.[1]) code = match[1];
    }

    if (code) {
      onReferralDetected(code);
    }
  }, [searchParams, isAuthenticated, onReferralDetected]);

  return null; // This component doesn't render anything
};

export default ReferralHandler;
