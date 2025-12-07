#!/bin/bash

# 新しいJWT_SECRETを生成して、.dev.varsに保存し、すべてのWorkerに設定するスクリプト

set -e

# スクリプトのディレクトリを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKERS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DEV_VARS_FILE="$WORKERS_DIR/.dev.vars"

if [ ! -f "$DEV_VARS_FILE" ]; then
  echo "❌ エラー: .dev.varsファイルが見つかりません: $DEV_VARS_FILE"
  exit 1
fi

# 新しいJWT_SECRETを生成（base64エンコード、32バイト）
echo "🔑 新しいJWT_SECRETを生成中..."
NEW_JWT_SECRET=$(openssl rand -base64 32 | tr -d '\n')

if [ -z "$NEW_JWT_SECRET" ]; then
  echo "❌ エラー: JWT_SECRETの生成に失敗しました"
  exit 1
fi

echo "✅ JWT_SECRETを生成しました（長さ: ${#NEW_JWT_SECRET}文字）"
echo "📝 生成された値: $NEW_JWT_SECRET"
echo ""

# 確認プロンプト
read -p "この値を使用して続行しますか？ (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ キャンセルしました"
  exit 1
fi

# .dev.varsファイルをバックアップ
BACKUP_FILE="${DEV_VARS_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$DEV_VARS_FILE" "$BACKUP_FILE"
echo "💾 .dev.varsをバックアップしました: $BACKUP_FILE"
echo ""

# .dev.varsファイルのJWT_SECRETを更新
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS用
  sed -i '' "s|^JWT_SECRET=.*|JWT_SECRET=$NEW_JWT_SECRET|" "$DEV_VARS_FILE"
else
  # Linux用
  sed -i "s|^JWT_SECRET=.*|JWT_SECRET=$NEW_JWT_SECRET|" "$DEV_VARS_FILE"
fi

echo "📝 .dev.varsファイルを更新しました"
echo ""

# JWT_SECRETを設定するWorkerのリスト
WORKERS=(
  "wrangler.auth.toml"
  "wrangler.announcements.toml"
  "wrangler.circulars.toml"
  "wrangler.greenwellness.toml"
  "wrangler.minutes.toml"
)

cd "$WORKERS_DIR"

echo "📦 以下のWorkerにJWT_SECRETを設定します:"
for worker in "${WORKERS[@]}"; do
  if [ -f "$worker" ]; then
    echo "  - $worker"
  else
    echo "  - $worker (ファイルが見つかりません - スキップ)"
  fi
done
echo ""

# 各WorkerにJWT_SECRETを設定
for worker in "${WORKERS[@]}"; do
  if [ ! -f "$worker" ]; then
    echo "⏭️  スキップ: $worker (ファイルが見つかりません)"
    continue
  fi

  echo "🔧 $worker にJWT_SECRETを設定中..."
  
  # echoでJWT_SECRETをパイプしてwrangler secret putに渡す
  echo "$NEW_JWT_SECRET" | npx wrangler secret put JWT_SECRET --config "$worker" || {
    echo "❌ エラー: $worker へのJWT_SECRET設定に失敗しました"
    exit 1
  }
  
  echo "✅ $worker にJWT_SECRETを設定しました"
  echo ""
done

echo "✨ すべてのWorkerにJWT_SECRETを設定しました！"
echo ""
echo "📋 設定されたJWT_SECRET:"
echo "   $NEW_JWT_SECRET"
echo ""
echo "⚠️  重要: この値を安全に保管してください。"
echo "   .dev.varsファイルに既に保存されています。"
echo ""

