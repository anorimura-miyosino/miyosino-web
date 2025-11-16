'use client';

import { useState, useEffect } from 'react';
import type {
  News,
  MicroCMSNews,
  MicroCMSNewsListResponse,
} from '@/types/news';

type NewsItem = News;

function NewsModal({
  item,
  isOpen,
  onClose,
}: {
  item: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen && item) {
      setShouldRender(true);
      // アニメーション開始のため、DOMに追加された後に少し遅延を入れる
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // アニメーション完了後にDOMから削除
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, item]);

  if (!shouldRender || !item) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      } bg-black/30 backdrop-blur-sm`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out ${
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            {item.category.map((cat, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.isImportant
                    ? 'bg-green-100 text-green-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {cat}
              </span>
            ))}
            {item.isImportant && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                重要
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="閉じる"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {item.title}
          </h2>

          <div className="mb-6">
            <time className="text-sm text-gray-500">
              {new Date(item.date).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSからお知らせデータを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // Cloudflare Workersのエンドポイントを取得
        // NEXT_PUBLIC_CONTENTS_API_ENDPOINTが設定されていない場合は、NEXT_PUBLIC_PHOTOS_API_ENDPOINTをベースに推測
        const contentsApiEndpoint =
          process.env.NEXT_PUBLIC_CONTENTS_API_ENDPOINT ||
          process.env.NEXT_PUBLIC_PHOTOS_API_ENDPOINT?.replace(
            'miyosino-photos-api',
            'miyosino-contents-api'
          );

        if (!contentsApiEndpoint) {
          console.error(
            '[NewsSection] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT or NEXT_PUBLIC_PHOTOS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // Cloudflare Workers経由で取得
        const url = new URL(contentsApiEndpoint);
        url.searchParams.append('category', 'news'); // カテゴリIDでフィルタ（category.idが"news"のものを取得）
        url.searchParams.append('orders', '-date'); // 日付の降順（新しい順）
        url.searchParams.append('getAll', 'true'); // 全件取得（ページネーションで取得）

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch news: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSNewsListResponse = await response.json();

        // デバッグ: 取得した全データのIDを確認
        const allIds = data.contents.map((item) => item.id);
        console.log(
          `[NewsSection] 取得した全データ数: ${data.contents.length}, 全ID: [${allIds.join(', ')}]`
        );
        const targetId = 'f2mxyeesekf';
        if (allIds.includes(targetId)) {
          console.log(
            `[NewsSection] ✅ ターゲットID "${targetId}" が取得データに含まれています`
          );
        } else {
          console.log(
            `[NewsSection] ❌ ターゲットID "${targetId}" が取得データに含まれていません`
          );
        }

        // クライアント側でカテゴリフィルタリング（category.idが"news"のもののみ）
        const filteredContents = data.contents.filter((news: MicroCMSNews) => {
          // categoryが配列で、その中にidが"news"のものがあるかチェック
          if (!Array.isArray(news.category)) {
            return false;
          }

          // デバッグ: 各アイテムのカテゴリ情報を確認
          const categoryIds = news.category
            .map((cat) => cat?.id)
            .filter(Boolean);
          const hasNews = news.category.some((cat) => cat && cat.id === 'news');

          console.log(
            `[NewsSection] "${news.title}": カテゴリ数=${news.category.length}, カテゴリID=[${categoryIds.join(', ')}], news含む=${hasNews}`
          );

          return hasNews;
        });

        if (filteredContents.length === 0) {
          // 全カテゴリIDを表示
          const allCategoryIds = new Set<string>();
          data.contents.forEach((item) => {
            if (Array.isArray(item.category)) {
              item.category.forEach((cat) => {
                if (cat?.id) {
                  allCategoryIds.add(cat.id);
                }
              });
            }
          });
          console.log(
            '[NewsSection] 存在するカテゴリID:',
            Array.from(allCategoryIds)
          );
        }

        console.log(
          '[NewsSection] フィルタリング後のデータ数:',
          filteredContents.length
        );

        const fetchedNews: News[] = filteredContents.map(
          (news: MicroCMSNews) => {
            const newsWithOptional = news as MicroCMSNews & {
              description?: string;
              body?: string;
            };
            const categories = Array.isArray(news.category)
              ? news.category.map((cat) => cat.name).filter(Boolean)
              : ['お知らせ']; // 複数のカテゴリ名を配列で保持

            // デバッグ: カテゴリ情報を確認
            console.log(
              `[NewsSection] "${news.title}": カテゴリ数=${news.category?.length || 0}, カテゴリ名=[${categories.join(', ')}]`
            );

            return {
              id: news.id,
              createdAt: new Date(news.createdAt),
              updatedAt: new Date(news.updatedAt),
              title: news.title,
              date: news.date || news.createdAt.split('T')[0], // dateがない場合はcreatedAtから取得
              category: categories,
              excerpt: news.excerpt || newsWithOptional.description || '', // excerptがない場合はdescriptionを使用
              content: news.content || newsWithOptional.body || '', // contentがない場合はbodyを使用
              isImportant: news.isImportant || false,
            };
          }
        );

        setNewsItems(fetchedNews);
      } catch (error) {
        console.error('[NewsSection] お知らせ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleOpenModal = (item: NewsItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // アニメーション完了後にアイテムをクリア
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  };

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              お知らせ
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              団地に関する最新情報やイベントのお知らせを掲載しています。
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">お知らせを読み込み中...</p>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">お知らせはありません。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <article
                  key={item.id}
                  onClick={() => handleOpenModal(item)}
                  className={`bg-gray-50 hover:bg-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-t border-r border-b border-gray-300 cursor-pointer ${
                    item.isImportant
                      ? 'border-l-green-600'
                      : 'border-l-green-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.category.map((cat, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.isImportant
                              ? 'bg-green-100 text-green-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    {item.isImportant && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        重要
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-end">
                    <time className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
