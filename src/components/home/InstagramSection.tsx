'use client';

import { useEffect, useState } from 'react';

// Instagram埋め込み用のコンポーネント
export default function InstagramSection() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  useEffect(() => {
    // LightWidgetのスクリプトを読み込む
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      setWidgetLoaded(true);
    };
    script.onerror = () => {
      console.error('[InstagramSection] LightWidgetスクリプト読み込みエラー');
      setWidgetError(true);
    };
    document.body.appendChild(script);

    // タイムアウト設定（15秒 - 504エラーを早期検知）
    const timeoutId = setTimeout(() => {
      if (!widgetLoaded) {
        console.warn(
          '[InstagramSection] LightWidget読み込みタイムアウト (504 Gateway Timeout の可能性)'
        );
        setLoadTimeout(true);
        setWidgetError(true);
      }
    }, 15000);

    // クリーンアップ関数
    return () => {
      clearTimeout(timeoutId);
    };
  }, [widgetLoaded]);

  // iframeの読み込みエラーハンドリング
  const handleIframeLoad = () => {
    setWidgetLoaded(true);
    setWidgetError(false);
    setLoadTimeout(false);
  };

  const handleIframeError = () => {
    console.error(
      '[InstagramSection] iframe読み込みエラー (504 Gateway Timeout)'
    );
    setWidgetError(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Instagramギャラリー
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            団地の日常やイベントの様子をInstagramで発信しています。
            <br />
            ハッシュタグ{' '}
            <span className="text-green-500 font-semibold">
              #かわつる三芳野
            </span>{' '}
            でご投稿ください。
          </p>
        </div>

        {/* LightWidget Instagram埋め込み */}
        <div className="flex justify-center">
          {widgetError || loadTimeout ? (
            // エラー時またはタイムアウト時の代替表示
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <p className="text-gray-600 mb-4">
                  Instagramウィジェットが読み込めませんでした。
                  <br />
                  下のボタンからInstagramアカウントを直接ご覧ください。
                </p>
                <a
                  href="https://www.instagram.com/kawa3_manage_provisional/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagramで見る
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* 読み込み中のインジケーター */}
              {!widgetLoaded && (
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                      Instagramウィジェットを読み込んでいます...
                    </p>
                  </div>
                </div>
              )}
              {/* LightWidget iframe */}
              <iframe
                src="https://lightwidget.com/widgets/b2ca5c6547aa5c0d84d708754dbe84d3.html"
                scrolling="no"
                allowTransparency
                className="lightwidget-widget"
                style={{
                  width: '100%',
                  border: 0,
                  overflow: 'hidden',
                  minHeight: widgetLoaded ? 'auto' : '600px',
                  display: widgetLoaded ? 'block' : 'none',
                }}
                title="Instagramギャラリー"
                allow="encrypted-media"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </>
          )}
        </div>

        {/* Instagramアカウントへのリンク */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/kawa3_manage_provisional/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagramでフォローする
          </a>
        </div>
      </div>
    </section>
  );
}
