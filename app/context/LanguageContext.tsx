'use client';

import { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, section?: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement dynamique - UN SEUL FICHIER PAR LANGUE
  const loadTranslations = useCallback(async (lang: Language) => {
    setIsLoading(true);
    
    try {
      // Charger UN SEUL fichier index.json
      const module = await import(`@/app/assets/locales/${lang}/index.json`);
      setTranslations(module.default);
    } catch (error) {
      console.error('Erreur chargement traductions:', error);
      // Fallback vers un objet vide en cas d'erreur
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language, loadTranslations]);

  // Fonction t - Navigation dans l'objet de traductions
  const t = (key: string, section?: string): any => {
    if (!translations) return key;

    // Si une section est spécifiée, commencer par cette section
    let value = section ? translations[section] : translations;
    
    if (!value) return key;

    // Naviguer dans les clés (support de la notation pointée)
    const keys = key.split('.');
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Retourne la clé si non trouvée
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