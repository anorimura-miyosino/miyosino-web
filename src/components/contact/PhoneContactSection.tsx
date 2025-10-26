'use client';

import { useState } from 'react';

const contactInfo = {
  phone: '03-1234-5678',
  fax: '03-1234-5679',
  email: 'info@miyosino-apartments.com',
  businessHours: {
    weekdays: '9:00 - 18:00',
    weekends: '10:00 - 17:00',
    holidays: '休業',
  },
  address: '〒123-4567 東京都渋谷区三芳野1-2-3',
};

export default function PhoneContactSection() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          お電話でのお問い合わせ
        </h2>
        <p className="text-gray-600">
          お急ぎの場合は、お電話でお気軽にお問い合わせください
        </p>
      </div>

      <div className="space-y-6">
        {/* 電話番号 */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              {contactInfo.phone}
            </a>
            <button
              onClick={() => copyToClipboard(contactInfo.phone)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              title="電話番号をコピー"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          {isCopied && (
            <p className="text-sm text-green-600">電話番号をコピーしました</p>
          )}
          <p className="text-sm text-gray-500">タップして電話をかける</p>
        </div>

        {/* 営業時間 */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            営業時間
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">平日</span>
              <span className="font-medium text-gray-900">
                {contactInfo.businessHours.weekdays}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">土日祝</span>
              <span className="font-medium text-gray-900">
                {contactInfo.businessHours.weekends}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">祝日</span>
              <span className="font-medium text-gray-900">
                {contactInfo.businessHours.holidays}
              </span>
            </div>
          </div>
        </div>

        {/* その他の連絡先 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">メール</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">住所</p>
              <p className="text-gray-900">{contactInfo.address}</p>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">
                お電話でのお問い合わせについて
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 営業時間外は留守番電話にて承ります</li>
                <li>• お名前とお電話番号をお聞かせください</li>
                <li>• 折り返しお電話いたします</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
