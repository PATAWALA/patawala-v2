'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, lightTheme, darkModernTheme, ThemeColors } from '../styles/themes';

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Changer la valeur par défaut de 'system' à 'light'
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Si pas de thème sauvegardé, on met 'light' par défaut
      setTheme('light');
    }
  }, []);

  // Sauvegarder le thème dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Appliquer la classe au body pour les styles globaux CSS
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const colors = theme === 'dark' ? darkModernTheme : lightTheme;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}