'use client';

import { 
  Calendar, Clock, ArrowRight, 
  Sparkles, BookOpen, Search,
  ChevronLeft, ChevronRight, Filter, X, Loader2, Mail
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { articles as baseArticles } from './data/articles';
import profileImage from '../assets/images/profile3.webp';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function BlogPageClient() {
  const { t, language, isLoading } = useTranslation();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState('');
  const articlesPerPage = 6;

  useEffect(() => { if (!isLoading) setIsReady(true); }, [isLoading]);

  const { categories, allCategory } = useMemo(() => {
    const categoriesRaw = t('filters.categories', 'blog');
    let categoryValues: string[] = [];
    if (categoriesRaw && typeof categoriesRaw === 'object') {
      categoryValues = Object.values(categoriesRaw);
    }
    const allCategoryRaw = t('filters.all', 'blog');
    const allCategory = typeof allCategoryRaw === 'string' ? allCategoryRaw : 'Tous';
    return { categories: [allCategory, ...categoryValues], allCategory };
  }, [t, language, isReady]);

  useEffect(() => {
    if (isReady) setSelectedCategory(allCategory);
  }, [allCategory, isReady]);

  useEffect(() => {
    if (isReady) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, [language, isReady]);

  useEffect(() => {
    if (isReady) setCurrentPage(1);
  }, [selectedCategory, searchQuery, isReady]);

  const effectiveCategory = useMemo(() => 
    categories.includes(selectedCategory) ? selectedCategory : allCategory,
    [selectedCategory, categories, allCategory]
  );

  const translatedArticles = useMemo(() => {
    if (!isReady) return [];
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
  }, [t, language, isReady]);

  const filteredArticles = useMemo(() => {
    if (!isReady) return [];
    return translatedArticles.filter(article => {
      const tags: string[] = Array.isArray(article.tags) ? article.tags : [];
      const matchesCategory = effectiveCategory === allCategory || article.category === effectiveCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [translatedArticles, effectiveCategory, allCategory, searchQuery, isReady]);

  const featuredArticles = useMemo(() => 
    translatedArticles.filter(a => a.featured),
    [translatedArticles]
  );

  const { currentArticles, totalPages } = useMemo(() => {
    if (!isReady) return { currentArticles: [], totalPages: 0 };
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return {
      currentArticles: filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle),
      totalPages: Math.ceil(filteredArticles.length / articlesPerPage)
    };
  }, [filteredArticles, currentPage, isReady]);

  const moreTagsTemplate = useMemo(() => {
    const moreTagsRaw = t('featured.tags.more', 'blog');
    return typeof moreTagsRaw === 'string' ? moreTagsRaw : '+{{count}}';
  }, [t, isReady]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => setSearchQuery(""), []);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  }, []);

  const handlePrevPage = useCallback(() => setCurrentPage(prev => Math.max(prev - 1, 1)), []);
  const handleNextPage = useCallback(() => setCurrentPage(prev => Math.min(prev + 1, totalPages)), [totalPages]);
  const handlePageSelect = useCallback((page: number) => setCurrentPage(page), []);

  const handleSubscribe = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail('');
      router.push('/merci');
    }, 1500);
  }, [email, router]);

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const cardVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: '0 20px 25px -5px rgba(212,175,55,0.15)' }
  };

  if (isLoading || !isReady) {
    return (
      <main className="min-h-screen pt-20 pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="w-40 h-10 bg-surface rounded-full mx-auto" />
            <div className="w-72 h-14 bg-surface rounded-xl mx-auto" />
            <div className="w-full h-14 bg-surface rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => <div key={i} className="bg-surface rounded-2xl h-80" />)}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 sm:pt-28 pb-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <motion.div className="text-center mb-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20 backdrop-blur-sm">
              <BookOpen size={18} className="text-primary" />
              <span className="text-base font-bold text-primary tracking-tight">{t('badge', 'blog')}</span>
            </div>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-foreground tracking-tight" variants={fadeInUp}>
            {t('title', 'blog')}<br />
            <span className="text-gradient-gold text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight">
              {t('titleHighlight', 'blog')}
            </span>
          </motion.h1>
          <motion.p className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-3 leading-relaxed font-medium" variants={fadeInUp}>
            {t('subtitle', 'blog')}
          </motion.p>
        </motion.div>

        <motion.div className="max-w-2xl mx-auto mb-10 px-2 sm:px-0" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-amber-400 rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder={t('search.placeholder', 'blog')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 sm:pl-14 pr-10 py-4 bg-surface/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-md text-base text-foreground placeholder-muted font-medium"
              />
              {searchQuery && (
                <button onClick={handleClearSearch} className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 text-muted hover:text-foreground">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <div className="lg:hidden mb-3 px-2">
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="w-full flex items-center justify-between gap-2 px-5 py-4 bg-surface rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-primary" />
                <span className="font-bold text-base text-foreground tracking-tight">{t('filters.title', 'blog')}</span>
              </div>
              <span className="text-sm bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-full tracking-tight truncate max-w-[140px]">
                {selectedCategory}
              </span>
            </button>
            {isFilterOpen && (
              <motion.div className="mt-2 p-4 bg-surface rounded-2xl border border-border shadow-xl max-h-60 overflow-y-auto" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button key={category} onClick={() => handleCategorySelect(category)}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex-1 min-w-[120px] truncate tracking-tight ${
                        selectedCategory === category
                          ? 'bg-primary text-background shadow-lg'
                          : 'bg-background text-muted hover:bg-surface-elevated hover:text-primary border border-border font-semibold'
                      }`} title={category}>
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <motion.div className="hidden lg:flex justify-center" variants={fadeInUp}>
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-surface/80 backdrop-blur-sm rounded-2xl border border-border shadow-lg max-w-4xl">
              {categories.map((category) => (
                <motion.button key={category} onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap tracking-tight truncate max-w-[180px] ${
                    selectedCategory === category
                      ? 'bg-primary text-background shadow-lg scale-105'
                      : 'text-muted hover:text-primary hover:bg-surface-elevated font-semibold'
                  }`}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} title={category}>
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {effectiveCategory === allCategory && !searchQuery && featuredArticles.length > 0 && (
          <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold mb-6 flex items-center gap-3 px-2 text-foreground tracking-tight" variants={fadeInUp}>
              <span className="w-1 h-6 md:h-8 bg-gradient-to-b from-primary to-amber-400 rounded-full"></span>
              {t('featured.title', 'blog')}
              <Sparkles size={20} className="text-primary" />
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featuredArticles.slice(0, 2).map((article, index) => {
                const tags: string[] = Array.isArray(article.tags) ? article.tags : [];
                return (
                  <Link href={`/blog/${article.slug}`} key={article.id}>
                    <motion.div className="group relative bg-surface rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border h-full cursor-pointer"
                      variants={cardVariants} whileHover="hover">
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index === 0 ? "eager" : "lazy"} quality={70} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary border border-primary/20 shadow-md tracking-tight">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-sm text-muted mb-2 font-medium">
                          <Calendar size={14} className="text-primary" />
                          <span>{article.publishedAt}</span>
                          <span className="w-1 h-1 bg-border rounded-full"></span>
                          <Clock size={14} className="text-primary" />
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 tracking-tight">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted mb-3 line-clamp-3 font-medium">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full tracking-tight">#{tag}</span>
                          ))}
                          {tags.length > 2 && (
                            <span className="px-2 py-1 bg-border/50 text-muted text-xs font-semibold rounded-full tracking-tight">
                              {moreTagsTemplate.replace('{{count}}', (tags.length - 2).toString())}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20">
                              <Image src={profileImage} alt={article.author.name} fill className="object-cover" loading="lazy" />
                            </div>
                            <span className="text-sm font-bold text-foreground tracking-tight">{article.author.name}</span>
                          </div>
                          <div className="inline-flex items-center gap-1 text-primary font-bold text-sm group/link tracking-tight">
                            <span>{t('featured.readMore', 'blog')}</span>
                            <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {currentArticles.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {currentArticles.map((article) => {
              const tags: string[] = Array.isArray(article.tags) ? article.tags : [];
              return (
                <Link href={`/blog/${article.slug}`} key={article.id}>
                  <motion.div className="group relative bg-surface rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border h-full cursor-pointer"
                    variants={cardVariants} whileHover="hover">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" loading="lazy" quality={70} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 bg-background/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-primary border border-primary/20 shadow-sm tracking-tight">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5 font-medium">
                        <Calendar size={12} className="text-primary" />
                        <span>{article.publishedAt}</span>
                        <span className="w-0.5 h-0.5 bg-border rounded-full"></span>
                        <Clock size={12} className="text-primary" />
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-extrabold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted mb-2 line-clamp-2 font-medium">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full tracking-tight">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-primary/20">
                            <Image src={profileImage} alt={article.author.name} fill className="object-cover" loading="lazy" />
                          </div>
                          <span className="text-xs font-bold text-foreground truncate max-w-[80px] tracking-tight">{article.author.name}</span>
                        </div>
                        <div className="inline-flex items-center gap-0.5 text-primary font-bold text-xs group/link tracking-tight">
                          <span>{t('featured.readMore', 'blog')}</span>
                          <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted font-semibold text-lg">{t('noResults', 'blog')}</p>
            <p className="text-sm text-muted/60 mt-2 font-medium">{t('tryAdjusting', 'blog')}</p>
          </div>
        )}

        {totalPages > 1 && (
          <motion.div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap px-2 mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all bg-surface text-muted font-bold">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1 sm:gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <motion.button key={i} onClick={() => handlePageSelect(i + 1)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold text-sm transition-all tracking-tight ${
                    currentPage === i + 1
                      ? 'bg-primary text-background shadow-lg'
                      : 'border border-border hover:border-primary hover:text-primary bg-surface text-muted'
                  }`}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {i + 1}
                </motion.button>
              ))}
            </div>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all bg-surface text-muted font-bold">
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}

        <motion.div className="max-w-lg mx-auto mt-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="relative rounded-3xl p-8 sm:p-10 text-center border border-primary/10"
            style={{ background: 'linear-gradient(145deg, rgba(15,21,33,0.8) 0%, rgba(22,29,43,0.6) 100%)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5"
                style={{ boxShadow: '0 0 20px -5px rgba(212,175,55,0.2)' }}>
                <Mail size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-2">{t('newsletter.title', 'blog')}</h3>
              <p className="text-sm text-muted/70 mb-6">{t('newsletter.subtitle', 'blog')}</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t('newsletter.emailPlaceholder', 'blog')}
                  className="flex-1 px-5 py-3.5 bg-background rounded-xl border border-border text-sm text-foreground placeholder-muted/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <button type="submit" disabled={isSubscribing}
                  className="btn-gold px-6 py-3.5 text-sm font-semibold disabled:opacity-60">
                  {isSubscribing ? <Loader2 size={16} className="animate-spin" /> : t('newsletter.button', 'blog')}
                </button>
              </form>
              <p className="text-xs text-muted/50 mt-4">{t('newsletter.footer', 'blog')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}