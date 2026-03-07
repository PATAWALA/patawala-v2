'use client';

import { 
  Calendar, Clock, ArrowLeft, 
  ArrowRight, MessageCircle,
  Maximize2, Minimize2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import profileImage from '../../assets/images/profile3.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { t, language } = useTranslation();
  const baseArticle = getArticleBySlug(params.slug);
  const [fontSize, setFontSize] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!baseArticle) {
    notFound();
  }

  // Appliquer les traductions à l'article
  const article = useMemo(() => {
    const key = `article${baseArticle.id}`;
    const translatedTitle = t(`${key}.title`, 'articlesData');
    const translatedExcerpt = t(`${key}.excerpt`, 'articlesData');
    const translatedCategory = t(`${key}.category`, 'articlesData');
    const translatedTags = t(`${key}.tags`, 'articlesData');
    const translatedContent = t(`${key}.content`, 'articlesData');

    return {
      ...baseArticle,
      title: typeof translatedTitle === 'string' ? translatedTitle : baseArticle.title,
      excerpt: typeof translatedExcerpt === 'string' ? translatedExcerpt : baseArticle.excerpt,
      category: typeof translatedCategory === 'string' ? translatedCategory : baseArticle.category,
      tags: Array.isArray(translatedTags) ? translatedTags : baseArticle.tags,
      content: typeof translatedContent === 'string' ? translatedContent : baseArticle.content,
    };
  }, [baseArticle, t, language]);

  // Articles similaires traduits
  const baseRelated = getRelatedArticles(article.id, article.category, 3);
  const relatedArticles = useMemo(() => {
    return baseRelated.map(related => {
      const key = `article${related.id}`;
      const translatedTitle = t(`${key}.title`, 'articlesData');
      return {
        ...related,
        title: typeof translatedTitle === 'string' ? translatedTitle : related.title,
      };
    });
  }, [baseRelated, t, language]);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 200));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 70));

  const toggleFullscreen = () => {
    const elem = document.querySelector('.article-content-area');
    if (elem) {
      if (!document.fullscreenElement) {
        elem.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const whatsappLink = 'https://wa.me/22962278090';

  return (
    <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 bg-[#0A0F1C] relative overflow-hidden">
      {/* FOND OPTIMISÉ - PAS D'ANIMATIONS */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles - une seule couche */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(90deg, 
            rgba(59,130,246,0.05) 0px, 
            rgba(59,130,246,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        
        {/* Cercles flous STATIQUES */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Bouton retour */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link href="/blog">
            <button className="group inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl border-2 border-blue-500/50 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all text-xs sm:text-sm">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4 text-blue-400 group-hover:text-blue-300 group-hover:-translate-x-1 transition-all" />
              <span className="text-blue-400 group-hover:text-blue-300 font-medium">
                {t('backToBlog', 'blog') || 'Retour au blog'}
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Image pleine largeur */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 h-48 xs:h-56 sm:h-72 md:h-96 mb-6 sm:mb-8 md:mb-10">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent"></div>
        <div className="absolute top-2 sm:top-3 md:top-4 left-3 sm:left-4 md:left-6 lg:left-8">
          <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-blue-400 border border-blue-500/20 shadow-md">
            {article.category}
          </span>
        </div>
      </div>

      {/* Conteneur principal */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          {/* Partie gauche : titre, date, tags */}
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 mb-2">
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Calendar size={12} className="sm:w-4 sm:h-4 text-blue-400" />
                {article.publishedAt}
              </span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span className="flex items-center gap-1 sm:gap-1.5">
                <Clock size={12} className="sm:w-4 sm:h-4 text-blue-400" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Partie droite : auteur + bouton WhatsApp */}
          <div className="lg:w-80 xl:w-96">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-[#1F2937]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                  <Image
                    src={profileImage}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">{article.author.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{article.author.role}</p>
                </div>
              </div>
              
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                title={t('whatsappMessage', 'blog') || 'Envoyer un message WhatsApp'}
              >
                <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                <span>{t('message', 'blog') || 'Message'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barre d'outils de lecture */}
        <div className="flex items-center justify-end gap-2 mb-4 sm:mb-6">
          <button
            onClick={decreaseFont}
            className="p-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium border border-[#1F2937]"
            title={t('decreaseFont', 'blog') || 'Réduire la taille du texte'}
          >
            A−
          </button>
          <span className="text-sm text-gray-400 min-w-[45px] text-center">{fontSize}%</span>
          <button
            onClick={increaseFont}
            className="p-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium border border-[#1F2937]"
            title={t('increaseFont', 'blog') || 'Agrandir la taille du texte'}
          >
            A+
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-black/30 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition border border-[#1F2937]"
            title={isFullscreen ? (t('exitFullscreen', 'blog') || 'Quitter le plein écran') : (t('fullscreen', 'blog') || 'Lecture plein écran')}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* Zone de lecture */}
        <div
          className="article-content-area bg-black/30 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-[#1F2937] transition-all mx-auto lg:mx-0 lg:max-w-4xl"
          style={{ fontSize: `${fontSize}%` }}
        >
          <div
            className="prose prose-invert max-w-none"
            style={{ overflowX: 'auto' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Styles tableaux */}
        <style jsx>{`
          .article-content-area table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            font-size: 0.9rem;
          }
          .article-content-area th,
          .article-content-area td {
            border: 1px solid #374151;
            padding: 0.75rem;
            text-align: left;
          }
          .article-content-area th {
            background-color: #1F2937;
            color: white;
            font-weight: 600;
          }
          .article-content-area tr:nth-child(even) {
            background-color: #111827;
          }
          .article-content-area tr:hover {
            background-color: #1E293B;
          }
        `}</style>

        {/* Articles similaires */}
        {relatedArticles.length > 0 && (
          <div className="mt-10 sm:mt-12 md:mt-16">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-white flex items-center gap-2 sm:gap-3">
              <span className="w-1 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
              {t('relatedArticles', 'blog') || 'Articles similaires'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {relatedArticles.map((related, index) => (
                <Link href={`/blog/${related.slug}`} key={related.id}>
                  <div
                    className="group bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-[#1F2937] h-full cursor-pointer hover:-translate-y-1"
                  >
                    <div className="relative h-20 xs:h-24 sm:h-28 md:h-32 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
                        loading="lazy"
                        quality={70}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-2 sm:p-3">
                      <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors text-[10px] sm:text-xs md:text-sm">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-gray-400 mb-1.5">
                        <Calendar size={8} className="text-blue-400" />
                        <span>{related.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-blue-400 font-medium text-[8px] sm:text-[10px] group/link">
                        <span>{t('readMore', 'blog') || 'Lire'}</span>
                        <ArrowRight size={6} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}