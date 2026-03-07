// hooks/useServicesData.ts
import { useLanguage } from '../context/LanguageContext';

export function useServicesData() {
  const { t, language } = useLanguage();
  
  // Récupérer les données avec des fallbacks
  const getFaq = () => {
    const faqData = t('faq', 'services-data');
    
    // Fallback avec vos nouvelles questions
    const defaultFaq = {
      fr: {
        title: 'Questions fréquentes',
        subtitle: 'Pour vous éclairer sur ma façon de travailler',
        items: [ /* vos 8 questions FR */ ]
      },
      en: {
        title: 'Frequently asked questions',
        subtitle: 'To clarify how I work',
        items: [ /* vos 8 questions EN */ ]
      }
    };
    
    // Vérifier si les données sont valides
    if (faqData && typeof faqData === 'object') {
      return faqData;
    }
    
    return defaultFaq[language];
  };
  
  const getCta = () => {
    const ctaData = t('cta', 'services-data');
    const defaultCta = {
      fr: { title: 'Vous ne trouvez pas ce que vous cherchez ?', button: 'Discuter de mon projet' },
      en: { title: 'Can\'t find what you\'re looking for?', button: 'Discuss my project' }
    };
    
    return (ctaData && typeof ctaData === 'object') ? ctaData : defaultCta[language];
  };
  
  return {
    faq: getFaq(),
    cta: getCta(),
    filters: t('filters', 'services-data'),
    badge: t('badge', 'services-data'),
    title: t('title', 'services-data'),
    titleHighlight: t('titleHighlight', 'services-data'),
    subtitle: t('subtitle', 'services-data'),
    disclaimer: t('disclaimer', 'services-data')
  };
}