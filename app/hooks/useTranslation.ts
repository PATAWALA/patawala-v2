'use client';
import { useLanguage } from '@/app/context/LanguageContext';

// Mapping des composants vers leurs sections de traduction
const componentToSection: Record<string, string> = {
  'CTASection': 'contact',
  'ContactSection': 'contact',
  'HeroSection': 'hero',
  'AboutSection': 'about',
  'TestimonialsSection': 'testimonials',
  'ValueSection': 'value',
  'TechSection': 'tech',
  'BlogSection': 'blog',
  'ArticlesSection': 'articles',
  'ServicesSection': 'services',
  'ProjetsSection': 'projets-page',
  'RealisationsSection': 'realisations',
  'FooterSection': 'footer',
  'Navigation': 'navigation',
  'BookingModal': 'booking',
  'ProjectModal': 'project-modal',
  'ServicesPage': 'services',
  'ProjetsPage': 'projets-page',
  'BlogPage': 'blog',
  'ServicesData': 'services-data',
  'ProjetsData': 'projets-data',
  'WhatsAppWidget': 'widget'
};

export function useTranslation() {
  const { t: contextT, language } = useLanguage();
  
  // Fonction de traduction principale - retourne toujours une string
  const t = (key: string, forcedSection?: string): string => {
    const result = forcedSection 
      ? contextT(key, forcedSection)
      : contextT(key, 'common');
    
    // Si le résultat est undefined, retourner la clé comme fallback
    return result ?? key;
  };

  // Fonction pour obtenir la traduction basée sur le composant
  const getComponentTranslation = (componentName: string, key: string): string => {
    const section = componentToSection[componentName] || 'common';
    const result = contextT(key, section);
    return result ?? key;
  };

  // Fonction pour obtenir une traduction avec paramètres (ex: {count})
  const tWithParams = (key: string, params: Record<string, string | number>, forcedSection?: string): string => {
    let text = t(key, forcedSection);
    
    // Remplacer les paramètres dans le texte
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), String(value));
    });
    
    return text;
  };

  return { t, language, getComponentTranslation, tWithParams };
}