'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { featuresSections } from './data';
import type {
  Season,
  MicroCMSSeason,
  MicroCMSSeasonListResponse,
} from '@/types/seasons';
import { CONTENT_CATEGORIES } from '@/types/categories';

export function SeasonsSection() {
  const [seasonsData, setSeasonsData] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSから四季データを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);

        // Cloudflare Workersのエンドポイントを取得
        const contentsApiEndpoint =
          process.env.NEXT_PUBLIC_CONTENTS_API_ENDPOINT;

        if (!contentsApiEndpoint) {
          console.error(
            '[NearbyFacilitiesSection] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // Cloudflare Workers経由で取得
        const url = new URL(contentsApiEndpoint);
        url.searchParams.append('category', CONTENT_CATEGORIES.SEASON); // カテゴリIDでフィルタ
        url.searchParams.append('orders', 'order'); // 表示順でソート
        url.searchParams.append('getAll', 'true'); // 全件取得

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch seasons: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSSeasonListResponse = await response.json();

        console.log(
          `[SeasonsSection] 取得した全データ数: ${data.contents.length}`
        );

        // クライアント側でカテゴリフィルタリング（category.idがCONTENT_CATEGORIES.SEASONのもののみ）
        const filteredContents = data.contents.filter(
          (season: MicroCMSSeason) => {
            if (!Array.isArray(season.category)) {
              return false;
            }
            return season.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.SEASON
            );
          }
        );

        console.log(
          `[SeasonsSection] フィルタリング後のデータ数: ${filteredContents.length}`
        );

        // orderでソート（0=春、1=夏、2=秋、3=冬）
        const sortedContents = filteredContents.sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );

        const fetchedSeasons: Season[] = sortedContents.map(
          (season: MicroCMSSeason) => ({
            id: season.id,
            createdAt: new Date(season.createdAt),
            updatedAt: new Date(season.updatedAt),
            title: season.title,
            description: season.description,
            body: season.body,
            order: season.order,
            icon: season.icon,
            image: season.image,
          })
        );

        setSeasonsData(fetchedSeasons);
      } catch (error) {
        console.error('[SeasonsSection] 四季データ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const sectionMeta = featuresSections.find((s) => s.id === 'seasons');

  if (!sectionMeta) {
    return null;
  }

  return (
    <section
      id={sectionMeta.id}
      className="bg-white py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-pink-50 to-yellow-50 border-l-4 border-pink-600 rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-start gap-3">
              <span className="text-4xl">{sectionMeta.icon}</span>
              <span>{sectionMeta.title}</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              かわつる三芳野団地では、四季折々の表情をお楽しみいただけます。
              季節ごとの美しい風景と、住民の皆さんとの交流の様子をご紹介します。
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 mt-16">
            <p className="text-gray-600">四季の情報を読み込み中...</p>
          </div>
        ) : seasonsData.length === 0 ? (
          <div className="text-center py-12 mt-16">
            <p className="text-gray-600">四季の情報はありません。</p>
          </div>
        ) : (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {seasonsData.map((season) => (
              <div
                key={season.id}
                className="flex flex-col items-start rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-6 flex items-center gap-3">
                  {season.icon && (
                    <span className="text-4xl flex-shrink-0">
                      {season.icon}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900">
                    {season.title}
                  </h3>
                </div>
                <div
                  className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: season.body }}
                />
                {/* 画像表示（文章の後、同じ大きさ） */}
                {season.image && (
                  <div className="w-full h-64 relative rounded-lg overflow-hidden mt-4">
                    <Image
                      src={season.image.url}
                      alt={season.title || '四季の画像'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
