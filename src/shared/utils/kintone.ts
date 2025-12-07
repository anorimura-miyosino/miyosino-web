/**
 * kintone API関連のユーティリティ関数
 *
 * 組合員専用ページからkintoneのお知らせデータを取得するための関数
 */

import { Announcement, GreenWellnessFile } from '@/components/member/data';
import { getToken } from './auth';

const ANNOUNCEMENTS_API_ENDPOINT =
  process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL ||
  'https://miyosino-announcements.anorimura-miyosino.workers.dev';

const GREENWELLNESS_API_ENDPOINT =
  process.env.NEXT_PUBLIC_GREENWELLNESS_API_URL ||
  'https://miyosino-greenwellness.anorimura-miyosino.workers.dev';

interface YearMonth {
  year: number;
  month: number;
}

interface AnnouncementsResponse {
  announcements: Announcement[];
}

interface YearMonthsResponse {
  yearMonths: YearMonth[];
}

interface GreenWellnessFilesResponse {
  files: GreenWellnessFile[];
}

/**
 * kintoneからお知らせデータを取得
 * @param year 年（オプション）
 * @param month 月（オプション）
 * @returns お知らせデータの配列
 */
export async function fetchAnnouncements(
  year?: number,
  month?: number
): Promise<Announcement[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${ANNOUNCEMENTS_API_ENDPOINT}/announcements`);
    if (year) {
      url.searchParams.append('year', year.toString());
    }
    if (month) {
      url.searchParams.append('month', month.toString());
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 401エラーの場合、トークンを削除して認証エラーを投げる
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        throw new Error('認証に失敗しました');
      }
      throw new Error(
        `お知らせの取得に失敗しました: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as AnnouncementsResponse;

    // 日付文字列をDateオブジェクトに変換
    return data.announcements.map((announcement) => ({
      ...announcement,
      date: new Date(announcement.date),
    }));
  } catch (error) {
    console.error('[Kintone] fetchAnnouncements error:', error);
    throw error;
  }
}

/**
 * kintoneからお知らせが存在する年月の一覧を取得
 * @returns 年月の配列
 */
export async function fetchYearMonths(): Promise<YearMonth[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${ANNOUNCEMENTS_API_ENDPOINT}/announcements/years`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 401エラーの場合、トークンを削除して認証エラーを投げる
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        throw new Error('認証に失敗しました');
      }
      throw new Error(
        `年月一覧の取得に失敗しました: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as YearMonthsResponse;
    return data.yearMonths;
  } catch (error) {
    console.error('[Kintone] fetchYearMonths error:', error);
    throw error;
  }
}

/**
 * kintoneからグリーンウェルネスファイル一覧を取得
 * @returns グリーンウェルネスファイルの配列
 */
export async function fetchGreenWellnessFiles(): Promise<GreenWellnessFile[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${GREENWELLNESS_API_ENDPOINT}/greenwellness`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 401エラーの場合、トークンを削除して認証エラーを投げる
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        throw new Error('認証に失敗しました');
      }
      throw new Error(
        `グリーンウェルネスファイルの取得に失敗しました: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as GreenWellnessFilesResponse;
    return data.files;
  } catch (error) {
    console.error('[Kintone] fetchGreenWellnessFiles error:', error);
    throw error;
  }
}
