'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Lightbulb, HeartHandshake, Rocket, Target, MessageSquare, CheckCircle, Sparkles, Globe, Smartphone } from 'lucide-react';
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

  // CARTES MA VISION - 4 cartes inspirantes
  const visionCards = [
    {
      number: "01",
      icon: Rocket,
      title: "Innovation & Excellence",
      description: "Je reste à la pointe des technologies pour vous offrir des solutions modernes, durables et évolutives. Chaque projet est l'occasion de repousser les limites."
    },
    {
      number: "02",
      icon: HeartHandshake,
      title: "Partenariat de confiance",
      description: "Votre réussite est la mienne. Je construis une relation solide basée sur l'écoute et la transparence, bien au-delà d'une simple relation prestataire-client."
    },
    {
      number: "03",
      icon: Target,
      title: "Vision à long terme",
      description: "Chaque projet est pensé pour grandir avec vous, anticiper vos besoins et s'adapter à l'évolution de votre activité dans le temps."
    },
    {
      number: "04",
      icon: Lightbulb,
      title: "Accompagnement humain",
      description: "Pas de jargon technique. Des explications claires et un vrai dialogue pour avancer ensemble sereinement, à votre rythme et selon vos objectifs."
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
          
          {/* Badge centré */}
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

          {/* Titre et sous-titre */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2 text-white">
              Donnez vie à vos idées
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 sm:mt-2">
                avec un expert passionné
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ensemble, construisons une solution digitale à votre image : 
              performante, durable et pensée pour vous.
            </p>

            {/* Séparateur */}
            <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-5 sm:mt-6 md:mt-8 rounded-full" />
          </div>
          
          {/* CARTES MA VISION - 4 cartes restaurées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20">
            {visionCards.map((card, index) => (
              <div
                key={index}
                className="group bg-[#141B2B] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-[#1F2937] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 relative"
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl sm:text-3xl font-bold text-blue-400/50 group-hover:text-blue-400 transition-colors">
                      {card.number}
                    </span>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed pl-0">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Section image et bio */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            
            {/* Image à gauche - OPTIMISÉE comme dans Hero */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md aspect-square">
                
                {/* Cercles */}
                <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl -z-10 scale-125 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-6 border-2 border-cyan-400/30 rounded-full -z-10 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl -z-10 will-change-transform" aria-hidden="true" />
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -z-20 will-change-transform" aria-hidden="true" />
                
                {/* Points lumineux optimisés */}
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
                    <span className="text-[8px] xs:text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs font-semibold whitespace-nowrap">Multi-support</span>
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

                {/* Photo avec optimisation */}
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

            {/* BIO à droite - Version professionnelle */}
            <div className="flex-1 flex flex-col text-center lg:text-left max-w-md px-3 sm:px-4 lg:px-0">
              
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white">
                Abdoulaye Patawala
              </h3>
              
              <p className="text-sm sm:text-base md:text-lg text-blue-400 font-medium mb-3 sm:mb-4 md:mb-5">
                Concepteur de solutions digitales
              </p>

              {/* BIO - Professionnelle et inspirante */}
              <div className="mb-4 sm:mb-5 md:mb-6 space-y-3">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  <span className="text-white font-medium">Ma mission :</span> prendre en charge votre présence digitale pour vous permettre de vous consacrer pleinement à votre cœur d'activité.
                </p>
                
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  De la stratégie à la réalisation, je transforme vos ambitions en solutions performantes qui vous ressemblent et répondent précisément à vos objectifs.
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

              {/* Micro-CTA - SUR UNE SEULE LIGNE (corrigé) */}
              <div className="flex justify-center w-full mt-4 sm:mt-5 md:mt-6">
                <div className="flex items-center justify-center gap-1.5 sm:gap-1.5 md:gap-2 px-0 py-0 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm whitespace-nowrap">
                  <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium">Devis gratuit</span>
                  <span className="text-gray-600 hidden sm:inline mx-0.5" aria-hidden="true">•</span>
                  
                  <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium">Réponse sous 24h</span>
                  <span className="text-gray-600 hidden sm:inline mx-0.5" aria-hidden="true">•</span>
                  
                  <CheckCircle size={10} className="xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-[10px] xs:text-[10px] sm:text-sm text-gray-300 font-medium">Sans engagement</span>
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