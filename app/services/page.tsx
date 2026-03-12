'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { servicesByCategory, allServices, filterCategories, CategoryType } from './data/servicesData';
import Link from 'next/link';
import { useServiceContext } from './context/ServiceContext';
import { useTranslation } from '@/app/hooks/useTranslation';

const ServicesPage = memo(function ServicesPage() {
  const {
    activeCategory,
    setActiveCategory,
    isNavigatingFromNav,
    setIsNavigatingFromNav
  } = useServiceContext();

  const { t, isLoading } = useTranslation();
  const isInitialLoad = useRef(true);
  
  // Refs pour le défilement des filtres
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);

  // Points lumineux fixes
  const lightPoints = [
    { left: '15%', top: '20%' },
    { left: '75%', top: '60%' },
    { left: '45%', top: '80%' },
    { left: '85%', top: '30%' },
  ];

  // TRADUCTIONS SIMPLES
  const translations = {
    badge: t('badge', 'services') || 'Solutions sur mesure',
    title: t('title', 'services') || 'Solutions digitales',
    titleHighlight: t('titleHighlight', 'services') || 'adaptées à vos besoins',
    subtitle: t('subtitle', 'services') || "Sites web, applications, design ou conseil — Je vous accompagne de l'idée à la réalisation.",
    disclaimer: t('disclaimer', 'services') || '* Chaque projet est unique et fait l\'objet d\'un devis personnalisé.',
    
    // Filtres
    filterAll: t('filters.all', 'services') || 'Tous',
    filterWeb: t('filters.web', 'services') || 'Sites web',
    filterMobile: t('filters.mobile', 'services') || 'Applications',
    filterDesign: t('filters.design', 'services') || 'Design & UX',
    filterConsulting: t('filters.consulting', 'services') || 'Conseil & Stratégie',
    
    // Descriptions
    descAll: t('filters.description.all', 'services') || 'Découvrez tous mes services pour votre présence digitale',
    descWeb: t('filters.description.web', 'services') || 'Sites vitrine aux applications web complexes, performants et évolutifs',
    descMobile: t('filters.description.mobile', 'services') || 'Applications natives et hybrides pour iOS et Android',
    descDesign: t('filters.description.design', 'services') || 'Interfaces intuitives et expériences utilisateur mémorables',
    descConsulting: t('filters.description.consulting', 'services') || 'Conseil technique et stratégique pour vos projets digitaux',
    
    // FAQ
    faqTitle: t('faq.title', 'services') || 'Questions fréquentes',
    faqSubtitle: t('faq.subtitle', 'services') || 'Pour vous éclairer sur ma façon de travailler',
    
    // CTA
    ctaTitle: t('cta.title', 'services') || 'Vous ne trouvez pas ce que vous cherchez ?',
    ctaButton: t('cta.button', 'services') || 'Discuter de mon projet',
  };

  // FAQ items
  const faqItems = [
    { question: t('faq.items.0.question', 'services'), answer: t('faq.items.0.answer', 'services') },
    { question: t('faq.items.1.question', 'services'), answer: t('faq.items.1.answer', 'services') },
    { question: t('faq.items.2.question', 'services'), answer: t('faq.items.2.answer', 'services') },
    { question: t('faq.items.3.question', 'services'), answer: t('faq.items.3.answer', 'services') },
    { question: t('faq.items.4.question', 'services'), answer: t('faq.items.4.answer', 'services') },
    { question: t('faq.items.5.question', 'services'), answer: t('faq.items.5.answer', 'services') }
  ];

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
  const activeServices = activeCategory === 'all' ? allServices : servicesByCategory[activeCategory as Exclude<CategoryType, 'all'>] || [];

  // Récupérer le label du filtre
  const getFilterLabel = (categoryId: string) => {
    switch(categoryId) {
      case 'all': return translations.filterAll;
      case 'web': return translations.filterWeb;
      case 'mobile': return translations.filterMobile;
      case 'design': return translations.filterDesign;
      case 'consulting': return translations.filterConsulting;
      default: return filterCategories.find(c => c.id === categoryId)?.label || '';
    }
  };

  // Récupérer la description
  const getDescription = () => {
    switch(activeCategory) {
      case 'all': return translations.descAll;
      case 'web': return translations.descWeb;
      case 'mobile': return translations.descMobile;
      case 'design': return translations.descDesign;
      case 'consulting': return translations.descConsulting;
      default: return '';
    }
  };

  // SKELETON LOADER
  if (isLoading) {
    return (
      <main className="min-h-screen pt-32 pb-20 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero skeleton */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-32 h-8 bg-gray-800/50 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-10 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-gray-800/50 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Filtres skeleton */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="flex gap-2 p-2 bg-gray-800/50 rounded-2xl">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-24 h-10 bg-gray-700/50 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Grille skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#141B2B]/50 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen pt-32 pb-20 bg-[#0A0F1C] relative overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* FOND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

        {lightPoints.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="services-content">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
        </div>

        {/* Section Filtres avec flèches */}
        <div className="mb-8 lg:mb-12">
          <div className="relative lg:hidden">
            {showFilterLeftArrow && (
              <button
                onClick={() => scrollFilters('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-[#0A0F1C] to-transparent pr-6 pl-2 py-2"
                aria-label="Filtres précédents"
              >
                <div className="bg-blue-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                  <ChevronLeft size={18} className="text-white" aria-hidden="true" />
                </div>
              </button>
            )}

            {showFilterRightArrow && (
              <button
                onClick={() => scrollFilters('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-[#0A0F1C] to-transparent pl-6 pr-2 py-2"
                aria-label="Filtres suivants"
              >
                <div className="bg-blue-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                  <ChevronRight size={18} className="text-white" aria-hidden="true" />
                </div>
              </button>
            )}

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

                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                        ${isActive
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'bg-[#141B2B] text-gray-400 hover:text-white'
                        }`}
                      aria-label={`Filtrer par ${category.label}`}
                      aria-pressed={isActive}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {getFilterLabel(category.id)}
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

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                      ${isActive
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'text-gray-400 hover:text-white hover:bg-[#1E2638]'
                      }`}
                    aria-label={`Filtrer par ${category.label}`}
                    aria-pressed={isActive}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {getFilterLabel(category.id)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description de la catégorie */}
          <p
            key={activeCategory}
            className="text-center text-gray-400 mt-4 max-w-2xl mx-auto animate-fadeIn"
          >
            {getDescription()}
          </p>
        </div>

        {/* Grille des cartes */}
        <div>
          <div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-grid"
          >
            {activeServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* SECTION FAQ */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {translations.faqTitle}
            </h2>
            <p className="text-gray-400">
              {translations.faqSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              item.question && item.answer && (
                <div
                  key={index}
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
                </div>
              )
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
            {translations.ctaTitle}
          </h3>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" passHref>
              <button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl mx-auto sm:mx-0 active:scale-[0.98]"
                aria-label={translations.ctaButton}
              >
                <span>{translations.ctaButton}</span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </Link>
          </div>
        </div>

        {/* Micro-message */}
        <p className="text-center text-xs text-gray-500 mt-8">
          {translations.disclaimer}
        </p>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes gridAppear {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-grid {
          animation: gridAppear 0.4s cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
});

ServicesPage.displayName = 'ServicesPage';

export default ServicesPage;