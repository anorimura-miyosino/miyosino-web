'use client';

import { useMemo, useState, useEffect } from 'react';
import { Event } from '@/types/events';
import EventModal from './EventModal';

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
  // タブの状態（'list' | 'calendar'）
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');

  // モーダルの状態
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // カレンダー表示用の現在の年月
  const [calendarYear, setCalendarYear] = useState<number>(
    new Date().getFullYear()
  );
  const [calendarMonth, setCalendarMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  // 年月選択UIの表示状態
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);

  // イベントをクリックしたときのハンドラ
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

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

  // カレンダー用: 日付をキーとしてイベントをグループ化
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, Event[]> = {};
    filteredEvents.forEach((event) => {
      const eventDate = new Date(event.startDateTime);
      const dateKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  }, [filteredEvents]);

  // カレンダー用: 指定された年月のカレンダーグリッドを生成
  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth - 1, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // 週の最初の日（日曜日）

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      events: Event[];
    }> = [];

    const currentDate = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      // 6週間分
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      days.push({
        date: new Date(currentDate),
        isCurrentMonth:
          currentDate.getMonth() === calendarMonth - 1 &&
          currentDate.getFullYear() === calendarYear,
        events: eventsByDate[dateKey] || [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [calendarYear, calendarMonth, eventsByDate]);

  // カレンダーの前月・次月に移動
  const goToPreviousMonth = () => {
    if (calendarMonth === 1) {
      setCalendarYear(calendarYear - 1);
      setCalendarMonth(12);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (calendarMonth === 12) {
      setCalendarYear(calendarYear + 1);
      setCalendarMonth(1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  // カレンダー用の年と月の一覧を取得（イベントが存在する年月の範囲）
  const calendarYears = useMemo(() => {
    if (allEvents.length === 0) {
      // イベントがない場合は現在年から前後5年
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
    }
    const yearSet = new Set<number>();
    allEvents.forEach((event) => {
      const eventDate = new Date(event.startDateTime);
      yearSet.add(eventDate.getFullYear());
    });
    const yearList = Array.from(yearSet).sort((a, b) => b - a);
    // 最小年から最大年まで、前後1年分を追加
    if (yearList.length > 0) {
      const minYear = Math.min(...yearList);
      const maxYear = Math.max(...yearList);
      const years: number[] = [];
      for (let y = minYear - 1; y <= maxYear + 1; y++) {
        years.push(y);
      }
      return years.sort((a, b) => b - a);
    }
    return [new Date().getFullYear()];
  }, [allEvents]);

  const calendarMonths = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'list' ? 'イベント一覧' : 'イベントカレンダー'}
          </h2>
          {/* タブ切り替え */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              一覧
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              カレンダー
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* フィルタ（左側） - 一覧表示時のみ表示 */}
          {activeTab === 'list' &&
            (categories.length > 0 || years.length > 0) && (
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-gray-50 rounded-lg p-4 sticky top-4 space-y-6">
                  {/* カテゴリフィルタ */}
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

                  {/* 年月フィルタ */}
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

          {/* コンテンツエリア */}
          <div className="flex-1 min-w-0">
            {activeTab === 'list' ? (
              /* 一覧表示 */
              <>
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
                            {formatDateTime(event.startDateTime)} -{' '}
                            {event.title}
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
                            {formatDateTime(event.startDateTime)} -{' '}
                            {event.title}
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
              </>
            ) : (
              /* カレンダー表示 */
              <div>
                {/* カテゴリフィルタ（カレンダー上部） */}
                {categories.length > 0 && (
                  <div className="mb-4">
                    <label
                      htmlFor="category-filter-calendar"
                      className="text-sm font-semibold text-gray-700 mb-2 block"
                    >
                      カテゴリで絞り込み
                    </label>
                    <select
                      id="category-filter-calendar"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

                {/* カレンダーヘッダー */}
                <div className="flex items-center justify-between mb-4 relative">
                  <button
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="前の月"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowYearMonthPicker(!showYearMonthPicker)}
                    className="px-4 py-2 text-xl font-bold text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {calendarYear}年{calendarMonth}月
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="次の月"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
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
                  </button>

                  {/* 年月選択ドロップダウン */}
                  {showYearMonthPicker && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-[300px]">
                      <div className="space-y-4">
                        {/* 年の選択 */}
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            年
                          </label>
                          <select
                            value={calendarYear}
                            onChange={(e) =>
                              setCalendarYear(parseInt(e.target.value))
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            {calendarYears.map((year) => (
                              <option key={year} value={year}>
                                {year}年
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* 月の選択（12か月すべて表示） */}
                        <div>
                          <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            月
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {calendarMonths.map((month) => (
                              <button
                                key={month}
                                onClick={() => {
                                  setCalendarMonth(month);
                                  setShowYearMonthPicker(false);
                                }}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                  calendarMonth === month
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {month}月
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* カレンダーグリッド */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* 曜日ヘッダー */}
                  <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                    {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
                      <div
                        key={day}
                        className="p-2 text-center text-sm font-semibold text-gray-700"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* カレンダー日付 */}
                  <div className="grid grid-cols-7">
                    {calendarDays.map((day, index) => {
                      // 今日の日付かどうかを判定
                      const today = new Date();
                      const isToday =
                        day.date.getFullYear() === today.getFullYear() &&
                        day.date.getMonth() === today.getMonth() &&
                        day.date.getDate() === today.getDate();

                      return (
                        <div
                          key={index}
                          className={`min-h-[100px] border-r border-b border-gray-200 p-2 ${
                            day.isCurrentMonth
                              ? 'bg-white'
                              : 'bg-gray-50 text-gray-400'
                          } ${day.date.getDay() === 0 ? 'text-red-600' : ''} ${
                            day.date.getDay() === 6 ? 'text-blue-600' : ''
                          } ${isToday ? 'bg-purple-50 border-2 border-purple-500' : ''}`}
                        >
                          <div
                            className={`text-sm font-medium mb-1 ${
                              isToday
                                ? 'bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center'
                                : ''
                            }`}
                          >
                            {day.date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {day.events.slice(0, 3).map((event) => (
                              <button
                                key={event.id}
                                onClick={() => handleEventClick(event)}
                                className="w-full text-left text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded truncate hover:bg-purple-200 transition-colors cursor-pointer"
                                title={event.title}
                              >
                                {formatTime(event.startDateTime)} {event.title}
                              </button>
                            ))}
                            {day.events.length > 3 && (
                              <div className="text-xs text-gray-500">
                                +{day.events.length - 3}件
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* イベント詳細モーダル */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
