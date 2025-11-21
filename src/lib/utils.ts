import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

export type GmailAliasReason = "plus" | "googlemail";

export interface GmailAliasInfo {
  normalizedEmail: string;
  isGmail: boolean;
  hasAlias: boolean;
  reasons: GmailAliasReason[];
}

export function getGmailAliasInfo(email: string): GmailAliasInfo {
  const trimmed = (email || "").trim();
  if (!trimmed) {
    return {
      normalizedEmail: "",
      isGmail: false,
      hasAlias: false,
      reasons: [],
    };
  }

  const lower = trimmed.toLowerCase();
  const atIndex = lower.lastIndexOf("@");

  if (atIndex === -1) {
    return {
      normalizedEmail: lower,
      isGmail: false,
      hasAlias: false,
      reasons: [],
    };
  }

  const localPartRaw = lower.slice(0, atIndex);
  const domainRaw = lower.slice(atIndex + 1);
  const isGmail = GMAIL_DOMAINS.has(domainRaw);

  if (!isGmail) {
    return {
      normalizedEmail: lower,
      isGmail: false,
      hasAlias: false,
      reasons: [],
    };
  }

  const reasons: GmailAliasReason[] = [];
  let localPart = localPartRaw;

  const plusIndex = localPart.indexOf("+");
  if (plusIndex !== -1) {
    localPart = localPart.slice(0, plusIndex);
    reasons.push("plus");
  }

  if (domainRaw === "googlemail.com") {
    reasons.push("googlemail");
  }

  const normalizedLocal = localPart.replace(/\./g, "");

  return {
    normalizedEmail: `${normalizedLocal}@gmail.com`,
    isGmail: true,
    hasAlias: reasons.length > 0,
    reasons,
  };
}

export function extractApiMessage(payload: any): string | undefined {
  if (payload == null) return undefined;
  if (typeof payload === "string") return payload;
  if (typeof payload.message === "string") return payload.message;
  if (typeof payload.data === "string") return payload.data;
  if (payload.data && typeof payload.data.message === "string") return payload.data.message;
  if (Array.isArray(payload.errors) && payload.errors.length) {
    const first = payload.errors[0];
    return (first?.message || first?.msg || String(first)) as string;
  }
  return undefined;
}

export function normalizeErrorMessage(status?: number, rawMsg?: string): string {
  const msg = (rawMsg || "").toLowerCase();

  const looksLikeDup =
    msg.includes("already registered") ||
    msg.includes("already in use") ||
    msg.includes("email exists") ||
    msg.includes("email taken") ||
    msg.includes("username already exists");

  if (status === 409 || looksLikeDup) {
    // choose message by hint
    if (msg.includes("username")) return "Username already exists";
    return "Email already registered. Please login.";
  }

  if (status === 422) return rawMsg || "Some fields are invalid. Please check and try again.";
  if (status === 400) return rawMsg || "Invalid request. Please review the form and try again.";
  if (status === 500) {
    return looksLikeDup
      ? "Email already registered. Please login."
      : "Something went wrong on our side. Please try again.";
  }

  // default
  return rawMsg || "Registration failed. Please try again.";
}
