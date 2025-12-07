'use client';

import { useState } from 'react';
import {
  downloadFile,
  FileDownloadEndpoint,
} from '@/shared/utils/fileDownload';

interface FileDownloadButtonProps {
  fileKey: string;
  fileName: string;
  endpoint: FileDownloadEndpoint;
  className?: string;
  onError?: (error: Error) => void;
  fileSize?: string; // ファイルサイズ（バイト数の文字列、例: "87270206"）
}

/**
 * 統一されたファイルダウンロードボタンコンポーネント
 *
 * indigo色の背景、ホバー時はより濃い色に変化
 * ファイル名を表示し、ダウンロードアイコンを右側に配置
 * ローディング時はスピナー表示
 */
// ファイルサイズをフォーマットする関数
function formatFileSize(size?: string): string {
  if (!size) return '';
  const bytes = parseInt(size, 10);
  if (isNaN(bytes)) return '';

  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

export default function FileDownloadButton({
  fileKey,
  fileName,
  endpoint,
  className = '',
  onError,
  fileSize,
}: FileDownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;

    setDownloading(true);
    try {
      await downloadFile(fileKey, fileName, endpoint);
    } catch (error) {
      console.error('[FileDownloadButton] download error:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'ファイルのダウンロードに失敗しました';
      alert(errorMessage);
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className={`w-full text-left px-3 py-2 bg-indigo-600 text-white rounded-md border border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 transition-colors flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm text-white truncate">
          {downloading ? 'ダウンロード中...' : fileName}
        </span>
        {fileSize && !downloading && (
          <span className="text-xs text-indigo-200 mt-0.5">
            {formatFileSize(fileSize)}
          </span>
        )}
      </div>
      {downloading ? (
        <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white flex-shrink-0 ml-2"></div>
      ) : (
        <svg
          className="w-5 h-5 text-white flex-shrink-0 ml-2"
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
  );
}
