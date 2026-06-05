'use client';

import { memo, useCallback, useMemo } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from './data/servicesData';
import { useTranslation } from '@/app/hooks/useTranslation';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

const WHATSAPP_NUMBER = '22962278090';

const ServiceCard = memo(function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;
  const { t, language } = useTranslation();

  const goToWhatsApp = useCallback(() => {
    const message = encodeURIComponent(`Bonjour Abdoulaye, je suis intéressé par le service "${service.title}". Pouvez-vous m'en dire plus ?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  }, [service.title]);

  const translatedService = useMemo(() => {
    const translated = t(`services.${service.id}`, 'servicesData');
    if (translated && typeof translated === 'object') return translated;
    return null;
  }, [t, service.id, language]);

  const cardLabels = useMemo(() => {
    return {
      popular: t('card.popular', 'servicesData') || 'Populaire',
      more: t('card.features.more', 'servicesData') || '+{{count}} autres'
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

  return (
    <motion.article
      className="group bg-surface rounded-2xl p-6 flex flex-col h-full"
      style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.4)' }}
      aria-labelledby={cardTitleId}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(212,175,55,0.1)' }}>

      {/* Icône + Badge populaire */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center"
          style={{ boxShadow: '0 0 12px -3px rgba(212,175,55,0.1)' }}>
          <Icon size={22} className="text-primary" />
        </div>

        {service.popular && (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold text-background"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F5D05C 100%)',
              boxShadow: '0 4px 15px -3px rgba(212,175,55,0.4)',
            }}>
            {cardLabels.popular}
          </span>
        )}
      </div>

      {/* Titre */}
      <h3 id={cardTitleId} className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Description courte */}
      <p className="text-sm text-muted mb-3">{shortDesc}</p>

      {/* Description longue */}
      <p className="text-sm text-muted/70 border-t border-border/50 pt-4 mb-5 leading-relaxed">
        {description}
      </p>

      {/* Features */}
      <div className="space-y-2.5 mb-6 flex-1">
        {visibleFeatures.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-start gap-2.5">
            <CheckCircle size={14} className="text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted leading-relaxed">{feature}</span>
          </div>
        ))}
        {moreCount > 0 && (
          <p className="text-xs text-muted/50 ml-7">
            {cardLabels.more.replace('{{count}}', String(moreCount))}
          </p>
        )}
      </div>

      {/* Bouton WhatsApp */}
      <motion.button onClick={goToWhatsApp}
        className="btn-gold w-full text-sm py-3.5 group"
        whileTap={{ scale: 0.98 }}
        aria-label={ctaText}>
        <span>{ctaText}</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;