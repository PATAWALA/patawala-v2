'use client';

import { createContext, useState, useContext, useEffect, useCallback } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string | undefined;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Type pour les traductions (identique à avant)
type TranslationsType = {
  common: any;
  navigation: any;
  hero: any;
  about: any;
  testimonials: any;
  value: any;
  tech: any;
  contact: any;
  blog: any;
  articles: any;
  articlesData: any;
  services: any;
  'services-data': any;
  'projets-page': any;
  'projets-data': any;
  'project-modal': any;
  booking: any;
  realisations: any;
  footer: any;
  widget: any;
};

// Charge tous les fichiers d'une langue en parallèle
async function loadLanguageResources(lang: Language): Promise<TranslationsType> {
  const [
    common,
    navigation,
    hero,
    about,
    testimonials,
    value,
    tech,
    contact,
    blog,
    articles,
    articlesData,
    services,
    servicesData,
    projetsPage,
    projetsData,
    projectModal,
    booking,
    realisations,
    footer,
    widget
  ] = await Promise.all([
    import(`@/app/assets/locales/${lang}/common.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/navigation.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/hero.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/about.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/testimonials.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/value.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/tech.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/contact.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/blog.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/articles.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/articles-details.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/services.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/services-data.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/projets-page.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/projets-data.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/project-modal.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/booking.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/realisations.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/footer.json`).then(m => m.default),
    import(`@/app/assets/locales/${lang}/widget.json`).then(m => m.default),
  ]);

  return {
    common,
    navigation,
    hero,
    about,
    testimonials,
    value,
    tech,
    contact,
    blog,
    articles,
    articlesData,
    services,
    'services-data': servicesData,
    'projets-page': projetsPage,
    'projets-data': projetsData,
    'project-modal': projectModal,
    booking,
    realisations,
    footer,
    widget
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [translations, setTranslations] = useState<TranslationsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement initial de la langue par défaut
  useEffect(() => {
    loadLanguageResources(language).then(res => {
      setTranslations(res);
      setIsLoading(false);
    });
  }, [language]);

  const t = useCallback((key: string, section: string = 'common'): any => {
    if (!translations) return undefined;

    if (!key) {
      return translations[section as keyof TranslationsType];
    }

    const keys = key.split('.');
    let value: any = translations[section as keyof TranslationsType];

    if (!value) {
      console.warn(`Section introuvable: ${section}`);
      return undefined;
    }

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Traduction manquante: ${section}.${key} (clé "${k}" introuvable)`);
        return undefined;
      }
    }

    return value;
  }, [translations]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
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