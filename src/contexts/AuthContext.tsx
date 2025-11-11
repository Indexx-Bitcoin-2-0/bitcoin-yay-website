"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  saveAuthData,
  getAuthData,
  clearAuthData,
  isAuthenticated,
  User,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => void;
  setIsLoadingState: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const userData = getAuthData();
    setUser(userData);
    setIsLoading(false);
  };

  const login = (userData: User) => {
    saveAuthData(userData);
    setUser(userData);
  };

  const clearBrowserStorage = () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.clear();
    } catch (error) {
      console.warn("Unable to clear localStorage during logout", error);
    }

    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.warn("Unable to clear sessionStorage during logout", error);
    }
  };

  const logout = () => {
    clearBrowserStorage();
    clearAuthData();
    setUser(null);
  };

  const setIsLoadingState = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: isAuthenticated(),
    isLoading,
    login,
    logout,
    checkAuth,
    setIsLoadingState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
