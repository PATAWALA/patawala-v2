'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CategoryType } from '../data/servicesData';

interface ServiceContextType {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  isNavigatingFromNav: boolean;
  setIsNavigatingFromNav: (value: boolean) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [isNavigatingFromNav, setIsNavigatingFromNav] = useState(false);

  return (
    <ServiceContext.Provider value={{ 
      activeCategory, 
      setActiveCategory, 
      isNavigatingFromNav, 
      setIsNavigatingFromNav 
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
}