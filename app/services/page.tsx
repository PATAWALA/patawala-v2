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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Récupérer les traductions avec typage sécurisé
  const translations = {
    badge: t('badge', 'services-data') as string,
    title: t('title', 'services-data') as string,
    titleHighlight: t('titleHighlight', 'services-data') as string,
    subtitle: t('subtitle', 'services-data') as string,
    filters: t('filters', 'services-data') as any,
    faq: t('faq', 'services-data') as FaqTranslations,
    cta: t('cta', 'services-data') as CtaTranslations,
    disclaimer: t('disclaimer', 'services-data') as string
  };

  // Valeurs par défaut pour la FAQ si les traductions manquent
  const defaultFaq = {
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

  // Valeurs par défaut pour le CTA
  const defaultCta = {
    fr: {
      title: 'Vous ne trouvez pas ce que vous cherchez ?',
      button: 'Discuter de mon projet'
    },
    en: {
      title: 'Can\'t find what you\'re looking for?',
      button: 'Discuss my project'
    }
  };

  // Utiliser les traductions ou les valeurs par défaut
  const faq = translations.faq?.title ? translations.faq : defaultFaq[language as keyof typeof defaultFaq];
  const cta = translations.cta?.title ? translations.cta : defaultCta[language as keyof typeof defaultCta];

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

  // Gestion du défilement horizontal
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      setTimeout(checkScroll, 100);
      
      const observer = new ResizeObserver(() => {
        checkScroll();
      });
      
      observer.observe(container);
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        observer.disconnect();
      };
    }
  }, [activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.snap-start')?.clientWidth || 300;
      const gap = 24; // gap-6 = 24px
      const scrollAmount = cardWidth + gap;
      
      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryChange = (categoryId: CategoryType) => {
    if (!isNavigatingFromNav) {
      setActiveCategory(categoryId);
      window.history.replaceState(null, '', `/services#${categoryId}`);
      
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = 0;
          checkScroll();
        }
      }, 100);
    }
  };

  // Déterminer les services à afficher selon la catégorie active
  const getActiveServices = () => {
    if (activeCategory === 'all') {
      return allServices;
    }
    return servicesByCategory[activeCategory as Exclude<CategoryType, 'all'>] || [];
  };

  const activeServices = getActiveServices();

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#0A0F1C] relative overflow-hidden">
      {/* BEAU FOND - avec dégradé et formes floues */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles */}
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
        
        {/* Éléments décoratifs flous */}
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
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

        {/* Filtres */}
        <ServiceFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Grille des services avec flèches de défilement améliorées */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Flèche gauche - visible sur mobile et au survol sur desktop */}
          <AnimatePresence>
            {(showLeftArrow) && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scroll('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 transition-all duration-300
                  ${isHovering ? 'md:opacity-100' : 'md:opacity-0'} 
                  bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/90 to-transparent pl-2 pr-6 py-4`}
                aria-label="Défiler vers la gauche"
              >
                <div className="bg-blue-500/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-300 border border-blue-400/30">
                  <ChevronLeft size={24} className="text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Flèche droite - visible sur mobile et au survol sur desktop */}
          <AnimatePresence>
            {(showRightArrow) && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scroll('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 transition-all duration-300
                  ${isHovering ? 'md:opacity-100' : 'md:opacity-0'} 
                  bg-gradient-to-l from-[#0A0F1C] via-[#0A0F1C]/90 to-transparent pr-2 pl-6 py-4`}
                aria-label="Défiler vers la droite"
              >
                <div className="bg-blue-500/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-300 border border-blue-400/30">
                  <ChevronRight size={24} className="text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Indicateurs de défilement (petits points) */}
          <div className="flex justify-center gap-1.5 mt-2 md:hidden">
            {activeServices.map((_, index) => {
              const isVisible = () => {
                if (!scrollContainerRef.current) return false;
                const container = scrollContainerRef.current;
                const cardWidth = container.querySelector('.snap-start')?.clientWidth || 300;
                const scrollPosition = container.scrollLeft;
                const viewportWidth = container.clientWidth;
                const startIdx = Math.floor(scrollPosition / (cardWidth + 24));
                const endIdx = Math.ceil((scrollPosition + viewportWidth) / (cardWidth + 24));
                return index >= startIdx && index <= endIdx;
              };
              
              return (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isVisible() ? 'w-4 bg-blue-400' : 'w-1 bg-gray-600'
                  }`}
                />
              );
            })}
          </div>

          {/* Conteneur de cartes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                ref={scrollContainerRef}
                className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {activeServices.map((service, index) => (
                  <div 
                    key={service.id} 
                    className="min-w-[280px] sm:min-w-[320px] md:min-w-0 flex-1 snap-start"
                  >
                    <ServiceCard
                      service={service}
                      delay={index * 0.1}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

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

      {/* Style pour cacher la scrollbar sur mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}