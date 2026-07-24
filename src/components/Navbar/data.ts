import { EXTERNAL_URLS } from "@/lib/api-config";
const baseURL = "/";

const header_data = [
  {
    mainTextDesktop: "Alchemy",
    mainTextMob: "Alchemy",
    active: false,
    href: "/alchemy",
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Alchemy",
        mainList: true,
        links: [
          {
            name: "Alchemy Gateway",
            href: `/alchemy`,
          },
          {
            name: "Alchemy Trade",
            href: `/alchemy-trade`,
          },
          // {
          // name: "Alchemy Trade",
          // href: `/coming-soon`,
          // },
        ],
      },
      {
        heading: "History",
        links: [
          {
            name: "View History",
            href: "/alchemy/history",
          },
        ],
      },

      {
        heading: "Support",
        links: [
          {
            name: "FAQs",
            href: "/faq#wallet-tokens",
          },
          {
            name: "Contact Us",
            href: "/support/#contact-us",
          },
        ],
      },
    ],
  },
  // {
  //   mainTextDesktop: "Bible",
  //   mainTextMob: "Bible",
  //   active: false,
  //   href: "/bible",
  //   hasMegaDrop: true,
  //   dropDownContent: [
  //     {
  //       heading: "Explore Bible",
  //       mainList: true,
  //       links: [
  //         {
  //           name: "Story of BTCY",
  //           href: "/bible/story",
  //         },
  //         {
  //           name: "Story of Yatoshi",
  //           href: "/bible/yatoshi",
  //         },
  //         {
  //           name: "Whitepaper",
  //           href: "/bible/whitepaper",
  //         },
  //         {
  //           name: "Tokenomics",
  //           href: "/bible/tokenomics",
  //         },
  //         {
  //           name: "bitcoin-yay Blockchain",
  //           href: "/bible/blockchain",
  //         },
  //         {
  //           name: "bitcoin-yay Wallet",
  //           href: "/bible/bitcoin-yay-wallet",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "Action",
  //       links: [
  //         {
  //           name: "Buy token",
  //           href: EXTERNAL_URLS.indexx.buyBtcy,
  //           openInNewTab: true,
  //         },
  //         {
  //           name: "Buy Gift Card",
  //           href: EXTERNAL_URLS.indexx.bitcoinCards,
  //           openInNewTab: true,
  //         },
  //         {
  //           name: "Crypto Treasury",
  //           href: EXTERNAL_URLS.indexx.smartCrypto,
  //           openInNewTab: true,
  //         },
  //       ],
  //     },
  //     {
  //       heading: "Support",
  //       links: [
  //         {
  //           name: "FAQs",
  //           href: "/faq#getting-started",
  //         },
  //         {
  //           name: "Contact Us",
  //           href: "/support/#contact-us",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    mainTextDesktop: "Bitcoin",
    mainTextMob: "Bitcoin",
    active: false,
    href: "/bitcoin",
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Bitcoin",
        mainList: true,
        links: [
          {
            name: "BTCY Relationship",
            href: "/bitcoin",
          },

          {
            name: "Bitcoin for the Next Billion",
            href: "/bitcoin/next-billion",
          },
        ],
      },
      {
        heading: "Action",
        links: [
          {
            name: "Buy BTCY",
            href: EXTERNAL_URLS.indexx.buyBtcy,
            openInNewTab: true,
          },
          {
            name: "Mine Bitcoin-Yay",
            href: "/#apple-store-download",
          },
          {
            name: "Buy Gift Card",
            href: EXTERNAL_URLS.indexx.bitcoinCards,
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "More",
        links: [
          {
            name: "Crypto Treasury",
            href: EXTERNAL_URLS.indexx.smartCrypto,
            openInNewTab: true,
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: "Buy BTCY",
    mainTextMob: "Buy BTCY",
    active: false,
    href: "/quantum-mining",
    hasMegaDrop: false,
  },
  {
    mainTextDesktop: "Sell BTCY",
    mainTextMob: "Sell BTCY",
    active: false,
    href: "/sell-btcy",
    hasMegaDrop: false,
  },
  {
    mainTextDesktop: "Chains",
    mainTextMob: "Chains",
    active: false,
    href: "/blockchain",
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Chain",
        mainList: true,
        links: [
          {
            name: "bitcoin-yay Blockchain Expo",
            href: "/bible/blockchain/details",
          },
        ],
      },
      {
        heading: "CONTRACT ADDRESS",
        links: [
          {
            name: "Solana",
            href: "/btcy-token-contracts",
          },
          {
            name: "Tron",
            href: "/btcy-token-contracts",
          },
          {
            name: "Ethereum",
            href: "/btcy-token-contracts",
          },
          {
            name: "Binance",
            href: "/btcy-token-contracts",
          },
        ],
      },

      {
        heading: "Support",
        links: [
          {
            name: "FAQs",
            href: "/faq#nodes",
          },
          {
            name: "Contact Us",
            href: "/support/#contact-us",
          },
        ],
      },
      {
        heading: "Explore bitcoin-yay DAO",
        links: [
          {
            name: "Proposal Studio",
            href: "/dao",
          },
        ],
      },
    ],
  },

  // {
  //   mainTextDesktop: "DAO",
  //   mainTextMob: "DAO",
  //   active: false,
  //   href: "/dao",
  //   hasMegaDrop: true,
  //   dropDownContent: [
  //     {
  //       heading: "Explore bitcoin-yay DAO",
  //       mainList: true,
  //       links: [
  //         {
  //           name: "Proposal Studio",
  //           href: "/dao",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "Support",
  //       links: [
  //         {
  //           name: "Contact Us",
  //           href: "/support",
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    mainTextDesktop: "Eco",
    mainTextMob: "Eco",
    active: false,
    href: "/btcy-indexx-relationship",
    openInNewTab: false,
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Ecosystem",
        mainList: true,
        links: [
          {
            name: "indexx.ai",
            href: EXTERNAL_URLS.indexx.home,
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Category",
        mainList: true,
        links: [
          {
            name: "WallStreet",
            href: EXTERNAL_URLS.indexx.wallStreet,
            openInNewTab: true,
          },
          {
            name: "Lotto",
            href: "/btcy-index-relationship",
          },
          {
            name: "Exchange",
            href: "/btcy-index-relationship",
          },
          {
            name: "Shop",
            href: "/btcy-index-relationship",
          },
          {
            name: "Academy",
            href: "/btcy-index-relationship",
          },
          {
            name: "Ambassador",
            href: "/ecosystem/ambassador",
          },
        ],
      },
      {
        heading: "Quick Links",
        links: [
          {
            name: "Sign up on Exchange",
            href: EXTERNAL_URLS.indexx.exchangeSignup,
            openInNewTab: true,
          },
          {
            name: "Get Gift Cards",
            href: EXTERNAL_URLS.indexx.gifts,
            openInNewTab: true,
          },
          {
            name: "But Ticket",
            href: EXTERNAL_URLS.indexx.cryptoLottery,
            openInNewTab: true,
          },
          {
            name: "Enroll to Academy",
            href: EXTERNAL_URLS.indexx.academySignup,
            openInNewTab: true,
          },
          {
            name: "Invest with Smart Crypto",
            href: EXTERNAL_URLS.indexx.smartCrypto,
            openInNewTab: true,
          },
          {
            name: "Invest with Smart APY",
            href: EXTERNAL_URLS.indexx.smartApy,
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Learn More",
        links: [
          {
            name: "About Us",
            href: EXTERNAL_URLS.indexx.about,
            openInNewTab: true,
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: "Mining",
    mainTextMob: "Mining",
    active: false,
    href: baseURL,
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Mining",
        mainList: true,
        links: [
          {
            name: "Mobile Mining",
            href: `/#mobile-mining`,
          },
          {
            name: "Mining Station",
            href: EXTERNAL_URLS.app.miningStation,
            openInNewTab: false,
            authTokenRedirect: true,
          },
        ],
      },
      // {
      //   heading: "Choose Plans",
      //   links: [
      //     {
      //       name: "Snatch Mining",
      //       href: `/mining/free-mining`,
      //     },
      //     {
      //       name: "Power Mining",
      //       href: `/mining/power-mining`,
      //     },
      //     {
      //       name: "Quantum Mining",
      //       href: `/mining/quantum-mining`,
      //     },
      //   ],
      // },
      {
        heading: "Action",
        links: [
          {
            name: "Download App on Apple Store",
            href: "/#apple-store-download",
          },
          {
            name: "Download on Google Play",
            href: "/#google-play-download",
          },
        ],
      },
      {
        heading: "Support",
        links: [
          {
            name: "FAQs",
            href: "/faq#mining",
          },
          {
            name: "Contact Us",
            href: "/support/#contact-us",
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: "Mining Station",
    mainTextMob: "Mining Station",
    active: false,
    href: EXTERNAL_URLS.app.miningStation,
    authTokenRedirect: true,
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Mining Station",
        mainList: true,
        links: [
          {
            name: "Leaderboard",
            href: "/leaderboard",
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: "Subscription",
    mainTextMob: "Subscription",
    active: false,
    href: "/mining/power-mining",
    hasMegaDrop: false,
  },
  {
    mainTextDesktop: "WIBS",
    mainTextMob: "WIBS",
    active: false,
    href: "/btcy-wibs-relationship",
    openInNewTab: false,
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore WIBS",
        mainList: true,
        links: [
          {
            name: "Who is Bitcon Satoshi",
            href: EXTERNAL_URLS.wibs.home,
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Action",
        mainList: false,
        links: [
          {
            name: "Buy WIBS",
            href: EXTERNAL_URLS.indexx.buyWibs,
            openInNewTab: true,
          },
          {
            name: "Buy Gift Cards",
            href: EXTERNAL_URLS.indexx.bitcoinCards,
            openInNewTab: true,
          },
          {
            name: "Crypto Treasury",
            href: EXTERNAL_URLS.indexx.smartCrypto,
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Get Help",
        mainList: false,
        links: [
          {
            name: "Contact Us",
            href: EXTERNAL_URLS.wibs.contact,
            openInNewTab: true,
          },
        ],
      },
    ],
  },
];

export default header_data;
