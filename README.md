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

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

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
