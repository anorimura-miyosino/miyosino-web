'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type {
  CommonFacility,
  MicroCMSCommonFacility,
  MicroCMSCommonFacilityListResponse,
} from '@/types/facilities';
import { CONTENT_CATEGORIES } from '@/types/categories';
import { facilitiesSections } from './data';

export default function CommonFacilitiesSection() {
  const [facilities, setFacilities] = useState<CommonFacility[]>([]);
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSから共用施設データを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchFacilities = async () => {
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
        url.searchParams.append('category', CONTENT_CATEGORIES.FACILITY); // カテゴリIDでフィルタ
        url.searchParams.append('orders', 'order'); // 表示順でソート
        url.searchParams.append('getAll', 'true'); // 全件取得

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch facilities: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSCommonFacilityListResponse = await response.json();

        console.log(
          `[CommonFacilitiesSection] 取得した全データ数: ${data.contents.length}`
        );

        // クライアント側でカテゴリフィルタリング（category.idがCONTENT_CATEGORIES.FACILITYのもののみ）
        const filteredContents = data.contents.filter(
          (facility: MicroCMSCommonFacility) => {
            if (!Array.isArray(facility.category)) {
              return false;
            }
            return facility.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.FACILITY
            );
          }
        );

        console.log(
          `[CommonFacilitiesSection] フィルタリング後のデータ数: ${filteredContents.length}`
        );

        const fetchedFacilities: CommonFacility[] = filteredContents.map(
          (facility: MicroCMSCommonFacility) => ({
            id: facility.id,
            createdAt: new Date(facility.createdAt),
            updatedAt: new Date(facility.updatedAt),
            title: facility.title,
            description: facility.description,
            body: facility.body,
            icon: facility.icon,
            image: facility.image,
          })
        );

        setFacilities(fetchedFacilities);
      } catch (error) {
        console.error(
          '[CommonFacilitiesSection] 共用施設データ取得エラー:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          共有施設
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  const sectionData = facilitiesSections.find((s) => s.id === 'common');

  return (
    <div className="space-y-8">
      <div
        id="common"
        className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8 shadow-sm"
      >
        <h3 className="text-3xl font-bold text-gray-900 flex items-center justify-start gap-3">
          <span className="text-4xl">{sectionData?.icon}</span>
          <span>{sectionData?.label}</span>
        </h3>
      </div>
      {facilities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">共用施設データがありません。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-green-600 flex items-center justify-center relative">
                {facility.image ? (
                  <Image
                    src={facility.image.url}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="text-6xl text-white opacity-80">
                    {facility.icon || '🏢'}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {facility.icon && (
                    <div className="text-2xl">{facility.icon}</div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900">
                    {facility.title}
                  </h4>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {facility.description}
                </p>
                <div
                  className="text-gray-600 mb-4 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: facility.body }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
