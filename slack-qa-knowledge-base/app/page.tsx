'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import QACard from '@/components/QACard';
import { QAItem } from '@/lib/types';
import { fetchSlackMessages, filterQAItems } from '@/lib/slack';

export default function Home() {
  const [qaItems, setQaItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // データ取得
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchSlackMessages();
        setQaItems(data);
      } catch (error) {
        console.error('Failed to fetch Q&A data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 利用可能なタグの抽出
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    qaItems.forEach((item) => {
      item.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [qaItems]);

  // フィルタリング済みアイテム
  const filteredItems = useMemo(() => {
    return filterQAItems(
      qaItems,
      searchQuery,
      selectedCategory,
      selectedTags.length > 0 ? selectedTags : undefined
    );
  }, [qaItems, searchQuery, selectedCategory, selectedTags]);

  // タグトグル
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-apple-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-apple-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-gray-50">
      <Header onSearch={setSearchQuery} />

      <div className="flex">
        {/* サイドバー */}
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />

        {/* メインコンテンツ */}
        <main className="flex-1 p-6 custom-scrollbar overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="max-w-4xl mx-auto">
            {/* 検索結果ヘッダー */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-apple-gray-900 mb-2">
                {searchQuery
                  ? `"${searchQuery}" の検索結果`
                  : selectedCategory !== 'all'
                  ? selectedCategory
                  : 'すべての質問'}
              </h2>
              <p className="text-apple-gray-600">
                {filteredItems.length}件の質問が見つかりました
              </p>

              {/* アクティブなフィルタ表示 */}
              {(selectedTags.length > 0 || selectedCategory !== 'all') && (
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-sm text-apple-gray-600">フィルタ:</span>
                  {selectedCategory !== 'all' && (
                    <span className="badge badge-blue">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-2 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedTags.map((tag) => (
                    <span key={tag} className="badge badge-blue">
                      #{tag}
                      <button
                        onClick={() => handleTagToggle(tag)}
                        className="ml-2 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTags([]);
                      setSearchQuery('');
                    }}
                    className="text-sm text-apple-blue hover:text-blue-600"
                  >
                    すべてクリア
                  </button>
                </div>
              )}
            </div>

            {/* Q&Aカードリスト */}
            {filteredItems.length > 0 ? (
              <div>
                {filteredItems.map((item) => (
                  <QACard key={item.id} item={item} searchQuery={searchQuery} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-apple-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
                  該当する質問が見つかりませんでした
                </h3>
                <p className="text-apple-gray-600">
                  検索条件を変更するか、フィルタをクリアしてみてください
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
