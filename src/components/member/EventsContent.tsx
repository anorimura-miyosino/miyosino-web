'use client';

import { useMemo, useState, useEffect } from 'react';
import { Event } from '@/types/events';

interface EventsContentProps {
  upcomingEvents?: Event[];
  pastEvents?: Event[];
}

// 日時をフォーマットする関数
function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}年${month}月${day}日（${weekday}） ${hours}:${minutes}`;
}

// 日時から時間のみを取得する関数
function formatTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function EventsContent({
  upcomingEvents = [],
  pastEvents = [],
}: EventsContentProps) {
  // すべてのイベントを結合
  const allEvents = useMemo(() => {
    return [...upcomingEvents, ...pastEvents];
  }, [upcomingEvents, pastEvents]);

  // 選択された年（全期間は空文字列）
  const [selectedYear, setSelectedYear] = useState<string>('');

  // 選択された月（全月は空文字列）
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // 選択されたカテゴリ（全カテゴリは空文字列）
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // 年と月の一覧を取得
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    allEvents.forEach((event) => {
      const eventDate = new Date(event.startDateTime);
      yearSet.add(eventDate.getFullYear());
    });
    return Array.from(yearSet).sort((a, b) => b - a); // 新しい順
  }, [allEvents]);

  const months = useMemo(() => {
    if (!selectedYear) return [];
    const monthSet = new Set<number>();
    allEvents
      .filter((event) => {
        const eventDate = new Date(event.startDateTime);
        return eventDate.getFullYear().toString() === selectedYear;
      })
      .forEach((event) => {
        const eventDate = new Date(event.startDateTime);
        monthSet.add(eventDate.getMonth() + 1);
      });
    return Array.from(monthSet).sort((a, b) => b - a); // 新しい順
  }, [allEvents, selectedYear]);

  // カテゴリの一覧を取得
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    allEvents.forEach((event) => {
      if (event.category) {
        categorySet.add(event.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [allEvents]);

  // フィルタリングされたイベント
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // 年でフィルタリング
      if (selectedYear) {
        const eventDate = new Date(event.startDateTime);
        const eventYear = eventDate.getFullYear();
        if (eventYear.toString() !== selectedYear) {
          return false;
        }
      }

      // 月でフィルタリング
      if (selectedMonth) {
        const eventDate = new Date(event.startDateTime);
        const eventMonth = eventDate.getMonth() + 1;
        if (eventMonth.toString() !== selectedMonth) {
          return false;
        }
      }

      // カテゴリでフィルタリング
      if (selectedCategory && event.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [allEvents, selectedYear, selectedMonth, selectedCategory]);

  // フィルタリングされたイベントを今後のイベントと過去のイベントに分離
  const filteredUpcomingEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents
      .filter((event) => {
        const eventDate = new Date(event.startDateTime);
        return eventDate >= now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.startDateTime);
        const dateB = new Date(b.startDateTime);
        return dateA.getTime() - dateB.getTime();
      });
  }, [filteredEvents]);

  const filteredPastEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents
      .filter((event) => {
        const eventDate = new Date(event.startDateTime);
        return eventDate < now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.startDateTime);
        const dateB = new Date(b.startDateTime);
        return dateB.getTime() - dateA.getTime();
      });
  }, [filteredEvents]);

  // 年が変更されたら月をリセット
  useEffect(() => {
    if (selectedYear && months.length > 0) {
      // 選択された年に対応する月が存在する場合、最初の月を選択
      if (!months.includes(parseInt(selectedMonth))) {
        setSelectedMonth(months[0].toString());
      }
    } else {
      setSelectedMonth('');
    }
  }, [selectedYear, months, selectedMonth]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">イベント一覧</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* フィルタ（左側） */}
          {(categories.length > 0 || years.length > 0) && (
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-4 sticky top-4 space-y-6">
                {/* カテゴリフィルタ（上） */}
                {categories.length > 0 && (
                  <div>
                    <label
                      htmlFor="category-filter"
                      className="text-sm font-semibold text-gray-700 mb-2 block"
                    >
                      カテゴリで絞り込み
                    </label>
                    <select
                      id="category-filter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">すべて</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 年月フィルタ（下） */}
                {years.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      年月で絞り込み
                    </h3>
                    <div className="space-y-3">
                      {/* 年フィルター */}
                      <div>
                        <label
                          htmlFor="year-filter"
                          className="text-sm text-gray-700 mb-1 block"
                        >
                          年
                        </label>
                        <select
                          id="year-filter"
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">すべて</option>
                          {years.map((year) => (
                            <option key={year} value={year.toString()}>
                              {year}年
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* 月フィルター（年が選択されている場合のみ表示） */}
                      {selectedYear && (
                        <div>
                          <label
                            htmlFor="month-filter"
                            className="text-sm text-gray-700 mb-1 block"
                          >
                            月
                          </label>
                          <select
                            id="month-filter"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="">すべて</option>
                            {months.map((month) => (
                              <option key={month} value={month.toString()}>
                                {month}月
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* イベント一覧（右側） */}
          <div className="flex-1 min-w-0">
            {/* 今後のイベント */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                今後のイベント
              </h3>
              <div className="space-y-4">
                {filteredUpcomingEvents.length > 0 ? (
                  filteredUpcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-purple-500 pl-4 py-2"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {formatDateTime(event.startDateTime)} - {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        時間: {formatTime(event.startDateTime)} / 場所:{' '}
                        {event.venue}
                        {event.owner && ` / 主催: ${event.owner}`}
                      </p>
                      {event.description && (
                        <div
                          className="text-gray-700 text-sm mt-2"
                          dangerouslySetInnerHTML={{
                            __html: event.description,
                          }}
                        />
                      )}
                      {event.category && (
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded whitespace-nowrap">
                            {event.category}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    今後のイベントはありません
                  </p>
                )}
              </div>
            </div>

            {/* 過去のイベント */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                過去のイベント
              </h3>
              <div className="space-y-4">
                {filteredPastEvents.length > 0 ? (
                  filteredPastEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border-l-4 border-gray-300 pl-4 py-2"
                    >
                      <h3 className="font-semibold text-gray-900">
                        {formatDateTime(event.startDateTime)} - {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        時間: {formatTime(event.startDateTime)} / 場所:{' '}
                        {event.venue}
                        {event.owner && ` / 主催: ${event.owner}`}
                      </p>
                      {event.description && (
                        <div
                          className="text-gray-700 text-sm mt-2"
                          dangerouslySetInnerHTML={{
                            __html: event.description,
                          }}
                        />
                      )}
                      {event.category && (
                        <div className="mt-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded whitespace-nowrap">
                            {event.category}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    過去のイベントはありません
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
