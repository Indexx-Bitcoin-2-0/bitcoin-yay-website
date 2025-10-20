import { NextRequest, NextResponse } from "next/server";
import { CONTACT_US_ROUTE } from "@/routes";
import { Client as AgentsClient } from "@openai/agents";

export const runtime = "nodejs";

const agentId = process.env.OPENAI_AGENT_ID;
const supportEmail = process.env.SUPPORT_EMAIL ?? "support@indexx.ai";
const supportForwardFrom =
  process.env.SUPPORT_FORWARD_FROM ?? "support-bot@bitcoinyay.com";
const fallbackPrefix = "FORWARD_SUPPORT:";

const agentsClient: any =
  process.env.OPENAI_API_KEY && agentId
    ? new (AgentsClient as any)({
        apiKey: process.env.OPENAI_API_KEY,
        ...(process.env.OPENAI_BASE_URL
          ? { baseURL: process.env.OPENAI_BASE_URL }
          : {}),
      })
    : null;

function extractText(payload: any): string {
  if (!payload) return "";
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  if (Array.isArray(payload.output)) {
    const collected = payload.output
      .flatMap((entry: any) => {
        if (!entry) return [];
        if (typeof entry === "string") return entry;
        if (Array.isArray(entry.content)) {
          return entry.content
            .filter((item: any) => item?.text)
            .map((item: any) => item.text);
        }
        if (entry.text) return entry.text;
        return [];
      })
      .filter(Boolean)
      .join("\n");

    if (collected.trim()) return collected;
  }

  if (typeof payload === "string") return payload;
  return "";
}

async function ensureSessionId(sessionId?: string) {
  if (sessionId) return sessionId;
  if (!agentsClient) {
    throw new Error("Agent client is not configured.");
  }
  const session = await agentsClient.sessions.create({
    agent: agentId,
  });
  return session.id as string;
}

async function forwardToSupport({
  question,
  detectedEmail,
}: {
  question: string;
  detectedEmail?: string;
}) {
  if (!CONTACT_US_ROUTE || CONTACT_US_ROUTE.includes("undefined")) {
    console.warn(
      "CONTACT_US_ROUTE is not configured; skipping support escalation."
    );
    return false;
  }

  try {
    const response = await fetch(CONTACT_US_ROUTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bitcoin Yay Assistant",
        email: supportForwardFrom,
        subject: "Bitcoin Yay chat follow-up required",
        message: `Incoming chat question:\n${question}\n\nDetected user email: ${
          detectedEmail ?? "not provided"
        }\nReceived at: ${new Date().toISOString()}`,
        website: "BitcoinYay.com Chat",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Support escalation failed:", text);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Support escalation error:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!agentsClient || !agentId) {
    return NextResponse.json(
      { error: "Agent client is not configured." },
      { status: 500 }
    );
  }

  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing message" },
        { status: 400 }
      );
    }

    const session = await ensureSessionId(sessionId);

    const agentResponse = await agentsClient.sessions.responses.create({
      session,
      input: [
        {
          role: "user",
          content: message,
        },
      ],
      // The agent holds the guardrails and knowledge base configuration.
    });

    const rawAnswer = extractText(agentResponse) || "";
    const trimmed = rawAnswer.trim();

    const emailMatch = message.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );
    const detectedEmail = emailMatch?.[0];

    let forwarded = false;
    let ticketStatus: "skipped" | "forwarded" | "failed" = "skipped";
    let answer = trimmed || "Sorry, I could not generate a response right now.";

    if (trimmed.startsWith(fallbackPrefix)) {
      const summary = trimmed.slice(fallbackPrefix.length).trim() || message;
      forwarded = await forwardToSupport({
        question: `${summary}\n\nOriginal question:\n${message}`,
        detectedEmail,
      });
      ticketStatus = forwarded ? "forwarded" : "failed";
      answer = forwarded
        ? `I don't have that in my FAQ yet, so I've escalated it to our team at ${supportEmail}. Watch for an email from ${supportEmail} and ignore anything else. Never share passwords, OTPs, or seed phrases.`
        : `I couldn't reach our support system automatically. Please email ${supportEmail} directly so the team can help. Only trust replies from ${supportEmail} and never share passwords, OTPs, or seed phrases.`;
    }

    return NextResponse.json({
      answer,
      sessionId: session,
      forwarded,
      ticketStatus,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Agent error" },
      { status: 500 }
    );
  }
}
