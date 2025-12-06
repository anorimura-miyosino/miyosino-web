'use client';

import { useState, useEffect } from 'react';
import type {
  ResidentCircle,
  MicroCMSResidentCircle,
  MicroCMSResidentCircleListResponse,
} from '@/types/community';
import { CONTENT_CATEGORIES } from '@/types/categories';

export default function CommunityCircle() {
  const [sportsCircles, setSportsCircles] = useState<ResidentCircle[]>([]);
  const [cultureCircles, setCultureCircles] = useState<ResidentCircle[]>([]);
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSから住民サークルデータを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchCircles = async () => {
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
            '[CommunityCircle] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT or NEXT_PUBLIC_PHOTOS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // スポーツ・運動カテゴリから取得
        const sportsUrl = new URL(contentsApiEndpoint);
        sportsUrl.searchParams.append(
          'category',
          CONTENT_CATEGORIES.COMMUNITY_CIRCLE_SPORTS
        );
        sportsUrl.searchParams.append('orders', 'order');
        sportsUrl.searchParams.append('getAll', 'true');

        const sportsResponse = await fetch(sportsUrl.toString(), {
          cache: 'no-store',
        });

        if (!sportsResponse.ok) {
          throw new Error(
            `Failed to fetch sports circles: ${sportsResponse.status} ${sportsResponse.statusText}`
          );
        }

        const sportsData: MicroCMSResidentCircleListResponse =
          await sportsResponse.json();

        // 文化活動カテゴリから取得
        const cultureUrl = new URL(contentsApiEndpoint);
        cultureUrl.searchParams.append(
          'category',
          CONTENT_CATEGORIES.COMMUNITY_CIRCLE_CULTURE
        );
        cultureUrl.searchParams.append('orders', 'order');
        cultureUrl.searchParams.append('getAll', 'true');

        const cultureResponse = await fetch(cultureUrl.toString(), {
          cache: 'no-store',
        });

        if (!cultureResponse.ok) {
          throw new Error(
            `Failed to fetch culture circles: ${cultureResponse.status} ${cultureResponse.statusText}`
          );
        }

        const cultureData: MicroCMSResidentCircleListResponse =
          await cultureResponse.json();

        console.log(
          `[CommunityCircle] スポーツ・運動: ${sportsData.contents.length}件, 文化活動: ${cultureData.contents.length}件`
        );

        // スポーツ・運動のフィルタリングと変換
        const filteredSports = sportsData.contents.filter(
          (circle: MicroCMSResidentCircle) => {
            if (!Array.isArray(circle.category)) {
              return false;
            }
            return circle.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.COMMUNITY_CIRCLE_SPORTS
            );
          }
        );

        const fetchedSports: ResidentCircle[] = filteredSports.map(
          (circle: MicroCMSResidentCircle) => ({
            id: circle.id,
            createdAt: new Date(circle.createdAt),
            updatedAt: new Date(circle.updatedAt),
            name: circle.title || circle.name || '',
            category: 'スポーツ・運動',
            body: circle.body,
            icon: circle.icon,
          })
        );

        // 文化活動のフィルタリングと変換
        const filteredCulture = cultureData.contents.filter(
          (circle: MicroCMSResidentCircle) => {
            if (!Array.isArray(circle.category)) {
              return false;
            }
            return circle.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.COMMUNITY_CIRCLE_CULTURE
            );
          }
        );

        const fetchedCulture: ResidentCircle[] = filteredCulture.map(
          (circle: MicroCMSResidentCircle) => ({
            id: circle.id,
            createdAt: new Date(circle.createdAt),
            updatedAt: new Date(circle.updatedAt),
            name: circle.title || circle.name || '',
            category: '文化活動',
            body: circle.body,
            icon: circle.icon,
          })
        );

        setSportsCircles(fetchedSports);
        setCultureCircles(fetchedCulture);
      } catch (error) {
        console.error('[CommunityCircle] 住民サークルデータ取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCircles();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          住人サークル紹介
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { name: 'スポーツ・運動', circles: sportsCircles },
    { name: '文化活動', circles: cultureCircles },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
        住人サークル紹介
      </h3>

      {/* サークル活動の説明 */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
        <p className="text-gray-700 leading-relaxed mb-4">
          私たちの団地生活をより楽しく、快適に過ごすために、有志の方々により、いろいろなサークルが結成されています。教養、趣味、体力増強を目的にサークル活動が活発に行われています。
        </p>
        <div className="space-y-2 text-gray-700 text-sm">
          <p>
            団地内サークルは、サークル登録申請願の提出により自治会に登録され、団地公認のサークルとなります。
          </p>
          <p>
            登録されたサークル名は、集会所の窓口でわかりますので、加入希望者は、その責任者まで問い合わせてください。
          </p>
          <p className="font-medium text-gray-900 mt-4">
            現在登録されているサークルは次のとおりです。
          </p>
        </div>
      </div>

      {/* 分類別に表示 */}
      {categories.map(({ name, circles }) => {
        if (circles.length === 0) return null;

        return (
          <div key={name} className="mb-12">
            <h4 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-600">
              {name}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {circles.map((circle) => (
                <div
                  key={circle.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
                >
                  <div className="flex items-start space-x-4">
                    {circle.icon && (
                      <div className="text-4xl">{circle.icon}</div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {circle.name}
                      </h4>
                      <div
                        className="text-gray-600 mb-4 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: circle.body }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

