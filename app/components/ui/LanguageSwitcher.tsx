'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTranslation } from '@/app/hooks/useTranslation';
import Image from 'next/image';

import frFlag from '../../assets/flags/fr.svg';
import gbFlag from '../../assets/flags/gb.svg';

interface Language {
  code: 'fr' | 'en';
  label: string;
  flag: any;
}

const languages: Language[] = [
  { code: 'fr', label: 'Français', flag: frFlag },
  { code: 'en', label: 'English', flag: gbFlag }
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t, isLoading } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  useEffect(() => {
    if (!isLoading) setIsReady(true);
  }, [isLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang.code);
    setIsOpen(false);
  };

  const ariaLabel = t('languageSwitcher.ariaLabel', 'navigation') || 'Changer de langue';

  if (!isReady) {
    return (
      <div className="relative">
        <div className="px-3 py-2 rounded-xl text-sm flex items-center gap-2 w-[100px] h-[38px] animate-pulse" style={{ background: 'rgba(212,175,55,0.3)', color: 'rgba(7,11,18,0.5)' }}>
          <div className="w-5 h-5 rounded-sm" style={{ background: 'rgba(7,11,18,0.2)' }} />
          <div className="w-10 h-4 rounded hidden lg:block" style={{ background: 'rgba(7,11,18,0.2)' }} />
          <ChevronDown size={14} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-200 whitespace-nowrap active:scale-95"
        style={{ 
          background: 'linear-gradient(135deg, #D4AF37 0%, #F5D05C 100%)',
          color: '#070B12',
          boxShadow: '0 0 15px -5px rgba(212,175,55,0.3)'
        }}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #C4A027 0%, #E5C04C 100%)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #D4AF37 0%, #F5D05C 100%)'}
      >
        <div className="relative w-5 h-5 rounded-sm overflow-hidden">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.label}
            fill
            priority
            className="object-cover"
            sizes="20px"
          />
        </div>
        <span className="hidden lg:inline">{currentLanguage.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 rounded-xl shadow-2xl border py-1 z-50 animate-dropdown"
          style={{ background: '#0F1521', borderColor: '#1E2A3E' }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-150 text-sm font-medium ${
                language === lang.code
                  ? ''
                  : 'hover:bg-[#161D2B]'
              }`}
              style={language === lang.code ? { background: 'rgba(212,175,55,0.1)', color: '#D4AF37' } : { color: '#8892A6' }}
            >
              <div className="relative w-5 h-5 rounded-sm overflow-hidden">
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  fill
                  priority
                  className="object-cover"
                  sizes="20px"
                />
              </div>
              <span>{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#D4AF37' }} />
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown {
          animation: dropdown 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}