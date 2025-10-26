'use client';

import { useState } from 'react';
import { childcareSupport } from './data';

export default function ChildcareSupportSection() {
  const [activeTab, setActiveTab] = useState<
    'childcare' | 'support' | 'medical' | 'education'
  >('childcare');

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            子育て支援施設
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            子育てをサポートする各種施設が充実
            <br />
            安心して子育てができる環境を提供します
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex flex-wrap">
            <button
              onClick={() => setActiveTab('childcare')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'childcare'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-purple-500'
              }`}
            >
              保育園・こども園
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'support'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-purple-500'
              }`}
            >
              支援センター
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'medical'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-purple-500'
              }`}
            >
              医療施設
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-purple-500'
              }`}
            >
              教育施設
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'childcare' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                保育園・こども園
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {childcareSupport.childcareCenters.map((center) => (
                  <div
                    key={center.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{center.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {center.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {center.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-purple-600">
                              {center.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">種類：</span>
                            <span className="ml-2">{center.type}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">営業時間：</span>
                            <span className="ml-2">{center.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">定員：</span>
                            <span className="ml-2">{center.capacity}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{center.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            特徴・サービス：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {center.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-medium">
                            詳細を見る
                          </button>
                          <button className="flex-1 bg-transparent border-2 border-purple-500 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors duration-200 text-sm font-medium">
                            見学予約
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                支援センター
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {childcareSupport.supportCenters.map((center) => (
                  <div
                    key={center.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{center.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {center.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {center.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">距離：</span>
                            <span className="ml-2 font-semibold text-purple-600">
                              {center.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">種類：</span>
                            <span className="ml-2">{center.type}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">営業時間：</span>
                            <span className="ml-2">{center.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">サービス：</span>
                            <span className="ml-2 font-semibold text-purple-600">
                              {center.services}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">電話：</span>
                            <span className="ml-2">{center.phone}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            提供サービス：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {center.features.map((feature, index) => (
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

          {activeTab === 'medical' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                医療施設
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {childcareSupport.medicalFacilities.map((facility) => (
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
                            <span className="ml-2 font-semibold text-purple-600">
                              {facility.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">診療科：</span>
                            <span className="ml-2">{facility.type}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">診療時間：</span>
                            <span className="ml-2">{facility.hours}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">救急対応：</span>
                            <span className="ml-2 font-semibold text-red-600">
                              {facility.emergency}
                            </span>
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
                        <div className="flex gap-2">
                          <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium">
                            詳細を見る
                          </button>
                          <button className="flex-1 bg-transparent border-2 border-red-500 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm font-medium">
                            予約する
                          </button>
                        </div>
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
                {childcareSupport.educationFacilities.map((school) => (
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
                            <span className="ml-2 font-semibold text-purple-600">
                              {school.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">種類：</span>
                            <span className="ml-2">{school.type}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">生徒数：</span>
                            <span className="ml-2">{school.students}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">クラス数：</span>
                            <span className="ml-2">{school.classes}</span>
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
        </div>
      </div>
    </section>
  );
}
