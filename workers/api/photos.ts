/**
 * Cloudflare Workers - MicroCMS API プロキシ
 *
 * このWorkerはクライアントからのリクエストを受け取り、
 * MicroCMS APIにプロキシしてデータを返します。
 * APIキーはサーバーサイドで管理され、クライアントに露出しません。
 */

interface Env {
  MICROCMS_API_KEY: string;
  MICROCMS_API_BASE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORSプリフライトリクエストの処理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // GETリクエストのみ許可
    if (request.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 環境変数からMicroCMS APIキーを取得（クライアントには見えない）
    const apiKey = env.MICROCMS_API_KEY;
    const baseURL =
      env.MICROCMS_API_BASE_URL || 'https://k-miyoshino.microcms.io/api/v1';

    if (!apiKey) {
      console.error('[Workers] MICROCMS_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      // クエリパラメータを取得（ordersなど）
      const url = new URL(request.url);
      const orders = url.searchParams.get('orders') || 'order';

      // MicroCMS APIエンドポイントを構築
      const microcmsUrl = new URL(`${baseURL}/photo`);
      microcmsUrl.searchParams.append('orders', orders);

      // MicroCMS APIを呼び出し
      const response = await fetch(microcmsUrl.toString(), {
        headers: {
          'X-MICROCMS-API-KEY': apiKey,
        },
        // Cloudflare Workersのキャッシュを利用（オプション）
        cf: {
          cacheTtl: 300, // 5分間キャッシュ
          cacheEverything: true,
        },
      });

      if (!response.ok) {
        console.error(
          `[Workers] MicroCMS API error: ${response.status} ${response.statusText}`
        );
        return new Response(
          JSON.stringify({
            error: 'MicroCMS API error',
            status: response.status,
          }),
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      const data = await response.json();

      // CORSヘッダーを付けてデータを返す
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300', // 5分間キャッシュ
        },
      });
    } catch (error) {
      console.error('[Workers] Error:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
