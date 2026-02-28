import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ServiceProvider } from './services/context/ServiceContext';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import { PopupProvider } from './components/layout/PopupContext';
import ExitIntentPopup from './components/ui/ExitIntentPopup';
import Chatbot from './components/ui/Chatbot';
import LoadingScreen from './components/ui/LoadingScreen';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-[#0A0F1C] text-gray-200`}>
        <ServiceProvider>
          <PopupProvider> 
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e40af',
                  color: '#fff',
                },
              }}
            />
            <LoadingScreen />
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Chatbot />
            <ExitIntentPopup />
            <Analytics />
          </PopupProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}