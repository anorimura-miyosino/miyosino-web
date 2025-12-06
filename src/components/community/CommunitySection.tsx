'use client';

import { useState } from 'react';
import CommunityActivities from './CommunityActivities';
import CommunityCircle from './CommunityCircle';

export default function CommunitySection() {
  const [activeTab, setActiveTab] = useState<'activities' | 'circles'>(
    'activities'
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* タブナビゲーション */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'activities'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              自治会活動
            </button>
            <button
              onClick={() => setActiveTab('circles')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'circles'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              住人サークル紹介
            </button>
          </div>
        </div>

        {/* タブコンテンツ */}
        <div className="min-h-[600px]">
          {activeTab === 'activities' && <CommunityActivities />}
          {activeTab === 'circles' && <CommunityCircle />}
        </div>
      </div>
    </section>
  );
}

