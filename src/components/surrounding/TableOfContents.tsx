'use client';

import { useState, useEffect } from 'react';
import { surroundingCategories } from './data2';
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

export function TableOfContents() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // ヘッダーの高さ分オフセット
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // APIからデータを取得して、データが存在するカテゴリのみを表示
  useEffect(() => {
    const fetchNearbyFacilities = async () => {
      try {
        setLoading(true);

        // Cloudflare Workersのエンドポイントを取得
        const contentsApiEndpoint =
          process.env.NEXT_PUBLIC_CONTENTS_API_ENDPOINT;

        if (!contentsApiEndpoint) {
          console.error(
            '[TableOfContents] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // Cloudflare Workers経由で取得
        const url = new URL(contentsApiEndpoint);
        url.searchParams.append('category', CONTENT_CATEGORIES.NEARBY);
        url.searchParams.append('getAll', 'true');

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch nearby facilities: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSNearbyFacilityListResponse = await response.json();

        // クライアント側でカテゴリフィルタリング
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
        const fetchedFacilities: NearbyFacility[] = filteredContents.map(
          (facility: MicroCMSNearbyFacility) => {
            let subCategoryValue = '';
            if (facility.subCategory) {
              if (typeof facility.subCategory === 'string') {
                subCategoryValue =
                  subCategoryMap[facility.subCategory] || facility.subCategory;
              } else if (
                typeof facility.subCategory === 'object' &&
                facility.subCategory.id
              ) {
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

        // subCategoryに基づいて分類
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

        setGroupedFacilities(grouped);
      } catch (error) {
        console.error('[TableOfContents] 周辺施設データ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyFacilities();
  }, []);

  // データがあるカテゴリのみをフィルタリング
  const categoriesWithData = surroundingCategories.filter((category) => {
    const categoryData =
      groupedFacilities[category.id as keyof GroupedFacilities];
    return Array.isArray(categoryData) && categoryData.length > 0;
  });

  // ローディング中は何も表示しない（またはローディング表示）
  if (loading) {
    return null;
  }

  // データがない場合は何も表示しない
  if (categoriesWithData.length === 0) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-14 lg:top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 py-4 overflow-x-auto">
          {categoriesWithData.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
