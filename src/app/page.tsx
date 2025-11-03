import {
  HeroSection,
  FeaturesHighlightSection,
  NewsSection,
  InstagramSection,
} from '@/components/home';
import { microCMSClient } from '@/infrastructure/api';
import type { Photo } from '@/domains/media';

export default async function Home() {
  // 写真データを取得（静的生成時に実行）
  let photos: Photo[] = [];
  let defaultPhoto: Photo | null = null;

  try {
    console.log(
      '[Home] MicroCMS API Key:',
      process.env.MICROCMS_API_KEY ? '設定済み' : '未設定'
    );
    photos = await microCMSClient.getPhotos();
    console.log('[Home] 取得した写真数:', photos.length);
    if (photos.length > 0) {
      console.log('[Home] 最初の写真URL:', photos[0].photo.url);
    }
    defaultPhoto = await microCMSClient.getBackgroundPhoto();
    if (defaultPhoto) {
      console.log('[Home] デフォルト写真URL:', defaultPhoto.photo.url);
    }
  } catch (error) {
    console.error('[Home] 写真取得エラー:', error);
    if (error instanceof Error) {
      console.error('[Home] エラーメッセージ:', error.message);
      console.error('[Home] エラースタック:', error.stack);
    }
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
