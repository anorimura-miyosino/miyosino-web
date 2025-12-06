'use client';

import { useState, useEffect } from 'react';
import type {
  CommunityActivity,
  MicroCMSCommunityActivity,
  MicroCMSCommunityActivityListResponse,
} from '@/types/community';
import { CONTENT_CATEGORIES } from '@/types/categories';

export default function CommunityActivities() {
  const [activities, setActivities] = useState<CommunityActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Cloudflare Workers経由でMicroCMSから自治会活動データを取得
  // APIキーはサーバーサイド（Cloudflare Workers）で管理され、クライアントに露出しません
  useEffect(() => {
    const fetchActivities = async () => {
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
            '[CommunityActivities] API endpoint is not set. Please configure NEXT_PUBLIC_CONTENTS_API_ENDPOINT or NEXT_PUBLIC_PHOTOS_API_ENDPOINT environment variable.'
          );
          setLoading(false);
          return;
        }

        // Cloudflare Workers経由で取得
        const url = new URL(contentsApiEndpoint);
        url.searchParams.append(
          'category',
          CONTENT_CATEGORIES.COMMUNITY_ACTIVITIES
        ); // カテゴリIDでフィルタ
        url.searchParams.append('orders', 'order'); // 表示順でソート
        url.searchParams.append('getAll', 'true'); // 全件取得

        const response = await fetch(url.toString(), {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch activities: ${response.status} ${response.statusText}`
          );
        }

        const data: MicroCMSCommunityActivityListResponse =
          await response.json();

        console.log(
          `[CommunityActivities] 取得した全データ数: ${data.contents.length}`
        );

        // クライアント側でカテゴリフィルタリング（category.idがCONTENT_CATEGORIES.COMMUNITY_ACTIVITIESのもののみ）
        const filteredContents = data.contents.filter(
          (activity: MicroCMSCommunityActivity) => {
            if (!Array.isArray(activity.category)) {
              return false;
            }
            return activity.category.some(
              (cat) => cat && cat.id === CONTENT_CATEGORIES.COMMUNITY_ACTIVITIES
            );
          }
        );

        console.log(
          `[CommunityActivities] フィルタリング後のデータ数: ${filteredContents.length}`
        );

        const fetchedActivities: CommunityActivity[] = filteredContents.map(
          (activity: MicroCMSCommunityActivity) => ({
            id: activity.id,
            createdAt: new Date(activity.createdAt),
            updatedAt: new Date(activity.updatedAt),
            title: activity.title,
            body: activity.body,
            icon: activity.icon,
          })
        );

        setActivities(fetchedActivities);
      } catch (error) {
        console.error(
          '[CommunityActivities] 自治会活動データ取得エラー:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          自治会活動
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
        自治会活動
      </h3>

      {/* 自治会活動の説明 */}
      <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
        <p className="text-gray-700 leading-relaxed">
          私たちのかわつる三芳野団地を、より楽しく、快適で、安全な街にするため、居住者の地域生活の向上や良好なコミュニティの形成、そして居住者相互間のコミュニケーションや秩序維持のために、様々な自治会活動を行っています。ここでは、その活動内容をご紹介します。
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">自治会活動データがありません。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
            >
              <div className="flex items-start space-x-4">
                {activity.icon && (
                  <div className="text-4xl">{activity.icon}</div>
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {activity.title}
                  </h4>
                  <div
                    className="text-gray-600 mb-4 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: activity.body }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
