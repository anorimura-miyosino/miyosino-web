'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Announcement,
  getPriorityBorderColor,
  getPriorityBadgeStyle,
  getPriorityText,
} from './data';
import AnnouncementModal from './AnnouncementModal';
import { fetchAnnouncements } from '@/shared/utils/kintone';
import { redirectToLogin } from '@/shared/utils/auth';

interface AnnouncementsSectionProps {
  announcements?: Announcement[];
  limit?: number; // 表示件数の制限（1か月分など）
  showMoreLink?: boolean; // 「もっと見る」リンクを表示するか
}

export default function AnnouncementsSection({
  announcements: propAnnouncements,
  limit,
  showMoreLink = false,
}: AnnouncementsSectionProps) {
  // お知らせデータの状態
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // モーダル用の状態
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Kintoneからお知らせを取得
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);

        // propAnnouncementsが指定されている場合はそれを使用
        if (propAnnouncements) {
          setAnnouncements(propAnnouncements);
          setLoading(false);
          return;
        }

        // Kintoneからお知らせを取得（年月指定なしで全件取得）
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error(
          '[AnnouncementsSection] Failed to load announcements:',
          err
        );

        // 認証エラーの場合はログインにリダイレクト
        if (err instanceof Error && err.message.includes('認証')) {
          // トークンを削除してからリダイレクト
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
          }
          redirectToLogin();
          return;
        }

        setError('お知らせの取得に失敗しました');
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, [propAnnouncements]);
  // 日付をフォーマットする関数
  const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}年${month}月${day}日`;
  };

  // 現在日時から1か月前までのお知らせを取得（未来の日付と「準備中」を除外）
  const getRecentAnnouncements = () => {
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    return announcements
      .filter((announcement) => {
        // 「公開」のみを表示対象とする
        if (announcement.publish && announcement.publish !== '公開') {
          return false;
        }

        const announcementDate = new Date(announcement.date);
        // 日付のみを比較（時刻は無視）
        announcementDate.setHours(0, 0, 0, 0);
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        const oneMonthAgoDate = new Date(oneMonthAgo);
        oneMonthAgoDate.setHours(0, 0, 0, 0);

        // 現在日時から1か月前までの範囲内で、かつ未来の日付でないかチェック
        return announcementDate >= oneMonthAgoDate && announcementDate <= today;
      })
      .sort((a, b) => {
        // 新しい順にソート
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
  };

  // 未来の日付と「準備中」のお知らせを除外する関数
  const filterFutureAnnouncements = (announcements: Announcement[]) => {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    return announcements
      .filter((announcement) => {
        // 「公開」のみを表示対象とする
        if (announcement.publish && announcement.publish !== '公開') {
          return false;
        }

        const announcementDate = new Date(announcement.date);
        announcementDate.setHours(0, 0, 0, 0);
        return announcementDate <= today;
      })
      .sort((a, b) => {
        // 新しい順にソート
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });
  };

  // showMoreLinkがtrueの場合は現在日時から1か月前までのお知らせのみ、limitが指定されている場合はその制限も適用
  // そうでなければ全てのお知らせを表示（未来の日付は除外）
  const displayedAnnouncements = showMoreLink
    ? limit
      ? getRecentAnnouncements().slice(0, limit)
      : getRecentAnnouncements()
    : limit
      ? filterFutureAnnouncements(announcements).slice(0, limit)
      : filterFutureAnnouncements(announcements);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <svg
            className="w-6 h-6 text-blue-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
          お知らせ
        </h2>
        {showMoreLink && (
          <Link
            href="/member/announcements"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            もっと見る
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
      {loading ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-500 text-sm">読み込み中...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-lg p-8 text-center">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      ) : displayedAnnouncements.length === 0 ? (
        <p className="text-gray-500 text-sm">現在、お知らせはありません。</p>
      ) : (
        <div className="space-y-4">
          {displayedAnnouncements.map((announcement) => (
            <button
              key={announcement.id}
              onClick={() => {
                setSelectedAnnouncement(announcement);
                setIsModalOpen(true);
              }}
              className={`w-full text-left border-l-4 ${getPriorityBorderColor(announcement.importance)} pl-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer rounded-r-lg`}
            >
              <div className="mb-2">
                <span
                  className={`px-2 py-1 ${getPriorityBadgeStyle(announcement.importance)} text-xs rounded whitespace-nowrap`}
                >
                  {getPriorityText(announcement.importance)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900">
                  {announcement.title}
                </h3>
                <span className="text-gray-500 text-xs">
                  {formatDate(announcement.date)}
                </span>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                クリックして詳細を表示
              </div>
            </button>
          ))}
        </div>
      )}

      {/* モーダル */}
      <AnnouncementModal
        announcement={selectedAnnouncement}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAnnouncement(null);
        }}
      />
    </div>
  );
}
