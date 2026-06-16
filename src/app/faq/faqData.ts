// Extensive FAQ content for Bitcoin Yay (BTCY), powered by Indexx.ai.
//
// NOTE FOR THE TEAM: answers are written to be accurate at a general level.
// Anywhere an exact figure is involved (fees, prices, session lengths, payout
// timing, tier counts), confirm the live value before publishing — those are
// marked in copy with neutral phrasing like "current rates in the app".

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        q: "What is Bitcoin Yay (BTCY)?",
        a: "Bitcoin Yay (BTCY) is a mobile-first crypto ecosystem built around a simple, energy-light way to earn: an in-app, tap-to-mine experience powered by Indexx.ai. Instead of expensive hardware, you grow your BTCY balance directly from your phone while engaging with the app.",
      },
      {
        q: "How do I create a BTCY account?",
        a: "Download the Bitcoin Yay app from the App Store or Google Play, or sign up on the website. Register with your email, verify it, and you can start mining right away. Your account works across the mobile app and the web platform.",
      },
      {
        q: "Is Bitcoin Yay free to use?",
        a: "Yes. Creating an account and mining BTCY is free. Optional paid mining plans and other premium utilities exist to enhance your experience, but they are never required to participate.",
      },
      {
        q: "Which devices and platforms are supported?",
        a: "Bitcoin Yay runs on iOS and Android phones, with a companion website for account management, buying/selling, referrals, and deeper analytics. Blockchain Nodes additionally run on personal computers (laptops/desktops).",
      },
      {
        q: "What does “powered by Indexx.ai” mean?",
        a: "Indexx.ai provides the underlying exchange, wallet, and infrastructure that the Bitcoin Yay ecosystem is built on. It handles things like accounts, secure storage, and trading rails behind the scenes.",
      },
    ],
  },
  {
    id: "mining",
    title: "Mining & Earning",
    items: [
      {
        q: "How does mining work in Bitcoin Yay?",
        a: "Mining in Bitcoin Yay is a virtual, app-based process — it does not consume your device's resources or mine real Bitcoin (BTC). You start a mining session in the app and accumulate BTCY over time. Watching short ads can unlock or extend longer sessions.",
      },
      {
        q: "Does BTCY mining actually mine Bitcoin (BTC)?",
        a: "No. BTCY mining is an in-app, AI-based tap-to-mine system that generates BTCY only. It is unrelated to Bitcoin (BTC) Proof-of-Work mining and does not produce BTC.",
      },
      {
        q: "How long is a mining session?",
        a: "A standard session runs for a fixed cycle, and you can extend to a longer cycle by watching a few short ads. The exact durations are shown in the app when you start mining.",
      },
      {
        q: "Why do I need to watch ads?",
        a: "Ads fund the rewards pool and, in some cases, unlock extended mining cycles. Verified ad engagement is also what generates the advertising-revenue allocation that powers features like the Mining Station.",
      },
      {
        q: "What happens if I miss a day of mining?",
        a: "Your existing balance is unaffected, but you stop accumulating new BTCY until you start a new session. Mining regularly (and keeping a streak) helps you maximize your earnings over time.",
      },
      {
        q: "How is my mining rate determined?",
        a: "Your rate is based on a base mining speed plus any active boosts — for example a mining plan (Gopher tier), referral activity, and other in-app multipliers. You can see your current and boosted rates on the mining details screen.",
      },
    ],
  },
  {
    id: "mining-plans",
    title: "Mining Plans (Gophers)",
    items: [
      {
        q: "What are Mining Gophers / mining plans?",
        a: "Mining Gophers are optional subscription tiers — Snatch, Electric, Turbo, and Nuclear — that increase your in-app virtual mining speed and unlock additional utilities. Higher tiers provide a larger boost to your BTCY generation capacity.",
      },
      {
        q: "Are mining plans an investment?",
        a: "No. Mining plans are not investment contracts, securities, or profit-generating instruments. They only enhance your participation inside the BTCY ecosystem by increasing virtual mining speed and access to in-app features.",
      },
      {
        q: "What is the difference between the tiers?",
        a: "Each tier (Snatch → Electric → Turbo → Nuclear) provides a progressively higher mining-speed multiplier and access to more utilities. The Nuclear tier provides the strongest boost. Current pricing and exact multipliers are shown on the plans screen.",
      },
      {
        q: "Can I change or cancel my plan?",
        a: "Yes. You can upgrade, change, or cancel your plan from the subscription section. Changes take effect according to the terms shown at checkout.",
      },
      {
        q: "What is a “Nuclear Power Boost”?",
        a: "It is a temporary activation of the highest-tier mining power, often granted as a campaign reward. While active, it accelerates your virtual mining output for the boost duration.",
      },
    ],
  },
  {
    id: "ads-rewards",
    title: "Ads & Rewards",
    items: [
      {
        q: "How do reward tasks work?",
        a: "Beyond mining, the app offers reward tasks — such as following social channels or sharing posts — that grant bonuses. Complete the task, submit any required proof, and the reward is credited after verification.",
      },
      {
        q: "How do I claim a reward?",
        a: "Open the Rewards section, complete the listed action, and tap claim. Some rewards (like screenshot submissions) require a quick verification step before they are credited.",
      },
      {
        q: "Why was my reward submission rejected?",
        a: "Common reasons include an unclear screenshot, an unmatched account, or not meeting the task requirements. Re-check the task instructions and resubmit a valid proof.",
      },
    ],
  },
  {
    id: "airdrops",
    title: "Airdrops",
    items: [
      {
        q: "What is a BTCY airdrop?",
        a: "An airdrop is a time-limited campaign where eligible users can win BTCY or other rewards — for example a Loyalty Airdrop for active miners, or a Social Media Airdrop for posting about Bitcoin Yay.",
      },
      {
        q: "How do I qualify for an airdrop?",
        a: "Each campaign lists its own rules (for example: be an active miner, create a post and tag the official account, or register before a deadline). Follow the steps shown on the airdrop card or page to qualify.",
      },
      {
        q: "When are airdrop rewards distributed?",
        a: "Each airdrop shows an “Ends” date and a “Distribution” date. Winners are selected after the campaign closes and rewards are distributed on the stated distribution date.",
      },
      {
        q: "How will I know if I won?",
        a: "Winners are notified in-app and may also be announced through official channels (e.g. Telegram). Keep notifications enabled so you don't miss it.",
      },
    ],
  },
  {
    id: "referrals",
    title: "Referrals",
    items: [
      {
        q: "How does the referral program work?",
        a: "Share your unique referral link or code. When new users sign up and become active through your link, they count as your verified referrals — which unlock bonuses and higher tiers of benefits.",
      },
      {
        q: "Where do I find my referral link?",
        a: "Your referral link and QR code are available in the Referrals section of the app and website. You can copy the link or share it directly to WhatsApp, Telegram, and other channels.",
      },
      {
        q: "What counts as a “verified” referral?",
        a: "A verified referral is a real, active user who signed up with your link — not a duplicate or fraudulent account. Anti-fraud checks run on referrals to keep the program fair.",
      },
      {
        q: "What do I earn from referrals?",
        a: "Referrals can boost your mining rate, earn you referral bonuses, and — once you reach the required milestone — unlock access to the Ambassador Program and the Mining Station. Active referrals also drive your ongoing earnings.",
      },
    ],
  },
  {
    id: "mining-station",
    title: "Ambassador & Mining Station",
    items: [
      {
        q: "What is the Mining Station?",
        a: "The Mining Station is a partner dashboard that lets you build and manage your own community of BTCY miners. You can track active miners, view analytics, communicate with your network, and earn an advertising-revenue allocation generated by your station.",
      },
      {
        q: "How do I unlock the Mining Station?",
        a: "Mining Stations are available to users with at least 50 verified referrals. Once you reach 50 referrals, you can activate your own station and start growing your mining network.",
      },
      {
        q: "What can I do inside the Mining Station?",
        a: "You get an Overview of your station's performance, a list of your Miners, your Referrals, an Earnings breakdown, and Withdrawals — so you can monitor activity and manage your advertising-revenue allocation in one place.",
      },
      {
        q: "What is the Ambassador Program?",
        a: "Ambassadors are community builders who actively grow the BTCY network. Reaching ambassador status unlocks additional benefits and is part of the path toward operating a Mining Station.",
      },
      {
        q: "How are Mining Station earnings calculated?",
        a: "Earnings come from a share of the verified advertising revenue generated by your active miners. Your dashboard shows lifetime earnings, current-month earnings, pending (unverified) amounts, and your available withdrawal balance.",
      },
    ],
  },
  {
    id: "buy-sell",
    title: "Buying & Selling BTCY",
    items: [
      {
        q: "How do I buy BTCY?",
        a: "You can buy BTCY through the in-app/website purchase flow using the supported payment methods. Follow the buy flow, choose your amount and payment method, and confirm.",
      },
      {
        q: "How do I sell BTCY?",
        a: "Use the Sell flow to convert your BTCY balance. The app walks you through the amount, method, and confirmation. Availability of selling can depend on your region and current platform status.",
      },
      {
        q: "What payment methods are supported?",
        a: "Supported methods can include cards and other processors shown at checkout (the exact options depend on your region). The available list is always displayed in the payment step.",
      },
      {
        q: "Are there fees for buying or selling?",
        a: "Any applicable network or processing fees are shown before you confirm a transaction. Always review the summary on the confirmation screen for the exact amount.",
      },
    ],
  },
  {
    id: "wallet-tokens",
    title: "Wallet & Tokens",
    items: [
      {
        q: "Where is my BTCY stored?",
        a: "Your BTCY is held in your account wallet within the Bitcoin Yay / Indexx.ai ecosystem. You can view balances, transaction history, and transfers from the wallet section.",
      },
      {
        q: "What is the difference between verified and unverified balance?",
        a: "Verified balance is fully confirmed and usable. Unverified (or pending) balance is still being validated — for example earnings that depend on verified ad engagement — and becomes available once confirmed.",
      },
      {
        q: "What is BTCY Alchemy?",
        a: "BTCY Alchemy is an in-app feature for converting and claiming tokens within the ecosystem. The Alchemy flow guides you through processing and claiming step by step.",
      },
      {
        q: "Can I transfer BTCY to another user?",
        a: "Transfers within the ecosystem are supported where enabled. Use the transfer option in your wallet and follow the on-screen steps and any limits shown.",
      },
    ],
  },
  {
    id: "nodes",
    title: "Blockchain Nodes",
    items: [
      {
        q: "What are Bitcoin Yay Nodes?",
        a: "Nodes are software you run on a personal computer to help validate transactions and secure the Yay blockchain. Unlike energy-intensive Proof-of-Work, BTCY uses a lightweight, trust-based consensus that ordinary laptops and desktops can support.",
      },
      {
        q: "What are the node participation levels?",
        a: "There are four levels of participation — Seeder, Sentinel, Guardian, and Validator — each with a different role and contribution to the network.",
      },
      {
        q: "Do I need special hardware to run a node?",
        a: "No. Because BTCY uses a lightweight consensus mechanism, you don't need expensive mining hardware or deep technical skills — you install the node software on your computer and you're part of the network.",
      },
    ],
  },
  {
    id: "withdrawals",
    title: "Payments & Withdrawals",
    items: [
      {
        q: "How do withdrawals work?",
        a: "From the Withdrawals area you choose a withdrawal method, enter the amount, provide a destination where required, and submit the request. Requests are reviewed and processed, then reflected in your withdrawal history.",
      },
      {
        q: "What are the withdrawal methods?",
        a: "Supported payout methods are listed in the withdrawal form (for example a BTCY wallet or stablecoin networks). For external-chain payouts you'll be asked to enter your deposit address.",
      },
      {
        q: "Is there a minimum withdrawal amount?",
        a: "Yes — a minimum applies, and the form prevents you from submitting below it. The current minimum is shown in the withdrawal screen.",
      },
      {
        q: "How long do withdrawals take?",
        a: "Withdrawals are reviewed and typically processed within a short window. You can track each request's status (pending, completed, or rejected) in your withdrawal history.",
      },
    ],
  },
  {
    id: "account-security",
    title: "Account & Security",
    items: [
      {
        q: "How do I reset my password?",
        a: "Use the “Forgot password” option on the login screen, enter your email, and follow the reset link sent to you. You can then set a new password.",
      },
      {
        q: "How do I keep my account secure?",
        a: "Use a strong, unique password, keep your email secure, enable any available verification options, and never share your login or recovery details. The team will never ask for your password.",
      },
      {
        q: "Can I change my profile details or language?",
        a: "Yes. You can update your profile from the account/profile section, and switch the app language — Bitcoin Yay supports multiple languages including English, Chinese, Spanish, and French.",
      },
      {
        q: "How do I delete my account or data?",
        a: "You can request account or data deletion through the app/website privacy options. The data-deletion page explains the process and what is removed.",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    items: [
      {
        q: "Is BTCY a financial investment?",
        a: "No. BTCY and its associated plans are designed to enhance participation in the ecosystem through in-app utilities. They are not investment contracts, securities, or profit-generating instruments, and nothing in the app is financial advice.",
      },
      {
        q: "Is Bitcoin Yay available in my country?",
        a: "Availability of certain features (such as buying, selling, or exchange functions) can vary by region due to local regulations. The app applies the appropriate restrictions automatically based on your location.",
      },
      {
        q: "Where can I read the terms and privacy policy?",
        a: "The full Terms of Use, User Agreement, and Privacy Policy are available in the app's legal section and on the website footer. We recommend reviewing them to understand your rights and responsibilities.",
      },
    ],
  },
];
