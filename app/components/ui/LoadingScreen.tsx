// components/ui/LoadingScreen.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleStart = () => {
      clearTimeout(timeout);
      setIsLoading(true);
    };

    const handleComplete = () => {
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };

    handleStart();
    handleComplete();

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="status"
          aria-label="Chargement"
        >
          {/* Pas de fond */}
          <div className="relative">
            {/* Nom avec dégradé */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-4xl sm:text-5xl font-bold"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Patawala
              </span>
            </motion.div>
            
            {/* Point qui pulse */}
            <motion.div
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"
            />
          </div>

          <span className="sr-only">Chargement Patawala...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}