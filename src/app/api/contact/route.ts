import { NextRequest, NextResponse } from 'next/server';

// 開発時は動的に動作させる
// 本番環境（静的エクスポート）ではAPIルートは動作せず、Cloudflare Workersを使用します
// ビルド時に条件式が使えないため、常にforce-dynamicに設定
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { turnstileToken, ...formData } = body;

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

    // ここで実際のフォーム送信処理を行う
    // 例: メール送信、データベース保存、外部APIへの送信など
    // 今回は成功レスポンスを返す
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
