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
  // 静的エクスポート時のRSCプリフェッチエラーを防ぐ
  experimental: {
    // RSCプリフェッチを無効化（静的エクスポートでは不要）
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
