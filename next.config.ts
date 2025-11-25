/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/referral=:referralCode',
        destination: '/referral?code=:referralCode',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'play.google.com',
      },
      {
        protocol: 'https',
        hostname: 'developer.apple.com',
      },
    ],
    // When the CDN (bitcoinyay.com) already handles static assets, disable
    // Next.js image optimization so `_next/image` paths are served without
    // being rewritten. This avoids the 400 responses from `_next/image`
    // not being reachable from the CDN.
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during production build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TypeScript type errors during production build
  },
};

export default nextConfig;
