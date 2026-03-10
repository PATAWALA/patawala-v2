'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Globe, Smartphone, Star } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../assets/images/horo1.png';
import profile2Image from '../../assets/images/profile2.webp';
import profile4Image from '../../assets/images/profile4.webp';
import { useLanguage } from '@/app/context/LanguageContext';

const HeroSection = memo(function HeroSection() {
  const { t, language } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const typedStrings = t('typed.strings', 'hero') || [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // TYPING EFFECT
  useEffect(() => {
    if (!isMounted || typedStrings.length === 0) return;

    const currentString = typedStrings[stringIndex] || '';
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex - 1);
          setDisplayText(currentString.substring(0, charIndex - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setStringIndex((stringIndex + 1) % typedStrings.length);
      }
    } else {
      if (charIndex < currentString.length) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex + 1);
          setDisplayText(currentString.substring(0, charIndex + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      }
    }

    return () => clearTimeout(timeout);
  }, [isMounted, charIndex, isDeleting, stringIndex, typedStrings]);

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToProjets = useCallback(() => {
    const projetsSection = document.getElementById('projets');
    if (projetsSection) {
      projetsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // AVATARS
  const avatarImages = [
    { src: profile2Image, alt: t('altImages.avatar', 'hero') || 'Client' },
    { src: profile4Image, alt: t('altImages.avatar', 'hero') || 'Client' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-24 lg:pt-10 xl:pt-12 font-sans"
      aria-label={language === 'fr' ? "Section d'accueil" : "Hero section"}
    >
      {/* FOND GRADIENT */}
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

      <div className="container mx-auto px-4 sm:px-4 md:px-6 relative z-10 py-8 sm:py-6 md:py-8 lg:py-12">
        {/* Badge principal - CACHÉ SUR MOBILE */}
        <div className="w-full hidden md:flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-5 py-2.5 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <Sparkles size={16} className="text-blue-400" aria-hidden="true" />
            <span className="text-sm md:text-sm font-semibold whitespace-nowrap">
              {t('badge', 'hero')}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* TEXTE À GAUCHE */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-5 md:mb-5 leading-tight px-1 sm:px-2 text-white">
              <span>
                {t('title', 'hero')}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-3 md:mt-2 font-black min-h-[4rem] sm:min-h-[4rem]">
                {/* Version mobile : phrase fixe - PLUS GRANDE */}
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-400 sm:hidden">
                  {t('mobilePhrase', 'hero')}
                </span>
                {/* Version desktop : effet machine à écrire */}
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-400 hidden sm:inline">
                  {displayText || typedStrings[0]}
                  <span className="animate-pulse">|</span>
                </span>
              </span>
            </h1>

            <div className="space-y-3 md:space-y-3 mb-4 md:mb-4 px-2 sm:px-3 md:px-4 lg:px-0">
              <p className="text-lg md:text-lg lg:text-xl text-white font-bold leading-relaxed">
                {t('subtitle', 'hero')}
              </p>
            </div>

            {/* AVATARS + SOCIAL PROOF - HYPER COMPACTÉS */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-1 md:gap-1 mb-8 md:mb-8 px-2 sm:px-3 lg:px-0">
              <div className="flex items-center -space-x-5 sm:-space-x-6">
                {avatarImages.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative w-8 h-8 sm:w-7 sm:h-7 rounded-full border-2 border-[#1F2937] overflow-hidden bg-[#141B2B] shadow-lg"
                    style={{ zIndex: 2 - index }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      className="object-cover scale-150"
                      sizes="32px"
                      loading="lazy"
                      placeholder="blur"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0" aria-label="Note 5 étoiles">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-orange-400 text-orange-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-xs md:text-base font-bold text-white">30+</span>
                  <span className="text-[10px] md:text-sm text-gray-400 whitespace-nowrap">
                    {t('socialProof.entrepreneurs', 'hero')}
                  </span>
                </div>
              </div>
            </div>

            {/* BOUTONS - PLUS GRANDS, PLUS ESPACÉS SUR MOBILE */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-4 justify-center lg:justify-start px-4 sm:px-3 lg:px-0">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 md:px-7 lg:px-8 py-4 md:py-3.5 rounded-xl font-bold text-lg md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-auto min-h-[56px]"
                aria-label={t('buttons.project', 'hero')}
              >
                <span>
                  {t('buttons.project', 'hero')}
                </span>
                <ArrowRight size={20} className="sm:w-4 sm:h-4" aria-hidden="true" />
              </button>

              <button
                onClick={scrollToProjets}
                className="bg-transparent text-white px-6 md:px-7 lg:px-8 py-4 md:py-3.5 rounded-xl font-semibold text-lg md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 w-auto min-h-[56px]"
                aria-label={t('buttons.portfolio', 'hero')}
              >
                <span>
                  {t('buttons.portfolio', 'hero')}
                </span>
              </button>
            </div>
          </div>

          {/* IMAGE PRINCIPALE - TOUJOURS SANS BADGES */}
          <div className="flex-1 flex justify-center relative order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[400px] md:max-w-sm lg:max-w-md">
              
              {/* CERCLES DÉCORATIFS */}
              <div className="absolute -inset-6 rounded-full border-2 border-blue-500/30" aria-hidden="true" />
              <div className="absolute -inset-10 rounded-full border border-cyan-500/20" aria-hidden="true" />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-md" aria-hidden="true" />
              
              {/* AUCUN BADGE SUR L'IMAGE - JAMAIS */}
              
              {/* Photo principale */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#1F2937] bg-[#141B2B]">
                <div className="aspect-square relative">
                  <Image
                    src={profileImage}
                    alt={t('altImages.profile', 'hero') || "Abdoulaye Patawala"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 400px, 384px"
                    priority
                    fetchPriority="high"
                    loading="eager"
                    quality={90}
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;