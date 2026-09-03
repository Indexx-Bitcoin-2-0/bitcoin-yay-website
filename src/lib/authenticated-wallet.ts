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

/**
 * A real sign-in token is a JWT (three base64url segments). The login flows
 * store sentinel strings like "google-short-token" / "temp-short-token" when the
 * API returns no shortToken; those must never be forwarded as a signInToken —
 * the backend now rejects them with a 401 instead of silently logging in.
 */
function isLikelySignInToken(value: unknown): value is string {
  return typeof value === "string" && /^[\w-]+\.[\w-]+\.[\w-]+$/.test(value);
}

export async function getUserShortToken(email: string): Promise<ShortTokenResponse | null> {
  if (!email) {
    return null;
  }

  try {
    const url = `${CREATE_SHORT_TOKEN_ROUTE}/${encodeURIComponent(email)}`;
    // Send the bearer token: the backend mints the short token for the
    // authenticated identity and 401s anonymous callers once
    // SHORT_TOKEN_REQUIRE_AUTH is enabled.
    const accessToken = getAuthData()?.access_token;
    const response = await fetch(url, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
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
    [
      shortTokenResponse?.data?.signInToken,
      shortTokenResponse?.data?.shortToken,
      shortTokenResponse?.signInToken,
      authData.shortToken,
      authData.access_token,
    ].find(isLikelySignInToken) ?? "";

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
