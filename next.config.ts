/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during production build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TypeScript type errors during production build
  },
};

export default nextConfig;
