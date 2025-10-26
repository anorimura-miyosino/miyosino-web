'use client';

import { useState, useEffect } from 'react';

// Instagram投稿の型定義
interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

// Instagram埋め込み用のコンポーネント
export default function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // モックデータを直接使用（静的サイト用）
    const mockPosts: InstagramPost[] = [
      {
        id: 'mock1',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=1',
        caption: '団地の日常風景 #三芳野団地 #コミュニティ',
        permalink: 'https://www.instagram.com/p/mock1/',
        timestamp: new Date().toISOString(),
      },
      {
        id: 'mock2',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=2',
        caption: 'コミュニティイベントの様子 #三芳野団地 #イベント',
        permalink: 'https://www.instagram.com/p/mock2/',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'mock3',
        media_type: 'VIDEO',
        media_url: 'https://picsum.photos/400/400?random=3',
        thumbnail_url: 'https://picsum.photos/400/400?random=3',
        caption: '緑豊かな団地の環境 #三芳野団地 #自然',
        permalink: 'https://www.instagram.com/p/mock3/',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: 'mock4',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=4',
        caption: '子供たちの遊び場 #三芳野団地 #子育て',
        permalink: 'https://www.instagram.com/p/mock4/',
        timestamp: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: 'mock5',
        media_type: 'CAROUSEL_ALBUM',
        media_url: 'https://picsum.photos/400/400?random=5',
        caption: '団地の四季の風景 #三芳野団地 #季節',
        permalink: 'https://www.instagram.com/p/mock5/',
        timestamp: new Date(Date.now() - 345600000).toISOString(),
      },
      {
        id: 'mock6',
        media_type: 'IMAGE',
        media_url: 'https://picsum.photos/400/400?random=6',
        caption: '住人同士の交流 #三芳野団地 #コミュニティ',
        permalink: 'https://www.instagram.com/p/mock6/',
        timestamp: new Date(Date.now() - 432000000).toISOString(),
      },
    ];

    // ローディング状態をシミュレート
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Instagramギャラリー
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            団地の日常やイベントの様子をInstagramで発信中！
            <br />
            ハッシュタグ{' '}
            <span className="text-green-500 font-semibold">
              #三芳野団地
            </span>{' '}
            でご投稿ください。
          </p>
        </div>

        {/* Instagram投稿表示エリア */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // ローディング状態
            <>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </>
          ) : error ? (
            // エラー状態
            <div className="col-span-full text-center py-12">
              <div className="text-red-500 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <p className="text-sm text-gray-500">
                モックデータを表示しています
              </p>
            </div>
          ) : (
            // 投稿表示
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="aspect-square relative overflow-hidden">
                    {post.media_type === 'VIDEO' && post.thumbnail_url ? (
                      <img
                        src={post.thumbnail_url}
                        alt={post.caption || 'Instagram投稿'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={post.media_url}
                        alt={post.caption || 'Instagram投稿'}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* 動画アイコン */}
                    {post.media_type === 'VIDEO' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <svg
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* カルーセルアイコン */}
                    {post.media_type === 'CAROUSEL_ALBUM' && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    {post.caption && (
                      <p className="text-gray-700 text-sm line-clamp-3 mb-2">
                        {post.caption}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <time>
                        {new Date(post.timestamp).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            ))
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
