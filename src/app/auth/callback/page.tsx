'use client';

import { useEffect } from 'react';

/**
 * OAuth認証コールバックページ
 * 
 * Kintone OAuth認証後、このページにリダイレクトされます。
 * Cloudflare Workersの /callback エンドポイントで処理されるため、
 * このページは表示されることはありませんが、静的エクスポートのために必要です。
 */
export default function AuthCallbackPage() {
    useEffect(() => {
        // Cloudflare Workersの /callback エンドポイントへリダイレクト
        const authApiUrl =
            process.env.NEXT_PUBLIC_AUTH_API_URL ||
            'https://miyosino-auth.anorimura-miyosino.workers.dev';

        // URLのクエリパラメータをそのまま転送
        const params = new URLSearchParams(window.location.search);
        window.location.href = `${authApiUrl}/callback?${params.toString()}`;
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">認証処理中...</p>
            </div>
        </div>
    );
}
