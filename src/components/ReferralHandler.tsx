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

    let code = searchParams.get("referral");

    if (!code) {
      const raw = window.location.href;
      const match = raw.match(/referral=([^&]+)/);
      if (match?.[1]) code = match[1];
    }

    if (code) {
      onReferralDetected(code);
    }
  }, [searchParams, isAuthenticated, onReferralDetected]);

  return null; // This component doesn't render anything
};

export default ReferralHandler;
