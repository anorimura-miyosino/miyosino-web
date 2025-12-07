'use client';

import { useEffect, useState, useMemo } from 'react';
import { Circular } from '@/types/circulars';
import {
  fetchCirculars,
  fetchCircularYearMonths,
  YearMonth,
} from '@/shared/utils/kintone';
import { getToken } from '@/shared/utils/auth';

// 日付をフォーマットする関数
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// ファイルをダウンロードする関数
async function downloadFile(fileKey: string, fileName: string) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const apiEndpoint =
      process.env.NEXT_PUBLIC_CIRCULARS_API_URL ||
      'https://miyosino-circulars.anorimura-miyosino.workers.dev';
    const url = `${apiEndpoint}/circulars/file?fileKey=${encodeURIComponent(fileKey)}`;

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
    console.error('[CircularsContent] downloadFile error:', error);
    alert(
      error instanceof Error
        ? error.message
        : 'ファイルのダウンロードに失敗しました'
    );
  }
}

export default function CircularsContent() {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [yearMonths, setYearMonths] = useState<YearMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 現在月を取得
  const getCurrentYearMonth = (): YearMonth => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    };
  };

  // 選択された年（全期間は空文字列）
  const [selectedYear, setSelectedYear] = useState<string>('');

  // 選択された月（全月は空文字列）
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  // 選択されたカテゴリ（全カテゴリは空文字列）
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // 年月一覧と資料一覧を取得
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [circularsData, yearMonthsData] = await Promise.all([
          fetchCirculars(),
          fetchCircularYearMonths(),
        ]);

        setCirculars(circularsData);
        setYearMonths(yearMonthsData);

        // デフォルトで現在月を選択（存在しない場合は最新の年月を選択）
        const currentYearMonth = getCurrentYearMonth();
        const hasCurrentMonth = yearMonthsData.some(
          (ym: YearMonth) =>
            ym.year === currentYearMonth.year &&
            ym.month === currentYearMonth.month
        );

        if (hasCurrentMonth) {
          setSelectedYear(currentYearMonth.year.toString());
          setSelectedMonth(currentYearMonth.month.toString());
        } else if (yearMonthsData.length > 0) {
          setSelectedYear(yearMonthsData[0].year.toString());
          setSelectedMonth(yearMonthsData[0].month.toString());
        }
      } catch (err) {
        console.error('[CircularsContent] loadData error:', err);
        setError(
          err instanceof Error ? err.message : '資料の取得に失敗しました'
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 年と月の一覧を取得
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    yearMonths.forEach((ym) => {
      yearSet.add(ym.year);
    });
    return Array.from(yearSet).sort((a, b) => b - a); // 新しい順
  }, [yearMonths]);

  const months = useMemo(() => {
    if (!selectedYear) return [];
    const monthSet = new Set<number>();
    yearMonths
      .filter((ym) => ym.year.toString() === selectedYear)
      .forEach((ym) => {
        monthSet.add(ym.month);
      });
    return Array.from(monthSet).sort((a, b) => b - a); // 新しい順
  }, [yearMonths, selectedYear]);

  // カテゴリの一覧を取得
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    circulars.forEach((circular) => {
      if (circular.category) {
        categorySet.add(circular.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [circulars]);

  // フィルタリングされた資料一覧
  const filteredCirculars = useMemo(() => {
    return circulars.filter((circular) => {
      // 年でフィルタリング
      if (selectedYear) {
        const circularDate = new Date(circular.distributionDate);
        const circularYear = circularDate.getFullYear();
        if (circularYear.toString() !== selectedYear) {
          return false;
        }
      }

      // 月でフィルタリング
      if (selectedMonth) {
        const circularDate = new Date(circular.distributionDate);
        const circularMonth = circularDate.getMonth() + 1;
        if (circularMonth.toString() !== selectedMonth) {
          return false;
        }
      }

      // カテゴリでフィルタリング
      if (selectedCategory && circular.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [circulars, selectedYear, selectedMonth, selectedCategory]);

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

  const handleViewClick = (circular: Circular) => {
    if (circular.file?.fileKey) {
      downloadFile(circular.file.fileKey, circular.file.name || 'download');
    } else if (circular.file) {
      alert('ファイル情報が不完全です');
    } else {
      alert('ファイルがありません');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">資料一覧</h2>

        {/* フィルター */}
        {!loading && !error && circulars.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4">
            {/* 年フィルター */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="year-filter"
                className="text-sm font-medium text-gray-700"
              >
                年:
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
              <div className="flex items-center gap-2">
                <label
                  htmlFor="month-filter"
                  className="text-sm font-medium text-gray-700"
                >
                  月:
                </label>
                <select
                  id="month-filter"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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

            {/* カテゴリフィルター */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="category-filter"
                className="text-sm font-medium text-gray-700"
              >
                カテゴリ:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">すべて</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredCirculars.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>該当する資料がありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCirculars.map((circular) => (
              <div
                key={circular.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {circular.title}
                      </h3>
                      {circular.file && (
                        <button
                          onClick={() => handleViewClick(circular)}
                          className="text-teal-600 hover:text-teal-700 underline text-sm cursor-pointer"
                        >
                          {circular.file.name}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">
                        {circular.category}
                      </span>
                      <span>
                        配布日: {formatDate(circular.distributionDate)}
                      </span>
                      <span>配布元: {circular.distributor}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
