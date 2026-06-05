'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import profileImage from '../../assets/images/hero1.png';
import profile2Image from '../../assets/images/profile2.webp';
import profile4Image from '../../assets/images/profile4.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

const HeroSection = memo(function HeroSection() {
  const { t, tArray, language, isLoading } = useTranslation();
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const pauseTimeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const typedStrings = tArray('typed.strings', 'hero');
  
  const fallbackStrings = [
    "votre site internet haute performance.",
    "votre agent IA sur-mesure.",
    "votre tunnel de vente optimisé.",
    "vos automatisations intelligentes.",
    "votre application métier rentable.",
    "la stratégie digitale de votre business."
  ];

  const stringsToUse = typedStrings.length > 0 ? typedStrings : fallbackStrings;

  useEffect(() => {
    if (!isLoading && stringsToUse.length > 0 && !isReady) {
      setIsReady(true);
      setDisplayText(stringsToUse[0]);
      setCharIndex(stringsToUse[0].length);
      setStringIndex(0);
      setIsDeleting(false);
      
      pauseTimeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, 4000);
    }
    
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isLoading, stringsToUse, isReady]);

  useEffect(() => {
    if (!isReady || stringsToUse.length === 0) return;

    const currentString = stringsToUse[stringIndex];
    if (!currentString) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const typingSpeed = isMobile ? 120 : 80;

    timeoutRef.current = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          const newCharIndex = charIndex - 1;
          setCharIndex(newCharIndex);
          setDisplayText(currentString.substring(0, newCharIndex));
        } else {
          const nextIndex = (stringIndex + 1) % stringsToUse.length;
          setStringIndex(nextIndex);
          setIsDeleting(false);
          setCharIndex(1);
          setDisplayText(stringsToUse[nextIndex].charAt(0));
        }
      } else {
        if (charIndex < currentString.length) {
          const newCharIndex = charIndex + 1;
          setCharIndex(newCharIndex);
          setDisplayText(currentString.substring(0, newCharIndex));
        } else {
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, isMobile ? 1500 : 2000);
        }
      }
    }, typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, stringIndex, stringsToUse, isReady, isMobile]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToExpertise = useCallback(() => {
    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const avatarImages = [
    { src: profile2Image, alt: 'Client satisfait' },
    { src: profile4Image, alt: 'Client satisfait' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  } as const;

  if (isLoading && !isReady) {
    return (
      <section className="min-h-screen relative flex items-center bg-background">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-border rounded-full w-48 mx-auto mb-8"></div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <div className="h-12 bg-border rounded-lg w-3/4 mx-auto lg:mx-0"></div>
                <div className="h-12 bg-border rounded-lg w-full"></div>
                <div className="h-24 bg-border rounded-lg w-full"></div>
                <div className="h-16 bg-border rounded-lg w-64"></div>
              </div>
              <div className="flex-1">
                <div className="w-full max-w-[400px] aspect-square bg-border rounded-2xl mx-auto"></div>
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
      className="min-h-screen relative overflow-hidden flex items-center pt-16 sm:pt-20 md:pt-24 lg:pt-10 xl:pt-12"
      aria-label={language === 'fr' ? "Section d'accueil" : "Hero section"}
    >
      {/* FOND */}
      <div className="absolute inset-0 bg-background">
        <motion.div 
          className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true" 
        />
        <motion.div 
          className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" 
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          aria-hidden="true" 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-4 md:px-6 relative z-10 py-8 sm:py-6 md:py-8 lg:py-12">
        {/* Badge avec ombre */}
        <motion.div 
          className="w-full hidden md:flex justify-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-primary"
            style={{ 
              background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              boxShadow: '0 0 20px -5px rgba(212,175,55,0.2), inset 0 0 10px rgba(212,175,55,0.05)'
            }}
          >
            <Sparkles size={16} aria-hidden="true" />
            <span className="text-sm font-semibold whitespace-nowrap">
              {t('badge', 'hero')}
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* TEXTE À GAUCHE */}
          <motion.div 
            className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1 w-full px-2 sm:px-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* TITRE */}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-1 md:mb-5"
              variants={fadeInUp}
            >
              <span className="block text-foreground">
                {t('title', 'hero')}
              </span>
              <span className="block text-gradient-gold mt-1 md:mt-2 min-h-[1.2em]">
                {displayText}
                <span className="animate-pulse ml-1">|</span>
              </span>
            </motion.h1>

            {/* SUBTITLE */}
            <motion.div 
              className="space-y-2 md:space-y-3 mb-3 md:mb-4 px-1 sm:px-2"
              variants={fadeInUp}
            >
              <p className="text-sm md:text-lg lg:text-xl text-foreground/80 leading-tight md:leading-relaxed">
                {t('subtitle', 'hero')}
              </p>
            </motion.div>

            {/* AVATARS */}
            <motion.div 
              className="flex flex-row items-center justify-center lg:justify-start gap-1 md:gap-1 mb-5 md:mb-8"
              variants={fadeInUp}
            >
              <div className="flex items-center -space-x-4 md:-space-x-6">
                {avatarImages.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative w-7 h-7 md:w-7 md:h-7 rounded-full border-2 border-border overflow-hidden bg-surface shadow-lg"
                    style={{ zIndex: 2 - index }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      className="object-cover scale-150"
                      sizes="(max-width: 768px) 28px, 32px"
                      loading="lazy"
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
                      className="md:w-3 md:h-3 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-xs md:text-base font-bold text-foreground">30+</span>
                  <span className="text-[9px] md:text-sm text-muted whitespace-nowrap">
                    {t('socialProof.entrepreneurs', 'hero')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* BOUTONS */}
            <motion.div 
              className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start w-full"
              variants={fadeInUp}
            >
              <motion.button
                onClick={scrollToContact}
                className="btn-gold text-xs md:text-lg px-3 md:px-7 lg:px-8 py-3 md:py-3.5 flex-1 md:flex-none whitespace-nowrap min-h-[44px] md:min-h-[56px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t('buttons.project', 'hero')}
              >
                <span>{t('buttons.project', 'hero')}</span>
                <ArrowRight size={16} className="md:w-5 md:h-5 flex-shrink-0 ml-2" aria-hidden="true" />
              </motion.button>

              <motion.button
                onClick={scrollToExpertise}
                className="btn-cyan-outline text-xs md:text-lg px-3 md:px-7 lg:px-8 py-3 md:py-3.5 flex-1 md:flex-none whitespace-nowrap min-h-[44px] md:min-h-[56px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-label={t('buttons.portfolio', 'hero')}
              >
                <span>{t('buttons.portfolio', 'hero')}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          <motion.div 
            className="flex-1 flex justify-center relative order-1 lg:order-2 w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-sm lg:max-w-md">
              {/* Cercles décoratifs OR */}
              <motion.div 
                className="absolute -inset-4 md:-inset-6 rounded-full"
                style={{ border: '2px solid rgba(212,175,55,0.3)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                aria-hidden="true" 
              />
              <motion.div 
                className="absolute -inset-6 md:-inset-10 rounded-full"
                style={{ border: '1px solid rgba(212,175,55,0.15)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                aria-hidden="true" 
              />
              <motion.div 
                className="absolute -inset-2 md:-inset-4 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true" 
              />
              
              {/* Image avec flottement */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden bg-surface"
                style={{ 
                  border: '2px solid rgba(30,42,62,0.5)',
                  boxShadow: '0 25px 50px -12px rgba(212, 175, 55, 0.2), 0 0 30px -5px rgba(212, 175, 55, 0.1)' 
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
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
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;