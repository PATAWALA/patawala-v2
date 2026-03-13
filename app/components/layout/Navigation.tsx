'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTranslation } from '@/app/hooks/useTranslation';
import { usePathname, useRouter } from 'next/navigation';

// Configuration des items de navigation - STATIQUE
const NAV_ITEMS = [
  { key: 'home', href: '/', label: 'Accueil' },
  { key: 'services', href: '/services', label: 'Services' },
  { key: 'about', href: '/#about', label: 'À propos' },
  { key: 'projects', href: '/#projets', label: 'Projets' },
  { key: 'blog', href: '/blog', label: 'Blog' },
  { key: 'contact', href: '/#contact', label: 'Contact' }
] as const;

export default function Navigation() {
  const { t, language, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Détection des sections pour la page d'accueil
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'about', 'projets', 'contact'];
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [pathname]);

  // Fermeture du menu mobile au clic outside
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

  // Gestion du scroll vers une section
  const scrollToSection = useCallback((sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        });
      }
    }, 100);
  }, []);

  // Navigation forcée - SOLUTION
  const handleNavigation = useCallback((href: string) => {
    setIsOpen(false);
    
    // Pour les ancres sur la page d'accueil
    if (href.includes('#') && pathname === '/') {
      const sectionId = href.replace('/#', '');
      scrollToSection(sectionId);
      setActiveSection(sectionId);
      window.history.pushState(null, '', href);
    } 
    // Pour les ancres depuis une autre page
    else if (href.includes('#')) {
      window.location.href = '/';
      setTimeout(() => {
        const sectionId = href.replace('/#', '');
        scrollToSection(sectionId);
      }, 300);
    }
    // Pour les pages normales (services, blog, home) - FORCER LE RECHARGEMENT
    else {
      window.location.href = href;
    }
  }, [pathname, scrollToSection]);

  // Déterminer si un lien est actif
  const isLinkActive = useCallback((href: string) => {
    if (pathname === '/') {
      if (href === '/') return activeSection === 'hero';
      if (href.includes('#')) {
        const sectionId = href.replace('/#', '');
        return activeSection === sectionId;
      }
    }
    return pathname === href;
  }, [pathname, activeSection]);

  // SKELETON LOADER
  if (isLoading) {
    return (
      <nav className="fixed w-full z-50 top-0 lg:top-4 font-sans">
        <div className="lg:container lg:mx-auto lg:px-6">
          <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-2 lg:py-3 px-4 lg:px-8 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-gray-800/50 rounded animate-pulse" />
              <div className="hidden lg:flex items-center gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
      aria-label="Navigation principale"
    >
      <div className="lg:container lg:mx-auto lg:px-6">
        <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-2 lg:py-3 px-4 lg:px-8 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center font-bold group"
              aria-label={t('logo', 'navigation')}
            >
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl sm:text-2xl italic drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]">
                <span className="hidden sm:inline">Abdoulaye Patawala</span>
                <span className="sm:hidden">Patawala</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center gap-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = isLinkActive(item.href);
                  
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.href);
                      }}
                      className={`text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'text-blue-400'
                          : 'text-gray-300 hover:text-blue-400'
                      }`}
                    >
                      {t(`navItems.${item.key}`, 'navigation') || item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Language Switcher et Menu Mobile */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              
              {/* Bouton Hamburger */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Fond blanc transparent et flou */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-white/30 backdrop-blur-xl z-40 overflow-y-auto">
          {/* Bouton de fermeture */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-800 hover:text-blue-600 transition-colors z-50"
            aria-label="Fermer le menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
            {NAV_ITEMS.map((item) => {
              const isActive = isLinkActive(item.href);
              
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className={`w-full text-center py-6 text-3xl font-bold tracking-tight transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-800 hover:text-blue-600'
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