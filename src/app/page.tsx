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
      <NewsSection />
    </>
  );
}
