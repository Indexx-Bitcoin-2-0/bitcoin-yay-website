import BlackFridayAirdrop from "@/components/BlackFridayAirdrop";

// The current airdrop: the Black Friday Airdrop (prize paid in USDXX).
// /black-friday redirects here so older links keep working.
export const metadata = {
  title: "Black Friday Airdrop",
  description:
    "Invite friends with your referral link: 25 verified referrals unlock the Mining Station and 7 days of Turbo Mining, 100 enter you in the 200 USDXX lucky draw.",
  openGraph: {
    title: "Black Friday Airdrop",
    description:
      "Invite friends with your referral link and win a share of the 200 USDXX prize pool.",
  },
};

export default function AirdropPage() {
  return <BlackFridayAirdrop />;
}
