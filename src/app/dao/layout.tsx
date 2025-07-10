"use client";

import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import LoginPopup from "@/components/LoginPopup";

export default function DAOLayout({ children }: { children: React.ReactNode }) {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setUserAuthenticated(authenticated);

      if (!authenticated) {
        setIsLoginPopupOpen(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setUserAuthenticated(true);
    setIsLoginPopupOpen(false);
  };

  const handleCloseLoginPopup = () => {
    // Don't allow closing the popup without login for DAO pages
    // User must authenticate to access DAO content
    if (!userAuthenticated) {
      return;
    }
    setIsLoginPopupOpen(false);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-tertiary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Render children only if authenticated, otherwise show empty div */}
      {userAuthenticated ? children : <div className="min-h-screen"></div>}

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
