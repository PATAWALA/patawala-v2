'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import ServiceFilter from './ServiceFilter';
import ServiceCard from './ServiceCard';
import { servicesByCategory, allServices, filterCategories, CategoryType } from './data/servicesData';
import Link from 'next/link';
import { useServiceContext } from './context/ServiceContext';

export default function ServicesPage() {
  const { 
    activeCategory, 
    setActiveCategory,
    isNavigatingFromNav,
    setIsNavigatingFromNav
  } = useServiceContext();
  
  const isInitialLoad = useRef(true);

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

  const handleCategoryChange = (categoryId: CategoryType) => {
    if (!isNavigatingFromNav) {
      setActiveCategory(categoryId);
      window.history.replaceState(null, '', `/services#${categoryId}`);
    }
  };

  // Déterminer les services à afficher selon la catégorie active
  const getActiveServices = () => {
    if (activeCategory === 'all') {
      return allServices;
    }
    return servicesByCategory[activeCategory];
  };

  const activeServices = getActiveServices();

  // FAQ statique
  const faqItems = [
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
  ];

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
              Solutions sur mesure
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Des solutions digitales
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
              adaptées à vos besoins
            </span>
          </h1>
          
          <p className="text-lg text-gray-300">
            Sites web, applications, design ou conseil — je vous accompagne 
            de la réflexion à la réalisation.
          </p>
        </motion.div>

        {/* Filtres */}
        <ServiceFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Grille des services */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Questions fréquentes
            </h2>
            <p className="text-gray-400">
              Pour vous éclairer sur ma façon de travailler
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
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
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl mx-auto sm:mx-0"
              >
                <span>Discuter de mon projet</span>
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
          * Les prix sont donnés à titre indicatif. Chaque projet fait l'objet d'un devis personnalisé.
        </motion.p>
      </div>
    </main>
  );
}