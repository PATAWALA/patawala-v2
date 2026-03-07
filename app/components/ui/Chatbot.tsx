'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useTranslation } from '@/app/hooks/useTranslation'; // Ajustez le chemin

// Constantes hors du composant
const PHONE_NUMBER = '22946495875';
const DEBOUNCE_DELAY = 300;
const SUCCESS_DELAY = 2000;

const WhatsAppWidget = memo(function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { getComponentTranslation } = useTranslation();
  const t = (key: string) => getComponentTranslation('WhatsAppWidget', key);
  
  // Refs optimisées
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const widgetRef = useRef<HTMLDivElement>(null);

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Focus avec gestion mobile
  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        if (window.innerWidth >= 640) {
          inputRef.current?.focus();
        }
      }, DEBOUNCE_DELAY);
    }
  }, [isOpen]);

  // Fermeture au clic outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node) && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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

  return (
    <>
      {/* Bouton flottant */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl z-40 hover:from-green-600 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
            aria-label={t('button.ariaLabel')}
            title={t('button.title')}
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget WhatsApp */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={widgetRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-0 sm:bottom-6 left-0 sm:left-auto right-0 sm:right-6 w-full sm:w-96 max-h-[90vh] sm:max-h-[600px] bg-[#141B2B] rounded-t-2xl sm:rounded-2xl shadow-2xl z-50 border border-[#1F2937] overflow-hidden"
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
                onClick={handleClose}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={t('header.closeAriaLabel')}
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Corps */}
            <div className="p-3 sm:p-4 bg-[#0A0F1C] overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[500px]">
              <form onSubmit={handleSendToWhatsApp} className="space-y-3 sm:space-y-4">
                {/* Message de bienvenue */}
                <div className="p-2.5 sm:p-3 bg-[#141B2B] rounded-xl border border-[#1F2937]">
                  <p className="text-xs sm:text-sm text-gray-300">
                    {t('body.welcomeMessage')}
                  </p>
                </div>

                {/* Champ de message */}
                <div>
                  <label htmlFor="whatsapp-message" className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                    {t('body.messageLabel')}
                  </label>
                  <textarea
                    ref={inputRef}
                    id="whatsapp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                    onKeyDown={handleKeyDown}
                    placeholder={t('body.messagePlaceholder')}
                    rows={window.innerWidth < 640 ? 3 : 4}
                    maxLength={1000}
                    className="w-full bg-[#141B2B] border border-[#1F2937] rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-white placeholder-gray-500 resize-none"
                    aria-label={t('body.messageAriaLabel')}
                    disabled={showSuccess}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {t('body.characterCount').replace('{count}', message.length.toString())}
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
                      className="p-2 sm:p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-green-400">
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
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('buttonStates.sending')}</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <span>✓</span>
                      <span>{t('buttonStates.success')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="sm:w-4 sm:h-4" />
                      <span>{t('buttonStates.send')}</span>
                    </>
                  )}
                </motion.button>

                {/* Note d'information */}
                <p className="text-[8px] sm:text-[10px] text-gray-500 text-center">
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