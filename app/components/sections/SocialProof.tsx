'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Star, Quote, Building2, Users, ChevronLeft, ChevronRight, ArrowRight, MapPin, Award } from 'lucide-react';
import { useTranslation } from '@/app/hooks/useTranslation';

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

// Données par défaut pour les témoignages
const DEFAULT_TESTIMONIALS_FR = [
  {
    name: "Jean Kouassi",
    content: "Abdoulaye a su comprendre rapidement nos besoins et nous a proposé une solution technique parfaitement adaptée à notre startup. Son accompagnement a été crucial dans notre développement.",
    country: "Côte d'Ivoire"
  },
  {
    name: "Marie Dubois",
    content: "Un vrai partenaire technique ! Il ne se contente pas de développer, il apporte des idées et des conseils qui font la différence. Je recommande vivement.",
    country: "France"
  }
];

const DEFAULT_TESTIMONIALS_EN = [
  {
    name: "John Smith",
    content: "Abdoulaye quickly understood our needs and proposed a technical solution perfectly adapted to our startup. His support was crucial in our development.",
    country: "USA"
  },
  {
    name: "Sarah Johnson",
    content: "A true technical partner! He doesn't just develop, he brings ideas and advice that make a difference. I highly recommend.",
    country: "UK"
  }
];

const SocialProof = memo(function SocialProof() {
  const { t, language, isLoading } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const animationRef = useRef<number>();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Attendre que les traductions soient chargées
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  // Charger les témoignages
  useEffect(() => {
    if (!isReady) return;

    try {
      // Récupérer les témoignages avec typage explicite
      const testimonialsData = t('testimonials', 'testimonials');
      
      let testimonialsArray = [];
      
      if (Array.isArray(testimonialsData) && testimonialsData.length > 0) {
        testimonialsArray = testimonialsData;
      } else {
        // Fallback par langue
        testimonialsArray = language === 'fr' ? DEFAULT_TESTIMONIALS_FR : DEFAULT_TESTIMONIALS_EN;
      }

      const enrichedTestimonials = testimonialsArray.map((testimonial: any, index: number) => {
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
        
        const name = testimonial.name || '';
        const nameParts = name.split(' ');
        const initials = nameParts.length > 1 
          ? (nameParts[0][0] + nameParts[nameParts.length-1][0]).toUpperCase()
          : name.substring(0, 2).toUpperCase();
        
        const flags: {[key: string]: string} = {
          "Côte d'Ivoire": '🇨🇮',
          'France': '🇫🇷',
          'Congo': '🇨🇬',
          'Cameroun': '🇨🇲',
          'Bénin': '🇧🇯',
          'Togo': '🇹🇬',
          'Sénégal': '🇸🇳',
          'Belgique': '🇧🇪',
          'USA': '🇺🇸',
          'UK': '🇬🇧'
        };

        return {
          name: testimonial.name || '',
          content: testimonial.content || '',
          country: testimonial.country || '',
          rating: 5,
          initials,
          gradient: gradients[index % gradients.length],
          flag: flags[testimonial.country] || '🌍'
        };
      });
      
      setTestimonials(enrichedTestimonials);
    } catch (error) {
      console.error('Erreur chargement témoignages:', error);
      // Fallback en cas d'erreur
      const fallback = language === 'fr' ? DEFAULT_TESTIMONIALS_FR : DEFAULT_TESTIMONIALS_EN;
      const enriched = fallback.map((t, i) => ({
        ...t,
        rating: 5,
        initials: t.name.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase(),
        gradient: ['from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500'][i % 2],
        flag: i === 0 ? '🇨🇮' : '🇫🇷'
      }));
      setTestimonials(enriched);
    }
  }, [t, language, isReady]);

  // Types de projets avec fallback
  const projectTypes: ProjectType[] = [
    {
      icon: Building2,
      title: t('projectTypes.startup.title', 'testimonials') || (language === 'fr' ? 'Startups & Scale-ups' : 'Startups & Scale-ups'),
      description: t('projectTypes.startup.description', 'testimonials') || (language === 'fr' ? 'Développement de MVPs et solutions évolutives' : 'MVP development and scalable solutions'),
      cta: t('projectTypes.startup.cta', 'testimonials') || (language === 'fr' ? 'Discuter de startup' : 'Discuss startup')
    },
    {
      icon: Users,
      title: t('projectTypes.sme.title', 'testimonials') || (language === 'fr' ? 'PME & Grands Comptes' : 'SME & Large Companies'),
      description: t('projectTypes.sme.description', 'testimonials') || (language === 'fr' ? 'Accompagnement sur mesure pour votre transformation digitale' : 'Tailored support for your digital transformation'),
      cta: t('projectTypes.sme.cta', 'testimonials') || (language === 'fr' ? 'Discuter de mon projet' : 'Discuss my project')
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
    if (testimonials.length === 0 || !scrollRef.current || !isReady) return;
    
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
  }, [testimonials.length, isReady]);

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

  // SKELETON LOADER
  if (isLoading || !isReady || testimonials.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* En-tête skeleton */}
          <div className="text-center mb-12 md:mb-16">
            <div className="w-48 h-8 bg-gray-800/50 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-10 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-gray-800/50 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Carrousel skeleton */}
          <div className="flex gap-4 md:gap-6 justify-center mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-[#141B2B]/50 rounded-xl p-5 border border-gray-800/50">
                <div className="w-8 h-8 bg-gray-800/50 rounded-full mb-3 animate-pulse" />
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="w-3 h-3 bg-gray-800/50 rounded-full animate-pulse" />
                  ))}
                </div>
                <div className="w-full h-16 bg-gray-800/50 rounded-lg mb-4 animate-pulse" />
                <div className="flex items-center gap-3 pt-3 border-t border-gray-800/50">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="w-24 h-4 bg-gray-800/50 rounded mb-2 animate-pulse" />
                    <div className="w-16 h-3 bg-gray-800/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Projets skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="w-64 h-8 bg-gray-800/50 rounded-lg mx-auto mb-8 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[1, 2].map((i) => (
                <div key={i} className="bg-[#141B2B]/50 rounded-xl p-5 border border-gray-800/50">
                  <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg animate-pulse" />
                    <div className="flex-1">
                      <div className="w-32 h-5 bg-gray-800/50 rounded mb-2 animate-pulse" />
                      <div className="w-full h-4 bg-gray-800/50 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="w-full h-8 bg-gray-800/50 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                    <div className="bg-blue-500/10 p-2 rounded-full transition-colors duration-200 group-hover:bg-blue-500/20">
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