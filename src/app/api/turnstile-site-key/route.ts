import { NextResponse } from 'next/server';

// 静的エクスポート時はforce-staticを設定（ビルドエラー回避）
// 開発時はnext.config.tsでoutput: 'export'が無効化されているため、動的に動作
export const dynamic = 'force-static';

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
