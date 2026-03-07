'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { servicesByCategory, allServices, filterCategories, CategoryType } from './data/servicesData';
import Link from 'next/link';
import { useServiceContext } from './context/ServiceContext';
import { useLanguage } from '../context/LanguageContext';

// IMPORT DES DEUX FICHIERS JSON
import frServicesData from '@/app/assets/locales/fr/services-data.json';
import enServicesData from '@/app/assets/locales/en/services-data.json';
import frServices from '@/app/assets/locales/fr/services.json';
import enServices from '@/app/assets/locales/en/services.json';

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

const ServicesPage = memo(function ServicesPage() {
  const {
    activeCategory,
    setActiveCategory,
    isNavigatingFromNav,
    setIsNavigatingFromNav
  } = useServiceContext();

  const { language } = useLanguage();
  const isInitialLoad = useRef(true);

  // Refs pour le défilement des filtres uniquement
  const filterScrollRef = useRef<HTMLDivElement>(null);

  // États pour les flèches des filtres
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  // CHARGEMENT DIRECT DES DONNÉES SELON LA LANGUE
  const servicesData = language === 'fr' ? frServicesData : enServicesData;
  const services = language === 'fr' ? frServices : enServices;

  // ========== TRADUCTIONS DE BASE (depuis services-data.json) ==========
  const translations = {
    badge: servicesData?.badge || 'Solutions sur mesure',
    title: servicesData?.title || 'Solutions digitales',
    titleHighlight: servicesData?.titleHighlight || 'adaptées à vos besoins',
    subtitle: servicesData?.subtitle || 'Sites web, applications, design ou conseil — Je vous accompagne de l\'idée à la réalisation.',
    disclaimer: servicesData?.disclaimer || '* Les prix sont donnés à titre indicatif. Chaque projet reçoit un devis personnalisé.'
  };

  // ========== FILTRES (depuis services-data.json) ==========
  const filters = servicesData?.filters || {
    all: 'Tous',
    web: 'Sites web',
    mobile: 'Applications',
    design: 'Design & UX',
    consulting: 'Conseil & Stratégie',
    ecommerce: 'E-commerce',
    maintenance: 'Maintenance',
    description: {
      all: "Découvrez tous mes services pour votre présence digitale",
      web: "Des sites vitrines aux applications web complexes, performants et évolutifs",
      mobile: "Applications natives et hybrides pour iOS et Android",
      design: "Interfaces intuitives et expériences utilisateur mémorables",
      consulting: "Conseil technique et stratégique pour vos projets digitaux",
      ecommerce: "Boutiques en ligne optimisées pour la conversion",
      maintenance: "Suivi, mises à jour et support technique continu"
    }
  };

  // ========== FAQ (depuis services.json qui a les 8 questions) ==========
  const faq: FaqTranslations = services?.faq || {
    title: 'Questions fréquentes',
    subtitle: 'Pour vous éclairer sur ma façon de travailler',
    items: [
      {
        question: "Comment fonctionne la consultation initiale ?",
        answer: "Elle est gratuite et dure environ 30 minutes. C'est l'occasion de discuter de vos objectifs, de vos idées et de voir ensemble si nous sommes sur la même longueur d'onde avant de commencer le véritable travail."
      },
      {
        question: "Quelle est la durée moyenne d'un projet ?",
        answer: "Cela dépend de la complexité : 1 à 2 semaines pour un site vitrine, 3 à 6 semaines pour un e-commerce, 2 à 4 mois pour une application sur mesure."
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait du résultat ?",
        answer: "Je travaille jusqu'à votre entière satisfaction. Si un élément ne vous convient pas, j'apporte les améliorations nécessaires jusqu'à ce que vous soyez pleinement satisfait. C'est pourquoi mes clients sont très positifs sur mon travail."
      },
      {
        question: "Quels types de projets développez-vous ?",
        answer: "Je développe une large gamme de solutions digitales : des sites vitrines aux applications web complexes, en passant par les applications mobiles (iOS/Android), les boutiques e-commerce, et je propose aussi des services de conseil et de design UX/UI."
      },
      {
        question: "Proposez-vous un suivi après la livraison ?",
        answer: "Oui, un mois de support est inclus pour vous accompagner après le lancement. Des forfaits de maintenance sont également disponibles."
      },
      {
        question: "Puis-je modifier le projet en cours de route ?",
        answer: "Absolument ! Nous travaillons par étapes avec des validations régulières pour ajuster au plus près de vos besoins."
      },
      {
        question: "Comment garantissez-vous la qualité de votre travail ?",
        answer: "Je suis des processus de développement rigoureux avec des tests réguliers pour m'assurer que tout fonctionne parfaitement. Mon engagement est de livrer un produit fiable, performant et sécurisé."
      },
      {
        question: "Les prix affichés sont-ils définitifs ?",
        answer: "Ce sont des bases indicatives. Chaque projet étant unique, je vous établis un devis personnalisé après avoir compris vos besoins."
      }
    ]
  };

  // ========== CTA (depuis services.json) ==========
  const cta: CtaTranslations = services?.cta || {
    title: 'Vous ne trouvez pas ce que vous cherchez ?',
    button: 'Discuter de mon projet'
  };

  // ========== LOGS DE DÉBOGAGE ==========
  console.log('🌍 Langue:', language);
  console.log('📦 services-data.json (textes page):', servicesData);
  console.log('📦 services.json (cartes + FAQ):', services);
  console.log('📦 FAQ items:', faq.items);
  console.log('📦 Nombre de questions:', faq.items?.length);

  // Gestion du défilement des filtres
  const checkFilterScroll = useCallback(() => {
    if (filterScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterScrollRef.current;
      setShowFilterLeftArrow(scrollLeft > 10);
      setShowFilterRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

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
  }, [checkFilterScroll]);

  // Fonction de scroll pour les filtres
  const scrollFilters = useCallback((direction: 'left' | 'right') => {
    if (filterScrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = filterScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      filterScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleCategoryChange = useCallback((categoryId: CategoryType) => {
    if (!isNavigatingFromNav) {
      setActiveCategory(categoryId);
      window.history.replaceState(null, '', `/services#${categoryId}`);
    }
  }, [isNavigatingFromNav, setActiveCategory]);

  // Déterminer les services à afficher
  const getActiveServices = useCallback(() => {
    if (activeCategory === 'all') {
      return allServices;
    }
    return servicesByCategory[activeCategory as Exclude<CategoryType, 'all'>] || [];
  }, [activeCategory]);

  const activeServices = getActiveServices();

  return (
    <main
      className="min-h-screen pt-32 pb-20 bg-[#0A0F1C] relative overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* FOND AMÉLIORÉ - densité augmentée */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes répétitives - opacité 0.08 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0px, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.08) 0px, rgba(6,182,212,0.08) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        {/* Cercles flous animés */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-40 left-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl will-change-transform"
          aria-hidden="true"
        />

        {/* Points lumineux */}
        {lightPoints.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="services-content">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
            <Sparkles size={16} className="text-blue-400" aria-hidden="true" />
            <span className="text-sm font-medium text-blue-400">
              {translations.badge}
            </span>
          </div>

          <h1 id="services-title" className="text-4xl md:text-5xl font-bold mb-4 text-white">
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
                  aria-label="Filtres précédents"
                >
                  <div className="bg-blue-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                    <ChevronLeft size={18} className="text-white" aria-hidden="true" />
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
                  aria-label="Filtres suivants"
                >
                  <div className="bg-blue-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                    <ChevronRight size={18} className="text-white" aria-hidden="true" />
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
                          : 'bg-[#141B2B] text-gray-400 hover:text-white'
                        }`}
                      aria-label={`Filtrer par ${category.label}`}
                      aria-pressed={isActive}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {filters?.[category.id] || category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Version desktop des filtres */}
          <div className="hidden lg:flex justify-center">
            <div className="inline-flex bg-[#141B2B] rounded-2xl p-1.5 shadow-md">
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
                    aria-label={`Filtrer par ${category.label}`}
                    aria-pressed={isActive}
                  >
                    <Icon size={18} aria-hidden="true" />
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

        {/* Grille des cartes */}
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

        {/* SECTION FAQ - AVEC LES 8 QUESTIONS */}
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
                role="article"
                aria-labelledby={`faq-q-${index}`}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 id={`faq-q-${index}`} className="font-bold text-white mb-2">{item.question}</h3>
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
            <Link href="/#contact" passHref>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl mx-auto sm:mx-0"
                aria-label={cta.button}
              >
                <span>{cta.button}</span>
                <ArrowRight size={20} aria-hidden="true" />
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
});

ServicesPage.displayName = 'ServicesPage';

export default ServicesPage;