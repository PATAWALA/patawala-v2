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

  // Récupérer les traductions
  const servicesData = t('services', 'services-data') || {};
  const cardData = t('card', 'services-data') || {};
  
  // Traduction du service spécifique
  const serviceTranslation = servicesData[service.id] || {};

  // Labels de la carte avec fallback
  const cardLabels = {
    popular: cardData.popular || (language === 'fr' ? 'Populaire' : 'Popular'),
    from: cardData.from || (language === 'fr' ? 'À partir de' : 'From'),
    hourly: cardData.hourly || '/h',
    monthly: cardData.monthly || (language === 'fr' ? '/mois' : '/month'),
    features: {
      more: cardData.features?.more || (language === 'fr' ? '+{{count}} autres fonctionnalités' : '+{{count}} more features')
    }
  };

  // Fusionner les données originales avec les traductions
  const serviceData = {
    title: serviceTranslation.title || service.title,
    shortDesc: serviceTranslation.shortDesc || service.shortDesc,
    description: serviceTranslation.description || service.description,
    ctaText: serviceTranslation.ctaText || service.ctaText,
    pricing: {
      startingAt: serviceTranslation.pricing?.startingAt || service.pricing.startingAt,
      currency: serviceTranslation.pricing?.currency || service.pricing.currency,
      type: serviceTranslation.pricing?.type || service.pricing.type
    },
    features: serviceTranslation.features || service.features,
    popular: service.popular
  };

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  // Déterminer le suffixe de prix
  const getPriceSuffix = () => {
    if (serviceData.pricing.type === 'horaire') return cardLabels.hourly;
    if (serviceData.pricing.type === 'mensuel') return cardLabels.monthly;
    return '';
  };

  // Formatter le prix pour l'affichage
  const displayPrice = () => {
    const amount = serviceData.pricing.startingAt;
    const currency = serviceData.pricing.currency;
    
    // Si c'est un nombre, le formatter
    if (typeof amount === 'number') {
      return amount.toString();
    }
    return amount;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full flex flex-col"
      >
        {/* En-tête avec icône */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
              <Icon size={24} className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </div>
            
            {service.popular && (
              <span className="bg-[#FF9800] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_4px_10px_rgba(255,152,0,0.4)]">
                {cardLabels.popular}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {serviceData.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4">
            {serviceData.shortDesc}
          </p>

          {/* Prix */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-white">
              {cardLabels.from} {displayPrice()} {serviceData.pricing.currency}
            </span>
            {getPriceSuffix() && (
              <span className="text-gray-500 text-sm ml-1">{getPriceSuffix()}</span>
            )}
          </div>

          {/* Description courte */}
          <p className="text-sm text-gray-500 border-t border-[#1F2937] pt-4">
            {serviceData.description}
          </p>
        </div>

        {/* Features */}
        <div className="px-6 pb-6 flex-1">
          <div className="space-y-2 mb-6">
            {serviceData.features.slice(0, 3).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
            {serviceData.features.length > 3 && (
              <div className="text-xs text-gray-500 ml-6">
                {cardLabels.features.more.replace('{{count}}', String(serviceData.features.length - 3))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button 
            onClick={handleOpenBooking}
            className="w-full border border-blue-500/30 bg-blue-500/5 text-blue-400 font-medium py-2.5 px-4 rounded-xl flex items-center justify-between group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span>{serviceData.ctaText}</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>

      {/* Modal de réservation */}
      <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
    </>
  );
}