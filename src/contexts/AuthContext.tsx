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
import { decodeJWT } from "@/lib/signInToken";

type TokenPayload = {
  exp?: number;
};

const getAccessTokenExpiryMs = (token?: string): number | null => {
  if (!token) return null;
  const decoded = decodeJWT<TokenPayload>(token);
  if (!decoded || typeof decoded.exp !== "number") {
    return null;
  }
  return decoded.exp * 1000;
};

const isAccessTokenExpired = (token?: string): boolean => {
  const expiryMs = getAccessTokenExpiryMs(token);
  if (!expiryMs) return false;
  return Date.now() >= expiryMs;
};

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

  const clearBrowserStorage = useCallback(() => {
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
  }, []);

  const logout = useCallback(() => {
    clearBrowserStorage();
    clearAuthData();
    setUser(null);
  }, [clearBrowserStorage]);

  const login = useCallback((userData: User) => {
    saveAuthData(userData);
    setUser(userData);
  }, []);

  const checkAuth = useCallback(() => {
    const userData = getAuthData();
    if (userData && isAccessTokenExpired(userData.access_token)) {
      logout();
      setIsLoading(false);
      return;
    }

    setUser(userData);
    setIsLoading(false);
  }, [logout]);

  const setIsLoadingState = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user?.access_token) {
      return;
    }

    const expiryMs = getAccessTokenExpiryMs(user.access_token);
    if (!expiryMs) {
      return;
    }

    const now = Date.now();
    if (now >= expiryMs) {
      logout();
      setIsLoading(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      logout();
      setIsLoading(false);
    }, expiryMs - now);

    return () => window.clearTimeout(timeoutId);
  }, [user?.access_token, logout]);

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
