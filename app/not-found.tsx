'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Frown, AlertCircle, Compass } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Window dimensions pour particules
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden flex items-center justify-center p-4 pt-24">
      {/* BEAU FOND - avec dégradé et formes floues */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, 
              rgba(59,130,246,0.05) 0px, 
              rgba(59,130,246,0.05) 1px, 
              transparent 1px, 
              transparent 60px)`,
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, 
              rgba(6,182,212,0.05) 0px, 
              rgba(6,182,212,0.05) 1px, 
              transparent 1px, 
              transparent 60px)`,
          }}
        ></div>
      </div>

      {/* Éléments décoratifs animés */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: -mousePosition.x, y: -mousePosition.y }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      {/* Conteneur principal */}
      <div className="relative z-10 max-w-3xl w-full">
        {/* Animation 404 */}
        <div className="relative mb-8 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-8xl sm:text-9xl md:text-[12rem] font-black text-blue-500/10 select-none"
              >
                4
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="relative"
              >
                <div className="text-8xl sm:text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 select-none">
                  0
                </div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="text-8xl sm:text-9xl md:text-[12rem] font-black text-blue-500/10 select-none"
              >
                4
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Message principal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Oups ! Page introuvable</h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 mb-6">
            <AlertCircle size={20} className="text-blue-400" />
            <p className="text-lg sm:text-xl">La page que vous cherchez n'existe pas ou a été déplacée.</p>
          </div>

          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="inline-block mb-8">
            <Frown size={48} className="text-blue-400/50" />
          </motion.div>
        </motion.div>

        {/* Suggestions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-[#1F2937] shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Compass size={24} className="text-blue-400" />
            Que faire maintenant ?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.02, x: 4 }} className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors cursor-pointer group border border-blue-500/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Home size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">Page d'accueil</span>
                  <p className="text-xs text-gray-400">Retourner à l'accueil</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/projets">
              <motion.div whileHover={{ scale: 1.02, x: 4 }} className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors cursor-pointer group border border-blue-500/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">Mes projets</span>
                  <p className="text-xs text-gray-400">Découvrir mes réalisations</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/#contact">
              <motion.div whileHover={{ scale: 1.02, x: 4 }} className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors cursor-pointer group sm:col-span-2 border border-blue-500/20">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">Me contacter</span>
                  <p className="text-xs text-gray-400">Discuter de votre projet</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Bouton retour */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.history.back();
            }}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Retour à la page précédente</span>
          </button>
        </motion.div>

        {/* Particules */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (dimensions.width || 0),
                y: Math.random() * (dimensions.height || 0),
                scale: 0,
              }}
              animate={{
                y: [null, -30],
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}