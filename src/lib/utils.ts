import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
