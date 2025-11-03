import {
  HeroSection,
  FeaturesHighlightSection,
  NewsSection,
  InstagramSection,
} from '@/components/home';
import { microCMSClient } from '@/infrastructure/api';

export default async function Home() {
  // 写真データを取得（静的生成時に実行）
  let photos = [];
  let defaultPhoto = null;

  try {
    photos = await microCMSClient.getPhotos();
    defaultPhoto = await microCMSClient.getBackgroundPhoto();
  } catch (error) {
    console.error('Failed to fetch photos:', error);
    // エラー時は空配列のまま
  }

  return (
    <>
      <HeroSection photos={photos} defaultPhoto={defaultPhoto} />
      <FeaturesHighlightSection />
      <NewsSection />
      <InstagramSection />
    </>
  );
}
