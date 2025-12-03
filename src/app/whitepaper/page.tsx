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
// import Whitepaper10 from "@/assets/images/whitepaper/whitepaper-09.svg";
// import Whitepaper11 from "@/assets/images/whitepaper/whitepaper-10.svg";

export const metadata = {
  title: "bitcoin-yay Whitepaper - Technical Documentation & Tokenomics",
  description:
    "Read the official bitcoin-yay whitepaper covering technical architecture, tokenomics, AI-powered mobile mining, and blockchain ecosystem. Learn about BTCY's 21 trillion token supply and Proof-of-Participation mechanism.",
  openGraph: {
    title: "bitcoin-yay Whitepaper - Technical Documentation & Tokenomics",
    description:
      "Read the official bitcoin-yay whitepaper covering technical architecture, tokenomics, AI-powered mobile mining, and blockchain ecosystem. Learn about BTCY's 21 trillion token supply and Proof-of-Participation mechanism.",
  },
};

export default function whitepaper() {
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
          title="Bitcoin-Yay: A Decentralized Ecosystem Coin"
          desc="Abstract"
          endingLine="Bitcoin-Yay (BTCY) is a decentralized cryptocurrency designed as the foundation of a next-generation blockchain ecosystem. Built on the Stellar blockchain, Bitcoin-Yay enables fast, low-cost transactions while incorporating features like AI-driven mining, smart contracts, and decentralized governance. This white paper details the design, implementation, tokenomics, security, and governance of Bitcoin-Yay, aiming to create a sustainable, community-driven financial network."
        />
        <InfoSection
          desc=" Relationship with Bitcoin:"
          endingLine="Bitcoin-Yay follows Bitcoin’s market performance while being backed by the Indexx Trading Bot to maintain value stability and market efficiency."
        />
        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper01} alt="Whitepaper-01" />
        </div>
        <InfoSection
          title="1. Introduction"
          endingLine="The cryptocurrency industry has evolved significantly, but challenges such as scalability, transaction fees, and sustainability persist. Bitcoin-Yay seeks to address these by leveraging Stellar’s high-performance blockchain and incorporating AI-based mechanisms for mining, governance, and transactions.Bitcoin-Yay serves as the core currency within the ecosystem, powering transactions, governance, rewards, and decentralized finance (DeFi) applications. Unlike traditional proof-of-work (PoW) blockchains, Bitcoin-Yay adopts a Proof-of-Participation (PoP) model, making it more energy-efficient and inclusive. Bitcoin-Yay follows Bitcoin’s performance while being backed by the Indexx Trading Bot to maintain value stability and market efficiency."
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper02} alt="Whitepaper-02" />
        </div>

        <InfoSection
          title="2. Core Features of Bitcoin-Yay"
          desc="2.1 Fast and Scalable Transactions"
          content={
            <>
              <CustomListItem content="Built on the Stellar blockchain, enabling 1,000+ transactions per second (TPS)." />
              <CustomListItem content="Low-cost transactions due to Stellar's efficient consensus model." />
              <CustomListItem content="Supports cross-border payments and remittances." />
            </>
          }
        />
        <InfoSection
          desc="2.2 AI-Powered Proof-of-Participation (PoP) Mining"
          content={
            <>
              <CustomListItem content="6-Hour Mining Sessions: Users participate in mining sessions lasting 6 hours each (replacing any previous 24-hour session concept)." />
              <CustomListItem content="AI-based mining replaces traditional mining mechanisms." />
              <CustomListItem content="Users earn BTCY through engagement, transactions, and holding tokens." />
              <CustomListItem content="Mobile/web mining similar to Pi Network—lightweight and energy efficient." />
            </>
          }
        />
        <InfoSection
          desc="2.3 Earn BTCY Power by Watching Ads"
          content={
            <>
              <CustomListItem content="Users can earn BTCY mining power by watching daily ads in the Indexx ecosystem." />
              <CustomListItem content="Watching up to 25 ads per day grants bonus mining time or boosted power." />
              <CustomListItem content="Rewards scale with streaks (e.g., 6 hours on Day 1 and increasing bonuses) as defined in the Daily Ads logic." />
            </>
          }
        />
        <InfoSection
          desc="2.4 Smart Contracts via Soroban"
          content={
            <>
              <CustomListItem content="Enables programmable transactions and decentralized applications (dApps)." />
              <CustomListItem content="Supports automated staking, lending, and DeFi protocols." />
              <CustomListItem content="Low execution costs compared to Ethereum's gas fees." />
            </>
          }
        />
        <InfoSection
          desc="2.5 Decentralized Governance (DAO)"
          content={
            <>
              <CustomListItem content="Token-based voting allows community participation in decision-making." />
              <CustomListItem content="Holders of BTCY can propose and vote on ecosystem upgrades." />
              <CustomListItem content="No centralized authority—fully decentralized decision-making." />
            </>
          }
        />
        <InfoSection
          desc="2.6 Interoperability & Cross-Chain Compatibility"
          content={
            <>
              <CustomListItem content="Seamless asset bridging between Bitcoin-Yay, Bitcoin-YeeHaw (stablecoin), WiBS (meme coin), and Bitcoin-Yay NFT." />
              <CustomListItem content="Integrates with major Ethereum, Binance Smart Chain, and Solana networks." />
            </>
          }
        />
        <InfoSection
          desc="2.7 Security & Sustainability"
          content={
            <>
              <CustomListItem content="Stellar's Federated Byzantine Agreement (FBA) ensures high security." />
              <CustomListItem content="Transactions validated by trusted nodes prevent attacks." />
              <CustomListItem content="Self-sustaining economic model with long-term sustainability." />
            </>
          }
        />
        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper03} alt="Whitepaper-03" />
        </div>
        <InfoSection
          title="3. Product Ecosystem"
          desc="Indexx Mining App / Bitcoin-Yay Mining App"
          content={
            <>
              <CustomListItem content="AI-powered mining algorithm with 6-hour mining sessions." />
              <CustomListItem content="Fraud detection to prevent bot-based mining abuse." />
              <CustomListItem content="Smart mining subscriptions for premium mining speeds." />
              <CustomListItem content="Daily Ads Integration for earning BTCY Power." />
            </>
          }
        />
        <InfoSection
          desc="Indexx Wallet / bitcoin-yay Wallet"
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
              <CustomListItem content="Centralized and decentralized exchanges with AI-powered yield optimization, arbitrage trading, and real-time risk management." />
            </>
          }
        />

        <CustomP start="(Other ecosystem components such as Indexx Block Explorer AI, Indexx AI Browser, Indexx Connect, Indexx Brainstorm AI, Indexx Shop, Indexx Pay, Indexx AI Smart Crypto, Indexx Developer Hub, Indexx Lotto, and Indexx DAO/Hive remain as in the original draft.)" />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper04} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="4. Technical Architecture"
          desc="Consensus Mechanism"
          content={
            <>
              <CustomListItem content="Federated Byzantine Agreement (FBA) allows fast, secure, and scalable consensus." />
              <CustomListItem content="Eliminates energy-intensive mining." />
            </>
          }
        />
        <InfoSection
          desc="Token Issuance & Distribution"
          content={
            <>
              <CustomListItem content="Native Stellar asset with a fixed total supply of 21 trillion BTCY (1 BTC = 1,000,000 BTCY)." />
              <CustomListItem content="Distribution:" />
              <CustomListItem content="50% - Mining Rewards (Proof-of-Participation)" />
              <CustomListItem content="25% - Ecosystem Development" />
              <CustomListItem content="10% - Community & DAO Treasury (Airdrop)" />
              <CustomListItem content="10% - Partnerships & Marketing" />
              <CustomListItem content="5% - Team & Advisors" />
            </>
          }
        />
        <InfoSection
          desc="Smart Contracts on Soroban"
          content={
            <>
              <CustomListItem content="Automated staking, yield farming, and cross-chain transactions." />
              <CustomListItem content="Programmable governance models." />
            </>
          }
        />
        <InfoSection
          desc="Decentralized Identity & Privacy"
          content={
            <>
              <CustomListItem content="Zero-Knowledge Proofs (ZKP) ensure transaction privacy." />
              <CustomListItem content="Non-custodial wallets for user security." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper05} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="5. Economic Model & Tokenomics"
          desc="Tokenomics"
          content={
            <>
              <CustomListItem
                title="Start Price: "
                content="$0.10 (subject to market dynamics)."
              />
              <CustomListItem
                title="Supply Model: "
                content="Controlled emission with deflationary mechanisms."
              />
              <CustomListItem
                title="Mining Rewards: "
                content="AI-moderated to maintain balance and scarcity."
              />
              <CustomListItem
                title="Session Length: "
                content="All mining plans operate in 6-hour sessions, but rates below are expressed per hour for clarity."
              />
            </>
          }
        />
        <InfoSection desc="5.1 Mining & Subscription Plans (Hourly Rates)" />

        <div className="overflow-x-auto my-10">
          <table className="min-w-full bg-transparent border-collapse text-sm lg:text-xl lg:table-fixed">
            <thead>
              <tr className="">
                <th className="py-2 px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal">
                  Plan
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal">
                  Cost
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal">
                  Speed Boost
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal">
                  Approx. Mining Rate*
                </th>
                <th className="py-2 px-2 sm:px-2 md:py-3 md:px-4 text-left min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal">
                  Key Benefits
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="my-6">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Free Plan (&quot;Snatch Gopher&quot;)
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  $0
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  1x
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  ~1.5 BTCY/hour
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Every user can join this plan at no cost. To maintain free
                  mining rewards, users may be asked to perform simple
                  engagement activities (e.g., view a few ads daily or remain
                  active in the app). This plan maximizes accessibility — even
                  without any investment, a user can steadily accumulate BTCY
                  through regular app use.
                </td>
              </tr>
              <tr className="my-6">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Electric Power
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  $100 / month
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  3x
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  ~4.5 BTCY / hour
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Triples the free mining output. Subscribers earn tokens faster
                  and enjoy perks such as priority in transaction processing
                  (their transfers are slightly prioritized if the network is
                  busy).
                </td>
              </tr>
              <tr className="my-6">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Turbo Power
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  $300 / month
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  6x
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  ~9 BTCY / hour
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Provides six times the free-plan output. Turbo users benefit
                  from &quot;super speed&quot; mining and also get priority for
                  withdrawals — if withdrawal queues occur, Turbo plan requests
                  are processed before Free/Electric users.
                </td>
              </tr>
              <tr className="my-6">
                <td className="py-2 px-2 sm:px-0 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Nuclear Power
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  $600 / month
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  9x
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  ~13.5 BTCY / hour
                </td>
                <td className="py-2 px-2 sm:px-2 md:py-3 md:px-4 min-w-32 whitespace-nowrap lg:w-1/5 lg:whitespace-normal align-top">
                  Offers the highest standard mining rate with nine times the
                  base output. Nuclear subscribers enjoy VIP support (dedicated
                  customer service, faster issue resolution, and exclusive
                  community perks).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-center text-xl my-10 mx-auto max-w-4xl font-semibold">
          Rates shown are per hour. Over a full 6-hour session, the approximate
          total mined is 6× the hourly figure (e.g., Free ≈9 BTCY per session,
          Nuclear ≈81 BTCY per session).
        </p>

        <div className="mt-40"></div>
        <InfoSection
          desc="5.2 Ad-Watching Rewards"
          content={
            <>
              <CustomListItem content="Earning BTCY Power: Users can earn extra BTCY Power by watching up to 25 advertisements daily." />
              <CustomListItem content="Daily Streaks: Maintaining daily streaks increases either the bonus time or mining power. An example is provided: 6 hours on Day 1, scaling up to 24 hours on Day 7." />
              <CustomListItem content="Reward Crediting: Rewards are automatically deposited into user wallets using smart contracts." />
            </>
          }
        />

        <InfoSection
          desc="Deflationary Model"
          content={
            <>
              <CustomListItem content="Token Burns: Token burns are implemented to reduce the overall supply of tokens, thereby increasing their scarcity." />
              <CustomListItem content="Mining Reward Halving: The mining reward is halved every 6 months, a mechanism designed to control inflation." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper06} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="6. Withdrawal Rules"
          endingLine="To maintain network stability, prevent spam withdrawals, and ensure fair distribution, Bitcoin-Yay (BTCY) implements a structured withdrawal and usage vetting system:"
        />

        <InfoSection
          desc="6.1 Minimum Withdrawal Threshold"
          content={
            <>
              <CustomListItem content="Users must accumulate at least 10,000 BTCY before they can initiate any withdrawal." />
              <CustomListItem content="Withdrawals below this threshold are not permitted, ensuring that network fees and security checks remain cost-efficient." />
            </>
          }
        />

        <InfoSection
          desc="6.2 Usage Thresholds for Ecosystem Activities"
          content={
            <>
              <CustomListItem
                title="Indexx Lotto: "
                content="A minimum balance of 10,000 BTCY is required to participate in the on-chain lottery."
              />
              <CustomListItem
                title="Alchemy Game: "
                content="Users must hold at least 100,000 BTCY to access the Alchemy feature, which allows advanced token transformation and reward multipliers."
              />
              <CustomListItem content="These thresholds protect against abuse and create meaningful participation requirements." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper07} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="7. Roadmap"
          content={
            <>
              <CustomListItem
                title="Phase 1 (2025-2026): "
                content="Deploy AI-powered 6-hour mining, launch dedicated mining application, and integrate ad-watching rewards."
              />
              <CustomListItem
                title="Phase 2 (2026-2027): "
                content="Cross-chain integrations, develop chat/browser/AI wallet, and implement Indexx Pay for real-world payments."
              />
              <CustomListItem
                title="Phase 3 (2027-2029): "
                content="Mass adoption, establish full decentralized governance, and achieve $200 billion market valuation."
              />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper08} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="8. Future Developments & Community Engagement"
          content={
            <>
              <CustomListItem content="Continued R&D for AI-based mining algorithms." />
              <CustomListItem content="Partnerships for merchants accepting BTCY as payment." />
              <CustomListItem content="Ongoing security audits and enhancements." />
            </>
          }
        />

        <div className="flex justify-center items-center my-30">
          <Image src={Whitepaper09} alt="Whitepaper-04" />
        </div>

        <InfoSection
          title="9. Conclusion"
          endingLine="Bitcoin-Yay (BTCY) represents a new era of blockchain ecosystems with fast transactions, AI-based 6-hour mining sessions, and ad-watching rewards that let users earn BTCY Power through daily engagement. By leveraging Stellar's robust infrastructure, it enables scalable, sustainable, and secure financial interactions. With its deflationary model, cross-chain compatibility, and user-friendly participation incentives, Bitcoin-Yay is positioned to redefine decentralized economies."
        />
      </div>
    </div>
  );
}
