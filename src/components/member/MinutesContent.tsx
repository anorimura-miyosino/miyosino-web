'use client';

import { useEffect, useState, useMemo } from 'react';
import { Meeting } from '@/types/minutes';
import {
  fetchMeetings,
  fetchMeetingsYearMonths,
  YearMonth,
} from '@/shared/utils/kintone';
import { getToken } from '@/shared/utils/auth';

// 音声プレーヤーコンポーネント
function AudioPlayer({
  fileKey,
  fileName,
}: {
  fileKey: string;
  fileName: string;
}) {
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  // ユーザーが再生ボタンを押した時だけ音声ファイルを読み込む
  const handleLoadAudio = async () => {
    if (audioUrl || loading) return; // 既に読み込み済み、または読み込み中なら何もしない

    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) {
        throw new Error('認証トークンがありません');
      }

      const apiEndpoint =
        process.env.NEXT_PUBLIC_MINUTES_API_URL ||
        'https://miyosino-minutes.anorimura-miyosino.workers.dev';
      const url = `${apiEndpoint}/minutes/file?fileKey=${encodeURIComponent(fileKey)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
          }
          throw new Error('認証に失敗しました');
        }
        throw new Error('音声ファイルの取得に失敗しました');
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      setAudioUrl(blobUrl);
    } catch (err) {
      console.error('[AudioPlayer] loadAudio error:', err);
      setError(
        err instanceof Error
          ? err.message
          : '音声ファイルの読み込みに失敗しました'
      );
    } finally {
      setLoading(false);
    }
  };

  // 音声ファイルをダウンロード
  const handleDownload = async () => {
    if (downloading) return;

    setDownloading(true);
    try {
      await downloadFile(fileKey, fileName);
    } catch (err) {
      console.error('[AudioPlayer] download error:', err);
      alert(
        err instanceof Error
          ? err.message
          : '音声ファイルのダウンロードに失敗しました'
      );
    } finally {
      setDownloading(false);
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (audioUrl) {
        window.URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="space-y-3">
      {/* ファイル名とダウンロードボタン（関連資料・議事録と同じスタイル） */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full text-left px-3 py-2 bg-white rounded-md border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm text-gray-700 group-hover:text-indigo-700 truncate">
          {downloading ? 'ダウンロード中...' : fileName}
        </span>
        {downloading ? (
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 flex-shrink-0 ml-2"></div>
        ) : (
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )}
      </button>

      {/* 再生コントロール */}
      {!audioUrl && !loading && !error && (
        <button
          onClick={handleLoadAudio}
          className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>音声を読み込む</span>
        </button>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-md">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">読み込み中...</p>
        </div>
      )}

      {error && (
        <div className="space-y-2">
          <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={handleLoadAudio}
            className="w-full px-4 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm transition-colors"
          >
            再試行
          </button>
        </div>
      )}

      {audioUrl && (
        <div className="bg-white rounded-md border border-gray-200 p-3">
          <audio controls className="w-full" src={audioUrl} preload="none">
            お使いのブラウザは音声再生に対応していません。
          </audio>
        </div>
      )}
    </div>
  );
}

// 日時をフォーマットする関数
function formatDateTime(dateTimeString: string): {
  date: string;
  time: string;
} {
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    date: `${year}年${month}月${day}日`,
    time: `${hours}:${minutes}`,
  };
}

// ファイルをダウンロードする関数
async function downloadFile(fileKey: string, fileName: string) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const apiEndpoint =
      process.env.NEXT_PUBLIC_MINUTES_API_URL ||
      'https://miyosino-minutes.anorimura-miyosino.workers.dev';
    const url = `${apiEndpoint}/minutes/file?fileKey=${encodeURIComponent(fileKey)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        throw new Error('認証に失敗しました');
      }
      throw new Error(
        `ファイルのダウンロードに失敗しました: ${response.status}`
      );
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('[MinutesContent] downloadFile error:', error);
    alert(
      error instanceof Error
        ? error.message
        : 'ファイルのダウンロードに失敗しました'
    );
  }
}

