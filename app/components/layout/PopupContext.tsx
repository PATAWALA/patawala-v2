'use client';

import React, { createContext, useContext, useState } from 'react';

interface PopupContextType {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    // Empêcher le scroll du body quand le popup est ouvert
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Réactiver le scroll du body
    document.body.style.overflow = 'auto';
  };

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within PopupProvider');
  }
  return context;
}