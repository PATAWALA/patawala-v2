// app/blog/page.tsx
import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog & Insights Tech',
  description: 'Articles premium sur le développement web, l\'IA, l\'automatisation et l\'entrepreneuriat digital. Analyses, guides et retours d\'expérience par Patawala.',
  openGraph: {
    title: 'Patawala | Blog & Insights Tech Premium',
    description: 'Analyses pointues, retours d\'expérience et tutoriels avancés sur le développement web, l\'IA et l\'automatisation.',
    images: [{ url: '/og-image-gold.png', width: 1200, height: 630, alt: 'Blog Patawala' }],
  },
  alternates: { canonical: 'https://www.patawala.com/blog' },
};

export default function BlogPage() { return <BlogPageClient />; }