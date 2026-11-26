import type { MetadataRoute } from "next";
import { articles } from "./blogs/articles";

const SITE = "https://www.bitcoinyay.com";

const PATHS = [
  "",
  "/about",
  "/airdrop",
  "/bitcoin",
  "/bitcoin/next-billion",
  "/bitcoin-yay-nodes",
  "/blockchain",
  "/bible",
  "/bible/bitcoin-yay-wallet",
  "/bible/blockchain",
  "/bible/story",
  "/bible/tokenomics",
  "/bible/whitepaper",
  "/bible/yatoshi",
  "/btcy-index-relationship",
  "/btcy-liquidity-pool-vault",
  "/btcy-sat",
  "/btcy-token-contracts",
  "/btcy-wibs-relationship",
  "/dao",
  "/download",
  "/ecosystem/ambassador",
  "/eula",
  "/faq",
  "/blogs",
  ...articles.map((article) => `/blogs/${article.slug}`),
  "/whitepaper",
  "/roadmap",
  "/ecosystem",
  "/support",
  "/safety-center",
  "/mining",
  "/mining/electric-mining",
  "/mining/free-mining",
  "/mining/nuclear-mining",
  "/mining/power-mining",
  "/mining/power-mining-plans",
  "/mining/quantum-mining",
  "/mining/turbo-mining",
  "/quantum-mining",
  "/pricing",
  "/privacy-policy",
  "/term-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articleDates = new Map(
    articles.map((article) => [
      `/blogs/${article.slug}`,
      new Date(article.date),
    ]),
  );

  return [...new Set(PATHS)].map((path) => ({
    url: `${SITE}${path}`,
    ...(articleDates.has(path) ? { lastModified: articleDates.get(path) } : {}),
  }));
}
