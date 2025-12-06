'use client';

import { useState } from 'react';
import CommonFacilitiesSection from './CommonFacilitiesSection';
import ServicesSection from './ServicesSection';

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
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              共有施設
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'services'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              サービス
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'common' && <CommonFacilitiesSection />}
          {activeTab === 'services' && <ServicesSection />}
        </div>
      </div>
    </section>
  );
}
