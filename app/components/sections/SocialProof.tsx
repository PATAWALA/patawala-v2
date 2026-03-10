'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Star, Quote, Building2, Users, ChevronLeft, ChevronRight, ArrowRight, MapPin, Award } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

// Points lumineux fixes (déterministes)
const LIGHT_POINTS = [
  { left: '15%', top: '25%' },
  { left: '75%', top: '60%' },
  { left: '40%', top: '80%' },
  { left: '85%', top: '15%' },
];

interface Testimonial {
  name: string;
  content: string;
  country: string;
  rating?: number;
  initials: string;
  gradient: string;
  flag?: string;
}

interface ProjectType {
  icon: any;
  title: string;
  description: string;
  cta: string;
}

const SocialProof = memo(function SocialProof() {
  const { t, language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const animationRef = useRef<number>();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Charger les témoignages
  useEffect(() => {
    try {
      const testimonialsData = t('testimonials', 'testimonials');
      if (Array.isArray(testimonialsData)) {
        const enrichedTestimonials = testimonialsData.map((testimonial: any, index: number) => {
          const gradients = [
            'from-blue-500 to-cyan-500',
            'from-emerald-500 to-teal-500',
            'from-amber-500 to-orange-500',
            'from-green-500 to-emerald-500',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-500',
            'from-violet-500 to-purple-500',
            'from-red-500 to-pink-500'
          ];
          
          const nameParts = testimonial.name.split(' ');
          const initials = nameParts.map((part: string) => part[0]).join('').substring(0, 2).toUpperCase();
          
          const flags: {[key: string]: string} = {
            'Côte d\'Ivoire': '🇨🇮',
            'France': '🇫🇷',
            'Congo': '🇨🇬',
            'Cameroun': '🇨🇲',
            'Bénin': '🇧🇯',
            'Togo': '🇹🇬',
            'Sénégal': '🇸🇳',
            'Belgique': '🇧🇪'
          };

          return {
            ...testimonial,
            rating: 5,
            initials,
            gradient: gradients[index % gradients.length],
            flag: flags[testimonial.country] || '🌍'
          };
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
      title: t('projectTypes.startup.title', 'testimonials') || 'Startups & Scale-ups',
      description: t('projectTypes.startup.description', 'testimonials') || 'Développement de MVPs et solutions évolutives',
      cta: t('projectTypes.startup.cta', 'testimonials') || 'Discuter de startup'
    },
    {
      icon: Users,
      title: t('projectTypes.sme.title', 'testimonials') || 'PME & Grands Comptes',
      description: t('projectTypes.sme.description', 'testimonials') || 'Accompagnement sur mesure pour votre transformation digitale',
      cta: t('projectTypes.sme.cta', 'testimonials') || 'Discuter de mon projet'
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
    if (testimonials.length === 0 || !scrollRef.current || !isMounted) return;
    
    let rafId: number;
    let lastTimestamp = 0;
    const speed = 0.5;

    const scroll = (timestamp: number) => {
      if (!scrollRef.current) {
        rafId = requestAnimationFrame(scroll);
        return;
      }

      const { current } = scrollRef;
      const maxScroll = current.scrollWidth - current.clientWidth;

      if (maxScroll <= 0) {
        rafId = requestAnimationFrame(scroll);
        return;
      }

      let newScrollLeft = current.scrollLeft + speed;

      if (newScrollLeft >= maxScroll) {
        newScrollLeft = 0;
      }

      current.scrollLeft = newScrollLeft;

      if (timestamp - lastTimestamp > 200) {
        setShowLeftArrow(newScrollLeft > 20);
        setShowRightArrow(newScrollLeft + current.clientWidth < current.scrollWidth - 20);
        lastTimestamp = timestamp;
      }

      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [testimonials.length, isMounted]);

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      setShowLeftArrow(current.scrollLeft > 20);
      setShowRightArrow(current.scrollLeft + current.clientWidth < current.scrollWidth - 20);
    }
  }, []);

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

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons, { passive: true });
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [checkScrollButtons]);

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label={language === 'fr' ? "Témoignages clients" : "Client testimonials"}
    >
      {/* FOND AVEC POINTS FIXES */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

        {LIGHT_POINTS.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
            <Award size={14} className="text-blue-400" />
            <span className="text-xs sm:text-sm font-bold text-blue-400 tracking-tight">
              {t('badge', 'testimonials')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-white tracking-tight">
            <span>
              {t('title', 'testimonials')}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 font-black tracking-tight">
              {t('titleHighlight', 'testimonials')}
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4 font-medium">
            {t('subtitle', 'testimonials')}
          </p>
        </div>

        {/* Carrousel */}
        <div className="relative max-w-7xl mx-auto mb-16 md:mb-20">
          {/* Flèches */}
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
              style={{ opacity: showLeftArrow ? 1 : 0 }}
              aria-label={language === 'fr' ? "Témoignages précédents" : "Previous testimonials"}
              disabled={!showLeftArrow}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
              style={{ opacity: showRightArrow ? 1 : 0 }}
              aria-label={language === 'fr' ? "Témoignages suivants" : "Next testimonials"}
              disabled={!showRightArrow}
            >
              <ChevronRight size={20} />
            </button>
          </>

          {/* Conteneur des témoignages */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'auto'
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-[#141B2B] rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#1F2937] shadow-md hover:shadow-xl transition-shadow duration-300 relative flex-shrink-0 will-change-transform"
              >
                <div className="relative z-10">
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-500/20 mb-2 md:mb-3" />

                  <div className="flex mb-2 md:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-blue-400 text-blue-400" size={14} />
                    ))}
                  </div>

                  <p className="text-gray-200 mb-3 md:mb-4 italic text-xs sm:text-sm md:text-base font-medium line-clamp-3">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-3 border-t border-[#1F2937]">
                    <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs md:text-sm font-black border-2 border-[#1F2937] shadow-md flex-shrink-0 tracking-tight`}>
                      {testimonial.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-white text-xs sm:text-sm md:text-base tracking-tight truncate">
                        {testimonial.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5 font-medium">
                        <MapPin size={10} className="text-blue-400 flex-shrink-0" />
                        <span className="truncate">{testimonial.flag} {testimonial.country}</span>
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-8 md:mb-10 text-white tracking-tight">
            {t('projectTypes.title', 'testimonials')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {projectTypes.map((type) => (
              <div
                key={type.title}
                className="bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#1F2937] shadow-md hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <type.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight">
                      {type.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1 font-medium line-clamp-2">
                      {type.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1F2937]">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-between group"
                    aria-label={type.cta}
                  >
                    <span className="text-blue-400 font-semibold text-sm sm:text-base md:text-lg tracking-tight">
                      {type.cta}
                    </span>
                    <div className="bg-blue-500/10 p-2 rounded-full transition-colors duration-200">
                      <ArrowRight size={16} className="text-blue-400" />
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
});

SocialProof.displayName = 'SocialProof';

export default SocialProof;