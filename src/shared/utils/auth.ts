/**
 * 認証関連のユーティリティ関数
 *
 * Kintone OAuth 2.0認証を使用した認証状態の管理
 * localStorage方式（クロスドメインCookie問題の回避）
 */

const AUTH_API_ENDPOINT =
  process.env.NEXT_PUBLIC_AUTH_API_URL ||
  'https://miyosino-auth.anorimura-miyosino.workers.dev';

const TOKEN_KEY = 'auth_token';

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
 * URLからトークンを取得してlocalStorageに保存
 * 認証後のリダイレクト時に呼び出される
 * @returns トークンが保存された場合true、そうでない場合false
 */
export function handleAuthCallback(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    console.log('[Auth Debug] URL:', window.location.href);
    console.log('[Auth Debug] Token from URL:', token ? 'Found' : 'Not found');

    if (token) {
      // トークンをlocalStorageに保存
      localStorage.setItem(TOKEN_KEY, token);
      console.log('[Auth Debug] Token saved to localStorage');

      // 保存されたことを確認
      const savedToken = localStorage.getItem(TOKEN_KEY);
      console.log(
        '[Auth Debug] Token verification:',
        savedToken ? 'OK' : 'FAILED'
      );
      console.log('[Auth Debug] Token match:', savedToken === token);

      // URLからトークンを削除（セキュリティ対策）
      params.delete('token');
      const newUrl =
        window.location.pathname +
        (params.toString() ? '?' + params.toString() : '') +
        window.location.hash;
      window.history.replaceState({}, '', newUrl);
      console.log('[Auth Debug] URL cleaned:', newUrl);

      return true;
    }
    return false;
  } catch (error) {
    console.error('[Auth] handleAuthCallback error:', error);
    return false;
  }
}

/**
 * localStorageからトークンを取得
 */
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 認証状態を確認
 */
export async function checkAuthStatus(): Promise<AuthStatus> {
  try {
    const token = getToken();

    console.log(
      '[Auth Debug] Token from localStorage:',
      token ? 'Found' : 'Not found'
    );

    if (!token) {
      return { authenticated: false };
    }

    const response = await fetch(`${AUTH_API_ENDPOINT}/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('[Auth Debug] Verify response status:', response.status);

    if (!response.ok) {
      // トークンが無効な場合は削除
      localStorage.removeItem(TOKEN_KEY);
      return { authenticated: false };
    }

    const data = (await response.json()) as AuthStatus;
    console.log('[Auth Debug] Auth status:', data);
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
    const token = getToken();

    if (token) {
      await fetch(`${AUTH_API_ENDPOINT}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // localStorageからトークンを削除
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
  } catch (error) {
    console.error('[Auth] Logout failed:', error);
    // エラーが発生してもトークンは削除してトップページへ
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/';
  }
}

/**
 * ログインユーザー情報を取得
 */
export async function getUserInfo(): Promise<AuthUser | null> {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const response = await fetch(`${AUTH_API_ENDPOINT}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
