import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 開発時は静的エクスポートを無効化（HMRとAPIルートを有効にするため）
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
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
  // Docker環境でのホットリロード対応（開発時のみ）
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // 1秒ごとにファイル変更をチェック
        aggregateTimeout: 300, // 変更検知後300ms待ってからリロード
      };
    }
    return config;
  },
};

export default nextConfig;
