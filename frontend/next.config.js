/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Skip ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Skip TypeScript type errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true, // Optional: disable next/image optimization
  },
};

module.exports = nextConfig;
