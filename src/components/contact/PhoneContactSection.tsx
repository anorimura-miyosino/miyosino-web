'use client';

import { useState } from 'react';

const contactInfo = {
  phone: '049-232-3638',
  fax: '049-232-8656',
  email: 'office@k-miyosino.com',
  businessHours: {
    weekdays: '9:00 - 17:00',
    weekends: '9:00 - 12:00',
    holidays: '休業',
  },
  address: '350-1177 埼玉県川越市かわつる三芳野１番地',
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
    <div className="bg-white rounded-2xl shadow-lg border-l-4 border-green-600 p-8 lg:p-10 relative">
      {/* セクション識別用のバッジ */}
      <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        電話
      </div>
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
        <div className="w-16 h-1 bg-green-600 rounded-full mx-auto mt-2"></div>
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
              <span className="text-gray-600">平日/土曜日</span>
              <span className="font-medium text-gray-900">
                {contactInfo.businessHours.weekdays}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">日曜日</span>
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
      </div>
    </div>
  );
}
