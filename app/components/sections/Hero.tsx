'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Globe, Smartphone } from 'lucide-react';
import Typed from 'typed.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileImage from '../../assets/images/profile.png';

const HeroSection = memo(function HeroSection() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!typedRef.current || !isMounted) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        'votre visibilité en ligne',
        'votre prochaine application mobile',
        'un e-commerce qui convertit',
        'vos outils métier sur-mesure',
        'votre croissance digitale',
        'notre collaboration gagnante'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: true,
      loopCount: Infinity
    });

    return () => typed.destroy();
  }, [isMounted]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  }, []);

  const handleLancerProjet = useCallback(() => {
    scrollToSection('contact');
  }, [scrollToSection]);

  const handleVoirRealisations = useCallback(() => {
    scrollToSection('projets');
  }, [scrollToSection]);

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  return (
    <section 
      id="hero" 
      className="min-h-screen relative overflow-hidden flex items-center"
      aria-label="Section d'accueil"
    >
      {/* BEAU FOND - avec dégradé et formes floues (inchangé) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
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
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>
      
      {/* Container principal - layout EXACTEMENT comme avant */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 py-6 sm:py-8 md:py-10 lg:py-12 pt-16 sm:pt-15 md:pt-24 lg:pt-28">
        
        {/* Badge - layout inchangé */}
        <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8">
          {isMounted ? (
            <div className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-blue-500/10 text-blue-400 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shadow-sm border border-blue-500/20 backdrop-blur-sm">
              <Sparkles size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">Expert en solutions digitales sur mesure</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
              <span className="text-sm font-medium">Expert en solutions digitales</span>
            </div>
          )}
        </div>

        {/* Contenu principal - FLEX avec layout EXACTEMENT comme avant */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          
          {/* Texte - partie gauche - MÊMES CLASSES */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-tight px-1 sm:px-2 text-white">
              Construisons ensemble :
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-0.5 sm:mt-1 md:mt-2 font-black">
                <span 
                  ref={typedRef} 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
                  aria-label="Texte animé"
                />
              </span>
            </h1>

            <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 px-2 sm:px-3 md:px-4 lg:px-0">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-bold">
                Créez un impact réel avec votre business grâce à des sites et applications pensés pour maximiser vos ventes.
              </p>
            </div>

            {/* BOUTONS - layout exact */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-3 lg:px-0">
              <button
                onClick={handleLancerProjet}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-5 md:px-6 py-3 sm:py-2.5 md:py-3 rounded-xl font-bold text-sm sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto min-h-[44px]"
                aria-label="Lancer un projet"
              >
                Lancer mon projet
                <ArrowRight size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
              </button>
              
              <button
                onClick={handleVoirRealisations}
                className="bg-transparent text-white px-6 sm:px-5 md:px-6 py-3 sm:py-2.5 md:py-3 rounded-xl font-semibold text-sm sm:text-sm md:text-base lg:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto min-h-[44px]"
                aria-label="Voir les réalisations"
              >
                Voir mes réalisations
              </button>
            </div>
          </div>

          {/* Photo de profil - layout EXACTEMENT comme avant */}
          <div className="flex-1 flex justify-center relative order-1 lg:order-2 w-full mb-3 sm:mb-4 lg:mb-0">
            
            {/* Conteneur avec dimensions précises */}
            <div className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-sm xl:max-w-md">
              
              {/* Éléments de fond statiques */}
              <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl -z-10 scale-125" aria-hidden="true" />
              <div className="absolute -inset-6 border-2 border-cyan-400/30 rounded-full -z-10" aria-hidden="true" />
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl -z-10" aria-hidden="true" />
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -z-20" aria-hidden="true" />
              
              {/* Points lumineux */}
              {lightPoints.map((point, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                  style={{
                    left: point.left,
                    top: point.top,
                    opacity: 0.6
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Badge en haut à droite */}
              <div 
                className="absolute top-0 right-0 z-30"
                style={{ transform: 'translate(5%, -5%)' }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                  <Globe size={8} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" aria-hidden="true" />
                  <Smartphone size={8} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" aria-hidden="true" />
                  <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Multi-support</span>
                </div>
              </div>

              {/* Badge en bas à gauche */}
              <div 
                className="absolute bottom-0 left-0 z-30"
                style={{ transform: 'translate(-5%, 5%)' }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                  <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 bg-white rounded-full" />
                  <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Disponible</span>
                </div>
              </div>

              {/* Photo de profil */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 sm:border-4 border-[#1F2937] bg-[#141B2B]">
                <div className="aspect-square relative">
                  <Image
                    src={profileImage}
                    alt="Photo professionnelle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 200px, (max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 320px, 384px"
                    priority
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Micro-CTA */}
        <div className="flex justify-center mt-6 sm:mt-7 md:mt-8 lg:mt-10 xl:mt-12 px-2 sm:px-3 lg:px-0">
          <div className="flex items-center gap-1.5 sm:gap-1.5 md:gap-2 flex-wrap justify-center px-0 py-0 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
            <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400" aria-hidden="true" />
            <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium whitespace-nowrap">Réponse sous 24h</span>
            <span className="text-gray-600 hidden xs:inline" aria-hidden="true">•</span>
            <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 xs:ml-0 ml-1" aria-hidden="true" />
            <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium whitespace-nowrap">Devis gratuit</span>
            <span className="text-gray-600 hidden xs:inline" aria-hidden="true">•</span>
            <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 xs:ml-0 ml-1" aria-hidden="true" />
            <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium whitespace-nowrap">Accompagnement A à Z</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;