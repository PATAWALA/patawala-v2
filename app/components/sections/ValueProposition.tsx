'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Zap, Shield, TrendingUp, Users, ArrowRight, CheckCircle, Sparkles, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Version mémoïsée du composant
const ValueProposition = memo(function ValueProposition() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Optimisation des conversions',
      description: 'Des interfaces pensées pour guider naturellement vos visiteurs vers l\'action souhaitée.',
      features: [
        'Taux de conversion optimisé',
        'Parcours client fluide',
        'Design orienté performance'
      ]
    },
    {
      icon: Shield,
      title: 'Fiabilité et sécurité',
      description: 'Une infrastructure robuste et des pratiques de développement sécurisées.',
      features: [
        'Sécurité renforcée',
        'Sauvegardes automatiques',
        'Maintenance préventive'
      ]
    },
    {
      icon: Users,
      title: 'Expérience utilisateur',
      description: 'Des interfaces intuitives accessibles sur tous les appareils.',
      features: [
        'Navigation simplifiée',
        'Adaptation mobile parfaite',
        'Accessibilité renforcée'
      ]
    },
    {
      icon: Zap,
      title: 'Performance technique',
      description: 'Des sites optimisés pour offrir la meilleure expérience de navigation.',
      features: [
        'Temps de charge réduits',
        'Référencement naturel optimisé',
        'Expérience utilisateur fluide'
      ]
    }
  ];

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  }, []);

  const handleDiscuter = useCallback(() => {
    scrollToSection('contact');
  }, [scrollToSection]);

  const handleVoirServices = useCallback(() => {
    router.push('/services');
  }, [router]);

  return (
    <section 
      id="valueproposition" 
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label="Proposition de valeur"
    >
      {/* FOND OPTIMISÉ - éléments décoratifs statiques */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        
        {/* Éléments décoratifs flous - STATIQUES */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl will-change-transform" />
        
        {/* Points lumineux */}
        {lightPoints.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: point.left,
              top: point.top,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge centré */}
        <div className="w-full flex justify-center mb-6 md:mb-8">
          {isMounted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <Sparkles size={14} className="text-blue-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">
                Pourquoi travailler avec moi ?
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <span className="text-sm font-medium text-blue-400">Pourquoi travailler avec moi ?</span>
            </div>
          )}
        </div>

        {/* Titre */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white px-4">
            Une approche orientée
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
              résultats
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Chaque projet est pensé pour répondre à vos objectifs, avec une exigence de qualité et de performance.
          </p>
        </div>

        {/* Grille des bénéfices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 border border-[#1F2937] hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                {/* Icône */}
                <div className="flex justify-center sm:justify-start">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-400" aria-hidden="true" />
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400 mb-3 md:mb-4">
                    {benefit.description}
                  </p>
                  
                  {/* Liste des features */}
                  <ul className="space-y-1.5 sm:space-y-2">
                    {benefit.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 justify-center sm:justify-start">
                        <CheckCircle size={14} className="sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                        <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA principal */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={handleDiscuter}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto min-h-[44px]"
              aria-label="Discuter de mon projet"
            >
              Discuter de mon projet
              <ArrowRight size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
            
            <button
              onClick={handleVoirServices}
              className="bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto min-h-[44px]"
              aria-label="Voir mes services"
            >
              Voir mes services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ValueProposition;