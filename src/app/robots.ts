import type { MetadataRoute } from "next";

const SITE = "https://www.bitcoinyay.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/order-history", "/coming-soon"] }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
