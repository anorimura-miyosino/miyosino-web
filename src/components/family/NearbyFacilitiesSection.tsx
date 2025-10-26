'use client';

import { useState } from 'react';
import { nearbyFacilities } from './data';

export default function NearbyFacilitiesSection() {
  const [activeTab, setActiveTab] = useState<
    | 'shopping'
    | 'restaurants'
    | 'lifeServices'
    | 'medical'
    | 'education'
    | 'publicTransport'
    | 'leisure'
  >('shopping');

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            周辺の施設・お店
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            子育てに必要な施設やお店が徒歩圏内に充実
            <br />
            日々の生活に便利で安心な環境を提供します
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('shopping')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'shopping'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              ショッピング
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'restaurants'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              レストラン・カフェ
            </button>
            <button
              onClick={() => setActiveTab('lifeServices')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'lifeServices'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              生活サービス
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'medical'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              医療・健康
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              教育施設
            </button>
            <button
              onClick={() => setActiveTab('publicTransport')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'publicTransport'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              公共施設・交通
            </button>
            <button
              onClick={() => setActiveTab('leisure')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'leisure'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              レジャー・公園
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'shopping' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                ショッピング施設
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.shopping.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{facility.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {facility.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {facility.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-pink-600">
                              {facility.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">営業時間：</span>
                            <span className="ml-2">{facility.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{facility.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            特徴・サービス：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {facility.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'restaurants' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                レストラン・カフェ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nearbyFacilities.restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{restaurant.icon}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {restaurant.name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        {restaurant.category}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {restaurant.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">距離：</span>
                        <span className="ml-2 font-semibold text-pink-600">
                          {restaurant.distance}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">営業時間：</span>
                        <span className="ml-2">{restaurant.hours}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">電話：</span>
                        <span className="ml-2">{restaurant.phone}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-gray-700 mb-2">
                        子育てサポート：
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {restaurant.features.map((feature, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-purple-500 text-white py-2 px-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 text-xs font-medium">
                      詳細を見る
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'lifeServices' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                生活サービス
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.lifeServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{service.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {service.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-pink-600">
                              {service.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">営業時間：</span>
                            <span className="ml-2">{service.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{service.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            サービス内容：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, index) => (
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

          {activeTab === 'medical' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                医療・健康施設
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.medical.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{facility.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {facility.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {facility.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-red-600">
                              {facility.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">診療科：</span>
                            <span className="ml-2">{facility.category}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">診療時間：</span>
                            <span className="ml-2">{facility.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{facility.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            診療内容・特徴：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {facility.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                教育施設
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.education.map((school) => (
                  <div
                    key={school.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{school.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {school.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {school.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-blue-600">
                              {school.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">種類：</span>
                            <span className="ml-2">{school.category}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">利用時間：</span>
                            <span className="ml-2">{school.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{school.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            特徴・取り組み：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {school.features.map((feature, index) => (
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

          {activeTab === 'publicTransport' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                公共施設・交通
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.publicTransport.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{facility.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {facility.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {facility.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {facility.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">種類：</span>
                            <span className="ml-2">{facility.category}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">利用時間：</span>
                            <span className="ml-2">{facility.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{facility.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            サービス・特徴：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {facility.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium">
                          詳細を見る
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leisure' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                レジャー・公園
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.leisure.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{facility.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {facility.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {facility.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-orange-600">
                              {facility.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">種類：</span>
                            <span className="ml-2">{facility.category}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">利用時間：</span>
                            <span className="ml-2">{facility.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{facility.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            設備・特徴：
                          </h5>
                          <div className="flex flex-wrap gap-2">
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
                        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium">
                          詳細を見る
                        </button>
                      </div>
                    </div>
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
