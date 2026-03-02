'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { 
  Code, Database, Cloud, Shield, 
  Sparkles, Rocket, Layers, Gauge,
  CheckCircle, ArrowRight, Cpu, Globe,
  Settings, MousePointer, Award
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Version mémoïsée du composant
const TechExpertise = memo(function TechExpertise() {
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

  const techStack = [
    { 
      icon: Rocket, 
      name: 'Next.js / React', 
      level: 'Expert', 
      desc: 'Sites modernes ultra-rapides et applications web complexes',
      expertise: ['Sites vitrines performants', 'Applications SaaS', 'E-commerce sur-mesure']
    },
    { 
      icon: Globe, 
      name: 'WordPress', 
      level: 'Expert', 
      desc: 'Sites faciles à gérer, blogs, boutiques et vitrines',
      expertise: ['Thèmes sur-mesure', 'WooCommerce', 'Optimisation performance']
    },
    { 
      icon: Settings, 
      name: 'Odoo / ERP', 
      level: 'Avancé', 
      desc: 'Gestion d\'entreprise, CRM, facturation, inventaire',
      expertise: ['Modules sur-mesure', 'Automatisation', 'Intégration']
    },
    { 
      icon: MousePointer, 
      name: 'Systeme.io', 
      level: 'Intermédiaire', 
      desc: 'Marketing automation, entonnoirs de vente, plateforme tout-en-un',
      expertise: ['Entonnoirs de vente', 'Email marketing', 'Membership sites']
    },
    { 
      icon: Cloud, 
      name: 'Infrastructure & DevOps', 
      level: 'Avancé', 
      desc: 'Déploiement, hébergement, mise à l\'échelle sans souci',
      expertise: ['Vercel / Netlify', 'AWS', 'CI/CD']
    },
    { 
      icon: Shield, 
      name: 'Sécurité & Performance', 
      level: 'Avancé', 
      desc: 'Sites sécurisés et rapides, vos visiteurs adorent',
      expertise: ['Sécurité renforcée', 'Optimisation', 'Monitoring']
    }
  ];

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#contact');
    }
  }, []);

  return (
    <section 
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label="Expertise technique"
    >
      {/* FOND OPTIMISÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        
        {/* Éléments décoratifs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl will-change-transform" />
        
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
              <Award size={14} className="text-blue-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">
                Technologies que je maîtrise
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <span className="text-sm font-medium text-blue-400">Technologies maîtrisées</span>
            </div>
          )}
        </div>

        {/* Titre */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white px-4">
            Une expertise au service
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
              de vos ambitions
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Je sélectionne les technologies les plus adaptées à chaque projet. 
            L'essentiel n'est pas l'outil, mais ce qu'il permet de construire avec vous.
          </p>
        </div>

        {/* Technologies principales - AVEC ANIMATION AU SURVOL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto mb-16 md:mb-20">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="group bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#1F2937] shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300 relative will-change-transform hover:-translate-y-2"
            >
              {/* Ombre au hover */}
              <div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  boxShadow: '0 25px 40px -12px rgba(59, 130, 246, 0.6)',
                  zIndex: -1,
                  transform: 'translateY(4px)'
                }}
              />

              <div className="relative z-10">
                {/* En-tête avec icône et niveau */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <tech.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {tech.name}
                      </h3>
                      <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                        tech.level === 'Expert' 
                          ? 'bg-blue-500/20 text-blue-400'
                          : tech.level === 'Avancé'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {tech.level}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {tech.desc}
                    </p>
                  </div>
                </div>

                {/* Points d'expertise */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                  {tech.expertise.map((item) => (
                    <div key={item} className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs sm:text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Mini barre de progression */}
                <div className="mt-4 pt-4 border-t border-[#1F2937]">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-500">Maîtrise</span>
                    <span className="text-blue-400 font-medium">
                      {tech.level === 'Expert' ? '90%' : tech.level === 'Avancé' ? '80%' : '70%'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
                      style={{ width: tech.level === 'Expert' ? '90%' : tech.level === 'Avancé' ? '80%' : '70%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Note de crédibilité avec CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-6 md:p-8 bg-[#141B2B] rounded-2xl border border-[#1F2937] shadow-md max-w-2xl mx-auto hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <p className="text-sm sm:text-base text-gray-300 font-medium">
                Je ne choisis pas un outil parce qu'il est à la mode, mais parce qu'il est le bon pour ce que nous voulons construire ensemble.
              </p>
            </div>

            {/* Mini CTA */}
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm sm:text-base group hover:text-blue-300 transition-colors"
              aria-label="Discuter de mon projet"
            >
              <span>Discuter de mon projet</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default TechExpertise;