'use client';

import { useState, useEffect } from 'react';
import {
  MemberAuthWrapper,
  MemberPageHeader,
  EventsContent,
} from '@/components/member';
import { fetchEvents } from '@/shared/utils/kintone';
import { Event } from '@/types/events';
import { redirectToLogin } from '@/shared/utils/auth';

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchEvents();
        setUpcomingEvents(data.upcomingEvents);
        setPastEvents(data.pastEvents);
      } catch (err) {
        console.error('[EventsPage] Failed to load events:', err);

        // 認証エラーの場合はログインにリダイレクト
        if (err instanceof Error && err.message.includes('認証')) {
          // トークンを削除してからリダイレクト
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
          }
          redirectToLogin();
          return;
        }

        setError('イベントの取得に失敗しました');
        setUpcomingEvents([]);
        setPastEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="イベント予定"
          description="団地内のイベントスケジュールを確認できます"
          gradientFrom="from-purple-600"
          gradientTo="to-purple-800"
          textColor="text-purple-100"
          hoverTextColor="hover:text-white"
        />
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
                <p className="text-gray-600">イベントを読み込み中...</p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center text-red-600">{error}</div>
            </div>
          </div>
        ) : (
          <EventsContent
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
          />
        )}
      </div>
    </MemberAuthWrapper>
  );
}
