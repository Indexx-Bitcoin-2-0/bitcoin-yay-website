import axios, { AxiosResponse } from "axios";
import {
  CAPTAIN_BEE_BY_EMAIL_ROUTE,
  CREATE_SHORT_TOKEN_API_ROUTE,
  LOGIN_WITH_TOKEN_API_ROUTE,
} from "@/routes";

type CaptainBeeApiResponse = {
  status?: number;
  message?: string;
  data?: {
    Username?: string;
    username?: string;
    displayName?: string;
  };
};

export interface AuthTokenPayload {
  access_token: string;
  refresh_token: string;
  email?: string;
  name?: string;
  role?: string;
  userType?: string;
  shortToken?: string;
}

export interface ApiEnvelope<T> {
  status: number;
  message?: string;
  data: T;
}

export const loginWithToken = async (
  signInToken: string
): Promise<AxiosResponse<ApiEnvelope<AuthTokenPayload>>> => {
  return axios.post<ApiEnvelope<AuthTokenPayload>>(
    LOGIN_WITH_TOKEN_API_ROUTE,
    { signInToken },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const getUserShortToken = async (
  email: string
): Promise<AxiosResponse<ApiEnvelope<{ shortToken: string }>>> => {
  const url = `${CREATE_SHORT_TOKEN_API_ROUTE}/${encodeURIComponent(email)}`;
  return axios.get<ApiEnvelope<{ shortToken: string }>>(url);
};

export const getCaptainBeeByEmail = async (
  email: string
): Promise<AxiosResponse<CaptainBeeApiResponse>> => {
  const url = `${CAPTAIN_BEE_BY_EMAIL_ROUTE}/${encodeURIComponent(email)}`;
  return axios.get<CaptainBeeApiResponse>(url);
};

const decodeBase64Url = (value: string): string | null => {
  if (typeof window === "undefined" || typeof window.atob !== "function") {
    return null;
  }
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddingNeeded = (4 - (normalized.length % 4)) % 4;
  const padded = normalized.padEnd(normalized.length + paddingNeeded, "=");
  return window.atob(padded);
};

export const decodeJWT = <T = Record<string, unknown>>(
  accessToken: string
): T | null => {
  if (!accessToken) return null;

  try {
    const [, payload] = accessToken.split(".");
    if (!payload) return null;

    const decoded = decodeBase64Url(payload);
    if (!decoded) return null;
    return JSON.parse(decoded) as T;
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};
