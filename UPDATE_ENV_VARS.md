# Cloudflare Workers 環境変数の更新方法

## 方法1: Wrangler CLI（推奨）

### 必要な環境変数を更新するコマンド

```bash
cd workers

# KINTONE_API_TOKEN_CIRCULARS を更新
wrangler secret put KINTONE_API_TOKEN_CIRCULARS --config wrangler.circulars.toml

# その他の環境変数も同様に更新可能
wrangler secret put KINTONE_DOMAIN --config wrangler.circulars.toml
wrangler secret put JWT_SECRET --config wrangler.circulars.toml
```

実行すると、対話的に値を入力するよう求められます。
APIトークンを入力してEnterキーを押してください。

### 現在の環境変数を確認する方法

```bash
cd workers
wrangler secret list --config wrangler.circulars.toml
```

### 環境変数を削除する方法

```bash
cd workers
wrangler secret delete KINTONE_API_TOKEN_CIRCULARS --config wrangler.circulars.toml
```

## 方法2: Cloudflare Dashboard（Web UI）

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 左側のメニューから「Workers & Pages」を選択
3. 「miyosino-circulars」Workerを選択
4. 「Settings」タブをクリック
5. 「Variables」セクションまでスクロール
6. 「Environment Variables」または「Secrets」をクリック
7. 「Add variable」または既存の変数を編集
8. 変数名: `KINTONE_API_TOKEN_CIRCULARS`
9. 値を入力して保存

## 注意事項

- `wrangler secret put` で設定した値は暗号化されて保存されます
- 環境変数を更新した後、Workerは自動的に再デプロイされます
- 変更が反映されるまで数秒かかる場合があります

## トラブルシューティング

### Wrangler CLIがインストールされていない場合

```bash
npm install -g wrangler
# または
npm install wrangler --save-dev
```

### 認証が必要な場合

```bash
wrangler login
```

### 設定ファイルのパスが正しいか確認

```bash
cd workers
wrangler whoami
```




