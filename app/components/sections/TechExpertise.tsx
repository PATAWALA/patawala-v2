'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { Award, Rocket, Globe, Settings, MousePointer, Cloud, Shield, Code, Database, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  level: string;
  desc: string;
  expertise: string[];
  mastery?: number;
}

const DEFAULT_TECH_STACK: TechItem[] = [
  { name: "Next.js / React", level: "Expert", desc: "Applications web modernes et performantes", expertise: ["SSR/SSG", "App Router", "Server Components"], mastery: 90 },
  { name: "Node.js / Express", level: "Avancé", desc: "API REST et microservices", expertise: ["API RESTful", "Microservices", "WebSockets"], mastery: 80 },
  { name: "WordPress / WooCommerce", level: "Expert", desc: "Sites vitrines et e-commerce", expertise: ["Thèmes sur mesure", "Plugins", "Optimisation"], mastery: 90 },
  { name: "Odoo / ERP", level: "Expert", desc: "Solutions de gestion intégrées", expertise: ["Modules", "Personnalisation", "Intégration"], mastery: 90 },
  { name: "Infrastructure Cloud", level: "Avancé", desc: "Déploiement et scalabilité", expertise: ["AWS", "Vercel", "CI/CD"], mastery: 85 },
  { name: "Sécurité & Performance", level: "Expert", desc: "Optimisation et protection", expertise: ["Lighthouse 90+", "Web Vitals", "Sécurité"], mastery: 90 }
];

const TechExpertise = memo(function TechExpertise() {
  const { t, isLoading } = useTranslation();
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => { if (!isLoading) setIsReady(true); }, [isLoading]);

  useEffect(() => {
    if (!isReady) return;
    try {
      const techData = t('techStack', 'tech');
      setTechStack(Array.isArray(techData) && techData.length > 0 ? techData : DEFAULT_TECH_STACK);
    } catch {
      setTechStack(DEFAULT_TECH_STACK);
    }
  }, [t, isReady]);

  const getIcon = (techName: string) => {
    if (techName.includes('Next.js') || techName.includes('React')) return Rocket;
    if (techName.includes('WordPress')) return Globe;
    if (techName.includes('Odoo') || techName.includes('ERP')) return Settings;
    if (techName.includes('Systeme.io')) return MousePointer;
    if (techName.includes('Infrastructure') || techName.includes('Cloud')) return Cloud;
    if (techName.includes('Sécurité') || techName.includes('Performance')) return Shield;
    if (techName.includes('Node.js')) return Code;
    if (techName.includes('Base de données')) return Database;
    return Code;
  };

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (isLoading || !isReady || techStack.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-center mb-8"><div className="w-36 h-10 bg-surface rounded-full animate-pulse" /></div>
          <div className="text-center mb-12 space-y-4">
            <div className="w-56 h-10 bg-surface rounded-lg mx-auto animate-pulse" />
            <div className="w-72 h-6 bg-surface rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-surface rounded-2xl p-6 space-y-3">
                <div className="flex gap-3"><div className="w-10 h-10 bg-border rounded-xl animate-pulse" /><div className="flex-1"><div className="w-20 h-4 bg-border rounded animate-pulse" /></div></div>
                <div className="w-full h-12 bg-border rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="expertise" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Badge */}
        <motion.div className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-primary"
            style={{ 
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 0 20px -5px rgba(212,175,55,0.2), inset 0 0 10px rgba(212,175,55,0.05)'
            }}>
            <Award size={16} />
            <span className="text-sm font-semibold">{t('badge', 'tech')}</span>
          </div>
        </motion.div>

        {/* Titre */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 leading-tight">
            {t('title', 'tech')}
          </h2>
          <p className="text-gradient-gold text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t('titleHighlight', 'tech')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-amber-400 rounded-full mx-auto mb-5" />
          <p className="text-base sm:text-lg text-muted max-w-3xl mx-auto">
            {t('subtitle', 'tech')}
          </p>
        </motion.div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {techStack.map((tech, index) => {
            const Icon = getIcon(tech.name);
            const isExpert = tech.level === 'Expert';
            const mastery = tech.mastery || (isExpert ? 90 : 80);

            return (
              <motion.div key={tech.name}
                className="group relative bg-surface rounded-2xl p-6 flex flex-col overflow-hidden"
                style={{ 
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(30,42,62,0.3)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: '0 20px 40px -15px rgba(212,175,55,0.15)',
                  borderColor: 'rgba(212,175,55,0.3)'
                }}>

                {/* Lueur au hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icône + Titre + Badge */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        boxShadow: '0 0 15px -3px rgba(212,175,55,0.1)'
                      }}>
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-base font-bold text-foreground truncate">{tech.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold flex-shrink-0"
                          style={isExpert ? {
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            color: '#D4AF37',
                            boxShadow: '0 0 12px -3px rgba(212,175,55,0.2), inset 0 0 6px rgba(212,175,55,0.05)',
                          } : {
                            background: 'linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.04) 100%)',
                            border: '1px solid rgba(0,229,255,0.2)',
                            color: '#00E5FF',
                            boxShadow: '0 0 12px -3px rgba(0,229,255,0.12), inset 0 0 6px rgba(0,229,255,0.03)',
                          }}>
                          {tech.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">{tech.desc}</p>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="space-y-2 mb-6 flex-1">
                    {tech.expertise.slice(0, 3).map((item: string) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle size={13} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-muted">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Barre de progression */}
                  <div className="pt-4 border-t border-border/30">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted text-[10px] uppercase tracking-wider">{t('mastery', 'tech')}</span>
                      <span className="text-primary font-bold">{mastery}%</span>
                    </div>
                    <div className="w-full h-2 bg-border/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #D4AF37 0%, #F5D05C 100%)', boxShadow: '0 0 10px -2px rgba(212,175,55,0.4)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${mastery}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note + CTA */}
        <motion.div className="text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="inline-flex flex-col items-center gap-5 p-6 sm:p-8 bg-surface rounded-2xl max-w-2xl mx-auto"
            style={{ 
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.4)',
              border: '1px solid rgba(30,42,62,0.3)'
            }}>
            <p className="text-sm sm:text-base text-muted">{t('note', 'tech')}</p>
            <button onClick={scrollToContact}
              className="btn-gold text-sm px-6 py-3 group">
              {t('cta', 'tech')}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TechExpertise.displayName = 'TechExpertise';
export default TechExpertise;