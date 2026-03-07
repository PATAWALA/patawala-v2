'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Globe, Smartphone, Star } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../assets/images/horo1.png';
import profile2Image from '../../assets/images/profile2.webp';
import profile5Image from '../../assets/images/profile5.webp';
import profile6Image from '../../assets/images/profile6.webp';
import profile4Image from '../../assets/images/profile4.webp';
import profile7Image from '../../assets/images/profile7.webp';
import profile8Image from '../../assets/images/profile8.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

const HeroSection = memo(function HeroSection() {
  const { t, language } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const typedStrings = t('typed.strings', 'hero') || [
    'votre prochaine application mobile',
    'un e-commerce haute performance',
    'vos outils métier sur-mesure',
    'une expérience utilisateur unique',
    'votre succès technologique'
  ];

  // Détection rapide de l'écran
  useEffect(() => {
    setIsMounted(true);
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen, { passive: true });
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Effet de typing simplifié et très rapide
  useEffect(() => {
    if (!isMounted || typedStrings.length === 0) return;

    const currentString = typedStrings[stringIndex] || '';
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      // Mode suppression
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex - 1);
          setDisplayText(currentString.substring(0, charIndex - 1));
        }, 20); // Très rapide
      } else {
        setIsDeleting(false);
        setStringIndex((stringIndex + 1) % typedStrings.length);
      }
    } else {
      // Mode écriture
      if (charIndex < currentString.length) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex + 1);
          setDisplayText(currentString.substring(0, charIndex + 1));
        }, 30); // Rapide
      } else {
        // Pause avant de supprimer
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    }

    return () => clearTimeout(timeout);
  }, [isMounted, charIndex, isDeleting, stringIndex, typedStrings]);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', '/#contact');
    }
  }, []);

  const scrollToProjets = useCallback(() => {
    const projetsSection = document.getElementById('projets');
    if (projetsSection) {
      projetsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', '/#projets');
    }
  }, []);

  const avatarImages = [
    { src: profile2Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile5Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile4Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile6Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile7Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
    { src: profile8Image, alt: t('altImages.avatar', 'hero') || 'Client satisfait' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-24 lg:pt-10 xl:pt-12"
      aria-label={language === 'fr' ? "Section d'accueil" : "Hero section"}
      aria-labelledby="hero-title"
    >
      {/* FOND - S'AFFICHE INSTANTANÉMENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes répétitives */}
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
        
        {/* Cercles flous */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-4 sm:px-4 md:px-6 relative z-10 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Badge */}
        <div className="w-full hidden sm:flex justify-center mb-4 sm:mb-2 lg:mb-8 xl:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <Sparkles size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{t('badge', 'hero')}</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* Texte à gauche */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
            <h1 id="hero-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-5 leading-tight px-1 sm:px-2 text-white">
              {t('title', 'hero')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 sm:mt-2 font-black min-h-[3rem] sm:min-h-[4rem]">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-400">
                  {displayText || typedStrings[0]}
                  <span className="animate-pulse">|</span>
                </span>
              </span>
            </h1>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-3 md:px-4 lg:px-0">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-bold leading-relaxed">
                {t('subtitle', 'hero')}
              </p>
            </div>

            {/* Avatars + note */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-5 sm:mb-7 md:mb-8 px-2 sm:px-3 lg:px-0">
              <div className="flex items-center -space-x-3 sm:-space-x-4 md:-space-x-5">
                {avatarImages.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 border-[#1F2937] overflow-hidden bg-[#141B2B] shadow-lg"
                    style={{ zIndex: 10 - index }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 28px, (max-width: 768px) 32px, 36px"
                      loading="lazy"
                      placeholder="blur"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0.5" aria-label="Note 5 étoiles">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-orange-400 text-orange-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm md:text-base font-bold text-white">30+</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 whitespace-nowrap">
                    {t('socialProof.entrepreneurs', 'hero')}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 justify-center lg:justify-start px-4 sm:px-3 lg:px-0">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 sm:px-6 md:px-7 lg:px-8 sm:py-3 md:py-3.5 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-1.5 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-auto min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
                aria-label={t('buttons.project', 'hero')}
              >
                {t('buttons.project', 'hero')}
                <ArrowRight size={16} className="sm:w-4 sm:h-4" aria-hidden="true" />
              </button>

              <button
                onClick={scrollToProjets}
                className="bg-transparent text-white px-5 py-3 sm:px-6 md:px-7 lg:px-8 sm:py-3 md:py-3.5 rounded-xl font-semibold text-sm sm:text-base md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 w-auto min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
                aria-label={t('buttons.portfolio', 'hero')}
              >
                {t('buttons.portfolio', 'hero')}
              </button>
            </div>
          </div>

          {/* Image avec cadre décoratif */}
          <div className="flex-1 flex justify-center relative order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md">
              {/* Mobile : grille statique */}
              {!isDesktop && (
                <div
                  className="absolute -inset-10 -z-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Desktop : cercles */}
              {isDesktop && (
                <>
                  <div className="absolute -inset-6 rounded-full border-2 border-blue-500/40" aria-hidden="true" />
                  <div className="absolute -inset-10 rounded-full border border-cyan-500/30" aria-hidden="true" />
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-md" aria-hidden="true" />
                </>
              )}

              {/* Badge en haut à droite */}
              <div className="absolute top-0 right-0 z-30" style={{ transform: 'translate(5%, -5%)' }}>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 border border-[#1F2937]">
                  <Globe size={7} className="xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" aria-hidden="true" />
                  <Smartphone size={7} className="xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5" aria-hidden="true" />
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-semibold whitespace-nowrap">
                    {t('badges.multisupport', 'hero')}
                  </span>
                </div>
              </div>

              {/* Badge en bas à gauche */}
              <div className="absolute bottom-0 left-0 z-30" style={{ transform: 'translate(-5%, 5%)' }}>
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-1 border border-[#1F2937]">
                  <div className="w-1 h-1 xs:w-1 xs:h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-semibold whitespace-nowrap">
                    {t('badges.available', 'hero')}
                  </span>
                </div>
              </div>

              {/* Photo */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border-2 sm:border-3 md:border-4 border-[#1F2937] bg-[#141B2B]">
                <div className="aspect-square relative">
                  <Image
                    src={profileImage}
                    alt={t('altImages.profile', 'hero') || "Abdoulaye Patawala - Développeur Full Stack"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 350px, (max-width: 1024px) 384px, 448px"
                    priority
                    fetchPriority="high"
                    loading="eager"
                    quality={85}
                    placeholder="blur"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;