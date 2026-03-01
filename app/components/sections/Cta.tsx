'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, Sparkles, CheckCircle, MessageSquare, Clock, Heart } from 'lucide-react';
import BookingModal from '../ui/BookingModal';

// Version mémoïsée du composant
const CTASection = memo(function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Points lumineux statiques
  const lightPoints = useRef(
    [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <section 
        id="contact" 
        className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
        aria-label="Section contact"
      >
        {/* FOND OPTIMISÉ - éléments décoratifs statiques */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          {/* Lignes subtiles */}
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 60px)`
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 60px)`
          }} />
          
          {/* Éléments décoratifs - STATIQUES */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl will-change-transform" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl will-change-transform" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl will-change-transform" />
          
          {/* Points lumineux */}
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
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Badge */}
            <div className="w-full flex justify-center mb-6 md:mb-8">
              {isMounted ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                  <Sparkles size={14} className="text-blue-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium text-blue-400">
                    Parlons de votre projet
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <span className="text-sm font-medium text-blue-400">Parlons de votre projet</span>
                </div>
              )}
            </div>

            {/* Titre - INSPIRANT */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4 text-white leading-tight">
              Vous avez une idée ?
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                Je suis là pour la construire avec vous.
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Que votre projet soit clair ou encore en réflexion, je vous écoute et vous conseille. 
              Ensemble, trouvons la meilleure direction.
            </p>

            {/* Garanties */}
            <div className="flex justify-center mb-8 md:mb-10">
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 px-0 py-0 sm:px-4 sm:py-2 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs text-gray-400 sm:text-sm sm:text-gray-300 whitespace-nowrap">Premier échange gratuit</span>
                </div>
                <span className="text-gray-600 hidden sm:inline" aria-hidden="true">•</span>
                
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs text-gray-400 sm:text-sm sm:text-gray-300 whitespace-nowrap">30 minutes offertes</span>
                </div>
                <span className="text-gray-600 hidden sm:inline" aria-hidden="true">•</span>
                
                <div className="flex items-center gap-1.5">
                  <Heart size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs text-gray-400 sm:text-sm sm:text-gray-300 whitespace-nowrap">Sans engagement</span>
                </div>
              </div>
            </div>

            {/* Bouton principal - OPTIMISÉ */}
            <div className="flex justify-center mb-8 md:mb-10 px-4">
              <button
                onClick={handleOpenModal}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full max-w-xs sm:w-auto min-h-[44px] active:scale-[0.98]"
                aria-label="Choisir un créneau pour discuter de mon projet"
              >
                <Calendar size={18} className="sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                <span>Choisir un créneau</span>
              </button>
            </div>

            {/* Disponibilité */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  Cette semaine :
                </span>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-400">
                2 créneaux disponibles
              </span>
            </div>

            {/* Note */}
            <p className="text-xs sm:text-sm text-gray-500 mt-8 sm:mt-10">
              Je prends seulement 2 projets par mois pour un accompagnement de qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Modal de réservation */}
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
});

export default CTASection;