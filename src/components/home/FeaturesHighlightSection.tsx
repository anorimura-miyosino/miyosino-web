import Link from 'next/link';
import {
  SparklesIcon,
  UsersIcon,
  HomeModernIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const highlights = [
  {
    name: '緑豊かな自然環境',
    description:
      '団地内には四季折々の表情を見せる木々や草花が豊かにあり、住民の心に安らぎを与えます。公園や緑道も整備されており、散歩やジョギングに最適です。',
    icon: SparklesIcon,
    color: 'green',
    link: '/features',
  },
  {
    name: '充実の子育て支援',
    description:
      '公園が複数あり、子供たちがのびのびと遊べます。近隣には保育園や小学校もあり、子育て世代に安心の環境です。',
    icon: UsersIcon,
    color: 'blue',
    link: '/family',
  },
  {
    name: '快適な住空間',
    description:
      '多くの住戸が現代のライフスタイルに合わせてリノベーション済み。日当たり良好な南向きの部屋で、明るく快適な毎日を送れます。',
    icon: HomeModernIcon,
    color: 'purple',
    link: '/features',
  },
  {
    name: '良好なアクセス',
    description:
      '最寄りのバス停から駅までスムーズにアクセス可能。都心への通勤・通学にも便利な立地です。圏央道「圏央鶴ヶ島IC」から車で約5分。',
    icon: MapPinIcon,
    color: 'orange',
    link: '/access',
  },
];

const colorClasses = {
  green: {
    bg: 'bg-gray-100',
    iconBg: 'bg-green-600',
    text: 'text-green-700',
    hover: 'hover:bg-green-200',
    border: 'border-green-200',
  },
  blue: {
    bg: 'bg-gray-100',
    iconBg: 'bg-blue-600',
    text: 'text-blue-700',
    hover: 'hover:bg-blue-200',
    border: 'border-blue-200',
  },
  purple: {
    bg: 'bg-gray-100',
    iconBg: 'bg-purple-600',
    text: 'text-purple-700',
    hover: 'hover:bg-purple-200',
    border: 'border-purple-200',
  },
  orange: {
    bg: 'bg-gray-100',
    iconBg: 'bg-orange-600',
    text: 'text-orange-700',
    hover: 'hover:bg-orange-200',
    border: 'border-orange-200',
  },
};

export default function FeaturesHighlightSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            かわつる三芳野団地へようこそ
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            当団地の魅力をご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {highlights.map((highlight) => {
            const colors =
              colorClasses[highlight.color as keyof typeof colorClasses];
            return (
              <Link
                key={highlight.name}
                href={highlight.link}
                className="block group"
              >
                <div
                  className={`h-full rounded-2xl p-8 shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border-2 ${colors.bg} ${colors.border} ${colors.hover}`}
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`flex-shrink-0 ${colors.iconBg} rounded-xl p-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <highlight.icon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-semibold mb-3 ${colors.text} group-hover:underline`}
                      >
                        {highlight.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {highlight.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                        詳細を見る
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
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* その他の魅力へのリンク */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            さらに詳しく知りたい方は、こちらもご覧ください
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/features"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              団地の特徴を見る
            </Link>
            <Link
              href="/community"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              コミュニティ活動
            </Link>
            <Link
              href="/surrounding"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              周辺環境
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

