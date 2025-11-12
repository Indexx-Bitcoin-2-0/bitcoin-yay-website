import CustomStyledConatiner from "@/components/CustomStyledContainer";
import {
  InfoSection,
  CustomListItem,
  CustomP,
} from "@/components/CustomTypography";
import Image from "next/image";

import Whitepaper01 from "@/assets/images/whitepaper/whitepaper-01.svg";
import Whitepaper02 from "@/assets/images/whitepaper/whitepaper-02.svg";
import Whitepaper03 from "@/assets/images/whitepaper/whitepaper-03.svg";
import Whitepaper04 from "@/assets/images/whitepaper/whitepaper-04.svg";
import Whitepaper05 from "@/assets/images/whitepaper/whitepaper-05.svg";
import Whitepaper06 from "@/assets/images/whitepaper/whitepaper-06.svg";
import Whitepaper07 from "@/assets/images/whitepaper/whitepaper-066.svg";
import Whitepaper08 from "@/assets/images/whitepaper/whitepaper-07.svg";
import Whitepaper09 from "@/assets/images/whitepaper/whitepaper-08.svg";

export const metadata = {
  title: "Bitcoin Yay Whitepaper - A Decentralized Micro-Value Ecosystem",
  description:
    "Read the official Bitcoin Yay whitepaper covering technical architecture, tokenomics, AI-powered mobile mining, and blockchain ecosystem. Learn about BTCY's 21 trillion token supply and Proof-of-Participation mechanism.",
  openGraph: {
    title: "Bitcoin Yay Whitepaper - A Decentralized Micro-Value Ecosystem",
    description:
      "Read the official Bitcoin Yay whitepaper covering technical architecture, tokenomics, AI-powered mobile mining, and blockchain ecosystem. Learn about BTCY's 21 trillion token supply and Proof-of-Participation mechanism.",
  },
};

