/**
 * Cloudflare Workers - Kintone イベントAPI プロキシ
 *
 * このWorkerは組合員専用ページからkintoneのイベントデータを取得するための
 * プロキシとして機能します。
 *
 * エンドポイント:
 * - GET /events - イベントデータを取得（今後のイベントと過去のイベントを分けて返す）
 *
 * 認証: JWTトークンで組合員認証を確認
 */

interface Env {
  KINTONE_DOMAIN: string; // 例: k-miyosino.cybozu.com
  KINTONE_API_TOKEN_EVENTS: string; // イベントアプリ用のAPIトークン（アプリID: 49）
  JWT_SECRET: string; // JWT検証用のシークレット
}

interface KintoneRecord {
  $id: {
    value: string;
  };
  title: {
    value: string;
  };
  startDateTime: {
    value: string; // ISO 8601形式: YYYY-MM-DDTHH:mm:ss
  };
  endDateTime?: {
    value: string; // ISO 8601形式: YYYY-MM-DDTHH:mm:ss
  };
  venue?: {
    value: string;
  };
  owner: {
    value: Array<{
      code: string;
      name: string;
    }>;
  };
  category?: {
    value: string;
  };
  description: {
    value: string; // HTML
  };
}

interface KintoneRecordsResponse {
  records: KintoneRecord[];
}

interface JWTPayload {
  sub: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

function corsHeaders(origin?: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// JWT検証関数
async function verifyJWT(
  token: string,
  secret: string
): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signature = Uint8Array.from(
      atob(encodedSignature.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      encoder.encode(data)
    );

    if (!valid) {
      return null;
    }

    const payload = JSON.parse(
      atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/'))
    ) as JWTPayload;

    // 有効期限チェック
    if (payload.exp < Date.now() / 1000) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('[Events] JWT verification error:', error);
    return null;
  }
}

// kintone APIからイベントデータを取得
async function fetchKintoneRecords(
  env: Env
): Promise<KintoneRecordsResponse> {
  const appId = 49;

  const url = new URL(`https://${env.KINTONE_DOMAIN}/k/v1/records.json`);
  url.searchParams.append('app', appId.toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-Cybozu-API-Token': env.KINTONE_API_TOKEN_EVENTS,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      errorJson = errorText;
    }
    console.error('[Events] Kintone API error details:', {
      status: response.status,
      statusText: response.statusText,
      url: url.toString(),
      domain: env.KINTONE_DOMAIN,
      appId: appId,
      errorBody: errorJson,
    });
    throw new Error(
      `Kintone API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorJson)}`
    );
  }

  const data = (await response.json()) as KintoneRecordsResponse;

  // デバッグ: Kintone APIからのレスポンスをログ出力
  if (data.records.length > 0) {
    const firstRecord = data.records[0];
    console.log('[Events] Kintone API response - first record keys:', Object.keys(firstRecord));
    console.log('[Events] Category field check:', {
      hasCategory: 'category' in firstRecord,
      categoryValue: (firstRecord as any).category,
      categoryType: typeof (firstRecord as any).category,
      allFields: Object.keys(firstRecord),
    });
  }

  return data;
}

// kintoneのレコードをEvent型に変換
function convertKintoneRecordToEvent(record: KintoneRecord): {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime?: string;
  venue: string;
  owner: string;
  category?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
} {
  // 必須フィールドのチェック
  if (!record.$id?.value) {
    throw new Error('Record ID is missing');
  }
  if (!record.title?.value) {
    throw new Error('Title is missing');
  }
  if (!record.startDateTime?.value) {
    throw new Error('startDateTime is missing');
  }

  // createdAtとupdatedAtは現在時刻をデフォルトとして使用
  const now = new Date();

  // ownerは組織選択フィールドで配列形式。nameを結合して文字列にする
  const ownerNames =
    record.owner?.value
      ?.map((org) => org.name)
      .filter((name) => name)
      .join('、') || '';

  // categoryフィールドのデバッグ
  const categoryValue = record.category?.value;
  console.log('[Events] Converting record - category:', {
    recordId: record.$id.value,
    hasCategoryField: 'category' in record,
    categoryValue: categoryValue,
    categoryType: typeof categoryValue,
    allRecordKeys: Object.keys(record),
  });

  return {
    id: record.$id.value,
    title: record.title.value,
    startDateTime: record.startDateTime.value,
    endDateTime: record.endDateTime?.value,
    venue: record.venue?.value || '',
    owner: ownerNames,
    category: categoryValue,
    description: record.description?.value || '',
    createdAt: now,
    updatedAt: now,
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || undefined;
    const path = url.pathname;

    // CORSプリフライトリクエストの処理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(origin),
      });
    }

    // GETリクエストのみ許可
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin),
        },
      });
    }

    // 環境変数チェック
    if (
      !env.KINTONE_DOMAIN ||
      !env.KINTONE_API_TOKEN_EVENTS ||
      !env.JWT_SECRET
    ) {
      console.error('[Events] Required environment variables are not set');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin),
          },
        }
      );
    }

    try {
      // JWTトークンで認証確認
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin),
          },
        });
      }

      const token = authHeader.substring(7);
      const payload = await verifyJWT(token, env.JWT_SECRET);
      if (!payload) {
        return new Response(JSON.stringify({ error: 'Invalid token' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin),
          },
        });
      }

      // ルーティング
      if (path === '/events' || path === '/events/') {
        // イベントデータを取得
        const kintoneResponse = await fetchKintoneRecords(env);

        // デバッグ: 最初のレコードの構造を確認
        if (kintoneResponse.records.length > 0) {
          const firstRecord = kintoneResponse.records[0];
          console.log('[Events] First record before conversion:', {
            recordKeys: Object.keys(firstRecord),
            categoryField: (firstRecord as any).category,
            categoryValue: (firstRecord as any).category?.value,
          });
        }

        const events = kintoneResponse.records
          .map((record) => {
            try {
              return convertKintoneRecordToEvent(record);
            } catch (error) {
              console.error('[Events] Error converting record:', {
                recordId: record.$id?.value,
                error: error instanceof Error ? error.message : String(error),
                recordKeys: Object.keys(record),
              });
              // エラーが発生したレコードはスキップ
              return null;
            }
          })
          .filter(
            (event): event is NonNullable<typeof event> => event !== null
          );

        // 現在日時で今後のイベントと過去のイベントを分離
        const now = new Date();
        const upcomingEvents = events.filter((event) => {
          const eventDate = new Date(event.startDateTime);
          return eventDate >= now;
        });
        const pastEvents = events.filter((event) => {
          const eventDate = new Date(event.startDateTime);
          return eventDate < now;
        });

        // 開催日時の昇順でソート（今後のイベントは古い順、過去のイベントは新しい順）
        upcomingEvents.sort((a, b) => {
          const dateA = new Date(a.startDateTime);
          const dateB = new Date(b.startDateTime);
          return dateA.getTime() - dateB.getTime();
        });
        pastEvents.sort((a, b) => {
          const dateA = new Date(a.startDateTime);
          const dateB = new Date(b.startDateTime);
          return dateB.getTime() - dateA.getTime();
        });

        return new Response(
          JSON.stringify({ upcomingEvents, pastEvents }),
          {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders(origin),
            },
          }
        );
      } else {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin),
          },
        });
      }
    } catch (error) {
      console.error('[Events] Error:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        path: path,
        method: request.method,
      });
      return new Response(
        JSON.stringify({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin),
          },
        }
      );
    }
  },
};

