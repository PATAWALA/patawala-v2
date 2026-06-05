'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useTranslation } from '@/app/hooks/useTranslation';

const PHONE_NUMBER = '22962278090';
const SUCCESS_DELAY = 2000;
const MAX_MESSAGE_LENGTH = 1000;

const WhatsAppWidget = memo(function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const { t, language, isLoading } = useTranslation();
  
  const translations = {
    buttonAriaLabel: t('button.ariaLabel', 'widget') || 'Ouvrir le chat WhatsApp',
    buttonTitle: t('button.title', 'widget') || 'Contacter via WhatsApp',
    headerTitle: t('header.title', 'widget') || 'WhatsApp Direct',
    headerSubtitle: t('header.subtitle', 'widget') || 'Réponse sous 24h',
    headerCloseAriaLabel: t('header.closeAriaLabel', 'widget') || 'Fermer',
    bodyWelcomeMessage: t('body.welcomeMessage', 'widget') || '👋 Envoyez-moi un message directement sur WhatsApp. Je vous répondrai dans les plus brefs délais.',
    bodyMessageLabel: t('body.messageLabel', 'widget') || 'Votre message',
    bodyMessagePlaceholder: t('body.messagePlaceholder', 'widget') || 'Bonjour, je souhaite discuter de mon projet...',
    bodyMessageAriaLabel: t('body.messageAriaLabel', 'widget') || 'Votre message',
    bodyCharacterCount: t('body.characterCount', 'widget') || '{count}/1000',
    successMessage: t('success.message', 'widget') || 'Message prêt ! WhatsApp va s\'ouvrir.',
    buttonStatesSending: t('buttonStates.sending', 'widget') || 'Préparation...',
    buttonStatesSuccess: t('buttonStates.success', 'widget') || 'Prêt !',
    buttonStatesSend: t('buttonStates.send', 'widget') || 'Envoyer',
    footerNote: t('footer.note', 'widget') || 'En cliquant sur "Envoyer", vous serez redirigé vers WhatsApp. Aucune donnée n\'est stockée.',
  };
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const widgetRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isLoading) setIsReady(true);
  }, [isLoading]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const focusDelay = isMobile ? 500 : 300;
      timeoutRef.current = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          if (isMobile) inputRef.current.click();
        }
      }, focusDelay);
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (isMobile) return;
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
      if (message.trim()) handleSendToWhatsApp(e as any);
    }
  }, [message, handleSendToWhatsApp]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (isMobile) document.body.style.overflow = 'hidden';
  }, [isMobile]);

  const handleCloseWithScroll = useCallback(() => {
    handleClose();
    if (isMobile) document.body.style.overflow = '';
  }, [handleClose, isMobile]);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH));
  }, []);

  if (!isReady) return null;

  return (
    <>
      {/* Bouton flottant WhatsApp */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={handleOpen}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 p-3 sm:p-4 rounded-full shadow-2xl z-40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-background animate-scaleIn"
          style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 8px 25px -5px rgba(34,197,94,0.5)' }}
          aria-label={translations.buttonAriaLabel}
          title={translations.buttonTitle}
        >
          <MessageCircle size={20} className="sm:w-6 sm:h-6 text-white" />
        </button>
      )}

      {/* Widget */}
      {isOpen && (
        <div
          ref={widgetRef}
          className={`fixed z-50 bg-background border border-border overflow-hidden ${
            isMobile ? 'inset-0 rounded-none animate-slideInMobile' : 'bottom-6 right-6 w-96 max-h-[600px] rounded-2xl animate-slideInDesktop'
          }`}
          style={{ boxShadow: '0 20px 50px -15px rgba(0,0,0,0.6)' }}
          role="dialog"
          aria-label={translations.headerTitle}
          aria-modal="true"
        >
          {/* Header */}
          <div className="p-3 sm:p-4 flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)' }}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-white truncate">{translations.headerTitle}</h3>
                <p className="text-[10px] sm:text-xs text-white/80 flex items-center gap-1">
                  <Sparkles size={10} className="sm:w-3 sm:h-3" />
                  <span className="truncate">{translations.headerSubtitle}</span>
                </p>
              </div>
            </div>
            <button 
              onClick={handleCloseWithScroll}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={translations.headerCloseAriaLabel}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Corps */}
          <div className={`bg-background overflow-y-auto ${isMobile ? 'p-4 h-[calc(100vh-64px)]' : 'p-4 max-h-[500px]'}`}>
            <form onSubmit={handleSendToWhatsApp} className="space-y-4">
              <div className="p-3 bg-surface rounded-xl border border-border">
                <p className="text-sm text-muted">{translations.bodyWelcomeMessage}</p>
              </div>

              <div>
                <label htmlFor="whatsapp-message" className="block text-sm font-medium text-muted mb-2">
                  {translations.bodyMessageLabel}
                </label>
                <textarea
                  ref={inputRef}
                  id="whatsapp-message"
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyDown}
                  placeholder={translations.bodyMessagePlaceholder}
                  rows={isMobile ? 5 : 4}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-foreground placeholder-muted resize-none"
                  aria-label={translations.bodyMessageAriaLabel}
                  disabled={showSuccess}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="true"
                  enterKeyHint="send"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-muted">
                    {translations.bodyCharacterCount.replace('{count}', String(message.length))}
                  </span>
                </div>
              </div>

              {showSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2 animate-fadeIn">
                  <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-xs">✓</span>
                  </div>
                  <p className="text-xs text-green-400">{translations.successMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!message.trim() || isSending || showSuccess}
                className="w-full py-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white"
                style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 4px 15px -3px rgba(34,197,94,0.4)' }}
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{translations.buttonStatesSending}</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <span>✓</span>
                    <span>{translations.buttonStatesSuccess}</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{translations.buttonStatesSend}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-muted/60 text-center">{translations.footerNote}</p>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn { from { opacity: 0; transform: scale(0); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInDesktop { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInMobile { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
        .animate-slideInDesktop { animation: slideInDesktop 0.2s ease-out; }
        .animate-slideInMobile { animation: slideInMobile 0.2s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </>
  );
});

WhatsAppWidget.displayName = 'WhatsAppWidget';

export default WhatsAppWidget;