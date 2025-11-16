import { NextResponse } from 'next/server';

// 開発時は動的に動作させる（静的エクスポート時のみforce-static）
// 本番環境（静的エクスポート）ではAPIルートは動作せず、Cloudflare Workersを使用します
export const dynamic =
  process.env.NODE_ENV === 'production' ? 'force-static' : 'force-dynamic';

export async function GET() {
  try {
    // サーバーサイドの環境変数からサイトキーを取得
    const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY;

    if (!TURNSTILE_SITE_KEY) {
      console.error('TURNSTILE_SITE_KEYが設定されていません');
      return NextResponse.json(
        { error: 'サイトキーが設定されていません' },
        { status: 500 }
      );
    }

    // サイトキーを返す（クライアントに公開されるが、サーバーサイドから取得するため安全）
    return NextResponse.json({ siteKey: TURNSTILE_SITE_KEY }, { status: 200 });
  } catch (error) {
    console.error('サイトキー取得エラー:', error);
    return NextResponse.json(
      { error: 'サイトキーの取得に失敗しました' },
      { status: 500 }
    );
  }
}
