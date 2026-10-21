import { Metadata } from "next";
import PowerMiningProposal from "./PowerMiningProposal";

export const metadata: Metadata = {
  title: "Power Mining 2.0 Concept Review",
  description:
    "A concept review for a transparent, utility-led BTCY Power Mining experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PowerMiningProposalPage() {
  return <PowerMiningProposal />;
}
