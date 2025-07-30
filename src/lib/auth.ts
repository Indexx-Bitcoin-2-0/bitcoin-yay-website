// Authentication utilities for the application
export interface User {
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
  role: string;
  userType: string;
  shortToken: string;
}

export const AUTH_STORAGE_KEY = "bitcoinYayAuth";

export const saveAuthData = (user: User): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const getAuthData = (): User | null => {
  if (typeof window === "undefined") return null;

  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    return authData ? JSON.parse(authData) : null;
  } catch {
    return null;
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = (): boolean => {
  return getAuthData() !== null;
};
