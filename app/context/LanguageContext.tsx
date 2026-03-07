'use client';
import { createContext, useState, useContext, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => string | undefined; // ← retour possible undefined
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Imports statiques pour éviter le chargement asynchrone
import frCommon from '@/app/assets/locales/fr/common.json';
import frNavigation from '@/app/assets/locales/fr/navigation.json';
import frHero from '@/app/assets/locales/fr/hero.json';
import frAbout from '@/app/assets/locales/fr/about.json';
import frTestimonials from '@/app/assets/locales/fr/testimonials.json';
import frValue from '@/app/assets/locales/fr/value.json';
import frTech from '@/app/assets/locales/fr/tech.json';
import frContact from '@/app/assets/locales/fr/contact.json';
import frBlog from '@/app/assets/locales/fr/blog.json';
import frArticles from '@/app/assets/locales/fr/articles.json';
import frArticlesData from '@/app/assets/locales/fr/articles-details.json'; // ← CORRIGÉ
import frServices from '@/app/assets/locales/fr/services.json';
import frServicesData from '@/app/assets/locales/fr/services-data.json';
import frProjetsPage from '@/app/assets/locales/fr/projets-page.json';
import frProjetsData from '@/app/assets/locales/fr/projets-data.json';
import frProjectModal from '@/app/assets/locales/fr/project-modal.json';
import frBooking from '@/app/assets/locales/fr/booking.json';
import frRealisations from '@/app/assets/locales/fr/realisations.json';
import frFooter from '@/app/assets/locales/fr/footer.json';

import enCommon from '@/app/assets/locales/en/common.json';
import enNavigation from '@/app/assets/locales/en/navigation.json';
import enHero from '@/app/assets/locales/en/hero.json';
import enAbout from '@/app/assets/locales/en/about.json';
import enTestimonials from '@/app/assets/locales/en/testimonials.json';
import enValue from '@/app/assets/locales/en/value.json';
import enTech from '@/app/assets/locales/en/tech.json';
import enContact from '@/app/assets/locales/en/contact.json';
import enBlog from '@/app/assets/locales/en/blog.json';
import enArticles from '@/app/assets/locales/en/articles.json';
import enArticlesData from '@/app/assets/locales/en/articles-details.json';
import enServices from '@/app/assets/locales/en/services.json';
import enServicesData from '@/app/assets/locales/en/services-data.json';
import enProjetsPage from '@/app/assets/locales/en/projets-page.json';
import enProjetsData from '@/app/assets/locales/en/projets-data.json';
import enProjectModal from '@/app/assets/locales/en/project-modal.json';
import enBooking from '@/app/assets/locales/en/booking.json';
import enRealisations from '@/app/assets/locales/en/realisations.json';
import enFooter from '@/app/assets/locales/en/footer.json';

// Type pour les traductions
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
};

// Structure des traductions - statique, chargée immédiatement
const translations: Record<Language, TranslationsType> = {
  fr: {
    common: frCommon,
    navigation: frNavigation,
    hero: frHero,
    about: frAbout,
    testimonials: frTestimonials,
    value: frValue,
    tech: frTech,
    contact: frContact,
    blog: frBlog,
    articles: frArticles,
    articlesData: frArticlesData, // ← maintenant c'est le fichier français
    services: frServices,
    'services-data': frServicesData,
    'projets-page': frProjetsPage,
    'projets-data': frProjetsData,
    'project-modal': frProjectModal,
    booking: frBooking,
    realisations: frRealisations,
    footer: frFooter
  },
  en: {
    common: enCommon,
    navigation: enNavigation,
    hero: enHero,
    about: enAbout,
    testimonials: enTestimonials,
    value: enValue,
    tech: enTech,
    contact: enContact,
    blog: enBlog,
    articles: enArticles,
    articlesData: enArticlesData,
    services: enServices,
    'services-data': enServicesData,
    'projets-page': enProjetsPage,
    'projets-data': enProjetsData,
    'project-modal': enProjectModal,
    booking: enBooking,
    realisations: enRealisations,
    footer: enFooter
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [currentTranslations, setCurrentTranslations] = useState<TranslationsType>(translations.fr);

  useEffect(() => {
    setCurrentTranslations(translations[language]);
  }, [language]);

  // Dans LanguageContext
const t = (key: string, section: string = 'common'): any => {
  console.log(`🔍 t("${key}", "${section}")`);
  
  // Si key est vide, retourner toute la section
  if (!key) {
    return currentTranslations[section as keyof TranslationsType];
  }
  
  const keys = key.split('.');
  let value: any = currentTranslations[section as keyof TranslationsType];
  
  // Si la section n'existe pas
  if (!value) {
    console.warn(`❌ Section introuvable: ${section}`);
    return undefined;
  }
  
  // Parcourir les clés
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      console.warn(`❌ Traduction manquante: ${section}.${key} (clé "${k}" introuvable)`);
      return undefined;
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