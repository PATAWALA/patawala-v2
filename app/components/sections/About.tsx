'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Lightbulb, MessagesSquare, Handshake, Sparkles, MessageSquare, Globe, Smartphone, User } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import profileImage from '../../assets/images/about1.png';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/app/hooks/useTranslation';

// Interface pour typer les données
interface VisionCard {
  title: string;
  description: string;
}

const BookingModal = dynamic(() => import('../ui/BookingModal'), {
  ssr: false,
  loading: () => null,
});

// Données par défaut pour les cartes de vision
const DEFAULT_VISION_CARDS: VisionCard[] = [
  {
    "title": "Conseil & Stratégie Tech",
    "description": "Des choix technologiques adaptés à votre budget et vos objectifs, pour un lancement sans risque et sans coûts cachés."
  },
  {
    "title": "Partenariat Long Terme",
    "description": "Un accompagnement CTO sur mesure : je sécurise vos choix techniques et fais évoluer vos outils avec votre croissance."
  },
  {
    "title": "Innovation & Performance",
    "description": "IA et architectures modernes pour automatiser vos processus, booster vos ventes et vous démarquer."
  },
  {
    "title": "Co-création Transparente",
    "description": "Votre vision guidée par mon expertise : une collaboration fluide pour des outils robustes et durables."
  }
];

// Données par défaut pour les cartes de vision en anglais
const DEFAULT_VISION_CARDS_EN: VisionCard[] = [
  {
    "title": "Tech Consulting & Strategy",
    "description": "Technology choices adapted to your budget and goals, for a risk-free launch with no hidden costs."
  },
  {
    "title": "Long-term Partnership",
    "description": "Tailored CTO support: I secure your technical choices and evolve your tools with your growth."
  },
  {
    "title": "Innovation & Performance",
    "description": "AI and modern architectures to automate your processes, boost your sales, and stand out."
  },
  {
    "title": "Transparent Co-creation",
    "description": "Your vision guided by my expertise: a fluid collaboration for robust and sustainable tools."
  }
];

