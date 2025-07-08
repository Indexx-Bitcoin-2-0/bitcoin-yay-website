import Image from "next/image";

import ArtImage1 from "@/assets/images/ying-yang-nodes/art-1.webp";
import ArtImage2 from "@/assets/images/ying-yang-nodes/art-2.webp";
import ArtImage3 from "@/assets/images/ying-yang-nodes/art-3.webp";
import ArtImage4 from "@/assets/images/ying-yang-nodes/art-4.webp";
import ArtImage5 from "@/assets/images/ying-yang-nodes/art-5.webp";
import ArtImage6 from "@/assets/images/ying-yang-nodes/art-6.webp";
import ArtImage7 from "@/assets/images/ying-yang-nodes/art-7.webp";

export const metadata = {
  title: "Ying Yang Nodes - Run Bitcoin Yay Blockchain Nodes on Your PC",
  description:
    "Learn about Ying Yang Nodes for Bitcoin Yay blockchain. Run lightweight nodes on personal computers, participate in consensus, and help secure the decentralized network. Four participation levels: Seeder, Sentinel, Guardian, Validator.",
  openGraph: {
    title: "Ying Yang Nodes - Run Bitcoin Yay Blockchain Nodes on Your PC",
    description:
      "Learn about Ying Yang Nodes for Bitcoin Yay blockchain. Run lightweight nodes on personal computers, participate in consensus, and help secure the decentralized network. Four participation levels: Seeder, Sentinel, Guardian, Validator.",
  },
};

