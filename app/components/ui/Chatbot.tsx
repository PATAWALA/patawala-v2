'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const WhatsAppWidget = memo(function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Numéro de téléphone (format international sans +)
  const PHONE_NUMBER = '22946495875'; // Votre numéro

  // Focus sur l'input quand le widget s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Réinitialiser les états à la fermeture
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setMessage('');
    setShowSuccess(false);
  }, []);

  // Envoyer vers WhatsApp
  const handleSendToWhatsApp = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    setIsSending(true);
    
    // Simuler un petit délai pour l'UX
    setTimeout(() => {
      // Encoder le message pour l'URL
      const encodedMessage = encodeURIComponent(message.trim());
      
      // Créer l'URL WhatsApp
      const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
      
      // Ouvrir dans un nouvel onglet
      window.open(whatsappUrl, '_blank');
      
      // Afficher le message de succès
      setShowSuccess(true);
      setIsSending(false);
      
      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setShowSuccess(false);
        setMessage('');
      }, 2000);
    }, 500);
  }, [message]);

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl z-40 hover:from-green-600 hover:to-green-700 transition-all"
        aria-label="Ouvrir WhatsApp"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
      </motion.button>

      {/* Widget WhatsApp */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 sm:bottom-24 right-6 left-4 sm:left-auto sm:right-6 w-auto sm:w-96 bg-[#141B2B] rounded-2xl shadow-2xl z-50 border border-[#1F2937]"
            role="dialog"
            aria-label="Envoyer un message WhatsApp"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold">WhatsApp Direct</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <Sparkles size={12} />
                    Réponse sous 24h
                  </p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Corps */}
            <div className="p-4 bg-[#0A0F1C]">
              <form onSubmit={handleSendToWhatsApp}>
                {/* Message de bienvenue */}
                <div className="mb-4 p-3 bg-[#141B2B] rounded-xl border border-[#1F2937]">
                  <p className="text-sm text-gray-300">
                    👋 Envoyez-moi un message directement sur WhatsApp. Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>

                {/* Champ de message */}
                <div className="mb-4">
                  <label htmlFor="whatsapp-message" className="block text-sm font-medium text-gray-400 mb-2">
                    Votre message
                  </label>
                  <textarea
                    ref={inputRef}
                    id="whatsapp-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Bonjour, je souhaite discuter de mon projet..."
                    rows={4}
                    className="w-full bg-[#141B2B] border border-[#1F2937] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all text-white placeholder-gray-500 resize-none"
                    aria-label="Votre message"
                    disabled={showSuccess}
                  />
                </div>

                {/* Message de succès */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-2"
                    >
                      <div className="w-5 h-5 bg-green-500/30 rounded-full flex items-center justify-center">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <p className="text-xs text-green-400">
                        Message prêt ! WhatsApp va s'ouvrir dans un nouvel onglet.
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
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Préparation...</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <span className="text-white">✓</span>
                      <span>Message envoyé !</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Envoyer sur WhatsApp</span>
                    </>
                  )}
                </motion.button>

                {/* Note d'information */}
                <p className="text-[10px] text-gray-500 text-center mt-4">
                  En cliquant sur "Envoyer", vous serez redirigé vers WhatsApp.<br />
                  Aucune donnée n'est stockée sur ce site.
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