import { CommunityActivitiesSection } from '@/components/community';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            コミュニティ
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地での豊かなコミュニティ活動を
            <br />
            ご紹介します
          </p>
        </div>
      </section>

      {/* コミュニティ活動セクション */}
      <CommunityActivitiesSection />
    </div>
  );
}
