'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@/domains/media';

interface HeroSectionProps {
  photos: Photo[];
  defaultPhoto?: Photo | null;
}

export default function HeroSection({
  photos,
  defaultPhoto,
}: HeroSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(
    defaultPhoto || null
  );

  // 写真が空の場合のフォールバック
  if (!selectedPhoto || photos.length === 0) {
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
    <section className="relative overflow-hidden h-[50vh] min-h-[400px]">
      {/* 背景写真 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${selectedPhoto.photo.url})`,
          }}
        />
        {/* オーバーレイ（テキストの可読性向上） */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>
      </div>

      <HeroContent />

      {/* 写真選択UI（複数写真がある場合のみ表示） */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 right-4 z-10">
          <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`relative w-16 h-16 rounded overflow-hidden transition-all duration-200 ${
                  selectedPhoto.id === photo.id
                    ? 'ring-2 ring-green-500 ring-offset-2 scale-110'
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