export default function Whitepaper() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Whitepaper Chapter
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>
      <div className="md:p-10 lg:p-18">
        <InfoSection
          title="Bitcoin-Yay (BTCY): A Decentralized Micro-Value Ecosystem"


        />
        <InfoSection
          desc="Whitepaper"
          endingLine="Status: Off-chain Beta today. Testnet and mainnet (Stellar-fork + Soroban) are in development. Features/timelines may evolve."
        />
        <InfoSection
          desc="Abstract"
          endingLine="Bitcoin-Yay (BTCY) is a micro-value currency designed to move small amounts fast and cheaply, then settle to an on-chain ledger. BTCY will launch on a Stellar-based chain (planned fork) to leverage low fees, fast finality, and Soroban smart contracts. The ecosystem pairs AI-assisted Proof-of-Participation (PoP) mining, on-chain governance, and a dual-balance model (off-chain &quot;BTCY Nugget&quot; → on-chain &quot;BTCY Token&quot;). This preview outlines the design, tokenomics, security posture, and a phased roadmap from today's off-chain beta to mainnet."
        />


        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper01} alt="Whitepaper-01" />
        </div>

        <InfoSection
          title="1. Introduction"
          desc="Many users are priced out of everyday crypto due to fees, latency, and UX hurdles. BTCY targets that gap with:"
          content={
            <>
              <CustomListItem content="PoP mining (mobile both iOS and Android) instead of energy-heavy PoW." />
              <CustomListItem content="Planned Stellar-fork for speed/finality; Soroban for programmability." />
              <CustomListItem content="A dual-balance migration: off-chain accruals today; on-chain ownership after compliance and mainnet." />
            </>
          }
        />

        <CustomP start="Important: BTCY's market behavior tracks Bitcoin thematically (1 BTC = 1,000,000 BTCY as a micro-unit framing), not a legal peg or guarantee. Market-making and liquidity tools (e.g., Indexx bots) may support liquidity, not price promises." />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper02} alt="Whitepaper-02" />
        </div>

        <InfoSection
          title="2. Core Features"
          desc="2.1 Fast & Low-Cost Settlement (Coming Soon: mainnet)"
          content={
            <>
              <CustomListItem content="Stellar-family consensus with sub-second confirmation targets and low fees." />
              <CustomListItem content="Cross-border friendly; built for micro-payments and in-app actions." />
            </>
          }
        />

        <InfoSection
          desc="2.2 AI-Assisted Proof-of-Participation (PoP)"
          content={
            <>
              <CustomListItem content="Users earn Nugget (off-chain balance) via presence, quests, referrals, and anti-bot-checked sessions." />
              <CustomListItem content="No energy-intensive mining; runs on iOS/Android." />
            </>
          }
        />

        <InfoSection
          desc="2.3 Smart Contracts with Soroban (Coming Soon)"
          content={
            <>
              <CustomListItem content="Programmable assets: staking, rewards, on-chain governance." />
              <CustomListItem content="Low execution cost vs. legacy L1s." />
              <CustomListItem content="(Removed misleading claim) No native ZKPs in v1; privacy features may arrive later through audited contracts or external proofs." />
            </>
          }
        />

        <InfoSection
          desc="2.4 Governance (DAO)"
          content={
            <>
              <CustomListItem content="Off-chain voting today for proposals and roadmapping." />
              <CustomListItem content="On-chain voting & treasury after mainnet with transparent metrics (coming soon)." />
            </>
          }
        />

        <InfoSection
          desc="2.5 Interoperability (Roadmap)"
          content={
            <>
              <CustomListItem content="Bridges to BTCY other chains (Ethereum/BSC/Solana) are planned after mainnet stability and audits." />
              <CustomListItem content="Separate brand assets (e.g., WiBS meme coin) may interoperate through governed bridges." />
            </>
          }
        />

        <InfoSection
          desc="2.6 Security & Sustainability"
          content={
            <>
              <CustomListItem content="Federated Byzantine Agreement (FBA)—quorum slices, fast finality." />
              <CustomListItem content="Validator onboarding with KYC/attestation in early phases → progressive decentralization." />
              <CustomListItem content="Continuous monitoring for Sybil/bot activity and fraud." />
            </>
          }
        />
        <InfoSection
          desc="2.7 Product Ecosystem (What's Live vs Coming)"

          content={
            <>
              <CustomP start="Live (Off-chain Beta):" />
              <CustomListItem content="BTCY Mining App (PoP sessions, fraud checks, subscription boosts)." />
              <CustomListItem content="Nugget Ledger (off-chain accruals)." />
              <CustomListItem content="Linked Accounts Hub (up to 5 linked accounts; shared checks)." />
            </>
          }
        />
        <InfoSection
          desc="2.8 Coming Soon"
          content={
            <>
              <CustomListItem content="Indexx Exchange integrations for BTCY pairs." />
              <CustomListItem content="Block Explorer (chain metrics, tx history)." />
              <CustomListItem content="Developer Hub (docs, SDKs, grants)." />
              <CustomListItem content="Shop / Pay / Browser / Social (ship in waves after core is stable)." />
              <CustomListItem content="Indexx Brainstorm / DAO Hive (on-chain governance + funding)." />
            </>
          }
          endingLine="We’re deliberately staging launches. Utility beats breadth."
        />







        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper04} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="3. Technical Architecture"
          desc="Consensus"
          content={
            <>
              <CustomListItem content="Planned Stellar-fork with FBA." />
              <CustomListItem content="Early validator set curated for reliability → expand to community as observability and economic security grow." />
            </>
          }
        />

        <InfoSection
          desc="Asset Model & Supply"
          content={
            <>
              <CustomListItem content="Multi-chain support for BTCY, BTC, ETH, INEX, and more." />
              <CustomListItem content="AI-powered risk analysis and auto-staking features." />
              <CustomListItem content="Smart spending assistant for optimal buy/sell timing." />
            </>
          }
        />
        <InfoSection
          desc="Indexx CEX & DEX"
          content={
            <>
              <CustomListItem content="Total Supply (fixed): 21,000,000,000,000 BTCY (21 trillion)" />
              <CustomListItem content="Rationale: 1 BTC = 1,000,000 BTCY (micro-unit framing) × 21,000,000 BTC maximum → 21T BTCY." />
            </>
          }
        />


        <InfoSection
          desc="Genesis Allocation (illustrative, final TGE to publish pre-mainnet):"
          content={
            <>
              <CustomListItem content="50% Mining/Participation rewards (multi-year)" />
              <CustomListItem content="20% Ecosystem/Grants/Community" />
              <CustomListItem content="15% Liquidity/Market-making/Treasury" />
              <CustomListItem content="10% Core Contributors (vesting)" />
              <CustomListItem content="5% Reserves (security, emergencies)" />
              <CustomListItem content="(Adjustable before TGE; will be finalized with audit.)" />
            </>
          }
        />

        <InfoSection
          desc="Dual-Balance Flow (Live → Mainnet)"
          content={
            <>
              <CustomListItem content="BTCY Nugget: off-chain, non-transferable accrual; records contribution history." />
              <CustomListItem content="BTCY Token: on-chain asset minted/credited after compliance + conversion events (e.g., Alchemy upgrades, Quantum Mining purchases) post-mainnet." />
            </>
          }
        />

        <InfoSection
          desc="Smart Contracts (Soroban)"
          content={
            <>
              <CustomListItem content="Staking/rewards, vesting/conversions, DAO voting." />
              <CustomListItem content="Security first: audits, guarded launches, circuit-breakers." />
              <CustomListItem content="(Removed) &quot;ZKP by default.&quot; If/when privacy is added, it will be explicitly specified and audited." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper05} alt="Whitepaper-05" />
        </div>

        <InfoSection
          title="4. Economic Model & Tokenomics"
          desc="Price & Market Language"
          content={
            <>
              <CustomListItem content="Remove hard &quot;Start Price $0.21.&quot;" />
              <CustomListItem content="Use: &quot;Initial reference price and liquidity bands will be disclosed prior to listings.&quot;" />
              <CustomListItem content="You can maintain a soft floor narrative in docs, but avoid guarantees." />
            </>
          }
        />

        <InfoSection
          desc="Emissions & Deflation"
          content={
            <>
              <CustomListItem content="Controlled emissions via PoP schedules; anti-sybil controls to preserve scarcity." />
              <CustomListItem content="Programmed reductions (e.g., annual halving or epoch-based step-downs)." />
              <CustomListItem content="Optional burns sourced from app fees or treasury governance (subject to DAO approval)." />
            </>
          }
        />

        <InfoSection desc="Subscriptions" />

        <div className="overflow-x-auto my-10">
          <table className="min-w-full bg-transparent border-2 border-bg2 border-collapse text-sm lg:text-xl lg:table-fixed">
            <thead>
              <tr className="border-b-2 border-bg2">
                <th className="py-2 px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal border-r border-bg2 ">
                  Plan
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal border-r border-bg2 ">
                  Monthly Fee
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal border-r border-bg2 ">
                  Speed / Output
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal ">
                  Key Benefits
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-bg2">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  Snatch (Free)
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  $0
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  1x baseline
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top">
                  Standard mobile mining, ads, referral boosts
                </td>
              </tr>
              <tr className="border-b border-bg2">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  Electric Power
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  $100/mo
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  ≈ 9 BTCY/hour (≈ $0.90*)
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top">
                  Always-on Electric tier, referral bonuses, priority support
                </td>
              </tr>
              <tr className="border-b border-bg2">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  Turbo Power
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  $300/mo
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  ≈ 18 BTCY/hour (≈ $1.80*)
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top">
                  Double Electric throughput, automated boosts, priority payouts
                </td>
              </tr>
              <tr className="border-b border-bg2">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  Nuclear Power
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  $600/mo
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top border-r border-bg2">
                  ≈ 27 BTCY/hour (≈ $2.70*)
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/4 lg:whitespace-normal align-top">
                  Maximum AI-driven yield, VIP support, exclusive bonus drops
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper03} alt="Whitepaper-03" />
        </div>


        <InfoSection
          desc="Incentives"
          content={
            <>
              <CustomListItem content="Airdrops, referrals, staking boosts, and DAO perks—ratified by governance." />
            </>
          }
        />

        <InfoSection
          desc="Dual-Balance Conversion"
          content={
            <>
              <CustomListItem content="Earn Nugget → Mine + linked-account checks → convert to BTCY Token through approved flows (Alchemy/Quantum/mining milestones)." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper06} alt="Whitepaper-06" />
        </div>

        <InfoSection
          title="5. Withdrawals"
          endingLine="Minimum to unlock withdrawals/spend: 10,000 BTCY for Lotto and 100,000 BTCY for Alchemy"
        />

        <InfoSection
          desc="Rails & Fees (clarified units):"
          content={
            <>
              <CustomListItem content="To Indexx Wallet/Exchange: Zero fee" />
              <CustomListItem content="To external chain address: network fee + service fee up to 3% (covers compliance + routing)." />
            </>
          }
        />

        <CustomP start="(Exact fees published per route at withdrawal time. Coming soon once we have live chain)" />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper07} alt="Whitepaper-07" />
        </div>

        <InfoSection
          title="6. Roadmap (Milestone-based, not year-promise)"
          desc="Phase A — Off-chain Beta (Live)"
          content={
            <>
              <CustomListItem content="Mining app (PoP), Nugget ledger, subscription boosts, anti-bot." />
              <CustomListItem content="Off-chain DAO voting, proposal hub." />
            </>
          }
        />

        <InfoSection
          desc="Phase B — Devnet/Testnet (Coming Soon)"
          content={
            <>
              <CustomListItem content="Stellar-fork nodes, Soroban contracts (staking, conversion, governance)." />
              <CustomListItem content="Faucet, explorer (read-only), SDKs, validator early access." />
            </>
          }
        />

        <InfoSection
          desc="Phase C — Mainnet (Coming Soon)"
          content={
            <>
              <CustomListItem content="BTCY Token live, wallet releases, on-chain conversions, initial listings." />
              <CustomListItem content="DAO on-chain: proposals, quorum, treasury transparency." />
            </>
          }
        />

        <InfoSection
          desc="Phase D — Ecosystem & Bridges (Post-Mainnet)"
          content={
            <>
              <CustomListItem content="CEX/DEX pairs, grants, builders program." />
              <CustomListItem content="Optional bridges and additional assets (e.g., WiBS) after audits." />
            </>
          }
        />

        <CustomP start="Each phase ships only after audits, SLOs, and risk thresholds are met." />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper08} alt="Whitepaper-08" />
        </div>

        <InfoSection
          title="7. Community & Compliance"
          content={
            <>
              <CustomListItem content="Ongoing security reviews, public dashboards, and incident disclosures." />
              <CustomListItem content="Regional compliance for KYC/AML, sanctions, and consumer disclosures." />
              <CustomListItem content="Ambassador & builder programs with transparent criteria." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper09} alt="Whitepaper-09" />
        </div>

        <InfoSection
          title="8. Conclusion"
          endingLine="BTCY focuses on everyday, micro-value activity with a practical path from off-chain beta to a performant, audited mainnet. The dual-balance model, PoP mining, and Soroban programmability aim to make crypto usable first—and decentralized over time with transparent governance."
        />

        <InfoSection
          title="Join the Bitcoin-Yay Ecosystem"
          content={
            <>
              <CustomListItem content="Website: bitcoinyay.com" />
              <CustomListItem content="Telegram: t.me/+pC3IVlPlwSEyODAx" />
              <CustomListItem content="X (Twitter): x.com/bitcoin_YAY" />
            </>
          }
        />
      </div>
    </div>
  );
}