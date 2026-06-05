'use client';

import { memo, useCallback, useMemo } from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../lib/constants';
import { useTranslation } from '@/app/hooks/useTranslation';

const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, isLoading } = useTranslation();

  const quickLinks = useMemo(() => [
    { href: '/', key: 'home' },
    { href: '/projets', key: 'projects' },
    { href: '/services', key: 'services' },
    { href: '/blog', key: 'blog' },
  ], []);

  const legalLinks = useMemo(() => [
    { href: '/mentions-legales', key: 'privacy' },
    { href: '/confidentialite', key: 'privacy' },
    { href: '/cgu', key: 'terms' },
  ], []);

  const socialLinks = useMemo(() => [
    { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub', color: 'hover:bg-gray-700' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { href: SOCIAL_LINKS.twitter, icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
  ], []);

  const badges = useMemo(() => [
    { key: 'available', icon: Zap, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    { key: 'opensource', icon: Heart, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
    { key: 'remote', icon: Globe, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  ], []);

  const handleNavigation = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.href = href;
  }, []);

  // Variants Framer Motion
  const fadeInUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  if (isLoading) {
    return (
      <footer className="relative bg-background text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="md:col-span-2 lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <div className="w-48 h-8 bg-surface rounded animate-pulse" />
                <div className="w-32 h-4 bg-surface rounded animate-pulse" />
              </div>
              <div className="w-full h-16 bg-surface rounded animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-6 bg-surface rounded-full animate-pulse" />
                ))}
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-2">
              <div className="w-24 h-6 bg-surface rounded mb-6 animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-4 bg-surface rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-2">
              <div className="w-20 h-6 bg-surface rounded mb-6 animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-24 h-4 bg-surface rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-4 space-y-6">
              <div className="w-20 h-6 bg-surface rounded mb-6 animate-pulse" />
              <div className="w-full h-12 bg-surface rounded-xl animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 bg-surface rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-4 bg-background">
                <div className="w-4 h-4 bg-red-400/50 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-4 bg-surface rounded animate-pulse" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="relative bg-background text-white overflow-hidden"
      aria-label="Pied de page"
    >
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          aria-hidden="true"
        />
      </div>

      {/* Ligne supérieure dorée */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Colonne marque */}
          <motion.div className="md:col-span-2 lg:col-span-4 space-y-6" variants={fadeInUp}>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold italic text-gradient-gold">
                {t('brand', 'common')}
              </h2>
              <p className="text-sm text-muted">{t('role', 'footer')}</p>
            </div>
            <p className="text-muted leading-relaxed">{t('description', 'footer')}</p>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.span
                    key={badge.key}
                    className={`inline-flex items-center gap-1 px-3 py-1 ${badge.bg} ${badge.color} rounded-full text-sm border ${badge.border}`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {t(`badge.${badge.key}`, 'footer')}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div className="md:col-span-1 lg:col-span-2" variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              {t('quickLinks', 'footer')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-amber-400 rounded-full" aria-hidden="true" />
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="text-muted hover:text-foreground transition-colors duration-200 flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
                    aria-label={`${t(`navbar.${link.key}`, 'navigation')} - aller à la page`}
                  >
                    <motion.span
                      className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      whileHover={{ scale: 1.5 }}
                    />
                    {t(`navbar.${link.key}`, 'navigation')}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Légal */}
          <motion.div className="md:col-span-1 lg:col-span-2" variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              {t('legal', 'footer')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-secondary to-cyan-300 rounded-full" aria-hidden="true" />
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="text-muted hover:text-foreground transition-colors duration-200 flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background rounded"
                    aria-label={`${t(link.key, 'footer')} - lire les conditions`}
                  >
                    <motion.span
                      className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      whileHover={{ scale: 1.5 }}
                    />
                    {t(link.key, 'footer')}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="md:col-span-2 lg:col-span-4 space-y-6" variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              {t('contact', 'footer')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-amber-400 rounded-full" aria-hidden="true" />
            </h3>

            <div className="flex justify-center lg:justify-start">
              <motion.a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="p-2 bg-primary/20 rounded-lg"
                  whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
                >
                  <Mail size={20} className="text-primary" />
                </motion.div>
                <span className="text-foreground/80 group-hover:text-foreground transition-colors break-all">
                  {SOCIAL_LINKS.email}
                </span>
              </motion.a>
            </div>

            <div className="flex gap-3 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-surface rounded-xl hover:scale-110 transition-all duration-300 border border-border ${social.color} group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background`}
                    whileHover={{ y: -3 }}
                    aria-label={`${social.label} (s'ouvre dans un nouvel onglet)`}
                  >                     
                    <Icon size={20} className="text-muted group-hover:text-foreground" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Séparateur */}
        <motion.div
          className="relative my-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-background">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart size={18} className="text-red-400" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted order-2 md:order-1">
            &copy; {currentYear} Abdoulaye Patawala. {t('rights', 'footer')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;