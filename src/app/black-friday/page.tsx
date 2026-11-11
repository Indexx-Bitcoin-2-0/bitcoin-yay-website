"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { useCallback, useEffect, useState } from "react";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";
import {
  Campaign,
  LeaderboardRow,
  Progress,
  Winners,
  formatDate,
  formatMoney,
  getCampaign,
  getLeaderboard,
  getProgress,
  getWinners,
  joinCampaign,
  trackEvent,
  zoneLabel,
} from "@/lib/black-friday";

const STATUS_LABEL: Record<Campaign["status"], string> = { scheduled: "Starts soon", live: "Live now", ended: "Ended" };

const ProgressBar = ({ value, target }: { value: number; target: number }) => (
  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.round((value / Math.max(target, 1)) * 100))}%` }} />
  </div>
);

export default function BlackFridayPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  // The site's oval button; the main action uses the orange (active) oval.
  const OVAL = "w-40 md:w-48 lg:w-52";
  const Oval = ({ text, onClick, primary = false }: { text: string; onClick: () => void; primary?: boolean }) =>
    <CustomButton index={0} text={text} handleButtonClick={onClick} isActive={primary} imageClassName={OVAL} />;
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [winners, setWinners] = useState<Winners | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getCampaign().then(setCampaign).catch(() => setUnavailable(true));
    getLeaderboard().then(rows => setLeaderboard(rows || [])).catch(() => setLeaderboard([]));
    getWinners().then(setWinners).catch(() => setWinners(null));
    trackEvent("page_view");
  }, []);

  const loadProgress = useCallback(() => {
    if (!user?.access_token) { setProgress(null); return; }
    getProgress(user.access_token).then(setProgress).catch(() => setProgress(null));
  }, [user?.access_token]);

  useEffect(() => { loadProgress(); }, [loadProgress]);

  const join = async () => {
    if (!isAuthenticated || !user?.access_token) { setLoginOpen(true); return; }
    setJoining(true);
    setMessage("");
    try {
      await joinCampaign(user.access_token);
      setMessage("You're in. Share your link to start collecting verified referrals.");
      loadProgress();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to join right now.");
    } finally {
      setJoining(false);
    }
  };

  const copyLink = async () => {
    if (!progress?.referralUrl) return;
    try {
      await navigator.clipboard.writeText(progress.referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      trackEvent("link_click", { metadata: { action: "copy_referral_link" } });
    } catch { /* clipboard blocked: the link is still visible to copy by hand */ }
  };

  if (unavailable) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">Black Friday Airdrop Challenge</h1><p className="mt-5 text-lg text-tertiary">Campaign details will be published here when the official rules are live.</p></main>;
  }
  if (!campaign) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><p className="text-lg text-tertiary">Loading official campaign details...</p></main>;
  }

  const draw = campaign.luckyDraw;
  const milestones = campaign.milestones || [];
  const verified = progress?.verifiedReferrals ?? progress?.qualifiedReferrals ?? 0;
  const total = Math.max(progress?.totalReferrals ?? 0, verified);
  const dayTarget = campaign.referralMiningDayTarget || 1;
  const announcement = winners?.announcementAt || campaign.winnerAnnouncementAt;
  const zone = zoneLabel(campaign);
  const canJoin = campaign.allowRegistration !== false && campaign.status !== "ended" && !progress?.joined;

  return <main className="mx-auto mt-28 max-w-5xl px-6 py-16">
    {/* Hero */}
    <p className="text-sm font-bold tracking-[0.2em] text-primary">BITCOIN YAY · {STATUS_LABEL[campaign.status]}</p>
    <h1 className="mt-3 text-4xl font-bold md:text-6xl">{campaign.title}</h1>
    {campaign.body ? <p className="mt-5 max-w-3xl text-lg text-tertiary">{campaign.body}</p> : null}
    <p className="mt-4 text-lg">{formatDate(campaign.startsAt, campaign)} – {formatDate(campaign.endsAt, campaign)} <span className="text-tertiary">({zone})</span></p>
    {announcement ? <p className="mt-1 text-tertiary">Winners announced {formatDate(announcement, campaign)}</p> : null}
    <div className="mt-8 flex flex-wrap items-center gap-6">
      {canJoin ? <Oval primary text={joining ? "Joining..." : isAuthenticated ? "Join the Airdrop" : "Sign in to join"} onClick={() => { if (!joining) join(); }} /> : null}
      {progress?.joined ? <span className="font-bold text-primary">✓ You&apos;ve joined</span> : null}
      <Oval text="Read the rules" onClick={() => router.push("/black-friday/terms")} />
    </div>
    {canJoin ? <p className="mt-3 text-sm text-tertiary">Joining means you accept the <Link className="underline" href="/black-friday/terms">campaign rules</Link>.</p> : null}
    {message ? <p className="mt-3 text-sm text-primary">{message}</p> : null}

    {/* Reward pool */}
    {draw?.totalPool ? <section className="mt-12 rounded-3xl border border-primary bg-bg1 p-8 text-center">
      <p className="text-sm font-bold tracking-[0.2em] text-primary">LUCKY DRAW PRIZE POOL</p>
      <p className="mt-3 text-5xl font-bold md:text-6xl">{formatMoney(draw.totalPool, draw.currency)}</p>
      <p className="mt-2 text-xl font-semibold text-primary">{draw.winnerCount} winners × {formatMoney(draw.prizeAmount, draw.currency)}</p>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-tertiary">Reach {draw.entryReferrals} verified referrals to enter. Entry does not guarantee a prize: winners are drawn at random and announced after verification.</p>
    </section> : null}

    {/* How to participate */}
    <section className="mt-8 rounded-3xl bg-bg1 p-8">
      <h2 className="text-2xl font-bold">How to participate</h2>
      <ol className="mt-6 grid gap-5 md:grid-cols-4">
        {[
          ["Register or sign in", "Use your Bitcoin Yay account and join the airdrop."],
          ["Share your link", "Copy your unique referral link and share it with friends."],
          ["Invite real users", "Friends sign up through your link and start mining."],
          ["Get verified", `Each referral is verified after ${dayTarget} day${dayTarget === 1 ? "" : "s"} of mining.`],
        ].map(([title, text], index) => <li key={title}><span className="text-3xl font-bold text-primary">{index + 1}</span><h3 className="mt-2 font-semibold">{title}</h3><p className="mt-1 text-sm text-tertiary">{text}</p></li>)}
      </ol>
    </section>

    {/* Milestones */}
    {milestones.length ? <section className="mt-8">
      <h2 className="text-2xl font-bold">Referral milestones</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {milestones.map(milestone => {
          const reached = verified >= milestone.referrals;
          return <article key={milestone.key} className={`rounded-3xl border p-7 ${reached ? "border-green-400/60" : "border-primary/40"} bg-bg1`}>
            <p className="text-4xl font-bold text-primary">{milestone.referrals}</p>
            <p className="text-sm text-tertiary">verified referrals</p>
            <h3 className="mt-4 text-lg font-semibold">{reached ? "✓ " : ""}{milestone.title}</h3>
            {milestone.description ? <p className="mt-2 text-sm text-tertiary">{milestone.description}</p> : null}
            {progress ? <><ProgressBar value={verified} target={milestone.referrals} /><p className="mt-2 text-xs text-tertiary">{Math.min(verified, milestone.referrals)} / {milestone.referrals}</p></> : null}
          </article>;
        })}
      </div>
    </section> : null}

    {/* Referral dashboard */}
    <section className="mt-8 rounded-3xl bg-bg1 p-8">
      <h2 className="text-2xl font-bold">Your referral dashboard</h2>
      {!isAuthenticated ? <div className="mt-4">
        <p className="text-tertiary">Sign in to see your total and verified referrals and your referral link.</p>
        <div className="mt-4 flex"><Oval primary text="Sign in" onClick={() => setLoginOpen(true)} /></div>
      </div> : <>
        {progress?.isWinner && draw ? <p className="mt-4 rounded-2xl border border-green-400/60 p-4 font-semibold text-green-300">You won {formatMoney(draw.prizeAmount, draw.currency)} in the lucky draw. Your prize is confirmed after final verification.</p> : null}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-5 text-center"><p className="text-4xl font-bold">{total}</p><p className="mt-1 text-sm text-tertiary">Total referrals</p></div>
          <div className="rounded-2xl bg-white/5 p-5 text-center"><p className="text-4xl font-bold text-primary">{verified}</p><p className="mt-1 text-sm text-tertiary">Verified referrals</p></div>
        </div>
        <p className="mt-4 text-sm text-tertiary">Only verified referrals count. A referral is verified after they sign up with your link, start mining and complete {dayTarget} mining day{dayTarget === 1 ? "" : "s"}.</p>
        {progress?.nextMilestone ? <p className="mt-2 font-semibold text-primary">{progress.nextMilestone.remaining} more verified referral{progress.nextMilestone.remaining === 1 ? "" : "s"} to reach {progress.nextMilestone.referrals}.</p> : null}
        {progress?.luckyDrawEligible && !progress?.isWinner ? <p className="mt-2 font-semibold text-green-300">You are entered in the lucky draw (subject to review).</p> : null}
        {progress?.referralUrl ? <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
          <code className="w-full flex-1 overflow-x-auto rounded-2xl bg-black/40 px-4 py-3 text-sm">{progress.referralUrl}</code>
          <Oval primary text={copied ? "Copied" : "Copy link"} onClick={copyLink} />
        </div> : null}
      </>}
    </section>

    {/* Winner announcement */}
    <section className="mt-8 rounded-3xl bg-bg1 p-8">
      <h2 className="text-2xl font-bold">Lucky draw winners</h2>
      {winners?.published && winners.winners.length
        ? <div className="mt-5 divide-y divide-primary/20">{winners.winners.map(row => <div className="flex items-center gap-4 py-3" key={row.rank}><span className="w-10 font-bold text-primary">#{row.rank}</span><span className="flex-1">{row.participant}</span><span className="font-semibold text-primary">{formatMoney(row.prizeAmount, row.currency)}</span></div>)}</div>
        : <p className="mt-3 text-tertiary">{announcement ? `Winners will be announced on ${formatDate(announcement, campaign)}, after referral and eligibility checks.` : "Winners will be announced after referral and eligibility checks."}</p>}
    </section>

    {/* Leaderboard */}
    {leaderboard.length ? <section className="mt-8 rounded-3xl bg-bg1 p-8">
      <h2 className="text-2xl font-bold">Referral leaderboard</h2>
      <p className="mt-2 text-sm text-tertiary">Ranked by verified referrals. This shows progress only: lucky draw winners are picked at random from eligible participants.</p>
      <div className="mt-5 divide-y divide-primary/20">
        {leaderboard.slice(0, 20).map(row => <div className="flex items-center gap-4 py-3" key={`${row.rank}-${row.participant}`}>
          <span className="w-10 font-bold text-primary">#{row.rank}</span>
          <span className="flex-1">{row.participant}{row.milestoneTitle ? <span className="block text-xs text-green-300">{row.milestoneTitle}</span> : null}</span>
          <span className="text-right text-sm"><span className="block font-semibold text-primary">{row.verifiedReferrals} verified</span><span className="text-tertiary">{row.totalReferrals} total</span></span>
        </div>)}
      </div>
    </section> : null}

    {/* Fair play */}
    <section className="mt-8 rounded-3xl bg-bg1 p-8">
      <h2 className="text-2xl font-bold">Eligibility and fair play</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-tertiary">
        <li>Register through the official Bitcoin Yay airdrop page with a valid account.</li>
        <li>Referrals must be genuine users joining through your unique referral link.</li>
        <li>Self-referrals, duplicate accounts, bots, fake accounts and manipulated activity do not qualify.</li>
        <li>Bitcoin Yay may review referral activity before confirming milestones and selecting winners.</li>
        <li>All rewards are subject to verification and the final campaign terms.</li>
      </ul>
      <Link className="mt-5 inline-block font-semibold text-primary underline" href="/black-friday/terms">Read the full rules</Link>
    </section>

    {/* FAQ */}
    {campaign.faq?.length ? <section className="mt-8 rounded-3xl bg-bg1 p-8">
      <h2 className="text-2xl font-bold">Frequently asked questions</h2>
      <div className="mt-5 space-y-6">{campaign.faq.map((item, index) => <article key={`${index}-${item.question}`}><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-tertiary">{item.answer}</p></article>)}</div>
    </section> : null}

    <div className="mt-10 flex flex-wrap items-center gap-6">
      <Oval text="Referral program" onClick={() => router.push("/referral")} />
      {campaign.supportUrl ? <Oval text="Get support" onClick={() => { window.location.href = campaign.supportUrl!; }} /> : null}
    </div>
    <p className="mt-6 text-xs text-tertiary">Terms version: {campaign.termsVersion || "draft"}</p>

    <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={() => setLoginOpen(false)} onRegisterClick={() => setLoginOpen(false)} />
  </main>;
}
