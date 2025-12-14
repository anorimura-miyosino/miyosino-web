import {
  SunIcon,
  SparklesIcon,
  HomeModernIcon,
  UsersIcon,
  ShoppingCartIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: '緑豊かな自然環境',
    description:
      '団地内には四季折々の表情を見せる木々や草花が豊かにあり、住民の心に安らぎを与えます。公園や緑道も整備されており、散歩やジョギングに最適です。',
    icon: SparklesIcon,
  },
  {
    name: '充実の子育て支援',
    description:
      '安全な公園やプレイロットが複数あり、子供たちがのびのびと遊べます。近隣には保育園や小学校もあり、子育て世代に安心の環境です。',
    icon: UsersIcon,
  },
  {
    name: 'リノベーションされた快適な住空間',
    description:
      '多くの住戸が現代のライフスタイルに合わせてリノベーション済み。日当たり良好な南向きの部屋で、明るく快適な毎日を送れます。',
    icon: HomeModernIcon,
  },
  {
    name: '活気あるコミュニティ活動',
    description:
      '夏祭りやクリスマス会など、季節ごとのイベントが多数開催されます。サークル活動も盛んで、世代を超えた交流が生まれています。',
    icon: SunIcon,
  },
  {
    name: '便利な生活インフラ',
    description:
      '団地内にスーパーマーケットや商店があり、日常の買い物に困りません。クリニックや郵便局も揃っており、生活利便性の高い環境です。',
    icon: ShoppingCartIcon,
  },
  {
    name: '良好なアクセス',
    description:
      '最寄りのバス停から駅までスムーズにアクセス可能。都心への通勤・通学にも便利な立地です。駐車場も完備しています。',
    icon: MapPinIcon,
  },
];

export function FeaturesSection() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-start gap-3">
              <span className="text-4xl">✨</span>
              <span>かわつる三芳野団地の魅力</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              自然と利便性が調和した、誰もが快適に暮らせる環境。私たちの団地が選ばれる理由をご紹介します。
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
