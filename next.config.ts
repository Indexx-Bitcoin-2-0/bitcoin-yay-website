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
      // 1. Redirect root of sales subdomain to /sale page
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'sales.bitcoinyay.com',
          },
        ],
        destination: '/sale',
        permanent: false,
      },
      // 2. OPTIONAL: Redirect all paths from sales subdomain to /sale
      // (if you want ALL URLs like sales.bitcoinyay.com/anything to go to /sale)
      {
        source: '/:path*',  // All paths
        has: [
          {
            type: 'host',
            value: 'sales.bitcoinyay.com',
          },
        ],
        destination: '/sale',
        permanent: false,
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