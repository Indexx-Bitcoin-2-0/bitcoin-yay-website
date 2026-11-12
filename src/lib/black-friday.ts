// BTCY Airdrop (Black Friday, Christmas Eve, New Year, …): shared types, API calls and formatting for
// the campaign page (/airdrop) and the rules page (/black-friday/terms).
// All rules and numbers come from the campaign API so the pages never promise
// something the backend doesn't apply.
import { API_BASE_URL } from "@/lib/api-config";

// "current" = the airdrop the admin made current, so the next airdrop needs no website change.
export const CAMPAIGN_BASE = `${API_BASE_URL}/api/v1/btcy/campaigns/current`;

export type Milestone = { key: string; referrals: number; title: string; description?: string; turboDays?: number; luckyDrawEntry?: boolean };
// valueCurrency "USD": prizeAmount is a dollar value paid in `currency` tokens ("$10 worth of BTCY").
export type LuckyDraw = { winnerCount: number; prizeAmount: number; currency: string; valueCurrency?: string; entryMilestone: string; entryReferrals: number; totalPool: number };

export type Campaign = {
  title: string;
  status: "scheduled" | "live" | "ended";
  startsAt?: string;
  endsAt?: string;
  body?: string;
  termsUrl?: string;
  supportUrl?: string;
  termsVersion?: string;
  eligibleCountries?: string[];
  referralMiningDayTarget: number;
  referralMiningConsecutive?: boolean;
  rewardSummary?: string;
  milestones?: Milestone[];
  luckyDraw?: LuckyDraw;
  winnerAnnouncementAt?: string | null;
  winnersPublished?: boolean;
  displayTimeZone?: string;
  allowRegistration?: boolean;
  faq?: Array<{ question: string; answer: string }>;
};

export type LeaderboardRow = { rank: number; participant: string; verifiedReferrals: number; totalReferrals: number; milestone: string | null; milestoneTitle: string | null; luckyDrawEligible: boolean };

export type Winners = { published: boolean; announcementAt: string | null; winners: Array<{ rank: number; participant: string; prizeAmount: number; currency: string; valueCurrency?: string }> };

export type Progress = {
  joined: boolean;
  totalReferrals?: number;
  verifiedReferrals?: number;
  qualifiedReferrals?: number;
  pendingReferrals?: number;
  milestonesReached?: string[];
  nextMilestone?: { key: string; title: string; referrals: number; remaining: number } | null;
  luckyDrawEligible?: boolean;
  isWinner?: boolean;
  referralUrl?: string;
  statusMessage?: string;
};

const DEFAULT_TIME_ZONE = "America/Los_Angeles";
const ZONE_LABELS: Record<string, string> = { "America/Los_Angeles": "PST", UTC: "UTC" };

export const zoneLabel = (campaign?: Campaign | null) => {
  const zone = campaign?.displayTimeZone || DEFAULT_TIME_ZONE;
  return ZONE_LABELS[zone] || zone;
};

/** A campaign date in the campaign's own timezone, so everyone sees the same day. */
export const formatDate = (value?: string | null, campaign?: Campaign | null, withTime = false) => {
  if (!value) return "To be announced";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "To be announced";
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric", timeZone: campaign?.displayTimeZone || DEFAULT_TIME_ZONE };
  if (withTime) Object.assign(options, { hour: "numeric", minute: "2-digit" });
  return date.toLocaleString("en-US", options);
};

export const formatMoney = (amount: number, currency: string, valueCurrency?: string) => {
  if (valueCurrency === "USD") return `$${amount} worth of ${currency}`;
  return currency === "USDT" ? `$${amount} USDT` : `${amount} ${currency}`;
};

/** "7 consecutive mining days", "1 mining day", ... */
export const referralDayRule = (campaign?: Campaign | null) => {
  const days = Math.max(1, Number(campaign?.referralMiningDayTarget || 1));
  return `${days}${campaign?.referralMiningConsecutive && days > 1 ? " consecutive" : ""} mining day${days === 1 ? "" : "s"}`;
};

const readJson = async <T>(response: Response): Promise<T> => {
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  const payload = await response.json();
  return (payload?.data ?? payload) as T;
};

export const getCampaign = () => fetch(CAMPAIGN_BASE).then(response => readJson<Campaign>(response));
export const getLeaderboard = () => fetch(`${CAMPAIGN_BASE}/leaderboard`).then(response => readJson<LeaderboardRow[]>(response));
export const getWinners = () => fetch(`${CAMPAIGN_BASE}/winners`).then(response => readJson<Winners>(response));

export const getProgress = (token: string) =>
  fetch(`${CAMPAIGN_BASE}/progress`, { headers: { Authorization: `Bearer ${token}` } }).then(response => readJson<Progress>(response));

export const joinCampaign = (token: string) =>
  fetch(`${CAMPAIGN_BASE}/join`, {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ termsAccepted: true, channel: "website" }),
  }).then(async response => {
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload?.message || payload?.data?.message || "Unable to join right now.");
    }
    return response.json();
  });

export const trackEvent = (eventType: "page_view" | "link_click", data: Record<string, unknown> = {}) =>
  fetch(`${CAMPAIGN_BASE}/track`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ eventType, channel: "website", ...data }) }).catch(() => undefined);
