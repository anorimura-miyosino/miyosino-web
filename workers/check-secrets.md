# JWT_SECRETの確認方法

## 1. Cloudflare Dashboardで確認

1. [Cloudflare Dashboard](https://dash.cloudflare.com/)にログイン
2. **Workers & Pages** を選択
3. **miyosino-auth** Workerを選択
4. **Settings** タブ → **Variables** セクション
5. **Encrypted** セクションで `JWT_SECRET` が設定されているか確認
   - ⚠️ 値は表示されません（セキュリティ上の理由）

同様に **miyosino-announcements** Workerでも確認してください。

## 2. Wranglerコマンドで確認

### 設定されているシークレットのリストを確認

```bash
cd workers

# auth Workerのシークレットを確認
npx wrangler secret list --config wrangler.auth.toml

# announcements Workerのシークレットを確認
npx wrangler secret list --config wrangler.announcements.toml
```

⚠️ 値は表示されませんが、設定されているシークレット名のリストが表示されます。

## 3. ローカル開発環境（.dev.vars）で確認

開発環境では、`workers/.dev.vars` ファイルに設定されている値を確認できます：

```bash
cat workers/.dev.vars | grep JWT_SECRET
```

現在の設定値: `xeEIbjw6fbW4BevxDmvv78xV5FqRjGDIrhmwuMI2iMA=`

## 4. 両方のWorkerで同じJWT_SECRETが設定されているか確認

### 方法1: 同じ値で再設定する（推奨）

両方のWorkerに同じJWT_SECRETを設定します：

```bash
cd workers

# 同じJWT_SECRETを両方のWorkerに設定
# まず、使用するJWT_SECRETを決めます（既存の値を使うか、新しく生成）

# 新しく生成する場合:
openssl rand -base64 32

# 既存の値を使う場合（.dev.varsから）:
# xeEIbjw6fbW4BevxDmvv78xV5FqRjGDIrhmwuMI2iMA=

# auth Workerに設定
npx wrangler secret put JWT_SECRET --config wrangler.auth.toml
# プロンプトが表示されたら、JWT_SECRETの値を入力

# announcements Workerに設定（同じ値を入力）
npx wrangler secret put JWT_SECRET --config wrangler.announcements.toml
# プロンプトが表示されたら、auth Workerと同じJWT_SECRETの値を入力
```

### 方法2: テスト用のエンドポイントを作成して確認

一時的に、両方のWorkerにテスト用のエンドポイントを追加して、JWT_SECRETが一致しているか確認できます。

## 5. 現在の設定を確認するコマンド

以下のコマンドで、両方のWorkerにJWT_SECRETが設定されているか確認できます：

```bash
cd workers

echo "=== auth Workerのシークレット ==="
npx wrangler secret list --config wrangler.auth.toml | grep JWT_SECRET

echo "=== announcements Workerのシークレット ==="
npx wrangler secret list --config wrangler.announcements.toml | grep JWT_SECRET
```

## 注意事項

- JWT_SECRETの値は直接確認できません（セキュリティ上の理由）
- 両方のWorkerで**必ず同じ値**を設定する必要があります
- 値を変更した場合は、既存のトークンは無効になります
- 本番環境と開発環境で異なるJWT_SECRETを使う場合は、環境ごとに設定してください

