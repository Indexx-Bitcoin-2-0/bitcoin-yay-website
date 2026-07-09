"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";
import CustomButton2 from "@/components/CustomButton2";
import StarButtonImage from "@/assets/images/buttons/star-button.webp";

interface Props {
  label?: string;
}

// Prominent entry point for the Social Media Campaign portal.
// Logged in  -> navigate to the submission page.
// Logged out -> open the login popup (page is also auth-gated as a safety net).
const SocialCampaignEntryButton: React.FC<Props> = ({
  label = "Join Social Media Campaign",
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      router.push("/social-campaign");
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <>
      <CustomButton2
        image={StarButtonImage}
        text={label}
        onClick={handleClick}
        imageStyling="w-28"
        ariaLabel={label}
      />

      <LoginPopup
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onRegisterClick={() => setLoginOpen(false)}
        onLoginSuccess={() => {
          setLoginOpen(false);
          router.push("/social-campaign");
        }}
      />
    </>
  );
};

export default SocialCampaignEntryButton;
