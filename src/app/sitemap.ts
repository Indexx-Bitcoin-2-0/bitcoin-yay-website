import type { MetadataRoute } from "next";

const SITE = "https://www.bitcoinyay.com";

const PATHS = [
  "",
  "/about",
  "/faq",
  "/blogs",
  "/blogs/smart-crypto-empowering-investors",
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
