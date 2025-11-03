'use client';

import { useState } from 'react';
import { communityActivities } from './data';

export default function CommunityActivitiesSection() {
  const [activeTab, setActiveTab] = useState<'activities' | 'circles'>(
    'activities'
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            コミュニティ活動
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            住民同士の絆を深める様々な活動を通じて、
            <br />
            豊かなコミュニティライフを築いています
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'activities'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              自治会活動
            </button>
            <button
              onClick={() => setActiveTab('circles')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'circles'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              住人サークル紹介
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'activities' && (
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {communityActivities.neighborhoodActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{activity.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {activity.title}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {activity.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">開催頻度：</span>
                            <span className="ml-2">{activity.frequency}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">参加者数：</span>
                            <span className="ml-2">
                              {activity.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'circles' && (
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
              {['スポーツ・運動', '文化活動'].map((category) => {
                const circlesInCategory =
                  communityActivities.residentCircles.filter(
                    (circle) => (circle as any).category === category
                  );

                if (circlesInCategory.length === 0) return null;

                return (
                  <div key={category} className="mb-12">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-500">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {circlesInCategory.map((circle) => (
                        <div
                          key={circle.id}
                          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                        >
                          <h4 className="text-xl font-bold text-gray-900 mb-3">
                            {circle.name}
                          </h4>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {circle.description}
                          </p>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">メンバー数：</span>
                              <span className="ml-2">{circle.members}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">活動頻度：</span>
                              <span className="ml-2">
                                {circle.meetingFrequency}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">連絡先：</span>
                              <span className="ml-2">{circle.contact}</span>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">
                              主な活動内容：
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {circle.activities.map((activity, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                          {(circle as any).website ||
                          (circle as any).instagram ||
                          (circle as any).facebook ? (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                公式リンク：
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {(circle as any).website && (
                                  <a
                                    href={(circle as any).website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-xs underline"
                                  >
                                    🌐{' '}
                                    {(circle as any).websiteLabel ||
                                      'ホームページ'}
                                  </a>
                                )}
                                {(circle as any).instagram && (
                                  <a
                                    href={(circle as any).instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 hover:text-pink-800 text-xs underline"
                                  >
                                    📷 Instagram
                                  </a>
                                )}
                                {(circle as any).facebook && (
                                  <a
                                    href={(circle as any).facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 hover:text-blue-900 text-xs underline"
                                  >
                                    📘 Facebook
                                  </a>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