const AboutSection = memo(function AboutSection() {
  const { t, language, isLoading } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [visionCards, setVisionCards] = useState<VisionCard[]>(DEFAULT_VISION_CARDS);
  const [isReady, setIsReady] = useState(false);

  // Icônes pour les cartes
  const cardIcons = [Lightbulb, Handshake, Sparkles, MessagesSquare];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Attendre que les traductions soient chargées
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  // Récupérer les cartes de vision - SIMPLIFIÉ
  useEffect(() => {
    if (!isReady) return;
    
    try {
      // Récupérer directement l'objet vision
      const visionData = t('vision', 'about');
      
      // Vérifier que c'est un objet avec des cartes
      if (visionData && 
          typeof visionData === 'object' && 
          visionData !== null && 
          'cards' in visionData && 
          Array.isArray(visionData.cards) && 
          visionData.cards.length > 0) {
        
        // Filtrer les cartes valides
        const validCards = visionData.cards.filter((card: any) => 
          card && 
          typeof card === 'object' &&
          'title' in card && 
          'description' in card &&
          typeof card.title === 'string' &&
          typeof card.description === 'string'
        );
        
        if (validCards.length > 0) {
          setVisionCards(validCards);
        } else {
          // Fallback selon la langue
          setVisionCards(language === 'fr' ? DEFAULT_VISION_CARDS : DEFAULT_VISION_CARDS_EN);
        }
      } else {
        // Fallback selon la langue
        setVisionCards(language === 'fr' ? DEFAULT_VISION_CARDS : DEFAULT_VISION_CARDS_EN);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des cartes:', error);
      // Fallback selon la langue
      setVisionCards(language === 'fr' ? DEFAULT_VISION_CARDS : DEFAULT_VISION_CARDS_EN);
    }
  }, [t, language, isReady]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleParlerProjet = useCallback(() => {
    // Naviguer vers la section contact
    scrollToSection('contact');
  }, [scrollToSection]);

  const handleVoirProjets = useCallback(() => {
    // Naviguer vers la section projets
    scrollToSection('projets');
  }, [scrollToSection]);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  // Animation variants pour Framer Motion
  const fadeInUp : any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

// Correction pour staggerContainer
const staggerContainer : any  = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

  const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  },
  hover: { 
    y: -5, 
    boxShadow: '0 10px 30px -10px rgba(59,130,246,0.3)',
    transition: { duration: 0.2 }
  }
};

  // SKELETON LOADER
  if (isLoading || !isReady) {
    return (
      <section className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20 bg-[#0A0F1C] font-sans">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge skeleton */}
            <div className="w-full flex justify-center mb-8">
              <div className="w-48 h-10 bg-gray-800/50 rounded-full animate-pulse" />
            </div>

            {/* Titre skeleton */}
            <div className="text-center mb-12">
              <div className="w-64 h-12 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
              <div className="w-96 max-w-full h-8 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
              <div className="w-full max-w-3xl h-20 bg-gray-800/50 rounded-lg mx-auto animate-pulse" />
            </div>

            {/* Cartes skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#141B2B]/50 rounded-2xl p-6 border border-gray-800/50">
                  <div className="flex justify-between mb-5">
                    <div className="w-12 h-12 bg-gray-800/50 rounded-lg animate-pulse" />
                    <div className="w-8 h-8 bg-gray-800/50 rounded-full animate-pulse" />
                  </div>
                  <div className="w-3/4 h-6 bg-gray-800/50 rounded-lg mb-4 animate-pulse" />
                  <div className="w-full h-16 bg-gray-800/50 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>

            {/* Badge whoami skeleton */}
            <div className="flex justify-center mb-8">
              <div className="w-40 h-12 bg-gray-800/50 rounded-full animate-pulse" />
            </div>

            {/* Image et bio skeleton */}
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-[400px] aspect-square bg-gray-800/50 rounded-2xl animate-pulse" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="w-48 h-10 bg-gray-800/50 rounded-lg mx-auto lg:mx-0 animate-pulse" />
                <div className="w-64 h-8 bg-gray-800/50 rounded-lg mx-auto lg:mx-0 animate-pulse" />
                <div className="w-full h-24 bg-gray-800/50 rounded-lg animate-pulse" />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-32 h-12 bg-gray-800/50 rounded-xl animate-pulse" />
                  <div className="w-full sm:w-32 h-12 bg-gray-800/50 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="about"
        className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20 bg-[#0A0F1C] font-sans"
        aria-label={t('badge', 'about')}
      >
        {/* FOND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0px, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.08) 0px, rgba(6,182,212,0.08) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />

          <motion.div 
            className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" 
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true" 
          />
          <motion.div 
            className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" 
            animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            aria-hidden="true" 
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge centré principal */}
            <motion.div 
              className="w-full flex justify-center mb-8 md:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-5 py-2.5 rounded-full border border-blue-500/20 backdrop-blur-sm">
                <Sparkles size={16} className="text-blue-400" aria-hidden="true" />
                <span className="text-sm md:text-base font-semibold whitespace-nowrap tracking-tight">
                  {t('badge', 'about')}
                </span>
              </div>
            </motion.div>

            {/* Titre et sous-titre */}
            <motion.div 
              className="text-center mb-12 md:mb-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 
                className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight px-2 text-white tracking-tight"
                variants={fadeInUp}
              >
                <span>
                  {t('title', 'about')}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-2xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 md:mt-2 font-extrabold tracking-tight">
                  {t('subtitle', 'about')}
                </span>
              </motion.h2>

              <motion.p 
                className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4 font-normal leading-relaxed"
                variants={fadeInUp}
              >
                {t('description', 'about')}
              </motion.p>

              <motion.div 
                className="w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-8 md:mt-8 rounded-full"
                variants={fadeInUp}
              />
            </motion.div>

            {/* CARTES MA VISION */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 mb-16 md:mb-20"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {visionCards.map((card: VisionCard, index: number) => {
                const Icon = cardIcons[index] || MessagesSquare;

                return (
                  <motion.div
                    key={index}
                    className="bg-[#141B2B] rounded-2xl md:rounded-3xl p-6 md:p-7 border border-[#1F2937] hover:border-blue-500/30 transition-colors duration-300 relative"
                    role="article"
                    aria-labelledby={`vision-title-${index}`}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-4xl md:text-4xl font-black text-blue-400/80 tracking-tighter">
                          {`0${index + 1}`}
                        </span>
                        <Icon className="w-7 h-7 md:w-7 md:h-7 text-blue-400/70" aria-hidden="true" />
                      </div>

                      <h3 id={`vision-title-${index}`} className="text-xl md:text-2xl font-bold mb-4 text-white tracking-tight">
                        {card.title}
                      </h3>

                      <p className="text-base md:text-base text-gray-300 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* BADGE "Qui suis-je ?" */}
            <motion.div 
              className="flex justify-center mb-8 md:mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-6 py-3 rounded-full border border-blue-500/30 backdrop-blur-sm">
                <User size={18} className="text-blue-400" aria-hidden="true" />
                <span className="text-base md:text-base font-bold tracking-tight">
                  {t('whoami', 'about')}
                </span>
              </div>
            </motion.div>

            {/* Section image et bio */}
            <motion.div 
              className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {/* Image à gauche */}
              <motion.div 
                className="flex-1 flex justify-center lg:justify-end w-full"
                variants={fadeInUp}
              >
                <div className="relative w-full max-w-[400px] md:max-w-sm lg:max-w-md aspect-square">
                  
                  {/* Badge en haut à gauche */}
                  <motion.div 
                    className="absolute top-0 left-0 z-30" 
                    style={{ transform: 'translate(-5%, -5%)' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#1F2937]">
                      <Globe size={12} aria-hidden="true" />
                      <Smartphone size={12} aria-hidden="true" />
                      <span className="text-xs font-bold tracking-tight whitespace-nowrap">
                        {t('profile.badges.webMobile', 'about')}
                      </span>
                    </div>
                  </motion.div>

                  {/* Badge en bas à droite */}
                  <motion.div 
                    className="absolute bottom-0 right-0 z-30" 
                    style={{ transform: 'translate(5%, 5%)' }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#1F2937]">
                      <div className="w-2 h-2 bg-white rounded-full" />
                      <span className="text-xs font-bold tracking-tight whitespace-nowrap">
                        {t('profile.badges.available', 'about')}
                      </span>
                    </div>
                  </motion.div>

                  {/* Photo avec flottement */}
                  <motion.div 
                    className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-[#1F2937] bg-[#141B2B]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Image
                      src={profileImage}
                      alt={t('profile.name', 'about') || "Abdoulaye Patawala - Développeur Full Stack"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 400px, 384px"
                      priority
                      quality={95}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* BIO à droite */}
              <motion.div 
                className="flex-1 flex flex-col text-center lg:text-left max-w-md px-4 lg:px-0"
                variants={fadeInUp}
              >
                <h3 className="text-3xl md:text-4xl font-black mb-4 text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {t('profile.name', 'about')}
                  </span>
                </h3>

                <p className="text-lg md:text-xl text-blue-400 font-semibold mb-6 tracking-tight">
                  {t('profile.role', 'about')}
                </p>

                {/* Mission */}
                <div className="mb-8 md:mb-6 space-y-4">
                  <p className="text-lg md:text-lg text-gray-200 leading-relaxed font-normal">
                    {t('profile.missionText', 'about')}
                  </p>
                </div>

                {/* BOUTONS - Côte à côte sur mobile avec texte sur une ligne */}
                <div className="flex flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                  <motion.button
                    onClick={handleParlerProjet}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 md:px-6 py-4 md:py-3 rounded-xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 flex-1 sm:flex-none whitespace-nowrap min-h-[52px] tracking-tight"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={t('buttons.talk', 'about')}
                  >
                    <MessageSquare size={18} className="md:w-5 md:h-5" aria-hidden="true" />
                    <span>
                      {t('buttons.talk', 'about')}
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={handleVoirProjets}
                    className="bg-transparent text-white px-4 md:px-6 py-4 md:py-3 rounded-xl font-semibold text-sm md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors flex-1 sm:flex-none whitespace-nowrap min-h-[52px] tracking-tight"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={t('buttons.services', 'about')}
                  >
                    <span>
                      {t('buttons.services', 'about')}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {isMounted && (
        <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
      )}
    </>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;