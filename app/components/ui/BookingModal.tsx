'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, User, Mail, Phone, 
  CheckCircle, MessageSquare, ChevronLeft, 
  ChevronRight, Sparkles, MessageCircle,
  ChevronDown, Info, ThumbsUp, AlertCircle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mois en français
const monthNames = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

// Jours de la semaine
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

type ContactMethod = 'whatsapp' | 'email';

// Liste des pays avec indicatifs et drapeaux
const countries = [
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'BE', name: 'Belgique', dialCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Suisse', dialCode: '+41', flag: '🇨🇭' },
  { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
  { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'CI', name: 'Côte d\'Ivoire', dialCode: '+225', flag: '🇨🇮' },
  { code: 'SN', name: 'Sénégal', dialCode: '+221', flag: '🇸🇳' },
  { code: 'CM', name: 'Cameroun', dialCode: '+237', flag: '🇨🇲' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫' },
  { code: 'BJ', name: 'Bénin', dialCode: '+229', flag: '🇧🇯' },
  { code: 'TG', name: 'Togo', dialCode: '+228', flag: '🇹🇬' },
  { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
  { code: 'NE', name: 'Niger', dialCode: '+227', flag: '🇳🇪' },
  { code: 'GN', name: 'Guinée', dialCode: '+224', flag: '🇬🇳' },
  { code: 'US', name: 'États-Unis', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'Royaume-Uni', dialCode: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Allemagne', dialCode: '+49', flag: '🇩🇪' },
  { code: 'IT', name: 'Italie', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Espagne', dialCode: '+34', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'NL', name: 'Pays-Bas', dialCode: '+31', flag: '🇳🇱' },
  { code: 'MA', name: 'Maroc', dialCode: '+212', flag: '🇲🇦' },
  { code: 'DZ', name: 'Algérie', dialCode: '+213', flag: '🇩🇿' },
  { code: 'TN', name: 'Tunisie', dialCode: '+216', flag: '🇹🇳' },
];

// Numéro WhatsApp cible
const WHATSAPP_NUMBER = '22962278090';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [showTimeField, setShowTimeField] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'BJ') || countries[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [dateSelectedMessage, setDateSelectedMessage] = useState(false);
  const [timeError, setTimeError] = useState<string | null>(null);
  
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Scroll en haut du modal quand on passe à l'étape 2 (surtout pour mobile)
  useEffect(() => {
    if (step === 2 && modalContentRef.current) {
      // Petit délai pour laisser le temps à l'animation de se faire
      setTimeout(() => {
        modalContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [step]);

  // Fermer le dropdown quand on clique dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Générer les jours du calendrier pour le mois courant
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    
    // Ajuster pour commencer par lundi
    let startDate = new Date(firstDay);
    const dayOfWeek = startDate.getDay(); // 0 = dimanche, 1 = lundi...
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(firstDay.getDate() - daysToSubtract);
    
    // Générer 42 jours (6 semaines)
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    setCalendarDays(days);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate('');
    setSelectedTime('');
    setShowTimeField(false);
    setDateSelectedMessage(false);
    setTimeError(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate('');
    setSelectedTime('');
    setShowTimeField(false);
    setDateSelectedMessage(false);
    setTimeError(null);
  };

  const handleDateSelect = (date: Date) => {
    // Formater la date en gardant le fuseau horaire local
    // On crée une nouvelle date à minuit en heure locale
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Format YYYY-MM-DD pour le stockage
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    setSelectedDate(dateStr);
    setSelectedTime('');
    setShowTimeField(true);
    setDateSelectedMessage(true);
    setTimeError(null);
  };

  // Fonction pour cacher le message quand on interagit avec le champ heure
  const handleTimeInputFocus = () => {
    setDateSelectedMessage(false);
    setTimeError(null);
  };

  // Fonction pour parser l'heure saisie
  const parseTime = (input: string): { hours: number; minutes: number } | null => {
    // Patterns courants
    const patterns = [
      /(\d{1,2})\s*h(?:\s*(\d{1,2})\s*(?:min|mn|minutes?)?)?/i,
      /(\d{1,2}):(\d{2})/,
      /(\d{1,2})\s*heures?\s*(\d{1,2})?/i,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = match[2] ? parseInt(match[2]) : 0;
        
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          return { hours, minutes };
        }
      }
    }
    return null;
  };

  // Fonction pour vérifier si l'heure est déjà passée (CORRIGÉE)
  const isTimePast = (dateStr: string, timeStr: string): boolean => {
    const parsedTime = parseTime(timeStr);
    if (!parsedTime) return false;

    // Extraire l'année, mois et jour de la date string
    const [year, month, day] = dateStr.split('-').map(Number);
    
    // Créer la date avec l'heure en heure locale
    // Note: mois - 1 car les mois vont de 0 à 11 en JS
    const selectedDateTime = new Date(year, month - 1, day, parsedTime.hours, parsedTime.minutes, 0);
    
    const now = new Date();
    
    return selectedDateTime < now;
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTimeInput(input);
    setDateSelectedMessage(false);
    
    // Vérifier si l'heure est valide et pas dans le passé
    if (input.trim() && selectedDate) {
      const parsedTime = parseTime(input);
      if (parsedTime) {
        if (isTimePast(selectedDate, input)) {
          setTimeError("Cette heure est déjà passée. Veuillez choisir une heure future.");
        } else {
          setTimeError(null);
        }
      } else {
        setTimeError("Format d'heure non reconnu. Utilisez par exemple: 14h30, 17h, 09:45");
      }
    } else {
      setTimeError(null);
    }
  };

  const handleExampleTimeClick = (example: string) => {
    setTimeInput(example);
    setDateSelectedMessage(false);
    
    // Vérifier si l'heure exemple est dans le passé
    if (selectedDate) {
      if (isTimePast(selectedDate, example)) {
        setTimeError("Cette heure est déjà passée. Veuillez choisir une heure future.");
      } else {
        setTimeError(null);
      }
    }
  };

  const handleTimeSubmit = () => {
    if (timeInput.trim()) {
      // Vérifier une dernière fois si l'heure est dans le passé
      if (selectedDate && isTimePast(selectedDate, timeInput)) {
        setTimeError("Cette heure est déjà passée. Veuillez choisir une heure future.");
        return;
      }
      
      setSelectedTime(timeInput);
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setTimeInput(selectedTime); // Garder l'heure saisie
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: contactMethod === 'email' && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)),
      phone: contactMethod === 'whatsapp' && !formData.phone.trim(),
    };
    
    setFormErrors(errors);
    
    if (contactMethod === 'whatsapp') {
      return !errors.name && !errors.phone;
    } else {
      return !errors.name && !errors.email;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Formater la date pour l'affichage - UTILISER L'HEURE LOCALE
    const [year, month, day] = selectedDate.split('-').map(Number);
    // Créer une date en heure locale (mois-1 car les mois vont de 0 à 11)
    const selectedDay = new Date(year, month - 1, day);
    
    const formattedDate = selectedDay.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
    
    let message = '';
    let targetUrl = '';
    
    if (contactMethod === 'whatsapp') {
      // Formatage du message pour WhatsApp
      message = `🔔 *NOUVELLE DEMANDE DE RENDEZ-VOUS* 🔔
      
👤 *Nom:* ${formData.name}
📞 *Téléphone:* ${selectedCountry.dialCode} ${formData.phone}
📅 *Date:* ${formattedDate}
⏰ *Heure:* ${selectedTime}
💬 *Message:* ${formData.message || 'Pas de message'}`;
      
      // Redirection vers le numéro cible
      targetUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    } else {
      message = `🔔 NOUVELLE DEMANDE DE RENDEZ-VOUS 🔔
      
Nom: ${formData.name}
Email: ${formData.email}
Date: ${formattedDate}
Heure: ${selectedTime}
Message: ${formData.message || 'Pas de message'}`;
      
      targetUrl = `mailto:contact@patawala.com?subject=Rendez-vous le ${formattedDate}&body=${encodeURIComponent(message)}`;
    }
    
    // Ouvrir WhatsApp ou email
    window.open(targetUrl, '_blank');
    
    // Afficher le message de confirmation
    setIsSubmitted(true);
    
    // Fermer le modal après 2 secondes
    setTimeout(() => {
      onClose();
      // Réinitialiser tout
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setTimeInput('');
      setShowTimeField(false);
      setCurrentMonth(new Date());
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormErrors({ name: false, email: false, phone: false });
      setIsSubmitted(false);
      setDateSelectedMessage(false);
      setTimeError(null);
    }, 2000);
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Créer une copie de la date à comparer avec les heures mises à 0
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    return compareDate >= today;
  };

  // Fonction pour formater la date pour l'affichage dans le récapitulatif
  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    // Créer la date en heure locale (mois-1 car les mois vont de 0 à 11)
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-[#0A0F1C] rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-[#1F2937]"
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 sm:p-2 hover:bg-[#1E2638] rounded-full transition-colors bg-[#1E2638] sm:bg-transparent"
            aria-label="Fermer"
          >
            <X size={20} className="text-gray-400" />
          </button>

          {/* En-tête - Fixe en haut */}
          <div className="sticky top-0 z-10 p-5 sm:p-8 border-b border-[#1F2937] bg-gradient-to-r from-blue-500/10 to-transparent bg-[#0A0F1C]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-400">30 minutes offertes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {step === 1 ? 'Réservez votre appel découverte' : 'Finalisez votre réservation'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {step === 1 
                ? 'Choisissez la date qui vous arrange'
                : 'Laissez-moi vos coordonnées'
              }
            </p>

            {/* Barre de progression */}
            <div className="flex gap-2 mt-4">
              <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-700'}`} />
              <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`} />
            </div>
          </div>

          {/* Corps du modal - Scrollable */}
          <div 
            ref={modalContentRef}
            className="p-5 sm:p-8 overflow-y-auto"
            style={{ maxHeight: 'calc(95vh - 180px)' }}
          >
            {step === 1 ? (
              <div className="space-y-6">
                {/* Message d'accueil */}
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium">
                        Planifiez notre rencontre selon vos disponibilités.
                      </p>
                      
                      <div className="text-xs text-gray-400 mt-1 space-y-1">
                        <p>Choisissez d'abord votre date, puis indiquez l'heure qui vous arrange.</p>
                        <p>Je validerai personnellement votre créneau dès réception de votre demande.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendrier */}
                <div>
                  {/* Navigation mois */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-[#1E2638] rounded-full transition-colors"
                      aria-label="Mois précédent"
                    >
                      <ChevronLeft size={20} className="text-gray-400" />
                    </button>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-[#1E2638] rounded-full transition-colors"
                      aria-label="Mois suivant"
                    >
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  </div>

                  {/* Jours de la semaine */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Grille du calendrier */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {calendarDays.map((date, index) => {
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      
                      // Créer une date à minuit en heure locale pour la comparaison
                      const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      const isSelectable = localDate >= today;
                      const isToday = localDate.toDateString() === today.toDateString();
                      
                      // Formater la date pour le stockage
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      const dateStr = `${year}-${month}-${day}`;
                      const isSelected = selectedDate === dateStr;
                      const isPast = localDate < today;

                      return (
                        <button
                          key={index}
                          onClick={() => isSelectable && !isPast && handleDateSelect(date)}
                          disabled={!isSelectable || isPast}
                          className={`
                            aspect-square p-1 sm:p-2 rounded-lg transition-all relative
                            ${!isCurrentMonth ? 'opacity-30' : ''}
                            ${isSelected 
                              ? 'bg-blue-500 text-white ring-4 ring-blue-500/20 scale-105' 
                              : isSelectable && !isPast
                                ? 'hover:bg-blue-500/20 cursor-pointer bg-[#141B2B] border border-[#1F2937] text-gray-300 active:scale-95'
                                : 'bg-[#0A0F1C] cursor-not-allowed text-gray-600 border border-[#1F2937]'
                            }
                            ${isToday && !isSelected ? 'border-2 border-blue-500/50' : ''}
                          `}
                          aria-label={`Sélectionner le ${date.getDate()} ${monthNames[date.getMonth()]}`}
                        >
                          <span className="text-sm sm:text-base">{date.getDate()}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message de confirmation de date */}
                <AnimatePresence>
                  {dateSelectedMessage && !timeError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-500/10 rounded-xl p-4 border border-green-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <ThumbsUp size={20} className="text-green-400 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-green-400 font-medium">
                            Date sélectionnée !
                          </p>
                          <p className="text-xs text-gray-300 mt-0.5">
                            Maintenant, indiquez l'heure qui vous arrange
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Champ d'heure qui apparaît après sélection de date */}
                <AnimatePresence>
                  {showTimeField && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3 bg-[#141B2B] rounded-xl p-4 border border-[#1F2937]"
                    >
                      <label className="block text-sm font-medium text-gray-300">
                        <Clock size={16} className="inline mr-2 text-blue-400" />
                        À quelle heure voulez-vous qu'on s'appelle ?
                      </label>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={timeInput}
                          onChange={handleTimeInputChange}
                          onFocus={handleTimeInputFocus}
                          onKeyPress={(e) => e.key === 'Enter' && !timeError && handleTimeSubmit()}
                          placeholder="Ex: 14h30, 17h, 20 heures, 09:45..."
                          className={`w-full px-4 py-4 sm:py-3 bg-[#0A0F1C] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                            timeError ? 'border-red-500' : 'border-[#1F2937]'
                          }`}
                          autoFocus
                        />
                        
                        {/* Message d'erreur si l'heure est invalide ou passée */}
                        {timeError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                          >
                            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                            <span>{timeError}</span>
                          </motion.div>
                        )}
                        
                        {/* Exemples visuels */}
                        <div className="flex flex-wrap gap-2">
                          {['8h', '10h', '14h', '16h30', '18h', '20h', '21h15'].map((example) => {
                            const isPastExample = selectedDate ? isTimePast(selectedDate, example) : false;
                            return (
                              <button
                                key={example}
                                onClick={() => handleExampleTimeClick(example)}
                                disabled={isPastExample}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                                  isPastExample 
                                    ? 'bg-[#1E2638] text-gray-600 cursor-not-allowed line-through opacity-50' 
                                    : 'bg-[#1E2638] text-gray-300 hover:bg-[#2A3442]'
                                }`}
                                title={isPastExample ? "Cette heure est déjà passée" : ""}
                              >
                                {example}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={handleTimeSubmit}
                          disabled={!timeInput.trim() || !!timeError}
                          className="w-full bg-blue-500 text-white px-4 py-4 sm:py-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          Continuer
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message si pas de date sélectionnée */}
                {!showTimeField && !dateSelectedMessage && (
                  <div className="bg-[#141B2B] rounded-xl p-6 text-center border border-[#1F2937] border-dashed">
                    <Calendar size={32} className="mx-auto text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">
                      Choisissez une date dans le calendrier
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Récapitulatif du rendez-vous */}
                {selectedDate && selectedTime && (
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                    <p className="text-xs text-gray-400 mb-2">Récapitulatif de votre rendez-vous :</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex items-center gap-2 bg-[#141B2B] px-3 py-2 rounded-lg border border-[#1F2937]">
                        <Calendar size={16} className="text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">
                          {formatDisplayDate(selectedDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#141B2B] px-3 py-2 rounded-lg border border-[#1F2937]">
                        <Clock size={16} className="text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Choix du mode de contact */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Comment souhaitez-vous être contacté ?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setContactMethod('whatsapp')}
                      className={`flex items-center justify-center gap-2 p-4 sm:p-3 rounded-xl border-2 transition-all ${
                        contactMethod === 'whatsapp'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-[#1F2937] text-gray-400 hover:border-blue-500/30 hover:bg-[#1E2638]'
                      }`}
                    >
                      <MessageCircle size={18} />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex items-center justify-center gap-2 p-4 sm:p-3 rounded-xl border-2 transition-all ${
                        contactMethod === 'email'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-[#1F2937] text-gray-400 hover:border-blue-500/30 hover:bg-[#1E2638]'
                      }`}
                    >
                      <Mail size={18} />
                      <span className="text-sm font-medium">Email</span>
                    </button>
                  </div>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    <User size={16} className="inline mr-1.5 text-blue-400" />
                    Votre prénom / nom
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-4 sm:py-3 bg-[#141B2B] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                      formErrors.name ? 'border-red-500' : 'border-[#1F2937]'
                    }`}
                    placeholder="Ex: Jean Dupont"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-400 mt-1">Veuillez entrer votre nom</p>
                  )}
                </div>

                {/* Email ou Téléphone selon le choix */}
                {contactMethod === 'whatsapp' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      <Phone size={16} className="inline mr-1.5 text-blue-400" />
                      Numéro WhatsApp
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Sélecteur de pays */}
                      <div className="relative w-full sm:w-32" ref={countryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-4 sm:py-3 bg-[#141B2B] border border-[#1F2937] rounded-xl text-sm text-white hover:bg-[#1E2638] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{selectedCountry.flag}</span>
                            <span className="sm:hidden">{selectedCountry.name}</span>
                            <span>{selectedCountry.dialCode}</span>
                          </span>
                          <ChevronDown size={16} className={`text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown des pays */}
                        <AnimatePresence>
                          {showCountryDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 mt-1 w-full sm:w-64 max-h-60 overflow-y-auto bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-xl z-50"
                            >
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1E2638] transition-colors text-left"
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span className="text-sm text-gray-300 flex-1">{country.name}</span>
                                  <span className="text-xs text-gray-500">{country.dialCode}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Numéro de téléphone */}
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`flex-1 px-4 py-4 sm:py-3 bg-[#141B2B] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-[#1F2937]'
                        }`}
                        placeholder="XX XX XX XX"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-400 mt-1">Veuillez entrer votre numéro</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <MessageCircle size={12} className="text-green-500" />
                      Gratuit - Votre demande sera envoyée directement sur WhatsApp
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      <Mail size={16} className="inline mr-1.5 text-blue-400" />
                      Votre email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-4 sm:py-3 bg-[#141B2B] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                        formErrors.email ? 'border-red-500' : 'border-[#1F2937]'
                      }`}
                      placeholder="exemple@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-400 mt-1">Email valide requis</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Mail size={12} className="text-blue-400" />
                      Gratuit - Je vous répondrai par email
                    </p>
                  </div>
                )}

                {/* Message optionnel */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    <MessageSquare size={16} className="inline mr-1.5 text-blue-400" />
                    Parlez-moi de votre projet (optionnel)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-4 sm:py-3 bg-[#141B2B] border border-[#1F2937] rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 resize-none"
                    placeholder="Site web, application mobile, outil sur-mesure... Dites-moi tout !"
                  />
                </div>

                {/* Message de confirmation */}
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                  <p className="text-xs text-green-400 flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>
                      {contactMethod === 'whatsapp' 
                        ? 'En cliquant sur "Confirmer", vous serez redirigé vers WhatsApp. Gratuit et sans engagement.'
                        : 'En cliquant sur "Confirmer", je vous répondrai par email. Gratuit et sans engagement.'
                      }
                    </span>
                  </p>
                </div>

                {/* Boutons de navigation */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full sm:flex-1 px-4 py-4 sm:py-3 border border-[#1F2937] rounded-xl text-sm font-medium text-gray-300 hover:bg-[#1E2638] transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={16} />
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-4 sm:py-3 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={16} />
                        Rendez-vous confirmé !
                      </>
                    ) : (
                      <>
                        {contactMethod === 'whatsapp' ? <MessageCircle size={16} /> : <Mail size={16} />}
                        Confirmer
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}