# Next.js 認証テストアプリケーション

このプロジェクトは、Next.jsとSupabaseを使用して複数の認証方式を実装するデモアプリケーションです。

## 実装されている認証方式

- Email + パスワード認証
- OAuth認証（Google、GitHub）
- 匿名認証

## 技術スタック

- Next.js 14
- Supabase（認証バックエンド）
- TypeScript
- Tailwind CSS
- Docker

## セットアップと実行方法

### 環境変数の設定

プロジェクトのルートディレクトリに`.env.local`ファイルを作成し、以下の環境変数を設定してください。
OAuth認証を使用する場合は、認証用の環境変数も設定してください。

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_JWT_SECRET=<your-supabase-jwt-secret>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
SUPABASE_GOOGLE_CLIENT_ID=<your-supabase-google-client-id>
SUPABASE_GOOGLE_CLIENT_SECRET=<your-supabase-google-client-secret>
SUPABASE_GITHUB_CLIENT_ID=<your-supabase-github-client-id>
SUPABASE_GITHUB_CLIENT_SECRET=<your-supabase-github-client-secret>
```

### Dockerを使用した実行

```bash
# コンテナのビルドと起動
docker-compose up -d --build

# アプリケーションにアクセス
http://localhost:3000
```

### ローカル環境での実行

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# アプリケーションにアクセス
http://localhost:3000
```

### Supabaseローカル開発環境

```bash
# Supabaseローカル開発環境の起動
npx supabase start

# 停止する場合
npx supabase stop
```

## 機能

- ユーザー登録・ログイン（Email + パスワード）
- ソーシャルログイン（Google、GitHub）
- 匿名ログイン
- ユーザープロフィール表示
- ログアウト機能

## フォルダ構成

- `/app` - Next.jsアプリケーションのソースコード
  - `/auth` - 認証関連のページ
  - `/profile` - ユーザープロフィール関連のページ
- `/lib` - 共通ライブラリ（Supabaseクライアントなど）
- `/supabase` - Supabase設定ファイル
