import {
  FamilyEnvironmentSection,
  ParksPlaygroundsSection,
  ChildcareSupportSection,
} from '@/components/family';

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            子育て環境の魅力
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地は、子育てファミリーに最適な環境を提供
            <br />
            安心・安全で充実した子育てライフをサポートします
          </p>
        </div>
      </section>

      {/* 子育て環境の魅力セクション */}
      <FamilyEnvironmentSection />

      {/* 公園・遊び場セクション */}
      <ParksPlaygroundsSection />

      {/* 子育て支援施設セクション */}
      <ChildcareSupportSection />
    </div>
  );
}
