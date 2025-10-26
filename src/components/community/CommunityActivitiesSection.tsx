'use client';

import { useState } from 'react';
import { communityActivities } from './data';

export default function CommunityActivitiesSection() {
  const [activeTab, setActiveTab] = useState<
    'events' | 'activities' | 'circles'
  >('events');

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
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'events'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              コミュニティ活動・イベント
            </button>
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
          {activeTab === 'events' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                コミュニティ活動・イベント（トップ）
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {communityActivities.topEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <div className="text-6xl text-white opacity-80">
                        {event.id === 1 ? '🎆' : event.id === 2 ? '🌾' : '🎄'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">開催時期：</span>
                          <span className="ml-2">{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">参加者数：</span>
                          <span className="ml-2">{event.participants}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                自治会活動
              </h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {communityActivities.residentCircles.map((circle) => (
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
                        <span className="ml-2">{circle.meetingFrequency}</span>
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
                    <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium">
                      参加申し込み
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
