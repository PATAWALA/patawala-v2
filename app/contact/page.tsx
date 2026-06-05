// app/contact/page.tsx
import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Discutons de votre projet. WhatsApp direct, email, ou appel. Premier échange offert, réponse sous 24h, sans engagement.',
  openGraph: {
    title: 'Patawala | Contact',
    description: 'Un projet en tête ? Contactez-moi directement par WhatsApp, email ou téléphone. Réponse rapide garantie.',
    images: [{ url: '/og-image-gold.png', width: 1200, height: 630, alt: 'Contact Patawala' }],
  },
  alternates: { canonical: 'https://www.patawala.com/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}