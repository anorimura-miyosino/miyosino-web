import { NextRequest, NextResponse } from 'next/server';

type ContactFormData = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  type?: string;
  privacyConsent?: boolean;
};

async function saveToKintone(formData: ContactFormData) {
  const {
    KINTONE_CONTACT_DOMAIN,
    KINTONE_CONTACT_APP_ID,
    KINTONE_CONTACT_API_TOKEN,
  } = process.env;

  if (
    !KINTONE_CONTACT_DOMAIN ||
    !KINTONE_CONTACT_APP_ID ||
    !KINTONE_CONTACT_API_TOKEN
  ) {
    console.error('Kintone環境変数が不足しています');
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
  const typeValue =
    typeLabels[formData.type || 'general'] || formData.type || 'その他';

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

  // アプリIDを数値に変換（Kintone APIの要件）
  const appId = Number(KINTONE_CONTACT_APP_ID);
  if (isNaN(appId)) {
    console.error('アプリIDが数値ではありません:', KINTONE_CONTACT_APP_ID);
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

  console.log('Kintone保存リクエスト:', JSON.stringify(requestBody, null, 2));

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': KINTONE_CONTACT_API_TOKEN,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error('Kintone保存失敗:', response.status, errorText);
    return {
      success: false,
      status: response.status,
      message: 'お問い合わせの保存に失敗しました',
    };
  }

  return { success: true };
}

// 静的エクスポート時はforce-staticを設定（ビルドエラー回避）
// 開発時はnext.config.tsでoutput: 'export'が無効化されているため、動的に動作
export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { turnstileToken, ...formData } = body as ContactFormData & {
      turnstileToken?: string;
    };

    // Turnstileトークンの検証
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Turnstileトークンが提供されていません' },
        { status: 400 }
      );
    }

    // Cloudflare Turnstile APIでトークンを検証
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

    if (!TURNSTILE_SECRET_KEY) {
      console.error('TURNSTILE_SECRET_KEYが設定されていません');
      return NextResponse.json(
        { error: 'サーバー設定エラー' },
        { status: 500 }
      );
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
          remoteip:
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            '',
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      console.error('Turnstile検証失敗:', verifyData['error-codes']);
      return NextResponse.json(
        { error: 'ボット検証に失敗しました。もう一度お試しください。' },
        { status: 403 }
      );
    }

    // Kintoneへ保存
    const saveResult = await saveToKintone(formData);
    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.message },
        { status: saveResult.status ?? 500 }
      );
    }

    console.log('お問い合わせフォーム送信:', formData);

    return NextResponse.json(
      { message: 'お問い合わせを送信しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('フォーム送信エラー:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。しばらく時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
