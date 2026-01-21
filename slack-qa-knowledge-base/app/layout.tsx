import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Slack Q&A Knowledge Base',
  description: 'サロン質問チャンネルのナレッジベース',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
