'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Globe, Smartphone, Star } from 'lucide-react';
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
import Typed from 'typed.js';

const HeroSection = memo(function HeroSection() {
  const { t, language } = useTranslation();
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (typedInstanceRef.current) typedInstanceRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (!typedRef.current || !isMounted) return;
    const strings = t('typed.strings', 'hero');
    const stringsArray = Array.isArray(strings) ? strings : [];
    if (stringsArray.length === 0) return;
    if (typedInstanceRef.current) typedInstanceRef.current.destroy();
    typedInstanceRef.current = new Typed(typedRef.current, {
      strings: stringsArray,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1200,
      startDelay: 300,
      loop: true,
      loopCount: Infinity,
      smartBackspace: true,
      cursorChar: '|'
    });
    return () => {
      if (typedInstanceRef.current) typedInstanceRef.current.destroy();
    };
  }, [isMounted, language, t]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  }, []);

  const handleLancerProjet = useCallback(() => setIsBookingOpen(true), []);
  const handleVoirRealisations = useCallback(() => scrollToSection('projets'), [scrollToSection]);
  const handleCloseBooking = useCallback(() => setIsBookingOpen(false), []);

  // Points lumineux (10 points comme dans About)
  const lightPoints = useRef(
    [...Array(10)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  const avatarImages = [
    { src: profile2Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile5Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile4Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile6Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile7Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile8Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
  ];

  return (
    <>
      <section 
        id="hero" 
        className="min-h-screen relative overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-24 lg:pt-10 xl:pt-12"
        aria-label={language === 'fr' ? "Section d'accueil" : "Hero section"}
        aria-labelledby="hero-title"
      >
        {/* FOND OPTIMISÉ */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35] will-change-transform">
          <div className="absolute inset-0 opacity-30 sm:opacity-40" style={{
            backgroundImage: `repeating-linear-gradient(90deg, 
              rgba(59,130,246,0.03) 0px, 
              rgba(59,130,246,0.03) 1px, 
              transparent 1px, 
              transparent 50px)`
          }} />
          <div className="absolute inset-0 opacity-30 sm:opacity-40" style={{
            backgroundImage: `repeating-linear-gradient(0deg, 
              rgba(6,182,212,0.03) 0px, 
              rgba(6,182,212,0.03) 1px, 
              transparent 1px, 
              transparent 50px)`
          }} />
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-500/10 sm:bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 sm:bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-4 md:px-6 relative z-10 py-4 sm:py-6 md:py-8 lg:py-12">
          
          {/* Badge principal - CACHÉ SUR MOBILE, VISIBLE SUR DESKTOP */}
          <div className="w-full hidden sm:flex justify-center mb-4 sm:mb-2 lg:mb-8 xl:mb-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{t('badge', 'hero')}</span>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
            
            {/* Texte - partie gauche */}
            <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
              <h1 id="hero-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-5 leading-tight px-1 sm:px-2 text-white">
                {t('title', 'hero')}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 sm:mt-2 font-black">
                  <span 
                    ref={typedRef} 
                    className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
                    aria-label={language === 'fr' ? "Texte animé" : "Animated text"}
                  />
                </span>
              </h1>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-3 md:px-4 lg:px-0">
                <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-white font-bold leading-relaxed">
                  {t('subtitle', 'hero')}
                </p>
              </div>

              {/* CERCLE D'AVATARS - ENCORE PLUS COMPACT */}
              <div className="flex flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-4 mb-5 sm:mb-7 md:mb-8 px-2 sm:px-3 lg:px-0">
                <div className="flex items-center -space-x-4 sm:-space-x-5 md:-space-x-6">
                  {avatarImages.map((avatar, index) => (
                    <div 
                      key={index}
                      className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-[#1F2937] overflow-hidden bg-[#141B2B] shadow-lg transform-gpu"
                      style={{ zIndex: 10 - index }}
                    >
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 32px, (max-width: 768px) 36px, 40px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-0.5" aria-label="Note 5 étoiles">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className="sm:w-4 sm:h-4 md:w-5 md:h-5 fill-orange-400 text-orange-400" 
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-white">30+</span>
                    <span className="text-xs sm:text-sm md:text-base text-gray-400 whitespace-nowrap">
                      {t('socialProof.entrepreneurs', 'hero')}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOUTONS - avec flèche sur le premier */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-3 lg:px-0">
                <button
                  onClick={handleLancerProjet}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 sm:px-6 md:px-7 lg:px-8 sm:py-3 md:py-3.5 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-auto min-h-[44px] sm:min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
                  aria-label={t('buttons.project', 'hero')}
                >
                  {t('buttons.project', 'hero')}
                  <ArrowRight size={16} className="sm:w-4 sm:h-4" aria-hidden="true" />
                </button>
                
                <button
                  onClick={handleVoirRealisations}
                  className="bg-transparent text-white px-5 py-3 sm:px-6 md:px-7 lg:px-8 sm:py-3 md:py-3.5 rounded-xl font-semibold text-sm sm:text-base md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 w-auto min-h-[44px] sm:min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
                  aria-label={t('buttons.portfolio', 'hero')}
                >
                  {t('buttons.portfolio', 'hero')}
                </button>
              </div>
            </div>

            {/* Photo de profil principale - AGRANDIE COMME DANS ABOUT */}
            <div className="flex-1 flex justify-center relative order-1 lg:order-2 w-full">
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md">
                
                {/* Cercles décoratifs (copiés de About) */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl -z-10 scale-125 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-6 border-2 border-cyan-400/10 rounded-full -z-10 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl -z-10 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl -z-20 will-change-transform" aria-hidden="true" />
                
                {/* Points lumineux (10 points) */}
                {lightPoints.map((point, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-blue-400/40 rounded-full shadow-lg shadow-blue-400/30"
                    style={{
                      left: point.left,
                      top: point.top,
                      opacity: 0.4,
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* Badge en haut à droite */}
                <div className="absolute top-0 right-0 z-30" style={{ transform: 'translate(5%, -5%)' }}>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 border border-[#1F2937]">
                    <Globe size={7} className="xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" aria-hidden="true" />
                    <Smartphone size={7} className="xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" aria-hidden="true" />
                    <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-semibold whitespace-nowrap">{t('badges.multisupport', 'hero')}</span>
                  </div>
                </div>

                {/* Badge en bas à gauche */}
                <div className="absolute bottom-0 left-0 z-30" style={{ transform: 'translate(-5%, 5%)' }}>
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 border border-[#1F2937]">
                    <div className="w-1 h-1 xs:w-1 xs:h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                    <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-semibold whitespace-nowrap">{t('badges.available', 'hero')}</span>
                  </div>
                </div>

                {/* Photo */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-3 md:border-4 border-[#1F2937] bg-[#141B2B] transform-gpu">
                  <div className="aspect-square relative">
                    <Image
                      src={profileImage}
                      alt={t('altImages.profile', 'hero') || "Abdoulaye Patawala - Développeur Full Stack"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 350px, (max-width: 1024px) 384px, 448px"
                      priority
                      loading="eager"
                      quality={80}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
      />
    </>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;