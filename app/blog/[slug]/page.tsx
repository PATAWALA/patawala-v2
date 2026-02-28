'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, Clock, ArrowLeft, 
  BookOpen, ArrowRight, Share2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import profileImage from '../../assets/images/profile3.png';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id, article.category, 3);

  return (
    <main className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 bg-[#0A0F1C] relative overflow-hidden">
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
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <Link href="/blog">
            <button className="group inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-[#141B2B] rounded-lg sm:rounded-xl border border-[#1F2937] hover:border-blue-500 hover:shadow-md transition-all text-xs sm:text-sm">
              <ArrowLeft size={14} className="sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-400 group-hover:-translate-x-1 transition-all" />
              <span className="text-gray-400 group-hover:text-blue-400 font-medium">Retour au blog</span>
            </button>
          </Link>
        </motion.div>

        {/* Article principal */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#141B2B] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden border border-[#1F2937] mb-8 sm:mb-10 md:mb-12"
        >
          {/* Image de couverture */}
          <div className="relative h-48 xs:h-56 sm:h-72 md:h-96 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            
            {/* Badge catégorie */}
            <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
              <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-[#141B2B]/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold text-blue-400 border border-blue-500/20 shadow-md">
                {article.category}
              </span>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Meta */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
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

            {/* Titre */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6 md:mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Auteur */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 p-3 sm:p-4 md:p-5 bg-[#0A0F1C] rounded-xl sm:rounded-2xl border border-[#1F2937]">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 sm:ring-3 ring-blue-500/20">
                  <Image
                    src={profileImage}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base md:text-lg">{article.author.name}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{article.author.role}</p>
                </div>
              </div>
              
              <button className="p-2 sm:p-2.5 bg-[#141B2B] text-gray-400 rounded-lg sm:rounded-xl hover:bg-[#1E2638] hover:text-blue-400 transition-all border border-[#1F2937]">
                <Share2 size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Contenu de l'article */}
            <div 
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-a:text-blue-400 prose-img:rounded-xl sm:prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </motion.article>

        {/* Articles similaires */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-white flex items-center gap-2 sm:gap-3">
              <span className="w-1 h-4 sm:h-5 md:h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
              Articles similaires
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {relatedArticles.map((related, index) => (
                <Link href={`/blog/${related.slug}`} key={related.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group bg-[#141B2B] rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-[#1F2937] h-full cursor-pointer"
                  >
                    <div className="relative h-20 xs:h-24 sm:h-28 md:h-32 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
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
                        <span>Lire</span>
                        <ArrowRight size={6} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}