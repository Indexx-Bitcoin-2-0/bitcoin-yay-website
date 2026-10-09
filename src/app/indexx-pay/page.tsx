"use client";

import { useState } from "react";
import { API_BASE_URL, INDEXX_PAY_WEB_URL } from "@/lib/api-config";

/**
 * Indexx Pay One QR on Bitcoin Yay. Everyone's one "Pay me" QR / link
 * (https://pay.indexx.ai/pay/<public Indexx Pay ID>) carries only a public
 * ID, never an email. Looking up who a link belongs to is public; paying and
 * showing your own QR happen in Indexx Pay itself (its own sign-in), the
 * same way Buy BTCY hands off to Indexx Pay. On a phone with the Indexx Pay
 * app, the pay link opens the app.
 */
const PAY_LINK = /https:\/\/(?:test\.)?pay\.indexx\.ai\/pay\/(pay-[a-f0-9]{24})\b/i;
function parsePayLink(text: string): string | null {
  const t = text.trim();
  if (/^pay-[a-f0-9]{24}$/i.test(t)) return t.toLowerCase();
  return PAY_LINK.exec(t)?.[1]?.toLowerCase() ?? null;
}

type Recipient = { publicId: string; displayName: string };

export default function IndexxPayPage() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [recipient, setRecipient] = useState<Recipient | null>(null);

  async function find() {
    setError("");
    setRecipient(null);
    const id = parsePayLink(text);
    if (!id) return setError("Paste an Indexx Pay link (pay.indexx.ai/pay/…) or an ID that starts with pay-.");
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/inex/indexxpay/recipients/${encodeURIComponent(id)}`);
      const body = await res.json();
      if (!res.ok || !body?.data?.publicId) throw new Error(body?.data?.message || "That pay link doesn't belong to anyone.");
      setRecipient({ publicId: body.data.publicId, displayName: body.data.displayName });
    } catch (e) {
      setError(e instanceof Error ? e.message : "That pay link doesn't belong to anyone.");
    } finally {
      setBusy(false);
    }
  }

  const card = "rounded-2xl border border-white/15 bg-white/5 p-6";
  const button = "inline-flex items-center justify-center rounded-full bg-[#1e54b4] px-6 py-3 font-semibold text-white hover:bg-[#184798] disabled:opacity-50";

  return (
    <main className="mx-auto max-w-2xl px-4 pb-20 pt-56 text-white">
      <h1 className="text-3xl font-bold">Indexx Pay · One QR</h1>
      <p className="mt-2 opacity-80">
        Pay anyone with USDXX (1 USDXX = $1, no fees), or get paid with your own QR. It&apos;s the same QR in Indexx Pay, YaysApp, the Exchange
        and every Indexx app.
      </p>

      <section className={`${card} mt-8`}>
        <h2 className="text-xl font-semibold">My Indexx Pay QR</h2>
        <p className="mt-1 text-sm opacity-80">Friends scan it with their phone camera or any Indexx app. It shows your name, never your email.</p>
        <a href={`${INDEXX_PAY_WEB_URL}/dashboard?show=receive`} target="_blank" rel="noreferrer" className={`${button} mt-4`}>
          Show my QR in Indexx Pay
        </a>
      </section>

      <section className={`${card} mt-6`}>
        <h2 className="text-xl font-semibold">Pay an Indexx Pay link</h2>
        <p className="mt-1 text-sm opacity-80">Scanned a One QR with your phone camera? It opens Indexx Pay by itself. Got a link in a message? Paste it here.</p>
        <div className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="https://pay.indexx.ai/pay/pay-…"
            className="min-w-0 flex-1 rounded-xl border border-white/20 bg-transparent px-4 py-3"
          />
          <button type="button" onClick={find} disabled={!text.trim() || busy} className={button}>
            {busy ? "Finding…" : "Find"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        {recipient && (
          <div className="mt-5 rounded-xl border border-white/15 p-4">
            <p className="text-xs uppercase tracking-wide opacity-70">Paying</p>
            <p className="text-lg font-semibold">{recipient.displayName}</p>
            <p className="break-all font-mono text-xs opacity-60">Indexx Pay ID {recipient.publicId}</p>
            <a href={`${INDEXX_PAY_WEB_URL}/pay/${recipient.publicId}`} target="_blank" rel="noreferrer" className={`${button} mt-4`}>
              Pay {recipient.displayName} in Indexx Pay
            </a>
            <p className="mt-2 text-xs opacity-70">You enter the amount and confirm there. Nothing is paid until you do.</p>
          </div>
        )}
      </section>
    </main>
  );
}
