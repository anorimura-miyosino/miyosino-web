'use client';

import { useState } from 'react';
import { nearbyFacilities } from './data';

type Facility = {
  id: number;
  name: string;
  description: string;
  distance: string;
  category: string;
  icon: string;
  features?: string[];
  hours?: string;
  phone?: string;
  website?: string;
};

// Facility型を他の変数にも適用
type Service = Facility;
type School = Facility;

export default function NearbyFacilitiesSection() {
  const [activeTab, setActiveTab] = useState<
    | 'shoppingStreet'
    | 'shopping'
    | 'lifeServices'
    | 'medical'
    | 'education'
    | 'publicTransport'
    | 'leisure'
  >('shoppingStreet');

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
              onClick={() => setActiveTab('shoppingStreet')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'shoppingStreet'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              かわつる商店街
            </button>
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
              交通
            </button>
            <button
              onClick={() => setActiveTab('leisure')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTab === 'leisure'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              レジャー・公園・観光
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'shoppingStreet' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {nearbyFacilities.shoppingStreet.name}
                </h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  {nearbyFacilities.shoppingStreet.description}
                </p>
                {nearbyFacilities.shoppingStreet.website && (
                  <div className="mt-4">
                    <a
                      href={nearbyFacilities.shoppingStreet.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium"
                    >
                      公式サイトを見る
                    </a>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  ...nearbyFacilities.shopping.filter(
                    (shop) =>
                      shop.features && shop.features.includes('かわつる商店街')
                  ),
                  ...nearbyFacilities.medical.filter(
                    (facility) =>
                      facility.features &&
                      facility.features.includes('かわつる商店街')
                  ),
                ].map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {facility.features
                              .filter((f) => f !== 'かわつる商店街')
                              .map((feature, index) => (
                                <span
                                  key={index}
                                  className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                          </div>
                        </div>
                        {facility.website && (
                          <a
                            href={facility.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium text-center"
                          >
                            公式サイトを見る
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'shopping' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                ショッピング
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  ...nearbyFacilities.shopping.filter(
                    (shop) =>
                      shop.features && shop.features.includes('かわつる商店街')
                  ),
                  ...nearbyFacilities.shopping.filter(
                    (shop) =>
                      !shop.features ||
                      !shop.features.includes('かわつる商店街')
                  ),
                ].map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                          {facility.distance && (
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">アクセス：</span>
                              <span className="ml-2 font-semibold text-pink-600">
                                {facility.distance}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {facility.features?.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        {facility.website && (
                          <a
                            href={facility.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium text-center"
                          >
                            公式サイトを見る
                          </a>
                        )}
                      </div>
                    </div>
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
                {nearbyFacilities.lifeServices.map((service: Service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                            <span className="font-medium">アクセス：</span>
                            <span className="ml-2 font-semibold text-pink-600">
                              {service.distance}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {service.features?.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        {service.website && (
                          <a
                            href={service.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium text-center"
                          >
                            公式サイトを見る
                          </a>
                        )}
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
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                            <span className="font-medium">アクセス：</span>
                            <span className="ml-2 font-semibold text-red-600">
                              {facility.distance}
                            </span>
                          </div>
                        </div>
                        {facility.website && (
                          <a
                            href={facility.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium text-center"
                          >
                            公式サイトを見る
                          </a>
                        )}
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
                {nearbyFacilities.education.map((school: School) => (
                  <div
                    key={school.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                            <span className="font-medium">アクセス：</span>
                            <span className="ml-2 font-semibold text-blue-600">
                              {school.distance}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {school.category}
                            </span>
                          </div>
                        </div>
                        {school.website && (
                          <a
                            href={school.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium text-center"
                          >
                            公式サイトを見る
                          </a>
                        )}
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
                交通
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {nearbyFacilities.publicTransport.map((facility) => (
                  <div
                    key={facility.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{facility.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">
                          {facility.name}
                        </h4>
                        <div className="space-y-4 mb-4">
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700">
                              アクセス：
                            </span>
                            <span className="ml-2 font-semibold text-green-600">
                              {facility.distance}
                            </span>
                          </div>
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {facility.features?.map((feature, index) => (
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
                        {facility.website && (
                          <a
                            href={facility.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium text-center"
                          >
                            公式サイトを見る
                          </a>
                        )}
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
                レジャー・公園・観光
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...nearbyFacilities.leisure, ...nearbyFacilities.tourism].map(
                  (facility) => (
                    <div
                      key={facility.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-200"
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
                              <span className="font-medium">アクセス：</span>
                              <span className="ml-2 font-semibold text-orange-600">
                                {facility.distance}
                              </span>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {facility.features?.map((feature, index) => (
                                <span
                                  key={index}
                                  className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          {facility.website && (
                            <a
                              href={facility.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium text-center"
                            >
                              公式サイトを見る
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
