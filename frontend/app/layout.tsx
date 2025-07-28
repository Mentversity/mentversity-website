import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mentversity - Learn, Grow, Succeed', // Updated title
  description: 'Mentversity: Your platform for mastering web development, data science, AI/ML, and more. Learn from industry experts, build real-world projects, and accelerate your career.', // Updated description
  // You can add more metadata here, e.g., keywords, openGraph, etc.
  keywords: ['mentversity', 'online courses', 'web development', 'data science', 'AI/ML', 'cybersecurity', 'devops', 'react', 'node.js', 'python', 'aws'],
  authors: [{ name: 'Mentversity Team' }],
  openGraph: {
    title: 'Mentversity - Learn, Grow, Succeed',
    description: 'Mentversity: Your platform for mastering cutting-edge tech skills.',
    url: 'https://www.mentversity.com', // Replace with your actual domain
    siteName: 'Mentversity',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg', // Replace with your actual OG image
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
    images: ['https://yourdomain.com/twitter-image.jpg'], // Replace with your actual Twitter image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply the Inter font globally via the body class */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
