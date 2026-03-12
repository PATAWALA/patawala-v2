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

// Points lumineux fixes (déterministes)
const LIGHT_POINTS = [
  { left: '15%', top: '25%' },
  { left: '75%', top: '60%' },
  { left: '40%', top: '80%' },
  { left: '85%', top: '15%' },
];

// Données par défaut pour les technologies (fallback)
const DEFAULT_TECH_STACK_FR: TechItem[] = [
  {
    name: "Next.js / React",
    level: "Expert",
    desc: "Applications web modernes et performantes",
    expertise: ["SSR/SSG", "App Router", "Server Components", "Optimisation SEO"]
  },
  {
    name: "Node.js / Express",
    level: "Avancé",
    desc: "API REST et microservices",
    expertise: ["API RESTful", "Microservices", "WebSockets", "Base de données"]
  },
  {
    name: "WordPress / WooCommerce",
    level: "Expert",
    desc: "Sites vitrines et e-commerce",
    expertise: ["Thèmes sur mesure", "Plugins", "Optimisation", "Sécurité"]
  },
  {
    name: "Odoo / ERP",
    level: "Expert",
    desc: "Solutions de gestion intégrées",
    expertise: ["Modules", "Personnalisation", "Intégration", "Migration"]
  },
  {
    name: "Infrastructure Cloud",
    level: "Avancé",
    desc: "Déploiement et scalabilité",
    expertise: ["AWS", "Vercel", "Netlify", "CI/CD"]
  },
  {
    name: "Sécurité & Performance",
    level: "Expert",
    desc: "Optimisation et protection",
    expertise: ["Lighthouse 90+", "Web Vitals", "Sécurité", "RGPD"]
  }
];

const DEFAULT_TECH_STACK_EN: TechItem[] = [
  {
    name: "Next.js / React",
    level: "Expert",
    desc: "Modern and performant web applications",
    expertise: ["SSR/SSG", "App Router", "Server Components", "SEO Optimization"]
  },
  {
    name: "Node.js / Express",
    level: "Advanced",
    desc: "REST APIs and microservices",
    expertise: ["RESTful API", "Microservices", "WebSockets", "Databases"]
  },
  {
    name: "WordPress / WooCommerce",
    level: "Expert",
    desc: "Showcase sites and e-commerce",
    expertise: ["Custom Themes", "Plugins", "Optimization", "Security"]
  },
  {
    name: "Odoo / ERP",
    level: "Expert",
    desc: "Integrated management solutions",
    expertise: ["Modules", "Customization", "Integration", "Migration"]
  },
  {
    name: "Cloud Infrastructure",
    level: "Advanced",
    desc: "Deployment and scalability",
    expertise: ["AWS", "Vercel", "Netlify", "CI/CD"]
  },
  {
    name: "Security & Performance",
    level: "Expert",
    desc: "Optimization and protection",
    expertise: ["Lighthouse 90+", "Web Vitals", "Security", "GDPR"]
  }
];

