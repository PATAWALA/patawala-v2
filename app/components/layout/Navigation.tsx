'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown, Globe, Smartphone, Palette, TrendingUp } from 'lucide-react';
import Link from 'next/link';
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

  // Navigation DIRECTE sans attendre React
  const handleNavigation = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setHoveredItem(null);
    
    // Navigation directe via le navigateur
    window.location.href = href;
  }, []);

  // Pour les ancres sur la même page
  const handleAnchorClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    if (pathname === '/') {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setActiveSection(targetId);
      }
    } else {
      window.location.href = href;
    }
    
    setIsOpen(false);
    setHoveredItem(null);
  }, [pathname]);

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

  // Rendu du sous-menu - EXTRAIT pour éviter la duplication
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
            onClick={(e) => handleNavigation(e, item.href)}
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
                  onClick={(e) => handleNavigation(e, subItem.href)}
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
  }, [pathname, hoveredItem, handleArrowMouseEnter, handleServicesMouseLeave, handleSubmenuMouseEnter, handleNavigation, t]);

  // Rendu d'un lien simple
  const renderSimpleLink = useCallback((item: NavItem, index: number, isFirst: boolean, isLast: boolean) => {
    const itemLabel = t(`navItems.${item.key}`, 'navigation');
    const isActive = isLinkActive(item);

    return (
      <li key={item.key} className="relative">
        <a
          ref={isFirst ? firstMenuItemRef : isLast ? lastMenuItemRef : undefined}
          href={item.href}
          onClick={(e) => item.href.includes('#') && pathname === '/' 
            ? handleAnchorClick(e, item.href)
            : handleNavigation(e, item.href)
          }
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
  }, [pathname, isLinkActive, handleAnchorClick, handleNavigation, t]);

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
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                
                {/* Bouton menu mobile */}
                <button
                  ref={menuButtonRef}
                  className="lg:hidden relative w-9 h-9 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-[#1F2937] flex items-center justify-center hover:from-blue-500/20 hover:to-cyan-500/20 transition-colors"
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

            {/* Mobile Menu */}
            {isOpen && (
              <div className="lg:hidden mt-4 rounded-2xl bg-[#141B2B] border border-[#1F2937] overflow-hidden animate-slideDown">
                <div className="p-3 space-y-1">
                  {navItems.map((item, index) => {
                    const itemLabel = t(`navItems.${item.key}`, 'navigation');
                    const isActive = isLinkActive(item);
                    const isFirst = index === 0;
                    const isLast = index === navItems.length - 1;
                    
                    return (
                      <div key={item.key}>
                        {item.submenu ? (
                          <div className="space-y-1">
                            <a
                              ref={isFirst ? firstMenuItemRef : undefined}
                              href={item.href}
                              onClick={(e) => handleNavigation(e, item.href)}
                              className="flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base text-blue-400 bg-blue-500/10 border border-blue-500/20"
                            >
                              <span>
                                {itemLabel}
                              </span>
                              <ChevronDown className="w-4 h-4 rotate-180 text-blue-400" />
                            </a>
                            
                            <div className="pl-4 space-y-1 border-l-2 border-blue-500/30 ml-4">
                              {item.submenu.map((subItem) => {
                                const Icon = subItem.icon;
                                const subItemLabel = t(`servicesSubmenu.${subItem.key}`, 'navigation');
                                
                                return (
                                  <a
                                    key={subItem.key}
                                    href={subItem.href}
                                    onClick={(e) => handleNavigation(e, subItem.href)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
                                  >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium">
                                      {subItemLabel}
                                    </span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <a
                            ref={isLast ? lastMenuItemRef : undefined}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              if (item.href.includes('#') && pathname === '/') {
                                const targetId = item.href.replace('/#', '');
                                const element = document.getElementById(targetId);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                  window.history.pushState(null, '', item.href);
                                  setActiveSection(targetId);
                                }
                              } else {
                                window.location.href = item.href;
                              }
                              setIsOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base transition-colors ${
                              isActive
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : item.key === 'contact'
                                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg border border-blue-400/30'
                                  : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                            }`}
                          >
                            <span className={`${item.key === 'contact' ? 'mx-auto font-semibold' : ''}`}>
                              {itemLabel}
                            </span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Main content anchor */}
      <div id="main-content" tabIndex={-1} className="outline-none" />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
}