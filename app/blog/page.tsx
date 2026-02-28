'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, Clock, ArrowRight, 
  Sparkles, BookOpen, Search,
  ChevronLeft, ChevronRight, Filter, X
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { articles } from './data/articles';
import profileImage from '../assets/images/profile3.png';

const categories = [
  "Tous",
  "Développement",
  "E-commerce",
  "Mobile",
  "Design",
  "SEO",
  "Sécurité",
  "Startup",
  "Productivité"
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const articlesPerPage = 6;

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(a => a.featured);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 bg-[#0A0F1C] relative overflow-hidden">
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
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 border border-blue-500/20 backdrop-blur-sm"
          >
            <BookOpen size={14} className="sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-blue-400">
              Mon blog
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 px-2 text-white"
          >
            Articles et
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              ressources
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-3 leading-relaxed"
          >
            Conseils, tutos et retours d'expérience sur le développement web, 
            le design et l'entrepreneuriat digital.
          </motion.p>
        </div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Rechercher un article, un sujet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-14 pr-8 sm:pr-10 py-3 sm:py-4 md:py-5 bg-[#141B2B]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-[#1F2937] focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-md sm:shadow-lg text-sm sm:text-base text-white placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X size={16} className="sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filtres catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          {/* Version mobile avec bouton filtre */}
          <div className="lg:hidden mb-3 px-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-blue-400" />
                <span className="font-medium text-sm text-gray-300">Filtrer par catégorie</span>
              </div>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                {selectedCategory}
              </span>
            </button>
            
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 p-3 bg-[#141B2B] rounded-2xl border border-[#1F2937] shadow-xl max-h-60 overflow-y-auto"
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex-1 min-w-[80px] ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-[#0A0F1C] text-gray-400 hover:bg-[#1E2638] hover:text-blue-400 border border-[#1F2937]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Version desktop */}
          <div className="hidden lg:flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl border border-[#1F2937] shadow-lg max-w-4xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-[#1E2638]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Articles à la une */}
        {selectedCategory === "Tous" && !searchQuery && featuredArticles.length > 0 && (
          <div className="mb-12 sm:mb-16 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3 px-2 text-white"
            >
              <span className="w-1 h-5 sm:h-6 md:h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
              Articles à la une
              <Sparkles size={16} className="sm:w-5 sm:h-5 text-blue-400" />
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {featuredArticles.slice(0, 2).map((article, index) => (
                <Link href={`/blog/${article.slug}`} key={article.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-[#141B2B] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl md:hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937] h-full cursor-pointer"
                  >
                    {/* Image de couverture */}
                    <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* Badge catégorie */}
                      <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                        <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-[#141B2B]/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-semibold text-blue-400 border border-blue-500/20 shadow-md">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Calendar size={12} className="text-blue-400" />
                        <span>{article.publishedAt}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <Clock size={12} className="text-blue-400" />
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-gray-400 mb-3 line-clamp-2 sm:line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 text-[8px] sm:text-xs font-medium rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {article.tags.length > 2 && (
                          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800 text-gray-400 text-[8px] sm:text-xs font-medium rounded-full">
                            +{article.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Auteur */}
                      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-[#1F2937]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                            <Image
                              src={profileImage}
                              alt={article.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-300">{article.author.name}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-blue-400 font-medium text-xs group/link">
                          <span>Lire</span>
                          <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Grille des articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-16">
          {currentArticles.map((article, index) => (
            <Link href={`/blog/${article.slug}`} key={article.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#141B2B] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full cursor-pointer"
              >
                {/* Image de couverture */}
                <div className="relative h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badge catégorie */}
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                    <span className="px-1.5 sm:px-2 py-0.5 bg-[#141B2B]/90 backdrop-blur-sm rounded-full text-[8px] sm:text-xs font-semibold text-blue-400 border border-blue-500/20 shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-2 sm:p-3 md:p-4">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 mb-1.5">
                    <Calendar size={10} className="text-blue-400" />
                    <span>{article.publishedAt}</span>
                    <span className="w-0.5 h-0.5 bg-gray-600 rounded-full"></span>
                    <Clock size={10} className="text-blue-400" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1 py-0.5 bg-blue-500/10 text-blue-400 text-[6px] sm:text-[10px] font-medium rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Auteur */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-[#1F2937]">
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden ring-1 ring-blue-500/20">
                        <Image
                          src={profileImage}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[8px] sm:text-xs font-medium text-gray-400 truncate max-w-[60px] xs:max-w-[80px] sm:max-w-[100px]">
                        {article.author.name}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-0.5 text-blue-400 font-medium text-[8px] sm:text-xs group/link">
                      <span>Lire</span>
                      <ArrowRight size={8} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 flex-wrap px-2"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border border-[#1F2937] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-400 hover:shadow-md transition-all bg-[#141B2B] text-gray-400"
            >
              <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
            </button>
            
            <div className="flex gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105 sm:scale-110'
                      : 'border border-[#1F2937] hover:border-blue-500 hover:text-blue-400 hover:shadow-md bg-[#141B2B] text-gray-400'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border border-[#1F2937] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-400 hover:shadow-md transition-all bg-[#141B2B] text-gray-400"
            >
              <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        )}

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative max-w-3xl sm:max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-2 sm:px-4"
        >
          <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-20"></div>
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 bg-[#141B2B]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#1F2937] shadow-xl sm:shadow-2xl text-center overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
            
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-white">
              Ne manquez aucun article
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-4 sm:mb-6 md:mb-8">
              Recevez les nouveaux articles directement dans votre boîte mail
            </p>
            
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-[#0A0F1C] rounded-lg sm:rounded-xl border border-[#1F2937] focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-xs sm:text-sm text-white placeholder-gray-500"
              />
              <button className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl hover:shadow-blue-500/30 whitespace-nowrap">
                S'abonner
              </button>
            </div>
            
            <p className="text-[8px] sm:text-xs text-gray-500 mt-3 sm:mt-4 flex items-center justify-center gap-1 sm:gap-2">
              <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-blue-400 rounded-full"></span>
              📚 1 email par semaine. Désabonnement facile.
              <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-cyan-400 rounded-full"></span>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}