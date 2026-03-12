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
  const menuTimeoutRef = useRef<NodeJS.Timeout>();
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

  // Navigation
  const handleNavigation = useCallback((href: string) => {
    setIsOpen(false);
    setHoveredItem(null);
    window.location.href = href;
  }, []);

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

  // Handlers
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

              {/* Desktop Navigation - CENTRÉE AVEC FLEX-1 */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <div className="flex items-center gap-6">
                  {navItems.map((item) => {
                    const itemLabel = t(`navItems.${item.key}`, 'navigation') || item.key;
                    const isActive = isLinkActive(item);
                    
                    if (item.submenu) {
                      const isServicesHovered = hoveredItem === itemLabel;
                      
                      return (
                        <div 
                          key={item.key} 
                          className="relative"
                          onMouseLeave={handleServicesMouseLeave}
                        >
                          <div className="flex items-center">
                            <a
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(item.href);
                              }}
                              className={`px-4 py-2 rounded-l-full text-sm font-medium transition-colors ${
                                pathname === '/services'
                                  ? 'text-blue-400 bg-blue-500/10'
                                  : 'text-gray-300 hover:text-blue-400'
                              }`}
                            >
                              {itemLabel}
                            </a>
                            
                            <button
                              onMouseEnter={() => handleArrowMouseEnter(itemLabel)}
                              className={`px-2 py-2 rounded-r-full text-sm font-medium transition-colors border-l border-[#1F2937] ${
                                isServicesHovered || pathname === '/services'
                                  ? 'text-blue-400 bg-blue-500/10' 
                                  : 'text-gray-300 hover:text-blue-400'
                              }`}
                            >
                              <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-200 ${
                                  isServicesHovered ? 'rotate-180' : ''
                                }`} 
                              />
                            </button>
                          </div>

                          {isServicesHovered && (
                            <div
                              className="absolute top-full left-0 mt-2 w-48 bg-[#141B2B] rounded-xl shadow-2xl border border-[#1F2937] py-1 z-50"
                              onMouseEnter={handleSubmenuMouseEnter}
                            >
                              {item.submenu.map((subItem) => {
                                const Icon = subItem.icon;
                                const subItemLabel = t(`servicesSubmenu.${subItem.key}`, 'navigation') || subItem.key;
                                
                                return (
                                  <a
                                    key={subItem.key}
                                    href={subItem.href}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleNavigation(subItem.href);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-blue-500/10 hover:text-blue-400"
                                  >
                                    <Icon size={16} className="text-gray-400" />
                                    <span>{subItemLabel}</span>
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    return (
                      <a
                        key={item.key}
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
                        }}
                        className={`text-sm font-medium transition-colors ${
                          isActive
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

        {/* MOBILE MENU - Version floue avec gros liens blancs ET CROIX DE FERMETURE */}
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
                  <a
                    key={item.key}
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
                    className={`w-full text-center py-6 text-3xl font-bold tracking-tight transition-colors ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-white/90 hover:text-blue-400'
                    }`}
                  >
                    {itemLabel}
                  </a>
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