'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Gift, Globe, Smartphone, Palette, TrendingUp, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Accueil', href: '/', section: 'hero' },
  { 
    label: 'Services', 
    href: '/services',
    submenu: [
      { 
        label: 'Développement Web', 
        href: '/services#web',
        icon: Globe,
        category: 'web'
      },
      { 
        label: 'Applications Mobile', 
        href: '/services#mobile',
        icon: Smartphone,
        category: 'mobile'
      },
      { 
        label: 'UI/UX Design', 
        href: '/services#design',
        icon: Palette,
        category: 'design'
      },
      { 
        label: 'Consulting Tech', 
        href: '/services#consulting',
        icon: TrendingUp,
        category: 'consulting'
      },
    ]
  },
  { label: 'À propos', href: '/#about', section: 'about' },
  { label: 'Réalisations', href: '/#projets', section: 'projets' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact', section: 'contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const pathname = usePathname();
  const router = useRouter();
  const menuTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);

  // Détection des sections pour la classe active - CORRIGÉ
  useEffect(() => {
    if (pathname === '/') {
      // Toutes les sections de la page d'accueil
      const allSections = [
        'hero', 
        'about',      // ← AJOUTÉ (manquait avant)
        'socialproof', 
        'valueproposition', 
        'techexpertise', 
        'projets', 
        'contact'
      ];
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              setActiveSection(sectionId);
              console.log('Section active:', sectionId); // Pour debug
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '-80px 0px -80px 0px'
        }
      );

      // Observer toutes les sections
      allSections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observerRef.current?.observe(element);
      });

      return () => {
        observerRef.current?.disconnect();
      };
    } else {
      setActiveSection('');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  // Gestion du hover uniquement sur la flèche
  const handleArrowMouseEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setHoveredItem('Services');
  };

  const handleServicesMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
  };

  const handleSubmenuMouseEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
  };

  const isLinkActive = (item: typeof NAV_ITEMS[0]) => {
    if (pathname === '/') {
      if (item.section) {
        // Pour "À propos", on vérifie directement
        if (item.label === 'À propos') {
          return activeSection === 'about';
        }
        // Pour les autres sections
        return activeSection === item.section;
      }
      if (item.label === 'Accueil') {
        return ['hero', 'socialproof', 'valueproposition', 'techexpertise'].includes(activeSection);
      }
    }
    
    if (item.href === '/') return pathname === '/';
    if (item.href === '/services') return pathname === '/services';
    if (item.href === '/blog') return pathname === '/blog';
    if (item.href?.startsWith('/#')) return false;
    
    return pathname === item.href;
  };

  const handleNavClick = (e: React.MouseEvent, href: string, label?: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      
      if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
          setActiveSection(targetId); // Force l'activation immédiate
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
    
    setIsOpen(false);
    setHoveredItem(null);
  };

  const handleServiceClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
    setIsOpen(false);
    setHoveredItem(null);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-[#0A0F1C]/95 backdrop-blur-md shadow-lg py-2 border-b border-[#1F2937]' 
          : 'bg-[#0A0F1C]/80 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold group"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Sparkles size={18} className="text-white sm:w-5 sm:h-5" />
            </div>
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Patawala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Liens de navigation */}
            <div className="flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseLeave={item.submenu ? handleServicesMouseLeave : undefined}
                >
                  {item.submenu ? (
                    <>
                      <div className="flex items-center" ref={servicesRef}>
                        {/* Lien Services */}
                        <a
                          href={item.href}
                          onClick={(e) => handleServiceClick(e, item.href!)}
                          className={`px-3 py-2 rounded-l-lg font-medium transition-all duration-150 ${
                            pathname === '/services'
                              ? 'text-blue-400 bg-blue-500/10'
                              : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                          }`}
                        >
                          {item.label}
                        </a>
                        
                        {/* Flèche du menu */}
                        <button
                          ref={arrowRef}
                          onMouseEnter={handleArrowMouseEnter}
                          className={`px-2 py-2 rounded-r-lg font-medium transition-all duration-150 border-l border-[#1F2937] ${
                            hoveredItem === 'Services' || pathname === '/services'
                              ? 'text-blue-400 bg-blue-500/10' 
                              : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                          }`}
                          aria-label="Voir les catégories de services"
                        >
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${
                              hoveredItem === 'Services' ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {hoveredItem === 'Services' && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-64 bg-[#141B2B] rounded-xl shadow-2xl border border-[#1F2937] py-2 z-50"
                            onMouseEnter={handleSubmenuMouseEnter}
                            onMouseLeave={handleServicesMouseLeave}
                          >
                            {item.submenu.map((subItem) => {
                              const Icon = subItem.icon;
                              const isActive = pathname === '/services' && window.location.hash === `#${subItem.category}`;
                              
                              return (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href}
                                  onClick={() => {
                                    setIsOpen(false);
                                    setHoveredItem(null);
                                  }}
                                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${
                                    isActive
                                      ? 'bg-blue-500/20 text-blue-400'
                                      : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                                  }`}
                                >
                                  <Icon size={18} className={isActive ? 'text-blue-400' : 'text-gray-400'} />
                                  <span className="font-medium">{subItem.label}</span>
                                  {isActive && (
                                    <motion.div 
                                      layoutId="activeIndicator"
                                      className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full"
                                    />
                                  )}
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
                      onClick={(e) => handleNavClick(e, item.href!, item.label)}
                      className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-150 ${
                        isLinkActive(item)
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                      }`}
                    >
                      {item.label}
                      {isLinkActive(item) && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                        />
                      )}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Bouton Guide Gratuit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 whitespace-nowrap"
            >
              <Gift size={16} />
              <span>Guide</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? 
                <X size={24} className="text-blue-400" /> : 
                <Menu size={24} className="text-gray-300" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 bg-[#141B2B] rounded-xl shadow-2xl border border-[#1F2937] overflow-hidden"
            >
              <div className="p-3 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    {item.submenu ? (
                      <div className="space-y-1">
                        {/* Lien Services */}
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            router.push(item.href!);
                            setIsOpen(false);
                          }}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-blue-400 bg-blue-500/10"
                        >
                          {item.label}
                          <ChevronDown size={16} className="rotate-180" />
                        </a>
                        
                        {/* Sous-menu */}
                        <div className="pl-4 space-y-1 border-l-2 border-blue-500/30 ml-3">
                          {item.submenu.map((subItem) => {
                            const Icon = subItem.icon;
                            const isActive = pathname === '/services' && window.location.hash === `#${subItem.category}`;
                            
                            return (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                  isActive
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-gray-400 hover:bg-blue-500/10 hover:text-blue-400'
                                }`}
                              >
                                <Icon size={16} />
                                <span className="font-medium">{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href!, item.label)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors ${
                          isLinkActive(item)
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
                        }`}
                      >
                        {item.label}
                        {isLinkActive(item) && (
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        )}
                      </a>
                    )}
                  </div>
                ))}
                
                {/* Bouton Guide Gratuit mobile */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200"
                >
                  <Gift size={18} />
                  Guide Gratuit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}