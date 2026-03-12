'use client';

import { Home, ArrowLeft, Search, Frown, AlertCircle, Compass } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function NotFound() {
  const { t, isLoading } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  // Attendre que les traductions soient chargées
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  // Mouse position - GARDÉ car c'est interactif et léger
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Points lumineux statiques pour les particules (RÉDUITS À 8)
  const particles = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    })), []);

  // Handler pour retour - MÉMOÏSÉ
  const handleGoBack = useCallback(() => {
    if (typeof window !== 'undefined') window.history.back();
  }, []);

  // TRADUCTIONS SIMPLES
  const translations = {
    title: t('title', 'not-found') || 'Oups ! Page introuvable',
    message: t('message', 'not-found') || "La page que vous cherchez n'existe pas ou a été déplacée.",
    suggestionsTitle: t('suggestions.title', 'not-found') || 'Que faire maintenant ?',
    homeTitle: t('suggestions.home.title', 'not-found') || "Page d'accueil",
    homeDesc: t('suggestions.home.description', 'not-found') || "Retourner à l'accueil",
    projectsTitle: t('suggestions.projects.title', 'not-found') || 'Mes projets',
    projectsDesc: t('suggestions.projects.description', 'not-found') || 'Découvrir mes réalisations',
    contactTitle: t('suggestions.contact.title', 'not-found') || 'Me contacter',
    contactDesc: t('suggestions.contact.description', 'not-found') || 'Discuter de votre projet',
    backButton: t('backButton', 'not-found') || 'Retour à la page précédente',
  };

  // SKELETON LOADER
  if (isLoading || !isReady) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden flex items-center justify-center p-4 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]" />
        
        <div className="relative z-10 max-w-3xl w-full">
          {/* 404 skeleton */}
          <div className="relative mb-8 flex justify-center">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-800/50 rounded-lg animate-pulse" />
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-800/50 rounded-lg animate-pulse" />
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gray-800/50 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Message skeleton */}
          <div className="text-center mb-8">
            <div className="w-64 h-8 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-gray-800/50 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="w-12 h-12 bg-gray-800/50 rounded-full mx-auto animate-pulse" />
          </div>

          {/* Suggestions skeleton */}
          <div className="bg-[#141B2B]/50 rounded-2xl p-6 mb-8 border border-gray-800/50">
            <div className="w-48 h-6 bg-gray-800/50 rounded-lg mb-4 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-800/50 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>

          {/* Back button skeleton */}
          <div className="w-48 h-6 bg-gray-800/50 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] relative overflow-hidden flex items-center justify-center p-4 pt-24">
      {/* FOND OPTIMISÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Éléments décoratifs avec CSS transform (ultra léger) */}
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl transition-transform duration-300"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl transition-transform duration-300"
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
        }}
        aria-hidden="true"
      />

      {/* Conteneur principal */}
      <div className="relative z-10 max-w-3xl w-full">
        {/* Animation 404 */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <div className="text-8xl sm:text-9xl md:text-[12rem] font-black text-blue-500/10 select-none animate-float1">4</div>
              <div className="relative">
                <div className="text-8xl sm:text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 select-none animate-pulse-slow">0</div>
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-ping-slow" />
              </div>
              <div className="text-8xl sm:text-9xl md:text-[12rem] font-black text-blue-500/10 select-none animate-float2">4</div>
            </div>
          </div>
        </div>

        {/* Message principal */}
        <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{translations.title}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 mb-6">
            <AlertCircle size={20} className="text-blue-400" />
            <p className="text-lg sm:text-xl">{translations.message}</p>
          </div>
          <div className="inline-block mb-8 animate-wobble">
            <Frown size={48} className="text-blue-400/50" />
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 border border-[#1F2937] shadow-xl animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Compass size={24} className="text-blue-400" />
            {translations.suggestionsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/" passHref>
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all cursor-pointer group border border-blue-500/20 hover:scale-102 hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Home size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">{translations.homeTitle}</span>
                  <p className="text-xs text-gray-400">{translations.homeDesc}</p>
                </div>
              </div>
            </Link>
            <Link href="/projets" passHref>
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all cursor-pointer group border border-blue-500/20 hover:scale-102 hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">{translations.projectsTitle}</span>
                  <p className="text-xs text-gray-400">{translations.projectsDesc}</p>
                </div>
              </div>
            </Link>
            <Link href="/#contact" passHref>
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all cursor-pointer group sm:col-span-2 border border-blue-500/20 hover:scale-102 hover:translate-x-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">{translations.contactTitle}</span>
                  <p className="text-xs text-gray-400">{translations.contactDesc}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bouton retour */}
        <div className="text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>{translations.backButton}</span>
          </button>
        </div>

        {/* Particules */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-particle"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-5deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(10px) rotate(5deg); } }
        @keyframes pulseSlow { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.1); } }
        @keyframes pingSlow { 0% { transform:scale(1); opacity:0.3; } 50% { transform:scale(1.5); opacity:0; } 100% { transform:scale(1); opacity:0.3; } }
        @keyframes wobble { 0%,100% { transform:rotate(0deg); } 25% { transform:rotate(5deg); } 75% { transform:rotate(-5deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes particle { 0% { opacity:0; transform:scale(0) translateY(0); } 50% { opacity:0.5; transform:scale(1) translateY(-30px); } 100% { opacity:0; transform:scale(0) translateY(-60px); } }
        .animate-float1 { animation: float1 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        .animate-ping-slow { animation: pingSlow 2s ease-in-out infinite; }
        .animate-wobble { animation: wobble 4s ease-in-out infinite; }
        .animate-fadeIn { opacity: 0; animation: fadeIn 0.5s ease-out forwards; }
        .animate-particle { animation: particle 4s ease-in-out infinite; }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}