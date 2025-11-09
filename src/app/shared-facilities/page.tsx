import { SharedFacilitiesSection } from '@/components/community';

export default function SharedFacilitiesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            共有施設・サービス
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            共有施設とサービスについて紹介します。
          </p>
        </div>
      </section>

      {/* 共有施設・サービスセクション */}
      <SharedFacilitiesSection />
    </div>
  );
}
