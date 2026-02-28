'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleTheme}
      className="relative w-14 h-7 sm:w-16 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 overflow-hidden transition-colors duration-200 shadow-inner"
      aria-label="Changer le thème"
    >
      {/* Fond avec les deux icônes côte à côte */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 sm:px-2">
        {/* Soleil */}
        <div className={`z-10 transition-all duration-200 ${
          theme === 'light' 
            ? 'opacity-100 scale-100' 
            : 'opacity-40 scale-90'
        }`}>
          <Sun 
            size={14} 
            className={`sm:w-4 sm:h-4 ${
              theme === 'light' 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} 
          />
        </div>
        
        {/* Lune */}
        <div className={`z-10 transition-all duration-200 ${
          theme === 'dark' 
            ? 'opacity-100 scale-100' 
            : 'opacity-40 scale-90'
        }`}>
          <Moon 
            size={14} 
            className={`sm:w-4 sm:h-4 ${
              theme === 'dark' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} 
          />
        </div>
      </div>

      {/* Curseur indicateur - ANIMATION RAPIDE */}
      <motion.div
        animate={{
          x: theme === 'light' ? 0 : '100%',
        }}
        transition={{ 
          type: "tween",           // Changé de "spring" à "tween"
          duration: 0.15,           // Animation très courte
          ease: "easeInOut"         // Accélération/décélération douce
        }}
        className="absolute top-0.5 left-0.5 w-6 h-6 sm:w-7 sm:h-7 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-300 dark:border-gray-600 flex items-center justify-center"
      >
        {/* Mini icône sur le curseur */}
        <motion.div
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
          className="absolute"
        >
          <Sun size={10} className="text-yellow-500 sm:w-3 sm:h-3" />
        </motion.div>
        <motion.div
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
          className="absolute"
        >
          <Moon size={10} className="text-blue-500 sm:w-3 sm:h-3" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}