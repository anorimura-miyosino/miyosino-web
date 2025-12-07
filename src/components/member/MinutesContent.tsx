'use client';

import { Meeting } from '@/types/minutes';

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

export default function MinutesContent() {
  // サンプルデータ（後でAPIから取得するように変更予定）
  const meetings = [
    {
      id: '1',
      title: '2024年度 組合総会',
      StartDateTime: '2024-12-15T14:00:00',
      venue: '組合会議室',
      category: '総会',
      createdAt: new Date(),
      updatedAt: new Date(),
      materials: [
        {
          fileKey: 'sample-file-key-1',
          name: '議案書.pdf',
          contentType: 'application/pdf',
          size: '1024000',
        },
        {
          fileKey: 'sample-file-key-1-2',
          name: '資料1.pdf',
          contentType: 'application/pdf',
          size: '512000',
        },
      ],
      minutes: {
        fileKey: 'sample-file-key-2',
        name: '議事録.pdf',
        contentType: 'application/pdf',
        size: '2048000',
      },
      audio: {
        fileKey: 'sample-file-key-3',
        name: '録音ファイル.mp3',
        contentType: 'audio/mpeg',
        size: '5120000',
      },
    },
    {
      id: '2',
      title: '2024年度 班長会',
      StartDateTime: '2024-11-20T13:00:00',
      venue: '組合会議室',
      category: '班長会',
      createdAt: new Date(),
      updatedAt: new Date(),
      materials: [
        {
          fileKey: 'sample-file-key-4',
          name: '議案書.pdf',
          contentType: 'application/pdf',
          size: '1024000',
        },
      ],
      minutes: {
        fileKey: 'sample-file-key-5',
        name: '議事録.pdf',
        contentType: 'application/pdf',
        size: '2048000',
      },
      audio: {
        fileKey: 'sample-file-key-6',
        name: '録音ファイル.mp3',
        contentType: 'audio/mpeg',
        size: '5120000',
      },
    },
  ] as unknown as Meeting[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">会議情報</h2>
        <div className="space-y-6">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {meeting.title}
                </h3>
                {meeting.category && (
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                    {meeting.category}
                  </span>
                )}
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
                                // TODO: ファイルダウンロード処理を実装
                                console.log(
                                  'Download material:',
                                  material.fileKey
                                );
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
                          // TODO: ファイルダウンロード処理を実装
                          console.log(
                            'Download minutes:',
                            meeting.minutes?.fileKey
                          );
                        }}
                      >
                        {meeting.minutes.name}
                      </a>
                    </div>
                  </div>
                )}

                {/* 音声ファイル */}
                {meeting.audio && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        音声ファイル:
                      </span>
                      <span className="text-sm text-gray-900">
                        {meeting.audio.name}
                      </span>
                    </div>
                    <audio
                      controls
                      className="w-full max-w-md"
                      src={`#`} // TODO: 音声ファイルのURLを取得
                    >
                      お使いのブラウザは音声再生に対応していません。
                    </audio>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="text-center text-gray-500 py-8">
            <p>過去の会議情報は順次追加予定です</p>
          </div>
        </div>
      </div>
    </div>
  );
}
