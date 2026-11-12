"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import CustomButton2 from "@/components/CustomButton2";
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
  referralDayRule,
  getLeaderboard,
  getProgress,
  getWinners,
  joinCampaign,
  trackEvent,
  zoneLabel,
} from "@/lib/black-friday";

// Same look as the main /airdrop page: big headings, art beside the hero,
// illustrated steps, Key Dates and FAQs. The reward is paid in BTCY Tokens.
import EagleArt from "@/assets/images/btcy-airdrop/btcy-airdrop-eagle.webp";
import BtcyCoin from "@/assets/images/quantum-mining/btcy-icon.webp";
import BtcyMark from "@/assets/images/btcy-airdrop/btcy-mark.png";
import StepRegister from "@/assets/images/btcy-airdrop/register.png";
import StepShare from "@/assets/images/airdrop/how_it_works_3.svg";
import StepMine from "@/assets/images/btcy-airdrop/mineToQualify.png";
import StepVerified from "@/assets/images/btcy-airdrop/eligibilityReview.png";
import MilestoneArt1 from "@/assets/images/wibs-airdrop/what-you-get-1.webp";
import MilestoneArt2 from "@/assets/images/wibs-airdrop/what-you-get-3.webp";
import CalendarArt from "@/assets/images/wibs-airdrop/calander-art.webp";
import FaqArt from "@/assets/images/wibs-airdrop/art-4.webp";
import RegisterButtonImage from "@/assets/images/buttons/register-button.webp";
import ThumbsUpImage from "@/assets/images/buttons/thumbs-up-button.webp";
import NoteButtonImage from "@/assets/images/buttons/note-button.webp";
import DownloadLogo from "@/assets/images/download-button.svg";

const STATUS_LABEL: Record<Campaign["status"], string> = { scheduled: "Starts soon", live: "Live now", ended: "Ended" };

