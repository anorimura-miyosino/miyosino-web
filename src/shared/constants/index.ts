// アプリケーション全体で使用する定数
export const APP_CONFIG = {
  name: 'miyosino-web',
  version: '1.0.0',
  description: 'DDD構造を意識したNext.jsアプリケーション',
} as const;

export const API_ENDPOINTS = {
  users: '/api/users',
  products: '/api/products',
} as const;

export const ROUTES = {
  home: '/',
  users: '/users',
  products: '/products',
} as const;
