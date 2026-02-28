import { Globe, Smartphone, Palette, TrendingUp, Code, Cloud, Shield, Zap, Layout, Grid } from 'lucide-react';

export type ServiceCategory = 'all' | 'web' | 'mobile' | 'design' | 'consulting';

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  technologies: string[];
  features: string[];
  pricing: {
    type: 'forfait' | 'mensuel' | 'horaire';
    startingAt: number;
    currency: string;
  };
  ctaText: string;
  popular?: boolean;
  icon: any;
}

export const servicesByCategory: Record<Exclude<ServiceCategory, 'all'>, Service[]> = {
  web: [
    {
      id: 'site-vitrine',
      title: 'Site Vitrine',
      shortDesc: 'Présentez votre activité avec un site professionnel',
      description: 'Un site élégant et fonctionnel pour présenter votre entreprise, vos services et vos réalisations.',
      technologies: ['Design sur mesure', 'Optimisé mobile', 'SEO de base'],
      features: [
        'Design personnalisé',
        'Adapté aux mobiles',
        'Pages illimitées',
        'Formulaire de contact',
        'Galerie photos',
        'Mise à jour facile'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 200,
        currency: '€'
      },
      ctaText: 'Créer mon site',
      icon: Globe,
      popular: false
    },
    {
      id: 'site-ecommerce',
      title: 'Site E-commerce',
      shortDesc: 'Vendez vos produits en ligne facilement',
      description: 'Une boutique en ligne complète pour vendre vos produits et gérer vos commandes simplement.',
      technologies: ['Catalogue produits', 'Paiement sécurisé', 'Gestion stocks'],
      features: [
        'Catalogue produits',
        'Panier d\'achat',
        'Paiements sécurisés',
        'Gestion des stocks',
        'Commandes clients',
        'Tableau de bord'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 500,
        currency: '€'
      },
      ctaText: 'Lancer ma boutique',
      icon: Globe,
      popular: true
    },
    {
      id: 'application-web',
      title: 'Application Web',
      shortDesc: 'Des outils en ligne adaptés à vos besoins',
      description: 'Une application web sur mesure pour automatiser vos processus et gérer votre activité.',
      technologies: ['Espace membre', 'Base de données', 'Interface admin'],
      features: [
        'Espace membres',
        'Gestion de données',
        'Interface admin',
        'Notifications',
        'Tableaux de bord',
        'Exports de données'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 400,
        currency: '€'
      },
      ctaText: 'Développer mon app',
      icon: Code,
      popular: false
    },
    {
      id: 'plateforme-sur-mesure',
      title: 'Plateforme Sur Mesure',
      shortDesc: 'Une solution unique pour votre activité spécifique',
      description: 'Une plateforme entièrement personnalisée pour répondre à des besoins complexes et spécifiques.',
      technologies: ['Architecture scalable', 'Sécurité renforcée', 'Maintenance'],
      features: [
        'Fonctionnalités sur mesure',
        'Architecture évolutive',
        'Sécurité avancée',
        'Maintenance incluse',
        'Formation équipe',
        'Support prioritaire'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 800,
        currency: '€'
      },
      ctaText: 'Discuter de mon projet',
      icon: Code,
      popular: false
    }
  ],

  mobile: [
    {
      id: 'app-ios-android',
      title: 'Application iOS & Android',
      shortDesc: 'Une application pour tous vos utilisateurs',
      description: 'Une application mobile native ou hybride disponible sur iPhone et Android.',
      technologies: ['iOS', 'Android', 'Interface intuitive'],
      features: [
        'Compatible iOS/Android',
        'Design mobile',
        'Notifications push',
        'Hors-ligne possible',
        'Mise à jour automatique',
        'Statistiques d\'usage'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 600,
        currency: '€'
      },
      ctaText: 'Créer mon app',
      icon: Smartphone,
      popular: true
    },
    {
      id: 'app-reservation',
      title: 'App de Réservation',
      shortDesc: 'Prenez des rendez-vous facilement',
      description: 'Une application pour gérer vos réservations, prises de rendez-vous et planning.',
      technologies: ['Calendrier', 'Notifications', 'Paiement'],
      features: [
        'Prise de rendez-vous',
        'Calendrier synchronisé',
        'Rappels automatiques',
        'Paiement en ligne',
        'Gestion des annulations',
        'Dashboard pro'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 500,
        currency: '€'
      },
      ctaText: 'Gérer mes réservations',
      icon: Smartphone,
      popular: false
    },
    {
      id: 'app-entreprise',
      title: 'App d\'Entreprise',
      shortDesc: 'Tous vos outils métier dans la poche',
      description: 'Une application privée pour vos équipes : communication, tâches, documents.',
      technologies: ['Espace privé', 'Messagerie', 'Partage docs'],
      features: [
        'Espace privé sécurisé',
        'Messagerie d\'équipe',
        'Partage de documents',
        'Gestion de tâches',
        'Notifications',
        'Mode hors-ligne'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 400,
        currency: '€'
      },
      ctaText: 'Équiper mon équipe',
      icon: Smartphone,
      popular: false
    }
  ],

  design: [
    {
      id: 'identite-visuelle',
      title: 'Identité Visuelle',
      shortDesc: 'Une image forte et cohérente',
      description: 'Créez une identité visuelle qui vous ressemble : logo, couleurs, typographies.',
      technologies: ['Logo', 'Charte graphique', 'Éléments visuels'],
      features: [
        'Création de logo',
        'Charte graphique',
        'Palette de couleurs',
        'Choix typographies',
        'Cartes de visite',
        'Kit réseaux sociaux'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 200,
        currency: '€'
      },
      ctaText: 'Créer mon identité',
      icon: Palette,
      popular: true
    },
    {
      id: 'maquettes-site',
      title: 'Maquettes de Site',
      shortDesc: 'Visualisez votre site avant développement',
      description: 'Des maquettes claires pour voir le rendu final et valider l\'ergonomie.',
      technologies: ['Wireframes', 'Design mobile', 'Prototypes'],
      features: [
        'Wireframes fonctionnels',
        'Design page par page',
        'Version mobile incluse',
        'Prototypes cliquables',
        'Corps illimitées',
        'Fichiers prêts pour dev'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 250,
        currency: '€'
      },
      ctaText: 'Visualiser mon site',
      icon: Palette,
      popular: false
    },
    {
      id: 'redesign',
      title: 'Refonte Design',
      shortDesc: 'Donnez un coup de jeune à votre site',
      description: 'Modernisez l\'apparence de votre site existant pour plus de professionnalisme.',
      technologies: ['Design moderne', 'Optimisation UX', 'Harmonisation'],
      features: [
        'Analyse design existant',
        'Proposition modernisation',
        'Amélioration ergonomie',
        'Harmonisation visuelle',
        'Adaptation mobile',
        'Optimisation conversion'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 300,
        currency: '€'
      },
      ctaText: 'Moderniser mon site',
      icon: Palette,
      popular: false
    }
  ],

  consulting: [
    {
      id: 'audit-site',
      title: 'Audit de Site',
      shortDesc: 'Identifiez les points d\'amélioration',
      description: 'Une analyse complète de votre site pour améliorer performances et visibilité.',
      technologies: ['Performance', 'SEO', 'Sécurité'],
      features: [
        'Analyse performance',
        'Audit SEO complet',
        'Vérification sécurité',
        'Compatibilité mobile',
        'Rapport détaillé',
        'Recommandations'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 150,
        currency: '€'
      },
      ctaText: 'Auditer mon site',
      icon: TrendingUp,
      popular: true
    },
    {
      id: 'accompagnement',
      title: 'Accompagnement Stratégique',
      shortDesc: 'Un expert à vos côtés',
      description: 'Conseil et accompagnement pour définir votre stratégie digitale et vos priorités.',
      technologies: ['Stratégie', 'Conseil', 'Plan d\'action'],
      features: [
        'Analyse de vos besoins',
        'Définition priorités',
        'Choix technologies',
        'Plan d\'action',
        'Suivi mensuel',
        'Ajustements'
      ],
      pricing: {
        type: 'horaire',
        startingAt: 50,
        currency: '€/h'
      },
      ctaText: 'Être accompagné',
      icon: TrendingUp,
      popular: false
    },
    {
      id: 'formation',
      title: 'Formation',
      shortDesc: 'Montez en compétences',
      description: 'Formation personnalisée pour maîtriser les outils et technologies adaptés à vos besoins.',
      technologies: ['Programme sur mesure', 'Pratique', 'Support'],
      features: [
        'Programme personnalisé',
        'Exercices pratiques',
        'Support de cours',
        'Suivi post-formation',
        'Groupes réduits',
        'Certificat'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 300,
        currency: '€/jour'
      },
      ctaText: 'Me former',
      icon: TrendingUp,
      popular: false
    }
  ]
};

// Créer la liste de tous les services pour le filtre "Tous"
export const allServices = [
  ...servicesByCategory.web,
  ...servicesByCategory.mobile,
  ...servicesByCategory.design,
  ...servicesByCategory.consulting
];

export const categories = [
  { 
    id: 'web', 
    label: 'Développement Web', 
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'Sites internet, boutiques en ligne et applications web'
  },
  { 
    id: 'mobile', 
    label: 'Applications Mobile', 
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    description: 'Applications pour iOS, Android et tablettes'
  },
  { 
    id: 'design', 
    label: 'Design & Identité', 
    icon: Palette,
    color: 'from-green-500 to-emerald-500',
    description: 'Identité visuelle, maquettes et refonte design'
  },
  { 
    id: 'consulting', 
    label: 'Conseil & Audit', 
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    description: 'Stratégie, audit technique et accompagnement'
  }
] as const;

// Ajouter le filtre "Tous" en premier
export const filterCategories = [
  { 
    id: 'all', 
    label: 'Tous les services', 
    icon: Grid,
    color: 'from-gray-500 to-gray-600',
    description: 'L\'ensemble de mes services'
  },
  ...categories
] as const;

export type CategoryType = typeof filterCategories[number]['id'];