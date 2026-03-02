'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Star, Quote, Building2, Users, Sparkles, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, MapPin, Award } from 'lucide-react';
import Image from 'next/image';
import clientImage from '../../assets/images/profile2.jpeg';
import chimeneImage from '../../assets/images/profile4.png';
import cesarImage from '../../assets/images/profile5.jpg';

const SocialProof = memo(function SocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationRef = useRef<number>();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeRef = useRef(Date.now());
  const animationFrameRef = useRef<number>();

  // Détection hydratation
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

  // Témoignages
  const testimonials = [
    {
      name: 'Ninsemouh Gbeo',
      content: 'Mon site commence à porter ses fruits. Merci pour cet accompagnement.',
      rating: 5,
      image: clientImage,
      isRealImage: true,
      country: 'Côte d\'Ivoire',
      flag: '🇨🇮'
    },
    {
      name: 'Marie Abani',
      content: 'Enfin un site à mon image. Vivant, moderne, efficace.',
      rating: 5,
      initials: 'MA',
      gradient: 'from-blue-500 to-cyan-500',
      country: 'France',
      flag: '🇫🇷'
    },
    {
      name: 'César Dossou',
      content: 'Service impeccable, résultat au rendez-vous. Je recommande.',
      rating: 5,
      image: cesarImage,
      isRealImage: true,
      country: 'Congo',
      flag: '🇨🇬'
    },
    {
      name: 'Maurice Acoumba',
      content: 'Un vrai partenaire à l\'écoute. Je suis satisfait du travail accompli.',
      rating: 5,
      initials: 'MA',
      gradient: 'from-emerald-500 to-teal-500',
      country: 'Cameroun',
      flag: '🇨🇲'
    },
    {
      name: 'Jean Edikou',
      content: 'Site soigné, équipe attentive. Une belle collaboration.',
      rating: 5,
      initials: 'JE',
      gradient: 'from-amber-500 to-orange-500',
      country: 'Bénin',
      flag: '🇧🇯'
    },
    {
      name: 'Chimène Koumai',
      content: 'Rapide, professionnel, à l\'écoute. Merci pour tout.',
      rating: 5,
      image: chimeneImage,
      isRealImage: true,
      country: 'Togo',
      flag: '🇹🇬'
    },
    {
      name: 'Gérard Agatou\'n',
      content: 'Les yeux fermés. Une expérience de travail agréable et efficace.',
      rating: 5,
      initials: 'GA',
      gradient: 'from-green-500 to-emerald-500',
      country: 'Sénégal',
      flag: '🇸🇳'
    },
    {
      name: 'Camille Benerd',
      content: 'Un site qui me ressemble enfin. Merci pour votre patience et votre écoute.',
      rating: 5,
      initials: 'CB',
      gradient: 'from-indigo-500 to-purple-500',
      country: 'Belgique',
      flag: '🇧🇪'
    }
  ];

  // Types de projets
  const projectTypes = [
    {
      icon: Building2,
      title: 'Startups & Scale-ups',
      description: 'Développement de MVPs et solutions évolutives',
      cta: 'Discuter de startup',
      message: 'Discuter de mon projet startup'
    },
    {
      icon: Users,
      title: 'PME & Grands Comptes',
      description: 'Accompagnement sur mesure pour votre transformation digitale',
      cta: 'Discuter de mon projet',
      message: 'Discuter de mon projet d\'entreprise'
    }
  ];

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#contact');
    }
  }, []);

  // Fonction de défilement continu
  const continuousScroll = useCallback(() => {
    if (scrollRef.current && isAutoScrolling) {
      const { current } = scrollRef;
      const maxScroll = current.scrollWidth - current.clientWidth;
      
      const speed = isDesktop ? 0.6 : 1.2;
      
      let newScrollLeft = current.scrollLeft + speed;
      if (newScrollLeft >= maxScroll) {
        newScrollLeft = 0;
      }
      
      current.scrollLeft = newScrollLeft;
      
      animationRef.current = requestAnimationFrame(continuousScroll);
    }
  }, [isAutoScrolling, isDesktop]);

  useEffect(() => {
    if (isAutoScrolling) {
      animationRef.current = requestAnimationFrame(continuousScroll);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoScrolling, continuousScroll]);

  // Animation des cartes (montée/descente) - OPTIMISÉE
  useEffect(() => {
    if (!isDesktop) return;

    const updateCardPositions = () => {
      timeRef.current = Date.now() / 1000;
      
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const containerRect = containerRef.current?.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          
          if (containerRect) {
            const containerCenter = containerRect.left + containerRect.width / 2;
            const cardCenter = cardRect.left + cardRect.width / 2;
            
            const distance = (cardCenter - containerCenter) / (containerRect.width / 2);
            const proximity = Math.max(0, 1 - Math.abs(distance));
            
            const phase = index * 2;
            const baseAmplitude = 25;
            const amplitude = proximity * baseAmplitude;
            const verticalMovement = amplitude * Math.sin(timeRef.current * 3 + phase);
            const centerBoost = proximity > 0.7 ? (proximity - 0.7) * 40 : 0;
            const finalY = verticalMovement + centerBoost;
            const scale = 1 + (proximity * 0.05);
            
            // Appliquer la transformation directement (pas de React state)
            card.style.transform = `translateY(${finalY}px) scale(${scale})`;
          }
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(updateCardPositions);
    };

    animationFrameRef.current = requestAnimationFrame(updateCardPositions);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDesktop]);

  // Vérification des boutons de défilement
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

  // Arrêt du défilement
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

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  // Duplication pour effet infini
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section 
      className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
      aria-label="Témoignages clients"
    >
      {/* FOND OPTIMISÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 60px)`
        }} />
        
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl will-change-transform" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl will-change-transform" />
        
        {lightPoints.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: point.left,
              top: point.top,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-12 md:mb-16">
          {isMounted && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
              <Award size={14} className="text-blue-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">
                La joie de mes clients, ma fierté
              </span>
            </div>
          )}
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
            Leur satisfaction
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1">
              parle pour moi
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Chaque projet est une rencontre, chaque retour une preuve de confiance.
          </p>
        </div>

        {/* Carrousel */}
        <div 
          ref={containerRef}
          className="relative max-w-7xl mx-auto mb-16 md:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flèches de navigation */}
          {isDesktop && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200 disabled:opacity-0"
                style={{ opacity: showLeftArrow ? 1 : 0 }}
                aria-label="Témoignages précédents"
                disabled={!showLeftArrow}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <button
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200 disabled:opacity-0"
                style={{ opacity: showRightArrow ? 1 : 0 }}
                aria-label="Témoignages suivants"
                disabled={!showRightArrow}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </>
          )}

          {/* Indicateur de défilement */}
          {isDesktop && (
            <div className="absolute -top-8 right-0 text-xs font-medium flex items-center gap-2 bg-[#141B2B]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#1F2937]">
              <span className={isAutoScrolling ? "text-blue-400" : "text-gray-400"}>
                {isAutoScrolling ? "Défilement automatique" : "Défilement arrêté"}
              </span>
              <div className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`} />
            </div>
          )}

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
            {duplicatedTestimonials.map((testimonial, index) => {
              const setCardRef = (el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              };

              return (
                <div
                  key={`${testimonial.name}-${index}`}
                  ref={setCardRef}
                  className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-[#141B2B] rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#1F2937] shadow-md hover:shadow-2xl transition-all duration-200 group relative flex-shrink-0 will-change-transform"
                  style={isDesktop ? { willChange: 'transform' } : {}}
                >
                  <div className="relative z-10">
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-500/20 mb-2 md:mb-3" aria-hidden="true" />
                    
                    <div className="flex mb-2 md:mb-3" aria-label={`Note: ${testimonial.rating} étoiles`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="fill-blue-400 text-blue-400" size={14} aria-hidden="true" />
                      ))}
                    </div>
                    
                    <p className="text-gray-300 mb-3 md:mb-4 italic text-xs sm:text-sm md:text-base">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-3 border-t border-[#1F2937]">
                      {testimonial.isRealImage ? (
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#1F2937] shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all flex-shrink-0">
                          <Image
                            src={testimonial.image}
                            alt={`Photo de ${testimonial.name}`}
                            fill
                            className="object-cover"
                            sizes="48px"
                            quality={75}
                          />
                        </div>
                      ) : (
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs md:text-sm font-bold border-2 border-[#1F2937] shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all flex-shrink-0">
                          {testimonial.initials}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm md:text-base truncate">
                          {testimonial.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                          <MapPin size={10} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                          <span className="truncate">{testimonial.flag} {testimonial.country}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Types de projets */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-white">
            Un accompagnement sur mesure
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {projectTypes.map((type, index) => (
              <div
                key={type.title}
                className="group bg-[#141B2B] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#1F2937] shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    <type.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-400" aria-hidden="true" />
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
                    aria-label={type.cta}
                  >
                    <span className="text-blue-400 font-medium text-sm sm:text-base md:text-lg group-hover/btn:translate-x-1 transition-transform duration-200">
                      {type.cta}
                    </span>
                    <div className="bg-blue-500/10 p-2 rounded-full group-hover/btn:bg-blue-500/20 transition-colors duration-200">
                      <ArrowRight size={16} className="text-blue-400 group-hover/btn:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
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