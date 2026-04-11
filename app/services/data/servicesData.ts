import { Globe, Smartphone, ShoppingBag, Bot, Code, LayoutGrid } from 'lucide-react';

export type ServiceCategory = 'all' | 'web' | 'mobile' | 'ecommerce' | 'automatisation';

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

  ecommerce: [
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
      icon: ShoppingBag,
      popular: true
    }
  ],

  automatisation: [
    {
      id: 'business-automation',
      title: 'IA & Automatisation Business',
      shortDesc: 'Scalez votre entreprise, pas votre charge de travail.',
      description: 'Workflows sur-mesure via Make, n8n et l\'IA pour automatiser vos tâches répétitives et exploser votre productivité.',
      technologies: ['Make', 'n8n', 'Zapier', 'API sur mesure'],
      features: [
        'Connectez tous vos outils (CRM, Email, ERP) en un flux unique',
        'Qualification de leads par l\'IA et réponse instantanée',
        'Élimination totale des erreurs de saisie manuelle',
        'Automatisation du suivi client et de la facturation',
        'Notifications business en temps réel',
        'ROI élevé : économisez des centaines d\'heures'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 700,
        currency: '€'
      },
      ctaText: 'Automatiser mon business',
      icon: Bot,
      popular: true
    },
    {
      id: 'ai-chatbot',
      title: 'Agents IA Intelligents',
      shortDesc: 'Un expert disponible 24h/24 qui connaît votre métier.',
      description: 'Chatbots IA personnalisés entraînés sur vos données pour gérer vos ventes et votre support client.',
      technologies: ['OpenAI', 'Vector DB', 'API', 'CRM Integration'],
      features: [
        'Entraîné spécifiquement sur vos documents métier',
        'Disponible 24h/24 en plusieurs langues',
        'Capture et qualification des prospects dans le chat',
        'Intégration fluide avec votre CRM',
        'Réduction des tickets de support jusqu\'à 70%',
        'Interaction humaine respectant votre marque'
      ],
      pricing: {
        type: 'forfait',
        startingAt: 900,
        currency: '€'
      },
      ctaText: 'Déployer mon agent IA',
      icon: Bot,
      popular: false
    }
  ]
};

export const allServices = [
  ...servicesByCategory.web,
  ...servicesByCategory.mobile,
  ...servicesByCategory.ecommerce,
  ...servicesByCategory.automatisation
];

export const categories = [
  { 
    id: 'web', 
    label: 'Développement Web', 
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'Sites internet, applications web et plateformes sur mesure'
  },
  { 
    id: 'mobile', 
    label: 'Applications Mobile', 
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    description: 'Applications pour iOS, Android et tablettes'
  },
  { 
    id: 'ecommerce', 
    label: 'E-commerce', 
    icon: ShoppingBag,
    color: 'from-emerald-500 to-green-500',
    description: 'Boutiques en ligne optimisées pour la conversion'
  },
  { 
    id: 'automatisation', 
    label: 'Automatisation & IA', 
    icon: Bot,
    color: 'from-orange-500 to-amber-500',
    description: 'Workflows intelligents et agents conversationnels sur mesure'
  }
] as const;

export const filterCategories = [
  { 
    id: 'all', 
    label: 'Tous les services', 
    icon: LayoutGrid,
    color: 'from-gray-500 to-gray-600',
    description: 'L\'ensemble de mes services'
  },
  ...categories
] as const;

export type CategoryType = typeof filterCategories[number]['id'];