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
      }, 400);
    };

    handleStart();
    handleComplete();

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-fadeIn"
      role="status"
      aria-label="Chargement"
    >
      <div className="relative animate-slideUp">
        <span className="text-3xl sm:text-4xl font-black text-[#FF9800] tracking-[-0.05em]">
          Patawala
        </span>
        <div className="h-1 bg-[#FF9800] rounded-full mt-2 animate-growWidth" />
      </div>
      <span className="sr-only">Chargement Patawala...</span>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes growWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }

        .animate-growWidth {
          animation: growWidth 0.5s ease-out 0.1s forwards;
          width: 0;
        }
      `}</style>
    </div>
  );
}