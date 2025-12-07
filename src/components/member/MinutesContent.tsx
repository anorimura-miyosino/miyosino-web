'use client';

import { useEffect, useState } from 'react';
import { Meeting } from '@/types/minutes';
import { fetchMeetings } from '@/shared/utils/kintone';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAudio() {
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
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
          throw new Error('音声ファイルの取得に失敗しました');
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        setAudioUrl(blobUrl);
      } catch (error) {
        console.error('[AudioPlayer] loadAudio error:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAudio();

    // クリーンアップ
    return () => {
      if (audioUrl) {
        window.URL.revokeObjectURL(audioUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileKey]);

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">音声ファイル:</span>
          <span className="text-sm text-gray-900">{fileName}</span>
        </div>
        <p className="text-sm text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">音声ファイル:</span>
          <span className="text-sm text-gray-900">{fileName}</span>
        </div>
        <p className="text-sm text-red-500">
          音声ファイルの読み込みに失敗しました
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">音声ファイル:</span>
        <span className="text-sm text-gray-900">{fileName}</span>
      </div>
      <audio controls className="w-full max-w-md" src={audioUrl}>
        お使いのブラウザは音声再生に対応していません。
      </audio>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 会議情報を取得
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const meetingsData = await fetchMeetings();
        setMeetings(meetingsData);
      } catch (err) {
        console.error('[MinutesContent] loadData error:', err);
        setError(
          err instanceof Error ? err.message : '会議情報の取得に失敗しました'
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">会議情報</h2>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : meetings.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>会議情報がありません</p>
          </div>
        ) : (
          <div className="space-y-6">
            {meetings.map((meeting) => (
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
                    <p className="text-gray-900 font-medium">{meeting.venue}</p>
                  </div>
                </div>

                {/* 資料・議事録・音声ファイル */}
                <div className="space-y-3 mt-4 pt-4 border-t border-gray-200">
                  {/* 資料 */}
                  {meeting.materials &&
                    Array.isArray(meeting.materials) &&
                    meeting.materials.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 mb-1">資料:</p>
                        <div className="flex flex-wrap gap-2">
                          {meeting.materials.map(
                            (
                              material: { fileKey: string; name: string },
                              index: number
                            ) => (
                              <a
                                key={index}
                                href={`#`}
                                className="text-indigo-600 hover:text-indigo-700 underline text-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadFile(material.fileKey, material.name);
                                }}
                              >
                                {material.name}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* 議事録 */}
                  {meeting.minutes && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">議事録:</span>
                        <a
                          href={`#`}
                          className="text-indigo-600 hover:text-indigo-700 underline text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            if (meeting.minutes) {
                              downloadFile(
                                meeting.minutes.fileKey,
                                meeting.minutes.name
                              );
                            }
                          }}
                        >
                          {meeting.minutes.name}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* 音声ファイル */}
                  {meeting.audio && (
                    <AudioPlayer
                      fileKey={meeting.audio.fileKey}
                      fileName={meeting.audio.name}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
