import Link from 'next/link';

// 仮のお知らせデータ（後でMicroCMSから取得する予定）
const newsItems = [
  {
    id: '1',
    title: '2024年度 自治会総会の開催について',
    date: '2024-12-15',
    category: '自治会',
    excerpt: '2024年度の自治会総会を以下の日程で開催いたします。',
    isImportant: true,
  },
  {
    id: '2',
    title: '年末年始のごみ収集スケジュール',
    date: '2024-12-10',
    category: 'お知らせ',
    excerpt: '年末年始期間中のごみ収集スケジュールをご確認ください。',
    isImportant: false,
  },
  {
    id: '3',
    title: '団地内イベント「もちつき大会」開催のお知らせ',
    date: '2024-12-05',
    category: 'イベント',
    excerpt:
      '恒例のもちつき大会を開催いたします。皆様のご参加をお待ちしております。',
    isImportant: false,
  },
];

export default function NewsSection() {
  return (
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
              className={`bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-l-4 border-t border-r border-b border-gray-300 ${
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

              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <Link
                  href={`/news/${item.id}`}
                  className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors"
                  prefetch={false}
                >
                  詳細を見る →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* お知らせ一覧へのリンク */}
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            prefetch={false}
          >
            すべてのお知らせを見る
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
