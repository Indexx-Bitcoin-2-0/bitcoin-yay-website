import React from "react";

export const metadata = {
  title: "FAQs - Bitcoin Yay (BTCY) Help & Answers",
  description:
    "Frequently asked questions about Bitcoin Yay (BTCY): mining, mining plans, airdrops, referrals, the Mining Station, buying & selling, wallet, nodes, withdrawals, security, and more. Search answers across every topic.",
  openGraph: {
    title: "FAQs - Bitcoin Yay (BTCY) Help & Answers",
    description:
      "Search frequently asked questions about Bitcoin Yay (BTCY) across mining, airdrops, referrals, the Mining Station, payments, security and more.",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
