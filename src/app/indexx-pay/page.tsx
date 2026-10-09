"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";
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

/**
 * The signed-in user's own One QR, drawn here from their public Indexx Pay ID
 * (GET /indexxpay/me/qr with this site's session). A failure only shows a
 * message: it must not sign the user out of Bitcoin Yay.
 */
function MyQr({ token }: { token: string }) {
  const [publicId, setPublicId] = useState<string | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/inex/indexxpay/me/qr`, { headers: { Authorization: `Bearer ${token}` } });
        const body = await res.json().catch(() => null);
        const id = String(body?.data?.publicId || "").trim();
        if (!res.ok || !id) throw new Error(body?.data?.message || "Couldn't load your Indexx Pay QR.");
        const dataUrl = await QRCode.toDataURL(`${INDEXX_PAY_WEB_URL}/pay/${id}`, {
          margin: 1,
          width: 440,
          color: { dark: "#151515", light: "#ffffff" },
          errorCorrectionLevel: "M",
        });
        if (active) {
          setPublicId(id);
          setQr(dataUrl);
        }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Couldn't load your Indexx Pay QR.");
      }
    })();
    return () => {
      active = false;
    };
  }, [token]);

  if (error) return <p className="mt-4 text-sm text-red-400">{error}</p>;
  if (!qr || !publicId) return <p className="mt-4 text-sm opacity-70">Loading your QR…</p>;
  const link = `${INDEXX_PAY_WEB_URL}/pay/${publicId}`;
  return (
    <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <img src={qr} alt="My Indexx Pay One QR" className="size-56 shrink-0 rounded-2xl bg-white p-3" />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide opacity-70">Indexx Pay ID</p>
        <p className="break-all font-mono text-sm">{publicId}</p>
        <button
          type="button"
          onClick={() =>
            navigator.clipboard.writeText(link).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }, () => undefined)
          }
          className="mt-3 rounded-full border border-white/25 px-5 py-2 text-sm font-semibold hover:border-white/50"
        >
          {copied ? "Copied" : "Copy my pay link"}
        </button>
      </div>
    </div>
  );
}

const INSTALL_STEPS = [
  { title: "Open Indexx Pay", body: <>On your phone, go to <span className="font-semibold">pay.indexx.ai</span> in Safari (iPhone) or Chrome (Android).</> },
  { title: "Sign in", body: <>Use the same Indexx account as Bitcoin Yay, YaysApp or the Exchange. There&apos;s nothing new to sign up for.</> },
  { title: "Add it to your home screen", body: <>iPhone: tap Share, then <span className="font-semibold">Add to Home Screen</span>. Android: tap ⋮, then <span className="font-semibold">Add to Home screen</span> (or Install app).</> },
  { title: "Open My QR", body: <>Launch Indexx Pay from your home screen and tap <span className="font-semibold">My QR</span> to get paid, or scan a One QR to pay.</> },
];

export default function IndexxPayPage() {
  const { user, isLoading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
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
        {user?.access_token ? (
          <MyQr token={user.access_token} />
        ) : (
          !isLoading && (
            <button type="button" onClick={() => setLoginOpen(true)} className={`${button} mt-4`}>
              Log in to see my QR
            </button>
          )
        )}
        <a href={`${INDEXX_PAY_WEB_URL}/dashboard?show=receive`} target="_blank" rel="noreferrer" className="mt-4 block text-sm font-semibold text-[#6f9cf0] hover:underline">
          Open my QR in Indexx Pay
        </a>
      </section>

      <section className={`${card} mt-6`}>
        <h2 className="text-xl font-semibold">Install Indexx Pay</h2>
        <ol className="mt-4 space-y-4">
          {INSTALL_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1e54b4] text-sm font-bold">{i + 1}</span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="text-sm opacity-80">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <a href={INDEXX_PAY_WEB_URL} target="_blank" rel="noreferrer" className={`${button} mt-5`}>
          Open Indexx Pay
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

      <LoginPopup
        isOpen={loginOpen}
        onRegisterClick={() => setLoginOpen(false)}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => setLoginOpen(false)}
      />
    </main>
  );
}
