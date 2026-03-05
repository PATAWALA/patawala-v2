'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Service } from './data/servicesData';
import { useState } from 'react';
import BookingModal from '../components/ui/BookingModal';
import { useLanguage } from '../context/LanguageContext';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

export default function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { t, language } = useLanguage();

  // Récupérer les données de traduction
  const getTranslatedData = () => {
    const servicesData = t('services', 'services-data');
    const cardData = t('card', 'services-data');
    
    // Valeurs par défaut selon la langue
    const defaults = {
      fr: {
        popular: 'Populaire',
        from: 'À partir de',
        hourly: '/h',
        monthly: '/mois',
        more: '+{{count}} autres fonctionnalités'
      },
      en: {
        popular: 'Popular',
        from: 'From',
        hourly: '/h',
        monthly: '/month',
        more: '+{{count}} more features'
      }
    };

    const currentDefaults = language === 'fr' ? defaults.fr : defaults.en;

    // Vérifier si nous avons des traductions pour ce service
    let translatedService = null;
    if (servicesData && typeof servicesData === 'object' && servicesData !== null) {
      if (service.id in servicesData) {
        translatedService = (servicesData as Record<string, any>)[service.id];
      }
    }

    // Parser les labels de la carte si nécessaire
    let cardLabels = currentDefaults;
    if (cardData && typeof cardData === 'object' && cardData !== null) {
      cardLabels = {
        popular: (cardData as any).popular || currentDefaults.popular,
        from: (cardData as any).from || currentDefaults.from,
        hourly: (cardData as any).hourly || currentDefaults.hourly,
        monthly: (cardData as any).monthly || currentDefaults.monthly,
        more: (cardData as any).features?.more || currentDefaults.more,
      };
    }

    return {
      service: translatedService || service,
      labels: cardLabels
    };
  };

  const { service: translatedService, labels } = getTranslatedData();

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  // Déterminer le suffixe de prix
  const getPriceSuffix = () => {
    const priceType = translatedService.pricing?.type;
    if (priceType === 'horaire' || priceType === 'hourly') return labels.hourly;
    if (priceType === 'mensuel' || priceType === 'monthly') return labels.monthly;
    return '';
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full flex flex-col relative"
        style={{ isolation: 'isolate' }} /* ← Ajout pour éviter les problèmes de stacking context */
      >
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
              <Icon size={24} className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </div>
            
            {service.popular && (
              <span className="bg-[#FF9800] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_4px_10px_rgba(255,152,0,0.4)]">
                {labels.popular}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {translatedService.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4">
            {translatedService.shortDesc}
          </p>

          <div className="mb-4">
            <span className="text-2xl font-bold text-white">
              {labels.from} {translatedService.pricing?.startingAt} {translatedService.pricing?.currency}
            </span>
            {getPriceSuffix() && (
              <span className="text-gray-500 text-sm ml-1">{getPriceSuffix()}</span>
            )}
          </div>

          <p className="text-sm text-gray-500 border-t border-[#1F2937] pt-4">
            {translatedService.description}
          </p>
        </div>

        <div className="px-6 pb-6 flex-1">
          <div className="space-y-2 mb-6">
            {translatedService.features?.slice(0, 3).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
            {translatedService.features?.length > 3 && (
              <div className="text-xs text-gray-500 ml-6">
                {labels.more.replace('{{count}}', String(translatedService.features.length - 3))}
              </div>
            )}
          </div>

          <button 
            onClick={handleOpenBooking}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25 cursor-pointer"
          >
            <span className="text-center">{translatedService.ctaText}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>

      {/* Le modal est rendu ici, mais avec un portail implicite */}
      <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
    </>
  );
}