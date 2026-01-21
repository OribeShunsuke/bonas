'use client';

import SearchBar from './SearchBar';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-apple-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ・タイトル */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-apple-gray-900">
                Q&A Knowledge Base
              </h1>
              <p className="text-xs text-apple-gray-500">サロン質問チャンネル</p>
            </div>
          </div>

          {/* 検索バー（デスクトップ） */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* 統計情報 */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-apple-gray-600">
            <div className="text-center">
              <div className="font-semibold text-apple-gray-900">242</div>
              <div className="text-xs">質問</div>
            </div>
            <div className="w-px h-8 bg-apple-gray-200"></div>
            <div className="text-center">
              <div className="font-semibold text-apple-gray-900">589</div>
              <div className="text-xs">回答</div>
            </div>
          </div>
        </div>

        {/* 検索バー（モバイル） */}
        <div className="md:hidden pb-3">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
}
