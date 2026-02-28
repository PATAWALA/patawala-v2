import { 
  Code, TrendingUp, Smartphone, Palette, Search, 
  Sparkles, Shield, Rocket 
} from 'lucide-react';
import { Article, Author } from '../types';

// Import des images depuis assets
import techChoice from '../../assets/images/tech-choice.jpg';
import ecommerce from '../../assets/images/ecommerce.jpg';
import mobile from '../../assets/images/mobile.jpg';
import design from '../../assets/images/design.png';
import seo from '../../assets/images/seo.png';
import automation from '../../assets/images/automation.jpg';
import trends from '../../assets/images/trends.jpg';
import security from '../../assets/images/security.jpg';
import mvp from '../../assets/images/mvp.jpg';

// Auteur principal
const author: Author = {
  id: 'abdoulaye-patawala',
  name: 'Abdoulaye Patawala',
  role: 'Développeur Full-stack & Consultant',
  avatar: '../../assets/images/profile3.png',
  bio: 'Expert en développement web et mobile avec 4 ans d\'expérience.'
};

export const articles: Article[] = [
  {
    id: '1',
    slug: 'choisir-bonne-technologie-projet-web-2024',
    title: "Comment choisir la bonne technologie pour votre projet web en 2024",
    excerpt: "Next.js, React, Vue ou WordPress ? Découvrez comment faire le bon choix selon vos besoins réels, pas selon les modes.",
    content: `
      <h2>Introduction</h2>
      <p>Choisir la bonne technologie pour votre projet web est une décision cruciale qui aura un impact sur la maintenance, l'évolutivité et les coûts à long terme. Voici un guide pour vous aider à faire le bon choix.</p>
      
      <h2>Les critères de choix</h2>
      <p>Avant de sélectionner une technologie, posez-vous ces questions :</p>
      <ul>
        <li>Quel est le budget du projet ?</li>
        <li>Quelle est la date de livraison souhaitée ?</li>
        <li>Le site aura-t-il besoin d'évoluer rapidement ?</li>
        <li>Avez-vous besoin d'une interface d'administration simple ?</li>
      </ul>
      
      <h2>WordPress : la solution polyvalente</h2>
      <p>WordPress est idéal pour les sites vitrines, blogs et petits e-commerce. Ses avantages : interface intuitive, milliers de thèmes et plugins, grande communauté.</p>
      
      <h2>Next.js/React : la puissance moderne</h2>
      <p>Pour les applications complexes, les SaaS et les sites à fort trafic, Next.js offre des performances exceptionnelles et une expérience développeur optimale.</p>
      
      <h2>Conclusion</h2>
      <p>Le choix de la technologie dépend avant tout de vos besoins spécifiques. N'hésitez pas à me contacter pour en discuter.</p>
    `,
    image: techChoice,
    category: "Développement",
    tags: ["Next.js", "React", "WordPress"],
    author: author,
    publishedAt: "15 Mars 2024",
    readTime: "8 min",
    views: 1234,
    likes: 89,
    comments: 24,
    featured: true,
    icon: Code,
    seo: {
      title: "Comment choisir sa technologie web en 2024 ?",
      description: "Guide complet pour choisir entre WordPress, Next.js, React ou Vue selon vos besoins.",
      keywords: ["développement web", "technologie", "WordPress", "Next.js"]
    }
  },
  {
    id: '2',
    slug: 'secrets-site-ecommerce-convertit',
    title: "Les secrets d'un site e-commerce qui convertit",
    excerpt: "Analyse détaillée d'un site e-commerce qui a augmenté ses conversions de 150% grâce à l'optimisation UX et aux bonnes pratiques.",
    content: `
      <h2>Introduction</h2>
      <p>Un site e-commerce doit être bien plus qu'un simple catalogue. Voici les secrets pour transformer vos visiteurs en clients.</p>
      
      <h2>L'importance de l'UX</h2>
      <p>Un parcours d'achat fluide et intuitif est essentiel. Réduisez le nombre d'étapes, simplifiez les formulaires, proposez le paiement invité.</p>
      
      <h2>La confiance avant tout</h2>
      <p>Affichez clairement les avis clients, les garanties, les modes de paiement sécurisés. La transparence rassure.</p>
      
      <h2>Les techniques de vente</h2>
      <p>Upsell, cross-sell, offres limitées... Des techniques éprouvées pour augmenter le panier moyen.</p>
    `,
    image: ecommerce,
    category: "E-commerce",
    tags: ["Conversion", "UX", "SEO"],
    author: author,
    publishedAt: "10 Mars 2024",
    readTime: "12 min",
    views: 2341,
    likes: 156,
    comments: 42,
    featured: true,
    icon: TrendingUp
  },
  {
    id: '3',
    slug: 'mobile-first-site-pense-mobile',
    title: "Mobile-first : Pourquoi votre site doit être pensé pour le mobile dès le départ",
    excerpt: "Avec plus de 60% du trafic web venant du mobile, voici pourquoi et comment adopter une approche mobile-first.",
    content: `
      <h2>Introduction</h2>
      <p>Le mobile-first n'est plus une option, c'est une nécessité. Découvrez pourquoi et comment l'adopter.</p>
      
      <h2>Pourquoi le mobile domine</h2>
      <p>Plus de 60% du trafic web vient désormais du mobile. Google privilégie les sites mobile-friendly dans ses résultats.</p>
      
      <h2>Comment adopter le mobile-first</h2>
      <p>Commencez par concevoir l'interface pour les petits écrans, puis adaptez progressivement aux plus grands.</p>
    `,
    image: mobile,
    category: "Mobile",
    tags: ["Mobile-first", "Responsive", "UX"],
    author: author,
    publishedAt: "5 Mars 2024",
    readTime: "6 min",
    views: 892,
    likes: 67,
    comments: 18,
    featured: false,
    icon: Smartphone
  },
  {
    id: '4',
    slug: 'importance-design-ui-ux-fidelisation',
    title: "L'importance du design UI/UX dans la fidélisation client",
    excerpt: "Un bon design ne se limite pas à l'esthétique. Découvrez comment l'UI/UX impacte directement la fidélisation.",
    content: `
      <h2>Introduction</h2>
      <p>Le design ne fait pas que rendre les choses jolies. Il crée une expérience qui fidélise ou fait fuir vos utilisateurs.</p>
      
      <h2>L'impact sur la perception</h2>
      <p>Un design soigné inspire confiance et professionnalisme. Les utilisateurs jugent la crédibilité d'un site en 50 millisecondes.</p>
      
      <h2>La fidélisation par l'expérience</h2>
      <p>Une interface intuitive donne envie de revenir. Chaque interaction doit être fluide et satisfaisante.</p>
    `,
    image: design,
    category: "Design",
    tags: ["UI", "UX", "Design"],
    author: author,
    publishedAt: "28 Fév 2024",
    readTime: "10 min",
    views: 1456,
    likes: 112,
    comments: 31,
    featured: false,
    icon: Palette
  },
  {
    id: '5',
    slug: 'guide-complet-referencement-seo-2024',
    title: "Guide complet du référencement SEO en 2024",
    excerpt: "Les techniques SEO qui fonctionnent vraiment en 2024. Guide pratique pour améliorer votre visibilité sur Google.",
    content: `
      <h2>Introduction</h2>
      <p>Le SEO évolue constamment. Voici ce qui fonctionne vraiment en 2024 pour améliorer votre positionnement.</p>
      
      <h2>Les fondamentaux inchangés</h2>
      <p>Contenu de qualité, structure claire, liens entrants... Les bases restent essentielles.</p>
      
      <h2>Les nouveautés 2024</h2>
      <p>L'IA dans les résultats, l'importance des Core Web Vitals, le SEO vidéo...</p>
    `,
    image: seo,
    category: "SEO",
    tags: ["SEO", "Google", "Trafic"],
    author: author,
    publishedAt: "20 Fév 2024",
    readTime: "15 min",
    views: 3456,
    likes: 234,
    comments: 56,
    featured: true,
    icon: Search
  },
  {
    id: '6',
    slug: 'automatiser-taches-repetitives-outils',
    title: "Comment automatiser vos tâches répétitives avec les bons outils",
    excerpt: "Gagnez des heures chaque semaine en automatisant vos processus métier. Découvrez les meilleurs outils.",
    content: `
      <h2>Introduction</h2>
      <p>L'automatisation est la clé pour gagner du temps et se concentrer sur l'essentiel. Voici comment faire.</p>
      
      <h2>Les outils indispensables</h2>
      <p>Zapier, Make, n8n... Comparez les solutions d'automatisation disponibles.</p>
      
      <h2>Exemples concrets</h2>
      <p>Automatisez vos emails, vos publications sur les réseaux, vos sauvegardes...</p>
    `,
    image: automation,
    category: "Productivité",
    tags: ["Automatisation", "Outils", "Productivité"],
    author: author,
    publishedAt: "15 Fév 2024",
    readTime: "7 min",
    views: 723,
    likes: 45,
    comments: 12,
    featured: false,
    icon: Sparkles
  },
  {
    id: '7',
    slug: 'tendances-web-design-2024',
    title: "Les tendances web design à suivre en 2024",
    excerpt: "Dark mode, micro-interactions, 3D... Les tendances design qui marqueront 2024.",
    content: `
      <h2>Introduction</h2>
      <p>Le design web évolue rapidement. Voici les tendances qui feront 2024.</p>
      
      <h2>Dark mode généralisé</h2>
      <p>De plus en plus de sites proposent une version sombre, plus confortable pour les yeux.</p>
      
      <h2>Micro-interactions</h2>
      <p>Ces petits détails qui rendent l'expérience utilisateur plus agréable et mémorable.</p>
    `,
    image: trends,
    category: "Design",
    tags: ["Tendances", "Design", "2024"],
    author: author,
    publishedAt: "10 Fév 2024",
    readTime: "9 min",
    views: 1876,
    likes: 143,
    comments: 28,
    featured: false,
    icon: Palette
  },
  {
    id: '8',
    slug: 'securite-web-10-erreurs-eviter',
    title: "Sécurité web : Les 10 erreurs à éviter absolument",
    excerpt: "Protégez votre site et vos utilisateurs en évitant ces failles de sécurité courantes.",
    content: `
      <h2>Introduction</h2>
      <p>La sécurité ne doit pas être une option. Voici les erreurs les plus courantes et comment les éviter.</p>
      
      <h2>Mots de passe faibles</h2>
      <p>La première porte d'entrée des hackers. Imposez des mots de passe forts.</p>
      
      <h2>Absence de sauvegardes</h2>
      <p>En cas de piratage, des sauvegardes régulières vous sauveront.</p>
    `,
    image: security,
    category: "Sécurité",
    tags: ["Sécurité", "Protection", "Best practices"],
    author: author,
    publishedAt: "5 Fév 2024",
    readTime: "11 min",
    views: 2156,
    likes: 178,
    comments: 43,
    featured: false,
    icon: Shield
  },
  {
    id: '9',
    slug: 'lancer-mvp-moins-30-jours',
    title: "Comment lancer son MVP en moins de 30 jours",
    excerpt: "Méthodologie pour passer de l'idée au produit minimum viable rapidement et à moindre coût.",
    content: `
      <h2>Introduction</h2>
      <p>Le MVP (Minimum Viable Product) est la façon la plus efficace de tester votre idée sur le marché.</p>
      
      <h2>Prioriser les fonctionnalités</h2>
      <p>Identifiez les 20% de fonctionnalités qui apporteront 80% de valeur à vos utilisateurs.</p>
      
      <h2>Itérer rapidement</h2>
      <p>Lancez, recueillez les retours, améliorez. Le cycle doit être court.</p>
    `,
    image: mvp,
    category: "Startup",
    tags: ["MVP", "Lean", "Startup"],
    author: author,
    publishedAt: "30 Jan 2024",
    readTime: "13 min",
    views: 2789,
    likes: 201,
    comments: 52,
    featured: true,
    icon: Rocket
  }
];

// Fonctions utilitaires
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getRelatedArticles(currentId: string, category: string, limit: number = 3): Article[] {
  return articles
    .filter(article => article.id !== currentId && article.category === category)
    .slice(0, limit);
}