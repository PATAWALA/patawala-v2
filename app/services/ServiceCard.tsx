'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Service } from './data/servicesData';
import { useState } from 'react';
import BookingModal from '../components/ui/BookingModal';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

export default function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
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
                Populaire
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4">
            {service.shortDesc}
          </p>

          {/* Prix */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-white">
              À partir de {service.pricing.startingAt} {service.pricing.currency}
            </span>
            {service.pricing.type === 'horaire' && (
              <span className="text-gray-500 text-sm ml-1">/h</span>
            )}
          </div>

          {/* Description courte */}
          <p className="text-sm text-gray-500 border-t border-[#1F2937] pt-4">
            {service.description}
          </p>
        </div>

        {/* Features */}
        <div className="px-6 pb-6 flex-1">
          <div className="space-y-2 mb-6">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-xs text-gray-500 ml-6">
                +{service.features.length - 3} autres fonctionnalités
              </div>
            )}
          </div>

          {/* CTA avec les couleurs du site - OUVRE LE MODAL */}
          <button 
            onClick={handleOpenBooking}
            className="w-full border border-blue-500/30 bg-blue-500/5 text-blue-400 font-medium py-2.5 px-4 rounded-xl flex items-center justify-between group/btn hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <span>{service.ctaText}</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </motion.div>

      {/* Modal de réservation */}
      <BookingModal isOpen={isBookingModalOpen} onClose={handleCloseBooking} />
    </>
  );
}