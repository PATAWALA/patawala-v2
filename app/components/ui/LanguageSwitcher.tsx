'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTranslation } from '@/app/hooks/useTranslation';
import Image from 'next/image';

// Importer les images des drapeaux
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

  // Attendre que les traductions soient chargées
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
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

  // TRADUCTION SIMPLE
  const ariaLabel = t('languageSwitcher.ariaLabel', 'navigation') || 'Changer de langue';

  // SKELETON LOADER
  if (!isReady) {
    return (
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-500/50 to-cyan-500/50 text-white/50 px-3 py-2 rounded-xl text-sm flex items-center gap-2 w-[100px] h-[38px] animate-pulse">
          <div className="w-5 h-5 bg-white/20 rounded-sm" />
          <div className="w-10 h-4 bg-white/20 rounded hidden lg:block" />
          <ChevronDown size={14} className="opacity-30" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 whitespace-nowrap active:scale-95"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
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
        <div 
          className="absolute top-full right-0 mt-1 w-40 bg-[#141B2B] rounded-xl shadow-2xl border border-[#1F2937] py-1 z-50 animate-dropdown"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-150 ${
                language === lang.code
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400'
              }`}
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
              <span className="text-sm font-medium">{lang.label}</span>
              {language === lang.code && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}