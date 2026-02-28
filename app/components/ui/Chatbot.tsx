'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Clock, Briefcase, Calendar, FileText, User, CheckCircle } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: QuickReply[];
};

type QuickReply = {
  id: string;
  text: string;
  action: string;
  icon?: any;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis l'assistant virtuel d'Abdoulaye. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      options: [
        { id: 'tarifs', text: '💰 Tarifs', action: 'tarifs', icon: FileText },
        { id: 'dispo', text: '📅 Disponibilité', action: 'dispo', icon: Calendar },
        { id: 'projets', text: '🚀 Projets', action: 'projets', icon: Briefcase },
        { id: 'contact', text: '📞 Contact', action: 'contact', icon: User }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const simulateTyping = async (response: string, options?: QuickReply[]) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    setIsTyping(false);
    
    setMessages(prev => [...prev, {
      id: generateId(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      options
    }]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Message utilisateur
    setMessages(prev => [...prev, {
      id: generateId(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    }]);
    setInputMessage('');

    // Simuler la réponse du bot
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('tarif') || lowerText.includes('prix') || lowerText.includes('combien')) {
      await simulateTyping(
        "Mes tarifs varient selon la complexité du projet. Voici une fourchette indicative :\n\n• Site vitrine : à partir de 200€\n• E-commerce : à partir de 500€\n• Application mobile : à partir de 600€\n• Audit / Conseil : à partir de 150€\n\nChaque projet est unique, je peux vous établir un devis personnalisé.",
        [
          { id: 'rdv', text: '📅 Prendre RDV', action: 'rdv', icon: Calendar },
          { id: 'contact', text: '📞 Contact direct', action: 'contact', icon: User }
        ]
      );
    }
    else if (lowerText.includes('disponible') || lowerText.includes('dispo')) {
      await simulateTyping(
        "Je suis actuellement disponible pour de nouveaux projets. Voici mes disponibilités :\n\n• Cette semaine : 2 créneaux\n• Prochaine session : Mars 2026\n\nJe prends seulement 2 projets par mois pour garantir un accompagnement de qualité.",
        [
          { id: 'rdv', text: '📅 Réserver un créneau', action: 'rdv', icon: Calendar },
          { id: 'contact', text: '💬 En savoir plus', action: 'contact', icon: MessageCircle }
        ]
      );
    }
    else if (lowerText.includes('projet') || lowerText.includes('portfolio') || lowerText.includes('réalisation')) {
      await simulateTyping(
        "J'ai accompagné plus de 50 projets dans divers domaines : e-commerce, applications mobiles, sites vitrines, plateformes sur mesure. Je vous invite à visiter ma section réalisations pour découvrir mon travail.",
        [
          { id: 'projets', text: '🚀 Voir les réalisations', action: 'projets', icon: Briefcase },
          { id: 'web', text: '🌐 Projets web', action: 'web', icon: Sparkles },
          { id: 'mobile', text: '📱 Projets mobile', action: 'mobile', icon: Sparkles }
        ]
      );
    }
    else if (lowerText.includes('contact') || lowerText.includes('parler') || lowerText.includes('discuter')) {
      await simulateTyping(
        "Vous pouvez me contacter directement via le formulaire de contact ou réserver un créneau pour un échange de 30 minutes.",
        [
          { id: 'rdv', text: '📅 Réserver un appel', action: 'rdv', icon: Calendar },
          { id: 'contact', text: '✉️ Formulaire contact', action: 'contact', icon: FileText }
        ]
      );
    }
    else if (lowerText.includes('bonjour') || lowerText.includes('salut') || lowerText.includes('hello')) {
      await simulateTyping(
        "Bonjour ! Ravi de vous accueillir. Que puis-je faire pour vous ?",
        [
          { id: 'tarifs', text: '💰 Tarifs', action: 'tarifs', icon: FileText },
          { id: 'dispo', text: '📅 Disponibilité', action: 'dispo', icon: Calendar },
          { id: 'projets', text: '🚀 Projets', action: 'projets', icon: Briefcase }
        ]
      );
    }
    else {
      await simulateTyping(
        "Je n'ai pas compris votre demande. Voici ce que je peux vous aider : tarifs, disponibilité, projets, ou prendre contact.",
        [
          { id: 'tarifs', text: '💰 Tarifs', action: 'tarifs', icon: FileText },
          { id: 'dispo', text: '📅 Disponibilité', action: 'dispo', icon: Calendar },
          { id: 'projets', text: '🚀 Projets', action: 'projets', icon: Briefcase },
          { id: 'contact', text: '📞 Contact', action: 'contact', icon: User }
        ]
      );
    }
  };

  const handleQuickReply = async (action: string) => {
    switch(action) {
      case 'tarifs':
        await handleSendMessage('tarifs');
        break;
      case 'dispo':
        await handleSendMessage('disponibilité');
        break;
      case 'projets':
        window.open('/projets', '_blank');
        break;
      case 'web':
        window.open('/services#web', '_blank');
        break;
      case 'mobile':
        window.open('/services#mobile', '_blank');
        break;
      case 'rdv':
        window.open('/#contact', '_blank');
        break;
      case 'contact':
        window.open('/#contact', '_blank');
        break;
      default:
        break;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 sm:p-4 rounded-full shadow-2xl z-40 hover:from-blue-600 hover:to-cyan-600 transition-all"
        aria-label="Ouvrir l'assistant"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 sm:bottom-24 right-6 left-4 sm:left-auto sm:right-6 w-auto sm:w-96 bg-[#141B2B] rounded-2xl shadow-2xl z-50 border border-[#1F2937]"
            role="dialog"
            aria-label="Assistant virtuel"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold">Assistant Patawala</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <Clock size={12} />
                    En ligne • Réponse instantanée
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 h-[400px] sm:h-96 overflow-y-auto bg-[#0A0F1C]">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}
                >
                  {/* Message */}
                  <div
                    className={`inline-block max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none'
                        : 'bg-[#141B2B] text-gray-300 rounded-bl-none shadow-sm border border-[#1F2937]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>

                  {/* Quick replies */}
                  {msg.options && msg.sender === 'bot' && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map((option) => {
                        const Icon = option.icon;
                        return (
                          <motion.button
                            key={option.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleQuickReply(option.action)}
                            className="bg-[#141B2B] border border-[#1F2937] text-gray-300 px-3 py-2 rounded-xl text-xs font-medium hover:border-blue-400 hover:text-blue-400 transition-all shadow-sm flex items-center gap-1.5"
                          >
                            {Icon && <Icon size={14} />}
                            {option.text}
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-gray-500 text-sm mb-4"
                >
                  <div className="bg-[#141B2B] p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#1F2937]">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-600 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-600 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#1F2937] bg-[#141B2B] rounded-b-2xl">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 bg-[#0A0F1C] border border-[#1F2937] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-white placeholder-gray-500"
                  aria-label="Votre message"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Envoyer"
                >
                  <Send size={18} />
                </motion.button>
              </form>

              {/* Micro-indication */}
              <p className="text-[10px] text-gray-500 text-center mt-2">
                Réponse instantanée • 24h/24
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}