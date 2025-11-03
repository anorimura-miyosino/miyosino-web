# みよしのウェブサイト

## GitHub Pagesでのデプロイ設定

### 1. GitHub Secretsの設定

GitHub PagesでMicroCMSのAPIデータを取得するには、GitHubリポジトリのSettingsでSecretsを設定する必要があります。

#### 設定手順

1. GitHubリポジトリにアクセス
2. **Settings** > **Secrets and variables** > **Actions** を開く
3. **New repository secret** をクリック
4. 以下のSecretsを追加：

#### 必須のSecret

- **`MICROCMS_API_KEY`**
  - 値：MicroCMSのAPIキー
  - MicroCMSの管理画面 > API設定 > 書き込みAPIキーまたは読み取り専用APIキー

- **`TURNSTILE_SECRET_KEY`**
  - 値：Cloudflare Turnstileのシークレットキー（サーバーサイド検証用）
  - [Cloudflare Dashboard](https://dash.cloudflare.com/) > Turnstile > サイト設定から取得

#### オプションのSecret

- **`MICROCMS_API_BASE_URL`**
  - 値：MicroCMSのAPIエンドポイントURL
  - 例：`https://k-miyoshino.microcms.io/api/v1`
  - 未設定の場合は、デフォルト値が使用されます

- **`NEXT_PUBLIC_TURNSTILE_SITE_KEY`**
  - 値：Cloudflare Turnstileのサイトキー（クライアントサイド表示用）
  - [Cloudflare Dashboard](https://dash.cloudflare.com/) > Turnstile > サイト設定から取得
  - 未設定の場合、Turnstileウィジェットは表示されませんが、フォーム送信は動作します
  - ⚠️ **注意**: `NEXT_PUBLIC_`プレフィックスが付いているため、ビルド時にクライアントコードに埋め込まれます（公開されるため機密情報ではありません）

### 2. ローカル開発環境の設定

ローカルで開発する場合は、`.env.local`ファイルを作成してください：

```bash
# .env.local
MICROCMS_API_KEY=your_api_key_here
MICROCMS_API_BASE_URL=https://k-miyoshino.microcms.io/api/v1

# Cloudflare Turnstile（お問い合わせフォームのボット対策）
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

⚠️ **注意**: `.env.local`はGitにコミットしないでください（`.gitignore`に含まれています）

### 3. APIキーの取得方法

#### MicroCMS APIキー

1. [MicroCMS](https://microcms.io/)にログイン
2. 対象のサービスを選択
3. **API設定** > **APIキー** からキーを取得
   - **読み取り専用APIキー**：ビルド時にデータを取得するだけならこちらで十分
   - **書き込みAPIキー**：データの更新も行う場合はこちら

#### Cloudflare Turnstileキー

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. **Turnstile** を選択
3. 新しいサイトを追加（まだ作成していない場合）
4. **Site Key**（サイトキー）と**Secret Key**（シークレットキー）をコピー
   - **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`に設定
   - **Secret Key** → `TURNSTILE_SECRET_KEY`に設定

⚠️ **注意**: Site Keyは公開されても問題ありませんが、Secret Keyは絶対に公開してはいけません

### 4. ビルドとデプロイ

GitHubにpushすると、自動的にビルドとデプロイが実行されます。

- `master`ブランチにpushすると自動デプロイ
- ワークフローは `.github/workflows/deploy.yml` で定義されています

### トラブルシューティング

#### ヒーロー画像が表示されない場合

1. **GitHub Actionsのビルドログを確認**
   - リポジトリ > Actions > 最新のワークフロー実行を開く
   - ビルドログで以下のメッセージを確認：
     - `[Home] MicroCMS API Key: 設定済み` または `未設定`
     - `[Home] 取得した写真数: X`
     - `[Home] デフォルト写真URL: https://...`
   - エラーメッセージがないか確認

2. **GitHub Secretsの確認**
   - `MICROCMS_API_KEY`が正しく設定されているか確認
   - Secretsの名前が正確か確認（大文字小文字を区別）

3. **MicroCMSのAPIエンドポイント確認**
   - MicroCMSの管理画面で`photo`エンドポイントが存在するか確認
   - APIキーに読み取り権限があるか確認

4. **ブラウザのコンソールで確認**
   - GitHub Pagesで公開されたページを開く
   - F12 > Consoleで以下を確認：
     - `[HeroSection] 画像URL: ...` のログが表示されているか
     - 画像読み込みエラーが表示されていないか
   - Networkタブで画像リクエストが失敗していないか確認

#### ビルド時にデータが取得できない場合

1. GitHub Secretsが正しく設定されているか確認
2. MicroCMSのAPIキーの権限を確認（読み取り権限があるか）
3. MicroCMSのAPIエンドポイントURLが正しいか確認
4. GitHub Actionsのビルドログでエラーメッセージを確認

#### ローカルでデータが取得できない場合

1. `.env.local`ファイルが存在するか確認
2. `MICROCMS_API_KEY`が正しく設定されているか確認
3. MicroCMSのAPIが正常に動作しているか確認（ブラウザで直接アクセスしてテスト）
4. ビルドログで取得した写真数やURLが表示されているか確認
