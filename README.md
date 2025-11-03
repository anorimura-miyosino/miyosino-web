# miyosino-web

DDD（ドメイン駆動設計）構造を意識したNext.js + TypeScriptアプリケーション

## 技術スタック

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **ESLint** + **Prettier**

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── domains/                # ドメイン層
│   ├── user/
│   │   ├── types.ts
│   │   └── index.ts
│   ├── product/
│   │   ├── types.ts
│   │   └── index.ts
│   └── index.ts
├── application/            # アプリケーション層
│   ├── services/
│   │   ├── userService.ts
│   │   ├── productService.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useUsers.ts
│   │   ├── useProducts.ts
│   │   └── index.ts
│   └── index.ts
├── infrastructure/         # インフラストラクチャ層
│   ├── api/
│   │   ├── client.ts
│   │   └── index.ts
│   └── index.ts
└── shared/                 # 共有層
    ├── types/
    │   └── index.ts
    ├── utils/
    │   └── index.ts
    ├── constants/
    │   └── index.ts
    └── index.ts
```

## DDD構造の説明

### ドメイン層 (`domains/`)

- ビジネスロジックの中核
- エンティティ、値オブジェクト、ドメインサービス
- 他の層に依存しない

### アプリケーション層 (`application/`)

- ユースケースの実装
- ドメインオブジェクトの協調
- サービスとカスタムフック

### インフラストラクチャ層 (`infrastructure/`)

- 外部システムとの連携
- API クライアント、データベースアクセス
- 技術的な詳細の実装

### 共有層 (`shared/`)

- 複数層で使用される共通要素
- 型定義、ユーティリティ、定数

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# リント
npm run lint

# フォーマット
npm run format
```

## 環境変数

### ローカル開発時

プロジェクトルートに`.env.local`ファイルを作成して、以下の環境変数を設定してください：

```env
# MicroCMS APIキー（必須）
MICROCMS_API_KEY=your_microcms_api_key_here

# MicroCMS APIベースURL（オプション、デフォルト値あり）
# MICROCMS_API_BASE_URL=https://k-miyoshino.microcms.io/api/v1
```

**注意**: `.env.local`は`.gitignore`に含まれているため、Gitにコミットされません。安全にAPIキーを管理できます。

### GitHub Pagesへのデプロイ時

GitHub Actionsでビルドする際に環境変数が必要です。以下の手順で設定してください：

1. **GitHubリポジトリのSettingsを開く**
   - リポジトリページ → Settings → Secrets and variables → Actions

2. **New repository secretをクリック**

3. **以下の情報を入力**
   - Name: `MICROCMS_API_KEY`
   - Secret: MicroCMSのAPIキー（ローカルで使用しているものと同じ）

4. **Add secretをクリック**

これで、GitHub Actionsのビルド時に環境変数が自動的に使用されます。

### その他の環境変数

```env
# API URL（オプション）
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Cloudflare Turnstile設定（お問い合わせフォーム用）
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
NEXT_PUBLIC_CONTACT_API_URL=https://your-api-endpoint.com/api/contact
```

**Turnstileについて**:
- 静的エクスポート（`output: 'export'`）でもTurnstileウィジェットは動作します
- ただし、トークン検証は外部のAPIエンドポイントで行う必要があります
- 開発環境では`/api/contact`（Next.jsのAPI Routes）が使用されます
- 本番環境では`NEXT_PUBLIC_CONTACT_API_URL`で指定した外部APIを使用してください
- 外部APIの例として、`cloudflare-worker-example.js`を参照してください

## デプロイ

### GitHub Pages

このプロジェクトはGitHub Pagesに自動デプロイされる設定になっています。

1. **GitHubリポジトリにPush**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin master
   ```

2. **GitHub Pagesの設定**
   - リポジトリのSettings → Pages
   - Source: GitHub Actionsを選択
   - リポジトリ名が `miyosino-web` の場合、URLは `https://[ユーザー名].github.io/miyosino-web/` になります

3. **自動デプロイの確認**
   - GitHub Actionsでビルドとデプロイが実行されます
   - 完了後、GitHub PagesのURLでアクセスできます

### さくらレンタルサーバ

静的サイトとして出力されたファイルをアップロードすることで、さくらレンタルサーバでも使用できます。

1. **ビルド**

   ```bash
   npm run build
   ```

2. **アップロード**
   - `out`フォルダの中身をすべて`public_html`にアップロード

## ライセンス

MIT
