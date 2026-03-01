// data/projets.ts
import { ShoppingBag, Truck, Building2, Globe, Users, Smartphone, Heart, Activity, Package, Store } from 'lucide-react';
import dashbordImage from '../../assets/images/Dashbordpme.png';
import designImage from '../../assets/images/design.png';
import techChoiceImage from '../../assets/images/tech-choice.jpg.png';
import fitnessImage from '../../assets/images/fitness.png';
import learnImage from '../../assets/images/learn.png';
import santéeImage from "../../assets/images/sante.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: any;
  tags: string[];
  icon: any;
  category: string;
  lien: string;
  client?: string;
  date?: string;        // Optionnel
  duree?: string;       // Optionnel
  objectif?: string;    // Optionnel
  solution?: string;    // Optionnel
  fonctionnalites?: string[];
  challenge?: string;   // Optionnel
}

export const projets: Project[] = [
  {
    id: 1,
    title: 'E-commerce Mode Africaine',
    description: 'Plateforme de vente en ligne pour créateurs africains avec paiements locaux',
    image: dashbordImage,
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    icon: ShoppingBag,
    category: 'E-commerce',
    lien: '/projets/1',
    client: 'Collectif de créateurs africains',
    // Pas de date - on ne l'affichera pas
    duree: '3 mois',
    objectif: 'Créer une plateforme e-commerce qui permet aux créateurs africains de vendre leurs produits à l\'international tout en proposant des moyens de paiement locaux (Mobile Money, Orange Money, etc.).',
    challenge: 'Intégrer plusieurs passerelles de paiement locales tout en maintenant une expérience utilisateur fluide et sécurisée.',
    solution: 'Développement d\'une solution sur mesure avec Next.js pour le frontend et intégration de multiples passerelles de paiement adaptées au marché africain. Interface intuitive pour les créateurs et expérience d\'achat fluide pour les clients.',
    fonctionnalites: [
      'Catalogue produits avec filtres avancés',
      'Panier d\'achat persistant',
      'Paiements multiples (carte, Mobile Money)',
      'Dashboard vendeur avec statistiques',
      'Gestion des commandes et livraisons',
      'Espace client avec historique'
    ]
  },
  {
    id: 2,
    title: 'Application Livraison',
    description: 'App de livraison de repas avec suivi en temps réel',
    image: designImage,
    tags: ['React Native', 'Node.js', 'MongoDB'],
    icon: Truck,
    category: 'Mobile',
    lien: '/projets/2',
    client: 'Startup de livraison de repas',
    // Pas de date
    duree: '4 mois',
    objectif: 'Développer une application mobile de livraison de repas permettant aux utilisateurs de commander dans les restaurants locaux et de suivre leur commande en temps réel.',
    challenge: 'Optimiser le suivi en temps réel des livreurs tout en préservant l\'autonomie de la batterie.',
    solution: 'Application cross-platform avec React Native, API REST avec Node.js et base de données MongoDB. Intégration de cartographie pour le suivi des livreurs et système de notifications push.',
    fonctionnalites: [
      'Géolocalisation des restaurants',
      'Passation de commandes',
      'Suivi en temps réel du livreur',
      'Paiement en ligne',
      'Système de notation',
      'Notifications push'
    ]
  },
  {
    id: 3,
    title: 'Dashboard Gestion PME',
    description: 'Outil de gestion complet pour PME (factures, stocks, clients)',
    image: techChoiceImage,
    tags: ['Vue.js', 'Laravel', 'MySQL'],
    icon: Building2,
    category: 'SaaS',
    lien: '/projets/3',
    client: 'PME du secteur retail',
    // Pas de date
    duree: '5 mois',
    objectif: 'Centraliser la gestion des opérations quotidiennes (facturation, stocks, relation client) dans une interface unique et intuitive.',
    challenge: 'Créer une interface simple mais puissante capable de gérer des données complexes en temps réel.',
    solution: 'Application web progressive avec Vue.js pour l\'interface utilisateur et Laravel pour l\'API backend. Base de données MySQL optimisée pour les requêtes complexes de reporting.',
    fonctionnalites: [
      'Gestion des factures et devis',
      'Suivi des stocks en temps réel',
      'CRM intégré',
      'Tableaux de bord personnalisables',
      'Export de rapports',
      'Gestion multi-utilisateurs'
    ]
  },
  {
    id: 4,
    title: 'Site Vitrine Immobilier',
    description: 'Site pour agence immobilière avec visites virtuelles',
    image: '/images/projects/immobilier.jpg',
    tags: ['WordPress', 'Elementor', 'Maps API'],
    icon: Globe,
    category: 'Web',
    lien: '/projets/4',
    client: 'Agence immobilière',
    // Pas de date
    duree: '2 mois',
    objectif: 'Créer un site vitrine moderne pour présenter les biens immobiliers avec intégration de visites virtuelles et formulaire de contact.',
    challenge: 'Intégrer des visites virtuelles 360° sans compromettre les performances du site.',
    solution: 'Site WordPress avec Elementor pour une interface visuelle attrayante. Intégration de l\'API Google Maps pour la localisation des biens et plugin de visites virtuelles.',
    fonctionnalites: [
      'Catalogue de biens avec filtres',
      'Visites virtuelles 360°',
      'Formulaire de contact',
      'Localisation sur carte',
      'Blog immobilier',
      'Espace agent'
    ]
  },
  {
    id: 5,
    title: 'App Fitness',
    description: 'Application de coaching sportif avec suivi des performances',
    image: fitnessImage,
    tags: ['Next.js', 'Firebase', 'GraphQL'],
    icon: Users,
    category: 'Mobile',
    lien: '/projets/5',
    client: 'Coach sportif indépendant',
    // Pas de date
    duree: '1 mois',
    objectif: 'Permettre aux coachs de créer des programmes personnalisés et aux utilisateurs de suivre leurs séances et progrès.',
    challenge: 'Créer une expérience fluide hors-ligne avec synchronisation automatique.',
    solution: 'Application web , Firebase pour l\'authentification et les données en temps réel, GraphQL pour les requêtes optimisées.',
    fonctionnalites: [
      'Programmes personnalisés',
      'Suivi des séances',
      'Statistiques de progression',
      'Vidéos d\'exercices',
      'Chat avec le coach',
      'Notifications de rappel'
    ]
  },
  {
    id: 6,
    title: 'Plateforme E-learning',
    description: 'Plateforme de cours en ligne avec quiz et certifications',
    image: learnImage,
    tags: ['React', 'Django', 'PostgreSQL'],
    icon: Smartphone,
    category: 'Web',
    lien: '/projets/6',
    client: 'Organisme de formation',
    // Pas de date
    duree: '2 mois',
    objectif: 'Créer une plateforme d\'apprentissage en ligne avec gestion des cours, quiz automatiques et génération de certificats.',
    challenge: 'Gérer des milliers d\'utilisateurs simultanés avec des contenus multimédias lourds.',
    solution: 'Frontend React avec Redux pour la gestion d\'état, backend Django REST framework, base de données PostgreSQL. Système de quiz interactif et génération automatique de PDF pour les certificats.',
    fonctionnalites: [
      'Catalogue de cours',
      'Lecteur vidéo intégré',
      'Quiz interactifs',
      'Certificats téléchargeables',
      'Suivi de progression',
      'Espace apprenant et formateur'
    ]
  },
  {
    id: 7,
    title: 'Site Association Caritative',
    description: 'Site de donation avec campagne de crowdfunding et suivi des dons en temps réel.',
    image: '/images/projects/caritative.jpg',
    tags: ['Next.js', 'Stripe', 'Tailwind', 'Prisma'],
    icon: Heart,
    category: 'Web',
    lien: '/projets/7',
    client: 'Solidarité+',
    // Pas de date
    duree: '2.5 mois',
    objectif: 'Créer une plateforme de donation en ligne permettant de lancer des campagnes de crowdfunding et de suivre les dons en temps réel.',
    challenge: 'Mettre en place un système de dons récurrents et ponctuels avec une expérience utilisateur fluide et sécurisée.',
    solution: 'Développement avec Next.js pour le frontend et l\'API, intégration de Stripe pour les paiements, et Prisma pour la gestion des données. Interface intuitive avec suivi en temps réel des campagnes.',
    fonctionnalites: [
      'Création et gestion de campagnes',
      'Dons ponctuels et récurrents',
      'Suivi en temps réel des collectes',
      'Témoignages et remerciements',
      'Certificats de don',
      'Dashboard administrateur'
    ]
  },
  {
    id: 8,
    title: 'Application Santé',
    description: 'Application de suivi médical avec rappels de médicaments et partage de données sécurisé.',
    image: santéeImage,
    tags: ['React Native','Next.js', 'Node.js', 'MongoDB', 'JWT'],
    icon: Activity,
    category: 'Mobile',
    lien: '/projets/8',
    client: 'MediCare',
    // Pas de date
    duree: '1 mois',
    objectif: 'Développer une application web et mobile permettant aux patients de suivre leur traitement médical avec des rappels et de partager leurs données avec leurs médecins de façon sécurisée.',
    challenge: 'Garantir la sécurité des données médicales tout en offrant une expérience utilisateur simple et intuitive.',
    solution: 'Application React Native avec authentification JWT, backend Node.js et MongoDB. Chiffrement des données sensibles et système de notifications push pour les rappels.',
    fonctionnalites: [
      'Profil patient sécurisé',
      'Rappels de médicaments personnalisés',
      'Carnet de santé numérique',
      'Partage de données avec les médecins',
      'Historique des traitements',
      'Notifications push'
    ]
  },
  {
    id: 9,
    title: 'ERP pour Logistique',
    description: 'Système de gestion logistique avec suivi de flotte, gestion des commandes et reporting.',
    image: '/images/projects/erp-logistique.jpg',
    tags: ['Vue.js', 'Laravel', 'MySQL', 'WebSockets'],
    icon: Package,
    category: 'SaaS',
    lien: '/projets/9',
    client: 'LogiTech',
    // Pas de date
    duree: '2 mois',
    objectif: 'Créer un ERP sur mesure pour gérer l\'ensemble des opérations logistiques : flotte de véhicules, commandes clients, tournées de livraison et reporting.',
    challenge: 'Coordonner les données en temps réel entre les livreurs, les gestionnaires de flotte et les clients.',
    solution: 'Application web avec Vue.js pour l\'interface, Laravel pour l\'API et WebSockets pour les mises à jour en temps réel. Tableaux de bord personnalisables et système de reporting avancé.',
    fonctionnalites: [
      'Gestion de flotte en temps réel',
      'Planification des tournées',
      'Suivi des commandes',
      'Gestion des stocks d\'entrepôt',
      'Reporting et analytics',
      'Interface pour livreurs (mobile)'
    ]
  },
  {
    id: 10,
    title: 'Marketplace Artisanat',
    description: 'Marketplace pour artisans locaux avec gestion des vendeurs et paiements sécurisés.',
    image: '/images/projects/marketplace-artisanat.jpg',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    icon: Store,
    category: 'E-commerce',
    lien: '/projets/10',
    client: 'Artisans du Monde',
    // Pas de date
    duree: '1 mois',
    objectif: 'Lancer une marketplace permettant aux artisans locaux de vendre leurs créations en ligne avec une commission équitable et des outils de gestion simples.',
    challenge: 'Créer un système multi-vendeurs avec gestion des commissions, des stocks et des paiements séparés.',
    solution: 'Développement avec Next.js pour le frontend et l\'API, Stripe Connect pour les paiements multi-vendeurs, PostgreSQL pour les données et Redis pour le cache. Dashboard vendeur intuitif et système de modération des produits.',
    fonctionnalites: [
      'Inscription et gestion de boutique',
      'Catalogue produits avec recherche avancée',
      'Paiements sécurisés (Stripe Connect)',
      'Gestion des commandes et livraisons',
      'Dashboard vendeur avec statistiques',
      'Système de notation et avis'
    ]
  }
];