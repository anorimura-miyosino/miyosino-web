import {
  HeroSection,
  IntroductionSection,
  FeaturesHighlightSection,
  NewsSection,
  InstagramSection,
} from '@/components/home';

export default function Home() {
  return (
    <>
      <HeroSection />
      <InstagramSection />
      <IntroductionSection />
      <FeaturesHighlightSection />
      <NewsSection />
    </>
  );
}
