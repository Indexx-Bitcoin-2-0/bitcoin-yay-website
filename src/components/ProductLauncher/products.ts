// Products shown in the Zodiac launcher (same order as the home page).
import captainJackLogo from "@/assets/launcher/captainJackLogo.png";
import bitcoinYayIconDark from "@/assets/launcher/bitcoinyayLogo.webp";
import cryptoTreasuryIconDark from "@/assets/launcher/CryptoTreasuryLogo.webp";
import emmmIconDark from "@/assets/launcher/EmmmLogo.webp";
import exchangeIconDark from "@/assets/launcher/ExchangeLogo.webp";
import fantasyLottoLogo from "@/assets/launcher/fantasyLottoLogo.png";
import indexxPayLogo from "@/assets/launcher/indexxPayLogo.png";
import indexxWalletLogo from "@/assets/launcher/indexxWalletLogo.png";
import jacksAiLogo from "@/assets/launcher/jacksAiLogo.png";
import reHumanLabLogo from "@/assets/launcher/reHumanLabLogo.png";
import reHumanLabLogoDark from "@/assets/launcher/reHumanLabLogoDark.png";
import shoperPalLogo from "@/assets/launcher/shoperPalLogo.png";
import usdxxIconDark from "@/assets/launcher/UsdxxLogo.webp";
import wallstreetIconDark from "@/assets/launcher/wallstreetLogo.webp";
import xTokensIconDark from "@/assets/launcher/XCryptoLogo.webp";
import xxEmailLogo from "@/assets/launcher/xxEmailLogo.png";
import yaysAppIconDark from "@/assets/launcher/YaysAppLogo.webp";

// Next gives static imports as objects; the launcher markup wants plain URLs.
const u = (i: { src: string }) => i.src;

// Same URLs the indexx welcome page uses in production.
const baseBitcoinYayURL = "https://bitcoinyay.com";
const baseNewCEXURL = "https://cex.indexx.ai/update/home";

export type LauncherProduct = {
  id: string;
  name: string;
  url: () => string;
  dark: string;
  light: string;
  /** Extra CSS filter for the light-mode icon (e.g. invert a white logo). */
  lightFilter?: string;
};

export const LAUNCHER_PRODUCTS: LauncherProduct[] = [
  { id: "bitcoin-yay", name: "Bitcoin Yay", url: () => baseBitcoinYayURL, dark: u(bitcoinYayIconDark), light: u(bitcoinYayIconDark) },
  { id: "captain-jack", name: "Captain Jack", url: () => "http://jacksai.si/", dark: u(captainJackLogo), light: u(captainJackLogo) },
  { id: "crypto-treasury", name: "Crypto Treasury", url: () => "https://cex.indexx.ai/crypto-treasury", dark: u(cryptoTreasuryIconDark), light: u(cryptoTreasuryIconDark) },
  { id: "emmm", name: "Eeny Meeny Miny Moe", url: () => "https://eenymeenyminymoe.io/", dark: u(emmmIconDark), light: u(emmmIconDark) },
  { id: "exchange", name: "Exchange", url: () => baseNewCEXURL, dark: u(exchangeIconDark), light: u(exchangeIconDark) },
  { id: "fantasy-lotto", name: "Fantasy Lotto", url: () => "https://lotto.indexx.ai/", dark: u(fantasyLottoLogo), light: u(fantasyLottoLogo) },
  { id: "indexx-pay", name: "Indexx Pay", url: () => "https://pay.indexx.ai/", dark: u(indexxPayLogo), light: u(indexxPayLogo) },
  { id: "indexx-wallet", name: "Indexx Wallet", url: () => "https://wallet.indexx.ai/", dark: u(indexxWalletLogo), light: u(indexxWalletLogo) },
  { id: "jacks-ai", name: "Jack's AI", url: () => "http://jackai.si/", dark: u(jacksAiLogo), light: u(jacksAiLogo) },
  { id: "rehumen-lab", name: "ReHumen Lab", url: () => "https://rehumenlab.com/", dark: u(reHumanLabLogoDark), light: u(reHumanLabLogo) },
  { id: "shoperpal", name: "ShoperPal", url: () => "https://test.shoperpal.com/", dark: u(shoperPalLogo), light: u(shoperPalLogo) },
  { id: "usdxx", name: "USDXX", url: () => "https://usdxxlynx.com", dark: u(usdxxIconDark), light: u(usdxxIconDark) },
  { id: "wallstreet", name: "Wallstreet", url: () => "https://wallstreet.indexx.ai/", dark: u(wallstreetIconDark), light: u(wallstreetIconDark), lightFilter: "invert(1)" },
  { id: "xtokens", name: "xTokens", url: () => "https://indexx.ai/xtokens", dark: u(xTokensIconDark), light: u(xTokensIconDark) },
  { id: "xxemail", name: "XXEmail", url: () => "https://test.xxemail.com/", dark: u(xxEmailLogo), light: u(xxEmailLogo) },
  { id: "yaysapp", name: "YaysApp", url: () => "https://web.yaysapp.com", dark: u(yaysAppIconDark), light: u(yaysAppIconDark) },
];

// Where "Explore Zodiac" in the launcher panel goes.
export const ZODIAC_URL = "https://test.indexx.ai";
