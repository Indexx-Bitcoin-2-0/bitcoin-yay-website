import Image from "next/image";

import ArtImage1 from "@/assets/images/btcy-sat/art-1.webp";

export default function BtcySat() {
  return (
    <div className="container mx-auto mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="mt-10 text-lg md:text-2xl mb-4 font-bold text-primary">
          Why Choose
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">
          BTCY over SAT
        </h1>
      </div>

      <div className="mt-20 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
        <ul className="list-disc flex flex-col gap-10 text-xl md:text-3xl font-bold pl-6">
          <li>
            <h3>Mobile-First, Low-Energy “Tap-to-Earn” Model</h3>
            <p className="text-lg font-light">
              BTCY is designed around a simple mobile experience: users tap the
              app to “mine” reward tokens without draining their battery or data
              plan. In contrast, SAT’s Proof-of-Work mining is GPU-intensive and
              impractical on phones.
            </p>
          </li>
          <li>
            <h3>Instant, Scalable Transactions</h3>
            <p className="text-lg font-light">
              Built on Stellar, BTCY settlements finalize in 3–5 seconds at
              thousands of TPS. SAT transactions on Bitcoin/BRC-20 incur ~10
              minute block times and network congestion. Fast finality is
              crucial for a seamless in-app referral and payout system.
            </p>
          </li>
          <li>
            <h3>Predictable Supply & Incentive Structure</h3>
            <p className="text-lg font-light">
              BTCY’s issuance can be managed via fixed schedules or gamified
              airdrops, giving us tight control over inflation and staking
              rewards. SAT’s scarcity mimics Bitcoin’s cap but makes reward
              modeling (for referral bonuses, subscription tiers, lotto entries)
              inflexible.
            </p>
          </li>
          <li>
            <h3>Easier Developer & Integrator Experience</h3>
            <p className="text-lg font-light">
              Stellar’s asset framework (trustlines, anchors, multi-sig) lets us
              roll out wallets, in-app swaps, and cross-border payouts quickly.
              Leveraging BRC-20 would require custom tooling on top of Bitcoin
              nodes and Ordinals, slowing development.
            </p>
          </li>
          <li>
            <h3>Lower Operational & Compliance Overhead</h3>
            <p className="text-lg font-light">
              Stellar’s federated consensus and known validator set simplify
              on-chain monitoring and compliance checks. Bitcoin mining pools
              and mempool analysis for SAT are more opaque and resource-heavy to
              audit.
            </p>
          </li>
        </ul>
      </div>
      <div className="mt-40 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
        <Image src={ArtImage1} alt="Art Image 1" className="w-100" />
      </div>

      <div className="my-40 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Core Diferrence:
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">BTCY vs SAT</h1>

        <div className="mt-20 w-full max-w-6xl overflow-x-auto">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 text-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Dimension</th>
                <th>Bitcoin Yay (BTCY) on Stellar</th>
                <th>Satcoin (SAT) on Bitcoin/BRC-20</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Consensus & Finality
                </td>
                <td className="text-base md:text-lg">
                  Stellar’s SCP; 3–5 sec finality
                </td>
                <td className="text-base md:text-lg">
                  Bitcoin PoW; ~10 min blocks
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Transaction Throughput
                </td>
                <td className="text-base md:text-lg">~1,000 TPS</td>
                <td className="text-base md:text-lg">~7 TPS</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Mining Model</td>
                <td className="text-base md:text-lg">
                  No PoW — taps trigger off-chain rewards; optionally stake to
                  earn
                </td>
                <td className="text-base md:text-lg">
                  PoW — energy-intensive, GPU-focused
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Mobile Battery Use
                </td>
                <td className="text-base md:text-lg">Negligible</td>
                <td className="text-base md:text-lg">High (if mining)</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Supply & Scarcity
                </td>
                <td className="text-base md:text-lg">
                  Configurable high-volume issuance (e.g., 1 B BTCY)
                </td>
                <td className="text-base md:text-lg">
                  Capped by protocol (e.g., 21 M equivalent if BTC-like)
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Smart Contracts
                </td>
                <td className="text-base md:text-lg">
                  Native Stellar operations; anchors, multi-sig
                </td>
                <td className="text-base md:text-lg">
                  Limited via Ordinals/BRC-20 scripts
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Integration Speed
                </td>
                <td className="text-base md:text-lg">
                  Wallet SDKs + Horizon API + token anchors
                </td>
                <td className="text-base md:text-lg">
                  Custom BRC-20 indexers + full nodes
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Energy & Compliance
                </td>
                <td className="text-base md:text-lg">
                  Low-energy, federated validators; easy to monitor
                </td>
                <td className="text-base md:text-lg">
                  High-energy, decentralized mining; complex auditing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
