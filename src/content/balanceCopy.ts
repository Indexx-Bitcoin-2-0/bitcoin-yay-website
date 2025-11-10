export const balanceCopy = {
  utilities: {
    nuggetBody:
      "BTCY Nugget is what you earn from the free 6-hour mining sessions. Hop back in before the clock resets so your gopher keeps digging and your stash keeps rising. Upgrade to Electric, Turbo, or Nuclear Power Mining to amplify your haul and stay ahead of halving slowdowns.",
    withdrawnBody:
      "Withdrawn BTCY is the slice of your BTCY Nugget that has already passed reviews and landed in your Stellar wallet. It's the historical total you've moved out so far.",
    tokenBody:
      "BTCY Token is delivered when you buy through Quantum Mining or future Alchemy drops. Keep these tokens in your Indexx Exchange wallet for now so you lock your allocation before live trading opens up to the broader market.",
  },
  modals: {
    nugget: {
      title: "What is BTCY Nugget?",
      body: [
        "Every miner starts with free 6-hour BTCY Nugget sessions. Tap back in before the timer resets so your gopher keeps digging and your stack keeps growing.",
        "Ready for more speed? Upgrade to Electric, Turbo, or Nuclear Power Mining plans to multiply your BTCY Nugget earnings and stay ahead of the pack.",
      ],
      ctaLabel: "Explore Power Mining",
      ctaHref: "/mining/power-mining",
    },
    withdrawn: {
      title: "What is Withdrawn BTCY?",
      body: [
        "Each time you clear the withdrawal rules, that portion of your BTCY Nugget balance is minted onto Stellar. This total shows everything you've successfully moved out so far.",
        "Keep mining to rebuild your BTCY Nugget stack while withdrawals batch out to keep the BTCY economy healthy.",
      ],
      ctaLabel: "Review Withdrawal Rules",
      ctaHref: "/bible/whitepaper",
    },
    token: {
      title: "What is BTCY Token?",
      body: [
        "BTCY Token arrives when you purchase through Quantum Mining or limited Alchemy events. These are the transferable tokens built for the wider Indexx ecosystem.",
        "Park them inside Indexx Exchange today, secure your allocation, and be ready for trading once listings ignite.",
      ],
      ctaLabel: "Buy BTCY Now",
      ctaHref: "/quantum-mining",
    },
  },
} as const;

export type BalanceCopy = typeof balanceCopy;
