'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, Smartphone, ShoppingBag, Truck, Building2, Users, ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Données des projets (identiques)
const allProjets = [
  {
    id: 1,
    title: 'E-commerce Mode Africaine',
    description: 'Plateforme de vente en ligne pour créateurs africains avec paiements locaux. Interface moderne, panier intelligent, gestion des stocks.',
    tags: ['Next.js', 'Stripe', 'Tailwind', 'MongoDB'],
    icon: ShoppingBag,
    category: 'E-commerce',
    client: 'AfroStyle',
    annee: '2024'
  },
  {
    id: 2,
    title: 'Application Livraison',
    description: 'App de livraison de repas avec suivi en temps réel, géolocalisation et paiement intégré.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Google Maps'],
    icon: Truck,
    category: 'Mobile',
    client: 'FoodExpress',
    annee: '2024'
  },
  {
    id: 3,
    title: 'Dashboard Gestion PME',
    description: 'Outil de gestion complet pour PME : factures, stocks, clients, rapports.',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js'],
    icon: Building2,
    category: 'SaaS',
    client: 'GestionPro',
    annee: '2023'
  },
  {
    id: 4,
    title: 'Site Vitrine Immobilier',
    description: 'Site pour agence immobilière avec visites virtuelles, filtres avancés et formulaire de contact.',
    tags: ['WordPress', 'Elementor', 'Maps API', 'ACF'],
    icon: Globe,
    category: 'Web',
    client: 'ImmoPlus',
    annee: '2023'
  },
  {
    id: 5,
    title: 'App Fitness',
    description: 'Application de coaching sportif avec suivi des performances, vidéos et programme personnalisé.',
    tags: ['Flutter', 'Firebase', 'GraphQL', 'Stripe'],
    icon: Users,
    category: 'Mobile',
    client: 'FitLife',
    annee: '2023'
  },
  {
    id: 6,
    title: 'Plateforme E-learning',
    description: 'Plateforme de cours en ligne avec quiz, certifications et espace membre.',
    tags: ['React', 'Django', 'PostgreSQL', 'AWS'],
    icon: Smartphone,
    category: 'Web',
    client: 'EduLearn',
    annee: '2024'
  },
  {
    id: 7,
    title: 'Site Association Caritative',
    description: 'Site de donation avec campagne de crowdfunding et suivi des dons en temps réel.',
    tags: ['Next.js', 'Stripe', 'Tailwind', 'Prisma'],
    icon: Globe,
    category: 'Web',
    client: 'Solidarité+',
    annee: '2023'
  },
  {
    id: 8,
    title: 'Application Santé',
    description: 'Application de suivi médical avec rappels de médicaments et partage de données sécurisé.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'JWT'],
    icon: Smartphone,
    category: 'Mobile',
    client: 'MediCare',
    annee: '2024'
  },
  {
    id: 9,
    title: 'ERP pour Logistique',
    description: 'Système de gestion logistique avec suivi de flotte, gestion des commandes et reporting.',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'WebSockets'],
    icon: Truck,
    category: 'SaaS',
    client: 'LogiTech',
    annee: '2023'
  },
  {
    id: 10,
    title: 'Marketplace Artisanat',
    description: 'Marketplace pour artisans locaux avec gestion des vendeurs et paiements sécurisés.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    icon: ShoppingBag,
    category: 'E-commerce',
    client: 'Artisans du Monde',
    annee: '2024'
  }
];

export default function ProjetsPage() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#0A0F1C] relative overflow-hidden">
      {/* BEAU FOND - avec dégradé et formes floues */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, 
            rgba(59,130,246,0.05) 0px, 
            rgba(59,130,246,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, 
            rgba(6,182,212,0.05) 0px, 
            rgba(6,182,212,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        
        {/* Éléments décoratifs flous */}
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-40 -left-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-40 -right-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Bouton retour en haut (mobile) */}
        <button
          onClick={scrollToTop}
          className="lg:hidden fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-colors"
          aria-label="Retour en haut"
        >
          <ArrowLeft size={20} className="rotate-90" />
        </button>

        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm"
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Réalisations</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          >
            Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">accompagnés</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Une sélection de sites web et applications conçus pour répondre 
            à des besoins variés, du MVP au projet d'envergure.
          </motion.p>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {allProjets.map((projet, index) => {
            const Icon = projet.icon;
            
            return (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937]"
              >
                {/* En-tête avec icône */}
                <div className="relative h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#0A0F1C] rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#1F2937]">
                    <Icon size={40} className="text-blue-400" />
                  </div>
                  
                  {/* Badge catégorie */}
                  <div className="absolute top-4 right-4 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/20">
                    {projet.category}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {projet.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {projet.description}
                  </p>

                  {/* Infos client/année */}
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-[#0A0F1C] rounded-full border border-[#1F2937]">{projet.client}</span>
                    <span>{projet.annee}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {projet.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {projet.tags.length > 3 && (
                      <span className="px-2.5 py-1 bg-[#0A0F1C] text-gray-400 text-xs font-medium rounded-full border border-[#1F2937]">
                        +{projet.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Lien fictif pour l'exemple */}
                  <button className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm group/link hover:text-blue-300 transition-colors">
                    <span>Étude de cas</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOUTONS JUMEAUX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
        >
          {/* Bouton Retour à l'accueil */}
          <Link href="/#projets" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-transparent text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm md:text-lg flex items-center justify-center gap-2 border-2 border-[#1F2937] hover:border-blue-400 hover:text-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
              <span>Retour à l'accueil</span>
            </motion.button>
          </Link>

          {/* Bouton Parler de mon projet */}
          <Link href="/#contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm md:text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
            >
              <MessageSquare size={18} className="md:w-5 md:h-5" />
              <span>Parler de mon projet</span>
              <ArrowRight size={18} className="md:w-5 md:h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Note de bas de page */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-500 mt-8"
        >
          * Chaque projet est unique et a fait l'objet d'une collaboration étroite avec le client
        </motion.p>
      </div>
    </main>
  );
}