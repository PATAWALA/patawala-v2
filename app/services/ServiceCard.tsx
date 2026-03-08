'use client';

import { memo, useCallback, useState, useMemo } from 'react';
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

  // Récupérer les données de traduction - OPTIMISÉ AVEC useMemo
  const { translatedService, labels } = useMemo(() => {
    const servicesData = t('services', 'services-data');
    const cardData = t('card', 'services-data');

    // Valeurs par défaut selon la langue (uniquement ce qui reste)
    const defaults = {
      fr: {
        popular: 'Populaire',
        more: '+{{count}} autres'
      },
      en: {
        popular: 'Popular',
        more: '+{{count}} more'
      }
    };

    const currentDefaults = language === 'fr' ? defaults.fr : defaults.en;

    // Traduction du service
    let translatedService = service;
    if (servicesData && typeof servicesData === 'object' && servicesData !== null) {
      const found = (servicesData as Record<string, any>)[service.id];
      if (found) translatedService = found;
    }

    // Labels de la carte (popular et more)
    let cardLabels = currentDefaults;
    if (cardData && typeof cardData === 'object' && cardData !== null) {
      const cd = cardData as any;
      cardLabels = {
        popular: cd.popular || currentDefaults.popular,
        more: cd.features?.more || currentDefaults.more,
      };
    }

    return { translatedService, labels: cardLabels };
  }, [service, t, language]);

  // Générer un ID unique pour le titre de la carte (accessibilité)
  const cardTitleId = `service-${service.id}-title`;

  // Features à afficher - OPTIMISÉ AVEC useMemo
  const { visibleFeatures, moreCount } = useMemo(() => {
    const features = translatedService.features || [];
    return {
      visibleFeatures: features.slice(0, 3),
      moreCount: features.length > 3 ? features.length - 3 : 0
    };
  }, [translatedService.features]);

  return (
    <>
      <article
        className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full flex flex-col relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] hover:-translate-y-1"
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

          {/* Prix supprimé */}

          <p className="text-sm text-gray-500 border-t border-[#1F2937] pt-4">
            {translatedService.description}
          </p>
        </div>

        <div className="px-6 pb-6 flex-1">
          <div className="space-y-2 mb-6">
            {visibleFeatures.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
            {moreCount > 0 && (
              <div className="text-xs text-gray-500 ml-6" aria-label={labels.more.replace('{{count}}', String(moreCount))}>
                {labels.more.replace('{{count}}', String(moreCount))}
              </div>
            )}
          </div>

          <button
            onClick={handleOpenBooking}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] active:scale-[0.98]"
            aria-label={translatedService.ctaText}
          >
            <span>{translatedService.ctaText}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </button>
        </div>
      </article>

      {/* Modal – une seule instance par carte */}
      <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;