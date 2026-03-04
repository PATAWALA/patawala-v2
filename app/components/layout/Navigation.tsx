'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Menu, X, ChevronDown, Globe, Smartphone, Palette, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTranslation } from '@/app/hooks/useTranslation';

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
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();
  const router = useRouter();
  
  // Refs pour la gestion du focus
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const lastMenuItemRef = useRef<HTMLAnchorElement>(null);
  
  const menuTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Gestionnaire de touche clavier pour le menu mobile
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

  // Détection des sections
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const allSections = [
      'hero', 'about', 'socialproof', 
      'valueproposition', 'techexpertise', 'projets', 'contact'
    ];
    
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

    allSections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
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

  const handleServiceClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
    setIsOpen(false);
    setHoveredItem(null);
  }, [router]);

  const isLinkActive = useCallback((item: NavItem) => {
    if (pathname === '/') {
      if (item.section) return activeSection === item.section;
      if (item.key === 'home') {
        return ['hero', 'socialproof', 'valueproposition', 'techexpertise'].includes(activeSection);
      }
    }
    return pathname === item.href;
  }, [pathname, activeSection]);

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setActiveSection(targetId);
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
    
    setIsOpen(false);
    setHoveredItem(null);
  }, [pathname, router]);

  const navItems = useMemo(() => NAV_ITEMS, []);

  return (
    <>
      {/* Skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-500 text-white px-4 py-2 rounded-lg z-[100]"
      >
        Aller au contenu principal
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed w-full z-50 top-0 lg:top-4"
        ref={menuRef}
        aria-label="Navigation principale"
      >
        {/* Container différent pour mobile et desktop */}
        <div className="lg:container lg:mx-auto lg:px-6">
          <div className="bg-[#0A0F1C]/80 backdrop-blur-sm lg:rounded-2xl border-b lg:border border-[#1F2937]/50 py-2 lg:py-2.5 px-4 lg:px-8 shadow-lg">
            <div className="flex justify-between items-center">
              {/* Logo - Sans icône, avec nom en italique */}
              <Link 
                href="/" 
                className="flex items-center font-bold group"
                aria-label={t('logo', 'navigation')}
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-xl sm:text-2xl italic">
                  <span className="hidden sm:inline">Abdoulaye Patawla</span>
                  <span className="sm:hidden">Patawala</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <ul className="flex items-center gap-2">
                  {navItems.map((item, index) => {
                    const itemLabel = t(`navItems.${item.key}`, 'navigation');
                    const isServicesHovered = hoveredItem === itemLabel;
                    const isActive = isLinkActive(item);
                    
                    return (
                      <li 
                        key={item.key} 
                        className="relative"
                        onMouseLeave={item.submenu ? handleServicesMouseLeave : undefined}
                      >
                        {item.submenu ? (
                          <>
                            <div className="flex items-center">
                              {/* Lien Services */}
                              <a
                                href={item.href}
                                onClick={(e) => handleServiceClick(e, item.href)}
                                className={`px-5 py-2 rounded-l-full font-medium text-base transition-all duration-150 ${
                                  pathname === '/services'
                                    ? 'text-blue-400 bg-blue-500/10'
                                    : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                                }`}
                                aria-current={pathname === '/services' ? 'page' : undefined}
                              >
                                {itemLabel}
                              </a>
                              
                              {/* Flèche du menu */}
                              <button
                                onMouseEnter={() => handleArrowMouseEnter(itemLabel)}
                                className={`px-2 py-2 rounded-r-full font-medium text-base transition-all duration-150 border-l border-[#1F2937] ${
                                  isServicesHovered || pathname === '/services'
                                    ? 'text-blue-400 bg-blue-500/10' 
                                    : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                                }`}
                                aria-label={`${t('servicesSubmenu.ariaLabel', 'navigation')} - ${itemLabel}`}
                              >
                                <ChevronDown 
                                  size={16} 
                                  className={`transition-transform duration-200 ${
                                    isServicesHovered ? 'rotate-180' : ''
                                  }`} 
                                  aria-hidden="true"
                                />
                              </button>
                            </div>

                            <AnimatePresence>
                              {isServicesHovered && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute top-full left-0 mt-2 w-64 bg-[#141B2B] rounded-xl shadow-2xl border border-[#1F2937] py-1 z-50"
                                  onMouseEnter={handleSubmenuMouseEnter}
                                  onMouseLeave={handleServicesMouseLeave}
                                  role="menu"
                                  aria-label={`Sous-menu ${itemLabel}`}
                                >
                                  {item.submenu.map((subItem) => {
                                    const Icon = subItem.icon;
                                    const isActive = pathname === '/services' && window.location.hash === `#${subItem.category}`;
                                    const subItemLabel = t(`servicesSubmenu.${subItem.key}`, 'navigation');
                                    
                                    return (
                                      <Link
                                        key={subItem.key}
                                        href={subItem.href}
                                        onClick={() => {
                                          setIsOpen(false);
                                          setHoveredItem(null);
                                        }}
                                        className={`flex items-center gap-3 px-4 py-2.5 text-base transition-all duration-150 ${
                                          isActive
                                            ? 'bg-blue-500/20 text-blue-400'
                                            : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                                        }`}
                                        role="menuitem"
                                        aria-current={isActive ? 'page' : undefined}
                                      >
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} aria-hidden="true" />
                                        <span className="font-medium">{subItemLabel}</span>
                                      </Link>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <a
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`relative px-5 py-2 rounded-full font-medium text-base transition-all duration-150 ${
                              isActive
                                ? 'text-blue-400 bg-blue-500/10'
                                : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {itemLabel}
                            {isActive && (
                              <motion.div 
                                layoutId="activeIndicator"
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Language Switcher et Menu Mobile */}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                
                {/* Bouton menu mobile */}
                <button
                  ref={menuButtonRef}
                  className="lg:hidden relative w-9 h-9 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-[#1F2937] flex items-center justify-center hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? t('mobileMenu.close', 'navigation') : t('mobileMenu.open', 'navigation')}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? "mobile-menu" : undefined}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? 
                      <X className="w-5 h-5 text-blue-400" aria-hidden="true" /> : 
                      <Menu className="w-5 h-5 text-gray-300" aria-hidden="true" />
                    }
                  </motion.div>
                </button>
              </div>
            </div>

            {/* Mobile Menu - Élégant avec animations */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="lg:hidden mt-4 -mx-4 mx-4 rounded-2xl bg-gradient-to-b from-[#141B2B] to-[#0F1420] shadow-2xl border border-[#1F2937] overflow-hidden backdrop-blur-lg"
                  role="menu"
                  id="mobile-menu"
                  aria-label="Menu mobile"
                >
                  <div className="p-3 space-y-1">
                    {navItems.map((item, index) => {
                      const itemLabel = t(`navItems.${item.key}`, 'navigation');
                      const isActive = isLinkActive(item);
                      
                      return (
                        <motion.div
                          key={item.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {item.submenu ? (
                            <div className="space-y-1">
                              {/* Lien Services mobile */}
                              <a
                                ref={index === 0 ? firstMenuItemRef : undefined}
                                href={item.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  router.push(item.href);
                                  setIsOpen(false);
                                }}
                                className="flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base text-blue-400 bg-blue-500/10 border border-blue-500/20"
                                role="menuitem"
                              >
                                <span>{itemLabel}</span>
                                <ChevronDown className="w-4 h-4 rotate-180 text-blue-400" aria-hidden="true" />
                              </a>
                              
                              {/* Sous-menu mobile */}
                              <div className="pl-4 space-y-1 border-l-2 border-blue-500/30 ml-4" role="group">
                                {item.submenu.map((subItem) => {
                                  const Icon = subItem.icon;
                                  const isActive = pathname === '/services' && window.location.hash === `#${subItem.category}`;
                                  const subItemLabel = t(`servicesSubmenu.${subItem.key}`, 'navigation');
                                  
                                  return (
                                    <Link
                                      key={subItem.key}
                                      href={subItem.href}
                                      onClick={() => setIsOpen(false)}
                                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all duration-200 ${
                                        isActive
                                          ? 'bg-blue-500/20 text-blue-400'
                                          : 'text-gray-400 hover:bg-blue-500/10 hover:text-blue-400'
                                      }`}
                                      role="menuitem"
                                      aria-current={isActive ? 'page' : undefined}
                                    >
                                      <Icon className="w-4 h-4" aria-hidden="true" />
                                      <span className="font-medium">{subItemLabel}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <a
                              ref={index === navItems.length - 1 ? lastMenuItemRef : undefined}
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-200 ${
                                isActive
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : item.key === 'contact'
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl border border-blue-400/30' // MÊME FOND QUE LANGUAGESWITCHER
                                    : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                              }`}
                              role="menuitem"
                              aria-current={isActive ? 'page' : undefined}
                            >
                              <span className={item.key === 'contact' ? 'mx-auto font-semibold' : ''}>
                                {itemLabel}
                              </span>
                              {item.key === 'contact' && (
                                <Sparkles size={16} className="text-white opacity-80 absolute right-4" />
                              )}
                            </a>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
      
      {/* Main content anchor */}
      <div id="main-content" tabIndex={-1} className="outline-none" />
    </>
  );
}