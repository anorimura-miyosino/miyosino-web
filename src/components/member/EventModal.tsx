'use client';

import { useEffect } from 'react';
import { Event } from '@/types/events';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({
  event,
  isOpen,
  onClose,
}: EventModalProps) {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // モーダルが開いている時は背景のスクロールを無効化
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) {
    return null;
  }

  // 日時をフォーマットする関数
  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}年${month}月${day}日（${weekday}） ${hours}:${minutes}`;
  };

  // 日時から時間のみを取得する関数
  const formatTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 今後のイベントかどうかを判定
  const isUpcoming = new Date(event.startDateTime) >= new Date();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* モーダルコンテンツ */}
      <div
        className={`relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border-l-4 ${
          isUpcoming ? 'border-purple-500' : 'border-gray-300'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {event.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDateTime(event.startDateTime)}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="閉じる"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 本文 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* イベント情報 */}
          <div className="mb-6 space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">時間</p>
              <p className="text-gray-900 font-medium">
                {formatTime(event.startDateTime)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">場所</p>
              <p className="text-gray-900 font-medium">{event.venue}</p>
            </div>
            {event.owner && (
              <div>
                <p className="text-sm text-gray-600 mb-1">主催</p>
                <p className="text-gray-900 font-medium">{event.owner}</p>
              </div>
            )}
            {event.category && (
              <div>
                <p className="text-sm text-gray-600 mb-1">カテゴリ</p>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded whitespace-nowrap">
                  {event.category}
                </span>
              </div>
            )}
          </div>

          {/* 説明 */}
          {event.description && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">説明</h3>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
