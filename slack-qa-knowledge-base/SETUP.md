# 🔧 セットアップガイド

このガイドでは、Slack Q&A Knowledge Baseアプリケーションのセットアップ手順を詳しく説明します。

## 📋 前提条件

- Node.js 18.x 以上
- npm または yarn
- Slackワークスペースへのアクセス権限
- Vercelアカウント（デプロイ用）

## 🚀 ステップ1: プロジェクトのセットアップ

### 1.1 リポジトリのクローン

```bash
git clone <repository-url>
cd slack-qa-knowledge-base
```

### 1.2 依存関係のインストール

```bash
npm install
```

## 🤖 ステップ2: Slack Botの作成

### 2.1 Slackアプリの作成

1. [Slack API](https://api.slack.com/apps) にアクセス
2. 「**Create New App**」ボタンをクリック
3. 「**From scratch**」を選択
4. アプリ名を入力（例: `Q&A Knowledge Bot`）
5. 開発するワークスペースを選択
6. 「**Create App**」をクリック

### 2.2 ボットの権限設定

1. 左メニューから「**OAuth & Permissions**」を選択
2. 「**Scopes**」セクションまでスクロール
3. 「**Bot Token Scopes**」に以下のスコープを追加:
   - `channels:history` - チャンネルのメッセージ履歴を読み取る
   - `channels:read` - チャンネル情報を読み取る
   - `users:read` - ユーザー情報を読み取る
   - `users:read.email` - ユーザーのメールアドレスを読み取る（オプション）

### 2.3 ワークスペースへのインストール

1. ページ上部の「**Install to Workspace**」ボタンをクリック
2. 権限の確認画面で「**許可する**」をクリック
3. 表示される「**Bot User OAuth Token**」をコピー
   - `xoxb-` で始まるトークンです
   - このトークンは後で使用するので安全に保管してください

### 2.4 チャンネルへの招待

1. Slackワークスペースの質問チャンネルを開く
2. チャンネル詳細を開く（チャンネル名をクリック）
3. 「**インテグレーション**」タブを選択
4. 「**アプリを追加する**」をクリック
5. 作成したボットを選択して追加

### 2.5 チャンネルIDの取得

1. Slackのチャンネルを開く
2. チャンネル名をクリックして詳細を表示
3. 下部にある「**チャンネルID**」をコピー
   - `C01234567890` のような形式です

## ⚙️ ステップ3: 環境変数の設定

### 3.1 .env.local ファイルの作成

プロジェクトルートに `.env.local` ファイルを作成:

```bash
cp .env.local.example .env.local
```

### 3.2 環境変数の入力

`.env.local` ファイルを開いて、以下の値を入力:

```env
SLACK_BOT_TOKEN=xoxb-your-actual-bot-token-here
SLACK_CHANNEL_ID=C01234567890
```

**重要**: `.env.local` ファイルは絶対にGitにコミットしないでください！

## 🧪 ステップ4: ローカル開発

### 4.1 開発サーバーの起動

```bash
npm run dev
```

### 4.2 アクセス

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### 4.3 動作確認

- [ ] ページが正常に表示される
- [ ] 検索バーが動作する
- [ ] カテゴリフィルタが動作する
- [ ] Q&Aカードが表示される
- [ ] 回答の展開/折りたたみが動作する

## 🌐 ステップ5: Vercelへのデプロイ

### 5.1 GitHubへのプッシュ

```bash
git add .
git commit -m "Initial commit: Slack Q&A Knowledge Base"
git push origin main
```

### 5.2 Vercelプロジェクトの作成

1. [Vercel](https://vercel.com) にアクセス
2. GitHubアカウントでログイン
3. 「**New Project**」をクリック
4. リポジトリを選択
5. 「**Import**」をクリック

### 5.3 環境変数の設定

1. 「**Environment Variables**」セクションを展開
2. 以下の環境変数を追加:
   - Name: `SLACK_BOT_TOKEN`
   - Value: `xoxb-...` （あなたのボットトークン）
   - Environment: `Production`, `Preview`, `Development` すべてにチェック
3. 同様に `SLACK_CHANNEL_ID` も追加

### 5.4 デプロイ

1. 「**Deploy**」ボタンをクリック
2. デプロイが完了するまで待つ（通常1-2分）
3. デプロイ完了後、URLが表示されます

## 🔄 ステップ6: 自動更新の設定（オプション）

### 6.1 Vercel Cronジョブの設定

定期的にSlackからデータを取得したい場合:

1. `app/api/update/route.ts` を作成
2. Slackからデータを取得するAPIエンドポイントを実装
3. Vercel Cron Jobs を設定（例: 1時間ごと）

```typescript
// app/api/update/route.ts
export async function GET() {
  // Slackからデータを取得
  // Google Sheetsに保存
  return Response.json({ success: true });
}
```

```json
// vercel.json に追加
{
  "crons": [{
    "path": "/api/update",
    "schedule": "0 * * * *"
  }]
}
```

## 🐛 トラブルシューティング

### エラー: "Invalid token"

- Slack Bot Tokenが正しいか確認
- トークンの前後にスペースがないか確認
- ボットがワークスペースにインストールされているか確認

### エラー: "Channel not found"

- チャンネルIDが正しいか確認
- ボットがチャンネルに追加されているか確認

### ビルドエラー

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### Vercelデプロイエラー

- 環境変数が正しく設定されているか確認
- ビルドログを確認
- Node.jsバージョンを確認（推奨: 18.x）

## 📚 次のステップ

- [ ] 実際のSlack APIとの連携を実装
- [ ] Google Sheetsへのデータ保存を実装
- [ ] カスタムドメインの設定
- [ ] アナリティクスの追加（Google Analytics等）
- [ ] Phase 2の機能を実装

## 💡 ヒント

- **開発時はモックデータを使用**: `lib/slack.ts` にモックデータが用意されています
- **環境変数の管理**: 本番環境と開発環境で異なる値を使用できます
- **デバッグ**: ブラウザの開発者ツールのコンソールを確認してください

## 🔗 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Slack API Documentation](https://api.slack.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

セットアップで問題が発生した場合は、[Issues](../../issues) で質問してください。
