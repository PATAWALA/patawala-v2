'use client';

import { 
  Calendar, Clock, ArrowRight, 
  Sparkles, BookOpen, Search,
  ChevronLeft, ChevronRight, Filter, X
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { articles as baseArticles } from './data/articles';
import profileImage from '../assets/images/profile3.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

// Points lumineux fixes
const LIGHT_POINTS = [
  { left: '15%', top: '25%' },
  { left: '75%', top: '60%' },
  { left: '40%', top: '80%' },
  { left: '85%', top: '15%' },
];

export default function BlogPage() {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const articlesPerPage = 6;

  // Traduction des catégories
  const { categories, allCategory } = useMemo(() => {
    const categoriesRaw = t('filters.categories', 'blog');
    const categoriesMap: Record<string, string> = 
      categoriesRaw && typeof categoriesRaw === 'object' ? categoriesRaw : {};

    const allCategoryRaw = t('filters.all', 'blog');
    const allCategory = typeof allCategoryRaw === 'string' ? allCategoryRaw : 'Tous';

    return {
      categories: [allCategory, ...Object.values(categoriesMap)],
      allCategory
    };
  }, [t, language]);

  // Initialisation de la catégorie
  useEffect(() => {
    setSelectedCategory(allCategory);
  }, [allCategory]);

  // Réinitialisation
  useEffect(() => {
    setSearchQuery("");
    setCurrentPage(1);
  }, [language]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const effectiveCategory = useMemo(() => 
    categories.includes(selectedCategory) ? selectedCategory : allCategory,
    [selectedCategory, categories, allCategory]
  );

  // Traduction des articles
  const translatedArticles = useMemo(() => {
    return baseArticles.map(article => {
      const key = `article${article.id}`;
      
      const translatedTitle = t(`${key}.title`, 'articlesData');
      const translatedExcerpt = t(`${key}.excerpt`, 'articlesData');
      const translatedCategory = t(`${key}.category`, 'articlesData');
      const translatedTags = t(`${key}.tags`, 'articlesData');

      return {
        ...article,
        title: typeof translatedTitle === 'string' ? translatedTitle : article.title,
        excerpt: typeof translatedExcerpt === 'string' ? translatedExcerpt : article.excerpt,
        category: typeof translatedCategory === 'string' ? translatedCategory : article.category,
        tags: Array.isArray(translatedTags) ? translatedTags : article.tags,
      };
    });
  }, [t, language]);

  // Filtrage
  const filteredArticles = useMemo(() => {
    return translatedArticles.filter(article => {
      const tags: string[] = Array.isArray(article.tags) ? article.tags : [];
      const matchesCategory = effectiveCategory === allCategory || article.category === effectiveCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [translatedArticles, effectiveCategory, allCategory, searchQuery]);

  // Articles à la une
  const featuredArticles = useMemo(() => 
    translatedArticles.filter(a => a.featured),
    [translatedArticles]
  );

  // Pagination
  const { currentArticles, totalPages } = useMemo(() => {
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return {
      currentArticles: filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle),
      totalPages: Math.ceil(filteredArticles.length / articlesPerPage)
    };
  }, [filteredArticles, currentPage]);

  const moreTagsTemplate = useMemo(() => {
    const moreTagsRaw = t('featured.tags.more', 'blog');
    return typeof moreTagsRaw === 'string' ? moreTagsRaw : '+{{count}}';
  }, [t]);

  // Handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePageSelect = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      {/* Styles pour le formulaire Brevo */}
      <style jsx global>{`
        @font-face {
          font-display: block;
          font-family: Roboto;
          src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff");
        }
        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff");
        }
        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff");
        }
        #sib-container input:-ms-input-placeholder,
        #sib-container input::placeholder,
        #sib-container textarea::placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }
        #sib-container a {
          text-decoration: underline;
          color: #2BB2FC;
        }
        .sib-form {
          background-color: transparent !important;
        }
        #sib-container {
          background-color: transparent !important;
          border: none !important;
        }
        .sib-form-block p {
          margin: 0;
        }
      `}</style>

      {/* Scripts Brevo */}
      <Script src="https://sibforms.com/forms/end-form/build/main.js" strategy="lazyOnload" />
      <Script id="brevo-config" strategy="lazyOnload">
        {`
          window.REQUIRED_CODE_ERROR_MESSAGE = 'Veuillez choisir un code pays';
          window.LOCALE = 'fr';
          window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier le format du champ et réessayer.";
          window.REQUIRED_ERROR_MESSAGE = "Vous devez renseigner ce champ. ";
          window.GENERIC_INVALID_MESSAGE = "Les informations que vous avez fournies ne sont pas valides. Veuillez vérifier le format du champ et réessayer.";
          window.translation = {
            common: {
              selectedList: '{quantity} liste sélectionnée',
              selectedLists: '{quantity} listes sélectionnées',
              selectedOption: '{quantity} sélectionné',
              selectedOptions: '{quantity} sélectionnés',
            }
          };
          var AUTOHIDE = Boolean(0);
        `}
      </Script>

      <main className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 bg-[#0A0F1C] relative overflow-hidden font-sans">
        {/* FOND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0px, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.08) 0px, rgba(6,182,212,0.08) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />
          <div className="absolute top-40 -left-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-40 -right-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />
          {LIGHT_POINTS.map((point, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
              style={{ left: point.left, top: point.top }}
              aria-hidden="true"
            />
          ))}
        </div>
        
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          {/* En-tête */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 sm:px-4 py-2 sm:py-2 bg-blue-500/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 border border-blue-500/20 backdrop-blur-sm">
              <BookOpen size={18} className="sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-base sm:text-sm font-bold text-blue-400 tracking-tight">
                {t('badge', 'blog')}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-4 md:mb-6 px-2 text-white tracking-tight">
              {t('title', 'blog')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-black tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {t('titleHighlight', 'blog')}
              </span>
            </h1>
            
            <p className="text-base sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-3 leading-relaxed font-medium">
              {t('subtitle', 'blog')}
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2 sm:px-0">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder={t('search.placeholder', 'blog')}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 sm:pl-14 pr-10 sm:pr-10 py-4 sm:py-4 md:py-5 bg-[#141B2B]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-[#1F2937] focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 outline-none transition-all shadow-md sm:shadow-lg text-base sm:text-base text-white placeholder-gray-500 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    aria-label={t('search.clear', 'blog')}
                  >
                    <X size={18} className="sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filtres catégories */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            {/* Version mobile */}
            <div className="lg:hidden mb-3 px-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between gap-2 px-5 py-4 bg-[#141B2B] rounded-xl border border-[#1F2937] shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-blue-400" />
                  <span className="font-bold text-base text-gray-200 tracking-tight">{t('filters.title', 'blog')}</span>
                </div>
                <span className="text-sm bg-blue-500/20 text-blue-400 font-bold px-3 py-1.5 rounded-full tracking-tight truncate max-w-[140px]">
                  {selectedCategory}
                </span>
              </button>
              
              {isFilterOpen && (
                <div className="mt-2 p-4 bg-[#141B2B] rounded-2xl border border-[#1F2937] shadow-xl max-h-60 overflow-y-auto animate-fadeIn">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex-1 min-w-[120px] truncate tracking-tight ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-[#0A0F1C] text-gray-400 hover:bg-[#1E2638] hover:text-blue-400 border border-[#1F2937] font-semibold'
                        }`}
                        title={category}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Version desktop */}
            <div className="hidden lg:flex justify-center">
              <div className="flex flex-wrap justify-center gap-2 p-2 bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl border border-[#1F2937] shadow-lg max-w-4xl">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap tracking-tight truncate max-w-[180px] ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                        : 'text-gray-400 hover:text-blue-400 hover:bg-[#1E2638] font-semibold'
                    }`}
                    title={category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles à la une */}
          {effectiveCategory === allCategory && !searchQuery && featuredArticles.length > 0 && (
            <div className="mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3 px-2 text-white tracking-tight">
                <span className="w-1 h-6 sm:h-6 md:h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                {t('featured.title', 'blog')}
                <Sparkles size={20} className="sm:w-5 sm:h-5 text-blue-400" />
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {featuredArticles.slice(0, 2).map((article, index) => {
                  const tags: string[] = Array.isArray(article.tags) ? article.tags : [];
                  return (
                    <Link href={`/blog/${article.slug}`} key={article.id}>
                      <div className="group relative bg-[#141B2B] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl md:hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937] h-full cursor-pointer hover:-translate-y-1">
                        {/* Image de couverture */}
                        <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading={index === 0 ? "eager" : "lazy"}
                            quality={70}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          
                          {/* Badge catégorie */}
                          <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-[#141B2B]/90 backdrop-blur-sm rounded-full text-xs sm:text-xs font-bold text-blue-400 border border-blue-500/20 shadow-md tracking-tight">
                              {article.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 sm:p-4 md:p-5 lg:p-6">
                          {/* Meta */}
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 font-medium">
                            <Calendar size={14} className="text-blue-400" />
                            <span>{article.publishedAt}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <Clock size={14} className="text-blue-400" />
                            <span>{article.readTime}</span>
                          </div>

                          <h3 className="text-base sm:text-base md:text-lg lg:text-xl font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 tracking-tight">
                            {article.title}
                          </h3>
                          
                          <p className="text-sm sm:text-sm text-gray-300 mb-3 line-clamp-2 sm:line-clamp-3 font-medium">
                            {article.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                            {tags.slice(0, 2).map((tag: string) => (
                              <span
                                key={tag}
                                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-500/10 text-blue-400 text-xs sm:text-xs font-bold rounded-full tracking-tight"
                              >
                                #{tag}
                              </span>
                            ))}
                            {tags.length > 2 && (
                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800 text-gray-300 text-xs sm:text-xs font-semibold rounded-full tracking-tight">
                                {moreTagsTemplate.replace('{{count}}', (tags.length - 2).toString())}
                              </span>
                            )}
                          </div>

                          {/* Auteur */}
                          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-[#1F2937]">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="relative w-7 h-7 sm:w-7 md:w-8 sm:h-7 md:h-8 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                                <Image
                                  src={profileImage}
                                  alt={article.author.name}
                                  fill
                                  className="object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <span className="text-sm sm:text-sm font-bold text-gray-200 tracking-tight">{article.author.name}</span>
                            </div>
                            <div className="inline-flex items-center gap-1 text-blue-400 font-bold text-sm group/link tracking-tight">
                              <span>{t('featured.readMore', 'blog')}</span>
                              <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Grille des articles */}
          {currentArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-10 sm:mb-12 md:mb-16">
              {currentArticles.map((article, index) => {
                const tags: string[] = Array.isArray(article.tags) ? article.tags : [];
                return (
                  <Link href={`/blog/${article.slug}`} key={article.id}>
                    <div className="group relative bg-[#141B2B] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-[#1F2937] h-full cursor-pointer hover:-translate-y-1">
                      {/* Image de couverture */}
                      <div className="relative h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          loading="lazy"
                          quality={70}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Badge catégorie */}
                        <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                          <span className="px-1.5 sm:px-2 py-0.5 bg-[#141B2B]/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs font-bold text-blue-400 border border-blue-500/20 shadow-sm tracking-tight">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 sm:p-3 md:p-4">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs sm:text-xs text-gray-400 mb-1.5 font-medium">
                          <Calendar size={12} className="text-blue-400" />
                          <span>{article.publishedAt}</span>
                          <span className="w-0.5 h-0.5 bg-gray-600 rounded-full"></span>
                          <Clock size={12} className="text-blue-400" />
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-sm sm:text-sm md:text-base font-extrabold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors tracking-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-xs sm:text-xs text-gray-300 mb-2 line-clamp-2 font-medium">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {tags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-1 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] sm:text-[10px] font-bold rounded-full tracking-tight"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Auteur */}
                        <div className="flex items-center justify-between pt-1.5 border-t border-[#1F2937]">
                          <div className="flex items-center gap-1.5">
                            <div className="relative w-6 h-6 sm:w-6 sm:h-6 rounded-full overflow-hidden ring-1 ring-blue-500/20">
                              <Image
                                src={profileImage}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-xs sm:text-xs font-bold text-gray-300 truncate max-w-[60px] xs:max-w-[80px] sm:max-w-[100px] tracking-tight">
                              {article.author.name}
                            </span>
                          </div>
                          <div className="inline-flex items-center gap-0.5 text-blue-400 font-bold text-xs sm:text-xs group/link tracking-tight">
                            <span>{t('featured.readMore', 'blog')}</span>
                            <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-300 font-semibold text-base">{t('noResults', 'blog')}</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">{t('tryAdjusting', 'blog')}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-3 flex-wrap px-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border border-[#1F2937] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-400 hover:shadow-md transition-all bg-[#141B2B] text-gray-400 font-bold"
                aria-label={t('pagination.previous', 'blog')}
              >
                <ChevronLeft size={18} className="sm:w-4 sm:h-4" />
              </button>
              
              <div className="flex gap-1 sm:gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageSelect(i + 1)}
                    className={`w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl font-bold text-sm sm:text-sm transition-all tracking-tight ${
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
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border border-[#1F2937] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 hover:text-blue-400 hover:shadow-md transition-all bg-[#141B2B] text-gray-400 font-bold"
                aria-label={t('pagination.next', 'blog')}
              >
                <ChevronRight size={18} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

          {/* Formulaire Brevo simplifié */}
          <div className="relative max-w-3xl sm:max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-2 sm:px-4">
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-20"></div>
            <div className="relative p-6 sm:p-6 md:p-8 lg:p-10 bg-[#141B2B]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#1F2937] shadow-xl sm:shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 sm:w-40 h-20 sm:h-40 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-20 sm:w-40 h-20 sm:h-40 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
              
              {/* Formulaire Brevo intégré */}
              <div className="sib-form" style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
                <div id="sib-form-container" className="sib-form-container">
                  <div id="error-message" className="sib-form-message-panel" style={{ fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949', maxWidth: '540px', display: 'none', margin: '0 auto 16px' }}>
                    <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                      <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
                        <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                      </svg>
                      <span className="sib-form-message-panel__inner-text">Nous n'avons pas pu confirmer votre inscription.</span>
                    </div>
                  </div>
                  <div id="success-message" className="sib-form-message-panel" style={{ fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#085229', backgroundColor: '#e7faf0', borderRadius: '3px', borderColor: '#13ce66', maxWidth: '540px', display: 'none', margin: '0 auto 16px' }}>
                    <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                      <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
                        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                      </svg>
                      <span className="sib-form-message-panel__inner-text">Votre inscription est confirmée.</span>
                    </div>
                  </div>
                  <div id="sib-container" className="sib-container--large sib-container--vertical" style={{ textAlign: 'center', backgroundColor: 'transparent', maxWidth: '540px', margin: '0 auto', border: 'none' }}>
                    <form id="sib-form" method="POST" action="https://1608b43e.sibforms.com/serve/MUIFAGWyCrBBt_5Mc_fF8uA_7aIEkVMMaZy_FoVWHsjnEyUhS9ymjEpY4IuAEvyh49_hMSdbEAAiurB4eBH6nMNbmwqo6ozjwRCkHIMs_OTkUnIll_DUND-PqCECRZy1lB2p3bA3YbHZt93ZW1r5srnm9kSXhn1GOl9jLDiQeKGp7dNDN0S3cN_FkCvq8dcVgFIX29JCSEHz42mH7A==" data-type="subscription">
                      <div style={{ padding: '8px 0' }}>
                        <div className="sib-form-block" style={{ fontSize: '32px', textAlign: 'center', fontWeight: '700', fontFamily: 'Helvetica, sans-serif', color: '#FFFFFF', backgroundColor: 'transparent', marginBottom: '8px' }}>
                          <p>💡 Recevez mes prochains articles</p>
                        </div>
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <div className="sib-form-block" style={{ fontSize: '16px', textAlign: 'center', fontFamily: 'Helvetica, sans-serif', color: '#9CA3AF', backgroundColor: 'transparent', marginBottom: '16px' }}>
                          <div className="sib-text-form-block">
                            <p>Une analyse approfondie chaque semaine sur le dev, l'IA et l'entrepreneuriat</p>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <div className="sib-input sib-form-block">
                          <div className="form__entry entry_block">
                            <div className="form__label-row">
                              <label className="entry__label" style={{ fontWeight: '700', textAlign: 'left', fontSize: '16px', fontFamily: 'Helvetica, sans-serif', color: '#FFFFFF', display: 'block', marginBottom: '8px' }} htmlFor="EMAIL">Entrez votre EMAIL</label>
                              <div className="entry__field">
                                <input 
                                  className="input" 
                                  type="email" 
                                  id="EMAIL" 
                                  name="EMAIL" 
                                  autoComplete="off" 
                                  placeholder="jean@email.com" 
                                  data-required="true" 
                                  required 
                                  style={{ width: '100%', padding: '16px', backgroundColor: '#0A0F1C', border: '1px solid #1F2937', borderRadius: '8px', color: '#FFFFFF', fontSize: '16px' }} 
                                />
                              </div>
                            </div>
                            <label className="entry__error entry__error--primary" style={{ fontSize: '14px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', display: 'none' }}></label>
                            <label className="entry__specification" style={{ fontSize: '12px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#9CA3AF', marginTop: '8px', display: 'block' }}>
                              Veuillez entrer une adresse email valide pour ne rien manquer
                            </label>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <div className="sib-form-block" style={{ textAlign: 'center' }}>
                          <button 
                            className="sib-form-block__button sib-form-block__button-with-loader" 
                            style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Helvetica, sans-serif', color: '#FFFFFF', backgroundColor: '#3B82F6', borderRadius: '8px', borderWidth: '0px', padding: '16px 32px', width: '100%', cursor: 'pointer', marginTop: '16px' }} 
                            form="sib-form" 
                            type="submit"
                          >
                            <svg className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" style={{ display: 'none', width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }}>
                              <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                            </svg>
                            S'abonner
                          </button>
                        </div>
                      </div>
                      <input type="text" name="email_address_check" value="" className="input--hidden" style={{ display: 'none' }} />
                      <input type="hidden" name="locale" value="fr" />
                    </form>
                  </div>
                </div>
              </div>
              
              <p className="text-xs sm:text-xs text-gray-500 mt-4 sm:mt-4 flex items-center justify-center gap-1 sm:gap-2 font-medium">
                <span className="w-1 h-1 sm:w-1 sm:h-1 bg-blue-400 rounded-full"></span>
                {t('newsletter.footer', 'blog')}
                <span className="w-1 h-1 sm:w-1 sm:h-1 bg-cyan-400 rounded-full"></span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}