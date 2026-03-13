'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../assets/images/horo1.png';
import profile2Image from '../../assets/images/profile2.webp';
import profile4Image from '../../assets/images/profile4.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

const HeroSection = memo(function HeroSection() {
  const { t, language, isLoading } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Réf pour éviter les doubles appels
  const timeoutRef = useRef<NodeJS.Timeout>();
  const pauseTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Récupération des chaînes
  const typedStrings = t('typed.strings', 'hero') || [];
  
  // Version de secours pour le chargement
  const fallbackStrings = language === 'fr' 
    ? ['votre succès digital.', 'un e-commerce sans limite.', "l'application de vos idées.", 'votre outil métier sur-mesure.', 'une expérience utilisateur unique.']
    : ['your digital success.', 'a high-performance e-commerce.', 'the app of your ideas.', 'your custom business tool.', 'a unique user experience.'];

  const stringsToUse = typedStrings.length > 0 ? typedStrings : fallbackStrings;

  // Attendre que les traductions soient chargées - UNE SEULE FOIS
  useEffect(() => {
    if (!isLoading && stringsToUse.length > 0 && !isReady) {
      setIsReady(true);
      // Initialiser avec la première phrase complète
      setDisplayText(stringsToUse[0]);
      setCharIndex(stringsToUse[0].length);
      setStringIndex(0);
      setIsDeleting(false);
      
      // Programmer le début de l'effacement après 4 secondes
      pauseTimeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, 4000);
    }
    
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isLoading, stringsToUse, isReady]);

  // TYPING EFFECT - CORRIGÉ
  useEffect(() => {
    if (!isReady || stringsToUse.length === 0) return;

    const currentString = stringsToUse[stringIndex];
    if (!currentString) return;

    // Nettoyer le timeout précédent
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isDeleting) {
        // PHASE D'EFFACEMENT - MÊME VITESSE QUE L'ÉCRITURE
        if (charIndex > 0) {
          // Effacer un caractère (lent)
          const newCharIndex = charIndex - 1;
          setCharIndex(newCharIndex);
          setDisplayText(currentString.substring(0, newCharIndex));
        } else {
          // Passer à la phrase suivante
          const nextIndex = (stringIndex + 1) % stringsToUse.length;
          setStringIndex(nextIndex);
          setIsDeleting(false);
          // Commencer la nouvelle phrase
          setCharIndex(1);
          setDisplayText(stringsToUse[nextIndex].charAt(0));
        }
      } else {
        // PHASE D'ÉCRITURE - LENTE
        if (charIndex < currentString.length) {
          // Ajouter un caractère (lent)
          const newCharIndex = charIndex + 1;
          setCharIndex(newCharIndex);
          setDisplayText(currentString.substring(0, newCharIndex));
        } else {
          // Pause de 4 secondes quand la phrase est finie
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, 2000);
        }
      }
    }, 180); // MÊME VITESSE POUR ÉCRITURE ET EFFACEMENT (180ms)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, stringIndex, stringsToUse, isReady]);

  // Nettoyage final
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToProjets = useCallback(() => {
    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const avatarImages = [
    { src: profile2Image, alt: t('altImages.avatar', 'hero') || 'Client' },
    { src: profile4Image, alt: t('altImages.avatar', 'hero') || 'Client' },
  ];

  // Afficher un skeleton si en chargement
  if (isLoading && !isReady) {
    return (
      <section className="min-h-screen relative overflow-hidden flex items-center pt-16 bg-[#0B1120]">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <div className="h-12 bg-gray-700 rounded w-3/4 mx-auto lg:mx-0"></div>
                <div className="h-12 bg-gray-700 rounded w-full"></div>
                <div className="h-24 bg-gray-700 rounded w-full"></div>
                <div className="h-16 bg-gray-700 rounded w-64"></div>
              </div>
              <div className="flex-1">
                <div className="w-full max-w-[400px] aspect-square bg-gray-700 rounded-2xl mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-24 lg:pt-10 xl:pt-12 font-sans"
      aria-label={language === 'fr' ? "Section d'accueil" : "Hero section"}
    >
      {/* FOND - IDENTIQUE */}
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
        {/* Badge principal */}
        <div className="w-full hidden md:flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-5 py-2.5 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <Sparkles size={16} className="text-blue-400" aria-hidden="true" />
            <span className="text-sm md:text-sm font-semibold whitespace-nowrap">
              {t('badge', 'hero')}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* TEXTE À GAUCHE */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1 w-full px-2 sm:px-3">
            {/* TITRE */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-white mb-1 md:mb-5">
              <span>
                {t('title', 'hero')}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 md:mt-2 font-black min-h-[3.5rem] sm:min-h-[4rem]">
                {/* Version mobile */}
                <span className="text-xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-400 sm:hidden">
                  {t('mobilePhrase', 'hero')}
                </span>
                {/* Version desktop */}
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-400 hidden sm:inline">
                  {displayText}
                  <span className="animate-pulse ml-1">|</span>
                </span>
              </span>
            </h1>

            {/* SUBTITLE */}
            <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 px-1 sm:px-2">
              <p className="text-sm md:text-lg lg:text-xl text-white font-bold leading-tight md:leading-relaxed">
                {t('subtitle', 'hero')}
              </p>
            </div>

            {/* AVATARS */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-1 md:gap-1 mb-5 md:mb-8">
              <div className="flex items-center -space-x-4 md:-space-x-6">
                {avatarImages.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative w-7 h-7 md:w-7 md:h-7 rounded-full border-2 border-[#1F2937] overflow-hidden bg-[#141B2B] shadow-lg"
                    style={{ zIndex: 2 - index }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      className="object-cover scale-150"
                      sizes="(max-width: 768px) 28px, 32px"
                      loading="lazy"
                      placeholder="blur"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="md:w-3 md:h-3 fill-orange-400 text-orange-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-xs md:text-base font-bold text-white">30+</span>
                  <span className="text-[9px] md:text-sm text-gray-400 whitespace-nowrap">
                    {t('socialProof.entrepreneurs', 'hero')}
                  </span>
                </div>
              </div>
            </div>

            {/* BOUTONS */}
            <div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start w-full">
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 md:px-7 lg:px-8 py-3 md:py-3.5 rounded-xl font-bold text-xs md:text-lg flex items-center justify-center gap-1 md:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 flex-1 md:flex-none whitespace-nowrap min-h-[44px] md:min-h-[56px] tracking-tight"
                aria-label={t('buttons.project', 'hero')}
              >
                <span className="text-white">{t('buttons.project', 'hero')}</span>
                <ArrowRight size={16} className="md:w-5 md:h-5 flex-shrink-0" aria-hidden="true" />
              </button>

              <button
                onClick={scrollToProjets}
                className="bg-transparent text-white px-3 md:px-7 lg:px-8 py-3 md:py-3.5 rounded-xl font-semibold text-xs md:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 flex-1 md:flex-none whitespace-nowrap min-h-[44px] md:min-h-[56px] tracking-tight"
                aria-label={t('buttons.portfolio', 'hero')}
              >
                <span className="text-white">{t('buttons.portfolio', 'hero')}</span>
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center relative order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-sm lg:max-w-md">
              <div className="absolute -inset-4 md:-inset-6 rounded-full border-2 border-blue-500/30" aria-hidden="true" />
              <div className="absolute -inset-6 md:-inset-10 rounded-full border border-cyan-500/20" aria-hidden="true" />
              <div className="absolute -inset-2 md:-inset-4 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-md" aria-hidden="true" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#1F2937] bg-[#141B2B]">
                <div className="aspect-square relative">
                  <Image
                    src={profileImage}
                    alt={t('altImages.profile', 'hero') || "Abdoulaye Patawala"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 360px) 280px, (max-width: 640px) 320px, 400px"
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
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;