/**
 * Q&Aデータの型定義
 */

export interface Reply {
  text: string;
  author: string;
  authorIcon?: string;
  timestamp: string;
}

export interface QAItem {
  id: string;
  question: string;
  author: string;
  authorIcon?: string;
  timestamp: string;
  replies: Reply[];
  tags: string[];
  category: string;
  replyCount: number;
}

export interface SlackMessage {
  ts: string;
  text: string;
  user: string;
  thread_ts?: string;
  reply_count?: number;
}

export interface SlackUser {
  id: string;
  name: string;
  real_name: string;
  profile: {
    image_48?: string;
    image_72?: string;
    image_192?: string;
  };
}

export interface SlackThread {
  messages: SlackMessage[];
}

/**
 * カテゴリの型定義
 */
export type Category =
  | '技術的質問'
  | 'ビジネス相談'
  | 'サービス利用方法'
  | 'トラブルシューティング'
  | 'その他';

export const CATEGORIES: Category[] = [
  '技術的質問',
  'ビジネス相談',
  'サービス利用方法',
  'トラブルシューティング',
  'その他',
];

/**
 * フィルタリング条件の型定義
 */
export interface FilterOptions {
  category?: Category | 'all';
  tags?: string[];
  hasReplies?: boolean;
  dateFrom?: string;
  dateTo?: string;
}