export default function YingYangNodes() {
  return (
    <div className="container mx-auto mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="mt-10 text-5xl md:text-7xl mb-4 font-semibold">
          Ying Yang Nodes
        </h1>
        <Image
          src={ArtImage1}
          alt="Art Image 1"
          className="mt-10 w-100 md:w-150 lg:w-320"
        />
      </div>

      <div className="mt-80 max-w-6xl mx-auto px-4">
        <h2 className="text-xl md:text-3xl mb-4 font-bold text-primary">
          Introduction to
        </h2>
        <h1 className="text-3xl md:text-5xl xl:text-8xl mb-4 font-semibold">
          Ying Yang Nodes
        </h1>
        <p className="mt-10 text-tertiary text-xl font-light">
          Ying Yang Nodes represent a foundational part of the Bitcoin Yay
          ecosystem. Designed to run on personal computers like laptops and
          desktops, these nodes allow everyday users to participate in
          supporting and expanding the Yay blockchain network.
          <br />
          Much like other decentralized systems, Ying Yang Nodes validate and
          record transactions across a shared ledger. Their primary role is to
          help the network agree on the order and legitimacy of transactions—a
          process known as consensus.
          <br />
          However, unlike traditional mining models such as Bitcoin or Ethereum
          that rely on energy-intensive Proof of Work, Bitcoin Yay uses a
          lightweight, trust-based consensus mechanism. This approach is far
          more accessible to regular users. No expensive hardware or deep
          technical skills are required—just install the software on your
          computer and you&apos;re part of the network.
          <br />
          The Ying Yang Node app is built with simplicity in mind. It&apos;s
          easy to install, intuitive to use, and gives users the ability to:
          <br />
          <ul className="list-disc pl-6">
            <li>Check Yay balances</li>
            <li>Connect with the community</li>
            <li>Help secure the network</li>
          </ul>
          Turning the node on or off is entirely up to you—providing flexibility
          while still promoting decentralized participation.
          <br />
          This initial phase of Ying Yang Node deployment is part of Bitcoin
          Yay&apos;s broader vision of progressive decentralization. By
          empowering more people to get involved from the beginning, Bitcoin Yay
          is building a stronger, fairer, and more resilient network rooted in
          community.
          <br />
          No complex setup. No KYC. Just a people-powered blockchain, designed
          for everyone.
        </p>
      </div>

      <div className="my-60 flex items-center justify-center px-4">
        <Image src={ArtImage2} alt="Art Image 2" className="w-100" />
      </div>

      {/* Seeder Section */}
      <div className="mt-32 w-full flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-3xl mb-4 font-bold text-primary">
            Levels of
          </h2>
          <h1 className="text-3xl md:text-5xl xl:text-8xl mb-4 font-semibold">
            Node Participation
          </h1>
          <p className="mt-10 text-tertiary text-xl font-light">
            Ying Yang Nodes offer four flexible levels of participation for
            individuals running the node software on their personal computers.
            Whether you&apos;re just getting started or ready to dive deeper
            into helping secure and grow the network, there&apos;s a role for
            everyone in the Ying Yang ecosystem.
            <br />
            <br />
            Each level is designed to match your technical ability,
            availability, and interest—so you can contribute at your own pace
            while being part of a more decentralized future.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl md:text-5xl font-bold">1. Seeder</h2>
          <p className="mt-6 text-base md:text-lg text-tertiary">
            Seeder is the entry-level role in the Ying Yang Node ecosystem. This
            tier grants users access to the Ying Yang Desktop App, delivering a
            seamless desktop experience that reflects the core features of the
            mobile app—such as viewing your Yay balance, engaging in community
            chats, streaming media, and exploring Ying Yang-powered
            applications.
            <br />
            <br />
            While Seeders do not participate in blockchain validation, they play
            a vital role in growing and nurturing the ecosystem. With a simple,
            intuitive interface, Seeders can immerse themselves in the network
            without the technical demands of full node operation—making it an
            ideal starting point for everyday users.
          </p>
        </div>
        <div className="mt-8 w-full overflow-x-auto">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 text-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Parameter</th>
                <th>Minimum</th>
                <th>Recommended</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">vCPU</td>
                <td className="text-base md:text-lg">2</td>
                <td className="text-base md:text-lg">
                  4 (Intel Xeon v4 / AMD EPYC)
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">RAM</td>
                <td className="text-base md:text-lg">4 GB</td>
                <td className="text-base md:text-lg">8 GB</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">SSD</td>
                <td className="text-base md:text-lg">50 GB NVMe</td>
                <td className="text-base md:text-lg">
                  120 GB NVMe (write ≥3k IOPS)
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Bandwidth</td>
                <td className="text-base md:text-lg">1 Mbps up/down</td>
                <td className="text-base md:text-lg">5 Mbps symmetric</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Ports</td>
                <td className="text-base md:text-lg">
                  11625/TCP (P2P), 11626/TCP (HTTP)
                </td>
                <td className="text-base md:text-lg">
                  11625/TCP (P2P), 11626/TCP (HTTP)
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">OS</td>
                <td className="text-base md:text-lg">Ubuntu 22.04 LTS</td>
                <td className="text-base md:text-lg">
                  Debian 12 or Ubuntu 22.04
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-60 flex items-center justify-center px-4">
        <Image src={ArtImage3} alt="Art Image 3" className="w-100" />
      </div>

      {/* Sentinel Section */}
      <div className="mt-32 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">2. Sentinel</h2>
        <p className="mt-6 text-base md:text-lg text-tertiary">
          Sentinels actively support the Ying Yang blockchain by running a Ying
          Yang Node. Once activated, these nodes help validate and relay
          transactions, contribute data to the network, and uphold the integrity
          of the distributed ledger—even if they aren&apos;t responsible for
          final consensus decisions.
          <br />
          <br />
          Sentinels are perfect for users who want to secure and strengthen the
          network without needing deep technical expertise. The setup is
          user-friendly, and in future phases, Sentinels may also contribute
          shared computing power—such as bandwidth, CPU, or storage—to help
          expand Ying Yang&apos;s decentralized infrastructure.
        </p>
        <div className="mt-8 w-full overflow-x-auto">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 text-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Requirements</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Stake (locked)</td>
                <td className="text-base md:text-lg">&gt; 5000 BTCY</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">vCPU</td>
                <td className="text-base md:text-lg">4</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">RAM</td>
                <td className="text-base md:text-lg">8 GB</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">SSD</td>
                <td className="text-base md:text-lg">
                  200 GB NVMe (journaling on separate disk ideal)
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">IP</td>
                <td className="text-base md:text-lg">
                  Static v4+v6 (dual-stack)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Oracle Section */}
      <div className="my-60 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto">
        <Image src={ArtImage4} alt="Art Image 4" className="w-120 mb-10" />
        <div className="">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">3. Oracle</h2>
          <p className="mt-6 text-base md:text-lg text-tertiary">
            Oracles are Ying Yang&apos;s elite high-performance nodes—always
            online and forming the backbone of the network&apos;s consensus
            mechanism. These advanced nodes are responsible for validating
            transactions, finalizing blocks, and keeping the entire network
            synchronized in real time.
            <br />
            <br />
            Oracles are selected based on consistent uptime, strong hardware
            performance, and proven reliability. As the Ying Yang ecosystem
            expands, additional Oracles will help scale the network—driving fast
            consensus, AI-enhanced validation, and global decentralization.
          </p>
        </div>
        <div className="mt-10 w-full overflow-x-auto">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 text-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Extra</th>
                <th>Minimum</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">CPU</td>
                <td className="text-base md:text-lg">
                  CUDA‑capable, 8 GB VRAM (e.g. RTX 3060)
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">RAM</td>
                <td className="text-base md:text-lg">16 GB</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Model Runtime</td>
                <td className="text-base md:text-lg">
                  YingRisk‑v1 (container)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Council Section */}
      <div className="my-60 px-4 max-w-6xl mx-auto">
        <Image src={ArtImage5} alt="Art Image 5" className="w-80 mb-10" />
        <h2 className="text-3xl md:text-5xl font-bold mb-4">4. Council</h2>
        <p className="mt-6 text-base md:text-lg text-tertiary">
          Councils represent the highest tier of responsibility and influence
          within the Ying Yang Node ecosystem. Acting as the decentralized
          network&apos;s governing body, Councils combine deep commitment,
          technical expertise, and strategic leadership to shape the future of
          the protocol.
          <br />
          <br />
          <p className="text-xl md:text-2xl font-semibold">
            Council Members are entrusted with:
          </p>
          <ul className="list-disc pl-8 mt-2 mb-2">
            <li>Finalizing consensus decisions alongside Oracles.</li>
            <li>
              Hosting and managing governance processes such as Ying Yang
              Improvement Proposals (YYIPs)
            </li>
            <li>
              Overseeing forks, upgrades, and resolving protocol-level conflicts
              through on-chain voting
            </li>
            <li>
              Serving as stability anchors during high-traffic, high-risk, or
              emergency conditions
            </li>
          </ul>
          <p className="text-xl md:text-2xl font-semibold mt-8">
            Requirements include:
          </p>
          <ul className="list-disc pl-8 mt-2">
            <li>Exceptional uptime and continuous availability</li>
            <li>Enterprise-grade infrastructure (CPU, RAM, bandwidth)</li>
            <li>Significant Yay holdings or established trust reputation</li>
            <li>
              Optional involvement in AI governance, smart contract arbitration,
              and system-level design
            </li>
          </ul>
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 text-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Requirements</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Stake lock</td>
                <td className="text-base md:text-lg">
                  ≥ 100 000 BTCY, 90 d minumum
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">
                  Service-Level Agreement
                </td>
                <td className="text-base md:text-lg">≥ 99 %</td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-lg md:text-xl">Hardware</td>
                <td className="text-base md:text-lg">
                  Dual‑node HA pair; each 8 vCPU, 16 GB RAM, 500 GB NVMe;
                  redundant power & network
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-20 md:mt-40 w-screen relative left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
        <Image
          src={ArtImage6}
          alt="art-image"
          className="w-screen max-w-[1900px]"
        />
      </div>

      {/* Selection Process Section */}
      <div className="mt-20">
        <div className="max-w-6xl mx-auto px-4 mt-16 text-bg3">
          <h2 className="text-xl md:text-[40px] font-bold text-primary mb-2">
            Selection Process for
          </h2>
          <h1 className="text-3xl md:text-5xl xl:text-[90px] font-bold mb-8 text-secondary">
            Ying Yang Running Nodes
          </h1>
          <p className="text-xl mb-12">
            To support the Bitcoin Yay Testnet, users can apply to operate as
            either an any of Ying Yang Nodes. Here&apos;s how the process works:
          </p>

          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
            How to Apply
          </h3>
          <ul className="list-decimal pl-8 text-xl mb-8 space-y-2">
            <li>
              Download and install the Ying Yang Node software on your personal
              computer (laptop or desktop).
            </li>
            <li>
              Complete the node application directly within the Ying Yang Node
              interface.
            </li>
            <li>
              Follow the on-screen instructions to install any required
              technical packages.
            </li>
            <li>
              Keep your node running as much as you&apos;re comfortable with—it
              can run quietly in the background while you use your device
              normally.
            </li>
            <li>
              The Ying Yang Core Team will review node applications on a rolling
              basis and select participants based on performance, reliability,
              and technical readiness.
            </li>
          </ul>

          <p className="text-xl mb-12">
            Selections will unfold over the course of several months. The total
            number of accepted nodes will depend on how many meet the criteria
            for secure, consistent, and trustworthy participation in the Ying
            Yang network.
          </p>

          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
            Selection Criteria
          </h3>
          <p className="text-xl mb-6">
            Ying Yang Nodes will be selected based on the following technical
            and participation-based standards:
          </p>
          <ul className="list-disc pl-8 text-xl mb-8 max-w-4xl space-y-2">
            <li>
              Uptime
              <br /> The more consistently your device remains online and
              connected, the stronger your node performance.
            </li>
            <li>
              Internet Stability
              <br /> A reliable, fast internet connection ensures smooth syncing
              and efficient communication with the network.
            </li>
            <li>
              Port Accessibility
              <br /> Your system should be able to open necessary network ports
              for validation and peer-to-peer communication.
            </li>
            <li>
              Hardware Readiness
              <br /> Devices should meet the minimum requirements for processor
              speed, memory, and storage (refer to Node Docs for specifics).
            </li>
            <li>
              Community Contributions
              <br /> Past engagement with the Bitcoin Yay or Ying Yang community
              may positively impact your application.
            </li>
            <li>Trust & Performance Metrics</li>
          </ul>

          <p className="text-xl mb-16">
            Nodes are assessed based on reliability, responsiveness, and
            consistent participation throughout the test phase. No KYC required.
            Selection is based solely on your system’s performance and your
            active support of the network—not your identity.
          </p>
        </div>
      </div>

      <div className="mt-80 max-w-6xl mx-auto px-4">
        <div className="mx-auto mt-16">
          <h2 className="text-xl md:text-[40px] font-bold text-primary mb-2">
            Ying Yang Nodes
          </h2>
          <h1 className="text-3xl md:text-5xl xl:text-[90px] font-bold mb-8">
            Testnet Roadmap
          </h1>
          <p className="text-xl mb-16 text-bg3">
            The rollout of Ying Yang Nodes will follow a carefully structured,
            community-first development path. The Selection Stage is the
            foundational phase in building a resilient decentralized network.
          </p>
        </div>

        <div className="mt-16 text-bg3">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
            1. Selection Stage
          </h3>
          <p className="text-xl mb-6">
            In this early phase, the Bitcoin Yay team will work with applicants
            who have installed the Ying Yang Node software to evaluate
            real-world performance across different environments.
          </p>

          <h4 className="text-2xl md:text-3xl font-bold text-secondary">
            We’ll measure:
          </h4>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>
              Online Duration – How long your node remains connected to the
              network.
            </li>
            <li>
              Processing Performance – How efficiently your device handles node
              tasks.
            </li>
            <li>
              Bandwidth Usage – How much data your system sends and receives.
            </li>
            <li>
              Connection Stability – The consistency and reliability of your
              internet connection.
            </li>
          </ul>

          <h4 className="text-2xl md:text-3xl font-bold mt-10 text-secondary">
            This testing phase will help define:
          </h4>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>Baseline and recommended system requirements.</li>
            <li>Technical expectations for long-term node participation.</li>
            <li>
              The best practices for building a fair, secure, and decentralized
              infrastructure.
            </li>
          </ul>

          <p className="mt-10 text-xl mb-16">
            The goal of this phase is simple: maximize inclusion while
            protecting network integrity. Your participation helps shape the
            future of the Bitcoin Yay ecosystem—starting with Ying Yang Nodes.
          </p>
        </div>

        <div className="mt-16 text-bg3">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
            2. Revision Stage
          </h3>
          <p className="text-xl mb-6">
            This phase is all about putting the Ying Yang Node network through
            real-world pressure and edge-case scenarios to fine-tune its
            consensus algorithm and system resilience.
          </p>

          <h4 className="text-2xl md:text-3xl font-bold mt-10 text-secondary">
            Simulation & Stress Testing
          </h4>
          <p className="text-xl mb-6">
            The network will simulate a wide range of conditions to assess its
            performance under stress. These simulations help ensure the protocol
            can scale and remain stable even during unexpected events.
          </p>

          <h4 className="text-2xl md:text-3xl font-bold mt-10 text-secondary">
            Key areas of focus:
          </h4>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>
              Sudden Node Dropouts – What if 30% of nodes go offline
              unexpectedly?
            </li>
            <li>
              Network Partitioning – Can the system recover from temporary
              splits in the network?
            </li>
            <li>
              Traffic Surges – How well does message passing and voting handle
              rapid growth in user activity?
            </li>
          </ul>

          <p className="text-xl mb-6 mt-10">
            To run these simulations effectively, a temporary centralized
            coordination layer may be introduced. This helps simulate:
          </p>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>Large-scale trust graphs</li>
            <li>Formation of quorum groups</li>
            <li>Rapid consensus cycles across the node network</li>
          </ul>

          <p className="mt-6 text-xl">
            This centralized testing scaffold is only temporary and will be
            fully removed prior to the mainnet launch.
            <br />
            As the Bitcoin Yay team gathers data, the consensus logic will be
            continuously refined to meet the needs of a massively distributed,
            low-barrier, people-powered network.
          </p>
        </div>

        <div className="mt-16 text-bg3">
          <h3 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
            3. Live Testnet
          </h3>
          <p className=" text-xl mb-6">
            This is where the Ying Yang Node network begins operating under
            real-world conditions.
          </p>

          <h4 className="text-2xl md:text-3xl font-bold mt-10">
            Live Testing, Real Participation
          </h4>

          <ul className="list-disc pl-8  text-xl mt-4 space-y-2">
            <li>
              Ying Yang Nodes start processing live test transactions across the
              Bitcoin Yay blockchain.
            </li>

            <li>
              Security and trust data will be generated in real time by real
              participants.
            </li>
            <li>
              All roles—from lightweight desktop users (Honey Bees) to
              high-uptime validators (Visionary and Royal Bees)—will now work
              together to simulate full-scale decentralized operations.
            </li>
          </ul>
          <p className="mt-6 text-xl">
            Though it’s still technically a testnet, this phase represents the
            start of real decentralized activity within the Bitcoin Yay
            ecosystem. It’s where:
          </p>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>Bugs are identified and squashed in real-time.</li>
            <li>Performance gets optimized through active feedback loops.</li>
            <li>Community members begin shaping how the network evolves.</li>
          </ul>
          <p className="mt-6 text-xl">
            Bitcoin Yay is building a network for everyone—not just coders or
            tech elites.Whether you&apos;re running a node quietly from your
            laptop or actively helping validate the system, your contribution
            moves the chain forward.
          </p>

          <p className="mt-6 text-xl">
            This is more than a test—It’s the beginning of people-powered
            blockchain. Let’s build it together.
          </p>
        </div>
      </div>

      <div className="my-60 flex flex-col items-center justify-center px-4 max-w-6xl mx-auto text-bg3">
        <Image src={ArtImage7} alt="Art Image 7" className="w-150" />
        <div className="mt-16">
          <h2 className="text-3xl md:text-5xl xl:text-8xl font-bold mt-10 text-secondary">
            Ying Yang Node FAQ
          </h2>
          <h5 className="mt-20 text-xl md:text-2xl xl:text-[40px] font-bold text-secondary">
            What is the relationship between the Bitcoin Yay Node software and
            the mobile application?
          </h5>
          <h5 className="mt-10 text-xl md:text-3xl font-bold text-secondary">
            The Ying Yang Node and the Bitcoin Yay mobile app work together
            using the same account.
          </h5>
          <ul className="mt-6 list-disc pl-8 text-xl space-y-2">
            <li>You log into the Node using your mobile app login.</li>
            <li>One person can have only one Bitcoin Yay account.</li>
            <li>Right now, only one node per account is allowed.</li>
            <li>
              Mining (earning Yay) starts from the mobile app, not the desktop.
            </li>
          </ul>
          <h5 className="mt-20 text-xl md:text-3xl font-bold text-secondary">
            The Ying Yang Node on your computer lets you:
          </h5>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>Check your Yay balance</li>
            <li>Chat with the community</li>
            <li>Watch media content</li>
          </ul>
          <p className="mt-6 text-xl">
            Both tools give you different ways to support the network.
          </p>
          <p className="mt-6 text-xl">
            Running a Node does not limit or change any features in the mobile
            app. They&apos;re simply two ways to participate more deeply in the
            Bitcoin Yay ecosystem.
          </p>
          <h5 className="mt-20 text-xl md:text-3xl font-bold text-secondary">
            Will running a Node affect my computer’s performance?
          </h5>
          <p className="mt-6 text-xl">
            Not really—unless you turn on the blockchain functions.
          </p>
          <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
            <li>
              If you don’t activate the full Node mode, the app uses very little
              CPU, memory, or internet.
            </li>
            <li>If you do turn it on, your computer will use more:</li>
            <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
              <li>CPU & memory</li>
              <li>Internet bandwidth</li>
              <li>Storage space</li>
            </ul>
          </ul>
          <p className="mt-6 text-xl">
            During the test phase, the team is checking how different devices
            perform. <br />
            You’re always in control—you can turn your Ying Yang Node on or off
            anytime.
          </p>
          <h5 className="mt-20 text-xl md:text-3xl font-bold text-secondary">
            Will running a Node affect my computer’s performance?
          </h5>
          <p className="mt-6 text-xl">
            <span className="font-bold">
              Not yet.
              <br />
            </span>{" "}
            During the Testnet phase, there are no rewards for running a node.
            <br />
            This stage is all about testing and improving the network.
            <br />
            But—your participation matters. The data collected now will help
            create a fair reward system for when the Mainnet launches.
          </p>

          <h5 className="mt-20 text-xl md:text-3xl font-bold text-secondary">
            Will I Earn Rewards for Running a Ying Yang Node?
          </h5>
          <p className="mt-6 text-xl">
            <span className="font-bold">
              Not yet.
              <br />
            </span>{" "}
            During the Testnet phase, there are no rewards for running a node.
            <br />
            This stage is all about testing and improving the network.
            <br />
            But—your participation matters. The data collected now will help
            create a fair reward system for when the Mainnet launches.
          </p>

          <h5 className="mt-20 text-xl md:text-3xl font-bold text-secondary">
            Is the Ying Yang Node Software Open Source?
          </h5>
          <p className="mt-6 text-xl">
            Yes! The blockchain part of the Ying Yang Node software will be open
            source.
            <br />
            We’re getting the GitHub page ready. Once it’s live, you’ll be able
            to:
            <ul className="list-disc pl-8 text-xl mt-4 space-y-2">
              <li>View the source code</li>
              <li>Suggest improvements</li>
              <li>Join community development</li>
            </ul>
            <br />
            Stay tuned for the official release and updates!
          </p>
        </div>

        <div className="mt-80">
          <p className="text-base italic">
            DISCLAIMER <br />
            This document outlines the early release and vision of Ying Yang
            Nodes, the foundational infrastructure for the Bitcoin Yay network,
            along with a preliminary roadmap for their testnet functionality.
            Please note: The information presented here is subject to change as
            new data emerges during the operation of the testnet and through
            ongoing community participation. This release does not reflect the
            final Bitcoin Yay mainnet infrastructure, which may remain partially
            restricted during its initial deployment phase. As the network
            evolves and stabilizes, broader access to mainnet nodes will
            gradually open to the community. We encourage all participants to
            stay informed through official Bitcoin Yay channels, as technical
            outcomes and user feedback may guide important refinements along the
            way.
          </p>
        </div>
      </div>
    </div>
  );
}
