# Node.jsのLTSバージョンを使用
FROM node:20-alpine

# Alpineのパッケージマネージャ(apk)を使ってbashをインストールします
RUN apk update && apk add bash git docker

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# アプリケーションのソースコードをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "run", "dev"]

