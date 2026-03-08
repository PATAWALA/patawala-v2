'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Code, Database, Cloud, Shield,
  Sparkles, Rocket, Layers, Gauge,
  CheckCircle, ArrowRight, Globe,
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
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Charger les données tech depuis les traductions
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const techData = t('techStack', 'tech');
      if (Array.isArray(techData)) {
        setTechStack(techData);
      }
    } catch (error) {
      console.error('Erreur chargement tech stack:', error);
    }
  }, [t, language, isMounted]);

  // Points lumineux statiques - RÉDUITS À 2 SEULEMENT
  const lightPoints = useRef(
    [...Array(2)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  // Mapping des icônes par nom de technologie - OPTIMISÉ
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
      // SUPPRIMÉ : window.history.pushState (inutile et coûteux)
    }
  }, []);

  // Déterminer le niveau et le pourcentage UNE SEULE FOIS par tech
  const getTechLevel = useCallback((tech: TechItem) => {
    const isExpert = tech.level === 'Expert' || tech.level === 'Expert';
    const isAdvanced = tech.level === 'Avancé' || tech.level === 'Advanced';
    
    return {
      isExpert,
      isAdvanced,
      percentage: isExpert ? '90%' : isAdvanced ? '80%' : '70%',
      badgeClass: isExpert
        ? 'bg-blue-500/20 text-blue-400'
        : isAdvanced
        ? 'bg-blue-500/10 text-blue-400'
        : 'bg-gray-700 text-gray-200'
    };
  }, []);

  return (
    <section
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label={language === 'fr' ? "Expertise technique" : "Technical expertise"}
    >
      {/* FOND ULTRA-OPTIMISÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles - UNE SEULE COUCHE, OPACITÉ RÉDUITE */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        {/* Cercles flous - 2 SEULEMENT (au lieu de 3) */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

        {/* Points lumineux - 2 SEULEMENT */}
        {lightPoints.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Badge centré */}
        <div className="w-full flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <Award size={14} className="text-blue-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold text-blue-400 tracking-tight">
              {t('badge', 'tech')}
            </span>
          </div>
        </div>

        {/* Titre */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-white px-4 tracking-tight">
            {t('title', 'tech')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 font-black tracking-tight">
              {t('titleHighlight', 'tech')}
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto px-4 font-medium">
            {t('subtitle', 'tech')}
          </p>
        </div>

        {/* Technologies principales - OPTIMISÉES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto mb-16 md:mb-20 auto-rows-fr">
          {Array.isArray(techStack) && techStack.map((tech) => {
            const Icon = getIcon(tech.name);
            const { isExpert, isAdvanced, percentage, badgeClass } = getTechLevel(tech);

            return (
              <div
                key={tech.name}
                className="bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#1F2937] shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 relative flex flex-col will-change-transform"
              >
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* En-tête avec icône et niveau */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight">
                          {tech.name}
                        </h3>
                        <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold tracking-tight ${badgeClass}`}>
                          {tech.level}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium">
                        {tech.desc}
                      </p>
                    </div>
                  </div>

                  {/* Points d'expertise - LIMITÉS À 3 MAX */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-1">
                    {tech.expertise.slice(0, 3).map((item: string) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                        <span className="text-xs sm:text-sm text-gray-200 font-medium truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini barre de progression */}
                  <div className="mt-4 pt-4 border-t border-[#1F2937]">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-400 font-medium">{t('mastery', 'tech')}</span>
                      <span className="text-blue-400 font-bold">{percentage}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: percentage }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note de crédibilité avec CTA - OPTIMISÉE */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-6 md:p-8 bg-[#141B2B] rounded-2xl border border-[#1F2937] shadow-md max-w-2xl mx-auto hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <p className="text-sm sm:text-base text-gray-200 font-semibold">
                {t('note', 'tech')}
              </p>
            </div>

            {/* Mini CTA */}
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm sm:text-base group hover:text-blue-300 transition-colors tracking-tight"
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

TechExpertise.displayName = 'TechExpertise';

export default TechExpertise;