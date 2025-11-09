'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type {
  Photo,
  MicroCMSPhoto,
  MicroCMSPhotoListResponse,
} from '@/domains/media';

export default function HeroSection() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  // MicroCMSから写真データを取得
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const baseURL =
          process.env.NEXT_PUBLIC_MICROCMS_API_BASE_URL ||
          'https://k-miyoshino.microcms.io/api/v1';
        const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '';

        if (!apiKey) {
          console.warn('[HeroSection] MicroCMS API key is not set');
          setLoading(false);
          return;
        }

        const endpoint = `${baseURL}/photo`;
        const url = new URL(endpoint);
        url.searchParams.append('orders', 'order');

        const response = await fetch(url.toString(), {
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch photos: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSPhotoListResponse = await response.json();
        const fetchedPhotos: Photo[] = data.contents.map(
          (photo: MicroCMSPhoto) => ({
            id: photo.id,
            createdAt: new Date(photo.createdAt),
            updatedAt: new Date(photo.updatedAt),
            title: photo.title,
            description: photo.description,
            photo: photo.photo,
            order: photo.order,
          })
        );

        setPhotos(fetchedPhotos);

        // orderが最小の写真をデフォルトとして設定
        if (fetchedPhotos.length > 0) {
          const defaultPhoto = fetchedPhotos.reduce((prev, current) =>
            prev.order <= current.order ? prev : current
          );
          setSelectedPhoto(defaultPhoto);
        }
      } catch (error) {
        console.error('[HeroSection] 写真取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // ローディング中または写真が空の場合、または画像読み込みエラーの場合のフォールバック
  if (loading || !selectedPhoto || photos.length === 0 || imageError) {
    return (
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 overflow-hidden h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-25"></div>
          <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-green-300 rounded-full opacity-35"></div>
        </div>
        <HeroContent />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden flex flex-col">
      {/* 背景写真 */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src={selectedPhoto.photo.url}
            alt={selectedPhoto.title || 'ヒーロー画像'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            unoptimized
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              console.error(
                '[HeroSection] 画像読み込みエラー:',
                selectedPhoto.photo.url
              );
              setImageError(true);
              setImageLoaded(false);
            }}
          />
          {/* 画像読み込み中のインジケーター（オプション） */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          {/* オーバーレイ（テキストの可読性向上） */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>
        </div>

        <HeroContent />
      </div>

      {/* 写真選択UI（複数写真がある場合のみ表示） */}
      {photos.length > 1 && (
        <div className="flex justify-center py-4 bg-white/90 backdrop-blur-sm">
          <div className="flex gap-2">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`relative w-16 h-16 rounded overflow-hidden transition-all duration-200 ${
                  selectedPhoto.id === photo.id
                    ? 'ring-2 ring-green-600 ring-offset-2 scale-110'
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
                aria-label={`写真を選択: ${photo.title}`}
              >
                <Image
                  src={photo.photo.url}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function HeroContent() {
  return <div className="relative h-full w-full"></div>;
}
