'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Lightbulb, MessagesSquare, Handshake, Sparkles, MessageSquare, Globe, Smartphone, User } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../assets/images/about1.png';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/app/context/LanguageContext';

// Interface pour typer les données
interface VisionCard {
  title: string;
  description: string;
}

interface VisionData {
  cards: VisionCard[];
}

const BookingModal = dynamic(() => import('../ui/BookingModal'), {
  ssr: false,
  loading: () => null,
});

// Données par défaut
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

const AboutSection = memo(function AboutSection() {
  const { t } = useLanguage(); // ← PLUS DE isLoading
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [visionCards, setVisionCards] = useState<VisionCard[]>(DEFAULT_VISION_CARDS);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Récupérer les cartes de vision
  useEffect(() => {
    try {
      const visionData = t('vision', 'about') as unknown as VisionData;
      if (visionData && typeof visionData === 'object' && 'cards' in visionData && Array.isArray(visionData.cards) && visionData.cards.length > 0) {
        setVisionCards(visionData.cards);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des cartes:', error);
    }
  }, [t]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleParlerProjet = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const handleVoirOffres = useCallback(() => {
    window.location.href = '/services';
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  // Icônes pour les cartes
  const cardIcons = [Lightbulb, Handshake, Sparkles, MessagesSquare];

  return (
    <>
      <section
        id="about"
        className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20 bg-[#0A0F1C]"
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

          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge centré principal */}
            <div className="w-full flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-500/20 backdrop-blur-sm">
                <Sparkles size={14} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap tracking-tight">
                  {t('badge', 'about')}
                </span>
              </div>
            </div>

            {/* Titre et sous-titre */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2 text-white tracking-tight">
                <span>
                  {t('title', 'about')}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 sm:mt-2 font-extrabold tracking-tight">
                  {t('subtitle', 'about')}
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto px-4 font-medium leading-relaxed">
                {t('description', 'about')}
              </p>

              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-5 sm:mt-6 md:mt-8 rounded-full" />
            </div>

            {/* CARTES MA VISION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
              {visionCards.map((card: VisionCard, index: number) => {
                const Icon = cardIcons[index] || MessagesSquare;

                return (
                  <div
                    key={index}
                    className="bg-[#141B2B] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-[#1F2937] hover:border-blue-500/30 transition-colors duration-300 relative"
                    role="article"
                    aria-labelledby={`vision-title-${index}`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl sm:text-4xl font-black text-blue-400/80 tracking-tighter">
                          {`0${index + 1}`}
                        </span>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400/70" aria-hidden="true" />
                      </div>

                      <h3 id={`vision-title-${index}`} className="text-lg sm:text-xl md:text-2xl font-extrabold mb-3 text-white tracking-tight">
                        {card.title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BADGE "Qui suis-je ?" */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-5 py-2.5 rounded-full border border-blue-500/30 backdrop-blur-sm">
                <User size={16} className="sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" />
                <span className="text-sm sm:text-base font-bold tracking-tight">
                  {t('whoami', 'about')}
                </span>
              </div>
            </div>

            {/* Section image et bio */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
              {/* Image à gauche */}
              <div className="flex-1 flex justify-center lg:justify-end w-full">
                <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md aspect-square">
                  
                  {/* Badge en haut à gauche */}
                  <div className="absolute top-0 left-0 z-30" style={{ transform: 'translate(-5%, -5%)' }}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                      <Globe size={9} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5" aria-hidden="true" />
                      <Smartphone size={9} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5" aria-hidden="true" />
                      <span className="text-[8px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-tight whitespace-nowrap">
                        {t('profile.badges.webMobile', 'about')}
                      </span>
                    </div>
                  </div>

                  {/* Badge en bas à droite */}
                  <div className="absolute bottom-0 right-0 z-30" style={{ transform: 'translate(5%, 5%)' }}>
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                      <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                      <span className="text-[8px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-tight whitespace-nowrap">
                        {t('profile.badges.available', 'about')}
                      </span>
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 sm:border-4 border-[#1F2937] bg-[#141B2B]">
                    <Image
                      src={profileImage}
                      alt="Abdoulaye Patawala - Développeur Full Stack"
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 350px, (max-width: 1024px) 384px, 448px"
                      priority
                      fetchPriority="high"
                      quality={85}
                      placeholder="blur"
                    />
                  </div>
                </div>
              </div>

              {/* BIO à droite */}
              <div className="flex-1 flex flex-col text-center lg:text-left max-w-md px-3 sm:px-4 lg:px-0">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {t('profile.name', 'about')}
                  </span>
                </h3>

                <p className="text-base sm:text-lg md:text-xl text-blue-400 font-semibold mb-4 tracking-tight">
                  {t('profile.role', 'about')}
                </p>

                {/* Mission */}
                <div className="mb-4 sm:mb-5 md:mb-6 space-y-3">
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-medium">
                    {t('profile.missionText', 'about')}
                  </p>
                </div>

                {/* BOUTONS */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                  <button
                    onClick={handleParlerProjet}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto min-h-[44px] tracking-tight"
                    aria-label={t('buttons.talk', 'about')}
                  >
                    <MessageSquare size={16} className="sm:w-4 sm:h-4" aria-hidden="true" />
                    <span>
                      {t('buttons.talk', 'about')}
                    </span>
                  </button>

                  <button
                    onClick={handleVoirOffres}
                    className="bg-transparent text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-sm sm:text-base md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto min-h-[44px] tracking-tight"
                    aria-label={t('buttons.services', 'about')}
                  >
                    <span>
                      {t('buttons.services', 'about')}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;