// data/projets.ts
import { 
  Building2, 
  Paintbrush, 
  Home, 
  ShoppingBag, 
  Car, 
  GraduationCap, 
  Flower, 
  Truck 
} from 'lucide-react';

// Import des images (format .webp ou .jpg selon tes fichiers)
import agExpertImage from '../../assets/images/projects/ag-expert.jpg';
import phenixImage from '../../assets/images/projects/phenix.jpg';
import biancaImage from '../../assets/images/projects/bianca.jpg';
import longrichImage from '../../assets/images/projects/longrich.jpg';
import eliteImage from '../../assets/images/projects/elite.jpg';
import chinaCodeImage from '../../assets/images/projects/china-code.jpg';
import cordierImage from '../../assets/images/projects/cordier.jpg';
import socotraImage from '../../assets/images/projects/socotra.jpg'; // placeholder

export interface Project {
  id: number;
  title: string;
  description: string;
  image: any;           // l'image importée (objet)
  tags: string[];
  icon: any;
  category: string;
  lien: string;
  client?: string;
  date?: string;
  duree?: string;
  objectif?: string;
  solution?: string;
  fonctionnalites?: string[];
  challenge?: string;
  status?: string;
}

export const projets: Project[] = [
  {
    id: 1,
    title: 'AG EXPERT Consulting',
    description: 'Agence de consulting multisectorielle basée en Côte d\'Ivoire — 10 domaines d\'expertise, génération de leads et crédibilité en ligne.',
    image: agExpertImage,
    tags: ['Next.js', 'Tailwind', 'React'],
    icon: Building2,
    category: 'Site Vitrine',
    lien: 'https://ag-expert.vercel.app/',
    client: 'AG EXPERT Consulting International',
    duree: '3 semaines',
    objectif: 'Donner à AG EXPERT une présence digitale à la hauteur de son positionnement : attirer des PME et grands comptes, présenter clairement les 10 domaines d\'intervention (digitalisation, formation, solaire, logistique…), et transformer les visiteurs en leads qualifiés via un parcours fluide.',
    challenge: 'Structurer une offre très large sans noyer le visiteur, tout en renvoyant une image de confiance et de résultats mesurables.',
    solution: 'Un site rapide sous Next.js avec une navigation claire, des fiches expertise percutantes, des chiffres clés (satisfaction, clients) et un bouton "Parler à un expert" omniprésent. Le design épuré et la performance renforcent la crédibilité.',
    fonctionnalites: [
      'Présentation des 10 expertises avec résultats attendus',
      'Bouton "Parler à un expert" sur chaque page',
      'Chiffres clés (clients satisfaits, domaines)',
      'Formulaire de contact optimisé pour la conversion',
      'Navigation simplifiée et responsive',
      'Temps de chargement < 2 secondes'
    ]
  },
  {
    id: 2,
    title: 'PHÉNIX GROUP & JF DÉCOR',
    description: 'Entreprise de construction, aménagement et paysagisme d\'exception en Côte d\'Ivoire.',
    image: phenixImage,
    tags: ['Next.js', 'Tailwind', 'React'],
    icon: Paintbrush,
    category: 'Site Vitrine',
    lien: 'https://www.phenixgroupdecor.com',
    client: 'PHÉNIX GROUP & JF DÉCOR',
    duree: '3 semaines',
    objectif: 'Offrir une vitrine haut de gamme qui reflète le savoir-faire architectural et paysager de PHÉNIX GROUP, générer des demandes de devis qualifiées et rassurer une clientèle exigeante (hôtels, restaurants, résidences de luxe).',
    challenge: 'Montrer des réalisations spectaculaires tout en maintenant un site très rapide et en guidant l’utilisateur vers la demande de devis.',
    solution: 'Un site immersif avec grandes visuelles et sections "Nos Expertises" détaillant les trois piliers (construction, aménagement extérieur, paysagisme artistique). Chaque service liste des exemples concrets et renvoie vers un formulaire de devis gratuit.',
    fonctionnalites: [
      'Galerie de réalisations filtrante',
      'Demande de devis en 2 clics',
      'Présentation détaillée des 3 piliers d’expertise',
      'Chiffres de confiance (150+ projets, 25 ans)',
      'Design premium adapté au luxe',
      'Formulaire de contact simple'
    ]
  },
  {
    id: 3,
    title: 'Bianca Roan — Courtage Immobilier',
    description: 'Site personnel d’une courtière immobilière au Canada, alliant crédibilité, conseils et génération de leads.',
    image: biancaImage,
    tags: ['Next.js', 'Tailwind', 'React'],
    icon: Home,
    category: 'Site Vitrine',
    lien: 'https://bianca-roan.vercel.app/',
    client: 'Bianca Roan',
    duree: '2 semaines',
    objectif: 'Centraliser toute l’information sur Bianca (parcours, philosophie, formations, propriétés) pour convaincre des clients vendeurs et acheteurs, et maximiser la prise de rendez-vous qualifiés.',
    challenge: 'Rendre accessible un parcours très riche (diplômes, formations continues, prix) sans alourdir la navigation, et convertir le visiteur en prospect.',
    solution: 'Un site épuré avec des sections claires : philosophie, diplômes, formation continue, propriétés et un bouton "Parler à Bianca". La transparence et l’expertise sont mises en avant pour instaurer confiance et sérénité.',
    fonctionnalites: [
      'Présentation chronologique de la formation continue',
      'Affichage des distinctions et accréditations',
      'Bouton "Parler à Bianca" permanent',
      'Liste des biens à vendre avec visuels',
      'Design sobre et professionnel',
      'Optimisé pour la conversion en rendez-vous'
    ]
  },
  {
    id: 4,
    title: 'La Maison Longrich',
    description: 'Plateforme de vente et de recrutement pour un partenaire Longrich, accélérant les ventes et les affiliations.',
    image: longrichImage,
    tags: ['WordPress', 'Elementor', 'WooCommerce'],
    icon: ShoppingBag,
    category: 'Site E-commerce',
    lien: 'https://lamaisonlongrich.com/',
    client: 'Partenaire Longrich',
    duree: '2 semaines',
    objectif: 'Permettre au partenaire de présenter l’ensemble des produits Longrich, d’expliquer le fonctionnement de la multinationale (marketing de réseau) et d’inciter les visiteurs à devenir partenaires via un tunnel clair.',
    challenge: 'Structurer l’information pour à la fois vendre des produits et recruter de nouveaux distributeurs, avec une solution simple à maintenir.',
    solution: 'Un site WordPress avec WooCommerce pour la vente en ligne, des pages explicatives sur la société et les avantages de devenir partenaire, et des boutons d’action directs pour s’inscrire au réseau.',
    fonctionnalites: [
      'Boutique en ligne avec catalogue produits',
      'Page "Devenir partenaire" avec formulaire',
      'Explication du plan de rémunération',
      'Témoignages et preuves sociales',
      'Facilité de mise à jour par le client (WordPress)',
      'Tunnel de conversion optimisé'
    ]
  },
  {
    id: 5,
    title: 'Elite Auto & Goods',
    description: 'Plateforme de vente de véhicules et biens divers basée à Dubaï, conçue pour élargir la clientèle et booster les ventes.',
    image: eliteImage,
    tags: ['Next.js', 'Tailwind', 'React'],
    icon: Car,
    category: 'Site Vitrine',
    lien: 'https://elite-eta-three.vercel.app/',
    client: 'Elite Auto',
    duree: '2 semaines',
    objectif: 'Rendre accessible à tous, 24h/24, le catalogue de véhicules et biens d’Elite, avec des prix attractifs et un processus de commande simplifié pour augmenter le chiffre d’affaires.',
    challenge: 'Présenter un inventaire varié de manière claire et inciter au contact sans intermédiaire lourd.',
    solution: 'Un site rapide sous Next.js avec une grille de produits filtrante, des fiches détaillées et des appels à l’action directs (WhatsApp, formulaire). L’accent est mis sur la confiance (prix transparents, photos réelles).',
    fonctionnalites: [
      'Catalogue avec filtres (marque, prix, type)',
      'Fiches produits détaillées avec photos',
      'Bouton de contact direct (WhatsApp)',
      'Formulaire de demande de disponibilité',
      'Interface responsive et rapide',
      'Section "Nouveautés" dynamique'
    ]
  },
  {
    id: 6,
    title: 'Miss Amani — CHINA CODE',
    description: 'Page de capture pour une masterclass gratuite sur l’importation depuis la Chine, générant des leads qualifiés pour l’entrepreneure.',
    image: chinaCodeImage,
    tags: ['Systeme.io', 'Marketing', 'Landing Page'],
    icon: GraduationCap,
    category: 'Landing Page',
    lien: 'https://missamani-bychina.systeme.io/chinacode',
    client: 'Miss Amani',
    duree: '1 semaine',
    objectif: 'Créer une page de capture percutante pour remplir une masterclass en ligne (13 places) et transformer des femmes au foyer, PME et entrepreneurs en élèves payants par la suite.',
    challenge: 'Convaincre en quelques secondes avec un message fort et une offre gratuite irrésistible, puis collecter les inscriptions.',
    solution: 'Une landing page Systeme.io avec un hero percutant (urgence, preuve sociale, bénéfices chiffrés), la bio inspirante de Miss Amani, et un formulaire d’inscription simple. L’urgence et la rareté (seulement 13 places) maximisent les conversions.',
    fonctionnalites: [
      'Section héro avec timer / urgence',
      'Preuves sociales (nombre d’inscrits, témoignages)',
      'Bio inspirante de la formatrice',
      'Formulaire de réservation simplifié',
      'Indication claire du prix (gratuit)',
      'Design optimisé mobile'
    ]
  },
  {
    id: 7,
    title: 'Cordier Jardins',
    description: 'Site vitrine pour deux paysagistes belges, visant à générer des devis partout en Belgique avec une crédibilité maximale.',
    image: cordierImage,
    tags: ['Next.js', 'Tailwind', 'React'],
    icon: Flower,
    category: 'Site Vitrine',
    lien: 'https://cordier-jardins.vercel.app/',
    client: 'Cordier Jardins',
    duree: '2 semaines',
    objectif: 'Faire de Cordier Jardins le réflexe "devis paysagiste" en Belgique : un site clair mettant en avant leurs 15 ans d’expérience, leurs valeurs (ponctualité, propreté) et leur note de 98% d’avis 5 étoiles pour convertir les visiteurs en demandes de devis.',
    challenge: 'Réussir à projeter la confiance et la qualité artisanale à travers un site vitrine simple.',
    solution: 'Un site épuré avec une section "Qui sommes-nous" humaine, des engagements clairs (assurance, respect des délais, chantier propre) et un formulaire de devis gratuit en 48h. Les avis clients et photos de réalisations rassurent immédiatement.',
    fonctionnalites: [
      'Formulaire de devis gratuit avec délai de réponse affiché',
      'Galerie de réalisations avant/après',
      'Présentation des deux artisans et de leurs valeurs',
      'Affichage des engagements (assurance, propreté)',
      'Bouton d’appel à l’action principal',
      '98% d’avis 5 étoiles mis en avant'
    ]
  },
  {
    id: 8,
    title: 'SOCOTRA — Transport & Logistique',
    description: 'Site vitrine en cours de conception pour le leader ivoirien du transport routier ouest-africain.',
    image: socotraImage,
    tags: ['Next.js', 'Tailwind', 'React'],
    icon: Truck,
    category: 'Site Vitrine',
    lien: '#',
    client: 'SOCOTRA',
    duree: 'En conception',
    objectif: 'Moderniser l’image de SOCOTRA, leader avec 200+ tracteurs et 160 collaborateurs, en rendant ses services accessibles en ligne et en facilitant les demandes de devis pour le transport de matières premières, produits pétroliers et conteneurs à travers 7 pays.',
    challenge: 'Traduire la puissance et la fiabilité de l’entreprise dans une interface moderne tout en structurant une offre complexe (multi-pays, multi-produits).',
    solution: 'Un site Next.js rapide et responsive mettant en avant l’historique, les distinctions (Grand Prix 2017, Prix d’Excellence), les valeurs (sécurité, innovation) et un formulaire de demande de transport personnalisé. La géolocalisation et les certifications sont au cœur du design.',
    fonctionnalites: [
      'Formulaire de demande de devis transport',
      'Carte de présence (7 pays)',
      'Présentation de la flotte et des certifications',
      'Distinctions et prix d’excellence',
      'Espace valeurs et engagements (sécurité, innovation)',
      'Design corporate moderne'
    ],
    status: 'En cours'
  }
];