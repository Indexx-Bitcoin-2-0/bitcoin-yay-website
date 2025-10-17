import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { topKBySim } from "@/lib/faq";
import { CONTACT_US_ROUTE } from "@/routes";

export const runtime = "nodejs";

const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const supportEmail = process.env.SUPPORT_EMAIL ?? "support@indexx.ai";
const matchThreshold = Number(process.env.FAQ_MATCH_THRESHOLD ?? "0.78");
const supportForwardFrom =
  process.env.SUPPORT_FORWARD_FROM ?? "support-bot@bitcoinyay.com";

const client =
  process.env.OPENAI_API_KEY &&
  new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  if (!client) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Missing message" },
        { status: 400 }
      );
    }

    const embeddingResult = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });

    const queryEmbedding = embeddingResult.data[0]?.embedding ?? [];
    const top = queryEmbedding.length ? topKBySim(queryEmbedding, 5) : [];
    const topScore = top[0]?.score ?? 0;
    const hasMatch = top.length > 0 && topScore >= matchThreshold;
    const context = hasMatch
      ? top.map((chunk) => `[#${chunk.id}] ${chunk.text}`).join("\n\n")
      : "NO_MATCH";

    const emailMatch = message.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );
    const detectedEmail = emailMatch?.[0];

    let forwarded = false;
    let ticketStatus: "skipped" | "forwarded" | "failed" = "skipped";

    if (!hasMatch) {
      forwarded = await forwardToSupport({ question: message, detectedEmail });
      ticketStatus = forwarded ? "forwarded" : "failed";
    }

    const ios =
      process.env.APP_DOWNLOAD_IOS_URL ?? "https://apps.apple.com/";
    const android =
      process.env.APP_DOWNLOAD_ANDROID_URL ?? "https://play.google.com/";

    const guardrails = `
You are the Bitcoin Yay Help Agent for the Indexx ecosystem.
- Answer using ONLY the "FAQ Context" below. Never fabricate information outside that context.
- If the FAQ Context is "NO_MATCH":
  * Acknowledge we do not have the answer documented yet.
  * Tell the user you will route their question to ${supportEmail}.
  * If the support forwarding status is "failed", apologize and ask them to email ${supportEmail} directly.
  * Remind them that official replies only come from ${supportEmail}; tell them to forward suspicious emails and never share passwords, OTPs, private keys, or seed phrases.
  * Invite them to share a preferred contact email only if they are comfortable doing so.
- If the user mentions suspicious or scam emails, instruct them to forward the message to ${supportEmail} and reassure them we will never ask for sensitive credentials.
- If the user asks about downloading the app, show these links clearly:
  * iOS: ${ios}
  * Android: ${android}
- Be concise. Use bullets and links when helpful.`;

    const input = [
      { role: "system" as const, content: guardrails },
      { role: "user" as const, content: `User question: """${message}"""` },
      {
        role: "system" as const,
        content: `FAQ Context:\n${context}`,
      },
    ];

    if (!hasMatch) {
      input.push({
        role: "system",
        content: `Support forwarding status: ${ticketStatus}. ${
          detectedEmail
            ? `Detected contact email: ${detectedEmail}.`
            : "No contact email detected in the question."
        }`,
      });
    }

    const response = await client.responses.create({
      model,
      input,
    });

    const answer =
      (response as any).output_text ??
      "Sorry, I could not generate a response right now.";

    return NextResponse.json({
      answer,
      sources: hasMatch ? top.map((item) => item.id) : [],
      matched: hasMatch,
      confidence: Number(topScore.toFixed(4)),
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
