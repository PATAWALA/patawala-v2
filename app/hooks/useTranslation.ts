'use client';

import { useLanguage } from '../context/LanguageContext';

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
  'WhatsAppWidget': 'widget' // ← NOUVEAU
};

export function useTranslation() {
  const { t: contextT, language } = useLanguage();
  
  // Fonction de traduction - immédiate, pas de loading
  const t = (key: string, forcedSection?: string) => {
    // Si une section est forcée, l'utiliser
    if (forcedSection) {
      return contextT(key, forcedSection);
    }
    
    // Par défaut, chercher dans common
    return contextT(key, 'common');
  };

  // Fonction pour obtenir le mapping de section basé sur le composant
  const getComponentTranslation = (componentName: string, key: string) => {
    const section = componentToSection[componentName] || 'common';
    return contextT(key, section);
  };

  return { t, language, getComponentTranslation };
}