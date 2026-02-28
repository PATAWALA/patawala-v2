'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, CheckCircle } from 'lucide-react';
import BookingModal from '../ui/BookingModal';

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm mb-6 md:mb-8"
            >
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">
                Donnons vie à votre projet
              </span>
            </motion.div>

            {/* Titre */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4 text-white leading-tight">
              Vous avez une idée ? 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                Faisons-en quelque chose de grand.
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Que votre projet soit clair ou encore en réflexion, échangeons ensemble 
              pour trouver la meilleure façon de le concrétiser.
            </p>

            {/* Garanties - Sans fond sur mobile */}
            <div className="flex justify-center mb-8 md:mb-10">
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 px-0 py-0 sm:px-4 sm:py-2 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-400 sm:text-gray-300 whitespace-nowrap">Gratuit</span>
                </div>
                <span className="text-gray-600 hidden xs:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-400 sm:text-gray-300 whitespace-nowrap">30 minutes</span>
                </div>
                <span className="text-gray-600 hidden xs:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-400 sm:text-gray-300 whitespace-nowrap">Sans engagement</span>
                </div>
              </div>
            </div>

            {/* Bouton principal */}
            <div className="flex justify-center mb-8 md:mb-10 px-4">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl w-full max-w-xs sm:w-auto"
              >
                <Calendar size={18} className="sm:w-5 sm:h-5" />
                Choisir un créneau
              </motion.button>
            </div>

            {/* Disponibilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm sm:text-base text-gray-300">
                  Cette semaine :
                </span>
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-400">
                2 créneaux disponibles
              </span>
            </motion.div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xs sm:text-sm text-gray-500 mt-8 sm:mt-10"
            >
              Je prends seulement 2 projets par mois pour un accompagnement de qualité.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Modal de réservation */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

