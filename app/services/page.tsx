'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
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

// Points lumineux fixes (déterministes) pour éviter les différences serveur/client
const LIGHT_POINTS = [
  { left: '15%', top: '25%' },
  { left: '75%', top: '60%' },
];

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Refs pour le défilement des filtres uniquement
  const filterScrollRef = useRef<HTMLDivElement>(null);

  // États pour les flèches des filtres
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);

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

  // ========== FAQ (depuis services.json) ==========
  const faq: FaqTranslations = services?.faq || {
    title: 'Questions fréquentes',
    subtitle: 'Pour vous éclairer sur ma façon de travailler',
    items: [
      {
        question: "Comment fonctionne la consultation initiale ?",
        answer: "Elle est gratuite et dure environ 30 minutes. C'est l'occasion de discuter de vos objectifs."
      },
      {
        question: "Quelle est la durée moyenne d'un projet ?",
        answer: "Cela dépend de la complexité : 1 à 2 semaines pour un site vitrine, 2 à 4 mois pour une application."
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer: "Je travaille jusqu'à votre entière satisfaction avec des améliorations jusqu'à ce que vous soyez pleinement satisfait."
      },
      {
        question: "Quels types de projets développez-vous ?",
        answer: "Sites vitrines, applications web complexes, applications mobiles (iOS/Android), boutiques e-commerce."
      },
      {
        question: "Proposez-vous un suivi après la livraison ?",
        answer: "Oui, un mois de support est inclus pour vous accompagner après le lancement."
      },
      {
        question: "Puis-je modifier le projet en cours de route ?",
        answer: "Absolument ! Nous travaillons par étapes avec des validations régulières."
      },
      {
        question: "Comment garantissez-vous la qualité ?",
        answer: "Je suis des processus de développement rigoureux avec des tests réguliers."
      },
      {
        question: "Les prix affichés sont-ils définitifs ?",
        answer: "Ce sont des bases indicatives. Chaque projet reçoit un devis personnalisé."
      }
    ]
  };

  // ========== CTA (depuis services.json) ==========
  const cta: CtaTranslations = services?.cta || {
    title: 'Vous ne trouvez pas ce que vous cherchez ?',
    button: 'Discuter de mon projet'
  };

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
    if (!isMounted) return;
    
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
  }, [setActiveCategory, isMounted]);

  // Gérer la navigation depuis le menu
  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [activeCategory, isNavigatingFromNav, setIsNavigatingFromNav, isMounted]);

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
      {/* FOND ULTRA-OPTIMISÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes répétitives */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        {/* Cercles flous */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

        {/* Points lumineux - fixes */}
        {LIGHT_POINTS.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* ... reste du JSX inchangé ... */}
    </main>
  );
});

ServicesPage.displayName = 'ServicesPage';

export default ServicesPage;