const ProgressBar = ({ value, target }: { value: number; target: number }) => (
  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.round((value / Math.max(target, 1)) * 100))}%` }} />
  </div>
);

export default function BlackFridayAirdrop() {
  const { user, isAuthenticated } = useAuth();
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
    if (joining) return;
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
    return <main className="mx-auto mt-40 max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl md:text-6xl font-bold">BTCY Airdrop</h1><p className="mt-5 text-xl text-tertiary">Campaign details will be published here when the official rules are live.</p></main>;
  }
  if (!campaign) {
    return <main className="mx-auto mt-40 max-w-3xl px-6 py-24 text-center"><p className="text-xl text-tertiary">Loading official campaign details...</p></main>;
  }

  const draw = campaign.luckyDraw;
  const money = (amount: number) => formatMoney(amount, draw?.currency || "BTCY", draw?.valueCurrency);
  const isBtcy = (draw?.currency || "").toUpperCase() === "BTCY";
  const dayRule = referralDayRule(campaign);
  const milestones = campaign.milestones || [];
  const entryTarget = draw?.entryReferrals || milestones[milestones.length - 1]?.referrals || 0;
  const verified = progress?.verifiedReferrals ?? progress?.qualifiedReferrals ?? 0;
  const total = Math.max(progress?.totalReferrals ?? 0, verified);
  const announcement = winners?.announcementAt || campaign.winnerAnnouncementAt;
  const zone = zoneLabel(campaign);
  const canJoin = campaign.allowRegistration !== false && campaign.status !== "ended" && !progress?.joined;
  const faq = campaign.faq || [];
  const milestoneArt = [MilestoneArt1, MilestoneArt2];

  const steps = [
    { image: StepRegister, title: "Join the Airdrop", text: "Sign in with your Bitcoin Yay account and join the airdrop." },
    { image: StepShare, title: "Share Your Link", text: "Copy your unique referral link and share it with friends." },
    { image: StepMine, title: "Friends Start Mining", text: "Invite genuine users: they sign up through your link and activate mining in the app." },
    { image: StepVerified, title: "Get Verified", text: `Each referral is verified after ${dayRule}.${entryTarget ? ` Reach ${entryTarget} verified referrals to qualify.` : ""}` },
  ];

  return (
    <main className="mx-auto mt-40 max-w-[1800px]">
      {/* Hero */}
      <div className="relative flex flex-col lg:flex-row lg:items-center">
        <div className="mt-10 w-full lg:w-[60%] flex flex-col px-4 md:pl-20 xl:pl-30">
          <p className="text-lg md:text-2xl font-bold tracking-[0.2em] text-primary">BITCOIN YAY · {STATUS_LABEL[campaign.status].toUpperCase()}</p>
          <h1 className="mt-4 text-[40px] md:text-8xl font-bold leading-tight">{campaign.title}</h1>
          {campaign.body ? <p className="mt-10 text-2xl md:text-4xl text-white font-medium">{campaign.body}</p> : null}
          {draw?.totalPool ? (
            <p className="mt-6 flex items-center gap-3 text-2xl md:text-3xl font-semibold text-primary">
              {isBtcy ? <Image src={BtcyMark} alt="BTCY" className="h-10 w-10" /> : null}
              {money(draw.totalPool)}{isBtcy ? " Tokens" : ""} · {draw.winnerCount} winners
            </p>
          ) : null}
          <p className="mt-6 text-2xl text-white">
            {formatDate(campaign.startsAt, campaign)} – {formatDate(campaign.endsAt, campaign)} <span className="text-tertiary">({zone})</span>
          </p>

          <div className="font-bold mt-10 flex flex-wrap justify-center md:justify-start items-start gap-12 text-center">
            {canJoin ? (
              <CustomButton2
                image={RegisterButtonImage}
                text={joining ? "Joining..." : isAuthenticated ? "Join the Airdrop" : "Sign in to Join"}
                onClick={join}
                imageStyling="w-30"
              />
            ) : null}
            {progress?.joined ? (
              <CustomButton2 image={ThumbsUpImage} text="You've joined" onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })} imageStyling="w-30" />
            ) : null}
            <CustomButton2 image={NoteButtonImage} text="Read the Rules" link="/black-friday/terms" imageStyling="w-30" />
          </div>
          {canJoin ? <p className="mt-6 text-lg text-tertiary">Joining means you accept the <Link className="underline" href="/black-friday/terms">campaign rules</Link>.</p> : null}
          {message ? <p className="mt-3 text-lg text-primary">{message}</p> : null}
        </div>
        <div className="relative mx-auto lg:mx-0 lg:w-[40%] flex justify-center">
          <Image src={EagleArt} alt="An eagle carrying a bag of BTCY coins" priority className="w-80 md:w-120 xl:w-150 mt-10" />
        </div>
      </div>

      {/* Prize pool */}
      {draw?.totalPool ? (
        <section className="mt-60 px-4 md:px-20 xl:px-20 text-center">
          <h2 className="text-5xl lg:text-8xl font-bold">REWARD POOL</h2>
          <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-12">
            {isBtcy ? <Image src={BtcyCoin} alt="BTCY Token" className="w-56 md:w-72" /> : null}
            <div>
              <p className="text-6xl md:text-8xl font-bold text-primary">{money(draw.totalPool)}{isBtcy ? " Tokens" : ""}</p>
              <p className="mt-4 text-3xl md:text-4xl font-semibold">{draw.winnerCount} Winners × {money(draw.prizeAmount)} each</p>
              <p className="mx-auto mt-8 max-w-3xl text-xl md:text-2xl text-tertiary">
                Reach {draw.entryReferrals} verified referrals to qualify. If more than {draw.winnerCount} people qualify, the {draw.winnerCount} winners are drawn at random after verification. Qualifying does not guarantee a reward.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* How it works */}
      <section className="mt-80 px-4 md:px-20 xl:px-20">
        <h2 className="text-6xl lg:text-8xl text-center">How It Works</h2>
        <div className="mt-20 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map(step => (
            <div key={step.title} className="max-w-100 text-center mx-auto">
              <div className="h-70 flex justify-center items-center">
                <Image src={step.image} alt={step.title} className="w-50 max-h-64 object-contain" />
              </div>
              <h3 className="mt-6 text-3xl font-semibold h-24 flex items-center justify-center">{step.title}</h3>
              <p className="text-xl font-light">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      {milestones.length ? (
        <section className="mt-80 px-4 md:px-20 xl:px-20">
          <h2 className="text-6xl lg:text-8xl text-center font-bold">What You Get</h2>
          <div className={`mt-20 grid gap-16 max-w-6xl mx-auto ${milestones.length > 1 ? "md:grid-cols-2" : ""}`}>
            {milestones.map((milestone, index) => {
              const reached = verified >= milestone.referrals;
              return (
                <article key={milestone.key} className="flex flex-col items-center text-center">
                  <Image src={milestoneArt[index % milestoneArt.length]} alt="" className="w-50 md:w-60" />
                  <p className="mt-8 text-7xl md:text-8xl font-bold text-primary">{milestone.referrals}</p>
                  <p className="text-xl text-tertiary">verified referrals</p>
                  <h3 className="mt-6 text-3xl font-semibold">{reached ? "✓ " : ""}{milestone.title}</h3>
                  {milestone.description ? <p className="mt-3 text-xl font-light text-tertiary">{milestone.description}</p> : null}
                  {progress ? (
                    <div className="mt-4 w-full max-w-sm">
                      <ProgressBar value={verified} target={milestone.referrals} />
                      <p className="mt-2 text-lg text-tertiary">{Math.min(verified, milestone.referrals)} / {milestone.referrals}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Referral dashboard */}
      <section id="dashboard" className="mt-80 px-4 md:px-20 xl:px-40 scroll-mt-40">
        <h2 className="text-5xl lg:text-7xl font-bold text-center">Your Referral Dashboard</h2>
        <div className="mx-auto mt-16 max-w-5xl rounded-3xl bg-bg1 p-8 md:p-12">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center text-center">
              <p className="text-2xl text-tertiary">Sign in to see your total and verified referrals and your referral link.</p>
              <div className="mt-8">
                <CustomButton2 image={RegisterButtonImage} text="Sign in" onClick={() => setLoginOpen(true)} imageStyling="w-24" />
              </div>
            </div>
          ) : (
            <>
              {progress?.isWinner && draw ? <p className="mb-6 rounded-2xl border border-primary/60 p-5 text-xl font-semibold text-primary">You are a winner: {money(draw.prizeAmount)}. Your reward is confirmed after final verification.</p> : null}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-8 text-center"><p className="text-6xl font-bold">{total}</p><p className="mt-2 text-xl text-tertiary">Total referrals</p></div>
                <div className="rounded-2xl bg-white/5 p-8 text-center"><p className="text-6xl font-bold text-primary">{verified}</p><p className="mt-2 text-xl text-tertiary">Verified referrals</p></div>
              </div>
              {entryTarget ? (
                <div className="mt-6">
                  <ProgressBar value={verified} target={entryTarget} />
                  <p className="mt-2 text-lg text-tertiary">{Math.min(verified, entryTarget)} / {entryTarget} verified referrals to qualify</p>
                </div>
              ) : null}
              <p className="mt-6 text-lg text-tertiary">Only verified referrals count. A referral is verified after they sign up with your link, activate mining and complete {dayRule}.</p>
              {progress?.nextMilestone ? <p className="mt-3 text-xl font-semibold text-primary">{progress.nextMilestone.remaining} more verified referral{progress.nextMilestone.remaining === 1 ? "" : "s"} to reach {progress.nextMilestone.referrals}.</p> : null}
              {progress?.luckyDrawEligible && !progress?.isWinner ? <p className="mt-3 text-xl font-semibold text-primary">You qualify for the reward draw (subject to review).</p> : null}
              {progress?.referralUrl ? (
                <div className="mt-8 flex flex-col items-center gap-6 md:flex-row">
                  <code className="w-full flex-1 overflow-x-auto rounded-2xl bg-black/40 px-5 py-4 text-base">{progress.referralUrl}</code>
                  <CustomButton2 image={ThumbsUpImage} text={copied ? "Copied" : "Copy link"} onClick={copyLink} imageStyling="w-20" />
                </div>
              ) : null}
              {!progress?.joined && canJoin ? (
                <div className="mt-8 flex justify-center">
                  <CustomButton2 image={RegisterButtonImage} text={joining ? "Joining..." : "Join the Airdrop"} onClick={join} imageStyling="w-24" />
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* BTCY reward: what winners get and how they can use it */}
      {isBtcy ? (
        <section className="mt-80 px-4 md:px-20 xl:px-20">
          <div className="flex flex-col items-center text-center">
            <Image src={BtcyMark} alt="BTCY" className="w-28 md:w-36" />
            <h2 className="mt-8 text-5xl lg:text-8xl font-bold">Your BTCY Reward</h2>
            <p className="mt-6 max-w-4xl text-2xl md:text-3xl font-light">Rewards are paid in Bitcoin Yay (BTCY) Tokens, not cash or USDT.</p>
          </div>
          <ol className="mt-20 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              ["1", "Receive BTCY Tokens", `Each winner receives BTCY Tokens worth ${draw ? money(draw.prizeAmount).replace(/ worth of .*/, "") : "$10"}, calculated at the approved BTCY valuation when rewards are allocated.`],
              ["2", "List on the P2P Marketplace", "Winners may list their BTCY Tokens on the Bitcoin Yay P2P Marketplace, subject to availability and platform rules."],
              ["3", "Withdraw the proceeds", "When a P2P sale completes, the seller can withdraw the proceeds through the supported withdrawal process, subject to its conditions."],
            ].map(([n, title, text]) => (
              <li key={n} className="rounded-3xl border border-primary/40 p-8 text-center">
                <p className="text-6xl font-bold text-primary">{n}</p>
                <h3 className="mt-4 text-3xl font-semibold">{title}</h3>
                <p className="mt-3 text-xl font-light text-tertiary">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-12 max-w-4xl text-center text-lg md:text-xl text-tertiary">
            <strong className="text-white">Please note:</strong> {draw ? `The ${money(draw.totalPool).replace(/ worth of .*/, "")}` : "The reward"} figure is the advertised US-dollar value of the BTCY Token rewards. It is not a promise of cash, USDT, a guaranteed resale price or guaranteed withdrawal proceeds. P2P sales depend on buyer availability, market conditions and platform rules.
          </p>
        </section>
      ) : null}

      {/* Key dates */}
      <section className="mt-80">
        <Image src={CalendarArt} alt="Calendar Art" className="mx-auto w-30" />
        <h2 className="mt-10 text-[40px] md:text-7xl xl:text-[100px] text-center font-bold">Key Dates</h2>
        <div className="flex flex-wrap w-full justify-center items-start gap-20 mt-10 md:mt-30 px-4 md:px-10 xl:px-20">
          {[
            [formatDate(campaign.startsAt, campaign), "Campaign start"],
            [formatDate(campaign.endsAt, campaign), "End of campaign period"],
            [announcement ? formatDate(announcement, campaign) : "To be announced", "Winners announced"],
          ].map(([date, label]) => (
            <div key={label} className="w-90 flex flex-col">
              <h3 className="text-[40px] md:text-4xl font-bold text-center md:text-left">{date}</h3>
              <p className="mt-2 md:mt-10 text-xl md:text-3xl text-center md:text-left">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Winners */}
      <section className="mt-80 px-4 md:px-20 xl:px-40">
        <h2 className="text-5xl lg:text-7xl font-bold text-center">Winners</h2>
        <div className="mx-auto mt-16 max-w-5xl">
          {winners?.published && winners.winners.length ? (
            <div className="divide-y divide-primary/20">
              {winners.winners.map(row => (
                <div className="flex items-center gap-4 py-4 text-xl" key={row.rank}>
                  <span className="w-14 font-bold text-primary">#{row.rank}</span>
                  <span className="flex-1">{row.participant}</span>
                  <span className="font-semibold text-primary">{formatMoney(row.prizeAmount, row.currency, row.valueCurrency)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-tertiary">{announcement ? `Winners will be announced on ${formatDate(announcement, campaign)}, after referral and eligibility checks.` : "Winners will be announced after referral and eligibility checks."}</p>
          )}
        </div>
      </section>

      {/* Leaderboard */}
      {leaderboard.length ? (
        <section className="mt-60 px-4 md:px-20 xl:px-40">
          <h2 className="text-5xl lg:text-7xl font-bold text-center">Referral Leaderboard</h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-tertiary">Ranked by verified referrals. This shows progress only: winners are drawn at random from everyone who qualifies.</p>
          <div className="mx-auto mt-12 max-w-5xl divide-y divide-primary/20">
            {leaderboard.slice(0, 20).map(row => (
              <div className="flex items-center gap-4 py-4 text-xl" key={`${row.rank}-${row.participant}`}>
                <span className="w-14 font-bold text-primary">#{row.rank}</span>
                <span className="flex-1">{row.participant}{row.milestoneTitle ? <span className="block text-base text-primary">{row.milestoneTitle}</span> : null}</span>
                <span className="text-right"><span className="block font-semibold text-primary">{row.verifiedReferrals} verified</span><span className="text-base text-tertiary">{row.totalReferrals} total</span></span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Eligibility */}
      <section className="flex items-center justify-center gap-10 mt-60 px-4 md:px-10 xl:px-20">
        <div className="max-w-4xl flex flex-col items-start justify-center gap-4 mt-10 flex-1 px-4 md:px-20 xl:px-6">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold">Eligibility & Rules</h2>
          <ul className="mt-10 list-disc pl-6 text-xl md:text-3xl flex flex-col gap-6 md:gap-10">
            <li>Use a valid Bitcoin Yay account and your own unique referral link</li>
            <li>Only genuine referrals who complete {dayRule} count toward your {entryTarget || ""} verified referrals</li>
            <li>Self-referrals, duplicate or fake accounts, bots and manipulated activity are ineligible</li>
            <li>Bitcoin Yay may review activity and disqualify invalid referrals before confirming winners</li>
            <li>All rewards are subject to verification and the <Link className="underline" href="/black-friday/terms">final campaign terms</Link></li>
          </ul>
          <div className="mx-auto md:mx-0 mt-10 flex justify-center md:justify-start items-center md:items-start gap-10 md:gap-20">
            <CustomButton2 image={DownloadLogo} text="Download on App Store" link="/#apple-store-download" imageStyling="w-40" />
            <CustomButton2 image={DownloadLogo} text="Get it on Google Play" link="/#google-play-download" imageStyling="w-40" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      {faq.length ? (
        <section className="mt-80 mb-60 px-4 md:px-20 xl:px-40">
          <Image src={FaqArt} alt="" className="w-80" />
          <h2 className="mt-10 text-[40px] md:text-[100px] font-semibold">FAQs</h2>
          <div className="text-tertiary mt-20 max-w-5xl">
            {faq.map((item, index) => (
              <div key={`${index}-${item.question}`}>
                <h3 className="mt-10 text-2xl md:text-3xl font-bold text-white">Q: {item.question}</h3>
                <p className="mt-4 text-xl">A: {item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mb-40 flex flex-wrap items-start justify-center gap-16 px-4">
        <CustomButton2 image={ThumbsUpImage} text="Referral Program" link="/referral" imageStyling="w-24" />
        {campaign.supportUrl ? <CustomButton2 image={NoteButtonImage} text="Get Support" link={campaign.supportUrl} imageStyling="w-24" /> : null}
      </div>
      <p className="mb-20 text-center text-sm text-tertiary">Terms version: {campaign.termsVersion || "draft"}</p>

      <LoginPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={() => setLoginOpen(false)} onRegisterClick={() => setLoginOpen(false)} />
    </main>
  );
}
