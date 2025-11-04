// Cloudflare WorkersでのTurnstile検証例
// このファイルは参考用です。実際に使用する場合はCloudflare Workersにデプロイしてください

export default {
  async fetch(request, env) {
    // CORSヘッダーの設定
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // 本番では実際のドメインを指定
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // OPTIONSリクエスト（プリフライト）の処理
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });
    }

    try {
      const body = await request.json();
      const { turnstileToken, ...formData } = body;

      // Turnstileトークンの検証
      if (!turnstileToken) {
        return new Response(
          JSON.stringify({ error: 'Turnstileトークンが提供されていません' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Cloudflare Turnstile APIでトークンを検証
      // env.TURNSTILE_SECRET_KEY は Workers の環境変数で設定
      const verifyResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: env.TURNSTILE_SECRET_KEY,
            response: turnstileToken,
            remoteip: request.headers.get('CF-Connecting-IP') || '',
          }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        console.error('Turnstile検証失敗:', verifyData['error-codes']);
        return new Response(
          JSON.stringify({
            error: 'ボット検証に失敗しました。もう一度お試しください。',
          }),
          {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // ここで実際のフォーム送信処理を行う
      // 例: メール送信、データベース保存、外部APIへの送信など
      console.log('お問い合わせフォーム送信:', formData);

      // 例: SendGridやメール送信サービスを使う場合
      // await sendEmail(formData);

      return new Response(
        JSON.stringify({ message: 'お問い合わせを送信しました' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('フォーム送信エラー:', error);
      return new Response(
        JSON.stringify({
          error: '送信に失敗しました。しばらく時間をおいて再度お試しください。',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  },
};


