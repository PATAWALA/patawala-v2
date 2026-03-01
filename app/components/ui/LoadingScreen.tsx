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
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {/* Nom en grand et orange */}
            <span className="text-5xl sm:text-6xl font-black text-[#FF9800] tracking-tight">
              Patawala
            </span>
            
            {/* Trait épais qui apparaît en dessous */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-2 bg-[#FF9800] rounded-full mt-2"
            />
          </motion.div>

          <span className="sr-only">Chargement Patawala...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}