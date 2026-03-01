// app/blog/types.ts
import { LucideIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';

export interface Author {
  id: string;
  name: string;
  role: string;
  expertise: string[];          // Liste des domaines d'expertise
  avatar?: string;
  bio?: string;
  social?: {                     // Réseaux sociaux (optionnel)
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  stats?: {                      // Statistiques (optionnel)
    articlesCount?: number;
    yearsExperience?: number;
    projectsCompleted?: number;
  };
  badge?: string;                // Badge spécial (ex: "Expert certifié", "Top voice")
  company?: string;              // Entreprise actuelle
  location?: string;             // Localisation
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: StaticImageData;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  icon: LucideIcon;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export const categories = [
  "Tous",
  "Développement",
  "E-commerce",
  "Mobile",
  "Design",
  "SEO",
  "Sécurité",
  "Startup",
  "Productivité"
] as const;

export type Category = typeof categories[number];