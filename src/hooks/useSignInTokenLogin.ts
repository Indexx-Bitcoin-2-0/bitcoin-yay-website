"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getCaptainBeeByEmail, loginWithToken, decodeJWT } from "@/lib/signInToken";
import type { User } from "@/lib/auth";

interface TokenPayload {
  email?: string;
  userType?: string;
  role?: string;
  name?: string;
  username?: string;
  shortToken?: string;
}

const buildRedirectUrl = (pathname: string, params: URLSearchParams): string => {
  const nextQuery = params.toString();
  return nextQuery ? `${pathname}?${nextQuery}` : pathname;
};

export const useSignInTokenLogin = (): void => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { login, setIsLoadingState } = useAuth();
  const activeTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = searchParams.get("signInToken");
    if (!token) return;

    const hasRedirected = window.localStorage.getItem("redirected");
    const previousToken = window.localStorage.getItem("lastSignInToken");

    if (hasRedirected === "true" && previousToken && previousToken !== token) {
      window.localStorage.removeItem("redirected");
    }

    if (hasRedirected === "true" && previousToken === token) return;

    if (activeTokenRef.current === token) return;

    activeTokenRef.current = token;

    setIsLoadingState(true);

    const paramsSnapshot = new URLSearchParams(searchParams.toString());

    (async () => {
      try {
        const response = await loginWithToken(token);

        if (response.status !== 200 || !response.data?.data) {
          console.warn("signInToken login failed with status", response.status);
          return;
        }

        const { access_token, refresh_token, email, name, userType, role, shortToken } = response.data.data;

        if (!access_token || !refresh_token) {
          console.warn("signInToken login response missing tokens");
          return;
        }

        const decoded = decodeJWT<TokenPayload>(access_token);
        const resolvedEmail = decoded?.email ?? email ?? "";
        const resolvedUserType = decoded?.userType ?? userType ?? "";
        const resolvedRole = decoded?.role ?? role ?? "";
        const fallbackName =
          decoded?.name ?? name ?? (resolvedEmail.includes("@") ? resolvedEmail.split("@")[0] : resolvedEmail);

        const userData: User = {
          email: resolvedEmail,
          name: fallbackName || resolvedEmail,
          access_token,
          refresh_token,
          role: resolvedRole,
          userType: resolvedUserType,
          shortToken: decoded?.shortToken ?? shortToken ?? "",
          username: decoded?.username,
        };

        if (resolvedUserType === "CaptainBee" && resolvedEmail) {
          try {
            const bee = await getCaptainBeeByEmail(resolvedEmail);
            const username =
              bee.data?.data?.Username ?? bee.data?.data?.username ?? bee.data?.data?.displayName ?? undefined;
            if (username) {
              userData.username = username;
            }
          } catch (error) {
            console.warn("Unable to fetch Captain Bee profile", error);
          }
        }

        login(userData);
        window.localStorage.setItem("redirected", "true");
        window.localStorage.setItem("lastSignInToken", token);
        if (userData.username) {
          window.localStorage.setItem("username", userData.username);
        }

        paramsSnapshot.delete("signInToken");
        const nextUrl = buildRedirectUrl(pathname, paramsSnapshot);
        router.replace(nextUrl, { scroll: false });

        window.location.reload();
      } catch (error) {
        console.error("Automatic login with signInToken failed", error);
        activeTokenRef.current = null;
      } finally {
        setIsLoadingState(false);
      }
    })();
  }, [login, pathname, router, searchParams, setIsLoadingState]);
};
