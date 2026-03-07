'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useTranslation } from '@/app/hooks/useTranslation';

// Constantes hors du composant
const PHONE_NUMBER = '22946495875';
const SUCCESS_DELAY = 2000;

const WhatsAppWidget = memo(function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { getComponentTranslation, tWithParams } = useTranslation();
  
  // Fonction de traduction sécurisée pour le widget
  const t = (key: string): string => {
    return getComponentTranslation('WhatsAppWidget', key);
  };
  
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const widgetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Focus sur mobile - CORRECTION IMPORTANTE
  useEffect(() => {
    if (isOpen) {
      // Sur mobile, on force le focus après un délai plus long
      // pour laisser l'animation se terminer
      const focusDelay = isMobile ? 500 : 300;
      
      timeoutRef.current = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Sur mobile, ça aide à faire sortir le clavier
          if (isMobile) {
            inputRef.current.click();
          }
        }
      }, focusDelay);
    }
  }, [isOpen, isMobile]);

  // Fermeture au clic outside (désactivé sur mobile pour éviter les conflits)
  useEffect(() => {
    if (isMobile) return; // Pas de fermeture au clic outside sur mobile
    
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node) && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setMessage('');
    setShowSuccess(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleSendToWhatsApp = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    
    setIsSending(true);
    
    requestAnimationFrame(() => {
      const encodedMessage = encodeURIComponent(trimmedMessage);
      const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      setShowSuccess(true);
      setIsSending(false);
      
      timeoutRef.current = setTimeout(() => {
        setShowSuccess(false);
        setMessage('');
      }, SUCCESS_DELAY);
    });
  }, [message]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        handleSendToWhatsApp(e as any);
      }
    }
  }, [message, handleSendToWhatsApp]);

  // Gestionnaire pour ouvrir le widget
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    // Sur mobile, on désactive le scroll du body
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }
  }, [isMobile]);

  // Gestionnaire pour fermer le widget
  const handleCloseWithScroll = useCallback(() => {
    handleClose();
    // Réactiver le scroll sur mobile
    if (isMobile) {
      document.body.style.overflow = '';
    }
  }, [handleClose, isMobile]);

  return (
    <>
      {/* Bouton flottant */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            ref={buttonRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl z-40 hover:from-green-600 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
            aria-label={t('button.ariaLabel')}
            title={t('button.title')}
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget WhatsApp - Version mobile améliorée */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, y: isMobile ? '100%' : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? '100%' : 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
              fixed z-50 bg-[#141B2B] border border-[#1F2937] overflow-hidden
              ${isMobile 
                ? 'inset-0 rounded-none' // Plein écran sur mobile
                : 'bottom-6 right-6 w-96 max-h-[600px] rounded-2xl' // Desktop
              }
            `}
            role="dialog"
            aria-label={t('header.title')}
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base truncate">{t('header.title')}</h3>
                  <p className="text-[10px] sm:text-xs opacity-90 flex items-center gap-1">
                    <Sparkles size={10} className="sm:w-3 sm:h-3" />
                    <span className="truncate">{t('header.subtitle')}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCloseWithScroll}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={t('header.closeAriaLabel')}
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Corps - avec hauteur ajustée pour mobile */}
            <div 
              className={`
                bg-[#0A0F1C] overflow-y-auto
                ${isMobile 
                  ? 'p-4 h-[calc(100vh-64px)]' // Pleine hauteur moins header
                  : 'p-4 max-h-[500px]' // Desktop
                }
              `}
            >
              <form onSubmit={handleSendToWhatsApp} className="space-y-4">
                {/* Message de bienvenue */}
                <div className="p-3 bg-[#141B2B] rounded-xl border border-[#1F2937]">
                  <p className="text-sm text-gray-300">
                    {t('body.welcomeMessage')}
                  </p>
                </div>

                {/* Champ de message - avec autoFocus renforcé */}
                <div>
                  <label htmlFor="whatsapp-message" className="block text-sm font-medium text-gray-400 mb-2">
                    {t('body.messageLabel')}
                  </label>
                  <textarea
                    ref={inputRef}
                    id="whatsapp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    onKeyDown={handleKeyDown}
                    placeholder={t('body.messagePlaceholder')}
                    rows={isMobile ? 5 : 4}
                    maxLength={1000}
                    className="w-full bg-[#141B2B] border border-[#1F2937] rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-white placeholder-gray-500 resize-none"
                    aria-label={t('body.messageAriaLabel')}
                    disabled={showSuccess}
                    // Attributs importants pour mobile
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="true"
                    enterKeyHint="send"
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">
                      {tWithParams('body.characterCount', { count: message.length })}
                    </span>
                  </div>
                </div>

                {/* Message de succès */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2"
                    >
                      <div className="w-5 h-5 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <p className="text-xs text-green-400">
                        {t('success.message')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bouton d'envoi */}
                <motion.button
                  type="submit"
                  disabled={!message.trim() || isSending || showSuccess}
                  whileHover={{ scale: message.trim() && !isSending && !showSuccess ? 1.02 : 1 }}
                  whileTap={{ scale: message.trim() && !isSending && !showSuccess ? 0.98 : 1 }}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('buttonStates.sending')}</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <span>✓</span>
                      <span>{t('buttonStates.success')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{t('buttonStates.send')}</span>
                    </>
                  )}
                </motion.button>

                {/* Note d'information */}
                <p className="text-[10px] text-gray-500 text-center">
                  {t('footer.note')}
                </p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

WhatsAppWidget.displayName = 'WhatsAppWidget';

export default WhatsAppWidget;