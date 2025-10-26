import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
      {/* 背景イラスト風の装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-green-300 rounded-full opacity-35"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* メインキャッチコピー */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-green-500">かわつる三芳野団地</span>へようこそ
          </h1>

          {/* 説明文 */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            埼玉県川越市、武蔵野台地の北端で、豊かな緑に包まれた団地空間。
            <br />
            そこには、安心感のある暮らしとコミュニティが息づいています。
            <br />
            新しい生活を、ここから始めてみませんか。
          </p>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/features"
              className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              団地の魅力を探る
            </Link>
            <Link
              href="/contact"
              className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-500 hover:text-white transition-colors duration-200"
            >
              お問い合わせ
            </Link>
          </div>
        </div>

        {/* 家族のイラスト風装飾 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
          <div className="flex items-end space-x-4">
            {/* 父親 */}
            <div className="w-16 h-20 bg-blue-300 rounded-t-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
            {/* 母親 */}
            <div className="w-14 h-18 bg-pink-300 rounded-t-full flex items-center justify-center">
              <div className="w-7 h-7 bg-pink-400 rounded-full"></div>
            </div>
            {/* 男の子 */}
            <div className="w-12 h-16 bg-green-300 rounded-t-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-400 rounded-full"></div>
            </div>
            {/* 女の子 */}
            <div className="w-12 h-16 bg-purple-300 rounded-t-full flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
