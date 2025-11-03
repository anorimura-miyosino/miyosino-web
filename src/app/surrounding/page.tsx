import {
  NearbyFacilitiesSection,
  SurroundingFacilitiesMapSection,
} from '@/components/surrounding';

export default function SurroundingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-500 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            周辺施設・お店
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地周辺の便利な施設とお店をご紹介
            <br />
            子育てに必要な施設やお店が徒歩圏内に充実しています
          </p>
        </div>
      </section>

      {/* 周辺の施設・お店セクション */}
      <NearbyFacilitiesSection />

      {/* 周辺施設マップセクション */}
      <SurroundingFacilitiesMapSection />
    </div>
  );
}
