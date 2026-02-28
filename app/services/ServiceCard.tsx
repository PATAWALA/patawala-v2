'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Service } from './data/servicesData';

interface ServiceCardProps {
  service: Service;
  delay: number;
}

export default function ServiceCard({ service, delay }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#1F2937] h-full flex flex-col"
    >
      {/* En-tête avec icône */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
            <Icon size={24} className="text-blue-400" />
          </div>
          
          {service.popular && (
            <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-500/20">
              Populaire
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
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
              <CheckCircle size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-300">{feature}</span>
            </div>
          ))}
          {service.features.length > 3 && (
            <div className="text-xs text-gray-500 ml-6">
              +{service.features.length - 3} autres fonctionnalités
            </div>
          )}
        </div>

        {/* CTA */}
        <Link href="/#contact">
          <button className="w-full flex items-center justify-between text-blue-400 font-medium text-sm group/btn hover:text-blue-300 transition-colors pt-2 border-t border-[#1F2937]">
            <span>{service.ctaText}</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}