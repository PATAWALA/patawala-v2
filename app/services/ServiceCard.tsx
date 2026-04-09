'use client';

import { memo, useCallback, useMemo } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from './data/servicesData';
import { useTranslation } from '@/app/hooks/useTranslation';
import { useRouter } from 'next/navigation';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

const ServiceCard = memo(function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;
  const { t, language } = useTranslation();
  const router = useRouter();

  const goToContact = useCallback(() => {
    router.push('/#contact');
  }, [router]);

  const translatedService = useMemo(() => {
    const translated = t(`services.${service.id}`, 'servicesData');
    if (translated && typeof translated === 'object') return translated;
    return null;
  }, [t, service.id, language]);

  const cardLabels = useMemo(() => {
    return {
      popular: t('card.popular', 'servicesData') || (language === 'fr' ? 'Populaire' : 'Popular'),
      more: t('card.features.more', 'servicesData') || (language === 'fr' ? '+{{count}} autres' : '+{{count}} more')
    };
  }, [t, language]);

  const title = translatedService?.title || service.title;
  const shortDesc = translatedService?.shortDesc || service.shortDesc;
  const description = translatedService?.description || service.description;
  const ctaText = translatedService?.ctaText || service.ctaText;
  const features = translatedService?.features || service.features || [];

  const visibleFeatures = features.slice(0, 3);
  const moreCount = features.length > 3 ? features.length - 3 : 0;

  const cardTitleId = `service-${service.id}-title`;

  // Variants pour l'animation d'entrée
  const cardVariants : any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay
      }
    }
  };

  return (
    <motion.article
      className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md transition-all duration-300 border border-[#1F2937] h-full flex flex-col relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] font-sans"
      style={{ isolation: 'isolate' }}
      aria-labelledby={cardTitleId}
      role="article"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover="hover"
    >
      <div className="p-6 sm:p-6 pb-4">
        <div className="flex items-start justify-between mb-4 sm:mb-4">
          <motion.div
            className="w-14 h-14 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon size={28} className="sm:w-6 sm:h-6 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
          </motion.div>

          {service.popular && (
            <span
              className="bg-[#FF9800] text-white text-sm sm:text-xs font-bold px-4 py-2 sm:px-3 sm:py-1.5 rounded-full shadow-[0_4px_10px_rgba(255,152,0,0.4)]"
              aria-label={cardLabels.popular}
            >
              {cardLabels.popular}
            </span>
          )}
        </div>

        <h3
          id={cardTitleId}
          className="text-2xl sm:text-xl font-bold text-white mb-3 sm:mb-2 group-hover:text-cyan-400 transition-colors duration-300 tracking-tight"
        >
          {title}
        </h3>

        <p className="text-gray-400 text-base sm:text-sm mb-4 sm:mb-4 leading-relaxed">
          {shortDesc}
        </p>

        <p className="text-base sm:text-sm text-gray-500 border-t border-[#1F2937] pt-4 sm:pt-4 leading-relaxed">
          {description}
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
            <div className="text-sm sm:text-xs text-gray-500 ml-7 sm:ml-6">
              {cardLabels.more.replace('{{count}}', String(moreCount))}
            </div>
          )}
        </div>

        <motion.button
          onClick={goToContact}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium py-5 sm:py-3 px-4 rounded-xl flex items-center justify-center gap-2 sm:gap-2 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/25 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] active:scale-[0.98] min-h-[60px] sm:min-h-[44px]"
          aria-label={ctaText}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-base sm:text-sm font-semibold">{ctaText}</span>
          <ArrowRight size={20} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
        </motion.button>
      </div>
    </motion.article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;