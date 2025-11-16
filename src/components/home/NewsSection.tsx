'use client';

import { useState, useEffect } from 'react';

// NewsSection component

// 仮のお知らせデータ（後でMicroCMSから取得する予定）
const newsItems = [
  {
    id: '1',
    title: '2024年度 自治会総会の開催について',
    date: '2024-12-15',
    category: '自治会',
    excerpt: '2024年度の自治会総会を以下の日程で開催いたします。',
    content:
      '2024年度の自治会総会を以下の日程で開催いたします。\n\n日時：2024年12月20日（金）19:00～\n場所：集会所\n\n議題：\n- 2024年度の活動報告\n- 2025年度の活動計画\n- 予算案の審議\n\n皆様のご参加をお願いいたします。',
    isImportant: true,
  },
  {
    id: '2',
    title: '年末年始のごみ収集スケジュール',
    date: '2024-12-10',
    category: 'お知らせ',
    excerpt: '年末年始期間中のごみ収集スケジュールをご確認ください。',
    content:
      '年末年始期間中のごみ収集スケジュールについてお知らせいたします。\n\n12月29日（日）：通常通り\n12月30日（月）：通常通り\n12月31日（火）：休止\n1月1日（水）：休止\n1月2日（木）：休止\n1月3日（金）：休止\n1月4日（土）：通常通り\n\n大型ごみの収集については、事前にお問い合わせください。',
    isImportant: false,
  },
  {
    id: '3',
    title: '団地内イベント「もちつき大会」開催のお知らせ',
    date: '2024-12-05',
    category: 'イベント',
    excerpt:
      '恒例のもちつき大会を開催いたします。皆様のご参加をお待ちしております。',
    content:
      '恒例のもちつき大会を開催いたします。\n\n日時：2024年12月23日（月・祝）10:00～14:00\n場所：団地内広場\n\n内容：\n- もちつき体験\n- おもちの試食\n- お楽しみ抽選会\n\n参加費：無料\n\n皆様のご参加をお待ちしております。',
    isImportant: false,
  },
];

type NewsItem = (typeof newsItems)[number];

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
      // アニメーション開始のため、少し遅延を入れる
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
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
      } bg-black bg-opacity-30 backdrop-blur-sm`}
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
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.isImportant
                  ? 'bg-green-100 text-green-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {item.category}
            </span>
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

          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {item.content}
            </p>
          </div>
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
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article
                key={item.id}
                onClick={() => handleOpenModal(item)}
                className={`bg-gray-50 hover:bg-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-t border-r border-b border-gray-300 cursor-pointer ${
                  item.isImportant ? 'border-l-green-600' : 'border-l-green-600'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.isImportant
                        ? 'bg-green-100 text-green-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.category}
                  </span>
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
