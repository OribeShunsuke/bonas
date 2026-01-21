/**
 * Slack API連携とデータ取得機能
 */

import { QAItem, Reply, Category, CATEGORIES } from './types';

/**
 * Slackからメッセージを取得（モックデータ）
 * 実際の実装では Slack Web API を使用
 */
export async function fetchSlackMessages(): Promise<QAItem[]> {
  // TODO: 実際のSlack API連携を実装
  // const response = await fetch('https://slack.com/api/conversations.history', {
  //   headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` }
  // });

  // モックデータを返す（開発用）
  return getMockQAData();
}

/**
 * カテゴリを自動判定
 */
export function categorizeQuestion(question: string): Category {
  const lowerQuestion = question.toLowerCase();

  // キーワードベースの簡易分類
  if (lowerQuestion.match(/エラー|バグ|動かない|問題|解決/)) {
    return 'トラブルシューティング';
  }
  if (lowerQuestion.match(/技術|実装|コード|開発|プログラミング|api/)) {
    return '技術的質問';
  }
  if (lowerQuestion.match(/ビジネス|売上|収益|マーケティング|戦略/)) {
    return 'ビジネス相談';
  }
  if (lowerQuestion.match(/使い方|方法|手順|やり方|設定/)) {
    return 'サービス利用方法';
  }

  return 'その他';
}

/**
 * 自動タグ生成
 */
export function generateTags(text: string): string[] {
  const keywords = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
    'API', 'データベース', 'デプロイ', 'Vercel', 'Slack',
    '初心者', '料金', 'セキュリティ', 'パフォーマンス', 'デザイン'
  ];

  const tags: string[] = [];
  const lowerText = text.toLowerCase();

  for (const keyword of keywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      tags.push(keyword);
      if (tags.length >= 5) break;
    }
  }

  return tags;
}

/**
 * モックデータ（開発・デモ用）
 */
function getMockQAData(): QAItem[] {
  const mockData: QAItem[] = [
    {
      id: '1',
      question: 'Next.jsでAPIルートを作成する方法を教えてください',
      author: '山田太郎',
      authorIcon: 'https://avatars.slack-edge.com/2024-01-01/1_48.png',
      timestamp: '2026-01-20T10:30:00Z',
      replies: [
        {
          text: 'app/api ディレクトリ内に route.ts ファイルを作成することで、APIエンドポイントを作成できます。例えば、app/api/hello/route.ts のように配置します。',
          author: '佐藤花子',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/2_48.png',
          timestamp: '2026-01-20T10:35:00Z',
        },
        {
          text: '補足ですが、export async function GET() のように HTTP メソッドに対応する関数をエクスポートすることで、それぞれのメソッドに対応できます。',
          author: '鈴木一郎',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/3_48.png',
          timestamp: '2026-01-20T10:40:00Z',
        },
      ],
      tags: ['Next.js', 'API'],
      category: '技術的質問',
      replyCount: 2,
    },
    {
      id: '2',
      question: 'Vercelにデプロイした後、環境変数が読み込まれません',
      author: '田中二郎',
      authorIcon: 'https://avatars.slack-edge.com/2024-01-01/4_48.png',
      timestamp: '2026-01-19T14:20:00Z',
      replies: [
        {
          text: 'Vercelのダッシュボードで環境変数を設定しましたか？Settings > Environment Variables から追加する必要があります。',
          author: '山田太郎',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/1_48.png',
          timestamp: '2026-01-19T14:25:00Z',
        },
        {
          text: 'また、環境変数を追加した後は再デプロイが必要です。Deployments タブから Redeploy を実行してください。',
          author: '佐藤花子',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/2_48.png',
          timestamp: '2026-01-19T14:30:00Z',
        },
      ],
      tags: ['Vercel', 'デプロイ'],
      category: 'トラブルシューティング',
      replyCount: 2,
    },
    {
      id: '3',
      question: 'Slackボットの料金プランについて教えてください',
      author: '伊藤三郎',
      authorIcon: 'https://avatars.slack-edge.com/2024-01-01/5_48.png',
      timestamp: '2026-01-18T09:15:00Z',
      replies: [
        {
          text: 'Slack APIは基本的に無料で利用できます。ただし、レート制限があるので注意が必要です。',
          author: '鈴木一郎',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/3_48.png',
          timestamp: '2026-01-18T09:20:00Z',
        },
      ],
      tags: ['Slack', '料金'],
      category: 'サービス利用方法',
      replyCount: 1,
    },
    {
      id: '4',
      question: 'TypeScriptの型定義がうまく推論されない',
      author: '渡辺四郎',
      authorIcon: 'https://avatars.slack-edge.com/2024-01-01/6_48.png',
      timestamp: '2026-01-17T16:45:00Z',
      replies: [],
      tags: ['TypeScript'],
      category: '技術的質問',
      replyCount: 0,
    },
    {
      id: '5',
      question: 'ビジネスモデルをSaaSからマーケットプレイスに変更するメリットは？',
      author: '小林五郎',
      authorIcon: 'https://avatars.slack-edge.com/2024-01-01/7_48.png',
      timestamp: '2026-01-16T11:00:00Z',
      replies: [
        {
          text: 'マーケットプレイスモデルは、ネットワーク効果により成長が加速する可能性があります。ただし、初期の流動性確保が課題です。',
          author: '山田太郎',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/1_48.png',
          timestamp: '2026-01-16T11:30:00Z',
        },
        {
          text: '収益化の観点では、取引手数料モデルになるため、ユーザー数が増えれば収益も自動的に増加します。',
          author: '佐藤花子',
          authorIcon: 'https://avatars.slack-edge.com/2024-01-01/2_48.png',
          timestamp: '2026-01-16T12:00:00Z',
        },
      ],
      tags: ['ビジネス', '戦略'],
      category: 'ビジネス相談',
      replyCount: 2,
    },
  ];

  return mockData;
}

/**
 * 検索フィルタリング
 */
export function filterQAItems(
  items: QAItem[],
  searchQuery: string,
  category?: string,
  tags?: string[]
): QAItem[] {
  let filtered = items;

  // カテゴリフィルタ
  if (category && category !== 'all') {
    filtered = filtered.filter(item => item.category === category);
  }

  // タグフィルタ
  if (tags && tags.length > 0) {
    filtered = filtered.filter(item =>
      tags.some(tag => item.tags.includes(tag))
    );
  }

  // 検索クエリフィルタ
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      const questionMatch = item.question.toLowerCase().includes(query);
      const repliesMatch = item.replies.some(reply =>
        reply.text.toLowerCase().includes(query)
      );
      const authorMatch = item.author.toLowerCase().includes(query);

      return questionMatch || repliesMatch || authorMatch;
    });
  }

  return filtered;
}
