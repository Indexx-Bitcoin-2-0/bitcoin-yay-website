import type { MetadataRoute } from "next";
import { articles } from "./blogs/articles";

const SITE = "https://www.bitcoinyay.com";

const PATHS = [
  "",
  "/about",
  "/faq",
  "/blogs",
  "/blogs/smart-crypto-empowering-investors",
  ...articles.map((article) => `/blogs/${article.slug}`),
  "/whitepaper",
  "/roadmap",
  "/ecosystem",
  "/support",
  "/safety-center",
  "/mining",
  "/pricing",
  "/privacy-policy",
  "/term-of-service",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({ url: `${SITE}${path}`, lastModified: new Date() }));
}
