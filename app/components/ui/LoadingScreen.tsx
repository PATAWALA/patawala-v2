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
      }, 400); // Plus court, plus discret
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
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
        >
          {/* Fond très léger */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          
          {/* Loader minimaliste */}
          <div className="relative">
            {/* Anneau principal */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-12 h-12 border-2 border-[#FF9800]/20 border-t-[#FF9800] rounded-full"
            />
            
            {/* Point central */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FF9800] rounded-full"
            />
          </div>

          {/* Mini barre en bas */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FF9800] to-amber-400"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}