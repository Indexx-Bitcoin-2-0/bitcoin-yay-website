import { Suspense } from "react";
import ReferralPage from "./ReferralPage";

export const metadata = {
  title: "bitcoin-yay Referral Program - Earn BTCY by Sharing",
  description:
    "Join the bitcoin-yay referral program and earn rewards by inviting friends to mine BTCY. Share your referral link and boost your mining earnings through our community program.",
  openGraph: {
    title: "bitcoin-yay Referral Program - Earn BTCY by Sharing",
    description:
      "Join the bitcoin-yay referral program and earn rewards by inviting friends to mine BTCY. Share your referral link and boost your mining earnings through our community program.",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReferralPage />
    </Suspense>
  );
}
