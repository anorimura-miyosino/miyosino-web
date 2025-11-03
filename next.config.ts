import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.microcms.io',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms.io',
      },
      {
        protocol: 'https',
        hostname: '**.microcms-assets.io',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/miyosino-web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/miyosino-web' : '',
};

export default nextConfig;
