/**
 * Cloudflare Workers - MicroCMS API プロキシ（コンテンツ用）
 *
 * このWorkerはクライアントからのリクエストを受け取り、
 * MicroCMS APIにプロキシしてデータを返します。
 * APIキーはサーバーサイドで管理され、クライアントに露出しません。
 *
 * 複数のコンテンツ（お知らせ、あゆみ、団地の四季、コミュニティ、共有施設、団地内のサービス、周辺環境など）
 * を一つのAPIエンドポイントでカテゴリ分けして扱います。
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
      // クエリパラメータを取得
      const url = new URL(request.url);
      const category = url.searchParams.get('category'); // カテゴリフィルタ（例: "お知らせ"）
      const orders = url.searchParams.get('orders') || '-date'; // 日付の降順（新しい順）
      const limit = url.searchParams.get('limit') || '10'; // デフォルト10件
      const offset = url.searchParams.get('offset') || '0';

      // MicroCMS APIエンドポイントを構築
      // エンドポイント名は"contents"（複数のコンテンツを扱うため）
      const microcmsUrl = new URL(`${baseURL}/contents`);

      // カテゴリフィルタリング（指定されている場合）
      // 注意: MicroCMSの配列内オブジェクトのフィルタリングは複雑なため、
      // 一旦フィルタを外して全データを取得し、クライアント側でフィルタリングする
      // 将来的にMicroCMSのフィルタ構文が対応した場合は、以下を有効化
      // if (category) {
      //   microcmsUrl.searchParams.append(
      //     'filters',
      //     `category[contains]{"id":"${category}"}`
      //   );
      // }

      microcmsUrl.searchParams.append('orders', orders);
      microcmsUrl.searchParams.append('limit', limit);
      microcmsUrl.searchParams.append('offset', offset);

      // 全件取得が必要な場合（limitが指定されていない、または大きな値の場合）
      const limitNum = parseInt(limit, 10);
      const getAllRecords =
        url.searchParams.get('getAll') === 'true' || limitNum >= 1000;

      let allContents: Array<{
        category?: Array<{ id?: string }>;
        [key: string]: unknown;
      }> = [];
      let totalCount = 0;
      let currentOffset = parseInt(offset, 10);
      const fetchLimit = getAllRecords ? 100 : limitNum; // 全件取得時は100件ずつ取得

      // 全件取得の場合はページネーションで取得
      if (getAllRecords) {
        console.log(
          `[Workers] 全件取得モード: ページネーションで取得開始${category ? ` (カテゴリフィルタ: ${category})` : ''}`
        );

        while (true) {
          const pageUrl = new URL(`${baseURL}/contents`);
          pageUrl.searchParams.append('orders', orders);
          pageUrl.searchParams.append('limit', fetchLimit.toString());
          pageUrl.searchParams.append('offset', currentOffset.toString());

          const response = await fetch(pageUrl.toString(), {
            headers: {
              'X-MICROCMS-API-KEY': apiKey,
            },
            cf: {
              cacheTtl: 300,
              cacheEverything: true,
            },
          });

          if (!response.ok) {
            console.error(
              `[Workers] MicroCMS API error: ${response.status} ${response.statusText}`
            );
            break;
          }

          const pageData = (await response.json()) as {
            contents?: Array<{
              category?: Array<{ id?: string }>;
              [key: string]: unknown;
            }>;
            totalCount?: number;
            offset?: number;
            limit?: number;
            [key: string]: unknown;
          };

          if (pageData.contents && Array.isArray(pageData.contents)) {
            // カテゴリフィルタリング（取得したページデータに対して）
            let pageContents = pageData.contents;
            if (category) {
              pageContents = pageData.contents.filter((item) => {
                if (!Array.isArray(item.category)) {
                  return false;
                }
                return item.category.some((cat) => cat && cat.id === category);
              });
              console.log(
                `[Workers] ページ取得: ${pageData.contents.length}件 → フィルタ後: ${pageContents.length}件`
              );
            }

            allContents = allContents.concat(pageContents);
            totalCount = pageData.totalCount || allContents.length;

            // 取得した件数がlimit未満なら最後のページ
            if (pageData.contents.length < fetchLimit) {
              break;
            }

            currentOffset += fetchLimit;
          } else {
            break;
          }
        }

        console.log(
          `[Workers] 全件取得完了: ${allContents.length}件${category ? ` (カテゴリ: ${category})` : ''}`
        );
      } else {
        // 通常の取得（1回のみ）
        const response = await fetch(microcmsUrl.toString(), {
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
          },
          cf: {
            cacheTtl: 300,
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

        const pageData = (await response.json()) as {
          contents?: Array<{
            category?: Array<{ id?: string }>;
            [key: string]: unknown;
          }>;
          totalCount?: number;
          offset?: number;
          limit?: number;
          [key: string]: unknown;
        };

        // カテゴリフィルタリング（取得したデータに対して）
        let fetchedContents = pageData.contents || [];
        if (category) {
          fetchedContents = fetchedContents.filter((item) => {
            if (!Array.isArray(item.category)) {
              return false;
            }
            return item.category.some((cat) => cat && cat.id === category);
          });
          console.log(
            `[Workers] 通常取得: ${pageData.contents?.length || 0}件 → フィルタ後: ${fetchedContents.length}件 (カテゴリ: ${category})`
          );
        }

        allContents = fetchedContents;
        totalCount = pageData.totalCount || allContents.length;
      }

      // カテゴリフィルタリングは既に取得時に適用済み
      const responseData = {
        contents: allContents,
        totalCount,
        offset: parseInt(offset, 10),
        limit: getAllRecords ? allContents.length : limitNum,
      };

      const data = responseData;

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
