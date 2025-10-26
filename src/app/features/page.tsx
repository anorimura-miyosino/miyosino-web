import {
  OverviewSection,
  OrganizationManagementSection,
  HistorySection,
} from '@/components/features';

export const metadata = {
  title: '団地の特徴 | かわつる三芳野団地',
  description:
    'かわつる三芳野団地の特徴をご紹介。団地の概要、組織・あゆみなど、団地の魅力を詳しく解説します。',
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">団地の特徴</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地の魅力と特徴を詳しくご紹介
            <br />
            団地の概要、組織・あゆみなど、団地の魅力を解説します
          </p>
        </div>
      </section>

      <OverviewSection />
      <OrganizationManagementSection />
      <HistorySection />
    </div>
  );
}
