'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, User, Mail, Phone, 
  CheckCircle, MessageSquare, ChevronLeft, 
  ChevronRight, Sparkles, Globe, MessageCircle,
  ChevronDown 
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

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{[key: string]: string[]}>({});
  const [contactMethod, setContactMethod] = useState<ContactMethod>('whatsapp');
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'BF') || countries[0]);
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

  // Générer les jours du calendrier pour le mois courant
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Premier jour du mois
    const firstDay = new Date(year, month, 1);
    // Dernier jour du mois
    const lastDay = new Date(year, month + 1, 0);
    
    // Ajuster pour commencer par lundi (si le mois commence un dimanche, on recule)
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
    
    // Simuler des créneaux disponibles (à remplacer par votre vraie logique)
    const slots: {[key: string]: string[]} = {};
    days.forEach(day => {
      // Ne mettre des créneaux que pour les jours du mois en cours et futurs
      if (day >= new Date(new Date().setHours(0,0,0,0)) && day.getMonth() === month) {
        // Éviter les dimanches
        if (day.getDay() !== 0) {
          // Générer entre 3 et 6 créneaux par jour
          const count = Math.floor(Math.random() * 4) + 3;
          const daySlots = [];
          for (let i = 0; i < count; i++) {
            const hour = 9 + Math.floor(Math.random() * 8);
            const minute = Math.random() > 0.5 ? '00' : '30';
            daySlots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
          }
          daySlots.sort();
          slots[day.toISOString().split('T')[0]] = daySlots;
        }
      }
    });
    setAvailableSlots(slots);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleNext = () => {
    if (step === 1 && selectedDate && selectedTime) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: contactMethod === 'email' && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)),
      phone: contactMethod === 'whatsapp' && !formData.phone.trim(),
    };
    
    setFormErrors(errors);
    
    // Retourne true si aucune erreur
    if (contactMethod === 'whatsapp') {
      return !errors.name && !errors.phone;
    } else {
      return !errors.name && !errors.email;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Valider le formulaire avant soumission
    if (!validateForm()) {
      return;
    }
    
    const selectedDay = new Date(selectedDate);
    const formattedDate = selectedDay.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
    
    let message = '';
    let targetUrl = '';
    
    if (contactMethod === 'whatsapp') {
      message = `🔔 *Nouvelle demande de rendez-vous* 🔔
      
👤 *Nom:* ${formData.name}
📞 *Téléphone:* ${selectedCountry.dialCode} ${formData.phone}
📅 *Date:* ${formattedDate}
⏰ *Heure:* ${selectedTime}
💬 *Message:* ${formData.message || 'Aucun message'}`;
      
      targetUrl = `https://wa.me/${selectedCountry.dialCode.replace('+', '')}${formData.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    } else {
      message = `🔔 Nouvelle demande de rendez-vous 🔔
      
Nom: ${formData.name}
Email: ${formData.email}
Date: ${formattedDate}
Heure: ${selectedTime}
Message: ${formData.message || 'Aucun message'}`;
      
      targetUrl = `mailto:contact@patawala.com?subject=Rendez-vous le ${formattedDate}&body=${encodeURIComponent(message)}`;
    }
    
    window.open(targetUrl, '_blank');
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      onClose();
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setCurrentMonth(new Date());
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormErrors({ name: false, email: false, phone: false });
      setIsSubmitted(false);
    }, 2000);
  };

  const isDateSelectable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-[#0A0F1C] rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#1F2937]"
        >
          {/* Bouton fermer */}
          <button
            title='fermer'
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-[#1E2638] rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>

          {/* En-tête */}
          <div className="p-6 sm:p-8 border-b border-[#1F2937] bg-gradient-to-r from-blue-500/10 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">30 minutes offertes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {step === 1 ? 'Réservez votre appel découverte' : 'Finalisez votre réservation'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {step === 1 
                ? 'Choisissez le jour et l\'heure qui vous arrangent'
                : 'Laissez-moi vos coordonnées pour vous confirmer le rendez-vous'
              }
            </p>

            {/* Barre de progression */}
            <div className="flex gap-2 mt-4">
              <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-700'}`} />
              <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-700'}`} />
            </div>
          </div>

          {/* Corps du modal */}
          <div className="p-6 sm:p-8">
            {step === 1 ? (
              <div className="space-y-8">
                {/* Message d'accueil */}
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200 font-medium">Sans engagement, sans pression</p>
                      <p className="text-xs text-gray-400 mt-1">
                        On discute de votre projet, je vous conseille, et vous décidez ensuite.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calendrier interactif avec navigation mois */}
                <div>
                  {/* Navigation mois */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      title='mois précédent'
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-[#1E2638] rounded-full transition-colors"
                    >
                      <ChevronLeft size={20} className="text-gray-400" />
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      title='mois suivant'
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-[#1E2638] rounded-full transition-colors"
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
                      const dateStr = date.toISOString().split('T')[0];
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const isSelectable = isDateSelectable(date);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isSelected = selectedDate === dateStr;
                      const isPast = date < new Date(new Date().setHours(0,0,0,0));

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (isSelectable && !isPast) {
                              setSelectedDate(dateStr);
                              setSelectedTime('');
                            }
                          }}
                          disabled={!isSelectable || isPast}
                          className={`
                            aspect-square p-1 rounded-lg transition-all relative
                            ${!isCurrentMonth ? 'opacity-30' : ''}
                            ${isSelected 
                              ? 'bg-blue-500 text-white ring-4 ring-blue-500/20' 
                              : isSelectable && !isPast
                                ? 'hover:bg-blue-500/10 cursor-pointer bg-[#141B2B] border border-[#1F2937] text-gray-300'
                                : 'bg-[#0A0F1C] cursor-not-allowed text-gray-600 border border-[#1F2937]'
                            }
                            ${isToday && !isSelected ? 'border-2 border-blue-500/50' : ''}
                          `}
                        >
                          <span className="text-sm">{date.getDate()}</span>
                          {isSelectable && !isPast && isCurrentMonth && (
                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sélection de l'heure */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-medium text-gray-300">
                      <Clock size={16} className="inline mr-2 text-blue-400" />
                      Heures disponibles le {formatDisplayDate(new Date(selectedDate))}
                    </label>
                    
                    {availableSlots[selectedDate]?.length > 0 ? (
                      <>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {availableSlots[selectedDate].map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 rounded-xl border-2 transition-all ${
                                selectedTime === time
                                  ? 'border-blue-500 bg-blue-500/10 ring-4 ring-blue-500/20 text-blue-400'
                                  : 'border-[#1F2937] hover:border-blue-500/30 hover:bg-[#1E2638] text-gray-300'
                              }`}
                            >
                              <span className="text-sm font-medium">{time}</span>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          ⏰ Durée : 30 minutes
                        </p>
                      </>
                    ) : (
                      <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
                        <p className="text-sm text-yellow-400">
                          Aucun créneau disponible pour cette date.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Message si pas de date sélectionnée */}
                {!selectedDate && (
                  <div className="bg-[#141B2B] rounded-xl p-6 text-center border border-[#1F2937] border-dashed">
                    <Calendar size={24} className="mx-auto text-gray-600 mb-2" />
                    <p className="text-sm text-gray-400">
                      Sélectionnez une date dans le calendrier
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Récapitulatif du rendez-vous */}
                {selectedDate && selectedTime && (
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 mb-4">
                    <p className="text-xs text-gray-400 font-medium mb-2">Récapitulatif :</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-[#141B2B] px-3 py-1.5 rounded-full text-sm border border-[#1F2937]">
                        <Calendar size={14} className="text-blue-400" />
                        <span className="text-gray-300">{formatDisplayDate(new Date(selectedDate))}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-[#141B2B] px-3 py-1.5 rounded-full text-sm border border-[#1F2937]">
                        <Clock size={14} className="text-blue-400" />
                        <span className="text-gray-300">{selectedTime}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Choix du mode de contact */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Comment souhaitez-vous être contacté ?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setContactMethod('whatsapp')}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
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
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
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
                    className={`w-full px-4 py-3 bg-[#141B2B] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                      formErrors.name ? 'border-red-500' : 'border-[#1F2937]'
                    }`}
                    placeholder="Ex: Jean Dupont"
                  />
                  {formErrors.name && (
                    <p className="text-xs text-red-400 mt-1">Ce champ est requis</p>
                  )}
                </div>

                {/* Email ou Téléphone selon le choix */}
                {contactMethod === 'whatsapp' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      <Phone size={16} className="inline mr-1.5 text-blue-400" />
                      Numéro WhatsApp
                    </label>
                    <div className="flex gap-2">
                      {/* Sélecteur de pays */}
                      <div className="relative w-32">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="w-full flex items-center gap-2 px-3 py-3 bg-[#141B2B] border border-[#1F2937] rounded-xl text-sm text-white hover:bg-[#1E2638] transition-colors"
                        >
                          <span className="text-lg">{selectedCountry.flag}</span>
                          <span className="flex-1 text-left">{selectedCountry.dialCode}</span>
                          <ChevronDown size={16} className={`text-gray-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown des pays */}
                        <AnimatePresence>
                          {showCountryDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-xl z-50"
                            >
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#1E2638] transition-colors text-left"
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span className="text-sm text-gray-300">{country.name}</span>
                                  <span className="text-xs text-gray-500 ml-auto">{country.dialCode}</span>
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
                        className={`flex-1 px-4 py-3 bg-[#141B2B] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-[#1F2937]'
                        }`}
                        placeholder="XX XX XX XX"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-400 mt-1">Ce champ est requis</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      <MessageCircle size={12} className="inline mr-1 text-green-500" />
                      Gratuit - Vous serez redirigé vers WhatsApp
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
                      className={`w-full px-4 py-3 bg-[#141B2B] border rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 ${
                        formErrors.email ? 'border-red-500' : 'border-[#1F2937]'
                      }`}
                      placeholder="exemple@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-400 mt-1">Email valide requis</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      <Mail size={12} className="inline mr-1 text-blue-400" />
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
                    className="w-full px-4 py-3 bg-[#141B2B] border border-[#1F2937] rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-sm text-white placeholder-gray-500 resize-none"
                    placeholder="Site web, application mobile, outil sur-mesure... Dites-moi tout !"
                  />
                </div>

                {/* Message de confirmation */}
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                  <p className="text-xs text-green-400 flex items-start gap-2">
                    <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>
                      {contactMethod === 'whatsapp' 
                        ? 'En cliquant sur "Confirmer", vous serez redirigé vers WhatsApp pour finaliser. Gratuit et sans engagement.'
                        : 'En cliquant sur "Confirmer", je vous répondrai par email dans les plus brefs délais. Gratuit et sans engagement.'
                      }
                    </span>
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Pied du modal - Boutons responsifs */}
          <div className="p-6 sm:p-8 border-t border-[#1F2937] bg-[#0A0F1C]/50">
            <div className="flex flex-col sm:flex-row gap-3">
              {step === 2 && (
                <button
                  onClick={handleBack}
                  className="w-full sm:flex-1 px-4 py-3 border border-[#1F2937] rounded-xl text-sm font-medium text-gray-300 hover:bg-[#1E2638] transition-colors flex items-center justify-center gap-1 order-2 sm:order-1"
                >
                  <ChevronLeft size={16} />
                  Retour
                </button>
              )}
              {step === 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 order-1 sm:order-2"
                >
                  Continuer
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 order-1 sm:order-2"
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
              )}
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 Vos informations sont confidentielles
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}