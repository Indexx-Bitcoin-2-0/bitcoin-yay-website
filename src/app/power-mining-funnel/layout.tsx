import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Power Mining Funnel - Nuclear Mining Subscription",
  description:
    "Upgrade to Nuclear Mining and earn 9x faster with maximum power. Get 13.5 BTCY/hour with 24/7 auto mining.",
  openGraph: {
    title: "Power Mining Funnel - Nuclear Mining Subscription",
    description:
      "Upgrade to Nuclear Mining and earn 9x faster with maximum power. Get 13.5 BTCY/hour with 24/7 auto mining.",
  },
};

export default function PowerMiningFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
