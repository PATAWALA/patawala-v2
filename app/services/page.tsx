'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceFilter from './ServiceFilter';
import ServiceCard from './ServiceCard';
import { servicesByCategory, allServices, filterCategories, CategoryType } from './data/servicesData';
import Link from 'next/link';
import { useServiceContext } from './context/ServiceContext';
import { useLanguage } from '../context/LanguageContext';

// Types pour les traductions
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqTranslations {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

interface CtaTranslations {
  title: string;
  button: string;
}

export default function ServicesPage() {
  const { 
    activeCategory, 
    setActiveCategory,
    isNavigatingFromNav,
    setIsNavigatingFromNav
  } = useServiceContext();
  
  const { t, language } = useLanguage();
  const isInitialLoad = useRef(true);
  
  // Refs pour le défilement des filtres uniquement
  const filterScrollRef = useRef<HTMLDivElement>(null);
  
  // États pour les flèches des filtres
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);

  // Fonction pour parser les traductions en toute sécurité
  const safeParse = <T,>(data: any, defaultValue: T): T => {
    if (!data) return defaultValue;
    
    if (typeof data === 'object' && data !== null) {
      return data as T;
    }
    
    if (typeof data === 'string') {
      try {
        return JSON.parse(data) as T;
      } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        return defaultValue;
      }
    }
    
    return defaultValue;
  };

  // Récupérer les traductions de base
  const translations = {
    badge: t('badge', 'services-data') as string,
    title: t('title', 'services-data') as string,
    titleHighlight: t('titleHighlight', 'services-data') as string,
    subtitle: t('subtitle', 'services-data') as string,
    disclaimer: t('disclaimer', 'services-data') as string
  };

  // Parser les filtres séparément
  const rawFilters = t('filters', 'services-data');
  const filters = safeParse<Record<string, any>>(rawFilters, {
    all: 'Tous les services',
    web: 'Développement Web',
    mobile: 'Applications Mobile',
    design: 'Design & Identité',
    consulting: 'Conseil & Audit',
    description: {
      all: "L'ensemble de mes services pour votre présence digitale",
      web: "Des sites vitrines aux applications web complexes, performants et évolutifs",
      mobile: "Applications natives et hybrides pour iOS et Android",
      design: "Interfaces intuitives et expériences utilisateur mémorables",
      consulting: "Conseil technique et stratégique pour vos projets digitaux"
    }
  });

  // Parser FAQ et CTA
  const rawFaq = t('faq', 'services-data');
  const rawCta = t('cta', 'services-data');

  // Valeurs par défaut
  const defaultFaq: Record<string, FaqTranslations> = {
    fr: {
      title: 'Questions fréquentes',
      subtitle: 'Pour vous éclairer sur ma façon de travailler',
      items: [
        {
          question: 'Quelle est la durée moyenne d\'un projet ?',
          answer: 'Cela dépend de la complexité : 1 à 2 semaines pour un site vitrine, 3 à 6 semaines pour un e-commerce, 2 à 4 mois pour une application sur mesure.'
        },
        {
          question: 'Proposez-vous un suivi après la livraison ?',
          answer: 'Oui, un mois de support est inclus pour vous accompagner après le lancement. Des forfaits de maintenance sont également disponibles.'
        },
        {
          question: 'Puis-je modifier le projet en cours de route ?',
          answer: 'Absolument ! Nous travaillons par étapes avec des validations régulières pour ajuster au plus près de vos besoins.'
        },
        {
          question: 'Les prix affichés sont-ils définitifs ?',
          answer: 'Ce sont des bases indicatives. Chaque projet étant unique, je vous établis un devis personnalisé après avoir compris vos besoins.'
        }
      ]
    },
    en: {
      title: 'Frequently asked questions',
      subtitle: 'To clarify how I work',
      items: [
        {
          question: 'What is the average duration of a project?',
          answer: 'It depends on complexity: 1 to 2 weeks for a showcase site, 3 to 6 weeks for an e-commerce, 2 to 4 months for a custom application.'
        },
        {
          question: 'Do you offer post-delivery support?',
          answer: 'Yes, one month of support is included after launch. Maintenance packages are also available.'
        },
        {
          question: 'Can I modify the project along the way?',
          answer: 'Absolutely! We work in stages with regular validations to adjust as closely as possible to your needs.'
        },
        {
          question: 'Are the displayed prices final?',
          answer: 'They are indicative bases. Each project is unique, so I provide a personalized quote after understanding your needs.'
        }
      ]
    }
  };

  const defaultCta: Record<string, CtaTranslations> = {
    fr: {
      title: 'Vous ne trouvez pas ce que vous cherchez ?',
      button: 'Discuter de mon projet'
    },
    en: {
      title: 'Can\'t find what you\'re looking for?',
      button: 'Discuss my project'
    }
  };

  const parsedFaq = safeParse<FaqTranslations>(rawFaq, defaultFaq[language]);
  const faq = parsedFaq.title ? parsedFaq : defaultFaq[language];

  const parsedCta = safeParse<CtaTranslations>(rawCta, defaultCta[language]);
  const cta = parsedCta.title ? parsedCta : defaultCta[language];

  // Gestion du défilement des filtres
  const checkFilterScroll = () => {
    if (filterScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterScrollRef.current;
      setShowFilterLeftArrow(scrollLeft > 10);
      setShowFilterRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Écouter les changements d'URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && filterCategories.some(cat => cat.id === hash)) {
        setActiveCategory(hash as CategoryType);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    const initialHash = window.location.hash.substring(1);
    if (initialHash && filterCategories.some(cat => cat.id === initialHash)) {
      setActiveCategory(initialHash as CategoryType);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveCategory]);

  // Gérer la navigation depuis le menu
  useEffect(() => {
    if (isNavigatingFromNav && !isInitialLoad.current) {
      window.history.replaceState(null, '', `/services#${activeCategory}`);
      setTimeout(() => setIsNavigatingFromNav(false), 100);
      
      const timer = setTimeout(() => {
        const servicesSection = document.querySelector('#services-content');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
    
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [activeCategory, isNavigatingFromNav, setIsNavigatingFromNav]);

  // Setup des écouteurs de scroll pour les filtres
  useEffect(() => {
    const filterContainer = filterScrollRef.current;
    
    if (filterContainer) {
      filterContainer.addEventListener('scroll', checkFilterScroll);
      setTimeout(checkFilterScroll, 100);
      
      const observer = new ResizeObserver(() => {
        checkFilterScroll();
      });
      
      observer.observe(filterContainer);
      
      return () => {
        filterContainer.removeEventListener('scroll', checkFilterScroll);
        observer.disconnect();
      };
    }
  }, []);

  // Fonction de scroll pour les filtres
  const scrollFilters = (direction: 'left' | 'right') => {
    if (filterScrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = filterScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      filterScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (categoryId: CategoryType) => {
    if (!isNavigatingFromNav) {
      setActiveCategory(categoryId);
      window.history.replaceState(null, '', `/services#${categoryId}`);
    }
  };

  // Déterminer les services à afficher
  const getActiveServices = () => {
    if (activeCategory === 'all') {
      return allServices;
    }
    return servicesByCategory[activeCategory as Exclude<CategoryType, 'all'>] || [];
  };

  const activeServices = getActiveServices();

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#0A0F1C] relative overflow-hidden">
      {/* Fond */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, 
            rgba(59,130,246,0.05) 0px, 
            rgba(59,130,246,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, 
            rgba(6,182,212,0.05) 0px, 
            rgba(6,182,212,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="services-content">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-400">
              {translations.badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {translations.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
              {translations.titleHighlight}
            </span>
          </h1>
          
          <p className="text-lg text-gray-300">
            {translations.subtitle}
          </p>
        </motion.div>

        {/* Section Filtres avec flèches */}
        <div className="mb-8 lg:mb-12">
          <div className="relative lg:hidden">
            {/* Flèche gauche filtres */}
            <AnimatePresence>
              {showFilterLeftArrow && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => scrollFilters('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#0A0F1C] to-transparent pr-6 pl-2 py-2"
                >
                  <div className="bg-blue-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                    <ChevronLeft size={18} className="text-white" />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Flèche droite filtres */}
            <AnimatePresence>
              {showFilterRightArrow && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => scrollFilters('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-[#0A0F1C] to-transparent pl-6 pr-2 py-2"
                >
                  <div className="bg-blue-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                    <ChevronRight size={18} className="text-white" />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Conteneur des filtres */}
            <div 
              ref={filterScrollRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex gap-2 min-w-max px-1">
                {filterCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  const getGradientColor = () => {
                    if (category.id === 'web') return 'from-violet-500 to-purple-500';
                    return category.color;
                  };
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                        ${isActive 
                          ? `bg-gradient-to-r ${getGradientColor()} text-white shadow-lg` 
                          : 'bg-[#141B2B] text-gray-400 border border-[#1F2937] hover:border-gray-600 hover:text-white'
                        }`}
                    >
                      <Icon size={16} />
                      {filters?.[category.id] || category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Version desktop des filtres */}
          <div className="hidden lg:flex justify-center">
            <div className="inline-flex bg-[#141B2B] rounded-2xl p-1.5 shadow-md border border-[#1F2937]">
              {filterCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                const getGradientColor = () => {
                  if (category.id === 'web') return 'from-violet-500 to-purple-500';
                  return category.color;
                };
                
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                      ${isActive 
                        ? `bg-gradient-to-r ${getGradientColor()} text-white shadow-lg` 
                        : 'text-gray-400 hover:text-white hover:bg-[#1E2638]'
                      }`}
                  >
                    <Icon size={18} />
                    {filters?.[category.id] || category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description de la catégorie */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            {filters?.description?.[activeCategory] || 
             filterCategories.find(c => c.id === activeCategory)?.description}
          </motion.p>
        </div>

        {/* Grille des cartes - SANS flèches */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {faq.title}
            </h2>
            <p className="text-gray-400">
              {faq.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faq.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-[#141B2B] p-6 rounded-xl shadow-md border border-[#1F2937] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-2">{item.question}</h3>
                    <p className="text-sm text-gray-400">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-16"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
            {cta.title}
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl mx-auto sm:mx-0"
              >
                <span>{cta.button}</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Micro-message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-500 mt-8"
        >
          {translations.disclaimer}
        </motion.p>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}