'use client';

import { surroundingFacilities } from './data';

export default function SurroundingFacilitiesMapSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            周辺施設マップ
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地周辺の便利な施設をマップでご紹介
            <br />
            徒歩圏内の施設をカテゴリ別に整理しています
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {surroundingFacilities.map((facility) => (
              <div
                key={facility.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-2xl">{facility.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {facility.name}
                    </h4>
                    <p className="text-xs text-gray-500">{facility.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {facility.description}
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <span>📍</span>
                  <span className="ml-1">{facility.distance}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 簡易マップ */}
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              周辺施設配置図
            </h4>
            <div className="relative bg-white rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏠</div>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  かわつる三芳野団地
                </p>
                <p className="text-gray-600">
                  周辺施設の詳細な配置図は
                  <br />
                  管理組合事務所でご確認いただけます
                </p>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  詳細マップを見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
