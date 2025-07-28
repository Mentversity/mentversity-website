import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentversity - Learn, Grow, Succeed',
  description:
    'Mentversity: Your platform for mastering web development, data science, AI/ML, and more. Learn from industry experts, build real-world projects, and accelerate your career.',
  keywords: [
    'mentversity',
    'online courses',
    'web development',
    'data science',
    'AI/ML',
    'cybersecurity',
    'devops',
    'react',
    'node.js',
    'python',
    'aws',
  ],
  authors: [{ name: 'Mentversity Team' }],
  openGraph: {
    title: 'Mentversity - Learn, Grow, Succeed',
    description:
      'Mentversity: Your platform for mastering cutting-edge tech skills.',
    url: 'https://www.mentversity.com',
    siteName: 'Mentversity',
    images: [
      {
        url: 'https://www.mentversity.com/og-image.jpg', // ✅ Real OG image
        width: 1200,
        height: 630,
        alt: 'Mentversity Learning Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentversity - Learn, Grow, Succeed',
    description: 'Master new skills and accelerate your career with Mentversity.',
    images: ['https://www.mentversity.com/twitter-image.jpg'], // ✅ Real Twitter image
    site: '@mentversity', // ✅ Optional: your Twitter handle
    creator: '@mentversity', // Optional: Twitter handle of author/brand
  },
  icons: {
    icon: '/favicon.ico', // ✅ This is how to include favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
