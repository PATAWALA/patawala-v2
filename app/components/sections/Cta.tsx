'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Calendar, Sparkles, CheckCircle, MessageCircle, Phone,
  Mail, MapPin, Heart, Smartphone, Send, Clock,
  Instagram, Linkedin, Twitter, Github, Facebook
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/app/context/LanguageContext';

// Import dynamique de BookingModal (chargé uniquement à l'ouverture)
const BookingModal = dynamic(() => import('../ui/BookingModal'), { ssr: false });

// Interface pour typer les informations de contact
interface ContactInfo {
  whatsapp: [string, string];
  calls: [string, string];
  emergency: [string, string];
  email: string;
  location: string;
}

const CTASection = memo(function CTASection() {
  const { t } = useLanguage(); // ← PLUS DE isLoading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Points lumineux statiques - RÉDUITS À 2 SEULEMENT
  const lightPoints = [
  { left: '15%', top: '25%' },
  { left: '75%', top: '60%' }
];

  // Récupération des informations de contact - MÉMOÏSÉES
  const contactInfo: ContactInfo = {
    whatsapp: [
      '22962278090',
      t('contactInfo.whatsapp', 'contact') || '+229 62 27 80 90'
    ],
    calls: [
      '22962278090',
      t('contactInfo.calls', 'contact') || '+229 62 27 80 90'
    ],
    emergency: [
      '22946495875',
      t('contactInfo.emergency', 'contact') || '+229 46 49 58 75'
    ],
    email: t('contactInfo.email', 'contact') || 'patawalaabdoulaye2003@gmail.com',
    location: t('contactInfo.location', 'contact') || 'Cotonou, Benin'
  };

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleDirectWhatsApp = useCallback(() => {
    window.open('https://wa.me/22962278090', '_blank');
  }, []);

  const handleWhatsAppClick = useCallback((phoneNumber: string) => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
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

  // Social links - STATIQUES
  const socialLinks = [
    { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/22962278090', color: 'hover:bg-green-500/20', username: '+229 62 27 80 90' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/patawalaabdoulaye1900', color: 'hover:bg-pink-500/20', username: '@patawala' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/abdoulaye-patawala-84b138381/', color: 'hover:bg-blue-600/20', username: 'Abdoulaye P.' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/AbdoulayeP79682', color: 'hover:bg-blue-400/20', username: '@AbdoulayeP' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/PATAWALA', color: 'hover:bg-gray-500/20', username: 'PATAWALA' },
    { name: 'Facebook', icon: Facebook, url: 'https://web.facebook.com/Patawala', color: 'hover:bg-blue-700/20', username: 'Patawala' },
  ];

  return (
    <>
      <section id="contact" className="py-16 md:py-24 bg-[#0A0F1C] relative overflow-hidden" aria-labelledby="contact-title">

        {/* Alert de copie - SIMPLE */}
        {showCopyAlert && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <CheckCircle size={18} aria-hidden="true" />
            <span className="text-sm font-bold tracking-tight">{copiedText} ✓</span>
          </div>
        )}

        {/* FOND ULTRA-OPTIMISÉ */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          {/* Lignes répétitives - UNE SEULE COUCHE, OPACITÉ RÉDUITE */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />

          {/* Cercles flous - 2 SEULEMENT */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

          {/* Points lumineux - 2 SEULEMENT */}
          {lightPoints.map((point, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
              style={{ left: point.left, top: point.top }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-full flex justify-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                <Sparkles size={14} className="text-blue-400" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-bold text-blue-400 tracking-tight">
                  {t('badge', 'contact')}
                </span>
              </div>
            </div>

            <h2 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 px-4 text-white leading-tight tracking-tight">
              <span>
                {t('title', 'contact')}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2 font-black tracking-tight">
                {t('titleHighlight', 'contact')}
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto px-4 font-medium">
              {t('subtitle', 'contact')}
            </p>
          </div>

          {/* Contact Cards - OPTIMISÉES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {/* Direct Contact Card */}
            <div className="bg-[#141B2B] rounded-xl border border-[#1F2937] p-4 sm:p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
              <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2 tracking-tight">
                <Phone size={18} className="text-blue-400" aria-hidden="true" />
                <span>
                  {t('contactCards.direct.title', 'contact')}
                </span>
              </h3>

              <div className="space-y-3">
                {/* WhatsApp */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-[#1F2937] rounded-lg gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={16} className="text-green-400" aria-hidden="true" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-medium">
                        {t('contactCards.direct.whatsapp', 'contact')}
                      </p>
                      <p className="text-sm text-white font-bold truncate tracking-tight">{contactInfo.whatsapp[1]}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWhatsAppClick(contactInfo.whatsapp[0])}
                    className="w-full sm:w-auto px-4 py-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors text-sm text-green-400 font-bold flex items-center justify-center gap-2 tracking-tight"
                    aria-label={`WhatsApp ${contactInfo.whatsapp[1]}`}
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {/* Appels */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-[#1F2937] rounded-lg gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone size={16} className="text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-medium">
                        {t('contactCards.direct.calls', 'contact')}
                      </p>
                      <p className="text-sm text-white font-bold truncate tracking-tight">{contactInfo.calls[1]}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${contactInfo.calls[0]}`}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors text-xs text-blue-400 font-bold text-center tracking-tight"
                      aria-label={`Appeler ${contactInfo.calls[1]}`}
                    >
                      Appeler
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.calls[0], contactInfo.calls[1])}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors text-xs text-blue-400 font-bold tracking-tight"
                      aria-label={`Copier ${contactInfo.calls[1]}`}
                    >
                      <span>
                        {t('buttons.copy', 'contact')}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Urgence */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20 gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-red-400" aria-hidden="true" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-red-400 font-bold tracking-tight">
                        {t('contactCards.direct.emergency', 'contact')}
                      </p>
                      <p className="text-sm text-white font-black truncate tracking-tight">{contactInfo.emergency[1]}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${contactInfo.emergency[0]}`}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-xs text-red-400 font-bold text-center tracking-tight"
                      aria-label={`Appeler urgence ${contactInfo.emergency[1]}`}
                    >
                      Appeler
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.emergency[0], contactInfo.emergency[1])}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-xs text-red-400 font-bold tracking-tight"
                      aria-label={`Copier ${contactInfo.emergency[1]}`}
                    >
                      <span>
                        {t('buttons.copy', 'contact')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#141B2B] rounded-xl border border-[#1F2937] p-4 sm:p-6 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
              <h3 className="text-lg font-extrabold text-white mb-4 flex items-center gap-2 tracking-tight">
                <Mail size={18} className="text-blue-400" aria-hidden="true" />
                <span>
                  {t('contactCards.info.title', 'contact')}
                </span>
              </h3>

              <div className="space-y-3">
                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-[#1F2937] rounded-lg gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-medium">
                        {t('contactCards.info.email', 'contact')}
                      </p>
                      <p className="text-sm text-white font-bold truncate tracking-tight">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1"
                      aria-label={`Envoyer un email à ${contactInfo.email}`}
                    >
                      <Send size={14} className="text-blue-400" aria-hidden="true" />
                      <span className="text-xs text-blue-400 font-bold sm:hidden tracking-tight">Email</span>
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.email, contactInfo.email)}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors text-xs text-blue-400 font-bold tracking-tight"
                      aria-label={`Copier l'adresse email`}
                    >
                      <span>
                        {t('buttons.copy', 'contact')}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-center gap-3 p-3 bg-[#1F2937] rounded-lg">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-cyan-400" aria-hidden="true" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-gray-400 font-medium">
                      {t('contactCards.info.location', 'contact')}
                    </p>
                    <p className="text-sm text-white font-bold truncate tracking-tight">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links - OPTIMISÉS */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-center text-lg font-extrabold text-white mb-6 flex items-center justify-center gap-2 tracking-tight">
              <Heart size={18} className="text-blue-400" aria-hidden="true" />
              <span>
                {t('social.title', 'contact')}
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-3 bg-[#141B2B] rounded-lg border border-[#1F2937] ${social.color} transition-all duration-300 hover:scale-105 group`}
                  aria-label={`${social.name} (s'ouvre dans un nouvel onglet)`}
                >
                  <social.icon size={18} className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs text-gray-400 font-medium">
                      {social.name}
                    </p>
                    <p className="text-xs text-white font-bold truncate tracking-tight">{social.username}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons - OPTIMISÉS */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs text-gray-300 sm:text-sm font-medium">
                    {t('guarantees.firstExchange', 'contact')}
                  </span>
                </div>
                <span className="text-gray-600 hidden sm:inline" aria-hidden="true">•</span>

                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs text-gray-300 sm:text-sm font-medium">
                    {t('guarantees.free30min', 'contact')}
                  </span>
                </div>
                <span className="text-gray-600 hidden sm:inline" aria-hidden="true">•</span>

                <div className="flex items-center gap-1.5">
                  <Heart size={12} className="sm:w-3.5 sm:h-3.5 text-blue-400" aria-hidden="true" />
                  <span className="text-xs text-gray-300 sm:text-sm font-medium">
                    {t('guarantees.noCommitment', 'contact')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 px-4">
              <button
                onClick={handleDirectWhatsApp}
                className="group bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-xs sm:w-auto min-h-[44px] active:scale-[0.98] tracking-tight"
                aria-label="Ouvrir WhatsApp direct"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
                <span>
                  {t('buttons.whatsapp', 'contact')}
                </span>
              </button>

              <button
                onClick={handleOpenModal}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-xs sm:w-auto min-h-[44px] active:scale-[0.98] tracking-tight"
                aria-label="Planifier un rendez-vous"
              >
                <Calendar size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
                <span>
                  {t('buttons.schedule', 'contact')}
                </span>
              </button>
            </div>

            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm sm:text-base text-gray-200 font-semibold">
                  {t('availability.thisWeek', 'contact')}
                </span>
              </div>
              <span className="text-lg sm:text-xl font-black text-blue-400 tracking-tight">
                2 {t('availability.slots', 'contact')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;