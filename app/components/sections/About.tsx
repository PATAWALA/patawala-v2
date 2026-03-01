'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Lightbulb, HeartHandshake, Rocket, Target, MessageSquare, CheckCircle, Sparkles, Globe, Smartphone, Award, Cpu, Zap, TrendingUp, User, Handshake, Briefcase, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileImage from '../../assets/images/profile1.png';

const AboutSection = memo(function AboutSection() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Points lumineux statiques (optimisation)
  const lightPoints = useRef(
    [...Array(10)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  // CARTES MA VISION - Avec l'angle "partenaire long terme" pour entrepreneurs
  const visionCards = [
    {
      number: "01",
      icon: Rocket,
      title: "Créativité & Innovation",
      description: "Des sites et applications qui captivent. Je pense chaque projet pour qu'il soit unique, fonctionnel et en phase avec vos ambitions."
    },
    {
      number: "02",
      icon: Handshake,
      title: "Partenaire de confiance",
      description: "Au-delà des projets, je construis des relations durables. Que vous soyez client ou entrepreneur, je suis là pour collaborer sur le long terme."
    },
    {
      number: "03",
      icon: Target,
      title: "Objectifs & Résultats",
      description: "Un beau site ne suffit pas. Je crée des solutions pensées pour convertir, fidéliser et faire grandir votre activité."
    },
    {
      number: "04",
      icon: Users,
      title: "Esprit de collaboration",
      description: "Vous avez une idée ? Vous cherchez un développeur pour vos projets ? Travaillons ensemble pour créer quelque chose de grand."
    }
  ];

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  }, []);

  const handleParlerProjet = useCallback(() => {
    scrollToSection('contact');
  }, [scrollToSection]);

  const handleVoirOffres = useCallback(() => {
    router.push('/services');
  }, [router]);

  return (
    <section 
      id="about" 
      className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20 bg-[#0A0F1C]"
      aria-label="À propos"
    >
      {/* FOND - avec dégradé et formes floues */}
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
        
        {/* Éléments décoratifs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      
      {/* Container principal */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Badge centré principal - inchangé */}
          <div className="w-full flex justify-center mb-6 sm:mb-8">
            {isMounted ? (
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-500/20 backdrop-blur-sm">
                <Sparkles size={12} className="sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">À votre écoute</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
                <span className="text-sm font-medium">À votre écoute</span>
              </div>
            )}
          </div>

          {/* Titre et sous-titre - SOUS-TITRE ALLÉGÉ */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2 text-white">
              Donnez vie à vos idées
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 sm:mt-2">
                avec un expert passionné
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Chaque projet est pensé pour vous ressembler et répondre précisément à vos objectifs 
              et à ceux de vos utilisateurs et clients.
            </p>

            {/* Séparateur */}
            <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-5 sm:mt-6 md:mt-8 rounded-full" />
          </div>
          
          {/* CARTES MA VISION - 4 cartes avec angle partenaire long terme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20">
            {visionCards.map((card, index) => (
              <div
                key={index}
                className="group bg-[#141B2B] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 border border-[#1F2937] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 relative"
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-blue-400/80 group-hover:text-blue-400 transition-colors">
                      {card.number}
                    </span>
                    <card.icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* BADGE "Qui suis-je ?" - CENTRÉ AU-DESSUS DE L'IMAGE ET DE LA BIO (inchangé) */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-5 py-2.5 rounded-full shadow-md border border-blue-500/30 backdrop-blur-sm">
              <User size={16} className="text-blue-400" />
              <span className="text-sm sm:text-base font-semibold tracking-wide">Qui suis-je ?</span>
            </div>
          </div>

          {/* Section image et bio */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            
            {/* Image à gauche - OPTIMISÉE */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md aspect-square">
                
                {/* Cercles */}
                <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl -z-10 scale-125 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-6 border-2 border-cyan-400/30 rounded-full -z-10 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl -z-10 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -z-20 will-change-transform" aria-hidden="true" />
                
                {/* Points lumineux */}
                {lightPoints.map((point, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                    style={{
                      left: point.left,
                      top: point.top,
                      opacity: 0.6,
                      transform: 'translateZ(0)'
                    }}
                    aria-hidden="true"
                  />
                ))}

                {/* Badge en haut à gauche */}
                <div 
                  className="absolute top-0 left-0 z-30"
                  style={{ transform: 'translate(-5%, -5%)' }}
                >
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                    <Globe size={8} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" aria-hidden="true" />
                    <Smartphone size={8} className="xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" aria-hidden="true" />
                    <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Web & Mobile</span>
                  </div>
                </div>

                {/* Badge en bas à droite */}
                <div 
                  className="absolute bottom-0 right-0 z-30"
                  style={{ transform: 'translate(5%, 5%)' }}
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-1.5 md:px-2 lg:px-3 py-1 sm:py-1 rounded-full shadow-lg flex items-center gap-1 sm:gap-1 border border-[#1F2937]">
                    <div className="w-1.5 h-1.5 xs:w-1.5 xs:h-1.5 bg-white rounded-full" />
                    <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Disponible</span>
                  </div>
                </div>

                {/* Photo */}
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-3 sm:border-4 border-[#1F2937] bg-[#141B2B]">
                  <Image
                    src={profileImage}
                    alt="Abdoulaye Patawala"
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 350px, (max-width: 1024px) 384px, 448px"
                    priority
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* BIO à droite */}
            <div className="flex-1 flex flex-col text-center lg:text-left max-w-md px-3 sm:px-4 lg:px-0">
              
              {/* Hello, je suis... */}
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-white">
                Hello, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Abdoulaye Patawala</span>
              </h3>
              
              <p className="text-sm sm:text-base md:text-lg text-blue-400/90 font-medium mb-4">
                Développeur web & mobile
              </p>

              {/* Mission */}
              <div className="mb-4 sm:mb-5 md:mb-6 space-y-3">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  <span className="text-white font-semibold">Ma mission :</span> prendre en charge votre présence digitale pour que vous puissiez vous concentrer sur votre cœur de métier.
                </p>
                
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  Du site vitrine à l'application complexe, je transforme vos idées en solutions performantes, pensées pour durer et évoluer avec vous.
                </p>
              </div>
              
              {/* Message professionnel */}
              <div className="bg-blue-500/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 md:mb-6 lg:mb-7 border border-blue-500/20">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 text-left">
                      <span className="font-semibold text-blue-400">Une question sur votre projet ?</span><br />
                      <span className="text-xs sm:text-sm md:text-base">Je vous écoute et vous conseille pour trouver la solution la mieux adaptée à vos besoins.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* BOUTONS */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleParlerProjet}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto min-h-[44px]"
                  aria-label="Parler de mon projet"
                >
                  Parler de mon projet
                  <MessageSquare size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" aria-hidden="true" />
                </button>
                
                <button
                  onClick={handleVoirOffres}
                  className="bg-transparent text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto min-h-[44px]"
                  aria-label="Voir mes offres"
                >
                  Voir mes offres
                </button>
              </div>

              {/* Micro-CTA - PLUS PETIT */}
              <div className="flex justify-center w-full mt-3 sm:mt-4">
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-black/20 backdrop-blur-sm rounded-full border border-gray-800/50 whitespace-nowrap">
                  <CheckCircle size={8} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-300 font-medium">Devis gratuit</span>
                  <span className="text-gray-700 hidden sm:inline mx-0.5 text-[8px]" aria-hidden="true">•</span>
                  
                  <CheckCircle size={8} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-300 font-medium">Réponse sous 24h</span>
                  <span className="text-gray-700 hidden sm:inline mx-0.5 text-[8px]" aria-hidden="true">•</span>
                  
                  <CheckCircle size={8} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-300 font-medium">Sans engagement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;