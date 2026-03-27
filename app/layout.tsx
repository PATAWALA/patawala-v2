import type { Metadata } from 'next';
import './globals.css';
import { ServiceProvider } from './services/context/ServiceContext';
import { LanguageProvider } from './context/LanguageContext'; 
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import LoadingScreen from './components/ui/LoadingScreen';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { Suspense, memo } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://patawala-v2-nry6.vercel.app'),
  title: {
    default: 'Patawala | Développeur Full-Stack & Automatisation IA',
    template: '%s | Patawala'
  },
  description: 'Développeur web mobile et architecte d\'agents IA. Je transforme vos idées en solutions digitales intelligentes et performantes. Automatisation, applications modernes, innovation technologique.',
  keywords: ['développeur full-stack', 'développeur mobile', 'agents IA', 'automatisation', 'Next.js', 'React Native', 'intelligence artificielle', 'consultant tech', 'freelance expert'],
  authors: [{ name: 'Patawala', url: 'https://patawala-v2-nry6.vercel.app' }],
  creator: 'Patawala',
  publisher: 'Patawala',
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
  alternates: {
    canonical: 'https://patawala-v2-nry6.vercel.app',
  },
  openGraph: {
    title: 'Patawala | Développeur Full-Stack & Architecte IA',
    description: 'Expert en développement web/mobile et agents IA. Automatisation intelligente, applications performantes, innovation digitale. Transformez votre vision en réalité.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://patawala-v2-nry6.vercel.app/',
    siteName: 'Patawala',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'Patawala - Développeur Full-Stack & Architecte IA',
        type: 'image/x-icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patawala | Développeur Full-Stack & Architecte IA',
    description: 'Expert en développement web/mobile et agents IA. Création de solutions digitales intelligentes et performantes.',
    images: ['/favicon.ico'],
    creator: '@patawala',
    site: '@patawala',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon.ico',
    },
  },
  verification: {
    google: 'votre-code-verification-google',
    // Ajoutez vos autres verifications si nécessaire
  },
  category: 'technology',
};

// Composants mémoïsés pour éviter les re-rendus inutiles
const MemoizedNavigation = memo(Navigation);
const MemoizedFooter = memo(Footer);
const MemoizedChatbot = memo(Chatbot);
const MemoizedToaster = memo(Toaster);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0F1C" />
        <meta name="author" content="Patawala" />
        <meta name="copyright" content="Patawala" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#0A0F1C" />
        
        {/* Structured Data pour améliorer le SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Patawala",
              "url": "https://patawala-v2-nry6.vercel.app",
              "sameAs": [
                "https://github.com/patawala",
                "https://linkedin.com/in/patawala",
                "https://twitter.com/patawala"
              ],
              "jobTitle": "Développeur Full-Stack & Architecte IA",
              "description": "Expert en développement web/mobile et agents IA. Spécialiste en automatisation et solutions digitales innovantes.",
              "knowsAbout": ["Développement Web", "Développement Mobile", "Intelligence Artificielle", "Automatisation", "Next.js", "React", "React Native", "Agents IA"],
              "worksFor": {
                "@type": "Organization",
                "name": "Patawala Consulting"
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0A0F1C] text-gray-200">
        <LanguageProvider>
          <ServiceProvider>
            {/* Toaster avec configuration optimisée */}
            <MemoizedToaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e40af',
                  color: '#fff',
                },
              }}
            />
            
            {/* LoadingScreen avec Suspense pour le chargement différé */}
            <Suspense fallback={null}>
              <LoadingScreen />
            </Suspense>
            
            {/* Navigation - toujours visible */}
            <MemoizedNavigation />
            
            {/* Contenu principal */}
            <main className="min-h-screen">
              {children}
            </main>
            
            {/* Footer - toujours visible */}
            <MemoizedFooter />
            
            {/* Chatbot - chargé de manière différée */}
            <Suspense fallback={null}>
              <MemoizedChatbot />
            </Suspense>
            
            {/* Analytics - toujours en dernier */}
            <Analytics />
          </ServiceProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}