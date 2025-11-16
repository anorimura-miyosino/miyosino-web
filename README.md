# みよしのウェブサイト

## アーキテクチャ概要

このプロジェクトは、**Cloudflare Workers**を使用してMicroCMS APIキーをサーバーサイドで管理しています。これにより、APIキーがクライアントに露出することなく、安全にMicroCMSからデータを取得できます。

### アーキテクチャ図

```
[ブラウザ]
    ↓ (HTTPS)
[GitHub Pages] (静的HTML/JS/CSS)
    ↓ (fetch API)
[Cloudflare Workers] (APIプロキシ) ← APIキーはここで管理
    ↓ (X-MICROCMS-API-KEY ヘッダー付き)
[MicroCMS API]
```

## GitHub Pagesでのデプロイ設定

### 1. の設定（推奨）

MicroCMS APIキーをサーバーサイドで管理するため、Cloudflare Workersを設定します。

#### 1-1. Cloudflareアカウントの作成

1. [Cloudflare](https://dash.cloudflare.com/sign-up)でアカウントを作成（無料）
2. ログイン後、**Workers & Pages** を選択

#### 1-2. Workerの作成とデプロイ

1. **Workers & Pages** > **Create application** > **Create Worker** をクリック
2. Worker名を入力（例: `miyosino-api`）
3. **Deploy** をクリックしてWorkerを作成

#### 1-3. コードのアップロード

1. ローカルで以下のコマンドを実行してWranglerをインストール（まだの場合）:

   ```bash
   npm install
   ```

2. Cloudflareにログイン:

   **通常の環境（ブラウザが使用可能な場合）:**

   ```bash
   cd workers
   npx wrangler login
   ```

   **Dockerコンテナ内やCI/CD環境の場合:**

   Cloudflare APIトークンを使用して認証します。
   1. [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)でAPIトークンを作成
      - **Create Token** をクリック
      - **Edit Cloudflare Workers** テンプレートを選択、または以下の権限を設定:
        - Account: Cloudflare Workers: Edit
        - Zone: 必要な権限を設定
      - トークンを作成してコピー
   2. 環境変数として設定:

   ```bash
   export CLOUDFLARE_API_TOKEN=your-api-token-here
   ```

   または、`.dev.vars`ファイルを作成（開発環境用）:

   ```bash
   cd workers
   cp .dev.vars.example .dev.vars
   # .dev.varsファイルを編集してCLOUDFLARE_API_TOKENを設定
   ```

   ⚠️ **注意**: `.dev.vars`ファイルは`.gitignore`に含まれているため、Gitにコミットされません。

3. 環境変数を設定:

   **写真データ取得用Worker（miyosino-api）:**

   ```bash
   cd workers
   # MicroCMS APIキーを設定
   npx wrangler secret put MICROCMS_API_KEY
   # プロンプトが表示されたら、MicroCMSの読み取り専用APIキーを入力

   # オプション: MicroCMS APIベースURLを設定（デフォルト値を使う場合は不要）
   npx wrangler secret put MICROCMS_API_BASE_URL
   ```

   **お問い合わせフォーム用Worker（miyosino-contact-api）:**

   ```bash
   cd workers
   # Cloudflare Turnstileキーを設定
   npx wrangler secret put TURNSTILE_SITE_KEY --config wrangler.contact.toml
   # プロンプトが表示されたら、Turnstileのサイトキーを入力

   npx wrangler secret put TURNSTILE_SECRET_KEY --config wrangler.contact.toml
   # プロンプトが表示されたら、Turnstileのシークレットキーを入力
   ```

4. Workerをデプロイ:

   ```bash
   cd workers
   # 写真データ取得用Workerをデプロイ
   npm run deploy
   # または
   npx wrangler deploy

   # お問い合わせフォーム用Workerをデプロイ
   npm run deploy:contact
   # または
   npx wrangler deploy --config wrangler.contact.toml
   ```

5. デプロイ後、各WorkerのURLをコピー:
   - 写真データ取得用: `https://miyosino-api.your-subdomain.workers.dev`
   - お問い合わせフォーム用: `https://miyosino-contact-api.your-subdomain.workers.dev`

#### 1-4. 環境変数の設定

デプロイしたWorkerのURLを、Next.jsの環境変数に設定します。

**GitHub Secretsに追加:**

- **`NEXT_PUBLIC_API_ENDPOINT`**
  - 値：Cloudflare WorkersのURL（例: `https://miyosino-api.your-subdomain.workers.dev`）
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれますが、これは公開エンドポイントなので問題ありません

- **`NEXT_PUBLIC_CONTACT_API_URL`** (必須)
  - 値：お問い合わせフォーム用WorkerのURL（例: `https://miyosino-contact-api.your-subdomain.workers.dev`）
  - ⚠️ **重要**: 静的エクスポート（`output: 'export'`）を使用している場合、この環境変数は必須です
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれますが、これは公開エンドポイントなので問題ありません

**ローカル開発用（`.env.local`）:**

```bash
NEXT_PUBLIC_API_ENDPOINT=https://miyosino-api.your-subdomain.workers.dev
```

#### 1-5. ローカル開発でのWorkerテスト

ローカルでWorkerをテストする場合:

```bash
cd workers

# 写真データ取得用Workerをローカルで起動
npm run dev
# または
npx wrangler dev

# お問い合わせフォーム用Workerをローカルで起動（別のターミナル）
npm run dev:contact
# または
npx wrangler dev --config wrangler.contact.toml

# 別のターミナルでNext.jsを起動
cd ..
npm run dev
```

### 2. GitHub Secretsの設定（フォールバック用）

⚠️ **注意**: Cloudflare Workersを使用する場合は、以下の設定は不要です。Workersが利用できない場合のフォールバックとしてのみ使用されます。

MicroCMSのAPIデータを直接クライアントサイドで取得する場合（非推奨）:

#### 設定手順

1. GitHubリポジトリにアクセス
2. **Settings** > **Secrets and variables** > **Actions** を開く
3. **New repository secret** をクリック
4. 以下のSecretsを追加：

#### フォールバック用のSecret（Cloudflare Workers使用時は不要）

- **`MICROCMS_API_KEY`** または **`NEXT_PUBLIC_MICROCMS_API_KEY`**
  - 値：MicroCMSのAPIキー
  - MicroCMSの管理画面 > API設定 > 読み取り専用APIキー
  - ⚠️ **注意**: Cloudflare Workersを使用する場合は設定不要です
  - ⚠️ **警告**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれます（APIキーが露出します）

- **`TURNSTILE_SECRET_KEY`**
  - 値：Cloudflare Turnstileのシークレットキー（サーバーサイド検証用）
  - [Cloudflare Dashboard](https://dash.cloudflare.com/) > Turnstile > サイト設定から取得

- **`TURNSTILE_SITE_KEY`**
  - 値：Cloudflare Turnstileのサイトキー（サーバーサイドで管理、API経由でクライアントに提供）
  - [Cloudflare Dashboard](https://dash.cloudflare.com/) > Turnstile > サイト設定から取得
  - 未設定の場合、Turnstileウィジェットは表示されませんが、フォーム送信は動作します
  - ⚠️ **重要**: このキーはサーバーサイドでのみ管理され、`/api/turnstile-site-key`エンドポイント経由でクライアントに提供されます。クライアントコードに直接埋め込まれることはありません。

#### オプションのSecret

- **`MICROCMS_API_BASE_URL`** または **`NEXT_PUBLIC_MICROCMS_API_BASE_URL`**
  - 値：MicroCMSのAPIエンドポイントURL
  - 例：`https://k-miyoshino.microcms.io/api/v1`
  - 未設定の場合は、デフォルト値が使用されます
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれます

- **`NEXT_PUBLIC_CONTACT_API_URL`** (オプション)
  - 値：お問い合わせフォーム送信用の外部APIエンドポイントURL
  - 例：`https://miyosino-contact-api.your-subdomain.workers.dev`（お問い合わせフォーム用WorkerのURL）
  - ⚠️ **重要**: 静的エクスポート（`output: 'export'`）を使用している場合、Next.jsのAPIルート（`/api/contact`、`/api/turnstile-site-key`）は動作しません
  - お問い合わせフォーム用Worker（`miyosino-contact-api`）のURLを設定してください
  - 未設定の場合、フォーム送信時にエラーが発生します

### 3. ローカル開発環境の設定

ローカルで開発する場合は、`.env.local`ファイルを作成してください：

```bash
# .env.local

# Cloudflare Workersエンドポイント（推奨）
NEXT_PUBLIC_API_ENDPOINT=https://miyosino-api.your-subdomain.workers.dev

# フォールバック: 直接MicroCMSを呼び出す場合（非推奨、APIキーが露出します）
# NEXT_PUBLIC_MICROCMS_API_KEY=your_api_key_here
# NEXT_PUBLIC_MICROCMS_API_BASE_URL=https://k-miyoshino.microcms.io/api/v1

# Cloudflare Turnstile（お問い合わせフォームのボット対策）
# サイトキーはサーバーサイドで管理され、API経由でクライアントに提供されます
TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here

# お問い合わせフォームAPIエンドポイント（静的エクスポートの場合に必須）
# お問い合わせフォーム用Worker（miyosino-contact-api）を使用する場合
# ローカル開発時は '/api/contact' を使用可能（next dev の場合）
# 本番環境ではお問い合わせフォーム用WorkerのURLを設定（例: https://miyosino-contact-api.your-subdomain.workers.dev）
NEXT_PUBLIC_CONTACT_API_URL=https://miyosino-contact-api.your-subdomain.workers.dev
```

⚠️ **注意**: `.env.local`はGitにコミットしないでください（`.gitignore`に含まれています）

### 4. Dockerを使用した開発環境

Dockerを使用して開発環境を構築する場合：

#### 初回起動

```bash
# コンテナをビルドして起動
docker-compose up --build

# バックグラウンドで起動
docker-compose up -d --build
```

#### 基本的なコマンド

```bash
# コンテナを起動
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# コンテナを停止
docker-compose down

# コンテナを再起動（.env.localを変更した場合など）
docker-compose restart

# コンテナのログを確認
docker-compose logs -f

# コンテナ内でコマンドを実行
docker-compose exec web npm run lint
```

#### Git設定

Dockerコンテナ上でGitを扱う場合、以下のコマンドを実行して安全なディレクトリとして設定する必要があります：

```bash
# コンテナ内でGit設定を追加
docker-compose exec web git config --global --add safe.directory /app
```

この設定により、コンテナ内の`/app`ディレクトリでGitコマンドが正常に動作します。

#### アクセス

起動後、以下のURLでアクセスできます：

- 開発サーバー: http://localhost:3000

#### 注意事項

- `.env.local`を追加・変更した場合は、コンテナの再起動が必要です（`docker-compose restart`）
- ソースコードの変更は自動的に反映されます（ホットリロード対応）
- Windows環境では、`CHOKIDAR_USEPOLLING=true`が設定されており、ファイル監視が安定して動作します

### 5. APIキーの取得方法

#### MicroCMS APIキー

1. [MicroCMS](https://microcms.io/)にログイン
2. 対象のサービスを選択
3. **API設定** > **APIキー** からキーを取得
   - **読み取り専用APIキー**：クライアントサイドでデータを取得するため、こちらで十分です
   - **書き込みAPIキー**：データの更新も行う場合はこちら（通常は不要）

#### Cloudflare Turnstileキー

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. **Turnstile** を選択
3. 新しいサイトを追加（まだ作成していない場合）
4. **Site Key**（サイトキー）と**Secret Key**（シークレットキー）をコピー
   - **Site Key** → `TURNSTILE_SITE_KEY`に設定（サーバーサイドでのみ管理）
   - **Secret Key** → `TURNSTILE_SECRET_KEY`に設定

⚠️ **注意**: Site Keyは公開されても問題ありませんが、Secret Keyは絶対に公開してはいけません

### 6. ビルドとデプロイ

GitHubにpushすると、自動的にビルドとデプロイが実行されます。

- `master`ブランチにpushすると自動デプロイ
- ワークフローは `.github/workflows/deploy.yml` で定義されています

### トラブルシューティング

#### ヒーロー画像が表示されない場合

1. **ブラウザのコンソールで確認**
   - GitHub Pagesで公開されたページを開く
   - F12 > Consoleで以下を確認：
     - `[HeroSection] API endpoint is not set` の警告が表示されていないか
     - `[HeroSection] 写真取得エラー:` のエラーが表示されていないか
     - 画像読み込みエラーが表示されていないか
   - NetworkタブでAPIリクエストが失敗していないか確認
     - Cloudflare Workersエンドポイントへのリクエストを確認
     - ステータスコードが200以外でないか確認

2. **Cloudflare Workersの確認（推奨設定を使用している場合）**
   - Cloudflare Dashboard > Workers & Pages でWorkerが正常にデプロイされているか確認
   - Workerのログを確認（Cloudflare Dashboard > Workers & Pages > 該当Worker > Logs）
   - 環境変数`MICROCMS_API_KEY`が正しく設定されているか確認
     ```bash
     cd workers
     npx wrangler secret list
     ```
   - WorkerのURLが正しいか確認（`NEXT_PUBLIC_API_ENDPOINT`に設定されている値）

3. **GitHub Secretsの確認（フォールバック設定を使用している場合）**
   - `NEXT_PUBLIC_API_ENDPOINT`が正しく設定されているか確認
   - フォールバック使用時: `MICROCMS_API_KEY`が正しく設定されているか確認
   - Secretsの名前が正確か確認（大文字小文字を区別）

4. **MicroCMSのAPIエンドポイント確認**
   - MicroCMSの管理画面で`photo`エンドポイントが存在するか確認
   - APIキーに読み取り権限があるか確認
   - Cloudflare Workersから直接MicroCMS APIを呼び出してテスト:
     ```bash
     curl -H "X-MICROCMS-API-KEY: your-api-key" \
          https://k-miyoshino.microcms.io/api/v1/photo?orders=order
     ```

5. **環境変数の確認**
   - ビルド時に`NEXT_PUBLIC_API_ENDPOINT`が正しく設定されているか確認
   - GitHub Actionsのビルドログで環境変数が設定されているか確認

#### ローカルでデータが取得できない場合

1. **環境変数の確認**
   - `.env.local`ファイルが存在するか確認
   - `NEXT_PUBLIC_API_ENDPOINT`が正しく設定されているか確認（Cloudflare Workers使用時）
   - フォールバック使用時: `NEXT_PUBLIC_MICROCMS_API_KEY`が正しく設定されているか確認

2. **Cloudflare Workersのローカルテスト**
   - Workerをローカルで起動: `npm run worker:dev`
   - Workerが正常に起動しているか確認（通常は`http://localhost:8787`で起動）
   - Workerのログでエラーが出ていないか確認

3. **APIの動作確認**
   - Cloudflare Workersエンドポイントに直接アクセスしてテスト:
     ```bash
     curl http://localhost:8787?orders=order
     # または本番環境のURL
     curl https://your-worker.workers.dev?orders=order
     ```
   - MicroCMSのAPIが正常に動作しているか確認（ブラウザで直接アクセスしてテスト）

4. **ブラウザでの確認**
   - ブラウザのコンソール（F12 > Console）でエラーメッセージを確認
   - NetworkタブでAPIリクエストが失敗していないか確認
   - リクエストのURLとステータスコードを確認
