'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

// Type simplifié pour éviter les erreurs
type NavItem = {
  readonly key: string;
  readonly href: string;
  readonly section?: string;
};

// Configuration memoized pour éviter les re-rendus
const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/', section: 'hero' },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/#about', section: 'about' },
  { key: 'projects', href: '/#projets', section: 'projets' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/#contact', section: 'contact' }
] as const;

export default function Navigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Détection des sections
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

  // Fermeture au clic outside
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

  const isLinkActive = useCallback((item: NavItem) => {
    if (pathname === '/') {
      if (item.section) return activeSection === item.section;
      if (item.key === 'home') return activeSection === 'hero';
    }
    return pathname === item.href;
  }, [pathname, activeSection]);

  // Gestion du clic sur les ancres
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setActiveSection(targetId);
      }
      setIsOpen(false);
    }
    // Pour les autres liens, Link gère la navigation
  };

  const navItems = NAV_ITEMS;

  return (
    <>
      <nav
        className="fixed w-full z-50 top-0 lg:top-4 font-sans"
        ref={menuRef}
        aria-label="Navigation principale"
      >
        <div className="lg:container lg:mx-auto lg:px-6">
          {/* Sur mobile: fond collé, sur desktop: container avec bords arrondis */}
          <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-2 lg:py-3 px-4 lg:px-8 shadow-lg">
            <div className="flex justify-between items-center">
              {/* Logo avec Link */}
              <Link 
                href="/"
                className="flex items-center font-bold group"
                aria-label={t('logo', 'navigation')}
                onClick={() => setIsOpen(false)}
              >
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl sm:text-2xl italic drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]">
                  <span className="hidden sm:inline">Abdoulaye Patawala</span>
                  <span className="sm:hidden">Patawala</span>
                </span>
              </Link>

              {/* Desktop Navigation - Sans sous-menus */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex items-center gap-6">
                  {navItems.map((item) => {
                    const itemLabel = t(`navItems.${item.key}`, 'navigation') || item.key;
                    const isActive = isLinkActive(item);
                    
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e as any, item.href)}
                        className={`text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-blue-400'
                            : 'text-gray-300 hover:text-blue-400'
                        }`}
                      >
                        {itemLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Language Switcher et Menu Mobile */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                
                {/* BOUTON HAMBURGER - SIMPLE SANS FOND */}
                <button
                  ref={menuButtonRef}
                  className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-blue-400 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                  {isOpen ? 
                    <X className="w-6 h-6" /> : 
                    <Menu className="w-6 h-6" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU - Version floue avec gros liens blancs ET CROIX */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 bg-[#0A0F1C]/95 backdrop-blur-xl z-40 overflow-y-auto">
            {/* Bouton de fermeture X en haut à droite */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/70 hover:text-blue-400 transition-colors z-50"
              aria-label="Fermer le menu"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
              {navItems.map((item) => {
                const itemLabel = t(`navItems.${item.key}`, 'navigation') || item.key;
                const isActive = isLinkActive(item);
                
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.includes('#') && pathname === '/') {
                        e.preventDefault();
                        const targetId = item.href.replace('/#', '');
                        const element = document.getElementById(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(null, '', item.href);
                          setActiveSection(targetId);
                        }
                      }
                      setIsOpen(false);
                    }}
                    className={`w-full text-center py-6 text-3xl font-bold tracking-tight transition-colors ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-white/90 hover:text-blue-400'
                    }`}
                  >
                    {itemLabel}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
      
      <div id="main-content" tabIndex={-1} className="outline-none" />
    </>
  );
}