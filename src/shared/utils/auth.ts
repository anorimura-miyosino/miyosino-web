/**
 * 認証関連のユーティリティ関数
 *
 * Kintone OAuth 2.0認証を使用した認証状態の管理
 */

const AUTH_API_ENDPOINT =
  process.env.NEXT_PUBLIC_AUTH_API_URL ||
  'https://miyosino-auth.anorimura-miyosino.workers.dev';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthStatus {
  authenticated: boolean;
  user?: AuthUser;
}

/**
 * 認証状態を確認
 */
export async function checkAuthStatus(): Promise<AuthStatus> {
  try {
    const response = await fetch(`${AUTH_API_ENDPOINT}/verify`, {
      credentials: 'include', // Cookieを含める
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    const data = (await response.json()) as AuthStatus;
    return data;
  } catch (error) {
    console.error('[Auth] Failed to check auth status:', error);
    return { authenticated: false };
  }
}

/**
 * ログインページへリダイレクト
 */
export function redirectToLogin(redirectUri?: string): void {
  // リダイレクト先は絶対URLである必要がある
  const currentUrl = redirectUri
    ? new URL(redirectUri, window.location.origin).toString()
    : window.location.href;

  const loginUrl = `${AUTH_API_ENDPOINT}/login?redirect_uri=${encodeURIComponent(currentUrl)}`;
  window.location.href = loginUrl;
}

/**
 * ログアウト
 */
export async function logout(): Promise<void> {
  try {
    await fetch(`${AUTH_API_ENDPOINT}/logout`, {
      credentials: 'include',
    });
    window.location.href = '/';
  } catch (error) {
    console.error('[Auth] Logout failed:', error);
    window.location.href = '/';
  }
}

/**
 * ログインユーザー情報を取得
 */
export async function getUserInfo(): Promise<AuthUser | null> {
  try {
    const response = await fetch(`${AUTH_API_ENDPOINT}/user`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const user = (await response.json()) as AuthUser;
    return user;
  } catch (error) {
    console.error('[Auth] Failed to get user info:', error);
    return null;
  }
}
