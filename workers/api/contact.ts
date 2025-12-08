/**
 * Cloudflare Workers - お問い合わせフォーム & Turnstileサイトキー提供
 *
 * このWorkerはお問い合わせフォームの送信とTurnstileサイトキーの提供を行います。
 * APIキーはサーバーサイドで管理され、クライアントに露出しません。
 */

interface Env {
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  KINTONE_CONTACT_DOMAIN?: string;
  KINTONE_CONTACT_APP_ID?: string;
  KINTONE_CONTACT_API_TOKEN?: string;
}

type ContactFormData = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  type?: string;
  privacyConsent?: boolean;
};

async function saveToKintone(formData: ContactFormData, env: Env) {
  const {
    KINTONE_CONTACT_DOMAIN,
    KINTONE_CONTACT_APP_ID,
    KINTONE_CONTACT_API_TOKEN,
  } = env;

  if (
    !KINTONE_CONTACT_DOMAIN ||
    !KINTONE_CONTACT_APP_ID ||
    !KINTONE_CONTACT_API_TOKEN
  ) {
    console.error('[Workers] Kintone環境変数が不足しています');
    return {
      success: false,
      status: 500,
      message: 'サーバー設定エラー（Kintone）',
    };
  }

  const endpoint = `https://${KINTONE_CONTACT_DOMAIN}/k/v1/record.json`;

  // typeフィールドの値を表示テキストに変換
  // ContactType enum値（例：moving_in）を表示テキスト（例：「入居について」）に変換
  const typeLabels: Record<string, string> = {
    living_environment: '住環境について',
    moving_in: '入居について',
    facilities: '共用施設について',
    community: 'コミュニティについて',
    general: 'その他',
  };
  const typeValue = typeLabels[formData.type || 'general'] || formData.type || 'その他';

  // agreeフィールドはチェックボックスなので配列形式で送信
  // 選択されている場合は ["はい"]、選択されていない場合は []
  const agreeValue = formData.privacyConsent ? ['はい'] : [];

  const record = {
    subject: { value: formData.subject || '' },
    message: { value: formData.message || '' },
    name: { value: formData.name || '' },
    email: { value: formData.email || '' },
    phone: { value: formData.phone || '' },
    type: { value: typeValue },
    agree: { value: agreeValue },
  };

  console.log('[Workers] レコードデータ:', JSON.stringify(record, null, 2));

  // アプリIDを数値に変換（Kintone APIの要件）
  const appId = Number(KINTONE_CONTACT_APP_ID);
  if (isNaN(appId)) {
    console.error('[Workers] アプリIDが数値ではありません:', KINTONE_CONTACT_APP_ID);
    return {
      success: false,
      status: 500,
      message: 'サーバー設定エラー（アプリIDが無効です）',
    };
  }

  const requestBody = {
    app: appId,
    record,
  };

  const requestBodyString = JSON.stringify(requestBody);
  console.log('[Workers] Kintone保存リクエスト:', requestBodyString);
  console.log('[Workers] Kintone保存エンドポイント:', endpoint);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': KINTONE_CONTACT_API_TOKEN,
    },
    body: requestBodyString,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    let errorMessage = 'お問い合わせの保存に失敗しました';
    let errorDetails = '';
    
    try {
      const errorData = JSON.parse(errorText);
      if (errorData.message) {
        errorMessage = `Kintone保存エラー: ${errorData.message}`;
      }
      if (errorData.errors) {
        errorDetails = JSON.stringify(errorData.errors, null, 2);
      }
    } catch {
      // JSON解析失敗時はそのまま使用
      if (errorText) {
        errorMessage = `Kintone保存エラー: ${errorText}`;
      }
    }
    
    console.error('[Workers] Kintone保存失敗:', {
      status: response.status,
      statusText: response.statusText,
      errorText,
      requestBody: requestBodyString,
      errorDetails,
    });
    
    return {
      success: false,
      status: response.status,
      message: errorMessage,
    };
  }

  return { success: true };
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
        const { turnstileToken, ...formData } = body as ContactFormData & {
          turnstileToken?: string;
        };

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

        // Kintoneへ保存
        const saveResult = await saveToKintone(formData, env);
        if (!saveResult.success) {
          return new Response(
            JSON.stringify({ error: saveResult.message }),
            {
              status: saveResult.status ?? 500,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
              },
            }
          );
        }

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

