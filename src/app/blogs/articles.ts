// Long-form guides for the Bitcoin Yay blog. Content is written in Markdown and
// rendered by src/app/blogs/[slug]/page.tsx.
//
// NOTE FOR THE TEAM: like the FAQ, these guides stay at a general level. Exact
// prices, multipliers, session lengths and fees change, so the copy points
// readers to the live values inside the app rather than quoting numbers.

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "what-is-bitcoin-yay-btcy",
    title: "What Is Bitcoin Yay (BTCY)? A Beginner's Guide",
    description:
      "A plain-language introduction to Bitcoin Yay (BTCY): what it is, how the ecosystem fits together, who it is for, and how to get started for free.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Bitcoin Yay (BTCY) is a mobile-first crypto ecosystem built around a simple idea: earning digital tokens should not require expensive hardware, technical expertise, or a large amount of electricity. Instead of asking you to buy a mining rig, BTCY lets you grow a balance directly from your phone through an in-app, tap-to-mine experience powered by Indexx.ai.

This guide explains what BTCY is, how the pieces of the ecosystem fit together, and what a new user can realistically expect.

## The idea behind BTCY

Traditional Bitcoin mining uses Proof-of-Work, a process where specialised machines compete to solve mathematical puzzles. It secures the Bitcoin network, but it is energy-hungry and out of reach for most people. BTCY takes a different route. Mining inside the Bitcoin Yay app is a virtual, app-based process. It does not use up your phone's resources and it does not produce real Bitcoin (BTC). It generates BTCY only.

That distinction matters, and it is worth stating clearly: BTCY is its own token with its own ecosystem. It is not a way to mine BTC, and it is not a shortcut to Bitcoin.

## The main parts of the ecosystem

- **The mobile app.** Available on iOS and Android, the app is where most people start. You create an account, begin a mining session, and watch your balance grow over time.
- **The website.** A companion web platform for account management, buying and selling, referrals, and deeper analytics. Your account works across both the app and the website.
- **Mining plans.** Optional subscription tiers that increase your virtual mining speed. They are never required to take part.
- **Referrals and the Mining Station.** Users who bring in verified, active friends can unlock extra bonuses, and eventually a dashboard for managing their own community of miners.
- **Blockchain Nodes.** Software that runs on a personal computer and helps validate transactions and secure the network, using a lightweight consensus that does not need special hardware.
- **Airdrops and rewards.** Time-limited campaigns and reward tasks that give active users extra ways to earn.

## What does "powered by Indexx.ai" mean?

Indexx.ai provides the exchange, wallet and infrastructure that Bitcoin Yay is built on. It handles the behind-the-scenes work: accounts, secure storage and trading rails. For a user, this means your BTCY balance lives in your account wallet inside the Bitcoin Yay and Indexx.ai ecosystem, where you can see balances, transaction history and transfers in one place.

## Is it free to use?

Yes. Creating an account and mining BTCY is free. Optional paid plans and premium utilities exist to enhance the experience, but you can participate without buying anything.

## How to get started

1. Download the Bitcoin Yay app from the App Store or Google Play, or sign up on the website.
2. Register with your email and verify it.
3. Start your first mining session from the mining screen.
4. Come back regularly. Consistent mining, and keeping a streak, helps your balance grow over time.
5. Explore the wallet, the rewards section and the referral tools once you are comfortable.

## Things to keep in mind

BTCY and its associated plans are designed to enhance participation in the ecosystem through in-app utilities. They are not investment contracts, securities or profit-generating instruments, and nothing on this website or in the app is financial advice. Crypto assets can lose value, and availability of some features, such as buying, selling and exchange functions, can vary by region because of local regulations. Always read the Terms of Use and Privacy Policy, and only put in what you are comfortable with.

## Where to learn more

