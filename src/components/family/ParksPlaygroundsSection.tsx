'use client';

import { useState } from 'react';
import { parksPlaygrounds } from './data';

export default function ParksPlaygroundsSection() {
  const [activeTab, setActiveTab] = useState<'parks' | 'indoor' | 'sports'>(
    'parks'
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            公園・遊び場
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            お子様が安全に遊べる公園や遊び場が充実
            <br />
            屋外・屋内問わず、様々な遊び体験ができます
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('parks')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'parks'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              近隣公園
            </button>
            <button
              onClick={() => setActiveTab('indoor')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'indoor'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              屋内遊び場
            </button>
            <button
              onClick={() => setActiveTab('sports')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'sports'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              スポーツ施設
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'parks' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                近隣公園
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {parksPlaygrounds.nearbyParks.map((park) => (
                  <div
                    key={park.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                      <div className="text-6xl text-white opacity-80">
                        {park.icon}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {park.name}
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {park.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">距離：</span>
                          <span className="ml-2 font-semibold text-green-600">
                            {park.distance}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">規模：</span>
                          <span className="ml-2">{park.size}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">対象年齢：</span>
                          <span className="ml-2">{park.ageRange}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">利用時間：</span>
                          <span className="ml-2">{park.hours}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">安全対策：</span>
                          <span className="ml-2">{park.safety}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">
                          設備・遊具：
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {park.features.map((feature, index) => (
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'indoor' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                屋内遊び場
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {parksPlaygrounds.indoorPlaygrounds.map((playground) => (
                  <div
                    key={playground.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{playground.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {playground.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {playground.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {playground.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">カテゴリ：</span>
                            <span className="ml-2">{playground.category}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">対象年齢：</span>
                            <span className="ml-2">{playground.ageRange}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">営業時間：</span>
                            <span className="ml-2">{playground.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">利用料金：</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {playground.fee}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{playground.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            設備・特徴：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {playground.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sports' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                スポーツ施設
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {parksPlaygrounds.sportsFacilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{facility.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {facility.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        {facility.category}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {facility.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">距離：</span>
                        <span className="ml-2 font-semibold text-green-600">
                          {facility.distance}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">対象年齢：</span>
                        <span className="ml-2">{facility.ageRange}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">営業時間：</span>
                        <span className="ml-2">{facility.hours}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">利用料金：</span>
                        <span className="ml-2 font-semibold text-green-600">
                          {facility.fee}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">電話：</span>
                        <span className="ml-2">{facility.phone}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-gray-700 mb-2">
                        設備・サービス：
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {facility.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 px-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-xs font-medium">
                      詳細を見る
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
