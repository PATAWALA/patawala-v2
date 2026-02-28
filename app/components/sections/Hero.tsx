'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Globe, Smartphone } from 'lucide-react';
import Typed from 'typed.js';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileImage from '../../assets/images/profile.png';

export default function HeroSection() {
  const typedRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  };

  const handleLancerProjet = () => {
    scrollToSection('contact');
  };

  const handleVoirRealisations = () => {
    scrollToSection('projets');
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      {/* BEAU FOND - avec dégradé et formes floues */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles (un peu plus visibles) */}
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
        
        {/* Formes floues de fond */}
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>
      
      {/* Container principal */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 py-6 sm:py-8 md:py-10 lg:py-12 pt-16 sm:pt-15 md:pt-24 lg:pt-28">
        {/* Badge */}
        <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-blue-500/10 text-blue-400 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shadow-sm border border-blue-500/20 backdrop-blur-sm"
          >
            <Sparkles size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400" />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">Expert en solutions digitales sur mesure</span>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* Texte - partie gauche */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-tight px-1 sm:px-2 text-white">
              Construisons ensemble :
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-0.5 sm:mt-1 md:mt-2 font-black">
                <span ref={typedRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"/>
              </span>
            </h1>

            <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 px-2 sm:px-3 md:px-4 lg:px-0">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-bold">
                Créez un impact réel avec votre business grâce à des sites et applications pensés pour maximiser vos ventes.
              </p>
            </div>

            {/* BOUTONS */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-3 lg:px-0">
              <motion.button
                onClick={handleLancerProjet}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-bold text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto"
              >
                Lancer mon projet
                <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>
              
              <motion.button
                onClick={handleVoirRealisations}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto"
              >
                Voir mes réalisations
              </motion.button>
            </div>
          </div>

          {/* Photo de profil - partie droite - AVEC ANIMATIONS FORTES */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="flex-1 flex justify-center relative order-1 lg:order-2 w-full mb-3 sm:mb-4 lg:mb-0"
          >
            {/* Conteneur de l'image avec animations FORTES */}
            <div className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-sm xl:max-w-md">
              {/* ANIMATION 1 - Grand cercle bleu pulsant TRÈS FORT */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl -z-10"
                style={{ transform: 'scale(1.2)' }}
              />
              
              {/* ANIMATION 2 - Cercle cyan qui tourne */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -inset-6 border-2 border-cyan-400/30 rounded-full -z-10"
              />
              
              {/* ANIMATION 3 - Deuxième cercle qui pulse dans l'autre sens */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl -z-10"
              />
              
              {/* ANIMATION 4 - Points lumineux nombreux et brillants */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [0, (i % 2 === 0 ? 30 : -30), 0],
                    y: [0, (i % 3 === 0 ? 30 : -30), 0],
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.9, 0]
                  }}
                  transition={{ 
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              {/* ANIMATION 5 - Halo de lumière externe */}
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -z-20"
              />

              {/* Badge en haut à droite - avec animation de scale */}
              <motion.div
                initial={{ opacity: 0, y: -8, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 right-0 z-30"
                style={{ transform: 'translate(8%, -8%)' }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59,130,246,0.5)',
                      '0 0 0 10px rgba(59,130,246,0)',
                      '0 0 0 0 rgba(59,130,246,0)'
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border border-[#1F2937]"
                >
                  <Globe size={6} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  <Smartphone size={6} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Multi-support</span>
                </motion.div>
              </motion.div>

              {/* Badge en bas à gauche - avec animation de scale */}
              <motion.div
                initial={{ opacity: 0, y: 8, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 z-30"
                style={{ transform: 'translate(-8%, 8%)' }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border border-[#1F2937]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1 h-1 xs:w-1.5 xs:h-1.5 bg-white rounded-full"
                  />
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Disponible</span>
                </motion.div>
              </motion.div>

              {/* Photo de profil avec halo pulsant */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(59,130,246,0.4)',
                    '0 0 0 15px rgba(59,130,246,0.2)',
                    '0 0 0 25px rgba(59,130,246,0)',
                    '0 0 0 0 rgba(59,130,246,0)'
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 sm:border-4 border-[#1F2937] bg-[#141B2B]"
              >
                <div className="aspect-square relative">
                  <Image
                    src={profileImage}
                    alt="Photo professionnelle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 200px, (max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 320px, 384px"
                    priority
                  />
                </div>
                
                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Micro-CTA - SANS FOND SUR MOBILE, avec fond seulement sur desktop */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-6 sm:mt-7 md:mt-8 lg:mt-10 xl:mt-12 px-2 sm:px-3 lg:px-0"
        >
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-center px-0 py-0 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
            <CheckCircle size={8} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400" />
            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-300 font-medium whitespace-nowrap">Réponse sous 24h</span>
            <span className="text-gray-600 hidden xs:inline">•</span>
            <CheckCircle size={8} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 xs:ml-0 ml-0.5" />
            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-300 font-medium whitespace-nowrap">Devis gratuit</span>
            <span className="text-gray-600 hidden xs:inline">•</span>
            <CheckCircle size={8} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 xs:ml-0 ml-0.5" />
            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-300 font-medium whitespace-nowrap">Accompagnement A à Z</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}