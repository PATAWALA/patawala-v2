'use client';

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
      }, 300);
    };

    handleStart();
    handleComplete();

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background" role="status" aria-label="Chargement">
      <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span className="sr-only">Chargement...</span>
    </div>
  );
}