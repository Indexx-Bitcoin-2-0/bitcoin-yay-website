const baseURL = "/";

const header_data = [
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
        ],
      },
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
            name: "Contact Us",
            href: "/support/#contact-us",
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: "DAO",
    mainTextMob: "DAO",
    active: false,
    href: "/coming-soon",
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore YingYang DAO",
        mainList: true,
        links: [
          {
            name: "Proposal Studio",
            href: "/coming-soon",
          },
          {
            name: "Role-Based Governance",
            href: "/coming-soon",
          },
          {
            name: "Yin Yang Grant Rounds",
            href: "/coming-soon",
          },
        ],
      },
      {
        heading: "Support",
        links: [
          {
            name: "Contact Us",
            href: "/coming-soon",
          },
        ],
      },
    ],
  },

  {
    mainTextDesktop: "WIBS",
    mainTextMob: "WIBS",
    active: false,
    href: "https://whoisbitcoinsatoshi.wtf",
    openInNewTab: true,
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore WIBS",
        mainList: true,
        links: [
          {
            name: "Who is Bitcon Satoshi",
            href: "https://whoisbitcoinsatoshi.wtf",
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
            href: "https://cex.indexx.ai/update/home?buyToken=WIBS",
            openInNewTab: true,
          },
          {
            name: "Buy Gift Cards",
            href: "https://shop.indexx.ai/?category=bitcoin-cards",
            openInNewTab: true,
          },
          {
            name: "Crypto Treasury",
            href: "https://cex.indexx.ai/smart-crypto",
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
            href: "https://whoisbitcoinsatoshi.wtf/contact-us",
            openInNewTab: true,
          },
        ],
      },
    ],
  },
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
            href: "https://cex.indexx.ai/update/home?buyToken=BTCY",
            openInNewTab: true,
          },
          {
            name: "Mine Bitcoin-Yay",
            href: "/#apple-store-download",
          },
          {
            name: "Buy Gift Card",
            href: "https://shop.indexx.ai/?category=bitcoin-cards",
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "More",
        links: [
          {
            name: "Crypto Treasury",
            href: "https://cex.indexx.ai/smart-crypto",
            openInNewTab: true,
          },
        ],
      },
    ],
  },

  {
    mainTextDesktop: "Bible",
    mainTextMob: "Bible",
    active: false,
    href: "/bible",
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Bible",
        mainList: true,
        links: [
          {
            name: "Story of BTCY",
            href: "/bible/story",
          },
          {
            name: "Whitepaper",
            href: "/bible/whitepaper",
          },
          {
            name: "Tokenomics",
            href: "/bible/tokenomics",
          },
          {
            name: "Ying Yang Blockchain",
            href: "/blockchain",
          },
          {
            name: "Ying Yang Wallet",
            href: "/bible/ying-yang-wallet",
          },
        ],
      },
      {
        heading: "Action",
        links: [
          {
            name: "Buy token",
            href: "https://cex.indexx.ai/update/home?buyToken=BTCY",
            openInNewTab: true,
          },
          {
            name: "Buy Gift Card",
            href: "https://shop.indexx.ai/?category=bitcoin-cards",
            openInNewTab: true,
          },
          {
            name: "Crypto Treasury",
            href: "https://cex.indexx.ai/smart-crypto",
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Support",
        links: [
          {
            name: "Contact Us",
            href: "/support/#contact-us",
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: "Eco",
    mainTextMob: "Eco",
    active: false,
    href: "https://indexx.ai",
    openInNewTab: true,
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: "Explore Ecosystem",
        mainList: true,
        links: [
          {
            name: "Developer",
            href: "/coming-soon",
          },
        ],
      },
      {
        heading: "indexx.ai",
        mainList: true,
        links: [
          {
            name: "Lotto",
            href: "https://lotto.indexx.ai",
            openInNewTab: true,
          },
          {
            name: "Exchange",
            href: "https://cex.indexx.ai/update/home?buyToken=INEX",
            openInNewTab: true,
          },
          {
            name: "Shop",
            href: "https://shop.indexx.ai",
            openInNewTab: true,
          },
          {
            name: "Academy",
            href: "https://academy.indexx.ai",
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Quick Links",
        links: [
          {
            name: "Sign up on Exchange",
            href: "https://indexx.ai/auth/signup-email?redirectWebsiteLink=exchange",
            openInNewTab: true,
          },
          {
            name: "Get Gift Cards",
            href: "https://shop.indexx.ai/?category=gift",
            openInNewTab: true,
          },
          {
            name: "But Ticket",
            href: "https://lotto.indexx.ai/contest?contest=crypto",
            openInNewTab: true,
          },
          {
            name: "Enroll to Academy",
            href: "https://indexx.ai/auth/signup-email?redirectWebsiteLink=academy",
            openInNewTab: true,
          },
          {
            name: "Invest with Smart Crypto",
            href: "https://cex.indexx.ai/smart-crypto",
            openInNewTab: true,
          },
          {
            name: "Invest with Smart APY",
            href: "https://cex.indexx.ai/smart-apy",
            openInNewTab: true,
          },
        ],
      },
      {
        heading: "Learn More",
        links: [
          {
            name: "About Us",
            href: "https://indexx.ai/indexx-exchange/about",
            openInNewTab: true,
          },
        ],
      },
    ],
  },
];

export default header_data;
