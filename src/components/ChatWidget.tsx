/* eslint-disable @next/next/no-img-element */
"use client";

import { KeyboardEvent, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Message = {
  role: "user" | "agent";
  content: string;
};

const ALL_SUGGESTIONS = [
  "How do I start earning BTCY with the mobile miner?",
  "What is the difference between the Gopher plans?",
  "How does the AI Mining Score boost my rewards?",
  "Where can I download the Bitcoin Yay app?",
  "Can I stake my BTCY inside the app?",
  "How do referrals through the Pocket Gopher program work?",
  "What benefits do the paid Nugget Gopher tiers unlock?",
  "How does Bitcoin Yay control token inflation?",
] as const;

const INITIAL_SUGGESTIONS = ALL_SUGGESTIONS.slice(0, 3);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nextSuggestionIndex, setNextSuggestionIndex] = useState(0);
  const [readyForNextSuggestion, setReadyForNextSuggestion] = useState(true);

  const lastMessage = messages[messages.length - 1];
  const canShowNextSuggestion =
    messages.length > 0 &&
    lastMessage?.role === "agent" &&
    readyForNextSuggestion &&
    !isLoading;

  const nextSuggestion =
    ALL_SUGGESTIONS[nextSuggestionIndex % ALL_SUGGESTIONS.length];

  const initialSuggestions = useMemo(
    () => INITIAL_SUGGESTIONS.filter((question) => question !== nextSuggestion),
    [nextSuggestion]
  );

  function renderWithLinks(text: string): ReactNode[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = urlRegex.exec(text)) !== null) {
      const [url] = match;
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        nodes.push(text.slice(lastIndex, matchIndex));
      }
      nodes.push(
        <a
          key={`${url}-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words text-[#ffe2c5] underline decoration-dotted underline-offset-2 hover:text-white"
        >
          {url}
        </a>
      );
      lastIndex = matchIndex + url.length;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes.length ? nodes : [text];
  }

  function renderMessageContent(content: string) {
    const lines = content
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      return (
        <p className="leading-relaxed break-words">
          {renderWithLinks(content.trim() || "...")}
        </p>
      );
    }

    return lines.map((line, index) => (
      <p key={`line-${index}`} className="leading-relaxed break-words">
        {renderWithLinks(line)}
      </p>
    ));
  }

  async function sendMessage(prompt?: string) {
    if (isLoading) return;

    const text = (prompt ?? input).trim();
    if (!text) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);
    setReadyForNextSuggestion(false);

    const suggestionIndex = prompt
      ? ALL_SUGGESTIONS.indexOf(prompt)
      : -1;

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const reply =
        typeof data.answer === "string"
          ? data.answer
          : "Sorry, I'm having trouble right now.";

      setMessages((prev) => [...prev, { role: "agent", content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Sorry, I'm having trouble right now." },
      ]);
    } finally {
      setIsLoading(false);
      setReadyForNextSuggestion(true);
      setNextSuggestionIndex((prev) => {
        if (suggestionIndex >= 0) {
          return (suggestionIndex + 1) % ALL_SUGGESTIONS.length;
        }
        return (prev + 1) % ALL_SUGGESTIONS.length;
      });
    }
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff8728] to-[#ffb067] px-4 py-3 text-[#2a1504] shadow-[0_20px_45px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.03]"
        aria-label="Open Bitcoin Yay assistant"
      >
        <img
          src="/favicon-32x32.png"
          alt="Bitcoin Yay icon"
          className="h-8 w-8 rounded-xl border border-[#ffd7ad] bg-white/90 p-1"
        />
        <span className="text-sm font-semibold uppercase tracking-wide">
          Chat with Bitcoin Yay
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[22.5rem] max-w-[92vw] flex-col overflow-hidden rounded-3xl border border-[#ff8728]/45 bg-[#181818]/95 shadow-[0_35px_65px_rgba(0,0,0,0.58)] backdrop-blur">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#ff8728] via-[#ff9f51] to-[#ffc27a] px-5 py-3 text-[#2a1504]">
        <div className="flex items-center gap-3">
          <img
            src="/favicon-32x32.png"
            alt="Bitcoin Yay icon"
            className="h-8 w-8 rounded-2xl border border-[#ffd7ad] bg-white/90 p-1"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">
              Bitcoin Yay Assistant
            </p>
            <p className="text-[11px] text-[#4a2a12]">
              Answers grounded in official BTCY FAQs
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full border border-[#fcd8b5]/70 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2a1504] transition hover:bg-white"
          aria-label="Minimize chat"
        >
          Minimize
        </button>
      </div>

      <div className="flex h-[21rem] flex-col gap-3 overflow-y-auto px-4 py-4 text-[0.92rem] text-[#f6f6f6] scrollbar-hide">
        {messages.length === 0 && (
          <>
            <div className="rounded-2xl border border-[#2b2b2b] bg-gradient-to-br from-[#232323] via-[#1f1f1f] to-[#181818] px-4 py-3 text-[#cfcfcf] shadow-[0_18px_42px_rgba(0,0,0,0.35)]">
              Ask about mobile mining, vesting, fees, or download links. The
              assistant only uses verified Bitcoin Yay FAQs.
            </div>
            <div className="flex flex-wrap gap-2">
              {initialSuggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  disabled={isLoading}
                  className="rounded-full border border-[#3b3b3b] bg-[#1a1a1a] px-3 py-1.5 text-xs text-[#f7f7f7] transition hover:border-[#ff8728]/70 hover:text-[#ff8728] disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </>
        )}

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] space-y-2 rounded-[22px] border border-[#ff9d55]/70 bg-gradient-to-br from-[#ff8728] via-[#ff9f51] to-[#ffb067] px-4 py-3 text-right text-[#2a1504] shadow-[0_22px_46px_rgba(255,135,40,0.35)] whitespace-pre-wrap break-words"
                : "mr-auto max-w-[85%] space-y-2 rounded-[22px] border border-[#303030] bg-gradient-to-br from-[#262626] via-[#222222] to-[#1b1b1b] px-4 py-3 text-left text-[#f2f2f2] shadow-[0_22px_48px_rgba(0,0,0,0.48)] whitespace-pre-wrap break-words"
            }
          >
            {renderMessageContent(message.content)}
          </div>
        ))}

        {isLoading && (
          <div className="ml-auto max-w-[70%] rounded-[22px] border border-[#ff8728]/35 bg-[#262626] px-4 py-2 text-right text-[#ffb46b] shadow-[0_14px_32px_rgba(255,135,40,0.22)] whitespace-pre-wrap break-words">
            ...thinking
          </div>
        )}

        {canShowNextSuggestion && (
          <div className="mt-4 rounded-[22px] border border-[#2b2b2b] bg-gradient-to-br from-[#1e1e1e] via-[#191919] to-[#151515] px-4 py-3 text-xs text-[#f6f6f6] shadow-[0_16px_38px_rgba(0,0,0,0.32)]">
            <span className="font-semibold uppercase tracking-[0.12em] text-[#ffb067]">
              Try asking next
            </span>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => sendMessage(nextSuggestion)}
                disabled={isLoading}
                className="rounded-full border border-[#ff8728]/70 bg-[#242424] px-3 py-1.5 text-xs text-[#ff8728] transition hover:border-[#ffb067] hover:text-[#ffb067] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {nextSuggestion}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-[#272727] bg-[#131313]/95 px-4 py-3">
        <input
          className="flex-1 rounded-[20px] border border-[#303030] bg-[#1b1b1b] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#7f7f7f] focus:border-[#ff8728] focus:outline-none focus:ring-2 focus:ring-[#ff8728]/30"
          placeholder="Type your question..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Ask the Bitcoin Yay assistant"
        />
        <button
          type="button"
          onClick={() => sendMessage()}
          disabled={isLoading}
          className="rounded-[20px] bg-gradient-to-r from-[#ff8728] to-[#ffb067] px-4 py-2 text-sm font-semibold text-[#2a1504] transition hover:from-[#ff9541] hover:to-[#ffc27a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
