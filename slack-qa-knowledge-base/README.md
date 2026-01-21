# 📋 Slack Q&A Knowledge Base

Slackのサロン質問チャンネルから質問とスレッド回答を自動取得し、ナレッジベースとして表示するウェブアプリケーション

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ 特徴

- **🎨 Appleライクなミニマルデザイン**: 洗練されたUI/UX
- **🔍 強力な検索機能**: リアルタイムインクリメンタルサーチ
- **🏷️ 自動分類**: カテゴリとタグの自動生成
- **📱 レスポンシブ対応**: モバイル、タブレット、デスクトップ
- **💰 完全無料**: データベース不要、無料ホスティング対応

## 🚀 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データ取得**: Slack Web API
- **デプロイ**: Vercel (推奨)

## 📦 インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd slack-qa-knowledge-base

# 依存関係のインストール
npm install
```

## ⚙️ 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_CHANNEL_ID=C01234567890
```

### Slack Bot トークンの取得方法

1. [Slack API](https://api.slack.com/apps) にアクセス
2. 「Create New App」をクリック
3. 「From scratch」を選択し、アプリ名とワークスペースを指定
4. 「OAuth & Permissions」に移動
5. 以下のスコープを追加:
   - `channels:history`
   - `channels:read`
   - `users:read`
6. 「Install to Workspace」をクリック
7. Bot User OAuth Token (`xoxb-...`) をコピー

## 🏃 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 🏗️ ビルド

```bash
npm run build
npm start
```

## 🌐 Vercelへのデプロイ

### 方法1: GitHub連携（推奨）

1. GitHubにリポジトリをプッシュ
2. [Vercel](https://vercel.com) にアクセスしてGitHubでログイン
3. 「New Project」をクリック
4. リポジトリを選択
5. Environment Variables に環境変数を追加
6. 「Deploy」をクリック

### 方法2: Vercel CLI

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel

# 本番環境へのデプロイ
vercel --prod
```

## 📁 プロジェクト構造

```
slack-qa-knowledge-base/
├── app/
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # メインページ
├── components/
│   ├── Header.tsx           # ヘッダーコンポーネント
│   ├── SearchBar.tsx        # 検索バー
│   ├── Sidebar.tsx          # サイドバー
│   └── QACard.tsx           # Q&Aカード
├── lib/
│   ├── types.ts             # TypeScript型定義
│   └── slack.ts             # Slack API連携
├── public/                  # 静的ファイル
├── .env.local.example       # 環境変数テンプレート
├── next.config.js           # Next.js設定
├── tailwind.config.ts       # Tailwind CSS設定
├── tsconfig.json            # TypeScript設定
└── package.json             # 依存関係
```

## 🎯 機能

### Phase 1 (MVP) - 実装済み ✅

- [x] Next.js + TypeScript + Tailwind CSS セットアップ
- [x] Slack API連携（モックデータ対応）
- [x] 基本的なQ&A表示UI
- [x] 部分一致検索機能
- [x] カテゴリ・タグフィルタリング
- [x] レスポンシブデザイン

### Phase 2 - 今後の実装予定

- [ ] 実際のSlack API連携
- [ ] Google Sheets連携
- [ ] 自動タグ生成の改善
- [ ] ソート機能（日付、回答数）
- [ ] ページネーション/無限スクロール

### Phase 3 - 将来的な機能

- [ ] ダークモード
- [ ] 仮想スクロール
- [ ] エクスポート機能
- [ ] 統計ダッシュボード

## 🤝 コントリビューション

プルリクエストは歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📄 ライセンス

[MIT](LICENSE)

## 🔗 リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Slack API Documentation](https://api.slack.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📞 サポート

問題が発生した場合は、[Issues](../../issues) で報告してください。

---

Made with ❤️ using Next.js and Tailwind CSS
