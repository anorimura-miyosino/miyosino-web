'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  checkAuthStatus,
  redirectToLogin,
  logout,
  handleAuthCallback,
} from '@/shared/utils/auth';
import { AnnouncementsSection } from '@/components/member';

// Note: metadata export is not supported in client components
// Move metadata to layout.tsx if needed

export default function MemberPage() {
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // React Strict Modeで2回実行されるのを防ぐ
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    async function verifyAuth() {
      console.log('[Member Page] Starting auth verification');

      // URLからトークンを取得してlocalStorageに保存（認証後のリダイレクト時）
      const tokenSaved = handleAuthCallback();
      console.log('[Member Page] Token saved from callback:', tokenSaved);

      // トークンが保存された場合、少し待つ
      if (tokenSaved) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      console.log('[Member Page] Checking auth status...');
      const status = await checkAuthStatus();
      console.log('[Member Page] Auth status:', status);

      if (!status.authenticated) {
        console.log('[Member Page] Not authenticated, redirecting to login');
        // 未認証の場合、ログインページへリダイレクト
        // 引数なしで呼び出すことで、現在のURL（basePathを含む）がそのまま使われる
        redirectToLogin();
        return;
      }

      console.log('[Member Page] Authenticated, showing page');
      setIsLoading(false);
    }

    verifyAuth();
  }, []);

  // ローディング中
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">認証状態を確認中...</p>
        </div>
      </div>
    );
  }

  // 認証済みの場合のみコンテンツを表示
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダーセクション */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
            <button
              onClick={() => logout()}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              ログアウト
            </button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">
                組合員専用ページ
              </h1>
            </div>
            <p className="text-blue-100 text-lg mt-4">
              かわつる三芳野団地の組合員の皆様専用のページです
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 重要なお知らせ */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-yellow-800">
                重要なお知らせ
              </h3>
              <p className="text-yellow-700 mt-2">
                このページは組合員専用のページです。個人情報の取り扱いには十分ご注意ください。
                不明な点がございましたら、管理組合事務所までお問い合わせください。
              </p>
            </div>
          </div>
        </div>

        {/* お知らせセクション */}
        <AnnouncementsSection showMoreLink={true} />

        {/* 便利なリンクセクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                グリーンウェルネス（管理規約）
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              管理規約であるグリーンウェルネスをダウンロードできます
            </p>
            <Link
              href="/member/green-wellness"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block text-center"
            >
              グリーンウェルネスを開く
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                回覧板・配布資料
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              回覧板に挟まれている資料や戸別配布されている資料をダウンロードできます
            </p>
            <Link
              href="/member/circulars"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors block text-center"
            >
              回覧板・配布資料を開く
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">会議情報</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              総会や班長会などの会議情報の参照、議事録、録音ファイルのダウンロードができます
            </p>
            <Link
              href="/member/minutes"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors block text-center"
            >
              会議情報を開く
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">各種申請</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              各種申請書の提出やダウンロードできます
            </p>
            <Link
              href="/member/applications"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors block text-center"
            >
              各種申請を開く
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                イベント情報
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              イベントの日程などを確認できます
            </p>
            <Link
              href="/member/events"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors block text-center"
            >
              イベント情報を開く
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
