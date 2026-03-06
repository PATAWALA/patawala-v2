'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Database, Cloud, Shield,
  Sparkles, Rocket, Layers, Gauge,
  CheckCircle, ArrowRight, Cpu, Globe,
  Settings, MousePointer, Award
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/hooks/useTranslation';

// Interface pour typer les technologies
interface TechItem {
  name: string;
  level: string;
  desc: string;
  expertise: string[];
}

const TechExpertise = memo(function TechExpertise() {
  const { t, language } = useTranslation();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [techStack, setTechStack] = useState<TechItem[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Charger les données tech depuis les traductions
  useEffect(() => {
    try {
      const techData = t('techStack', 'tech');
      if (Array.isArray(techData)) {
        setTechStack(techData);
      }
    } catch (error) {
      console.error('Erreur chargement tech stack:', error);
    }
  }, [t, language]);

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  // Mapping des icônes par nom de technologie
  const getIcon = (techName: string) => {
    if (techName.includes('Next.js') || techName.includes('React')) return Rocket;
    if (techName.includes('WordPress')) return Globe;
    if (techName.includes('Odoo') || techName.includes('ERP')) return Settings;
    if (techName.includes('Systeme.io')) return MousePointer;
    if (techName.includes('Infrastructure') || techName.includes('DevOps')) return Cloud;
    if (techName.includes('Sécurité') || techName.includes('Security') || techName.includes('Performance')) return Shield;
    return Code;
  };

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
      aria-label={language === 'fr' ? "Expertise technique" : "Technical expertise"}
    >
      {/* FOND OPTIMISÉ - densité augmentée comme dans Réalisations */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles - opacité portée à 0.08 */}
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

        {/* Cercles flous animés - opacité /30 et animations fluides */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl will-change-transform"
          aria-hidden="true"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl will-change-transform"
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge centré */}
        <div className="w-full flex justify-center mb-6 md:mb-8">
          {isMounted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <Award size={14} className="text-blue-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">
                {t('badge', 'tech')}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <span className="text-sm font-medium text-blue-400">{t('badge', 'tech')}</span>
            </div>
          )}
        </div>

        {/* Titre */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white px-4">
            {t('title', 'tech')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
              {t('titleHighlight', 'tech')}
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            {t('subtitle', 'tech')}
          </p>
        </div>

        {/* Technologies principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto mb-16 md:mb-20 auto-rows-fr">
          {Array.isArray(techStack) && techStack.map((tech, index) => {
            const Icon = getIcon(tech.name);

            return (
              <div
                key={tech.name}
                className="group bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#1F2937] shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300 relative will-change-transform hover:-translate-y-2 flex flex-col"
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

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* En-tête avec icône et niveau */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {tech.name}
                        </h3>
                        <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                          tech.level === 'Expert' || tech.level === 'Expert'
                            ? 'bg-blue-500/20 text-blue-400'
                            : tech.level === 'Avancé' || tech.level === 'Advanced'
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
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-1">
                    {tech.expertise.map((item: string) => (
                      <div key={item} className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                        <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                        <span className="text-xs sm:text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini barre de progression */}
                  <div className="mt-4 pt-4 border-t border-[#1F2937]">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">{t('mastery', 'tech')}</span>
                      <span className="text-blue-400 font-medium">
                        {tech.level === 'Expert' || tech.level === 'Expert' ? '90%' :
                          tech.level === 'Avancé' || tech.level === 'Advanced' ? '80%' : '70%'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300"
                        style={{
                          width: tech.level === 'Expert' || tech.level === 'Expert' ? '90%' :
                            tech.level === 'Avancé' || tech.level === 'Advanced' ? '80%' : '70%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note de crédibilité avec CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-6 md:p-8 bg-[#141B2B] rounded-2xl border border-[#1F2937] shadow-md max-w-2xl mx-auto hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <p className="text-sm sm:text-base text-gray-300 font-medium">
                {t('note', 'tech')}
              </p>
            </div>

            {/* Mini CTA */}
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm sm:text-base group hover:text-blue-300 transition-colors"
              aria-label={t('cta', 'tech')}
            >
              <span>{t('cta', 'tech')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default TechExpertise;