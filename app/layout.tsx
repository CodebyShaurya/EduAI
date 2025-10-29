import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SessionWrapper from '@/components/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduAI - Socratic Learning Platform',
  description: 'Learn through guided discovery with our AI tutor that asks the right questions',
  keywords: 'education, AI, learning, socratic method, tutoring',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}