const INDEX_X_DOMAIN = "indexx.ai";
const BITCOIN_YAY_DOMAIN = "bitcoinyay.com";

export const DEFAULT_API_BASE_URL = `https://test.api.v1.${INDEX_X_DOMAIN}`;

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");

export function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const INDEX_X_URLS = {
  home: `https://${INDEX_X_DOMAIN}`,
  exchange: `https://test.cex.${INDEX_X_DOMAIN}`,
  shop: `https://shop.${INDEX_X_DOMAIN}`,
  lottery: `https://lotto.${INDEX_X_DOMAIN}`,
  academy: `https://academy.${INDEX_X_DOMAIN}`,
  wallStreet: `https://test.wallstreet.${INDEX_X_DOMAIN}`,
} as const;

const BITCOIN_YAY_URL = `https://test.${BITCOIN_YAY_DOMAIN}`;
const WIBS_URL = "https://whoisbitcoinsatoshi.wtf";
const APPLE_APP_URL =
  "https://apps.apple.com/ph/app/bitcoin-yay/id6744868017";
const GOOGLE_PLAY_APP_URL =
  "https://play.google.com/store/apps/details?id=com.bitcoin2&hl=en";
const YOUTUBE_URL = "https://www.youtube.com";
const TELEGRAM_URL = "https://t.me";
const FACEBOOK_URL = "https://www.facebook.com";
const BSC_EXPLORER_URL = "https://bscscan.com";
const CRYPTO_LOGOS_URL = "https://cryptologos.cc/logos";
const GOOGLE_TAG_MANAGER_URL = "https://www.googletagmanager.com";
const EVM_BTCY_CONTRACT = "0x22726F15677F6a569F42ea9a4de6e5e5eEd9B93b";

/**
 * Every external destination used by the application lives here so links and
 * service endpoints can be reviewed and changed without hunting through UI code.
 */
export const EXTERNAL_URLS = {
  api: {
    coinGeckoPrice: "https://api.coingecko.com/api/v3/simple/price",
  },
  app: {
    website: BITCOIN_YAY_URL,
    miningStation: `https://test.miningstation.${BITCOIN_YAY_DOMAIN}/`,
    walletOverview: `${INDEX_X_URLS.exchange}/wallet/overview`,
    kycAccount: `${INDEX_X_URLS.exchange}/indexx-exchange/account`,
  },
  stores: {
    apple: APPLE_APP_URL,
    googlePlay: GOOGLE_PLAY_APP_URL,
  },
  indexx: {
    home: INDEX_X_URLS.home,
    exchange: `${INDEX_X_URLS.exchange}/`,
    exchangeTrade: `${INDEX_X_URLS.exchange}/update/home`,
    buyBtcy: `${INDEX_X_URLS.exchange}/update/home?buyToken=BTCY`,
    buyInex: `${INDEX_X_URLS.exchange}/update/home?buyToken=INEX`,
    buyWibs: `${INDEX_X_URLS.exchange}/update/home?buyToken=WIBS`,
    shop: INDEX_X_URLS.shop,
    bitcoinCards: `${INDEX_X_URLS.shop}/?category=bitcoin-cards`,
    gifts: `${INDEX_X_URLS.shop}/?category=gift`,
    lottery: INDEX_X_URLS.lottery,
    cryptoLottery: `${INDEX_X_URLS.lottery}/contest?contest=crypto`,
    academy: INDEX_X_URLS.academy,
    smartCrypto: `${INDEX_X_URLS.exchange}/smart-crypto`,
    smartApy: `${INDEX_X_URLS.exchange}/smart-apy`,
    about: `${INDEX_X_URLS.home}/indexx-exchange/about`,
    wallStreet: INDEX_X_URLS.wallStreet,
    exchangeSignup:
      `${INDEX_X_URLS.home}/auth/signup-email?redirectWebsiteLink=exchange`,
    academySignup:
      `${INDEX_X_URLS.home}/auth/signup-email?redirectWebsiteLink=academy`,
  },
  wibs: {
    home: WIBS_URL,
    contact: `${WIBS_URL}/contact-us`,
  },
  social: {
    facebook: `${FACEBOOK_URL}/profile.php?id=61574910722200`,
    instagram: "https://www.instagram.com/bitcoin.yay/",
    telegram: `${TELEGRAM_URL}/+Cmz7QGEuxP5jY2U1`,
    x: "https://x.com/bitcoin_YAY",
    youtube: `${YOUTUBE_URL}/@BitcoinYay`,
  },
  share: {
    x: "https://twitter.com/intent/tweet",
    facebook: `${FACEBOOK_URL}/sharer/sharer.php`,
    linkedin: "https://www.linkedin.com/sharing/share-offsite/",
    whatsapp: "https://wa.me/",
    telegram: `${TELEGRAM_URL}/share/url`,
    reddit: "https://reddit.com/submit",
  },
  wallets: {
    bscRpc: "https://bsc-dataseed.binance.org/",
    bscExplorer: BSC_EXPLORER_URL,
    tronLink: "https://www.tronlink.org",
    phantom: "https://phantom.app",
    metamask: "https://metamask.io/download/",
  },
  videos: {
    freeMining: `${YOUTUBE_URL}/embed/ijFCuR8nr-E`,
    powerMining: `${YOUTUBE_URL}/embed/tuppsYWEDGI`,
    quantumMining: `${YOUTUBE_URL}/embed/bVbsQwh_GCI`,
  },
  promotion: {
    emmm: "https://test.emmm.io/",
  },
  privacy: {
    googleAnalyticsOptOut:
      "https://support.google.com/analytics/answer/181881?hl=en",
  },
  tokenContracts: {
    solanaExplorer:
      "https://explorer.solana.com/address/7RUbRcqvQ7gXNmfuxsoUoputPXT85fGzoPSu6xXi6U9p",
    tronExplorer:
      "https://tronscan.org/#/token20/TJVh7pdziZHNaEwfmBcwZN5JjuEjnN1xzB",
    ethereumExplorer:
      `https://etherscan.io/token/${EVM_BTCY_CONTRACT}`,
    bscExplorer: `${BSC_EXPLORER_URL}/token/${EVM_BTCY_CONTRACT}`,
    solanaLogo: `${CRYPTO_LOGOS_URL}/solana-sol-logo.png?v=023`,
    tronLogo: `${CRYPTO_LOGOS_URL}/tron-trx-logo.png?v=023`,
    ethereumLogo: `${CRYPTO_LOGOS_URL}/ethereum-eth-logo.png?v=023`,
    bnbLogo: `${CRYPTO_LOGOS_URL}/bnb-bnb-logo.png?v=023`,
    stellarLogo: `${CRYPTO_LOGOS_URL}/stellar-xlm-logo.png?v=023`,
  },
  analytics: {
    googleTagManagerScript: `${GOOGLE_TAG_MANAGER_URL}/gtm.js`,
    googleTagManagerFrame: `${GOOGLE_TAG_MANAGER_URL}/ns.html`,
  },
  storage: {
    ipfsGateway: "https://ipfs.io/ipfs",
  },
} as const;
