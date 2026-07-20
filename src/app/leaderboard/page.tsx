import React from "react";
import Image from "next/image";
import MiningStationLogo from "@/assets/images/mining-station/mining-station-logo.png";

// Mining Station Leaderboard — top station owners ranked by active referrals.
// TODO(backend): replace this mock list with the live leaderboard endpoint.

type StationStatus = "Active" | "Inactive";

interface LeaderboardEntry {
  rank: number;
  name: string;
  referrals: number;
  status: StationStatus;
}

const ENTRIES: LeaderboardEntry[] = [
  { rank: 1, name: "John S.", referrals: 210, status: "Active" },
  { rank: 2, name: "Sarah J.", referrals: 187, status: "Active" },
  { rank: 3, name: "David M.", referrals: 165, status: "Active" },
  { rank: 4, name: "Emma K.", referrals: 143, status: "Active" },
  { rank: 5, name: "Michael T.", referrals: 129, status: "Active" },
  { rank: 6, name: "Olivia R.", referrals: 118, status: "Active" },
  { rank: 7, name: "James P.", referrals: 104, status: "Inactive" },
  { rank: 8, name: "Sophia L.", referrals: 96, status: "Active" },
  { rank: 9, name: "William H.", referrals: 88, status: "Active" },
  { rank: 10, name: "Ava C.", referrals: 75, status: "Inactive" },
];

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

const Avatar = ({ name, top }: { name: string; top: boolean }) => (
  <div
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
      top ? "bg-primary/25 text-primary" : "bg-white/10 text-tertiary"
    }`}
  >
    {name.charAt(0).toUpperCase()}
  </div>
);

const StatusBadge = ({ status }: { status: StationStatus }) => {
  const active = status === "Active";
  const color = active ? "#4CAF50" : "#86868b";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold"
      style={{ color, backgroundColor: `${color}1f` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {status}
    </span>
  );
};

export default function LeaderboardPage() {
  return (
    <div className="mt-40 min-h-screen bg-[#202020] px-4 pb-24">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <Image
            src={MiningStationLogo}
            alt="Mining Station"
            className="mx-auto mb-6 h-20 w-auto object-contain md:h-24"
          />
          <span className="mb-3 inline-block rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold text-primary">
            Updated Weekly
          </span>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Mining Station Leaderboard
          </h1>
          <p className="mt-3 text-tertiary">
            Top Mining Station owners ranked by their active referrals.
          </p>
        </div>

        {/* Leaderboard */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#2a2a2a]">
          {/* Column headers */}
          <div className="grid grid-cols-[44px_1fr_auto_auto] items-center gap-3 border-b border-white/10 px-4 py-4 text-[11px] font-semibold uppercase tracking-wide text-tertiary md:grid-cols-[64px_1fr_140px_120px] md:px-6">
            <span>Rank</span>
            <span>User</span>
            <span className="text-right">Referrals</span>
            <span className="hidden text-right sm:block">Status</span>
          </div>

          {/* Rows */}
          {ENTRIES.map((entry) => {
            const top = entry.rank <= 3;
            return (
              <div
                key={entry.rank}
                className={`grid grid-cols-[44px_1fr_auto_auto] items-center gap-3 border-b border-white/5 px-4 py-4 transition-colors last:border-b-0 hover:bg-white/5 md:grid-cols-[64px_1fr_140px_120px] md:px-6 ${
                  top ? "bg-primary/[0.06]" : ""
                }`}
              >
                {/* Rank */}
                <span className="text-lg font-bold text-white">
                  {MEDALS[entry.rank] ?? (
                    <span className="text-tertiary">{entry.rank}</span>
                  )}
                </span>

                {/* User */}
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={entry.name} top={top} />
                  <span className="truncate font-semibold text-white">
                    {entry.name}
                  </span>
                </div>

                {/* Referrals */}
                <span className="text-right text-base font-bold text-primary md:text-lg">
                  {entry.referrals.toLocaleString()}
                </span>

                {/* Status */}
                <span className="hidden text-right sm:block">
                  <StatusBadge status={entry.status} />
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-tertiary">
          Rankings refresh weekly. Grow your Mining Station referrals to climb the
          board.
        </p>
      </div>
    </div>
  );
}
