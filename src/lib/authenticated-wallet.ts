"use client";

import { CREATE_SHORT_TOKEN_ROUTE } from "@/routes";
import { getAuthData } from "./auth";

export interface ShortTokenResponse {
  status?: number;
  data?: {
    signInToken?: string;
    shortToken?: string;
  };
  signInToken?: string;
  error?: string;
}

export async function getUserShortToken(email: string): Promise<ShortTokenResponse | null> {
  if (!email) {
    return null;
  }

  try {
    const url = `${CREATE_SHORT_TOKEN_ROUTE}/${encodeURIComponent(email)}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      const message = result?.error || "Failed to fetch short token";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    console.error("Failed to fetch short token:", error);
    return null;
  }
}

type AuthenticatedWalletUrlOptions = {
  includeBuyToken?: boolean;
};

export async function getAuthenticatedWalletUrl(
  baseUrl: string,
  options: AuthenticatedWalletUrlOptions = {}
): Promise<string> {
  const authData = getAuthData();

  if (!authData?.email) {
    return baseUrl;
  }

  const shortTokenResponse = await getUserShortToken(authData.email);
  const signInToken =
    shortTokenResponse?.data?.signInToken ||
    shortTokenResponse?.data?.shortToken ||
    shortTokenResponse?.signInToken ||
    authData.shortToken ||
    authData.access_token;

  if (!signInToken) {
    return baseUrl;
  }

  const separator = baseUrl.includes("?") ? "&" : "?";
  const shouldIncludeBuyToken = options.includeBuyToken ?? true;
  const buyTokenSegment =
    shouldIncludeBuyToken && !baseUrl.includes("buyToken")
      ? "&buyToken=INEX"
      : "";

  return `${baseUrl}${separator}signInToken=${encodeURIComponent(signInToken)}${buyTokenSegment}`;
}
