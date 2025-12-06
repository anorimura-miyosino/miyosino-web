'use client';

import { communityActivities } from './data';

export default function CommunityActivities() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {communityActivities.neighborhoodActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                    <span className="ml-2">{activity.participants}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

