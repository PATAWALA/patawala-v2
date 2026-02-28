'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Star, Quote, Building2, Users, Sparkles, ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import clientImage from '../../assets/images/profile2.jpeg';
import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Ninsemouh Gbeo',
    content: 'Merci Patawala, mon site commence à donner des résultats !',
    rating: 5,
    image: clientImage,
    isRealImage: true
  },
  {
    name: 'Marie Abani',
    content: 'Excellent travail, mon site est vivant maintenant !',
    rating: 5,
    initials: 'MA',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'César Dossou',
    content: 'Service impeccable, résultats au rendez-vous.',
    rating: 5,
    initials: 'CD',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Maurice Acoumba',
    content: 'Un accompagnement hors pair, je recommande !',
    rating: 5,
    initials: 'SC',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    name: 'Jean Edikou',
    content: 'Site magnifique et équipe à l\'écoute. Parfait !',
    rating: 5,
    initials: 'JD',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Chimène Koumai',
    content: 'Travail rapide et professionnel, merci !',
    rating: 5,
    initials: 'JL',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    name: 'Gérard Agatou\'n',
    content: 'Je recommande les yeux fermés, super expérience.',
    rating: 5,
    initials: 'PL',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Camille Bayo',
    content: 'Enfin un site qui me ressemble, merci infiniment !',
    rating: 5,
    initials: 'CR',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

const projectTypes = [
  {
    icon: Building2,
    title: 'Startups & Scale-ups',
    description: 'Développement rapide de MVPs et solutions scalables',
    cta: 'Discuter de startup',
    message: 'Discuter de mon projet startup'
  },
  {
    icon: Users,
    title: 'PME & Grands Comptes',
    description: 'Solutions sur mesure pour transformation digitale',
    cta: 'Discuter de mon projet',
    message: 'Discuter de mon projet d\'entreprise'
  }
];

export default function SocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const animationRef = useRef<number>();
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  // Détection desktop/mobile
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Fonction de défilement continu
  const continuousScroll = () => {
    if (scrollRef.current && isAutoScrolling) {
      const { current } = scrollRef;
      const maxScroll = current.scrollWidth - current.clientWidth;
      
      let newScrollLeft = current.scrollLeft + 0.5;
      if (newScrollLeft >= maxScroll) {
        newScrollLeft = 0;
      }
      
      current.scrollLeft = newScrollLeft;
      setScrollPosition(newScrollLeft);
      
      animationRef.current = requestAnimationFrame(continuousScroll);
    }
  };

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
  }, [isAutoScrolling]);

  // Mettre à jour la position de scroll manuellement
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      checkScrollButtons();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cardWidth = 360;
      const gap = 24;
      const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      setTimeout(() => {
        checkScrollButtons();
        setScrollPosition(current.scrollLeft);
      }, 300);
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      setShowLeftArrow(current.scrollLeft > 20);
      setShowRightArrow(current.scrollLeft + current.clientWidth < current.scrollWidth - 20);
    }
  };

  // Arrêt du défilement au survol (desktop) et au toucher (mobile)
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  const handleTouchStart = () => {
    setIsAutoScrolling(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#contact');
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  // Calculer la position centrale
  const getCardPosition = (cardElement: HTMLDivElement | null) => {
    if (!cardElement || !containerRef.current || !scrollRef.current) return 0.5;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardRect = cardElement.getBoundingClientRect();
    
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cardCenter = cardRect.left + cardRect.width / 2;
    
    const distance = (cardCenter - containerCenter) / (containerRect.width / 2);
    const proximity = Math.max(0, 1 - Math.abs(distance));
    
    return proximity;
  };

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden">
      {/* BEAU FOND - avec dégradé et formes floues */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles */}
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
        
        {/* Éléments décoratifs flous */}
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-400">
              +11 projets livrés
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white"
          >
            La satisfaction de nos<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              clients en témoigne
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
          >
            Découvrez les retours d'expérience de ceux qui nous ont fait confiance
          </motion.p>
        </div>

        {/* Carrousel à défilement CONTINU */}
        <div 
          ref={containerRef}
          className="relative max-w-7xl mx-auto mb-16 md:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flèches de navigation */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showLeftArrow ? 1 : 0 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200"
            style={{ display: showLeftArrow ? 'flex' : 'none' }}
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showRightArrow ? 1 : 0 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#141B2B] rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl border border-[#1F2937] hover:border-blue-500 text-gray-300 hover:text-blue-400 transition-all duration-200"
            style={{ display: showRightArrow ? 'flex' : 'none' }}
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </motion.button>

          {/* Indicateur de défilement visible */}
          <motion.div 
            animate={{ opacity: isAutoScrolling ? 1 : 0.5 }}
            className="absolute -top-8 right-0 text-xs md:text-sm font-medium flex items-center gap-2 bg-[#141B2B]/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-[#1F2937]"
          >
            <span className={isAutoScrolling ? "text-blue-400" : "text-gray-400"}>
              {isAutoScrolling ? "▶ Défilement automatique" : "❚❚ Défilement arrêté"}
            </span>
            <div className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
          </motion.div>

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
              
              const proximity = getCardPosition(cardRefs.current[index]);
              
              // Mouvement vertical UNIQUEMENT sur desktop
              const time = Date.now() / 1000;
              const phase = index * 2;
              const baseAmplitude = isDesktop ? 25 : 0;
              const amplitude = proximity * baseAmplitude;
              const verticalMovement = amplitude * Math.sin(time * 3 + phase);
              const centerBoost = isDesktop && proximity > 0.7 ? (proximity - 0.7) * 40 : 0;
              const finalY = verticalMovement + centerBoost;

              return (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  ref={setCardRef}
                  animate={isDesktop ? { 
                    y: finalY,
                    scale: 1 + (proximity * 0.05),
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      mass: 0.5
                    }
                  } : {}}
                  whileHover={isDesktop ? { 
                    y: finalY - 8,
                    scale: 1.08,
                    transition: { duration: 0.2 }
                  } : { scale: 1.02 }}
                  className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-[#141B2B] rounded-xl md:rounded-2xl p-5 md:p-6 border border-[#1F2937] shadow-md hover:shadow-2xl transition-all duration-200 group relative flex-shrink-0"
                >
                  {proximity > 0.8 && isDesktop && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: proximity * 0.3 }}
                    />
                  )}
                  
                  <div 
                    className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      boxShadow: `0 25px 40px -12px rgba(59, 130, 246, ${0.3 + proximity * 0.3})`,
                      zIndex: -1,
                      transform: 'translateY(4px)'
                    }}
                  />
                  
                  <div className="relative z-10">
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-500/20 mb-2 md:mb-3" />
                    
                    <div className="flex mb-2 md:mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="fill-blue-400 text-blue-400" size={14} />
                      ))}
                    </div>
                    
                    <p className="text-gray-300 mb-3 md:mb-4 italic text-xs sm:text-sm md:text-base">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-3 border-t border-[#1F2937]">
                      {testimonial.isRealImage ? (
                        <div className="relative">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#1F2937] shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-xs md:text-sm font-bold border-2 border-[#1F2937] shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all`}>
                            {testimonial.initials}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-xs sm:text-sm md:text-base">
                          {testimonial.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Types de projets accompagnés */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10 text-white"
          >
            Accompagnement sur mesure
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {projectTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Garanties - Sans fond sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex justify-center"
        >
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 px-0 py-0 sm:px-4 sm:py-2 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs text-gray-400 sm:text-sm sm:text-gray-300 whitespace-nowrap">Devis gratuit</span>
            </div>
            <span className="text-gray-600 hidden xs:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs text-gray-400 sm:text-sm sm:text-gray-300 whitespace-nowrap">Réponse sous 24h</span>
            </div>
            <span className="text-gray-600 hidden xs:inline">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs text-gray-400 sm:text-sm sm:text-gray-300 whitespace-nowrap">Sans engagement</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}