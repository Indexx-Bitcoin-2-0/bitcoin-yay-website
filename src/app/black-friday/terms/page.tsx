"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Campaign, formatDate, formatMoney, getCampaign, zoneLabel } from "@/lib/black-friday";

// Official rules for the Black Friday Airdrop Challenge. Dates, milestones and
// prize values come from the campaign API so the rules match what the backend applies.
export default function BlackFridayTermsPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => { getCampaign().then(setCampaign).catch(() => setUnavailable(true)); }, []);

  if (unavailable) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">Black Friday Airdrop Rules</h1><p className="mt-5 text-lg text-tertiary">The official rules will be published here when the campaign is live.</p></main>;
  }
  if (!campaign) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><p className="text-lg text-tertiary">Loading the official rules...</p></main>;
  }

  const draw = campaign.luckyDraw;
  const milestones = campaign.milestones || [];
  const dayTarget = campaign.referralMiningDayTarget || 1;
  const zone = zoneLabel(campaign);
  const section = "mt-10";
  const heading = "text-2xl font-bold";
  const list = "mt-4 list-disc space-y-2 pl-5 text-tertiary";

  return <main className="mx-auto mt-28 max-w-3xl px-6 py-16">
    <Link className="text-sm font-semibold text-primary" href="/black-friday">← Back to the challenge</Link>
    <h1 className="mt-4 text-4xl font-bold md:text-5xl">{campaign.title}: Official Rules</h1>
    <p className="mt-3 text-sm text-tertiary">Terms version {campaign.termsVersion || "draft"}. These rules may be updated before launch; the version shown here applies.</p>

    <section className={section}>
      <h2 className={heading}>1. Campaign dates</h2>
      <ul className={list}>
        <li>Starts: {formatDate(campaign.startsAt, campaign, true)} ({zone})</li>
        <li>Ends: {formatDate(campaign.endsAt, campaign, true)} ({zone})</li>
        <li>Winner announcement: planned for {formatDate(campaign.winnerAnnouncementAt, campaign)}, after referral and eligibility checks.</li>
      </ul>
    </section>

    <section className={section}>
      <h2 className={heading}>2. How to take part</h2>
      <ul className={list}>
        <li>Register or sign in to a valid Bitcoin Yay account and join the airdrop on the official campaign page or in the Bitcoin Yay app.</li>
        <li>Share your unique referral link. Only users who sign up through your link count as your referrals.</li>
      </ul>
    </section>

    <section className={section}>
      <h2 className={heading}>3. Verified referrals</h2>
      <p className="mt-4 text-tertiary">A referral is verified only after the invited user registers through your unique referral link, activates mining and completes {dayTarget} day{dayTarget === 1 ? "" : "s"} of qualifying mining activity during the campaign. Your total referrals and verified referrals are shown separately; registrations that are not verified do not count toward milestones.</p>
    </section>

    {milestones.length ? <section className={section}>
      <h2 className={heading}>4. Referral milestones</h2>
      <ul className={list}>{milestones.map(milestone => <li key={milestone.key}><strong className="text-white">{milestone.referrals} verified referrals:</strong> {milestone.description || milestone.title}</li>)}</ul>
    </section> : null}

    {draw ? <section className={section}>
      <h2 className={heading}>5. Lucky draw</h2>
      <ul className={list}>
        <li>Prize pool: {formatMoney(draw.totalPool, draw.currency)}, shared by {draw.winnerCount} winners × {formatMoney(draw.prizeAmount, draw.currency)}.</li>
        <li>Participants who reach {draw.entryReferrals} verified referrals and pass review are entered. Each eligible participant receives one entry.</li>
        <li>Winners are drawn at random after the campaign ends. Reaching {draw.entryReferrals} verified referrals does not guarantee a prize.</li>
        <li>Winners are published on the campaign page after validation.</li>
        {draw.currency?.toUpperCase() === "USDXX" ? <>
          <li>Prizes are paid in USDXX to the winner&apos;s USDXX wallet (app.usdxx.ai), which uses the same Indexx account as Bitcoin Yay. Winners claim their prize under Rewards within 3 days of the winners being announced; unclaimed prizes lapse. A KYC-verified account is required to claim.</li>
          <li>Converting USDXX to USDT will be available on Indexx Exchange once the winner&apos;s USDXX wallet is linked to it. Conversion carries a 1% fee and USDT withdrawals a 3% fee. The timing will be announced to winners; no USDT is paid directly.</li>
        </> : null}
      </ul>
    </section> : null}

    <section className={section}>
      <h2 className={heading}>6. Eligibility and fair play</h2>
      <ul className={list}>
        <li>Participants must register through the official Bitcoin Yay airdrop page and use a valid account.</li>
        <li>Referrals must be genuine users joining through the participant&apos;s unique referral link.</li>
        <li>Self-referrals, duplicate accounts, bots, fake accounts and manipulated activity do not qualify and may lead to disqualification.</li>
        <li>Bitcoin Yay may review referral activity before confirming milestones and selecting lucky-draw winners.</li>
        {campaign.eligibleCountries?.length ? <li>Eligible countries: {campaign.eligibleCountries.join(", ")}.</li> : null}
      </ul>
    </section>

    <section className={section}>
      <h2 className={heading}>7. Rewards</h2>
      <ul className={list}>
        <li>All rewards are subject to successful verification and the final campaign terms.</li>
        <li>How and when rewards are credited will be communicated before rewards are issued.</li>
        {campaign.rewardSummary ? <li>{campaign.rewardSummary}</li> : null}
      </ul>
    </section>

    <section className={section}>
      <h2 className={heading}>8. Questions and support</h2>
      <p className="mt-4 text-tertiary">See the FAQ on the <Link className="text-primary underline" href="/black-friday">campaign page</Link>{campaign.supportUrl ? <> or <a className="text-primary underline" href={campaign.supportUrl}>contact support</a></> : null}.</p>
    </section>
  </main>;
}
