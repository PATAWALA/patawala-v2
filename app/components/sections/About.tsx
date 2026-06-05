'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { Target, Users, Zap, Shield, Sparkles, MessageSquare, Globe, Smartphone, User } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import profileImage from '../../assets/images/about1.jpeg';
import { useTranslation } from '@/app/hooks/useTranslation';

interface VisionCard {
  title: string;
  description: string;
}

const DEFAULT_VISION_CARDS: VisionCard[] = [
  { title: "Conseil Tech & Stratégie", description: "Des choix technologiques rigoureux alignés sur vos objectifs business. J'analyse vos besoins pour concevoir une feuille de route claire, garantissant un lancement fluide, sans risques ni coûts cachés." },
  { title: "Partenariat Long Terme", description: "Un accompagnement CTO sur-mesure et durable. Je ne me contente pas de livrer un produit : je sécurise vos choix techniques et fais évoluer vos outils main dans la main avec votre croissance, de la vision de départ jusqu'à l'accomplissement total de vos projets." },
  { title: "Innovation & Performance", description: "L'intégration des architectures modernes pour interconnecter vos outils de travail, centraliser vos flux d'information et concevoir des automatisations intelligentes qui optimisent vos performances au quotidien." },
  { title: "Co-création Transparente", description: "Votre vision métier guidée par mon expertise technique. Nous avançons dans une collaboration fluide et transparente pour donner vie à des solutions numériques robustes, sécurisées et adaptées à vos réalités." }
];

const AboutSection = memo(function AboutSection() {
  const { t, isLoading } = useTranslation();
  const [visionCards, setVisionCards] = useState<VisionCard[]>(DEFAULT_VISION_CARDS);
  const [isReady, setIsReady] = useState(false);

  const cardIcons = [Target, Users, Zap, Shield];

  // Dégradés dorés marqués
  const cardGradients = [
    'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.08) 0%, rgba(15,21,33,0.95) 50%)',
    'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.07) 0%, rgba(15,21,33,0.95) 50%)',
    'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.09) 0%, rgba(15,21,33,0.95) 50%)',
    'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.06) 0%, rgba(15,21,33,0.95) 50%)',
  ];

  useEffect(() => { if (!isLoading) setIsReady(true); }, [isLoading]);

  useEffect(() => {
    if (!isReady) return;
    try {
      const visionData = t('vision', 'about');
      if (visionData?.cards?.length > 0) setVisionCards(visionData.cards);
    } catch {}
  }, [t, isReady]);

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (isLoading || !isReady) {
    return (
      <section className="min-h-screen relative flex items-center py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex justify-center mb-8"><div className="w-48 h-10 bg-surface rounded-full animate-pulse" /></div>
          <div className="text-center mb-12 space-y-4">
            <div className="w-64 h-14 bg-surface rounded-lg mx-auto animate-pulse" />
            <div className="w-96 h-10 bg-surface rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-surface rounded-3xl p-8">
                <div className="flex justify-end mb-6"><div className="w-12 h-12 bg-border rounded-xl animate-pulse" /></div>
                <div className="w-3/4 h-7 bg-border rounded-lg mb-4 animate-pulse" />
                <div className="w-full h-20 bg-border rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="min-h-screen relative overflow-hidden flex items-center py-16 sm:py-20 lg:py-24 bg-background">
      {/* Fond avec orbe dorée plus visible */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-primary/[0.06] rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[700px] h-[700px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* BADGE */}
        <motion.div className="flex justify-center mb-10"
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)',
              border: '1px solid rgba(212,175,55,0.35)',
              boxShadow: '0 0 25px -5px rgba(212,175,55,0.3), inset 0 0 15px rgba(212,175,55,0.08)'
            }}>
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">{t('badge', 'about')}</span>
          </div>
        </motion.div>

        {/* TITRE */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 leading-tight">
            {t('title', 'about')}
          </h2>
          <p className="text-gradient-gold text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5">
            {t('subtitle', 'about')}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-amber-400 rounded-full mx-auto mb-6" />
          <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            {t('description', 'about')}
          </p>
        </motion.div>

        {/* CARTES VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {visionCards.map((card, index) => {
            const Icon = cardIcons[index] || Shield;
            return (
              <motion.div key={index}
                className="group relative p-8 sm:p-10 rounded-3xl overflow-hidden cursor-default"
                style={{
                  background: cardGradients[index],
                  border: '1px solid rgba(212,175,55,0.08)',
                  boxShadow: '0 15px 40px -15px rgba(0,0,0,0.5)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ 
                  y: -4, 
                  border: '1px solid rgba(212,175,55,0.25)',
                  boxShadow: '0 25px 50px -18px rgba(212,175,55,0.25)',
                }}>
                
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-end mb-6">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                    {card.title}
                  </h3>
                  <p className="text-base sm:text-lg text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* QUI SUIS-JE */}
        <motion.div className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)',
              border: '1px solid rgba(212,175,55,0.35)',
              boxShadow: '0 0 25px -5px rgba(212,175,55,0.3), inset 0 0 15px rgba(212,175,55,0.08)',
            }}>
            <User size={18} className="text-primary" />
            <span className="text-base font-bold text-primary">{t('whoami', 'about')}</span>
          </div>
        </motion.div>

        {/* IMAGE + BIO */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* IMAGE */}
          <motion.div className="flex-1 flex justify-center lg:justify-end w-full"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-square">
              
              <div className="absolute -top-4 -left-4 z-20">
                <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-sm text-background"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F5D05C 100%)',
                    boxShadow: '0 10px 30px -8px rgba(212,175,55,0.6)',
                  }}>
                  <Globe size={14} /><Smartphone size={14} />
                  {t('profile.badges.webMobile', 'about')}
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 z-20">
                <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-sm text-background"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F5D05C 100%)',
                    boxShadow: '0 10px 30px -8px rgba(212,175,55,0.6)',
                  }}>
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  {t('profile.badges.available', 'about')}
                </div>
              </div>

              <motion.div className="relative w-full h-full rounded-2xl overflow-hidden"
                animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6), 0 0 40px -10px rgba(212,175,55,0.2)' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent z-10 pointer-events-none" />
                <Image src={profileImage} alt={t('profile.name', 'about') || "Abdoulaye Patawala"} fill className="object-cover" sizes="420px" priority quality={95} />
              </motion.div>
            </div>
          </motion.div>

          {/* BIO */}
          <motion.div className="flex-1 flex flex-col text-center lg:text-left max-w-md"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            
            <h3 className="text-4xl sm:text-5xl font-extrabold mb-3">
              <span className="text-gradient-gold">{t('profile.name', 'about')}</span>
            </h3>
            <p className="text-xl text-primary font-semibold mb-6">{t('profile.role', 'about')}</p>
            <p className="text-lg text-muted leading-relaxed mb-8">{t('profile.missionText', 'about')}</p>

            <div className="flex flex-row gap-3 justify-center lg:justify-start">
              <motion.button onClick={() => scrollToSection('contact')}
                className="btn-gold text-sm px-4 py-3 sm:text-base sm:px-6 sm:py-4 flex-1 sm:flex-none whitespace-nowrap min-w-0"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span className="truncate">{t('buttons.talk', 'about')}</span>
              </motion.button>
              <motion.button onClick={() => scrollToSection('projets')}
                className="btn-cyan-outline text-sm px-4 py-3 sm:text-base sm:px-6 sm:py-4 flex-1 sm:flex-none whitespace-nowrap min-w-0"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <span className="truncate">{t('buttons.services', 'about')}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
export default AboutSection;