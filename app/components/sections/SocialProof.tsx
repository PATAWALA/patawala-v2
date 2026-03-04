'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Star, Quote, Building2, Users, ChevronLeft, ChevronRight, ArrowRight, MapPin, Award } from 'lucide-react';
import Image from 'next/image';
import clientImage from '../../assets/images/profile2.jpeg';
import chimeneImage from '../../assets/images/profile4.png';
import cesarImage from '../../assets/images/profile5.png';
import { useTranslation } from '@/app/hooks/useTranslation';

interface Testimonial {
  name: string;
  content: string;
  country: string;
  rating?: number;
  image?: any;
  isRealImage?: boolean;
  initials?: string;
  gradient?: string;
  flag?: string;
}

interface ProjectType {
  icon: any;
  title: string;
  description: string;
  cta: string;
  message: string;
}

const SocialProof = memo(function SocialProof() {
  const { t, language } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationRef = useRef<number>();
  const floatAnimationRef = useRef<number>();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const startTimeRef = useRef(Date.now());
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Détection desktop/mobile
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Charger les témoignages
  useEffect(() => {
    try {
      const testimonialsData = t('testimonials', 'testimonials');
      if (Array.isArray(testimonialsData)) {
        const enrichedTestimonials = testimonialsData.map((testimonial: any) => {
          const baseTestimonial = { ...testimonial, rating: 5 };

          if (testimonial.name.includes('Ninsemouh')) {
            return { ...baseTestimonial, image: clientImage, isRealImage: true, flag: '🇨🇮' };
          } else if (testimonial.name.includes('Marie')) {
            return { ...baseTestimonial, initials: 'MA', gradient: 'from-blue-500 to-cyan-500', flag: '🇫🇷' };
          } else if (testimonial.name.includes('César')) {
            return { ...baseTestimonial, image: cesarImage, isRealImage: true, flag: '🇨🇬' };
          } else if (testimonial.name.includes('Maurice')) {
            return { ...baseTestimonial, initials: 'MA', gradient: 'from-emerald-500 to-teal-500', flag: '🇨🇲' };
          } else if (testimonial.name.includes('Jean')) {
            return { ...baseTestimonial, initials: 'JE', gradient: 'from-amber-500 to-orange-500', flag: '🇧🇯' };
          } else if (testimonial.name.includes('Chimène')) {
            return { ...baseTestimonial, image: chimeneImage, isRealImage: true, flag: '🇹🇬' };
          } else if (testimonial.name.includes('Gérard')) {
            return { ...baseTestimonial, initials: 'GA', gradient: 'from-green-500 to-emerald-500', flag: '🇸🇳' };
          } else if (testimonial.name.includes('Camille')) {
            return { ...baseTestimonial, initials: 'CB', gradient: 'from-indigo-500 to-purple-500', flag: '🇧🇪' };
          }
          return baseTestimonial;
        });
        setTestimonials(enrichedTestimonials);
      }
    } catch (error) {
      console.error('Erreur chargement témoignages:', error);
    }
  }, [t, language]);

  // Types de projets
  const projectTypes: ProjectType[] = [
    {
      icon: Building2,
      title: t('projectTypes.startup.title', 'testimonials'),
      description: t('projectTypes.startup.description', 'testimonials'),
      cta: t('projectTypes.startup.cta', 'testimonials'),
      message: t('projectTypes.startup.cta', 'testimonials')
    },
    {
      icon: Users,
      title: t('projectTypes.sme.title', 'testimonials'),
      description: t('projectTypes.sme.description', 'testimonials'),
      cta: t('projectTypes.sme.cta', 'testimonials'),
      message: t('projectTypes.sme.cta', 'testimonials')
    }
  ];

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Animation de défilement horizontal
  useEffect(() => {
    let rafId: number;
    
    const scroll = () => {
      if (scrollRef.current && isAutoScrolling) {
        const { current } = scrollRef;
        const maxScroll = current.scrollWidth - current.clientWidth;
        
        if (maxScroll > 0) {
          const speed = 0.5;
          let newScrollLeft = current.scrollLeft + speed;
          
          if (newScrollLeft >= maxScroll) {
            newScrollLeft = 0;
          }
          
          current.scrollLeft = newScrollLeft;
          
          setShowLeftArrow(newScrollLeft > 20);
          setShowRightArrow(newScrollLeft + current.clientWidth < current.scrollWidth - 20);
        }
      }
      
      rafId = requestAnimationFrame(scroll);
    };
    
    rafId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(rafId);
  }, [isAutoScrolling]);

  // Animation de flottement (UNIQUEMENT SUR DESKTOP)
  useEffect(() => {
    if (!isDesktop) return; // ← SEUL CHANGEMENT ICI
    
    let rafId: number;
    
    const float = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const cycleDuration = 6;
      const progress = (elapsed % cycleDuration) / cycleDuration;
      const angle = progress * Math.PI * 2;
      const amplitude = 12;
      
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const phase = index * 0.8;
          const moveY = Math.sin(angle + phase) * amplitude;
          card.style.transform = `translateY(${moveY}px) translateZ(0)`;
        }
      });
      
      rafId = requestAnimationFrame(float);
    };
    
    rafId = requestAnimationFrame(float);
    
    return () => {
      cancelAnimationFrame(rafId);
      cardRefs.current.forEach(card => {
        if (card) card.style.transform = '';
      });
    };
  }, [isDesktop]); // ← isDesktop dans les dépendances

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      setShowLeftArrow(current.scrollLeft > 20);
      setShowRightArrow(current.scrollLeft + current.clientWidth < current.scrollWidth - 20);
    }
  }, []);

  const handleScroll = useCallback(() => {
    checkScrollButtons();
  }, [checkScrollButtons]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cardWidth = 360;
      const gap = 24;
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  }, [checkScrollButtons]);

  const handleMouseEnter = useCallback(() => setIsAutoScrolling(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoScrolling(true), []);
  const handleTouchStart = useCallback(() => setIsAutoScrolling(false), []);
  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setIsAutoScrolling(true), 2000);
  }, []);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [checkScrollButtons]);

  const lightPoints = useRef(
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section 
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label={language === 'fr' ? "Témoignages clients" : "Client testimonials"}
    >
      {/* FOND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        
        {lightPoints.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12 md:mb-16">
          {isMounted && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
              <Award size={14} className="text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">
                {t('badge', 'testimonials')}
              </span>
            </div>
          )}
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
            {t('title', 'testimonials')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
              {t('titleHighlight', 'testimonials')}
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            {t('subtitle', 'testimonials')}
          </p>
        </div>

        {/* CARROUSEL */}
        <div 
          className="relative max-w-7xl mx-auto mb-16 md:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flèches */}
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200 disabled:opacity-0"
              style={{ opacity: showLeftArrow ? 1 : 0 }}
              aria-label={language === 'fr' ? "Témoignages précédents" : "Previous testimonials"}
              disabled={!showLeftArrow}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200 disabled:opacity-0"
              style={{ opacity: showRightArrow ? 1 : 0 }}
              aria-label={language === 'fr' ? "Témoignages suivants" : "Next testimonials"}
              disabled={!showRightArrow}
            >
              <ChevronRight size={20} />
            </button>
          </>

          {/* Indicateur */}
          <div className="absolute -top-8 right-0 text-xs font-medium flex items-center gap-2 bg-[#141B2B]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#1F2937] z-10">
            <span className={isAutoScrolling ? "text-blue-400" : "text-gray-400"}>
              {isAutoScrolling ? t('autoScroll.playing', 'testimonials') : t('autoScroll.paused', 'testimonials')}
            </span>
            <div className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`} />
          </div>

          {/* Conteneur des témoignages */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                ref={el => { cardRefs.current[index] = el; }}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-[#141B2B] rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#1F2937] shadow-md hover:shadow-2xl transition-all duration-300 group relative flex-shrink-0"
                style={{ willChange: 'transform' }}
              >
                <div className="relative z-10">
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-500/20 mb-2 md:mb-3" />
                  
                  <div className="flex mb-2 md:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-blue-400 text-blue-400" size={14} />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-3 md:mb-4 italic text-xs sm:text-sm md:text-base">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-3 border-t border-[#1F2937]">
                    {testimonial.isRealImage && testimonial.image ? (
                      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#1F2937] shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={`${language === 'fr' ? 'Photo de' : 'Photo of'} ${testimonial.name}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                          quality={75}
                        />
                      </div>
                    ) : (
                      <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${testimonial.gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-white text-xs md:text-sm font-bold border-2 border-[#1F2937] shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all flex-shrink-0`}>
                        {testimonial.initials || testimonial.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm md:text-base truncate">
                        {testimonial.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <MapPin size={10} className="text-blue-400 flex-shrink-0" />
                        <span className="truncate">{testimonial.flag || '🌍'} {testimonial.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Types de projets */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-white">
            {t('projectTypes.title', 'testimonials')}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {projectTypes.map((type, index) => (
              <div
                key={type.title}
                className="group bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#1F2937] shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    <type.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {type.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">
                      {type.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#1F2937]">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-between group/btn"
                  >
                    <span className="text-blue-400 font-medium text-sm sm:text-base md:text-lg group-hover/btn:translate-x-1 transition-transform duration-200">
                      {type.cta}
                    </span>
                    <div className="bg-blue-500/10 p-2 rounded-full group-hover/btn:bg-blue-500/20 transition-colors duration-200">
                      <ArrowRight size={16} className="text-blue-400 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

export default SocialProof;