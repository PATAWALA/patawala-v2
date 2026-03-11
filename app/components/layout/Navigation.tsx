'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown, Globe, Smartphone, Palette, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';

// Type simplifié pour éviter les erreurs
type NavItem = {
  readonly key: string;
  readonly href: string;
  readonly section?: string;
  readonly submenu?: readonly {
    readonly key: string;
    readonly href: string;
    readonly icon: React.ElementType;
    readonly category: string;
  }[];
};

// Configuration memoized pour éviter les re-rendus
const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', href: '/', section: 'hero' },
  { 
    key: 'services', 
    href: '/services',
    submenu: [
      { key: 'web', href: '/services#web', icon: Globe, category: 'web' },
      { key: 'mobile', href: '/services#mobile', icon: Smartphone, category: 'mobile' },
      { key: 'design', href: '/services#design', icon: Palette, category: 'design' },
      { key: 'consulting', href: '/services#consulting', icon: TrendingUp, category: 'consulting' },
    ]
  },
  { key: 'about', href: '/#about', section: 'about' },
  { key: 'projects', href: '/#projets', section: 'projets' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/#contact', section: 'contact' }
] as const;

export default function Navigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();
  
  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Détection des sections - OPTIMISÉE
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

  // Navigation simple - on laisse le navigateur gérer
  const handleNavClick = useCallback(() => {
    setIsOpen(false);
    setHoveredItem(null);
  }, []);

  // Handlers du menu - MÉMOÏSÉS
  const handleArrowMouseEnter = useCallback((itemLabel: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setHoveredItem(itemLabel);
  }, []);

  const handleServicesMouseLeave = useCallback(() => {
    menuTimeoutRef.current = setTimeout(() => setHoveredItem(null), 150);
  }, []);

  const handleSubmenuMouseEnter = useCallback(() => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  }, []);

  // Gestionnaire de touche clavier
  const handleMenuKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        menuButtonRef.current?.focus();
        break;
      case 'Tab':
        if (e.shiftKey && document.activeElement === firstMenuItemRef.current) {
          e.preventDefault();
          lastMenuItemRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === lastMenuItemRef.current) {
          e.preventDefault();
          firstMenuItemRef.current?.focus();
        }
        break;
    }
  }, [isOpen]);

  // Gestionnaire pour fermer le menu au clic outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  // Effet pour les événements - NETTOYÉ
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleMenuKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleMenuKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleMenuKeyDown, handleClickOutside]);

  // Vérification si un lien est actif - MÉMOÏSÉE
  const isLinkActive = useCallback((item: NavItem) => {
    if (pathname === '/') {
      if (item.section) return activeSection === item.section;
      if (item.key === 'home') return activeSection === 'hero';
    }
    return pathname === item.href;
  }, [pathname, activeSection]);

  // NAV_ITEMS est déjà constant, pas besoin de useMemo
  const navItems = NAV_ITEMS;

  // Rendu du sous-menu
  const renderSubmenu = useCallback((item: NavItem) => {
    const itemLabel = t(`navItems.${item.key}`, 'navigation');
    const isServicesHovered = hoveredItem === itemLabel;

    return (
      <li 
        key={item.key} 
        className="relative"
        onMouseLeave={handleServicesMouseLeave}
      >
        <div className="flex items-center">
          <a
            href={item.href}
            onClick={handleNavClick}
            className={`px-5 py-2 rounded-l-full font-medium text-base transition-colors ${
              pathname === '/services'
                ? 'text-blue-400 bg-blue-500/10'
                : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
          >
            <span>
              {itemLabel}
            </span>
          </a>
          
          <button
            onMouseEnter={() => itemLabel && handleArrowMouseEnter(itemLabel)}
            className={`px-2 py-2 rounded-r-full font-medium text-base transition-colors border-l border-[#1F2937] ${
              isServicesHovered || pathname === '/services'
                ? 'text-blue-400 bg-blue-500/10' 
                : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
            aria-label={`Sous-menu ${itemLabel}`}
          >
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${
                isServicesHovered ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>

        {isServicesHovered && (
          <div
            className="absolute top-full left-0 mt-2 w-64 bg-[#141B2B] rounded-xl shadow-2xl border border-[#1F2937] py-1 z-50 animate-fadeIn"
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            {item.submenu?.map((subItem) => {
              const Icon = subItem.icon;
              const subItemLabel = t(`servicesSubmenu.${subItem.key}`, 'navigation');
              
              return (
                <a
                  key={subItem.key}
                  href={subItem.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-4 py-2.5 text-base text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">
                    {subItemLabel}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </li>
    );
  }, [pathname, hoveredItem, handleArrowMouseEnter, handleServicesMouseLeave, handleSubmenuMouseEnter, handleNavClick, t]);

  // Rendu d'un lien simple
  const renderSimpleLink = useCallback((item: NavItem, index: number, isFirst: boolean, isLast: boolean) => {
    const itemLabel = t(`navItems.${item.key}`, 'navigation');
    const isActive = isLinkActive(item);

    return (
      <li key={item.key} className="relative">
        <a
          ref={isFirst ? firstMenuItemRef : isLast ? lastMenuItemRef : undefined}
          href={item.href}
          onClick={handleNavClick}
          className={`px-5 py-2 rounded-full font-medium text-base transition-colors ${
            isActive
              ? 'text-blue-400 bg-blue-500/10'
              : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
          }`}
        >
          <span>
            {itemLabel}
          </span>
        </a>
      </li>
    );
  }, [isLinkActive, handleNavClick, t]);

  return (
    <>
      {/* Skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded-lg z-[100]"
      >
        Aller au contenu principal
      </a>

      <nav
        className="fixed w-full z-50 top-0 lg:top-4"
        ref={menuRef}
        aria-label="Navigation principale"
      >
        <div className="lg:container lg:mx-auto lg:px-6">
          <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-3 lg:py-3 px-4 lg:px-8 shadow-lg">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <a 
                href="/"
                onClick={handleNavClick}
                className="flex items-center font-bold group relative z-50"
                aria-label={t('logo', 'navigation')}
              >
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl sm:text-2xl italic drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]">
                  <span className="hidden sm:inline">Abdoulaye Patawala</span>
                  <span className="sm:hidden">Patawala</span>
                </span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <ul className="flex items-center gap-2">
                  {navItems.map((item, index) => {
                    const isFirst = index === 0;
                    const isLast = index === navItems.length - 1;
                    
                    return item.submenu 
                      ? renderSubmenu(item)
                      : renderSimpleLink(item, index, isFirst, isLast);
                  })}
                </ul>
              </div>

              {/* Language Switcher et Menu Mobile */}
              <div className="flex items-center gap-2 relative z-50">
                <LanguageSwitcher />
                
                {/* Bouton menu mobile */}
                <button
                  ref={menuButtonRef}
                  className="lg:hidden relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-[#1F2937] flex items-center justify-center hover:from-blue-500/20 hover:to-cyan-500/20 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? 
                    <X className="w-5 h-5 text-blue-400" /> : 
                    <Menu className="w-5 h-5 text-gray-300" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Overlay séparé avec des balises <a> normales */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0A0F1C]/98 backdrop-blur-xl z-[9999] flex flex-col items-center justify-center overflow-y-auto">
          {/* Bouton de fermeture */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-blue-400 transition-colors z-[10000]"
            aria-label="Fermer le menu"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md px-6 py-12">
            {navItems.map((item, index) => {
              const itemLabel = t(`navItems.${item.key}`, 'navigation');
              const isActive = isLinkActive(item);
              
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold text-center transition-colors w-full py-3 ${
                    isActive && item.key !== 'services'
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {itemLabel}
                </a>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Main content anchor */}
      <div id="main-content" tabIndex={-1} className="outline-none" />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}