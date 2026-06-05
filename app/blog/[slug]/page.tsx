// app/blog/[slug]/ArticlePageClient.tsx
'use client';

import { Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Maximize2, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import profileImage from '../../assets/images/profile3.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePageClient({ params }: ArticlePageProps) {
  const { t, isLoading } = useTranslation();
  const baseArticle = getArticleBySlug(params.slug);
  const [fontSize, setFontSize] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => { if (!isLoading) setIsReady(true); }, [isLoading]);
  if (!baseArticle) notFound();

  const article = useMemo(() => {
    if (!isReady) return baseArticle;
    const key = `article${baseArticle.id}`;
    return {
      ...baseArticle,
      title: (typeof t(`${key}.title`, 'articles') === 'string' ? t(`${key}.title`, 'articles') : baseArticle.title) as string,
      excerpt: (typeof t(`${key}.excerpt`, 'articles') === 'string' ? t(`${key}.excerpt`, 'articles') : baseArticle.excerpt) as string,
      category: (typeof t(`${key}.category`, 'articles') === 'string' ? t(`${key}.category`, 'articles') : baseArticle.category) as string,
      tags: (Array.isArray(t(`${key}.tags`, 'articles')) ? t(`${key}.tags`, 'articles') : baseArticle.tags) as string[],
      content: (typeof t(`${key}.content`, 'articles') === 'string' ? t(`${key}.content`, 'articles') : baseArticle.content) as string,
    };
  }, [baseArticle, t, isReady]);

  const baseRelated = useMemo(() => getRelatedArticles(article.id, article.category, 3), [article.id, article.category]);
  const relatedArticles = useMemo(() => {
    if (!isReady) return baseRelated;
    return baseRelated.map(related => ({
      ...related,
      title: (typeof t(`article${related.id}.title`, 'articles') === 'string' ? t(`article${related.id}.title`, 'articles') : related.title) as string,
    }));
  }, [baseRelated, t, isReady]);

  const increaseFont = useCallback(() => setFontSize(prev => Math.min(prev + 10, 200)), []);
  const decreaseFont = useCallback(() => setFontSize(prev => Math.max(prev - 10, 70)), []);
  const toggleFullscreen = useCallback(() => {
    const elem = document.querySelector('.article-content-area');
    if (elem) {
      if (!document.fullscreenElement) { elem.requestFullscreen(); setIsFullscreen(true); }
      else { document.exitFullscreen(); setIsFullscreen(false); }
    }
  }, []);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const labels = useMemo(() => ({
    backToBlog: t('backToBlog', 'blog') || 'Retour au blog',
    message: t('message', 'blog') || 'Message',
    relatedArticles: t('relatedArticles', 'blog') || 'Articles similaires',
    readMore: t('readMore', 'blog') || 'Lire',
  }), [t]);

  if (isLoading || !isReady) {
    return (
      <main className="min-h-screen pt-20 pb-16 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="animate-pulse space-y-10">
            <div className="w-32 h-8 bg-surface rounded-lg" />
            <div className="w-full h-72 bg-surface rounded-3xl" />
            <div className="space-y-4">
              <div className="w-3/4 h-10 bg-surface rounded-lg" />
              <div className="w-1/2 h-6 bg-surface rounded-lg" />
              <div className="w-full h-60 bg-surface rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-primary/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* Contenu centré et aéré */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-3xl relative z-10">
        
        {/* Retour */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {labels.backToBlog}
        </Link>

        {/* Catégorie + Date */}
        <div className="flex items-center gap-4 text-sm text-muted mb-6">
          <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">{article.category}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary/60" />{article.publishedAt}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary/60" />{article.readTime}</span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight mb-8 tracking-tight">
          {article.title}
        </h1>

        {/* Auteur */}
        <div className="flex items-center gap-4 mb-12 pb-10 border-b border-border/30">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
            <Image src={profileImage} alt={article.author.name} width={48} height={48} className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{article.author.name}</p>
            <p className="text-sm text-muted">{article.author.role}</p>
          </div>
          <a href="https://wa.me/22962278090" target="_blank" rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 4px 15px -3px rgba(34,197,94,0.4)' }}>
            <MessageCircle size={14} />{labels.message}
          </a>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-14" style={{ boxShadow: '0 20px 50px -15px rgba(0,0,0,0.5)' }}>
          <Image src={article.image} alt={article.title} fill className="object-cover" priority sizes="100vw" quality={90} />
        </div>

        {/* Outils lecture */}
        <div className="flex justify-end items-center gap-3 mb-10">
          <button onClick={decreaseFont} className="w-8 h-8 rounded-lg bg-surface text-muted hover:text-primary text-xs font-medium" style={{ boxShadow: '0 4px 10px -5px rgba(0,0,0,0.3)' }}>A−</button>
          <span className="text-xs text-muted w-10 text-center">{fontSize}%</span>
          <button onClick={increaseFont} className="w-8 h-8 rounded-lg bg-surface text-muted hover:text-primary text-xs font-medium" style={{ boxShadow: '0 4px 10px -5px rgba(0,0,0,0.3)' }}>A+</button>
          <button onClick={toggleFullscreen} className="w-8 h-8 rounded-lg bg-surface text-muted hover:text-primary" style={{ boxShadow: '0 4px 10px -5px rgba(0,0,0,0.3)' }}>
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>

        {/* Contenu */}
        <div className="article-content-area bg-surface rounded-3xl p-8 sm:p-12 mb-20" 
          style={{ fontSize: `${fontSize}%`, boxShadow: '0 15px 40px -15px rgba(0,0,0,0.4)' }}>
          <div className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted prose-a:text-primary prose-strong:text-foreground prose-li:text-muted prose-img:rounded-2xl" 
            dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-16">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium">#{tag}</span>
          ))}
        </div>

        {/* Articles similaires */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-light text-foreground mb-10 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-amber-400 rounded-full" />
              {labels.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map(related => (
                <Link href={`/blog/${related.slug}`} key={related.id}>
                  <article className="group bg-surface rounded-2xl overflow-hidden h-full cursor-pointer"
                    style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.4)' }}>
                    <div className="relative h-44 overflow-hidden">
                      <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" loading="lazy" quality={75} />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted mb-3">
                        <Calendar size={12} className="text-primary/60" />{related.publishedAt}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{related.title}</h3>
                      <span className="text-primary font-medium text-xs flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        {labels.readMore}<ArrowRight size={13} />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}