'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type {
  Service,
  MicroCMSService,
  MicroCMSServiceListResponse,
} from '@/types/facilities';
import { CONTENT_CATEGORIES } from '@/types/categories';

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSからサービスデータを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchServices = async () => {
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
            '[ServicesSection] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT or NEXT_PUBLIC_PHOTOS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // Cloudflare Workers経由で取得
        const url = new URL(contentsApiEndpoint);
        url.searchParams.append('category', CONTENT_CATEGORIES.SERVICE); // カテゴリIDでフィルタ
        url.searchParams.append('orders', 'order'); // 表示順でソート
        url.searchParams.append('getAll', 'true'); // 全件取得

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch services: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSServiceListResponse = await response.json();

        console.log(
          `[ServicesSection] 取得した全データ数: ${data.contents.length}`
        );

        // クライアント側でカテゴリフィルタリング（category.idがCONTENT_CATEGORIES.SERVICEのもののみ）
        const filteredContents = data.contents.filter(
          (service: MicroCMSService) => {
            if (!Array.isArray(service.category)) {
              return false;
            }
            return service.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.SERVICE
            );
          }
        );

        console.log(
          `[ServicesSection] フィルタリング後のデータ数: ${filteredContents.length}`
        );

        const fetchedServices: Service[] = filteredContents.map(
          (service: MicroCMSService) => ({
            id: service.id,
            createdAt: new Date(service.createdAt),
            updatedAt: new Date(service.updatedAt),
            title: service.title,
            description: service.description,
            body: service.body,
            icon: service.icon,
            image: service.image,
          })
        );

        setServices(fetchedServices);
      } catch (error) {
        console.error('[ServicesSection] サービスデータ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          団地内のサービス
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
        団地内のサービス
      </h3>
      {services.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">サービスデータがありません。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {service.icon && (
                      <div className="text-2xl">{service.icon}</div>
                    )}
                    <h4 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div
                    className="text-gray-600 mb-4 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.body }}
                  />
                  {/* 画像表示（bodyの下） */}
                  {service.image && (
                    <div className="w-full h-64 relative rounded-lg overflow-hidden mt-4">
                      <Image
                        src={service.image.url}
                        alt={service.title || 'サービスの画像'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  )}
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium mt-4">
                    予約する
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
