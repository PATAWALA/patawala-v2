'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, MessagesSquare, Handshake, Sparkles, MessageSquare, Globe, Smartphone, User } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../assets/images/profile1.png';
import BookingModal from '../ui/BookingModal';
import { useTranslation } from '@/app/hooks/useTranslation';

// Interface pour typer les données
interface VisionCard {
  title: string;
  description: string;
}

interface VisionData {
  cards: VisionCard[];
}

const AboutSection = memo(function AboutSection() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [visionCards, setVisionCards] = useState<VisionCard[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Récupérer les cartes de vision
  useEffect(() => {
    try {
      const visionData = t('vision', 'about') as unknown as VisionData;
      if (visionData && typeof visionData === 'object' && 'cards' in visionData) {
        setVisionCards(visionData.cards);
      } else {
        setVisionCards([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des cartes:', error);
      setVisionCards([]);
    }
  }, [t]);

  // Points lumineux statiques (pour les badges)
  const lightPoints = useRef(
    [...Array(10)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
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

  return (
    <>
      <section
        id="about"
        className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20 bg-[#0A0F1C]"
        aria-label={t('badge', 'about')}
      >
        {/* FOND AMÉLIORÉ - densité augmentée */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          {/* Lignes subtiles - opacité 0.08 */}
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

          {/* Cercles flous animés - opacité 30% */}
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
            className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl will-change-transform"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge centré principal */}
            <div className="w-full flex justify-center mb-6 sm:mb-8">
              {isMounted ? (
                <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-500/20 backdrop-blur-sm">
                  <Sparkles size={14} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{t('badge', 'about')}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
                  <span className="text-sm font-medium">{t('badge', 'about')}</span>
                </div>
              )}
            </div>

            {/* Titre et sous-titre */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2 text-white">
                {t('title', 'about')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1 sm:mt-2">
                  {t('subtitle', 'about')}
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                {t('description', 'about')}
              </p>

              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-5 sm:mt-6 md:mt-8 rounded-full" />
            </div>

            {/* CARTES MA VISION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20">
              {Array.isArray(visionCards) && visionCards.length > 0 ? (
                visionCards.map((card: VisionCard, index: number) => {
                  const Icon =
                    index === 0 ? Lightbulb :
                    index === 1 ? Handshake :
                    index === 2 ? Sparkles :
                    MessagesSquare;

                  return (
                    <div
                      key={index}
                      className="group bg-[#141B2B] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-[#1F2937] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 relative will-change-transform"
                      role="article"
                      aria-labelledby={`vision-title-${index}`}
                    >
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl sm:text-4xl font-bold text-blue-400/80 group-hover:text-blue-400 transition-colors">
                            {`0${index + 1}`}
                          </span>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400/70 group-hover:text-blue-400 transition-colors" aria-hidden="true" />
                        </div>

                        <h3 id={`vision-title-${index}`} className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </h3>

                        <p className="text-base sm:text-lg text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-2 text-center text-gray-400 text-base sm:text-lg py-10">
                  Chargement des données...
                </div>
              )}
            </div>

            {/* BADGE "Qui suis-je ?" */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-5 py-2.5 rounded-full shadow-md border border-blue-500/30 backdrop-blur-sm">
                <User size={16} className="sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" />
                <span className="text-base sm:text-lg font-semibold tracking-wide">{t('whoami', 'about')}</span>
              </div>
            </div>

            {/* Section image et bio */}
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
              {/* Image à gauche */}
              <div className="flex-1 flex justify-center lg:justify-end w-full">
                <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md aspect-square">
                  {/* Cercles animés */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl -z-10 will-change-transform"
                    aria-hidden="true"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-6 border-2 border-cyan-400/20 rounded-full -z-10 will-change-transform"
                    aria-hidden="true"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl -z-10 will-change-transform"
                    aria-hidden="true"
                  />
                  <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -z-20 will-change-transform" aria-hidden="true" />

                  {/* Points lumineux */}
                  {lightPoints.map((point, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-blue-400/40 rounded-full shadow-lg shadow-blue-400/30"
                      style={{
                        left: point.left,
                        top: point.top,
                        opacity: 0.4,
                        transform: 'translateZ(0)'
                      }}
                      aria-hidden="true"
                    />
                  ))}

                  {/* Badge en haut à gauche */}
                  <div className="absolute top-0 left-0 z-30" style={{ transform: 'translate(-5%, -5%)' }}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                      <Globe size={9} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5" aria-hidden="true" />
                      <Smartphone size={9} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5" aria-hidden="true" />
                      <span className="text-[8px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-semibold whitespace-nowrap">{t('profile.badges.webMobile', 'about')}</span>
                    </div>
                  </div>

                  {/* Badge en bas à droite */}
                  <div className="absolute bottom-0 right-0 z-30" style={{ transform: 'translate(5%, 5%)' }}>
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                      <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                      <span className="text-[8px] xs:text-[8px] sm:text-[9px] md:text-[10px] font-semibold whitespace-nowrap">{t('profile.badges.available', 'about')}</span>
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
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* BIO à droite */}
              <div className="flex-1 flex flex-col text-center lg:text-left max-w-md px-3 sm:px-4 lg:px-0">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    {t('profile.name', 'about')}
                  </span>
                </h3>

                <p className="text-lg sm:text-xl md:text-2xl text-blue-400/90 font-medium mb-4">
                  {t('profile.role', 'about')}
                </p>

                {/* Mission */}
                <div className="mb-4 sm:mb-5 md:mb-6 space-y-3">
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                    {t('profile.missionText', 'about')}
                  </p>
                </div>

                {/* BOUTONS */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                  <button
                    onClick={handleParlerProjet}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-base sm:text-lg md:text-xl flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto min-h-[44px]"
                    aria-label={t('buttons.talk', 'about')}
                  >
                    <MessageSquare size={16} className="sm:w-4 sm:h-4" aria-hidden="true" />
                    {t('buttons.talk', 'about')}
                  </button>

                  <button
                    onClick={handleVoirOffres}
                    className="bg-transparent text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-base sm:text-lg md:text-xl border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto min-h-[44px]"
                    aria-label={t('buttons.services', 'about')}
                  >
                    {t('buttons.services', 'about')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de réservation */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
    </>
  );
});

export default AboutSection;