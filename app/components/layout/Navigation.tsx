'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTranslation } from '@/app/hooks/useTranslation';

const NAV_ITEMS = [
  { key: 'home', href: '/', label: 'Accueil' },
  { key: 'services', href: '/services', label: 'Services' },
  { key: 'expertise', href: '/#techexpertise', label: 'Expertise' },
  { key: 'about', href: '/#about', label: 'À propos' },
  { key: 'projects', href: '/#projets', label: 'Projets' },
  { key: 'blog', href: '/blog', label: 'Blog' },
  { key: 'contact', href: '/#contact', label: 'Contact' }
] as const;

export default function Navigation() {
  const { t, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Détection des sections sur la page d'accueil
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'techexpertise', 'about', 'projets', 'contact'];
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [pathname]);

  // Fermeture du menu mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Scroll vers une section
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const sectionId = href.replace('/#', '');
    
    if (pathname === '/') {
      scrollToSection(sectionId);
      setActiveSection(sectionId);
    } else {
      window.location.href = '/';
      setTimeout(() => scrollToSection(sectionId), 300);
    }
  };

  // Déterminer si un lien est actif
  const isLinkActive = (href: string) => {
    if (pathname === '/') {
      if (href === '/') return activeSection === 'hero';
      if (href.includes('#')) {
        const sectionId = href.replace('/#', '');
        return activeSection === sectionId;
      }
    }
    return pathname === href;
  };

  if (isLoading) {
    return (
      <nav className="fixed w-full z-50 top-0 lg:top-4 font-sans">
        <div className="lg:container lg:mx-auto lg:px-6">
          <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-2 lg:py-3 px-4 lg:px-8 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-gray-800/50 rounded animate-pulse" />
              <div className="hidden lg:flex items-center gap-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-4 w-16 bg-gray-800/50 rounded animate-pulse" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-16 bg-gray-800/50 rounded-full animate-pulse" />
                <div className="h-8 w-8 bg-gray-800/50 rounded-full animate-pulse lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={menuRef}
      className="fixed w-full z-50 top-0 lg:top-4 font-sans"
    >
      <div className="lg:container lg:mx-auto lg:px-6">
        <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-2 lg:py-3 px-4 lg:px-8 shadow-lg">
          {/* Structure avec flex pour un contrôle total */}
          <div className="flex items-center justify-between">
            {/* Logo à gauche */}
            <div className="flex items-center">
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
                className="flex items-center font-bold group py-1"
              >
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl sm:text-2xl italic">
                  <span className="hidden sm:inline">Abdoulaye Patawala</span>
                  <span className="sm:hidden">Patawala</span>
                </span>
              </a>
            </div>

            {/* Liens Desktop - Centrés */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center gap-6">
                {NAV_ITEMS.map((item) => {
                  const active = isLinkActive(item.href);
                  
                  if (item.href.includes('#')) {
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap py-1 ${
                          active ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                        }`}
                      >
                        {t(`navItems.${item.key}`, 'navigation') || item.label}
                      </a>
                    );
                  }
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = item.href;
                      }}
                      className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap py-1 ${
                        active ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                      }`}
                    >
                      {t(`navItems.${item.key}`, 'navigation') || item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Language Switcher à droite (uniquement sur desktop) */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Version mobile : Logo à gauche, Hamburger à droite */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <div className="flex items-center">
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/';
                  }}
                  className="flex items-center font-bold group py-1"
                >
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl sm:text-2xl italic">
                    <span className="sm:hidden">Patawala</span>
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <button
                  className="flex items-center justify-center w-10 h-10 text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - OVERLAY COMPLET */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white/20 backdrop-blur-2xl z-40 overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-cyan-400 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);
              
              if (item.href.includes('#')) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      handleAnchorClick(e, item.href);
                      setIsOpen(false);
                    }}
                    className={`w-full text-center py-6 text-3xl font-bold tracking-tight transition-colors ${
                      active ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                    }`}
                  >
                    {t(`navItems.${item.key}`, 'navigation') || item.label}
                  </a>
                );
              }
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    window.location.href = item.href;
                  }}
                  className={`w-full text-center py-6 text-3xl font-bold tracking-tight transition-colors ${
                    active ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
                  }`}
                >
                  {t(`navItems.${item.key}`, 'navigation') || item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}