"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setIsLoginPopupOpen(true);
    }
  }, [isLoading, isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsLoginPopupOpen(false);
  };

  const handleCloseLoginPopup = () => {
    // Don't allow closing the popup without login for protected routes
    // User must authenticate to access protected content
    if (!isAuthenticated) {
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
      {/* Render children only if authenticated, otherwise show fallback */}
      {isAuthenticated
        ? children
        : fallback || <div className="min-h-screen"></div>}

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onRegisterClick={() => setIsLoginPopupOpen(false)}
        onClose={handleCloseLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default ProtectedRoute;
