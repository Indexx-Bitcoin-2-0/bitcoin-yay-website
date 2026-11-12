"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Campaign, formatDate, formatMoney, getCampaign, referralDayRule, zoneLabel } from "@/lib/black-friday";

// Official rules for the Black Friday Airdrop Challenge. Dates, milestones and
// prize values come from the campaign API so the rules match what the backend applies.
export default function BlackFridayTermsPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => { getCampaign().then(setCampaign).catch(() => setUnavailable(true)); }, []);

  if (unavailable) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">BTCY Airdrop Rules</h1><p className="mt-5 text-lg text-tertiary">The official rules will be published here when the campaign is live.</p></main>;
  }
  if (!campaign) {
    return <main className="mx-auto mt-32 max-w-3xl px-6 py-24 text-center"><p className="text-lg text-tertiary">Loading the official rules...</p></main>;
  }

  const draw = campaign.luckyDraw;
  const milestones = campaign.milestones || [];
  const dayRule = referralDayRule(campaign);
  const money = (amount: number) => formatMoney(amount, draw?.currency || "BTCY", draw?.valueCurrency);
  const isBtcy = (draw?.currency || "").toUpperCase() === "BTCY";
  const zone = zoneLabel(campaign);
  const section = "mt-10";
  const heading = "text-2xl font-bold";
  const list = "mt-4 list-disc space-y-2 pl-5 text-tertiary";

  return <main className="mx-auto mt-28 max-w-3xl px-6 py-16">
    <Link className="text-sm font-semibold text-primary" href="/airdrop">← Back to the challenge</Link>
    <h1 className="mt-4 text-4xl font-bold md:text-5xl">{campaign.title}: Official Rules</h1>
    <p className="mt-3 text-sm text-tertiary">Terms version {campaign.termsVersion || "draft"}. These rules may be updated before launch; the version shown here applies.</p>

    <section className={section}>
      <h2 className={heading}>1. Campaign dates</h2>
      <ul className={list}>
        <li>Starts: {formatDate(campaign.startsAt, campaign, true)} ({zone})</li>
        <li>Ends: {formatDate(campaign.endsAt, campaign, true)} ({zone})</li>
        <li>Winner announcement: {formatDate(campaign.winnerAnnouncementAt, campaign)}, after referral and eligibility checks.</li>
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
      <p className="mt-4 text-tertiary">A referral is verified only after the invited user registers through your unique referral link, activates mining and completes {dayRule} of qualifying mining activity during the campaign. Your total referrals and verified referrals are shown separately; registrations that are not verified do not count toward milestones.</p>
    </section>

    {milestones.length ? <section className={section}>
      <h2 className={heading}>4. Qualification</h2>
      <ul className={list}>{milestones.map(milestone => <li key={milestone.key}><strong className="text-white">{milestone.referrals} verified referrals:</strong> {milestone.description || milestone.title}</li>)}</ul>
    </section> : null}

    {draw ? <section className={section}>
      <h2 className={heading}>5. Reward and winner selection</h2>
      <ul className={list}>
        <li>Total advertised reward value: {money(draw.totalPool)}{isBtcy ? " Tokens" : ""}, shared by {draw.winnerCount} winners × {money(draw.prizeAmount)} each.</li>
        <li>Participants who reach {draw.entryReferrals} verified referrals and pass review qualify. Each qualifying participant receives one entry.</li>
        <li>If more than {draw.winnerCount} participants qualify, the {draw.winnerCount} winners are drawn at random after the campaign ends. Reaching {draw.entryReferrals} verified referrals does not guarantee a reward.</li>
        {isBtcy ? <>
          <li>Rewards are distributed in Bitcoin Yay (BTCY) Tokens, not cash or USDT. Token quantities are calculated using the approved BTCY valuation at the time rewards are allocated.</li>
          <li>Winners may list BTCY Tokens on the Bitcoin Yay P2P Marketplace, subject to marketplace availability and platform rules. If a P2P sale completes, the seller may withdraw the proceeds through the supported withdrawal process, subject to its conditions.</li>
          <li>The advertised dollar value is the US-dollar equivalent of the BTCY Token rewards. It is not a promise of cash, USDT, a guaranteed resale price or guaranteed withdrawal proceeds. P2P sales depend on buyer availability, market conditions and platform rules.</li>
        </> : null}
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
        <li>Participants must use a valid Bitcoin Yay account and their own unique referral link.</li>
        <li>Only genuine referrals who complete {dayRule} count toward the verified referrals.</li>
        <li>Self-referrals, duplicate accounts, bots, fake accounts and manipulated activity do not qualify and may lead to disqualification.</li>
        <li>Bitcoin Yay may review activity and disqualify invalid referrals before confirming winners.</li>
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
      <p className="mt-4 text-tertiary">See the FAQ on the <Link className="text-primary underline" href="/airdrop">campaign page</Link>{campaign.supportUrl ? <> or <a className="text-primary underline" href={campaign.supportUrl}>contact support</a></> : null}.</p>
    </section>
  </main>;
}
