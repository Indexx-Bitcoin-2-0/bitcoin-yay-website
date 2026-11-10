"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_BASE_URL, EXTERNAL_URLS } from "@/lib/api-config";

type Campaign = {
  title: string;
  status: "scheduled" | "live" | "ended";
  startsAt?: string;
  endsAt?: string;
  termsUrl?: string;
  miningDayTarget: number;
  consistentMinerTarget?: number;
  referralMiningDayTarget: number;
  rewardSummary?: string;
  launchTime?: string;
  termsVersion?: string;
  eligibleCountries?: string[];
  winnerCount?: number;
  referralCap?: number;
  turboRewardDays?: number;
  btcyPrizePool?: number;
  payoutNetwork?: string;
  rewardTiers?: Array<{ key?: string; label?: string; description?: string }>;
  faq?: Array<{ question: string; answer: string }>;
  communityTasks?: Array<{ key?: string; label?: string; description?: string }>;
};

type LeaderboardRow = { rank: number; participant: string; qualifiedReferrals: number; miningDays: number; rewardTier: string; projectedWinner: boolean };

const date = (value?: string) => value
  ? new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  : "To be announced";

export default function BlackFridayPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/btcy/campaigns/black-friday-2026`)
      .then(async response => {
        if (!response.ok) throw new Error("Campaign unavailable");
        return response.json();
      })
      .then(payload => setCampaign(payload?.data ?? null))
      .catch(() => setUnavailable(true));
    fetch(`${API_BASE_URL}/api/v1/btcy/campaigns/black-friday-2026/leaderboard`).then(response => response.json()).then(payload => setLeaderboard(payload?.data || [])).catch(() => setLeaderboard([]));
    fetch(`${API_BASE_URL}/api/v1/btcy/campaigns/black-friday-2026/track`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ eventType: "page_view", channel: "website" }) }).catch(() => undefined);
  }, []);

  if (unavailable) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">Black Friday Challenge</h1><p className="mt-5 text-lg text-tertiary">Campaign details will be published here when the official rules are live.</p></main>;
  }

  return <main className="mx-auto mt-28 max-w-5xl px-6 py-16">
    <p className="text-sm font-bold tracking-[0.2em] text-primary">BITCOIN YAY</p>
    <h1 className="mt-3 text-4xl font-bold md:text-6xl">{campaign?.title || "Black Friday Challenge"}</h1>
    <p className="mt-5 text-lg text-tertiary">{campaign ? `${date(campaign.startsAt)} - ${date(campaign.endsAt)}` : "Loading official campaign details..."}</p>
    {!!campaign?.eligibleCountries?.length && <p className="mt-2 text-sm text-tertiary">Eligible countries: {campaign.eligibleCountries.join(", ")}</p>}

    {campaign && <>
      <section className="mt-12 rounded-3xl border border-primary/50 bg-bg1 p-8">
        <h2 className="text-2xl font-bold">How to qualify</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article><h3 className="font-semibold text-primary">Keep mining</h3><p className="mt-2 text-tertiary">Complete at least {campaign.miningDayTarget} verified active mining days.</p></article>
          <article><h3 className="font-semibold text-primary">Invite genuine users</h3><p className="mt-2 text-tertiary">A referral counts only after registration, activation, and {campaign.referralMiningDayTarget} active mining days.</p></article>
          {campaign.consistentMinerTarget ? <article><h3 className="font-semibold text-primary">Reach the consistent miner tier</h3><p className="mt-2 text-tertiary">An additional verified tier begins at {campaign.consistentMinerTarget} active mining days.</p></article> : null}
          <article><h3 className="font-semibold text-primary">Wait for verification</h3><p className="mt-2 text-tertiary">Rewards are subject to published rules, account checks, and campaign verification.</p></article>
        </div>
      </section>
      <section className="mt-8 rounded-3xl bg-bg1 p-8"><h2 className="text-2xl font-bold">Rewards</h2><p className="mt-3 text-tertiary">{campaign.rewardSummary}</p>
        {!!campaign.rewardTiers?.length && <div className="mt-6 grid gap-4 md:grid-cols-2">{campaign.rewardTiers.map((tier, index) => <article className="rounded-2xl border border-primary/30 p-5" key={tier.key || index}><h3 className="font-semibold text-primary">{tier.label || tier.key}</h3><p className="mt-2 text-sm text-tertiary">{tier.description}</p></article>)}</div>}
        <p className="mt-5 text-sm text-tertiary">Winner count: {campaign.winnerCount || "To be approved"} · Turbo duration: {campaign.turboRewardDays || "To be approved"} days · BTCY prize pool: {campaign.btcyPrizePool || "To be approved"} · Network: {campaign.payoutNetwork || "To be approved"}</p>
      </section>
      {!!leaderboard.length && <section className="mt-8 rounded-3xl bg-bg1 p-8"><h2 className="text-2xl font-bold">Referral leaderboard</h2><p className="mt-2 text-sm text-tertiary">Ranked by qualified referrals, then mining activity and qualification time. Final results require fraud review.</p><div className="mt-5 divide-y divide-primary/20">{leaderboard.slice(0, 20).map(row => <div className="flex items-center gap-4 py-3" key={`${row.rank}-${row.participant}`}><span className="w-10 font-bold text-primary">#{row.rank}</span><span className="flex-1">{row.participant}</span><span className="text-sm text-tertiary">{row.qualifiedReferrals} referrals · {row.miningDays} days</span></div>)}</div></section>}
      {!!campaign.communityTasks?.length && <section className="mt-8 rounded-3xl bg-bg1 p-8"><h2 className="text-2xl font-bold">Community participation</h2><div className="mt-5 space-y-4">{campaign.communityTasks.map((task, index) => <article key={task.key || index}><h3 className="font-semibold text-primary">{task.label || task.key}</h3><p className="mt-1 text-tertiary">{task.description}</p></article>)}</div></section>}
      {!!campaign.faq?.length && <section className="mt-8 rounded-3xl bg-bg1 p-8"><h2 className="text-2xl font-bold">Frequently asked questions</h2><div className="mt-5 space-y-6">{campaign.faq.map((item, index) => <article key={`${index}-${item.question}`}><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-tertiary">{item.answer}</p></article>)}</div><p className="mt-6 text-xs text-tertiary">Terms version: {campaign.termsVersion || "draft"}</p></section>}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link className="rounded-full bg-primary px-7 py-4 text-center font-bold text-black" href="/referral">Get your referral link</Link>
        <Link className="rounded-full border border-primary px-7 py-4 text-center font-bold text-primary" href={EXTERNAL_URLS.app.website}>Open Bitcoin Yay</Link>
        {campaign.termsUrl ? <a className="rounded-full border border-primary px-7 py-4 text-center font-bold text-primary" href={campaign.termsUrl} target="_blank" rel="noreferrer">Read the rules</a> : null}
      </div>
    </>}
  </main>;
}
