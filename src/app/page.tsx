import Link from 'next/link';
import {
  HeroSection,
  IntroductionSection,
  FeaturesHighlightSection,
  NewsSection,
  InstagramSection,
} from '@/components/home';
import { OverviewSection } from '@/components/features';

export default function Home() {
  return (
    <>
      <HeroSection />
      <InstagramSection />
      <IntroductionSection />
      <FeaturesHighlightSection />
      <OverviewSection />

      {/* さらに詳しく知るためのリンク */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 mb-8">
            さらに詳しく知りたい方は、こちらもご覧ください
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/features"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              特徴を見る
            </Link>
            <Link
              href="/management"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              団地運営を見る
            </Link>
            <Link
              href="/community"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              コミュニティを見る
            </Link>
            <Link
              href="/access"
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              アクセスを見る
            </Link>
          </div>
        </div>
      </section>

      {/* <NewsSection /> */}
    </>
  );
}
