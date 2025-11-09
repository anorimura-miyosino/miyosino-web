'use client';

import { familyEnvironment } from './data';

export default function FamilyEnvironmentSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            子育て環境の魅力（トップ）
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地は、子育てファミリーに最適な環境を提供
            <br />
            安心・安全で充実した子育てライフをサポートします
          </p>
        </div>

        {/* トップ機能 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {familyEnvironment.topFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border border-gray-200"
            >
              <div className="text-6xl mb-6 text-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {feature.features.map((item, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ファミリーサービス */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            ファミリー向けサービス
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {familyEnvironment.familyServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {service.name}
                </h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">連絡先：</span>
                    <span className="ml-2">{service.contact}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">利用料金：</span>
                    <span className="ml-2 font-semibold text-pink-600">
                      {service.fee}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    提供サービス：
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {service.services.map((item, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-sm font-medium">
                  詳細を見る
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA セクション */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              子育て環境についてもっと知りたい方へ
            </h3>
            <p className="text-lg mb-6 opacity-90">
              実際に団地を見学して、子育て環境を体験してみませんか？
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                見学予約
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors duration-200">
                資料請求
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
