'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Rocket, Users, MessageSquare, CheckCircle, Sparkles, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import profileImage from '../../assets/images/profile1.png';

export default function AboutSection() {
  const router = useRouter();

  const capabilities = [
    {
      icon: Globe,
      title: "Sites web & plateformes",
      context: "Vitrines, e-commerce, SaaS — responsive et optimisés SEO"
    },
    {
      icon: Rocket,
      title: "Applications mobiles",
      context: "iOS, Android et hybrides — expérience utilisateur fluide"
    },
    {
      icon: Code,
      title: "Outils métier sur-mesure",
      context: "CRM, ERP, automatisations — adaptés à vos processus"
    },
    {
      icon: Users,
      title: "Accompagnement stratégique",
      context: "Conseil, maintenance, évolution — partenaire long terme"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  };

  const handleParlerProjet = () => {
    scrollToSection('contact');
  };

  const handleVoirOffres = () => {
    router.push('/services');
  };

  return (
    <section id="about" className="min-h-screen relative overflow-hidden flex items-center py-12 sm:py-16 md:py-20 bg-[#0A0F1C]">
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
      
      {/* Container principal */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge centré */}
          <div className="w-full flex justify-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 text-blue-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-500/20 backdrop-blur-sm"
            >
              <Sparkles size={12} className="sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">4 ans à vos côtés</span>
            </motion.div>
          </div>

          {/* Titre et sous-titre */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight px-2 text-white"
            >
              Donnez vie à vos idées
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 sm:mt-2">
                avec un expert passionné
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4"
            >
              Ensemble, construisons une solution digitale à votre image : 
              performante, durable et pensée pour vous.
            </motion.p>

            {/* Séparateur */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-5 sm:mt-6 md:mt-8 rounded-full"
            />
          </div>
          
          {/* CARTES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="group bg-[#141B2B] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-[#1F2937] transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/30 relative"
              >
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <capability.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {capability.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {capability.context}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section image et bio */}
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Image à gauche - AVEC ANIMATIONS FORTES */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -6, 0]
                }}
                viewport={{ once: true }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[350px] md:max-w-sm lg:max-w-md aspect-square"
              >
                {/* ANIMATIONS FORTES AUTOUR DE L'IMAGE */}
                {/* Grand cercle bleu pulsant */}
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
                
                {/* Cercle cyan qui tourne */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 border border-cyan-400/30 rounded-full -z-10"
                />
                
                {/* Deuxième cercle qui pulse */}
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
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl -z-10"
                />
                
                {/* Points lumineux */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, (i % 2 === 0 ? 25 : -25), 0],
                      y: [0, (i % 3 === 0 ? 25 : -25), 0],
                      scale: [0, 1.2, 0],
                      opacity: [0, 0.9, 0]
                    }}
                    transition={{ 
                      duration: 4 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}

                {/* Badge en haut à gauche - avec animation */}
                <motion.div
                  initial={{ opacity: 0, y: -10, x: -10 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-0 left-0 z-30"
                  style={{ transform: 'translate(-10%, -10%)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border border-[#1F2937]"
                  >
                    <Globe size={8} className="sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5" />
                    <Smartphone size={8} className="sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5" />
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium whitespace-nowrap">Web & Mobile</span>
                  </motion.div>
                </motion.div>

                {/* Badge en bas à droite - avec animation */}
                <motion.div
                  initial={{ opacity: 0, y: 10, x: 10 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 right-0 z-30"
                  style={{ transform: 'translate(10%, 10%)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 rounded-full shadow-lg flex items-center gap-0.5 sm:gap-1 border border-[#1F2937]"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
                    />
                    <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium whitespace-nowrap">Disponible</span>
                  </motion.div>
                </motion.div>

                {/* Photo avec halo pulsant */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(59,130,246,0.4)',
                      '0 0 0 15px rgba(59,130,246,0.2)',
                      '0 0 0 25px rgba(59,130,246,0)',
                      '0 0 0 0 rgba(59,130,246,0)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-[#1F2937] bg-[#141B2B]"
                >
                  <Image
                    src={profileImage}
                    alt="Abdoulaye Patawala"
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 280px, (max-width: 640px) 320px, (max-width: 768px) 350px, (max-width: 1024px) 384px, 448px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
                </motion.div>
              </motion.div>
            </div>

            {/* Texte à droite */}
            <div className="flex-1 flex flex-col text-center lg:text-left max-w-md px-3 sm:px-4 lg:px-0">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 text-white"
              >
                Abdoulaye Patawala
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg text-blue-400 font-medium mb-3 sm:mb-4 md:mb-5"
              >
                Votre interlocuteur unique
              </motion.p>

              {/* Texte d'expérience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-4 sm:mb-5 md:mb-6"
              >
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  Depuis 4 ans, je donne vie aux idées de ceux qui osent. 
                  <span className="block mt-1 sm:mt-2">Mon rôle ? Vous permettre de rester concentré sur votre métier 
                  pendant que je transforme votre vision en une réalité digitale qui vous ressemble.</span>
                </p>
              </motion.div>
              
              {/* Message rassurant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-blue-500/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 md:mb-6 lg:mb-7 border border-blue-500/20"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300">
                      <span className="font-semibold text-blue-400">Pas encore sûr de votre projet ?</span><br />
                      <span className="text-xs sm:text-sm md:text-base">Pas d'inquiétude. Je suis là pour vous guider, clarifier vos idées et vous proposer ce qui vous correspond vraiment.</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* BOUTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  onClick={handleParlerProjet}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto"
                >
                  Parler de mon projet
                  <MessageSquare size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </motion.button>
                
                <motion.button
                  onClick={handleVoirOffres}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold text-xs sm:text-sm md:text-base lg:text-lg border-2 border-gray-600 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/5 transition-colors w-full sm:w-auto"
                >
                  Voir mes offres
                </motion.button>
              </motion.div>

              {/* Micro-CTA - Sans fond sur mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex justify-center w-full mt-4 sm:mt-5 md:mt-6"
              >
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center px-0 py-0 sm:px-4 sm:py-2 sm:rounded-full sm:shadow-lg sm:border sm:border-[#1F2937] sm:bg-[#141B2B]/80 sm:backdrop-blur-sm">
                  <CheckCircle size={10} className="sm:w-3 sm:h-3 text-blue-400" />
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-400 sm:text-gray-300 whitespace-nowrap">Devis gratuit</span>
                  <span className="text-gray-600 hidden xs:inline">•</span>
                  <CheckCircle size={10} className="sm:w-3 sm:h-3 text-blue-400 xs:ml-0 ml-1" />
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-400 sm:text-gray-300 whitespace-nowrap">Réponse sous 24h</span>
                  <span className="text-gray-600 hidden xs:inline">•</span>
                  <CheckCircle size={10} className="sm:w-3 sm:h-3 text-blue-400 xs:ml-0 ml-1" />
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-400 sm:text-gray-300 whitespace-nowrap">Sans engagement</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}