// Authentication utilities for the application
export interface User {
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
  role: string;
  userType: string;
  shortToken: string;
  username?: string;
}

export const AUTH_STORAGE_KEY = "bitcoinYayAuth";

const persistLegacyAuthData = (user: User): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem("email", user.email ?? "");
  localStorage.setItem("user", user.email ?? "");
  localStorage.setItem("userType", user.userType ?? "");
  localStorage.setItem("access_token", user.access_token ?? "");
  localStorage.setItem("refresh_token", user.refresh_token ?? "");
  localStorage.setItem("username", user.username ?? user.name ?? "");
};

const clearLegacyAuthData = (): void => {
  if (typeof window === "undefined") return;

  [
    "email",
    "user",
    "userType",
    "access_token",
    "refresh_token",
    "username",
    "redirected",
    "cachedToken",
    "lastSignInToken",
  ].forEach(
    (key) => localStorage.removeItem(key)
  );
};

export const saveAuthData = (user: User): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  persistLegacyAuthData(user);
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
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  clearLegacyAuthData();
};

export const isAuthenticated = (): boolean => {
  return getAuthData() !== null;
};
