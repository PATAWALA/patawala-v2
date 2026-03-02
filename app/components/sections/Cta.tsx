'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, CheckCircle, MessageSquare, Clock, Heart, Phone, Mail, Globe, MapPin, ChevronRight, Send, Smartphone, Instagram, Linkedin, Twitter, Github, Facebook, Youtube, MessageCircle } from 'lucide-react';
import BookingModal from '../ui/BookingModal';


// Version mémoïsée du composant
const CTASection = memo(function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

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

  const handleDirectWhatsApp = useCallback(() => {
    window.open('https://wa.me/22962278090', '_blank');
  }, []);

  const handleCopy = useCallback((text: string, displayText: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(displayText);
    setShowCopyAlert(true);
    setTimeout(() => {
      setShowCopyAlert(false);
      setTimeout(() => setCopiedText(null), 300);
    }, 2000);
  }, []);

  // Fonction pour formater le numéro d'urgence (spécial)
  const formatEmergencyNumber = (num: string) => {
    // Pour le numéro d'urgence 22946495875
    if (num === '22946495875') {
      return '+229 46 49 58 75';
    }
    return '+229 62 27 80 90';
  };

  // Coordonnées personnelles
  const contactInfo = {
    whatsapp: ['22962278090', '+229 62 27 80 90'],
    calls: ['22962278090', '+229 62 27 80 90'],
    emergency: ['22946495875', '+229 46 49 58 75'], // Numéro spécial
    email: 'patawalaabdoulaye2003@gmail.com',
    location: 'Cotonou, Bénin'
  };

  // Réseaux sociaux
  const socialLinks = [
    { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/22962278090', color: 'hover:bg-green-500/20', username: '+229 62 27 80 90', primary: true },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/patawalaabdoulaye1900', color: 'hover:bg-pink-500/20', username: 'Abdoulaye Patawala' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/abdoulaye-patawala-84b138381/', color: 'hover:bg-blue-600/20', username: 'Abdoulaye Patawala' },
    { name: 'Twitter/X', icon: Twitter, url: 'https://x.com/AbdoulayeP79682', color: 'hover:bg-blue-400/20', username: 'Abdoulaye Patawala' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/PATAWALA', color: 'hover:bg-gray-500/20', username: 'Abdoulaye Patawala' },
    { name: 'Facebook', icon: Facebook, url: 'https://web.facebook.com/Patawala', color: 'hover:bg-blue-700/20', username: 'Abdoulaye Patawala' },
  ];

  return (
    <>
      <section 
        id="contact" 
        className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden"
        aria-label="Section contact"
      >
        {/* ALERTE DE COPIE - Flottante */}
        <AnimatePresence>
          {showCopyAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
            >
              <CheckCircle size={18} />
              <span className="text-sm font-medium">
                {copiedText} a été copié !
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOND OPTIMISÉ */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 60px)`
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.03) 0px, rgba(6,182,212,0.03) 1px, transparent 1px, transparent 60px)`
          }} />
          
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl will-change-transform" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl will-change-transform" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl will-change-transform" />
          
          {lightPoints.map((point, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{ left: point.left, top: point.top }}
              aria-hidden="true"
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            
            {/* Badge */}
            <div className="w-full flex justify-center mb-6 md:mb-8">
              {isMounted ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                  <Sparkles size={14} className="text-blue-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium text-blue-400">
                    Tous mes contacts
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <span className="text-sm font-medium text-blue-400">Tous mes contacts</span>
                </div>
              )}
            </div>

            {/* Titre */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-4 text-white leading-tight">
              Restons en contact
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                Je suis à votre écoute
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Choisissez le moyen qui vous convient le mieux pour échanger. 
              WhatsApp, appel, email ou réseaux sociaux, je suis disponible.
            </p>
          </div>

          {/* Grille de contacts organisée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            
            {/* CARTE CONTACT DIRECT (WhatsApp + Appels) */}
            <div className="bg-[#141B2B] rounded-xl border border-[#1F2937] p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Phone size={18} className="text-blue-400" />
                Contact direct
              </h3>
              
              <div className="space-y-4">
                {/* WhatsApp avec bouton direct - SANS ICÔNE DE COPIE */}
                <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <MessageCircle size={16} className="text-green-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">WhatsApp</p>
                      <p className="text-sm text-white">{contactInfo.whatsapp[1]}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.whatsapp[0], contactInfo.whatsapp[1])}
                    className="px-3 py-1.5 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors text-xs text-green-400 font-medium"
                  >
                    Copier
                  </button>
                </div>

                {/* Appels - SANS ICÔNE DE COPIE */}
                <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Smartphone size={16} className="text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Appels / SMS</p>
                      <p className="text-sm text-white">{contactInfo.calls[1]}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.calls[0], contactInfo.calls[1])}
                    className="px-3 py-1.5 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors text-xs text-blue-400 font-medium"
                  >
                    Copier
                  </button>
                </div>

                {/* Urgence - CAS SPÉCIAL */}
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Phone size={16} className="text-red-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-red-400">Urgence / Projet urgent</p>
                      <p className="text-sm text-white font-medium">{formatEmergencyNumber(contactInfo.emergency[0])}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(contactInfo.emergency[0], formatEmergencyNumber(contactInfo.emergency[0]))}
                    className="px-3 py-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-xs text-red-400 font-medium"
                  >
                    Copier
                  </button>
                </div>
              </div>
            </div>

            {/* CARTE INFORMATIONS + EMAIL */}
            <div className="bg-[#141B2B] rounded-xl border border-[#1F2937] p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                Infos & Email
              </h3>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Mail size={16} className="text-blue-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm text-white truncate max-w-[150px] sm:max-w-[200px]">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                      aria-label="Envoyer un email"
                    >
                      <Send size={16} className="text-blue-400" />
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.email, contactInfo.email)}
                      className="px-3 py-1.5 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors text-xs text-blue-400 font-medium"
                    >
                      Copier
                    </button>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-center gap-3 p-3 bg-[#1F2937] rounded-lg">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <MapPin size={16} className="text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-400">Localisation</p>
                    <p className="text-sm text-white">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RÉSEAUX SOCIAUX */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-center text-lg font-semibold text-white mb-6 flex items-center justify-center gap-2">
              <Heart size={18} className="text-blue-400" />
              Suivez-moi sur les réseaux
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-3 bg-[#141B2B] rounded-lg border border-[#1F2937] ${social.color} transition-all duration-300 hover:scale-105 hover:border-opacity-50 group`}
                  aria-label={`Suivre sur ${social.name}`}
                >
                  <social.icon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs text-gray-400">{social.name}</p>
                    <p className="text-xs text-white truncate">{social.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* SECTION DES BOUTONS PRINCIPAUX */}
          <div className="max-w-2xl mx-auto text-center">
            {/* Garanties */}
            <div className="flex justify-center mb-6">
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

            {/* DEUX BOUTONS : WhatsApp direct + Calendrier */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 px-4">
              {/* Bouton WhatsApp direct */}
              <button
                onClick={handleDirectWhatsApp}
                className="group bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 w-full max-w-xs sm:w-auto min-h-[44px] active:scale-[0.98]"
                aria-label="Me contacter directement sur WhatsApp"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
                <span>WhatsApp direct</span>
              </button>

              {/* Bouton calendrier */}
              <button
                onClick={handleOpenModal}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 w-full max-w-xs sm:w-auto min-h-[44px] active:scale-[0.98]"
                aria-label="Planifier un rendez-vous"
              >
                <Calendar size={18} className="sm:w-5 sm:h-5 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                <span>Planifier un appel</span>
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
          </div>
        </div>
      </section>

      {/* Modal de réservation */}
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
});

export default CTASection;