'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTranslation } from '@/app/hooks/useTranslation';

const NAV_ITEMS = [
  { key: 'home', href: '/', label: 'Accueil' },
  { key: 'services', href: '/services', label: 'Services' },
  { key: 'expertise', href: '/#expertise', label: 'Expertise' },
  { key: 'about', href: '/#about', label: 'À propos' },
  { key: 'projects', href: '/projets', label: 'Réalisations' },
  { key: 'blog', href: '/blog', label: 'Blog' },
  { key: 'contact', href: '/contact', label: 'Contact' }
] as const;

export default function Navigation() {
  const { t, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'expertise', 'about', 'contact'];
    
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

  const isLinkActive = (href: string) => {
    if (href === '/projets') return pathname === '/projets';
    if (href === '/services') return pathname === '/services';
    if (href === '/blog') return pathname === '/blog';
    if (href === '/contact') return pathname === '/contact';
    if (pathname === '/') {
      if (href === '/') return activeSection === 'hero';
      if (href.includes('#')) {
        const sectionId = href.replace('/#', '');
        return activeSection === sectionId;
      }
    }
    return false;
  };

  if (isLoading) {
    return (
      <nav className="fixed w-full z-50 top-0 lg:top-4 font-sans">
        <div className="lg:container lg:mx-auto lg:px-6">
          <div className="lg:rounded-2xl py-2 lg:py-3 px-4 lg:px-8" style={{ background: 'rgba(7,11,18,0.6)', backdropFilter: 'blur(12px)', boxShadow: '0 0 20px -5px rgba(212,175,55,0.15)' }}>
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-surface rounded animate-pulse" />
              <div className="hidden lg:flex items-center gap-6">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="h-4 w-16 bg-surface rounded animate-pulse" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-16 bg-surface rounded-full animate-pulse" />
                <div className="h-8 w-8 bg-surface rounded-full animate-pulse lg:hidden" />
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
        <div 
          className="lg:rounded-2xl py-2 lg:py-3 px-4 lg:px-8"
          style={{ 
            background: 'rgba(7,11,18,0.6)', 
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px -5px rgba(212,175,55,0.15), 0 0 0 1px rgba(212,175,55,0.08)'
          }}
        >
          {/* Version Desktop */}
          <div className="hidden lg:grid lg:grid-cols-3 items-center">
            <div className="flex justify-start">
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/';
                }}
                className="flex items-center font-bold group py-1"
              >
                <span className="text-gradient-gold text-xl sm:text-2xl italic">
                  Abdoulaye Patawala
                </span>
              </a>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-6">
                {NAV_ITEMS.map((item) => {
                  const active = isLinkActive(item.href);
                  
                  // Lien vers une section (ancre)
                  if (item.href.includes('#')) {
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap py-1 ${
                          active ? 'text-primary' : 'text-muted hover:text-primary'
                        }`}
                      >
                        {t(`navItems.${item.key}`, 'navigation') || item.label}
                      </a>
                    );
                  }
                  // Lien vers une page
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = item.href;
                      }}
                      className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap py-1 ${
                        active ? 'text-primary' : 'text-muted hover:text-primary'
                      }`}
                    >
                      {t(`navItems.${item.key}`, 'navigation') || item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Version Mobile */}
          <div className="flex lg:hidden items-center justify-between">
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
              className="flex items-center font-bold group py-1"
            >
              <span className="text-gradient-gold text-xl italic">
                Patawala
              </span>
            </a>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                className="flex items-center justify-center w-10 h-10 text-muted hover:text-primary transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 z-40 overflow-y-auto" style={{ background: 'rgba(7,11,18,0.98)', backdropFilter: 'blur(20px)' }}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
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
                      active ? 'text-primary' : 'text-foreground hover:text-primary'
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
                    active ? 'text-primary' : 'text-foreground hover:text-primary'
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