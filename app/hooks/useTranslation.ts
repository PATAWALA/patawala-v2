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
  'WhatsAppWidget': 'widget',
  'NotFound': 'not-found',
  'MerciPage': 'merci'
};

export function useTranslation() {
  const { t: contextT, language, isLoading } = useLanguage();
  
  /**
   * Fonction de traduction principale
   * @param key - Clé de traduction (ex: "hero.title" ou "typed.strings")
   * @param forcedSection - Section forcée (optionnel)
   * @returns La traduction (string, objet ou tableau)
   */
  const t = (key: string, forcedSection?: string): any => {
    const result = forcedSection 
      ? contextT(key, forcedSection)
      : contextT(key, 'common');
    
    // Retourne la clé comme fallback si pas de traduction
    return result ?? key;
  };

  /**
   * Raccourci pour récupérer un tableau de strings
   * @param key - Clé du tableau (ex: "typed.strings")
   * @param forcedSection - Section forcée (optionnel)
   * @returns Tableau de strings ou tableau vide
   */
  const tArray = (key: string, forcedSection?: string): string[] => {
    const result = t(key, forcedSection);
    return Array.isArray(result) ? result : [];
  };

  /**
   * Traduction spécifique à un composant
   * @param componentName - Nom du composant
   * @param key - Clé de traduction
   * @returns La traduction ou la clé
   */
  const getComponentTranslation = (componentName: string, key: string): string => {
    const section = componentToSection[componentName] || 'common';
    const result = contextT(key, section);
    return result ?? key;
  };

  /**
   * Traduction avec paramètres (interpolation)
   * @param key - Clé de traduction
   * @param params - Paramètres à injecter (ex: { count: 5 })
   * @param forcedSection - Section forcée (optionnel)
   * @returns La traduction avec les paramètres injectés
   */
  const tWithParams = (key: string, params: Record<string, string | number>, forcedSection?: string): string => {
    let text = t(key, forcedSection);
    
    // Si le texte est la clé, retourner directement
    if (text === key) return key;
    
    // Remplacer les paramètres dans le texte
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{{?${param}}?}`, 'g'), String(value));
    });
    
    return text;
  };

  return { 
    t, 
    tArray,
    language, 
    isLoading, 
    getComponentTranslation, 
    tWithParams 
  };
}