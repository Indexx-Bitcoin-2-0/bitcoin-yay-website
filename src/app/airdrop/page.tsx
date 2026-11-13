import BlackFridayAirdrop from "@/components/BlackFridayAirdrop";

// The current BTCY Airdrop (whichever the admin made current: Black Friday, New Year, …).
// /black-friday redirects here so older links keep working.
export const metadata = {
  title: "BTCY Airdrop",
  description:
    "Invite friends with your Bitcoin Yay referral link, reach the milestones and enter the airdrop lucky draw.",
  openGraph: {
    title: "BTCY Airdrop",
    description:
      "Invite friends with your referral link and win a share of the prize pool.",
  },
};

export default function AirdropPage() {
  return <BlackFridayAirdrop />;
}
