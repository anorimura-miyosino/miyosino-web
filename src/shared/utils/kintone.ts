/**
 * kintone API関連のユーティリティ関数
 *
 * 組合員専用ページからkintoneのお知らせデータを取得するための関数
 */

import { Announcement, GreenWellnessFile } from '@/components/member/data';
import { Circular } from '@/types/circulars';
import { Meeting } from '@/types/minutes';
import { getToken } from './auth';

const ANNOUNCEMENTS_API_ENDPOINT =
  process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL ||
  'https://miyosino-announcements.anorimura-miyosino.workers.dev';

const GREENWELLNESS_API_ENDPOINT =
  process.env.NEXT_PUBLIC_GREENWELLNESS_API_URL ||
  'https://miyosino-greenwellness.anorimura-miyosino.workers.dev';

const CIRCULARS_API_ENDPOINT =
  process.env.NEXT_PUBLIC_CIRCULARS_API_URL ||
  'https://miyosino-circulars.anorimura-miyosino.workers.dev';

const MINUTES_API_ENDPOINT =
  process.env.NEXT_PUBLIC_MINUTES_API_URL ||
  'https://miyosino-minutes.anorimura-miyosino.workers.dev';

export interface YearMonth {
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

interface CircularsResponse {
  circulars: Circular[];
}

interface MeetingsResponse {
  meetings: Meeting[];
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

/**
 * kintoneから配布資料一覧を取得
 * @returns 配布資料データの配列
 */
export async function fetchCirculars(): Promise<Circular[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${CIRCULARS_API_ENDPOINT}/circulars`);

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
        `配布資料の取得に失敗しました: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as CircularsResponse;
    return data.circulars;
  } catch (error) {
    console.error('[Kintone] fetchCirculars error:', error);
    throw error;
  }
}

/**
 * kintoneから配布資料が存在する年月の一覧を取得
 * @returns 年月の配列
 */
export async function fetchCircularYearMonths(): Promise<YearMonth[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${CIRCULARS_API_ENDPOINT}/circulars/years`);

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
    console.error('[Kintone] fetchCircularYearMonths error:', error);
    throw error;
  }
}

/**
 * kintoneから会議情報一覧を取得
 * @returns 会議情報データの配列
 */
/**
 * kintoneから会議情報データを取得
 * @param year 年（オプション）
 * @param month 月（オプション）
 * @returns 会議情報データの配列
 */
export async function fetchMeetings(
  year?: number,
  month?: number
): Promise<Meeting[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${MINUTES_API_ENDPOINT}/minutes`);
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
        `会議情報の取得に失敗しました: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as MeetingsResponse;

    // StartDateTimeを文字列として保持（ISO 8601形式）
    return data.meetings.map((meeting) => ({
      ...meeting,
      createdAt: new Date(meeting.createdAt),
      updatedAt: new Date(meeting.updatedAt),
    }));
  } catch (error) {
    console.error('[Kintone] fetchMeetings error:', error);
    throw error;
  }
}

interface MeetingsYearMonthsResponse {
  yearMonths: YearMonth[];
}

/**
 * kintoneから会議情報が存在する年月の一覧を取得
 * @returns 年月の配列
 */
export async function fetchMeetingsYearMonths(): Promise<YearMonth[]> {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('認証トークンがありません');
    }

    const url = new URL(`${MINUTES_API_ENDPOINT}/minutes/years`);

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

    const data = (await response.json()) as MeetingsYearMonthsResponse;
    return data.yearMonths;
  } catch (error) {
    console.error('[Kintone] fetchMeetingsYearMonths error:', error);
    throw error;
  }
}