const TechExpertise = memo(function TechExpertise() {
  const { t, language, isLoading } = useTranslation();
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Attendre que les traductions soient chargées
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  // Charger les données tech depuis les traductions
  useEffect(() => {
    if (!isReady) return;
    
    try {
      const techData = t('techStack', 'tech');
      
      if (Array.isArray(techData) && techData.length > 0) {
        setTechStack(techData);
      } else {
        // Fallback par langue
        setTechStack(language === 'fr' ? DEFAULT_TECH_STACK_FR : DEFAULT_TECH_STACK_EN);
      }
    } catch (error) {
      console.error('Erreur chargement tech stack:', error);
      // Fallback en cas d'erreur
      setTechStack(language === 'fr' ? DEFAULT_TECH_STACK_FR : DEFAULT_TECH_STACK_EN);
    }
  }, [t, language, isReady]);

  // Mapping des icônes par nom de technologie - OPTIMISÉ
  const getIcon = (techName: string) => {
    if (techName.includes('Next.js') || techName.includes('React')) return Rocket;
    if (techName.includes('WordPress')) return Globe;
    if (techName.includes('Odoo') || techName.includes('ERP')) return Settings;
    if (techName.includes('Systeme.io')) return MousePointer;
    if (techName.includes('Infrastructure') || techName.includes('DevOps') || techName.includes('Cloud')) return Cloud;
    if (techName.includes('Sécurité') || techName.includes('Security') || techName.includes('Performance')) return Shield;
    if (techName.includes('Node.js')) return Code;
    if (techName.includes('Base de données') || techName.includes('Database')) return Database;
    return Code;
  };

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Déterminer le niveau et le pourcentage
  const getTechLevel = useCallback((tech: TechItem) => {
    const isExpert = tech.level === 'Expert' || tech.level === 'Expert' || tech.level === 'Expert';
    const isAdvanced = tech.level === 'Avancé' || tech.level === 'Advanced' || tech.level === 'Advanced';
    
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

  // SKELETON LOADER
  if (isLoading || !isReady || techStack.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Badge skeleton */}
          <div className="w-full flex justify-center mb-6 md:mb-8">
            <div className="w-32 h-8 bg-gray-800/50 rounded-full animate-pulse" />
          </div>

          {/* Titre skeleton */}
          <div className="text-center mb-10 md:mb-16">
            <div className="w-48 h-8 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-64 h-6 bg-gray-800/50 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Grille skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#141B2B]/50 rounded-xl p-5 border border-gray-800/50">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-xl animate-pulse" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-24 h-5 bg-gray-800/50 rounded animate-pulse" />
                      <div className="w-16 h-5 bg-gray-800/50 rounded-full animate-pulse" />
                    </div>
                    <div className="w-full h-4 bg-gray-800/50 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="w-full h-3 bg-gray-800/50 rounded animate-pulse" />
                  <div className="w-3/4 h-3 bg-gray-800/50 rounded animate-pulse" />
                  <div className="w-1/2 h-3 bg-gray-800/50 rounded animate-pulse" />
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800/50">
                  <div className="flex justify-between mb-2">
                    <div className="w-16 h-4 bg-gray-800/50 rounded animate-pulse" />
                    <div className="w-8 h-4 bg-gray-800/50 rounded animate-pulse" />
                  </div>
                  <div className="w-full h-2 bg-gray-800/50 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Note skeleton */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-6 bg-[#141B2B]/50 rounded-2xl border border-gray-800/50 max-w-2xl mx-auto">
              <div className="w-64 h-4 bg-gray-800/50 rounded animate-pulse" />
              <div className="w-32 h-8 bg-gray-800/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label={language === 'fr' ? "Expertise technique" : "Technical expertise"}
    >
      {/* FOND AMÉLIORÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes horizontales bleues */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0px, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />
        {/* Lignes verticales cyan */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.08) 0px, rgba(6,182,212,0.08) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        {/* Cercles flous */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

        {/* Points lumineux fixes */}
        {LIGHT_POINTS.map((point, i) => (
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
            <span>
              {t('title', 'tech')}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 font-black tracking-tight">
              {t('titleHighlight', 'tech')}
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto px-4 font-medium">
            {t('subtitle', 'tech')}
          </p>
        </div>

        {/* Technologies principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto mb-16 md:mb-20 auto-rows-fr">
          {techStack.map((tech) => {
            const Icon = getIcon(tech.name);
            const { percentage, badgeClass } = getTechLevel(tech);

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

                  {/* Points d'expertise */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 flex-1">
                    {tech.expertise.slice(0, 3).map((item: string) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                        <span className="text-xs sm:text-sm text-gray-200 font-medium truncate">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Mini barre de progression */}
                  <div className="mt-4 pt-4 border-t border-[#1F2937]">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-400 font-medium">
                        {t('mastery', 'tech')}
                      </span>
                      <span className="text-blue-400 font-bold">
                        {percentage}
                      </span>
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

        {/* Note de crédibilité avec CTA */}
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
              <span>
                {t('cta', 'tech')}
              </span>
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