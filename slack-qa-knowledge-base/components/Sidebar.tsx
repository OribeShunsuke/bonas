'use client';

import { CATEGORIES, Category } from '@/lib/types';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function Sidebar({
  selectedCategory,
  onCategoryChange,
  availableTags,
  selectedTags,
  onTagToggle,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-apple-gray-50 border-r border-apple-gray-200 p-6 custom-scrollbar overflow-y-auto">
      {/* カテゴリフィルタ */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-apple-gray-900 mb-3">
          カテゴリ
        </h2>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
              selectedCategory === 'all'
                ? 'bg-apple-blue text-white'
                : 'text-apple-gray-700 hover:bg-apple-gray-200'
            }`}
          >
            すべて
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                selectedCategory === category
                  ? 'bg-apple-blue text-white'
                  : 'text-apple-gray-700 hover:bg-apple-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* タグフィルタ */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-apple-gray-900 mb-3">
          人気のタグ
        </h2>
        <div className="flex flex-wrap gap-2">
          {availableTags.slice(0, 15).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`badge ${
                selectedTags.includes(tag)
                  ? 'badge-blue'
                  : 'badge-gray hover:bg-apple-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* クイック統計 */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-apple-gray-900 mb-3">
          統計情報
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-apple-gray-600">総質問数</span>
            <span className="font-semibold text-apple-gray-900">242</span>
          </div>
          <div className="flex justify-between">
            <span className="text-apple-gray-600">回答済み</span>
            <span className="font-semibold text-green-600">215</span>
          </div>
          <div className="flex justify-between">
            <span className="text-apple-gray-600">未回答</span>
            <span className="font-semibold text-orange-600">27</span>
          </div>
          <div className="flex justify-between">
            <span className="text-apple-gray-600">平均回答数</span>
            <span className="font-semibold text-apple-gray-900">2.4</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
