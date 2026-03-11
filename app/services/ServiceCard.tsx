'use client';

import { memo, useCallback, useMemo } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Service } from './data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

const ServiceCard = memo(function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;
  const { t, language } = useLanguage();
  const router = useRouter();

  // Navigation vers la section contact de la page d'accueil
  const goToContact = useCallback(() => {
    router.push('/#contact');
  }, [router]);

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
    <article
      className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full flex flex-col relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] hover:-translate-y-1 font-sans"
      style={{ isolation: 'isolate' }}
      aria-labelledby={cardTitleId}
      role="article"
    >
      <div className="p-6 sm:p-6 pb-4">
        <div className="flex items-start justify-between mb-4 sm:mb-4">
          <div
            className="w-14 h-14 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300"
            aria-hidden="true"
          >
            <Icon size={28} className="sm:w-6 sm:h-6 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
          </div>

          {service.popular && (
            <span
              className="bg-[#FF9800] text-white text-sm sm:text-xs font-bold px-4 py-2 sm:px-3 sm:py-1.5 rounded-full shadow-[0_4px_10px_rgba(255,152,0,0.4)]"
              aria-label={labels.popular}
            >
              {labels.popular}
            </span>
          )}
        </div>

        <h3 id={cardTitleId} className="text-2xl sm:text-xl font-bold text-white mb-3 sm:mb-2 group-hover:text-cyan-400 transition-colors duration-300 tracking-tight">
          {translatedService.title}
        </h3>

        <p className="text-gray-400 text-base sm:text-sm mb-4 sm:mb-4 leading-relaxed">
          {translatedService.shortDesc}
        </p>

        {/* Prix supprimé */}

        <p className="text-base sm:text-sm text-gray-500 border-t border-[#1F2937] pt-4 sm:pt-4 leading-relaxed">
          {translatedService.description}
        </p>
      </div>

      <div className="px-6 sm:px-6 pb-6 sm:pb-6 flex-1">
        <div className="space-y-3 sm:space-y-2 mb-6 sm:mb-6">
          {visibleFeatures.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2 sm:gap-2">
              <CheckCircle size={18} className="sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-base sm:text-sm text-gray-300 leading-relaxed">{feature}</span>
            </div>
          ))}
          {moreCount > 0 && (
            <div className="text-sm sm:text-xs text-gray-500 ml-7 sm:ml-6" aria-label={labels.more.replace('{{count}}', String(moreCount))}>
              {labels.more.replace('{{count}}', String(moreCount))}
            </div>
          )}
        </div>

        <button
          onClick={goToContact}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 sm:gap-2 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] active:scale-[0.98] min-h-[60px] sm:min-h-[44px]"
          aria-label={translatedService.ctaText}
        >
          <span className="text-base sm:text-sm font-semibold">{translatedService.ctaText}</span>
          <ArrowRight size={20} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;