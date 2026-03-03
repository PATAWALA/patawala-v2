'use client';
import { createContext, useState, useContext, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import dynamique des traductions
const translations = {
  fr: {
    common: () => import('@/app/assets/locales/fr/common.json'),
    navigation: () => import('@/app/assets/locales/fr/navigation.json'),
    hero: () => import('@/app/assets/locales/fr/hero.json'),
    about: () => import('@/app/assets/locales/fr/about.json'),
    testimonials: () => import('@/app/assets/locales/fr/testimonials.json'),
    value: () => import('@/app/assets/locales/fr/value.json'),
    tech: () => import('@/app/assets/locales/fr/tech.json'),
    contact: () => import('@/app/assets/locales/fr/contact.json'),
    blog: () => import('@/app/assets/locales/fr/blog.json'),
    articles: () => import('@/app/assets/locales/fr/articles.json'),
    services: () => import('@/app/assets/locales/fr/services.json'),
    'services-data': () => import('@/app/assets/locales/fr/services-data.json'),
    'projets-page': () => import('@/app/assets/locales/fr/projets-page.json'),
    'projets-data': () => import('@/app/assets/locales/fr/projets-data.json'),
    'project-modal': () => import('@/app/assets/locales/fr/project-modal.json'),
    booking: () => import('@/app/assets/locales/fr/booking.json'),
    realisations: () => import('@/app/assets/locales/fr/realisations.json'),
    footer: () => import('@/app/assets/locales/fr/footer.json')
  },
  en: {
    common: () => import('@/app/assets/locales/en/common.json'),
    navigation: () => import('@/app/assets/locales/en/navigation.json'),
    hero: () => import('@/app/assets/locales/en/hero.json'),
    about: () => import('@/app/assets/locales/en/about.json'),
    testimonials: () => import('@/app/assets/locales/en/testimonials.json'),
    value: () => import('@/app/assets/locales/en/value.json'),
    tech: () => import('@/app/assets/locales/en/tech.json'),
    contact: () => import('@/app/assets/locales/en/contact.json'),
    blog: () => import('@/app/assets/locales/en/blog.json'),
    articles: () => import('@/app/assets/locales/en/articles.json'),
    services: () => import('@/app/assets/locales/en/services.json'),
    'services-data': () => import('@/app/assets/locales/en/services-data.json'),
    'projets-page': () => import('@/app/assets/locales/en/projets-page.json'),
    'projets-data': () => import('@/app/assets/locales/en/projets-data.json'),
    'project-modal': () => import('@/app/assets/locales/en/project-modal.json'),
    booking: () => import('@/app/assets/locales/en/booking.json'),
    realisations: () => import('@/app/assets/locales/en/realisations.json'),
     footer: () => import('@/app/assets/locales/en/footer.json'),
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [translationsCache, setTranslationsCache] = useState<Record<string, any>>({});

  // Charger les traductions au changement de langue
  useEffect(() => {
    const loadTranslations = async () => {
      const langTranslations = translations[language];
      const loaded: Record<string, any> = {};
      
      for (const [key, importer] of Object.entries(langTranslations)) {
        try {
          const module = await importer();
          loaded[key] = module.default || module;
        } catch (error) {
          console.error(`Erreur chargement ${key}:`, error);
        }
      }
      
      setTranslationsCache(loaded);
    };

    loadTranslations();
  }, [language]);

  // Fonction de traduction
  const t = (key: string, section: string = 'common'): string => {
    const keys = key.split('.');
    let value = translationsCache[section];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Traduction manquante: ${section}.${key}`);
        return key;
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}