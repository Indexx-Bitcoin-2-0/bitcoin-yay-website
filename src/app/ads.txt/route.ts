import { ADSENSE_SELLER_ID } from "@/lib/ads";

/**
 * Serves /ads.txt (IAB Authorized Digital Sellers).
 *
 * Driven by NEXT_PUBLIC_ADSENSE_CLIENT so the real seller line appears
 * automatically once the AdSense account is configured. Until then it returns a
 * commented placeholder (a 200 with no seller lines, which is valid).
 *
 * Note: /app-ads.txt (for the mobile AdMob account) is a separate static file in
 * /public and is unaffected by this.
 */
export const dynamic = "force-static";

export function GET() {
  const body = ADSENSE_SELLER_ID.startsWith("pub-")
    ? `google.com, ${ADSENSE_SELLER_ID}, DIRECT, f08c47fec0942fa0\n`
    : [
        "# No web ad sellers configured yet.",
        "# Once the Google AdSense account exists, set NEXT_PUBLIC_ADSENSE_CLIENT",
        "# and this file will emit, e.g.:",
        "# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0",
        "",
      ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
