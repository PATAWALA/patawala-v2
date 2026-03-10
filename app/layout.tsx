import type { Metadata } from 'next';
import './globals.css';
import { ServiceProvider } from './services/context/ServiceContext';
import { LanguageProvider } from './context/LanguageContext'; 
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import {  } from "module";
import LoadingScreen from './components/ui/LoadingScreen';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { Suspense, memo } from 'react';

export const metadata: Metadata = {
  title: 'Patawala | Développeur Full-Stack & Consultant Digital',
  description: 'Portfolio professionnel de Patawala, expert en développement web moderne, Next.js, React et solutions digitales performantes.',
  keywords: ['développeur', 'portfolio', 'nextjs', 'react', 'freelance', 'développement web', 'consultant digital'],
  openGraph: {
    title: 'Patawala | Portfolio Professionnel',
    description: 'Transformez vos idées en solutions digitales performantes',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
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