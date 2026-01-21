'use client';

import { useState } from 'react';
import { QAItem } from '@/lib/types';

interface QACardProps {
  item: QAItem;
  searchQuery?: string;
}

export default function QACard({ item, searchQuery }: QACardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-apple-gray-900">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '技術的質問': 'bg-blue-100 text-blue-800',
      'ビジネス相談': 'bg-purple-100 text-purple-800',
      'サービス利用方法': 'bg-green-100 text-green-800',
      'トラブルシューティング': 'bg-red-100 text-red-800',
      'その他': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card p-6 mb-4 fade-in">
      {/* ヘッダー */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            {item.author.charAt(0)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-apple-gray-900">
              {item.author}
            </span>
            <span className="text-xs text-apple-gray-500">
              {formatDate(item.timestamp)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`badge ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
            {item.replyCount > 0 && (
              <span className="badge badge-gray">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.replyCount}件の回答
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 質問本文 */}
      <div className="mb-4">
        <p className="text-apple-gray-900 leading-relaxed">
          {highlightText(item.question)}
        </p>
      </div>

      {/* タグ */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag) => (
            <span key={tag} className="badge badge-gray text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 回答セクション */}
      {item.replyCount > 0 && (
        <div className="border-t border-apple-gray-200 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-sm font-medium text-apple-blue hover:text-blue-600"
          >
            {isExpanded ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                回答を非表示
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                {item.replyCount}件の回答を表示
              </>
            )}
          </button>

          {/* 回答リスト */}
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {item.replies.map((reply, index) => (
                <div
                  key={index}
                  className="bg-apple-gray-50 rounded-xl p-4 border border-apple-gray-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                        {reply.author.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-apple-gray-900">
                          {reply.author}
                        </span>
                        <span className="text-xs text-apple-gray-500">
                          {formatDate(reply.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-apple-gray-700 leading-relaxed">
                        {highlightText(reply.text)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 未回答の場合 */}
      {item.replyCount === 0 && (
        <div className="border-t border-apple-gray-200 pt-4">
          <div className="flex items-center text-sm text-apple-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            まだ回答がありません
          </div>
        </div>
      )}
    </div>
  );
}
