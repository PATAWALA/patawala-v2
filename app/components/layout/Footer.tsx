'use client';

import { Github, Linkedin, Twitter, Mail, Sparkles, Heart, Zap, Globe } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';
import Link from 'next/link';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { href: '/', key: 'home' },
    { href: '/projets', key: 'projects' },
    { href: '/services', key: 'services' },
    { href: '/blog', key: 'blog' },
  ];

  const legalLinks = [
    { href: '/mentions-legales', key: 'legal' },
    { href: '/confidentialite', key: 'privacy' },
    { href: '/cgu', key: 'terms' },
  ];

  const techStack = [
    { name: 'TypeScript', color: 'text-blue-400' },
    { name: 'Next.js 14', color: 'text-white' },
    { name: 'Tailwind CSS', color: 'text-cyan-400' },
    { name: 'Framer Motion', color: 'text-purple-400' },
  ];

  const socialLinks = [
    { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub', color: 'hover:bg-gray-700' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { href: SOCIAL_LINKS.twitter, icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0F1C] to-[#030614] text-white overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000" />
        
        {/* Grille de fond */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Ligne de séparation lumineuse */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Colonne marque */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-60" />
                <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={24} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {t('brand', 'common')}
                </h2>
                <p className="text-sm text-gray-500">{t('role', 'footer')}</p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed">
              {t('description', 'footer')}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                <Zap size={14} />
                {t('badge.available', 'footer')}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
                <Heart size={14} />
                {t('badge.opensource', 'footer')}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/20">
                <Globe size={14} />
                {t('badge.remote', 'footer')}
              </span>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              {t('quickLinks', 'footer')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(`navbar.${link.key}`, 'common')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              {t('legal', 'footer')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {t(`${link.key}`, 'footer')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              {t('contact', 'footer')}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </h3>
            
            {/* Email */}
            <div className="flex justify-center lg:justify-start">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group w-full sm:w-auto"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-blue-400" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors break-all">
                  {SOCIAL_LINKS.email}
                </span>
              </a>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3 justify-center lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800/50 rounded-xl hover:scale-110 transition-all duration-300 border border-gray-700/50 ${social.color} group`}
                    aria-label={social.label}
                  >
                    <Icon size={20} className="text-gray-300 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-[#0A0F1C]">
              <Heart size={18} className="text-red-400" />
            </div>
          </div>
        </div>

        {/* Copyright et technologies */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-gray-500 order-2 md:order-1">
            &copy; {currentYear} Patawala. {t('rights', 'footer')}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
}