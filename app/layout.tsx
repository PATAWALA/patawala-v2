// app/layout.tsx
import type { Metadata, Viewport } from 'next';
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

// Configuration du viewport
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070B12' },
    { media: '(prefers-color-scheme: light)', color: '#070B12' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Métadonnées (sans themeColor)
export const metadata: Metadata = {
  metadataBase: new URL('https://www.patawala.com'),
  title: {
    default: 'Patawala | Architecte Full-Stack & Agent IA Haut de Gamme',
    template: '%s | Patawala',
  },
  description: 'Je conçois des architectures digitales sur-mesure et des agents IA qui automatisent l\'intelligent. Transformez votre vision en un avantage concurrentiel décisif.',
  keywords: [
    'architecte full-stack premium', 'développeur react native expert',
    'agent ia sur mesure', 'automatisation entreprise',
    'consultant next.js', 'développement web luxe', 'freelance tech haut de gamme'
  ],
  authors: [{ name: 'Patawala', url: 'https://www.patawala.com' }],
  creator: 'Patawala',
  publisher: 'Patawala - Architectures Digitales Premium',
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
    canonical: 'https://www.patawala.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.patawala.com',
    siteName: 'Patawala - Tech Architect',
    title: 'Patawala | Architecte Full-Stack & Agent IA',
    description: 'Au-delà du code, de l\'architecture stratégique. Solutions web, mobile et IA pour des résultats mesurables.',
    images: [
      {
        url: '/og-image-gold.png',
        width: 1200,
        height: 630,
        alt: 'Patawala - Architecte Full-Stack & Solutions IA Haut de Gamme',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patawala | Architecte Full-Stack & Agent IA',
    description: 'Des architectures digitales qui transforment votre business. Expert Next.js, React Native & IA.',
    images: ['/og-image-gold.png'],
    creator: '@patawala',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Patawala',
  },
  formatDetection: {
    telephone: false,
  },
    verification: {
    google: 'JsLn-cAbRgE_Dmw18OjOWigWtZU1X7cONrLGZrk2D64',
  },
  category: 'technology',
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Patawala - Architecte Full-Stack & Solutions IA",
              "url": "https://www.patawala.com",
              "description": "Architecte full-stack premium spécialisé en développement web, mobile et agents IA sur mesure.",
              "founder": {
                "@type": "Person",
                "name": "Patawala",
                "jobTitle": "Architecte Full-Stack & Expert IA",
                "url": "https://www.patawala.com",
                "sameAs": [
                  "https://github.com/patawala",
                  "https://linkedin.com/in/patawala",
                  "https://twitter.com/patawala"
                ]
              },
              "serviceType": [
                "Développement Web Premium",
                "Développement Mobile React Native",
                "Agents IA & Automatisation",
                "Architecture Logicielle",
                "Consulting Tech"
              ],
              "areaServed": {
                "@type": "Continent",
                "name": "Europe, Afrique, Amérique du Nord"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Réservation",
                "url": "https://www.patawala.com#contact",
                "availableLanguage": ["French", "English"]
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>
          <ServiceProvider>
            <MemoizedToaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#0F1521',
                  color: '#F2F4F8',
                  border: '1px solid #1E2A3E',
                },
              }}
            />
            <Suspense fallback={null}>
              <LoadingScreen />
            </Suspense>
            <MemoizedNavigation />
            <main className="min-h-screen">
              {children}
            </main>
            <MemoizedFooter />
            <Suspense fallback={null}>
              <MemoizedChatbot />
            </Suspense>
            <Analytics />
          </ServiceProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}