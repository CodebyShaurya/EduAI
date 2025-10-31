import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import SessionWrapper from '@/components/SessionWrapper';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'EduAI - AI-Powered Socratic Learning Platform',
    template: '%s | EduAI'
  },
  description: 'Revolutionary AI tutor using the Socratic method for deep learning. Build critical thinking through guided discovery, not direct answers. Powered by advanced AI technology.',
  keywords: [
    'AI education', 'Socratic method', 'machine learning tutoring', 'critical thinking',
    'adaptive learning', 'AI tutor', 'educational technology', 'personalized learning',
    'deep learning education', 'guided discovery', 'interactive AI', 'smart tutoring'
  ],
  authors: [{ name: 'EduAI Team' }],
  creator: 'EduAI',
  publisher: 'EduAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eduai.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eduai.app',
    title: 'EduAI - AI-Powered Socratic Learning Platform',
    description: 'Revolutionary AI tutor using the Socratic method for deep learning. Build critical thinking through guided discovery.',
    siteName: 'EduAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EduAI - AI-Powered Socratic Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduAI - AI-Powered Socratic Learning Platform',
    description: 'Revolutionary AI tutor using the Socratic method for deep learning.',
    images: ['/og-image.png'],
    creator: '@eduai_platform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'EduAI',
              description: 'AI-Powered Socratic Learning Platform',
              url: 'https://eduai.app',
              logo: 'https://eduai.app/logo.png',
              sameAs: [
                'https://twitter.com/eduai_platform',
                'https://github.com/eduai-platform'
              ],
              offers: {
                '@type': 'Offer',
                category: 'Educational Technology',
                availability: 'https://schema.org/InStock'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}