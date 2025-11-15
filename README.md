# みよしのウェブサイト

## GitHub Pagesでのデプロイ設定

### 1. GitHub Secretsの設定

MicroCMSのAPIデータはクライアントサイドでリアルタイムに取得されます。APIキーはビルド時にクライアントコードに埋め込まれるため、GitHubリポジトリのSettingsでSecretsを設定する必要があります。

#### 設定手順

1. GitHubリポジトリにアクセス
2. **Settings** > **Secrets and variables** > **Actions** を開く
3. **New repository secret** をクリック
4. 以下のSecretsを追加：

#### 必須のSecret

- **`MICROCMS_API_KEY`** または **`NEXT_PUBLIC_MICROCMS_API_KEY`**
  - 値：MicroCMSのAPIキー
  - MicroCMSの管理画面 > API設定 > 読み取り専用APIキー
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれます（公開されるため機密情報ではありません）

- **`TURNSTILE_SECRET_KEY`**
  - 値：Cloudflare Turnstileのシークレットキー（サーバーサイド検証用）
  - [Cloudflare Dashboard](https://dash.cloudflare.com/) > Turnstile > サイト設定から取得

#### オプションのSecret

- **`MICROCMS_API_BASE_URL`** または **`NEXT_PUBLIC_MICROCMS_API_BASE_URL`**
  - 値：MicroCMSのAPIエンドポイントURL
  - 例：`https://k-miyoshino.microcms.io/api/v1`
  - 未設定の場合は、デフォルト値が使用されます
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれます

- **`NEXT_PUBLIC_TURNSTILE_SITE_KEY`**
  - 値：Cloudflare Turnstileのサイトキー（クライアントサイド表示用）
  - [Cloudflare Dashboard](https://dash.cloudflare.com/) > Turnstile > サイト設定から取得
  - 未設定の場合、Turnstileウィジェットは表示されませんが、フォーム送信は動作します
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれます（公開されるため機密情報ではありません）

- **`NEXT_PUBLIC_CONTACT_API_URL`** (オプション)
  - 値：お問い合わせフォーム送信用の外部APIエンドポイントURL
  - 例：`https://your-api.workers.dev/api/contact` または `https://your-vercel-app.vercel.app/api/contact`
  - ⚠️ **重要**: 静的エクスポート（`output: 'export'`）を使用している場合、Next.jsのAPIルート（`/api/contact`）は動作しません
  - 外部APIエンドポイント（Cloudflare Workers、Vercel Functions、AWS Lambdaなど）を設定する必要があります
  - 未設定の場合、フォーム送信時にエラーが発生します

### 2. ローカル開発環境の設定

ローカルで開発する場合は、`.env.local`ファイルを作成してください：

```bash
# .env.local
# クライアントサイドで使用するため、NEXT_PUBLIC_プレフィックスが必要
NEXT_PUBLIC_MICROCMS_API_KEY=your_api_key_here
NEXT_PUBLIC_MICROCMS_API_BASE_URL=https://k-miyoshino.microcms.io/api/v1

# Cloudflare Turnstile（お問い合わせフォームのボット対策）
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here

# お問い合わせフォームAPIエンドポイント（静的エクスポートの場合に必須）
# ローカル開発時は '/api/contact' を使用可能（next dev の場合）
# 本番環境では外部APIエンドポイントを設定（Cloudflare Workers、Vercel Functionsなど）
NEXT_PUBLIC_CONTACT_API_URL=https://your-api-endpoint.com/api/contact
```

⚠️ **注意**: `.env.local`はGitにコミットしないでください（`.gitignore`に含まれています）

### 3. Dockerを使用した開発環境

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

### 4. APIキーの取得方法

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
   - **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`に設定
   - **Secret Key** → `TURNSTILE_SECRET_KEY`に設定

⚠️ **注意**: Site Keyは公開されても問題ありませんが、Secret Keyは絶対に公開してはいけません

### 5. ビルドとデプロイ

GitHubにpushすると、自動的にビルドとデプロイが実行されます。

- `master`ブランチにpushすると自動デプロイ
- ワークフローは `.github/workflows/deploy.yml` で定義されています

### トラブルシューティング

#### ヒーロー画像が表示されない場合

1. **ブラウザのコンソールで確認**
   - GitHub Pagesで公開されたページを開く
   - F12 > Consoleで以下を確認：
     - `[HeroSection] MicroCMS API key is not set` の警告が表示されていないか
     - `[HeroSection] 写真取得エラー:` のエラーが表示されていないか
     - 画像読み込みエラーが表示されていないか
   - NetworkタブでMicroCMS APIリクエストが失敗していないか確認

2. **GitHub Secretsの確認**
   - `MICROCMS_API_KEY`が正しく設定されているか確認
   - `NEXT_PUBLIC_MICROCMS_API_KEY`として設定されているか確認（クライアントサイドで使用するため`NEXT_PUBLIC_`プレフィックスが必要）
   - Secretsの名前が正確か確認（大文字小文字を区別）

3. **MicroCMSのAPIエンドポイント確認**
   - MicroCMSの管理画面で`photo`エンドポイントが存在するか確認
   - APIキーに読み取り権限があるか確認

4. **環境変数の確認**
   - ビルド時に`NEXT_PUBLIC_MICROCMS_API_KEY`が正しく設定されているか確認
   - GitHub Actionsのビルドログで環境変数が設定されているか確認

#### ローカルでデータが取得できない場合

1. `.env.local`ファイルが存在するか確認
2. `NEXT_PUBLIC_MICROCMS_API_KEY`が正しく設定されているか確認（クライアントサイドで使用するため`NEXT_PUBLIC_`プレフィックスが必要）
3. MicroCMSのAPIが正常に動作しているか確認（ブラウザで直接アクセスしてテスト）
4. ブラウザのコンソール（F12 > Console）でエラーメッセージを確認
5. NetworkタブでMicroCMS APIリクエストが失敗していないか確認
