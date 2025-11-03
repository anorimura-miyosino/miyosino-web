'use client';

import { useState } from 'react';
import { sharedFacilities } from './data';

export default function SharedFacilitiesSection() {
  const [activeTab, setActiveTab] = useState<'common' | 'services'>('common');

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* タブナビゲーション */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('common')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'common'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              共用部
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'services'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-500'
              }`}
            >
              団地内のサービス
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'common' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                共用部
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sharedFacilities.commonAreas.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center">
                      <div className="text-6xl text-white opacity-80">
                        {facility.id === 1
                          ? '🏢'
                          : facility.id === 2
                            ? '🚗'
                            : facility.id === 3
                              ? '🚲'
                              : facility.id === 4
                                ? '🌳'
                                : facility.id === 5
                                  ? '🗑️'
                                  : facility.id === 6
                                    ? '🎾'
                                    : facility.id === 7
                                      ? '🏊‍♀️'
                                      : facility.id === 8
                                        ? '📋'
                                        : facility.id === 9
                                          ? '🏛️'
                                          : '🏢'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {facility.name}
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {facility.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">収容人数：</span>
                          <span className="ml-2">{facility.capacity}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">予約：</span>
                          <span className="ml-2">{facility.reservation}</span>
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
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
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

          {activeTab === 'services' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                団地内のサービス
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sharedFacilities.apartmentServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">
                        {service.id === 1
                          ? '🎾'
                          : service.id === 2
                            ? '💼'
                            : service.id === 3
                              ? '🏊‍♀️'
                              : '🅿️'}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {service.name}
                        </h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">収容人数：</span>
                            <span className="ml-2">{service.capacity}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">予約：</span>
                            <span className="ml-2">{service.reservation}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">利用料金：</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {service.fee}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            設備・特徴：
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, index) => (
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
                          予約する
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
