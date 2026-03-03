'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Globe, Smartphone, Star } from 'lucide-react';
import Typed from 'typed.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileImage from '../../assets/images/profile.png';
import profile2Image from '../../assets/images/profile2.jpeg';
import profile5Image from '../../assets/images/profile5.png';
import profile6Image from '../../assets/images/profile6.jpg';
import profile4Image from '../../assets/images/profile4.png';
import profile7Image from '../../assets/images/profile7.jpg';
import profile8Image from '../../assets/images/profile8.jpg';
import BookingModal from '../ui/BookingModal';
import { useTranslation } from '@/app/hooks/useTranslation';

const HeroSection = memo(function HeroSection() {
  const { t, language } = useTranslation();
  const typedRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mise à jour du Typed quand la langue change
  useEffect(() => {
    if (!typedRef.current || !isMounted) return;

    // Récupérer les chaînes depuis les traductions
    const strings = t('typed.strings', 'hero');
    
    // Vérifier que strings est bien un tableau
    const stringsArray = Array.isArray(strings) ? strings : [];
    
    if (stringsArray.length === 0) return;

    // Détruire l'instance précédente si elle existe
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: stringsArray,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1000,
        loop: true,
        loopCount: Infinity
      });

      return () => typed.destroy();
    }
  }, [isMounted, language, t]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  }, []);

  const handleLancerProjet = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const handleVoirRealisations = useCallback(() => {
    scrollToSection('projets');
  }, [scrollToSection]);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  // Images pour le cercle d'avatars
  const avatarImages = [
    { src: profile2Image, alt: t('altImages.avatar', 'hero') },
    { src: profile5Image, alt: t('altImages.avatar', 'hero') },
    { src: profile4Image, alt: t('altImages.avatar', 'hero') },
    { src: profile6Image, alt: t('altImages.avatar', 'hero') },
    { src: profile7Image, alt: t('altImages.avatar', 'hero') },
    { src: profile8Image, alt: t('altImages.avatar', 'hero') },
  ];

  return (
    <>
      <section 
        id="hero" 
        className="min-h-screen relative overflow-hidden flex items-center pt-24 sm:pt-28 md:pt-28 lg:pt-10 xl:pt-12"
        aria-label={language === 'fr' ? "Section d'accueil" : "Hero section"}
      >
        {/* BEAU FOND - avec dégradé et formes floues */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, 
              rgba(59,130,246,0.05) 0px, 
              rgba(59,130,246,0.05) 1px, 
              transparent 1px, 
              transparent 60px)`
          }}></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, 
              rgba(6,182,212,0.05) 0px, 
              rgba(6,182,212,0.05) 1px, 
              transparent 1px, 
              transparent 60px)`
          }}></div>
          
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        
        {/* Container principal */}
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 py-4 sm:py-6 md:py-8 lg:py-12">
          
          {/* Badge principal - visible sur desktop uniquement */}
          <div className="w-full hidden lg:flex justify-center mb-8 lg:mb-10 xl:mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2.5 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <Sparkles size={14} className="text-blue-400" aria-hidden="true" />
              <span className="text-sm font-semibold whitespace-nowrap">{t('badge', 'hero')}</span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
            
            {/* Texte - partie gauche */}
            <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-tight px-1 sm:px-2 text-white">
                {t('title', 'hero')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-0.5 sm:mt-1 md:mt-2 font-black">
                  <span 
                    ref={typedRef} 
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
                    aria-label={language === 'fr' ? "Texte animé" : "Animated text"}
                  />
                </span>
              </h1>

              <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 mb-4 sm:mb-5 px-2 sm:px-3 md:px-4 lg:px-0">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-bold">
                  {t('subtitle', 'hero')}
                </p>
              </div>

              {/* CERCLE D'AVATARS - VERSION COMPACTE */}
              <div className="flex flex-row items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-7 px-2 sm:px-3 lg:px-0">
                {/* Avatars superposés - plus petits et chevauchement plus fort */}
                <div className="flex items-center -space-x-4 sm:-space-x-5">
                  {avatarImages.slice(0, 5).map((avatar, index) => (
                    <div 
                      key={index}
                      className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#1F2937] overflow-hidden bg-[#141B2B] shadow-lg"
                      style={{ zIndex: 10 - index }}
                    >
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 28px, 32px"
                      />
                    </div>
                  ))}
                  {/* +1 badge pour montrer qu'il y a plus d'avatars */}
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#1F2937] bg-blue-500/20 flex items-center justify-center text-[10px] sm:text-xs font-bold text-blue-400 shadow-lg">
                    +{avatarImages.length - 5}
                  </div>
                </div>

                {/* Étoiles et texte - plus compact */}
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="sm:w-3 sm:h-3 fill-orange-400 text-orange-400" 
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-bold text-white">30+</span>
                    <span className="text-[9px] sm:text-xs text-gray-400 whitespace-nowrap">
                      {t('socialProof.entrepreneurs', 'hero')}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOUTONS */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-3 lg:px-0">
                <button
                  onClick={handleLancerProjet}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-5 md:px-6 py-3 sm:py-2.5 md:py-3 rounded-xl font-bold text-sm sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto min-h-[44px] cursor-pointer"
                  aria-label={t('buttons.project', 'hero')}
                >
                  {t('buttons.project', 'hero')}
                  <ArrowRight size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
                </button>
                
                <button
                  onClick={handleVoirRealisations}
                  className="bg-transparent text-white px-6 sm:px-5 md:px-6 py-3 sm:py-2.5 md:py-3 rounded-xl font-semibold text-sm sm:text-sm md:text-base lg:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto min-h-[44px] cursor-pointer"
                  aria-label={t('buttons.portfolio', 'hero')}
                >
                  {t('buttons.portfolio', 'hero')}
                </button>
              </div>
            </div>

            {/* Photo de profil principale */}
            <div className="flex-1 flex justify-center relative order-1 lg:order-2 w-full">
              
              {/* Conteneur avec dimensions exactes */}
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md">
                
                {/* Éléments de fond */}
                <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl -z-10 scale-125 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-6 border-2 border-cyan-400/30 rounded-full -z-10 will-change-transform" aria-hidden="true" />
                
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

                {/* Badge en haut à droite */}
                <div className="absolute top-0 right-0 z-30" style={{ transform: 'translate(5%, -5%)' }}>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                    <Globe size={8} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                    <Smartphone size={8} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                    <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold">{t('badges.multisupport', 'hero')}</span>
                  </div>
                </div>

                {/* Badge en bas à gauche */}
                <div className="absolute bottom-0 left-0 z-30" style={{ transform: 'translate(-5%, 5%)' }}>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                    <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                    <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold">{t('badges.available', 'hero')}</span>
                  </div>
                </div>

                {/* Photo de profil principale */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 sm:border-4 border-[#1F2937] bg-[#141B2B]">
                  <div className="aspect-square relative">
                    <Image
                      src={profileImage}
                      alt={t('altImages.profile', 'hero')}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 350px, (max-width: 1024px) 384px, 448px"
                      priority
                      loading="eager"
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Micro-CTA */}
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 lg:mt-14 px-2 sm:px-3 lg:px-0">
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap justify-center px-0 py-0 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 sm:rounded-full sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
              <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium">{t('microCTA.response', 'hero')}</span>
              <span className="text-gray-600 hidden xs:inline">•</span>
              <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 xs:ml-0 ml-1" />
              <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium">{t('microCTA.quote', 'hero')}</span>
              <span className="text-gray-600 hidden xs:inline">•</span>
              <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 xs:ml-0 ml-1" />
              <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium">{t('microCTA.support', 'hero')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de réservation */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
      />
    </>
  );
});

export default HeroSection;