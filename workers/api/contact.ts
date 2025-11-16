/**
 * Cloudflare Workers - お問い合わせフォーム & Turnstileサイトキー提供
 *
 * このWorkerはお問い合わせフォームの送信とTurnstileサイトキーの提供を行います。
 * APIキーはサーバーサイドで管理され、クライアントに露出しません。
 */

interface Env {
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORSヘッダーの設定
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // CORSプリフライトリクエストの処理
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Turnstileサイトキー取得エンドポイント
    if (pathname === '/api/turnstile-site-key' && request.method === 'GET') {
      const TURNSTILE_SITE_KEY = env.TURNSTILE_SITE_KEY;

      if (!TURNSTILE_SITE_KEY) {
        return new Response(
          JSON.stringify({ error: 'サイトキーが設定されていません' }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return new Response(JSON.stringify({ siteKey: TURNSTILE_SITE_KEY }), {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    // お問い合わせフォーム送信エンドポイント
    if (pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { turnstileToken, ...formData } = body;

        // Turnstileトークンの検証
        if (!turnstileToken) {
          return new Response(
            JSON.stringify({ error: 'Turnstileトークンが提供されていません' }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
              },
            }
          );
        }

        // Cloudflare Turnstile APIでトークンを検証
        const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY;

        if (!TURNSTILE_SECRET_KEY) {
          console.error('[Workers] TURNSTILE_SECRET_KEY is not set');
          return new Response(JSON.stringify({ error: 'サーバー設定エラー' }), {
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          });
        }

        const verifyResponse = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              secret: TURNSTILE_SECRET_KEY,
              response: turnstileToken,
              remoteip: request.headers.get('CF-Connecting-IP') || '',
            }),
          }
        );

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
          console.error(
            '[Workers] Turnstile検証失敗:',
            verifyData['error-codes']
          );
          return new Response(
            JSON.stringify({
              error: 'ボット検証に失敗しました。もう一度お試しください。',
            }),
            {
              status: 403,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
              },
            }
          );
        }

        // ここで実際のフォーム送信処理を行う
        // 例: メール送信、データベース保存、外部APIへの送信など
        console.log('[Workers] お問い合わせフォーム送信:', formData);

        // 例: SendGridやメール送信サービスを使う場合
        // await sendEmail(formData);

        return new Response(
          JSON.stringify({ message: 'お問い合わせを送信しました' }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error('[Workers] フォーム送信エラー:', error);
        return new Response(
          JSON.stringify({
            error:
              '送信に失敗しました。しばらく時間をおいて再度お試しください。',
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    // その他のリクエストは404を返す
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  },
};

