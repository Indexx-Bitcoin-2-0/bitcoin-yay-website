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

  async redirects() {
    return [
      {
        source: '/sale',
        has: [
          {
            type: 'host',
            value: 'bitcoinyay.com',
          },
        ],
        destination: 'https://sales.bitcoinyay.com/',
        permanent: true, // use 301 in production
      },
      {
        source: '/sale',
        has: [
          { type: 'host', value: 'www.bitcoinyay.com' },
        ],
        destination: 'https://sales.bitcoinyay.com/',
        permanent: true,
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
    // Disable Next.js image optimization so it doesn't use /_next/image
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
