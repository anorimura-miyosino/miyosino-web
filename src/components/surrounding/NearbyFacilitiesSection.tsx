'use client';

import { useState, useEffect } from 'react';
import type {
  NearbyFacility,
  MicroCMSNearbyFacility,
  MicroCMSNearbyFacilityListResponse,
} from '@/types/surrounding';
import { CONTENT_CATEGORIES } from '@/types/categories';

type GroupedFacilities = {
  publicFacilities: NearbyFacility[];
  educationFacilities: NearbyFacility[];
  financialInstitutions: NearbyFacility[];
  commercialFacilities: NearbyFacility[];
  medicalFacilities: NearbyFacility[];
  utilities: NearbyFacility[];
};

export default function NearbyFacilitiesSection() {
  const [groupedFacilities, setGroupedFacilities] = useState<GroupedFacilities>(
    {
      publicFacilities: [],
      educationFacilities: [],
      financialInstitutions: [],
      commercialFacilities: [],
      medicalFacilities: [],
      utilities: [],
    }
  );
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSから周辺施設データを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchNearbyFacilities = async () => {
      try {
        setLoading(true);

        // Cloudflare Workersのエンドポイントを取得
        const contentsApiEndpoint =
          process.env.NEXT_PUBLIC_CONTENTS_API_ENDPOINT ||
          process.env.NEXT_PUBLIC_PHOTOS_API_ENDPOINT?.replace(
            'miyosino-photos-api',
            'miyosino-contents-api'
          );

        if (!contentsApiEndpoint) {
          console.error(
            '[NearbyFacilitiesSection] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT or NEXT_PUBLIC_PHOTOS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // Cloudflare Workers経由で取得
        const url = new URL(contentsApiEndpoint);
        url.searchParams.append('category', CONTENT_CATEGORIES.NEARBY); // カテゴリIDでフィルタ
        url.searchParams.append('getAll', 'true'); // 全件取得

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch nearby facilities: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSNearbyFacilityListResponse = await response.json();

        console.log(
          `[NearbyFacilitiesSection] 取得した全データ数: ${data.contents.length}`
        );

        // クライアント側でカテゴリフィルタリング（category.idがCONTENT_CATEGORIES.NEARBYのもののみ）
        const filteredContents = data.contents.filter(
          (facility: MicroCMSNearbyFacility) => {
            if (!Array.isArray(facility.category)) {
              return false;
            }
            return facility.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.NEARBY
            );
          }
        );

        console.log(
          `[NearbyFacilitiesSection] フィルタリング後のデータ数: ${filteredContents.length}`
        );

        // デバッグ: 最初の数件のデータ構造を確認
        console.log(
          '[NearbyFacilitiesSection] サンプルデータ（最初の1件の全フィールド）:',
          filteredContents[0]
        );

        // subCategoryの値をマッピング（nearby_xxx形式からxxxFacilities形式へ）
        const subCategoryMap: Record<string, string> = {
          nearby_public: 'publicFacilities',
          nearby_education: 'educationFacilities',
          nearby_finance: 'financialInstitutions',
          nearby_commerce: 'commercialFacilities',
          nearby_medical: 'medicalFacilities',
          nearby_other: 'utilities',
        };

        // MicroCMSのレスポンスをNearbyFacility型に変換
        // subCategoryがオブジェクトの場合はidを取得、文字列の場合はそのまま使用
        const fetchedFacilities: NearbyFacility[] = filteredContents.map(
          (facility: MicroCMSNearbyFacility) => {
            let subCategoryValue = '';
            if (facility.subCategory) {
              if (typeof facility.subCategory === 'string') {
                // nearby_xxx形式をxxxFacilities形式に変換
                subCategoryValue =
                  subCategoryMap[facility.subCategory] || facility.subCategory;
              } else if (
                typeof facility.subCategory === 'object' &&
                facility.subCategory.id
              ) {
                // オブジェクトの場合も同様にマッピング
                subCategoryValue =
                  subCategoryMap[facility.subCategory.id] ||
                  facility.subCategory.id;
              }
            }

            return {
              id: facility.id,
              createdAt: new Date(facility.createdAt),
              updatedAt: new Date(facility.updatedAt),
              name:
                facility.name ||
                (facility as MicroCMSNearbyFacility & { title?: string })
                  .title ||
                '',
              description: facility.description || '',
              subCategory: subCategoryValue,
              icon: facility.icon || '',
              order: facility.order || 0,
            };
          }
        );

        // デバッグ: 変換後のsubCategoryの値を確認
        console.log(
          '[NearbyFacilitiesSection] 変換後のsubCategory一覧:',
          fetchedFacilities.map((f) => ({
            name: f.name,
            subCategory: f.subCategory,
            subCategoryLength: f.subCategory?.length,
            subCategoryType: typeof f.subCategory,
          }))
        );

        // デバッグ: ユニークなsubCategoryの値を確認
        const uniqueSubCategories = [
          ...new Set(fetchedFacilities.map((f) => f.subCategory)),
        ];
        console.log(
          '[NearbyFacilitiesSection] ユニークなsubCategoryの値:',
          uniqueSubCategories
        );

        // subCategory.idに基づいて分類
        const grouped: GroupedFacilities = {
          publicFacilities: fetchedFacilities
            .filter((f) => f.subCategory === 'publicFacilities')
            .sort((a, b) => a.order - b.order),
          educationFacilities: fetchedFacilities
            .filter((f) => f.subCategory === 'educationFacilities')
            .sort((a, b) => a.order - b.order),
          financialInstitutions: fetchedFacilities
            .filter((f) => f.subCategory === 'financialInstitutions')
            .sort((a, b) => a.order - b.order),
          commercialFacilities: fetchedFacilities
            .filter((f) => f.subCategory === 'commercialFacilities')
            .sort((a, b) => a.order - b.order),
          medicalFacilities: fetchedFacilities
            .filter((f) => f.subCategory === 'medicalFacilities')
            .sort((a, b) => a.order - b.order),
          utilities: fetchedFacilities
            .filter((f) => f.subCategory === 'utilities')
            .sort((a, b) => a.order - b.order),
        };

        // デバッグ: 分類後の各カテゴリのデータ数を確認
        console.log('[NearbyFacilitiesSection] 分類後のデータ数:', {
          publicFacilities: grouped.publicFacilities.length,
          educationFacilities: grouped.educationFacilities.length,
          financialInstitutions: grouped.financialInstitutions.length,
          commercialFacilities: grouped.commercialFacilities.length,
          medicalFacilities: grouped.medicalFacilities.length,
          utilities: grouped.utilities.length,
        });

        setGroupedFacilities(grouped);
      } catch (error) {
        console.error(
          '[NearbyFacilitiesSection] 周辺施設データ取得エラー:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyFacilities();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <>
      {/* 公共施設セクション */}
      {groupedFacilities.publicFacilities.length > 0 && (
        <section
          id="publicFacilities"
          className="bg-gray-50 py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 px-4 py-2 bg-blue-50 border-l-4 border-blue-500 rounded">
              公共施設
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupedFacilities.publicFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl mr-4">{facility.icon}</div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      {facility.name}
                    </span>
                    <span className="text-gray-600 ml-4">
                      {facility.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 教育施設セクション */}
      {groupedFacilities.educationFacilities.length > 0 && (
        <section
          id="educationFacilities"
          className="bg-white py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 px-4 py-2 bg-green-50 border-l-4 border-green-500 rounded">
              教育施設
            </h2>
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupedFacilities.educationFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl mr-4">{facility.icon}</div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      {facility.name}
                    </span>
                    <span className="text-gray-600 ml-4">
                      {facility.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 金融機関セクション */}
      {groupedFacilities.financialInstitutions.length > 0 && (
        <section
          id="financialInstitutions"
          className="bg-gray-50 py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 px-4 py-2 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              金融機関
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupedFacilities.financialInstitutions.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl mr-4">{facility.icon}</div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      {facility.name}
                    </span>
                    <span className="text-gray-600 ml-4">
                      {facility.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 商業施設セクション */}
      {groupedFacilities.commercialFacilities.length > 0 && (
        <section
          id="commercialFacilities"
          className="bg-white py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 px-4 py-2 bg-pink-50 border-l-4 border-pink-500 rounded">
              商業施設
            </h2>
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupedFacilities.commercialFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl mr-4">{facility.icon}</div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      {facility.name}
                    </span>
                    <span className="text-gray-600 ml-4">
                      {facility.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 医療施設セクション */}
      {groupedFacilities.medicalFacilities.length > 0 && (
        <section
          id="medicalFacilities"
          className="bg-gray-50 py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 px-4 py-2 bg-red-50 border-l-4 border-red-500 rounded">
              医療施設
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupedFacilities.medicalFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-2xl mr-4">{facility.icon}</div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      {facility.name}
                    </span>
                    <span className="text-gray-600 ml-4">
                      {facility.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* その他セクション */}
      {groupedFacilities.utilities.length > 0 && (
        <section
          id="utilities"
          className="bg-white py-12 sm:py-16 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 px-4 py-2 bg-gray-100 border-l-4 border-gray-400 rounded">
              その他（電気、ガス、水道、ごみ処理）
            </h2>
            <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
              {groupedFacilities.utilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center px-6 py-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl mr-4">{facility.icon}</div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">
                      {facility.name}
                    </span>
                    <span className="text-gray-600 ml-4">
                      {facility.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
