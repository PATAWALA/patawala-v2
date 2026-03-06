'use client';

import { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Service } from './data/servicesData';
import BookingModal from '../components/ui/BookingModal';
import { useLanguage } from '../context/LanguageContext';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

const ServiceCard = memo(function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { t, language } = useLanguage();

  // Mémoïsation des handlers
  const handleOpenBooking = useCallback(() => setIsBookingModalOpen(true), []);
  const handleCloseBooking = useCallback(() => setIsBookingModalOpen(false), []);

  // Récupérer les données de traduction (simplifié avec fallback)
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

    // Traduction du service
    let translatedService = service;
    if (servicesData && typeof servicesData === 'object' && servicesData !== null) {
      const found = (servicesData as Record<string, any>)[service.id];
      if (found) translatedService = found;
    }

    // Labels de la carte
    let cardLabels = currentDefaults;
    if (cardData && typeof cardData === 'object' && cardData !== null) {
      const cd = cardData as any;
      cardLabels = {
        popular: cd.popular || currentDefaults.popular,
        from: cd.from || currentDefaults.from,
        hourly: cd.hourly || currentDefaults.hourly,
        monthly: cd.monthly || currentDefaults.monthly,
        more: cd.features?.more || currentDefaults.more,
      };
    }

    return { service: translatedService, labels: cardLabels };
  };

  const { service: translatedService, labels } = getTranslatedData();

  // Déterminer le suffixe de prix
  const getPriceSuffix = () => {
    const priceType = translatedService.pricing?.type;
    if (priceType === 'horaire' ) return labels.hourly;
    if (priceType === 'mensuel') return labels.monthly;
    return '';
  };

  // Générer un ID unique pour le titre de la carte (accessibilité)
  const cardTitleId = `service-${service.id}-title`;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full flex flex-col relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
        style={{ isolation: 'isolate' }}
        aria-labelledby={cardTitleId}
        role="article"
      >
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300"
              aria-hidden="true"
            >
              <Icon size={24} className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </div>

            {service.popular && (
              <span
                className="bg-[#FF9800] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_4px_10px_rgba(255,152,0,0.4)]"
                aria-label={labels.popular}
              >
                {labels.popular}
              </span>
            )}
          </div>

          <h3 id={cardTitleId} className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {translatedService.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4">
            {translatedService.shortDesc}
          </p>

          <div className="mb-4" aria-label={`Prix : ${labels.from} ${translatedService.pricing?.startingAt} ${translatedService.pricing?.currency}${getPriceSuffix()}`}>
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
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
            {translatedService.features?.length > 3 && (
              <div className="text-xs text-gray-500 ml-6" aria-label={labels.more.replace('{{count}}', String(translatedService.features.length - 3))}>
                {labels.more.replace('{{count}}', String(translatedService.features.length - 3))}
              </div>
            )}
          </div>

          <button
            onClick={handleOpenBooking}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
            aria-label={translatedService.ctaText}
          >
            <span>{translatedService.ctaText}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </button>
        </div>
      </motion.article>

      {/* Modal – une seule instance par carte (ok pour un petit nombre) */}
      <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;