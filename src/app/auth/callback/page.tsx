"use client";

/*
 * Indexx ID callback.
 *
 * The single redirect target registered for this product. The browser lands here
 * with ?code=...&state=..., the client exchanges the code (with its PKCE
 * verifier) for tokens, scrubs them out of the URL, and returns the user to
 * wherever they were.
 *
 * It renders almost nothing on purpose: this page exists for a few hundred
 * milliseconds during a redirect, and anything heavier just flashes.
 */
import { useEffect, useState } from "react";
import { createAuth } from "@/components/ZodiacLauncher/zodiacAuth";
import { saveAuthData } from "@/lib/auth";

export default function AuthCallback() {
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    const auth = createAuth({
      issuer: process.env.NEXT_PUBLIC_IDP_ISSUER || "http://localhost:5062",
      clientId: "indexx-btcy",
      redirectUri: `${window.location.origin}/auth/callback`,
      /*
       * Must match the launcher. THIS is the call that exchanges the code, so
       * it is the one that establishes the session — wiring onSession only on
       * the launcher would mean the very sign-in that just happened never
       * reached this app's own store.
       */
      onSession: (s: any) =>
        s.access_token &&
        saveAuthData({
          email: s.email,
          name: s.username || s.email,
          access_token: s.access_token,
          refresh_token: s.refresh_token || "",
          role: "",
          userType: s.userType || "",
          shortToken: "",
          username: s.username || undefined,
        }),
    });
    auth
      .handleCallback()
      .then((result: any) => {
        // returnTo was captured before the redirect. Fall back to the root
        // rather than trusting anything that arrived in the URL.
        window.location.replace((result && result.returnTo) || "/");
      })
      .catch(() =>
        setMessage("Could not complete sign-in. Return to the site and try again.")
      );
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0b", color: "#ffffff", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ fontSize: 14, opacity: 0.8 }}>{message}</p>
    </div>
  );
}
