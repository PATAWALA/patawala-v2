'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import {
  Sparkles, CheckCircle, MessageCircle, Phone,
  Mail, MapPin, Heart, Smartphone, Send, Clock,
  Instagram, Linkedin, Twitter, Github, Facebook
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/app/hooks/useTranslation';

interface ContactInfo {
  whatsapp: [string, string];
  calls: [string, string];
  emergency: [string, string];
  email: string;
  location: string;
}

const DEFAULT_CONTACT_INFO_FR: ContactInfo = {
  whatsapp: ['22962278090', '+229 62 27 80 90'],
  calls: ['22962278090', '+229 62 27 80 90'],
  emergency: ['22946495875', '+229 46 49 58 75'],
  email: 'patawalaabdoulaye2003@gmail.com',
  location: 'Cotonou, Bénin'
};

const DEFAULT_CONTACT_INFO_EN: ContactInfo = {
  whatsapp: ['22962278090', '+229 62 27 80 90'],
  calls: ['22962278090', '+229 62 27 80 90'],
  emergency: ['22946495875', '+229 46 49 58 75'],
  email: 'patawalaabdoulaye2003@gmail.com',
  location: 'Cotonou, Benin'
};

const SOCIAL_LINKS = [
  { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/22962278090', color: 'hover:bg-green-500/20', username: '@patawala' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/patawalaabdoulaye1900', color: 'hover:bg-pink-500/20', username: '@patawala' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/abdoulaye-patawala-84b138381/', color: 'hover:bg-blue-600/20', username: 'Abdoulaye P.' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/AbdoulayeP79682', color: 'hover:bg-blue-400/20', username: '@AbdoulayeP' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/PATAWALA', color: 'hover:bg-gray-500/20', username: 'PATAWALA' },
  { name: 'Facebook', icon: Facebook, url: 'https://web.facebook.com/Patawala', color: 'hover:bg-blue-700/20', username: 'Patawala' },
];

const CTASection = memo(function CTASection() {
  const { t, language, isLoading } = useTranslation();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT_INFO_FR);
  const [isReady, setIsReady] = useState(false);

  const lightPoints = [
    { left: '15%', top: '25%' },
    { left: '75%', top: '60%' }
  ];

  useEffect(() => {
    if (!isLoading) setIsReady(true);
  }, [isLoading]);

  useEffect(() => {
    if (!isReady) return;
    try {
      const defaultInfo = language === 'fr' ? DEFAULT_CONTACT_INFO_FR : DEFAULT_CONTACT_INFO_EN;
      setContactInfo({
        whatsapp: ['22962278090', t('contactInfo.whatsapp', 'contact') || defaultInfo.whatsapp[1]],
        calls: ['22962278090', t('contactInfo.calls', 'contact') || defaultInfo.calls[1]],
        emergency: ['22946495875', t('contactInfo.emergency', 'contact') || defaultInfo.emergency[1]],
        email: t('contactInfo.email', 'contact') || defaultInfo.email,
        location: t('contactInfo.location', 'contact') || defaultInfo.location
      });
    } catch {
      setContactInfo(language === 'fr' ? DEFAULT_CONTACT_INFO_FR : DEFAULT_CONTACT_INFO_EN);
    }
  }, [t, language, isReady]);

  const handleDirectWhatsApp = useCallback(() => window.open('https://wa.me/22962278090', '_blank'), []);

  const handleCopy = useCallback((text: string, displayText: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(displayText);
    setShowCopyAlert(true);
    setTimeout(() => {
      setShowCopyAlert(false);
      setTimeout(() => setCopiedText(null), 300);
    }, 2000);
  }, []);

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  if (isLoading || !isReady) {
    return (
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-full flex justify-center mb-6">
              <div className="w-32 h-8 bg-surface rounded-full animate-pulse" />
            </div>
            <div className="w-48 h-8 bg-surface rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-64 h-6 bg-surface rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="w-96 h-4 bg-surface rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {[1, 2].map((i) => (
              <div key={i} className="bg-surface rounded-xl border border-border p-6">
                <div className="w-32 h-6 bg-border rounded mb-4 animate-pulse" />
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex flex-col sm:flex-row gap-2 p-3 bg-border/30 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-border rounded-full animate-pulse" />
                        <div className="flex-1">
                          <div className="w-16 h-3 bg-border rounded mb-2 animate-pulse" />
                          <div className="w-24 h-4 bg-border rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <div className="flex-1 sm:w-16 h-8 bg-border rounded-lg animate-pulse" />
                        <div className="flex-1 sm:w-16 h-8 bg-border rounded-lg animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-32 h-12 bg-border rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {showCopyAlert && (
        <motion.div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <CheckCircle size={18} />
          <span className="text-sm font-bold">{copiedText} ✓</span>
        </motion.div>
      )}

      <section id="contact" className="py-16 md:py-24 bg-background relative overflow-hidden" aria-labelledby="contact-title">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-40 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden="true"
          />
          {lightPoints.map((point, i) => (
            <div key={i} className="absolute w-1 h-1 bg-primary/10 rounded-full" style={{ left: point.left, top: point.top }} aria-hidden="true" />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.div
              className="w-full flex justify-center mb-6 md:mb-8"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs sm:text-sm font-bold text-primary tracking-tight">
                  {t('badge', 'contact')}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.h2
                id="contact-title"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 px-4 text-foreground leading-tight tracking-tight"
                variants={fadeInUp}
              >
                <span>{t('title', 'contact')}</span>
                <span className="block text-gradient-gold mt-2 font-black tracking-tight">
                  {t('titleHighlight', 'contact')}
                </span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-muted mb-6 md:mb-8 max-w-2xl mx-auto px-4 font-medium"
                variants={fadeInUp}
              >
                {t('subtitle', 'contact')}
              </motion.p>
            </motion.div>
          </div>

          {/* Contact Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {/* Direct Contact Card */}
            <motion.div
              className="bg-surface rounded-xl border border-border p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 shadow-lg"
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2 tracking-tight">
                <Phone size={18} className="text-primary" />
                <span>{t('contactCards.direct.title', 'contact')}</span>
              </h3>

              <div className="space-y-3">
                {/* Appels */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-background rounded-lg gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Smartphone size={16} className="text-primary" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-muted font-medium">{t('contactCards.direct.calls', 'contact')}</p>
                      <p className="text-sm text-foreground font-bold truncate tracking-tight">{contactInfo.calls[1]}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${contactInfo.calls[0]}`}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors text-xs text-primary font-bold text-center tracking-tight"
                    >
                      {language === 'fr' ? 'Appeler' : 'Call'}
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.calls[0], contactInfo.calls[1])}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors text-xs text-primary font-bold tracking-tight"
                    >
                      {t('buttons.copy', 'contact')}
                    </button>
                  </div>
                </div>

                {/* Urgence */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20 gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-red-400" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-red-400 font-bold tracking-tight">{t('contactCards.direct.emergency', 'contact')}</p>
                      <p className="text-sm text-foreground font-black truncate tracking-tight">{contactInfo.emergency[1]}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${contactInfo.emergency[0]}`}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-xs text-red-400 font-bold text-center tracking-tight"
                    >
                      {language === 'fr' ? 'Appeler' : 'Call'}
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.emergency[0], contactInfo.emergency[1])}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors text-xs text-red-400 font-bold tracking-tight"
                    >
                      {t('buttons.copy', 'contact')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              className="bg-surface rounded-xl border border-border p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 shadow-lg"
              variants={fadeInUp}
              whileHover="hover"
            >
              <h3 className="text-lg font-extrabold text-foreground mb-4 flex items-center gap-2 tracking-tight">
                <Mail size={18} className="text-primary" />
                <span>{t('contactCards.info.title', 'contact')}</span>
              </h3>

              <div className="space-y-3">
                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-background rounded-lg gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-primary" />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-xs text-muted font-medium">{t('contactCards.info.email', 'contact')}</p>
                      <p className="text-sm text-foreground font-bold truncate tracking-tight">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                    >
                      <Send size={14} className="text-primary" />
                      <span className="text-xs text-primary font-bold sm:hidden tracking-tight">Email</span>
                    </a>
                    <button
                      onClick={() => handleCopy(contactInfo.email, contactInfo.email)}
                      className="flex-1 sm:flex-initial px-3 py-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors text-xs text-primary font-bold tracking-tight"
                    >
                      {t('buttons.copy', 'contact')}
                    </button>
                  </div>
                </div>

                {/* Localisation */}
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-secondary" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-muted font-medium">{t('contactCards.info.location', 'contact')}</p>
                    <p className="text-sm text-foreground font-bold truncate tracking-tight">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Buttons – uniquement WhatsApp et disponibilité */}
          <motion.div
            className="max-w-2xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-center mb-6">
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={12} className="text-primary" />
                  <span className="text-xs text-muted sm:text-sm font-medium">{t('guarantees.firstExchange', 'contact')}</span>
                </div>
                <span className="text-border hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-primary" />
                  <span className="text-xs text-muted sm:text-sm font-medium">{t('guarantees.free30min', 'contact')}</span>
                </div>
                <span className="text-border hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Heart size={12} className="text-primary" />
                  <span className="text-xs text-muted sm:text-sm font-medium">{t('guarantees.noCommitment', 'contact')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 px-4">
              <motion.button
                onClick={handleDirectWhatsApp}
                className="group bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl w-full max-w-xs sm:w-auto min-h-[44px] active:scale-[0.98] tracking-tight"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={18} />
                <span>{t('buttons.whatsapp', 'contact')}</span>
              </motion.button>
            </div>

            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-surface rounded-xl border border-border shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm sm:text-base text-foreground font-semibold">{t('availability.thisWeek', 'contact')}</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-primary tracking-tight">
                2 {t('availability.slots', 'contact')}
              </span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="max-w-4xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.h3
              className="text-center text-lg font-extrabold text-foreground mb-6 flex items-center justify-center gap-2 tracking-tight"
              variants={fadeInUp}
            >
              <Heart size={18} className="text-primary" />
              <span>{t('social.title', 'contact')}</span>
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 p-3 bg-surface rounded-lg border border-border ${social.color} transition-all duration-300 hover:scale-105 group`}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                >
                  <social.icon size={18} className="text-muted group-hover:text-foreground transition-colors flex-shrink-0" />
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs text-muted font-medium">{social.name}</p>
                    <p className="text-xs text-foreground font-bold truncate tracking-tight">{social.username}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
});

CTASection.displayName = 'CTASection';
export default CTASection;