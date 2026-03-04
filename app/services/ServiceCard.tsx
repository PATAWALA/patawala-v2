'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Service } from './data/servicesData';
import { useState, useEffect } from 'react';
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

  // DÉBOGAGE - Voir les IDs disponibles
  useEffect(() => {
    console.log('=== DÉBOGAGE ===');
    console.log('Service ID reçu:', service.id);
    console.log('Titre original:', service.title);
    
    // Vérifier ce que contient services-data
    const servicesData = t('services', 'services-data');
    console.log('Clés disponibles dans services:', Object.keys(servicesData || {}));
    
    // Vérifier si notre ID existe - CORRECTION TYPESCRIPT ICI
    const hasTranslation = servicesData && 
      typeof servicesData === 'object' && 
      servicesData !== null && 
      service.id in servicesData;
    
    console.log(`Traduction disponible pour ${service.id}:`, hasTranslation ? 'OUI' : 'NON');
    
    if (hasTranslation) {
      console.log('Données traduites:', (servicesData as Record<string, any>)[service.id]);
    }
  }, [language, service.id, t]);

  // Récupérer les données de traduction
  const getTranslatedData = () => {
    // Récupérer tout l'objet services
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

    // Vérifier si nous avons des traductions pour ce service - CORRECTION TYPESCRIPT ICI
    let translatedService = null;
    if (servicesData && typeof servicesData === 'object' && servicesData !== null) {
      // Chercher le service par son ID avec typage sécurisé
      if (service.id in servicesData) {
        translatedService = (servicesData as Record<string, any>)[service.id];
      }
    }

    // Construire les labels de la carte
    const cardLabels = {
      popular:  currentDefaults.popular,
      from: currentDefaults.from,
      hourly:  currentDefaults.hourly,
      monthly:  currentDefaults.monthly,
      more:  currentDefaults.more
    };

    return {
      service: translatedService || service, // Fallback aux données originales
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
        className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full flex flex-col"
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
            className="w-full border border-blue-500/30 bg-blue-500/5 text-blue-400 font-medium py-2.5 px-4 rounded-xl flex items-center justify-between group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span>{translatedService.ctaText}</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>

      <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
    </>
  );
}