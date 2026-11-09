"use client";

import { CREATE_SHORT_TOKEN_ROUTE } from "@/routes";
import { getAuthData } from "./auth";
import { decodeJWT } from "./signInToken";

export interface ShortTokenResponse {
  status?: number;
  message?: string;
  // The API returns the token as a bare string in `data`.
  data?: string | { signInToken?: string; shortToken?: string };
  signInToken?: string;
  error?: string;
}

const JWT_SHAPE = /^[\w-]+\.[\w-]+\.[\w-]+$/;

/**
 * A stored token is only worth putting in a hand-off URL if it is a JWT at all
 * (login can persist placeholders such as "google-short-token") and is not
 * already expired. The backend now VERIFIES the signature and `exp` where it
 * previously only decoded, so an expired or placeholder token would be rejected
 * on arrival — better to skip it here and fall through to a fresh one.
 */
const isUsableToken = (token?: string | null): token is string => {
  if (!token || !JWT_SHAPE.test(token)) return false;
  const claims = decodeJWT<{ exp?: number }>(token);
  if (!claims?.exp) return false;
  return claims.exp - 60 > Math.floor(Date.now() / 1000);
};

export async function getUserShortToken(
  email: string,
  accessToken?: string
): Promise<ShortTokenResponse | null> {
  if (!email) {
    return null;
  }

  try {
    const url = `${CREATE_SHORT_TOKEN_ROUTE}/${encodeURIComponent(email)}`;
    const response = await fetch(url, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
    const result = await response.json();

    if (!response.ok) {
      const message = result?.message || result?.error || "Failed to fetch short token";
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

  // Login already returns a short token (CreateTokens -> shortToken), so in the
  // common case no network call is needed. Only fall back to the endpoint when
  // the stored token is missing/placeholder/expired, and send the access token
  // as a bearer so it works once the endpoint requires auth.
  let signInToken = isUsableToken(authData.shortToken) ? authData.shortToken : "";

  if (!signInToken) {
    const response = await getUserShortToken(authData.email, authData.access_token);
    const fromApi =
      typeof response?.data === "string"
        ? response.data
        : response?.data?.shortToken ||
          response?.data?.signInToken ||
          response?.signInToken;
    if (isUsableToken(fromApi)) {
      signInToken = fromApi;
    }
  }

  if (!signInToken && isUsableToken(authData.access_token)) {
    signInToken = authData.access_token;
  }

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
