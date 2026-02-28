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
      {/* BACKGROUND avec lignes horizontales et verticales - opacité augmentée */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-100">
        {/* Lignes verticales - opacité augmentée à 0.10 */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, 
            rgba(0,0,0,0.10) 0px, 
            rgba(0,0,0,0.10) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        
        {/* Lignes horizontales - opacité augmentée à 0.10 */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, 
            rgba(0,0,0,0.10) 0px, 
            rgba(0,0,0,0.10) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
      </div>
      
      {/* Container principal */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 py-6 sm:py-8 md:py-10 lg:py-12 pt-16 sm:pt-15 md:pt-24 lg:pt-28">
        {/* Badge */}
        <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-[#FF9800]/10 text-[#FF9800] px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full shadow-sm border border-[#FF9800]/20"
          >
            <Sparkles size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#FF9800]" />
            <span className="text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">Expert en solutions digitales sur mesure</span>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
          {/* Texte - partie gauche */}
          <div className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-tight px-1 sm:px-2">
              Construisons ensemble :
              <span className="block text-[#FF9800] mt-0.5 sm:mt-1 md:mt-2">
                <span ref={typedRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"/>
              </span>
            </h1>

            <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 px-2 sm:px-3 md:px-4 lg:px-0">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600">
                Passez de l'idée au produit en un temps record avec une expertise sur-mesure.
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-semibold">
                Gagnez en visibilité et automatisez vos ventes avec un site conçu pour convertir.
              </p>
            </div>

            {/* BOUTONS */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-3 lg:px-0">
              <motion.button
                onClick={handleLancerProjet}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#FF9800] text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#F57C00] transition-colors shadow-lg hover:shadow-xl hover:shadow-[#FF9800]/30 w-full sm:w-auto"
              >
                Lancer mon projet
                <ArrowRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </motion.button>
              
              <motion.button
                onClick={handleVoirRealisations}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-800 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg border-2 border-gray-200 hover:border-[#FF9800] hover:text-[#FF9800] transition-colors w-full sm:w-auto"
              >
                Voir mes réalisations
              </motion.button>
            </div>
          </div>

          {/* Photo de profil */}
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
            <div className="relative w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-sm xl:max-w-md">
              {/* Badge en haut à droite */}
              <motion.div
                initial={{ opacity: 0, y: -8, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-0 right-0 z-20"
                style={{ transform: 'translate(8%, -8%)' }}
              >
                <div className="bg-gradient-to-r from-[#FF9800] to-amber-600 text-white px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border-1.5 sm:border-2 border-white">
                  <Globe size={6} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  <Smartphone size={6} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-bold whitespace-nowrap">Multi-support</span>
                </div>
              </motion.div>

              {/* Badge en bas à gauche */}
              <motion.div
                initial={{ opacity: 0, y: 8, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-0 left-0 z-20"
                style={{ transform: 'translate(-8%, 8%)' }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1 sm:px-1.5 md:px-2 lg:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border-1.5 sm:border-2 border-white">
                  <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 bg-white rounded-full animate-pulse"></div>
                  <span className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[10px] lg:text-xs font-bold whitespace-nowrap">Disponible</span>
                </div>
              </motion.div>

              {/* Photo de profil */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl border-3 sm:border-4 border-white bg-gradient-to-br from-[#FF9800]/10 to-amber-50">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF9800]/10 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Micro-CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-6 sm:mt-7 md:mt-8 lg:mt-10 xl:mt-12 px-2 sm:px-3 lg:px-0"
        >
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-center sm:bg-white/80 sm:backdrop-blur-sm sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 sm:rounded-full sm:shadow-sm sm:border sm:border-gray-100">
            <CheckCircle size={8} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#FF9800]" />
            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-500 sm:text-gray-600 whitespace-nowrap">Réponse sous 24h</span>
            <span className="text-gray-300 hidden xs:inline">•</span>
            <CheckCircle size={8} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#FF9800] xs:ml-0 ml-0.5" />
            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-500 sm:text-gray-600 whitespace-nowrap">Devis gratuit</span>
            <span className="text-gray-300 hidden xs:inline">•</span>
            <CheckCircle size={8} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#FF9800] xs:ml-0 ml-0.5" />
            <span className="text-[10px] xs:text-xs sm:text-sm text-gray-500 sm:text-gray-600 whitespace-nowrap">Accompagnement A à Z</span>
          </div>
        </motion.div>
      </div>

      {/* Éléments décoratifs orange */}
      <div className="absolute top-20 left-10 w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 bg-[#FF9800]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 bg-amber-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/4 w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
    </section>
  );
}