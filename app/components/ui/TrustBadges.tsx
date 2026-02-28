'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Clock, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Garantie Satisfait ou Remboursé',
    description: '30 jours pour changer d\'avis',
  },
  {
    icon: Award,
    title: 'Certifié Expert Next.js',
    description: 'Formation et certification officielle',
  },
  {
    icon: Clock,
    title: 'Support Réactif',
    description: 'Réponse sous 24h maximum',
  },
  {
    icon: CheckCircle,
    title: 'Projets Livrés à Temps',
    description: 'Respect des délais à 100%',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <badge.icon className="text-blue-600" size={32} />
          </div>
          <h4 className="font-bold text-lg mb-2">{badge.title}</h4>
          <p className="text-gray-600 text-sm">{badge.description}</p>
        </motion.div>
      ))}
    </div>
  );
}