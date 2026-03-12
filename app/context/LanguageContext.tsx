'use client';

import { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string | undefined;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement dynamique - PERFORMANT
  const loadTranslations = useCallback(async (lang: Language) => {
    setIsLoading(true);
    
    try {
      if (lang === 'fr') {
        const [common, navigation, hero, about, testimonials, value, tech, contact, 
               blog, articles, articlesData, services, servicesData, projetsPage, 
               projetsData, projectModal, booking, realisations, footer, widget, 
               notFound, merci] = await Promise.all([
          import('@/app/assets/locales/fr/common.json'),
          import('@/app/assets/locales/fr/navigation.json'),
          import('@/app/assets/locales/fr/hero.json'),
          import('@/app/assets/locales/fr/about.json'),
          import('@/app/assets/locales/fr/testimonials.json'),
          import('@/app/assets/locales/fr/value.json'),
          import('@/app/assets/locales/fr/tech.json'),
          import('@/app/assets/locales/fr/contact.json'),
          import('@/app/assets/locales/fr/blog.json'),
          import('@/app/assets/locales/fr/articles.json'),
          import('@/app/assets/locales/fr/articles-details.json'),
          import('@/app/assets/locales/fr/services.json'),
          import('@/app/assets/locales/fr/services-data.json'),
          import('@/app/assets/locales/fr/projets-page.json'),
          import('@/app/assets/locales/fr/projets-data.json'),
          import('@/app/assets/locales/fr/project-modal.json'),
          import('@/app/assets/locales/fr/booking.json'),
          import('@/app/assets/locales/fr/realisations.json'),
          import('@/app/assets/locales/fr/footer.json'),
          import('@/app/assets/locales/fr/widget.json'),
          import('@/app/assets/locales/fr/not-found.json'),
          import('@/app/assets/locales/fr/merci.json')
        ]);

        setTranslations({
          common: common.default,
          navigation: navigation.default,
          hero: hero.default,
          about: about.default,
          testimonials: testimonials.default,
          value: value.default,
          tech: tech.default,
          contact: contact.default,
          blog: blog.default,
          articles: articles.default,
          articlesData: articlesData.default,
          services: services.default,
          'services-data': servicesData.default,
          'projets-page': projetsPage.default,
          'projets-data': projetsData.default,
          'project-modal': projectModal.default,
          booking: booking.default,
          realisations: realisations.default,
          footer: footer.default,
          widget: widget.default,
          'not-found': notFound.default,
          merci: merci.default
        });
      } else {
        // Version anglaise
        const [common, navigation, hero, about, testimonials, value, tech, contact,
               blog, articles, articlesData, services, servicesData, projetsPage,
               projetsData, projectModal, booking, realisations, footer, widget,
               notFound, merci] = await Promise.all([
          import('@/app/assets/locales/en/common.json'),
          import('@/app/assets/locales/en/navigation.json'),
          import('@/app/assets/locales/en/hero.json'),
          import('@/app/assets/locales/en/about.json'),
          import('@/app/assets/locales/en/testimonials.json'),
          import('@/app/assets/locales/en/value.json'),
          import('@/app/assets/locales/en/tech.json'),
          import('@/app/assets/locales/en/contact.json'),
          import('@/app/assets/locales/en/blog.json'),
          import('@/app/assets/locales/en/articles.json'),
          import('@/app/assets/locales/en/articles-details.json'),
          import('@/app/assets/locales/en/services.json'),
          import('@/app/assets/locales/en/services-data.json'),
          import('@/app/assets/locales/en/projets-page.json'),
          import('@/app/assets/locales/en/projets-data.json'),
          import('@/app/assets/locales/en/project-modal.json'),
          import('@/app/assets/locales/en/booking.json'),
          import('@/app/assets/locales/en/realisations.json'),
          import('@/app/assets/locales/en/footer.json'),
          import('@/app/assets/locales/en/widget.json'),
          import('@/app/assets/locales/en/not-found.json'),
          import('@/app/assets/locales/en/merci.json')
        ]);

        setTranslations({
          common: common.default,
          navigation: navigation.default,
          hero: hero.default,
          about: about.default,
          testimonials: testimonials.default,
          value: value.default,
          tech: tech.default,
          contact: contact.default,
          blog: blog.default,
          articles: articles.default,
          articlesData: articlesData.default,
          services: services.default,
          'services-data': servicesData.default,
          'projets-page': projetsPage.default,
          'projets-data': projetsData.default,
          'project-modal': projectModal.default,
          booking: booking.default,
          realisations: realisations.default,
          footer: footer.default,
          widget: widget.default,
          'not-found': notFound.default,
          merci: merci.default
        });
      }
    } catch (error) {
      console.error('Erreur chargement traductions:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language, loadTranslations]);

  // Fonction t - EXACTEMENT la même interface qu'avant
  const t = (key: string, section: string = 'common'): string | undefined => {
    if (!translations) return undefined;

    const sectionData = translations[section];
    if (!sectionData) return undefined;

    if (!key) return sectionData;

    const keys = key.split('.');
    let value: any = sectionData;

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return undefined;
      }
    }

    return value;
  };

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