Our [FAQ](/faq) answers the most common questions in detail, the [whitepaper](/whitepaper) covers the project's vision, and the [about page](/about) explains who is behind Bitcoin Yay. If you get stuck, the [support](/support) page is the best place to ask for help.`,
  },
  {
    slug: "how-btcy-tap-to-mine-works",
    title: "How BTCY Tap-to-Mine Works (and What It Is Not)",
    description:
      "How mining sessions work in the Bitcoin Yay app, why ads are part of the system, what a streak does, and why BTCY mining is not Bitcoin mining.",
    date: "September 21, 2026",
    category: "Guides",
    content: `If you have only heard of crypto mining as rows of noisy machines in a warehouse, the idea of mining on a phone can sound suspicious. This article walks through exactly what BTCY tap-to-mine does, what it does not do, and why the design looks the way it does.

## Mining in BTCY is virtual

Mining in the Bitcoin Yay app is an in-app, AI-based, tap-to-mine system. You start a mining session and BTCY accumulates in your account over time. It is not Bitcoin (BTC) Proof-of-Work mining and it never produces BTC. It also does not run heavy computation on your device, so it should not drain your battery or heat up your phone the way a hash-solving process would.

The simplest way to think about it is as a loyalty-style system. You show up, start a session, and the app credits you with BTCY according to your mining rate.

## What a session looks like

1. **Start a session.** Open the app and tap to begin mining.
2. **Let the cycle run.** A standard session runs for a fixed cycle. The exact durations are always displayed in the app when you start.
3. **Extend if you like.** Watching a few short ads can unlock or extend a longer cycle.
4. **Return and repeat.** When a session ends, you start another. Your existing balance is never affected by a break, but you only accumulate new BTCY while a session is running.

## Why are there ads?

Ads are the part people ask about most. In BTCY, advertising is what funds the rewards pool. Ads can also unlock extended mining cycles, and verified ad engagement is what generates the advertising-revenue allocation that powers features such as the Mining Station. In other words, the ads are the economic engine behind the app being free to use, rather than an unrelated annoyance.

## How your mining rate is determined

Your rate is built from a base mining speed plus any active boosts, for example:

- a mining plan, such as one of the Gopher tiers;
- referral activity from friends who joined through your link;
- other in-app multipliers, such as campaign rewards or a temporary Nuclear Power Boost.

You can see your current and boosted rates on the mining details screen, so you always know what is applying to your account.

## Streaks and consistency

Missing a day does not erase anything you have already earned. It simply means you stop accumulating new BTCY until you start another session. Mining regularly, and keeping a streak, is the way to make the most of your rate over time.

## Verified and unverified balance

Some earnings depend on verified ad engagement, so they show up first as unverified, or pending, balance. Once they are confirmed they move into your verified balance, which is fully usable. If a number looks different from what you expected, check whether part of it is still pending.

## Common misunderstandings

- **"It mines real Bitcoin."** It does not. BTCY mining generates BTCY only.
- **"It will wreck my phone."** It is a virtual, app-based process and does not consume your device's resources the way traditional mining does.
- **"I have to pay to take part."** You do not. Paid plans exist, but free mining is fully supported.
- **"It is guaranteed income."** Nothing here is a guarantee. BTCY is an in-app utility token, and nothing in the app is financial advice.

## Getting the most from it

Start a session each day, extend it with ads when it suits you, keep an eye on your boosts, and review the mining details screen now and then. If you want to go deeper, read our guide to [mining plans](/blogs/mining-plans-gophers-explained), or browse the [FAQ](/faq) for answers to specific questions.`,
  },
  {
    slug: "mining-plans-gophers-explained",
    title: "Mining Plans Explained: Snatch, Electric, Turbo and Nuclear Gophers",
    description:
      "What the optional Bitcoin Yay mining plans (Gophers) are, how the four tiers differ, what they are not, and how to decide whether you need one.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Bitcoin Yay is free to use, but the app also offers optional mining plans, called Mining Gophers. This guide explains what they are, how the four tiers relate to each other, and how to think about whether one makes sense for you.

## What is a Mining Gopher plan?

Mining Gophers are optional subscription tiers named Snatch, Electric, Turbo and Nuclear. Each one increases your in-app virtual mining speed and unlocks additional utilities. Higher tiers give a larger boost to your BTCY generation capacity.

The key word is optional. You can mine, earn rewards, join airdrops and refer friends without ever subscribing to a plan.

## The four tiers at a glance

- **Snatch** (the first tier)
- **Electric**
- **Turbo**
- **Nuclear** (the highest tier, with the strongest boost)

Each step provides a progressively higher mining-speed multiplier and more in-app features. We deliberately do not quote prices or exact multipliers here because they can change. The current values are always shown on the plans screen in the app before you commit to anything.

## What a plan is not

This is the most important section of the article, so it is worth being direct.

Mining plans are **not** investment contracts, securities or profit-generating instruments. They do not promise any return. They only enhance your participation inside the BTCY ecosystem by increasing virtual mining speed and access to in-app features. Nothing in the app is financial advice, and you should never spend money on a plan that you cannot comfortably afford to lose.

## What is a Nuclear Power Boost?

A Nuclear Power Boost is different from a subscription. It is a temporary activation of the highest-tier mining power, often granted as a campaign reward. While it is active, it accelerates your virtual mining output for the length of the boost. When the boost ends, your rate returns to whatever your normal plan gives you.

## Changing or cancelling a plan

You can upgrade, change or cancel your plan from the subscription section. Changes take effect according to the terms shown at checkout, so read that screen before you confirm.

## How to decide whether you need one

Ask yourself a few honest questions:

1. **Am I already mining regularly?** A plan boosts a rate, so it is only useful if you are actually running sessions.
2. **Do I value the extra utilities?** Some people want the additional features as much as the speed.
3. **Have I tried the free experience first?** Starting free lets you understand the app before spending anything.
4. **Can I afford it without stress?** If the answer is no, skip it. Free participation remains fully available.

## Where plans fit in the bigger picture

Plans are one of several ways to influence your mining rate. Referral activity and campaign rewards also contribute, and you can read about the referral side in our guide to the [referral program and Mining Station](/blogs/btcy-referral-program-and-mining-station). For the basics of how sessions work, see [how BTCY tap-to-mine works](/blogs/how-btcy-tap-to-mine-works).`,
  },
  {
    slug: "btcy-referral-program-and-mining-station",
    title: "The BTCY Referral Program and Mining Station, Step by Step",
    description:
      "How referrals work in Bitcoin Yay, what counts as a verified referral, and how reaching 50 verified referrals unlocks your own Mining Station.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Bitcoin Yay grows largely through people inviting people they know. This guide explains how the referral program works, what makes a referral count, and how it leads to the Ambassador Program and the Mining Station.

## How referrals work

Every account has a unique referral link and code. When a new user signs up through your link and becomes active, they count as one of your verified referrals. Your link and QR code are available in the Referrals section of both the app and the website, and you can share them directly through WhatsApp, Telegram and other channels.

## What counts as "verified"?

A verified referral is a real, active person who signed up with your link. Duplicate, fake or fraudulent accounts do not count, and anti-fraud checks run on referrals to keep the program fair for everyone. It is much better to invite a handful of genuinely interested friends than to chase large numbers of empty sign-ups that will not be counted.

## What referrals can earn you

Referrals can:

- boost your mining rate;
- earn you referral bonuses;
- and, once you reach the required milestone, unlock access to the Ambassador Program and the Mining Station.

Active referrals also drive your ongoing earnings, so a referral who keeps mining is worth more than one who signs up and never returns.

## The Ambassador Program

Ambassadors are community builders who actively grow the BTCY network. Reaching ambassador status unlocks additional benefits and is part of the path toward operating a Mining Station.

## What is the Mining Station?

The Mining Station is a partner dashboard that lets you build and manage your own community of BTCY miners. Inside it you can track active miners, view analytics, communicate with your network, and earn an advertising-revenue allocation generated by your station.

Mining Stations are available to users with at least 50 verified referrals. Once you reach 50, you can activate your own station and start growing your mining network.

## What you will find inside the dashboard

- **Overview.** A summary of your station's performance.
- **Miners.** A list of the miners in your network.
- **Referrals.** The people who joined through you.
- **Earnings.** A breakdown of what your station has generated.
- **Withdrawals.** Where you manage your available balance.

## How station earnings are calculated

Earnings come from a share of the verified advertising revenue generated by your active miners. Your dashboard shows lifetime earnings, current-month earnings, pending (unverified) amounts and your available withdrawal balance. Pending amounts depend on ad engagement being verified, so they can take time to become available.

## Tips for building a healthy network

1. **Be honest about what BTCY is.** Explain that it is a free, in-app mining experience and not a guaranteed income. Overpromising damages trust and can breach the program's rules.
2. **Help newcomers get started.** People who understand the app keep mining.
3. **Stay active yourself.** A leader who mines and engages sets the example.
4. **Follow the rules.** Fraudulent or duplicated accounts are filtered out and can put your standing at risk.

## A note on expectations

Earnings depend on real, verified activity, and nothing here is a guarantee. The referral program and Mining Station are in-app utilities, not investment products, and nothing on this page is financial advice.

For more detail, visit the [FAQ](/faq) or read about [how mining sessions work](/blogs/how-btcy-tap-to-mine-works).`,
  },
  {
    slug: "btcy-nodes-explained",
    title: "Bitcoin Yay Nodes Explained: Seeder, Sentinel, Guardian and Validator",
    description:
      "What a Bitcoin Yay node is, why BTCY uses a lightweight consensus instead of Proof-of-Work, and how the four participation levels differ.",
    date: "September 21, 2026",
    category: "Technology",
    content: `Blockchains need computers to check that transactions are valid and to keep a shared record. In many networks these computers are called nodes. This article explains what nodes are in the Bitcoin Yay ecosystem and why running one does not require special equipment.

## What is a node?

A node is a piece of software running on a computer that helps validate transactions and secure the network. Each node holds a copy of information about the chain and takes part in agreeing on what is valid. The more independent nodes there are, the harder it is for any single party to interfere.

## Why BTCY does not use Proof-of-Work

Bitcoin's Proof-of-Work consensus makes participants compete by burning large amounts of computing power. That is what makes it secure, but it is also why it consumes so much energy and why regular users cannot take part.

Bitcoin Yay nodes use a lightweight, trust-based consensus instead. The practical consequence is that ordinary laptops and desktops can support it. You do not need mining hardware or deep technical skill: you install the node software on your computer and you become part of the network.

## Who can run a node?

Anyone with a personal computer can take part. Blockchain Nodes run on laptops and desktops, unlike the mobile mining experience, which lives in the phone app.

## The four participation levels

There are four levels of participation, each with a different role and contribution to the network:

- **Seeder**
- **Sentinel**
- **Guardian**
- **Validator**

Levels are listed from the entry level up to the most involved one, and each contributes to the network in a different way. The exact requirements and responsibilities of each level are described on the nodes page and in the whitepaper, so check there for current details before you choose a level.

## Nodes versus tap-to-mine

These are two different ways to take part, and it helps not to confuse them:

| | Tap-to-mine | Blockchain Node |
|---|---|---|
| Runs on | Your phone | A laptop or desktop |
| Purpose | Grow a BTCY balance through in-app sessions | Help validate transactions and secure the network |
| Skill needed | None | Basic comfort installing software |

You can do one, the other, or both.

## Practical tips before you install

1. **Download only from official sources.** Use links from the official Bitcoin Yay website or app. Fake node installers are a common way scammers target crypto users.
2. **Keep your computer updated.** A node is only as secure as the machine it runs on.
3. **Protect your account.** Use a strong, unique password and never share login or recovery details.
4. **Read the current requirements.** Details can change as the network develops.

## The bigger picture

Nodes are one of the ways the community, rather than a single company, helps keep the network running. If you are curious about the wider project, the [whitepaper](/whitepaper) covers the design in depth, and our [beginner's guide](/blogs/what-is-bitcoin-yay-btcy) explains how nodes fit alongside the rest of the ecosystem.

Nothing in this article is financial advice, and participation in the network does not guarantee any return.`,
  },
  {
    slug: "btcy-account-security-checklist",
    title: "A Practical Security Checklist for Your BTCY Account",
    description:
      "Simple, effective steps to keep your Bitcoin Yay account and wallet safe: strong passwords, phishing awareness, safe withdrawals and what to do if something goes wrong.",
    date: "September 21, 2026",
    category: "Security",
    content: `Whenever there is a balance attached to an account, there are people who want to get into it. The good news is that a handful of habits stop the large majority of account takeovers. This checklist is written for Bitcoin Yay users, but most of it applies to any crypto account.

## 1. Use a strong, unique password

Use a long password that you do not use anywhere else. Reusing passwords is the most common way accounts are compromised: a breach at some unrelated website leaks your password, and attackers try it everywhere. A password manager makes unique passwords easy.

## 2. Protect your email

Your email is the key to your account, because password resets are sent there. If someone takes over your email, they can reset everything else. Give your email account a strong password of its own and turn on any extra verification options it offers.

## 3. Turn on available verification options

Enable any additional verification that is offered in your account settings. Extra verification steps mean a stolen password alone is not enough.

## 4. Never share your login or recovery details

The Bitcoin Yay team will never ask for your password. Anyone who does, whether on social media, in a private message, in a group chat or over the phone, is trying to scam you. This includes people pretending to be support staff, admins or ambassadors.

## 5. Learn to spot phishing

Phishing is the most common attack in crypto. Watch for:

- **Urgency.** "Your account will be closed in one hour" is designed to stop you thinking.
- **Too-good-to-be-true offers.** Free giveaways that ask you to send tokens first are scams.
- **Lookalike addresses.** Check website addresses and email senders carefully. Type the address yourself or use the official app rather than clicking links in messages.
- **Unofficial apps and node installers.** Download only from the official website, the App Store or Google Play.

## 6. Be careful with withdrawals

When you withdraw, you choose a method, enter an amount and, for external networks, provide a destination address. A wrong address can mean funds that cannot be recovered.

1. Copy the address from your own wallet rather than retyping it.
2. Check the first and last characters after pasting.
3. Confirm you are using the correct network for that address.
4. Consider a small test amount first for larger transfers.

You can follow each request's status, whether pending, completed or rejected, in your withdrawal history.

## 7. Understand pending balances

Earnings that depend on verified ad engagement show as unverified until they are confirmed. This is normal and not a sign that anything is wrong. Be wary of anyone who claims they can "unlock" or "speed up" pending balances for a fee.

## 8. Keep your devices updated

Install operating system and app updates. Avoid logging in on shared or public computers, and be cautious about public Wi-Fi for anything sensitive.

## 9. Know how to reset your password

If you forget it, use the "Forgot password" option on the login screen, enter your email and follow the reset link. If you get a reset email you did not request, do not click it, and consider changing your email password too.

## 10. What to do if something goes wrong

1. Reset your password immediately, using the official login screen.
2. Secure your email account.
3. Contact support through the official [support](/support) page and describe what happened.
4. Do not send money to anyone who offers to "recover" your funds. Recovery scams target victims of earlier scams.

## Data and privacy

You can request account or data deletion through the privacy options in the app or on the website. The data-deletion page explains the process and what is removed. You can read how we handle personal information in our [privacy policy](/privacy-policy).

## Final thought

Security is a set of small habits rather than one big step. Do the first four items on this list today and you will already be much harder to attack. For more answers, see the [FAQ](/faq) or the [Safety Center](/safety-center).`,
  },
  {
    slug: "btcy-airdrops-and-rewards-guide",
    title: "BTCY Airdrops and Reward Tasks: How to Take Part Safely",
    description:
      "How Bitcoin Yay airdrops and reward tasks work, how to qualify, when rewards are distributed, and how to avoid airdrop scams.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Airdrops and reward tasks are two of the friendliest ways to earn extra in the Bitcoin Yay ecosystem, and also two of the most common things scammers imitate. This guide explains how the real ones work and how to protect yourself.

## What is an airdrop?

An airdrop is a time-limited campaign in which eligible users can win BTCY or other rewards. Examples include a Loyalty Airdrop for active miners and a Social Media Airdrop for people who post about Bitcoin Yay.

## How to qualify

Each campaign lists its own rules. Typical requirements include:

- being an active miner;
- creating a post and tagging the official account;
- registering before a deadline.

Follow the steps shown on the airdrop card or page for that specific campaign. Rules differ from one airdrop to the next, so never assume that the requirements from a previous campaign still apply.

## Understanding the dates

Each airdrop shows an "Ends" date and a "Distribution" date. The campaign closes on the first date, winners are selected afterwards, and rewards are distributed on the second. Rewards do not arrive the moment you finish a task, so a gap is normal.

## How you find out if you won

Winners are notified in the app and may also be announced through official channels such as Telegram. Keep notifications turned on so you do not miss a message, and check the official channels rather than relying on someone forwarding you a screenshot.

## Reward tasks

Beyond mining, the app offers reward tasks, such as following social channels or sharing posts. The process is simple:

1. Open the Rewards section.
2. Complete the listed action.
3. Submit any required proof, and tap claim.
4. Wait for verification, since some rewards, such as screenshot submissions, are checked before they are credited.

## Why a submission might be rejected

Common reasons include an unclear screenshot, an account that does not match, or a task that was not fully completed. If yours is rejected, re-read the task instructions carefully and submit a clearer, valid proof.

## How to spot airdrop scams

Because airdrops involve free tokens, they attract fraud. Treat all of these as red flags:

- **You are asked to send tokens first.** A real airdrop never requires you to send funds to receive funds.
- **You are asked for your password or recovery details.** The team will never ask for these.
- **The message came from a stranger.** Unsolicited direct messages promising winnings are almost always scams.
- **The link looks slightly wrong.** Use the official app or website to reach campaigns.
- **There is pressure to act now.** Genuine campaigns state clear end and distribution dates.

When in doubt, do not click. Open the app directly and see whether the campaign is listed there.

## Sharing responsibly

Social-media campaigns ask you to post about Bitcoin Yay. Be truthful when you do. Do not claim guaranteed profits or income, since BTCY is an in-app utility token and nothing in the ecosystem is financial advice. Honest posts protect both you and the community.

## Making the most of campaigns

1. Mine regularly, since activity is often what makes you eligible.
2. Read each campaign's rules and dates before you start.
3. Keep proof, such as screenshots, organised in case it is needed.
4. Check official channels for announcements.

For related reading, see our [security checklist](/blogs/btcy-account-security-checklist) and the [FAQ](/faq).`,
  },
  {
    slug: "btcy-vs-bitcoin-key-differences",
    title: "BTCY vs Bitcoin (BTC): Key Differences Every Newcomer Should Know",
    description:
      "BTCY and Bitcoin share part of a name but work very differently. Compare how each is created, secured and used, and avoid the most common mix-ups.",
    date: "September 21, 2026",
    category: "Education",
    content: `The name Bitcoin Yay leads many newcomers to assume it is a version of Bitcoin, or a way to get Bitcoin. It is neither. This article sets the two side by side so you know exactly what each one is.

## The short version

Bitcoin (BTC) is a decentralised digital currency secured by Proof-of-Work mining. BTCY is the token of the Bitcoin Yay ecosystem, earned mainly through an in-app, tap-to-mine experience and used inside that ecosystem. They are separate assets on separate systems.

## How each one is created

**Bitcoin** is created by miners who run specialised, energy-intensive hardware. They compete to add blocks to the chain, and the winner is rewarded with new BTC.

**BTCY** is generated through the Bitcoin Yay app. Mining is virtual and app-based: you start a session and BTCY accumulates in your account. It does not use your device's resources and it does not produce BTC.

## How each one is secured

Bitcoin relies on Proof-of-Work, which is secure but consumes large amounts of energy. Bitcoin Yay nodes use a lightweight, trust-based consensus, so ordinary laptops and desktops can take part. You can read more in our guide to [Bitcoin Yay nodes](/blogs/btcy-nodes-explained).

## Who can take part

Serious Bitcoin mining today usually needs specialised machines and cheap electricity. Taking part in BTCY mining needs only a phone and a free account.

## Where each one lives

Bitcoin can be held in wallets and on exchanges around the world. Your BTCY is held in your account wallet within the Bitcoin Yay and Indexx.ai ecosystem, where you can see your balance, transaction history and transfers.

## Side-by-side summary

| | Bitcoin (BTC) | BTCY |
|---|---|---|
| How it is earned | Proof-of-Work mining | In-app, tap-to-mine sessions |
| Hardware needed | Specialised machines | A phone |
| Energy use | High | Light |
| Ecosystem | The Bitcoin network | Bitcoin Yay, powered by Indexx.ai |

## Common misunderstandings

- **"Mining BTCY gives me Bitcoin."** It does not. It generates BTCY only.
- **"BTCY is the same as BTC."** They are different assets with different rules.
- **"BTCY is an investment product."** BTCY and its plans are in-app utilities. They are not investment contracts, securities or profit-generating instruments.

## Should you care about the difference?

Yes. Knowing what you hold and how it works protects you from scams that trade on the confusion, such as offers to "convert your BTCY to Bitcoin" through unofficial channels. Use only the official app and website for any conversion, buying or selling.

Nothing here is financial advice. To learn more, start with our [beginner's guide](/blogs/what-is-bitcoin-yay-btcy) or the [FAQ](/faq).`,
  },
  {
    slug: "how-to-buy-and-sell-btcy",
    title: "How to Buy and Sell BTCY: A Step-by-Step Overview",
    description:
      "A practical overview of the buy and sell flows for BTCY, what to check before you confirm, and why availability and fees can differ by region.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Most people begin by mining BTCY, but you can also buy it or convert your balance through the platform. This guide explains the general flow and the checks worth making before you confirm anything.

## Buying BTCY

You buy BTCY through the purchase flow on the website or in the app, using the payment methods supported for your region.

1. **Sign in** to your Bitcoin Yay account.
2. **Open the buy flow** and choose how much you want.
3. **Pick a payment method.** Supported methods can include cards and other processors. The exact options depend on your region and are shown at the payment step.
4. **Review the summary.** Any applicable network or processing fees are displayed before you confirm.
5. **Confirm** and wait for the transaction to complete. Your order then appears in your history.

## Selling BTCY

The Sell flow converts your BTCY balance. The app walks you through the amount, the method and a confirmation step. Availability of selling can depend on your region and on the current platform status, so the option may not always be open.

## What to check before you confirm

- **The amount and fees.** Read the confirmation screen for the exact figures.
- **Your region.** Buying, selling and exchange functions can vary by country because of local regulations. The app applies restrictions automatically based on your location.
- **Verified vs unverified balance.** Verified balance is fully confirmed and usable. Unverified, or pending, balance is still being validated, for example earnings that depend on verified ad engagement.
- **That you are on the official site.** Type the address yourself or use the official app. Scam sites copy the look of real ones.

## Keep records

Your order history and wallet transaction history show what you bought, sold and transferred. Keep an eye on them, and save receipts if you need them for tax purposes. Tax rules differ by country, so check the rules where you live.

## Risks to understand

Crypto assets can lose value, and you should only put in what you can afford to lose. BTCY is an in-app utility token, not an investment product, and nothing in the app or on this website is financial advice.

## If something looks wrong

If a payment fails, an amount looks different from what you expected, or a balance is missing, check your order history first and then contact the [support](/support) page. Never share your password with anyone claiming to help, and be cautious of anyone who contacts you first. Our [security checklist](/blogs/btcy-account-security-checklist) covers this in more detail.

## Related reading

See [how withdrawals work](/blogs/btcy-withdrawals-guide) for taking funds out of the platform, and the [FAQ](/faq) for short answers to common questions.`,
  },
  {
    slug: "btcy-withdrawals-guide",
    title: "BTCY Withdrawals: How They Work and How to Avoid Mistakes",
    description:
      "How to request a withdrawal in Bitcoin Yay, what the statuses mean, why there is a minimum, and the checks that prevent costly address mistakes.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Withdrawing is the moment when small mistakes become expensive. This guide walks through how withdrawals work in Bitcoin Yay and how to avoid the errors that cause most problems.

## The basic flow

From the Withdrawals area:

1. **Choose a withdrawal method.** The supported methods are listed in the form, for example a BTCY wallet or stablecoin networks.
2. **Enter the amount.**
3. **Provide a destination** where one is required. For external-chain payouts you are asked for your deposit address.
4. **Submit the request.**

Requests are reviewed and processed, then reflected in your withdrawal history.

## The minimum amount

A minimum withdrawal applies. The form stops you from submitting below it, and the current minimum is displayed on the withdrawal screen. We do not quote the number here because it can change.

## Understanding statuses

Every request has a status in your withdrawal history:

- **Pending.** Submitted and awaiting review or processing.
- **Completed.** Processed and sent.
- **Rejected.** Not processed. The history entry shows the outcome so you can correct the problem and try again.

Withdrawals are reviewed and typically processed within a short window, but timing can vary, so check the history rather than resubmitting.

## Avoiding address mistakes

Blockchain transfers cannot normally be reversed, so an incorrect address can mean lost funds.

1. **Copy and paste** the address from your own wallet. Do not retype it.
2. **Check the beginning and end** of the pasted address.
3. **Match the network.** Sending on the wrong network is one of the most common ways funds go missing.
4. **Try a small test first** when the amount is large.

## Balances that are not yet available

Only your available balance can be withdrawn. Pending, or unverified, amounts must be confirmed first. Anyone offering to release pending balances for a fee is running a scam.

## Mining Station withdrawals

If you operate a Mining Station, your dashboard has its own Earnings and Withdrawals sections showing lifetime earnings, current-month earnings, pending amounts and your available withdrawal balance. See our guide to the [referral program and Mining Station](/blogs/btcy-referral-program-and-mining-station).

## Staying safe

Use a strong, unique password, protect your email and never share login details. Support will never ask for your password. Read the full [security checklist](/blogs/btcy-account-security-checklist).

Nothing here is financial advice. Availability of withdrawal methods can depend on your region.`,
  },
  {
    slug: "btcy-wallet-and-balances-explained",
    title: "Your BTCY Wallet Explained: Verified, Pending and Transfers",
    description:
      "Understand where your BTCY is stored, the difference between verified and unverified balance, how BTCY Alchemy fits in, and how transfers work.",
    date: "September 21, 2026",
    category: "Guides",
    content: `Your wallet is where everything you earn shows up, so it pays to understand what the numbers mean. This guide explains the main parts of the Bitcoin Yay wallet.

## Where is my BTCY stored?

Your BTCY is held in your account wallet within the Bitcoin Yay and Indexx.ai ecosystem. From the wallet section you can view balances, transaction history and transfers. Because it is tied to your account, the same balance is visible on the mobile app and on the website.

## Verified vs unverified balance

This is the distinction that confuses people most.

- **Verified balance** is fully confirmed and usable.
- **Unverified (pending) balance** is still being validated. A common example is earnings that depend on verified ad engagement. It becomes available once it is confirmed.

If your total looks larger than what you can spend, part of it is probably pending. That is normal.

## Reading your transaction history

The history lists the movements on your account, such as mining credits, purchases, transfers and withdrawals. Use it as your first stop when something looks unexpected. It is also useful for your own records.

## What is BTCY Alchemy?

BTCY Alchemy is an in-app feature for converting and claiming tokens within the ecosystem. The Alchemy flow guides you through processing and claiming step by step, so follow the on-screen instructions rather than any third-party advice.

## Transfers

Transfers to another user within the ecosystem are supported where enabled. Use the transfer option in your wallet and follow the steps and any limits shown. Double-check the recipient before you confirm, since transfers usually cannot be undone.

## Keeping your wallet safe

- Use a strong, unique password.
- Protect your email, because it controls password resets.
- Never share your login details. The team will never ask for them.
- Use only the official app and website.

There is more in our [security checklist](/blogs/btcy-account-security-checklist).

## Related guides

Learn [how mining works](/blogs/how-btcy-tap-to-mine-works), see [how withdrawals work](/blogs/btcy-withdrawals-guide), or browse the [FAQ](/faq). Nothing in this article is financial advice.`,
  },
  {
    slug: "btcy-troubleshooting-common-issues",
    title: "BTCY Troubleshooting: Fixing the Most Common Issues",
    description:
      "Quick fixes for common Bitcoin Yay problems: mining not accumulating, a missing balance, rejected rewards, login trouble and delayed withdrawals.",
    date: "September 21, 2026",
    category: "Support",
    content: `Most problems in the app have simple explanations. Work through the relevant section below before contacting support, and you will often solve it in a couple of minutes.

## My mining balance is not growing

Check whether a session is running. You only accumulate new BTCY while a session is active. If your last session ended, start a new one. Also open the mining details screen to see your current and boosted rates.

## My balance looks lower than expected

Part of it may be pending. Verified balance is fully usable, while unverified balance, such as earnings that depend on verified ad engagement, needs confirmation first. Look at the breakdown in your wallet before assuming anything is missing.

## My reward was rejected

Common reasons are an unclear screenshot, an account that does not match, or a task that was not completed as described. Re-read the task instructions and submit a clear, valid proof.

## I did not win an airdrop

Each campaign has an "Ends" date and a "Distribution" date, and winners are selected after it closes. Check in-app notifications and the official channels. See our [airdrops guide](/blogs/btcy-airdrops-and-rewards-guide).

## I cannot log in

Use "Forgot password" on the login screen, enter your email and follow the reset link. If no email arrives, check spam and confirm you are using the address you registered with. Treat any reset email you did not request as suspicious.

## My withdrawal is still pending

Withdrawals are reviewed and typically processed within a short window. Check the status in your withdrawal history rather than submitting again. A rejected request shows the outcome so you can fix it. See the [withdrawals guide](/blogs/btcy-withdrawals-guide).

## A feature is not available to me

Some functions, such as buying, selling and exchange, can vary by region because of local regulations, and the app applies restrictions based on your location.

## The app language is wrong

You can switch the language from your account or profile section. Bitcoin Yay supports several languages, including English, Chinese, Spanish and French.

## When to contact support

If the steps above do not help, reach out through the official [support](/support) page. Include what you did, what you expected and what happened, and add screenshots. Never send your password to anyone, and ignore anyone who contacts you offering to "fix" your account for a fee.

More answers are in the [FAQ](/faq) and our [security checklist](/blogs/btcy-account-security-checklist).`,
  },
  {
    slug: "responsible-participation-in-crypto-communities",
    title: "Taking Part in a Crypto Community Responsibly",
    description:
      "Sensible habits for anyone using or promoting crypto apps: manage risk, verify claims, avoid hype, and understand that utility tokens are not guaranteed income.",
    date: "September 21, 2026",
    category: "Education",
    content: `Crypto attracts enthusiasm and, unfortunately, a great deal of hype. Whether you are a casual user of Bitcoin Yay or a community builder, a few habits will keep you safer and more credible.

## Understand what you are using

BTCY is an in-app utility token. Its associated plans are designed to enhance participation in the ecosystem, and they are not investment contracts, securities or profit-generating instruments. Being clear about that from the start helps you set realistic expectations.

## Only risk what you can afford to lose

Digital assets can lose value, and features can change. Do not spend money you need for rent, food or emergencies. Free participation is available, so there is no need to pay for anything to get started.

## Verify claims before you believe or share them

- **Check the source.** Confirm announcements on the official website, app and channels.
- **Be sceptical of guarantees.** Nobody can guarantee returns. Claims of guaranteed daily income are a warning sign.
- **Watch for impersonators.** Fake admins and support accounts are common. Support will never ask for your password.

## If you promote Bitcoin Yay

Referral and social campaigns reward people for spreading the word, and that comes with responsibility.

1. **Be truthful.** Explain that mining is virtual and in-app, and that it does not produce Bitcoin.
2. **Never promise income.** Describe the features, not imagined profits.
3. **Disclose the referral link.** Be open that you may benefit from sign-ups.
4. **Do not use fake accounts.** Only real, active users count as verified referrals, and anti-fraud checks apply.

## Protect other people

If a friend is about to send money to a stranger, or click a suspicious link, speak up. Share the basics from our [security checklist](/blogs/btcy-account-security-checklist), especially never sharing passwords and always using official channels.

## Protect your own information

Use a strong, unique password and keep your email secure. You can request account or data deletion through the privacy options, and our [privacy policy](/privacy-policy) explains how personal information is handled.

## Keep learning

Read the [whitepaper](/whitepaper), the [FAQ](/faq) and the [Terms of Use](/term-of-service). The more you know, the harder you are to mislead.

Nothing in this article is financial advice.`,
  },
];

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);