export default function MinutesContent() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [yearMonths, setYearMonths] = useState<YearMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 年月をフォーマットする関数
  const formatYearMonth = (year: number, month: number) => {
    return `${year}年${month}月`;
  };

  // 現在月を取得
  const getCurrentYearMonth = (): YearMonth => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    };
  };

  // 選択された年月（デフォルトは現在月）
  const [selectedYearMonth, setSelectedYearMonth] = useState<YearMonth>(
    getCurrentYearMonth()
  );

  // 選択されたカテゴリ（空文字列は「すべて」を意味する）
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // カテゴリの一覧を取得
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    meetings.forEach((meeting) => {
      if (meeting.category) {
        categorySet.add(meeting.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [meetings]);

  // フィルタリングされた会議情報
  const filteredMeetings = useMemo(() => {
    return meetings.filter((meeting) => {
      // カテゴリでフィルタリング
      if (selectedCategory && meeting.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [meetings, selectedCategory]);

  // 初期表示時に年月一覧を取得
  useEffect(() => {
    const loadYearMonths = async () => {
      try {
        setLoading(true);
        const yearMonthsData = await fetchMeetingsYearMonths();

        // 現在の年月より未来の年月を除外
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const filteredYearMonths = yearMonthsData.filter((ym: YearMonth) => {
          if (ym.year > currentYear) {
            return false;
          }
          if (ym.year === currentYear && ym.month > currentMonth) {
            return false;
          }
          return true;
        });

        setYearMonths(filteredYearMonths);

        // 現在月が存在する場合は選択、存在しない場合は最新の年月を選択
        const currentYearMonth = getCurrentYearMonth();
        const hasCurrentMonth = filteredYearMonths.some(
          (ym: YearMonth) =>
            ym.year === currentYearMonth.year &&
            ym.month === currentYearMonth.month
        );

        if (hasCurrentMonth) {
          setSelectedYearMonth(currentYearMonth);
        } else if (filteredYearMonths.length > 0) {
          setSelectedYearMonth(filteredYearMonths[0]);
        }
      } catch (err) {
        console.error('[MinutesContent] Failed to load year months:', err);
        setError('年月一覧の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadYearMonths();
  }, []);

  // 選択された年月が変更されたらデータを取得
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const meetingsData = await fetchMeetings(
          selectedYearMonth.year,
          selectedYearMonth.month
        );
        setMeetings(meetingsData);
      } catch (err) {
        console.error('[MinutesContent] loadData error:', err);
        setError(
          err instanceof Error ? err.message : '会議情報の取得に失敗しました'
        );
        setMeetings([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedYearMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">会議情報</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* フィルタ（左側） */}
          {(yearMonths.length > 0 || categories.length > 0) && (
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                {yearMonths.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      年月で絞り込み
                    </h3>
                    <div className="space-y-1 max-h-[300px] overflow-y-auto">
                      {yearMonths.map((ym) => {
                        const isSelected =
                          selectedYearMonth?.year === ym.year &&
                          selectedYearMonth?.month === ym.month;
                        return (
                          <button
                            key={`${ym.year}-${ym.month}`}
                            onClick={() => setSelectedYearMonth(ym)}
                            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {formatYearMonth(ym.year, ym.month)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 会議情報一覧（右側） */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500 text-sm">読み込み中...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 rounded-lg p-8 text-center">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            ) : filteredMeetings.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500 text-sm">
                  {selectedYearMonth
                    ? `${formatYearMonth(selectedYearMonth.year, selectedYearMonth.month)}の会議情報はありません。`
                    : '現在、会議情報はありません。'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="mb-4">
                      {meeting.category && (
                        <div className="mb-2">
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                            {meeting.category}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-900">
                        {meeting.title}
                      </h3>
                    </div>

                    {/* 会議情報 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">日時</p>
                        <p className="text-gray-900 font-medium">
                          {formatDateTime(meeting.StartDateTime).date}{' '}
                          {formatDateTime(meeting.StartDateTime).time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">場所</p>
                        <p className="text-gray-900 font-medium">
                          {meeting.venue}
                        </p>
                      </div>
                    </div>

                    {/* 資料・議事録・音声ファイル */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 資料 */}
                        {meeting.materials &&
                          Array.isArray(meeting.materials) &&
                          meeting.materials.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-3">
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <h4 className="text-sm font-semibold text-gray-700">
                                  資料
                                </h4>
                                <span className="text-xs text-gray-500">
                                  ({meeting.materials.length}件)
                                </span>
                              </div>
                              <div className="space-y-2">
                                {meeting.materials.map(
                                  (
                                    material: { fileKey: string; name: string },
                                    index: number
                                  ) => (
                                    <button
                                      key={index}
                                      onClick={() => {
                                        downloadFile(
                                          material.fileKey,
                                          material.name
                                        );
                                      }}
                                      className="w-full text-left px-3 py-2 bg-white rounded-md border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
                                    >
                                      <span className="text-sm text-gray-700 group-hover:text-indigo-700 truncate">
                                        {material.name}
                                      </span>
                                      <svg
                                        className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                      </svg>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* 議事録 */}
                        {meeting.minutes && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
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
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <h4 className="text-sm font-semibold text-gray-700">
                                議事録
                              </h4>
                            </div>
                            <button
                              onClick={() => {
                                if (meeting.minutes) {
                                  downloadFile(
                                    meeting.minutes.fileKey,
                                    meeting.minutes.name
                                  );
                                }
                              }}
                              className="w-full px-3 py-2 bg-white rounded-md border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors flex items-center justify-between group"
                            >
                              <span className="text-sm text-gray-700 group-hover:text-indigo-700 truncate">
                                {meeting.minutes.name}
                              </span>
                              <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* 音声ファイル */}
                        {meeting.audio && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
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
                                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                />
                              </svg>
                              <h4 className="text-sm font-semibold text-gray-700">
                                音声ファイル
                              </h4>
                            </div>
                            <AudioPlayer
                              fileKey={meeting.audio.fileKey}
                              fileName={meeting.audio.name}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
