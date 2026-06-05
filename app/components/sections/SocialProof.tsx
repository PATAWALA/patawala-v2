'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Star, Quote, Building2, Users, ChevronLeft, ChevronRight, ArrowRight, MapPin, Award } from 'lucide-react';
import { useTranslation } from '@/app/hooks/useTranslation';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  content: string;
  country: string;
  rating?: number;
  initials: string;
  gradient: string;
  flag?: string;
}

interface ProjectType {
  icon: any;
  title: string;
  description: string;
  cta: string;
}

const DEFAULT_TESTIMONIALS_FR = [
  { name: "Jean Kouassi", content: "Abdoulaye a su comprendre rapidement nos besoins et nous a proposé une solution technique parfaitement adaptée à notre startup. Son accompagnement a été crucial dans notre développement.", country: "Côte d'Ivoire" },
  { name: "Marie Dubois", content: "Un vrai partenaire technique ! Il ne se contente pas de développer, il apporte des idées et des conseils qui font la différence. Je recommande vivement.", country: "France" },
  { name: "César Dossou", content: "Service irréprochable, résultat livré. Je recommande.", country: "Congo" },
  { name: "Maurice Acoumba", content: "Un vrai partenaire à l'écoute. Satisfait du travail accompli.", country: "Cameroun" },
  { name: "Jean Edikou", content: "Site soigné, équipe à l'écoute. Une belle collaboration.", country: "Bénin" },
  { name: "Chimène Koumai", content: "Rapide, professionnel, à l'écoute. Merci pour tout.", country: "Togo" },
  { name: "Gérard Agatou'n", content: "Une confiance aveugle. Un travail agréable et efficace.", country: "Sénégal" },
  { name: "Camille Benerd", content: "Un site qui me ressemble enfin. Merci pour ta patience et ton attention.", country: "Belgique" }
];

const SocialProof = memo(function SocialProof() {
  const { t, language, isLoading } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isReady, setIsReady] = useState(false);

  const flags: {[key: string]: string} = {
    "Côte d'Ivoire": '🇨🇮', 'France': '🇫🇷', 'Congo': '🇨🇬', 'Cameroun': '🇨🇲',
    'Bénin': '🇧🇯', 'Togo': '🇹🇬', 'Sénégal': '🇸🇳', 'Belgique': '🇧🇪',
  };

  const gradients = [
    'from-primary to-amber-500',
    'from-secondary to-cyan-400',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-primary to-amber-400',
    'from-violet-500 to-purple-500',
    'from-secondary to-blue-400',
    'from-rose-500 to-pink-500',
  ];

  useEffect(() => { if (!isLoading) setIsReady(true); }, [isLoading]);

  useEffect(() => {
    if (!isReady) return;
    try {
      const data = t('testimonials', 'testimonials');
      const arr = Array.isArray(data) && data.length > 0 ? data : DEFAULT_TESTIMONIALS_FR;
      setTestimonials(arr.map((t: any, i: number) => {
        const parts = (t.name || '').split(' ');
        const initials = parts.length > 1 ? (parts[0][0] + parts[parts.length-1][0]).toUpperCase() : (t.name || '').substring(0, 2).toUpperCase();
        return { ...t, rating: 5, initials, gradient: gradients[i % gradients.length], flag: flags[t.country] || '🌍' };
      }));
    } catch {
      setTestimonials(DEFAULT_TESTIMONIALS_FR.map((t, i) => ({
        ...t, rating: 5, initials: t.name.split(' ').map(p => p[0]).join('').substring(0,2).toUpperCase(),
        gradient: gradients[i % gradients.length], flag: flags[t.country] || '🌍'
      })));
    }
  }, [t, isReady]);

  const projectTypes: ProjectType[] = [
    { icon: Building2, title: t('projectTypes.startup.title', 'testimonials') || 'Startups & Scale-ups', description: t('projectTypes.startup.description', 'testimonials') || 'Développement de MVPs et solutions évolutives', cta: t('projectTypes.startup.cta', 'testimonials') || 'Discuter de startup' },
    { icon: Users, title: t('projectTypes.sme.title', 'testimonials') || 'PME & Grands Comptes', description: t('projectTypes.sme.description', 'testimonials') || 'Accompagnement sur mesure pour votre transformation digitale', cta: t('projectTypes.sme.cta', 'testimonials') || 'Discuter de mon projet' }
  ];

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!scrollRef.current || testimonials.length === 0 || !isReady) return;
    let rafId: number;
    const speed = 0.5;
    const scroll = () => {
      if (!scrollRef.current) { rafId = requestAnimationFrame(scroll); return; }
      const { current } = scrollRef;
      const maxScroll = current.scrollWidth - current.clientWidth;
      if (maxScroll <= 0) { rafId = requestAnimationFrame(scroll); return; }
      let newScroll = current.scrollLeft + speed;
      if (newScroll >= maxScroll) newScroll = 0;
      current.scrollLeft = newScroll;
      setShowLeftArrow(newScroll > 20);
      setShowRightArrow(newScroll + current.clientWidth < current.scrollWidth - 20);
      rafId = requestAnimationFrame(scroll);
    };
    rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, [testimonials.length, isReady]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -384 : 384, behavior: 'smooth' });
    setTimeout(() => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        setShowLeftArrow(current.scrollLeft > 20);
        setShowRightArrow(current.scrollLeft + current.clientWidth < current.scrollWidth - 20);
      }
    }, 300);
  }, []);

  if (isLoading || !isReady || testimonials.length === 0) {
    return (
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" /></div>
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <div className="w-40 h-10 bg-surface rounded-full mx-auto animate-pulse" />
            <div className="w-56 h-10 bg-surface rounded-lg mx-auto animate-pulse" />
            <div className="w-72 h-6 bg-surface rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="flex gap-4 justify-center mb-16">
            {[1,2,3].map(i => (
              <div key={i} className="min-w-[300px] bg-surface rounded-2xl p-6 space-y-3">
                <div className="w-8 h-8 bg-border rounded-full animate-pulse" />
                <div className="w-full h-16 bg-border rounded-lg animate-pulse" />
                <div className="flex gap-3 pt-3 border-t border-border"><div className="w-10 h-10 bg-border rounded-full animate-pulse" /><div className="flex-1 space-y-2"><div className="w-24 h-4 bg-border rounded animate-pulse" /><div className="w-16 h-3 bg-border rounded animate-pulse" /></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="temoignages" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Fond subtil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Badge section - AVEC OMBRE */}
        <motion.div className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)',
              border: '1px solid rgba(212,175,55,0.22)',
              color: '#D4AF37',
              boxShadow: '0 0 18px -4px rgba(212,175,55,0.18), inset 0 0 8px rgba(212,175,55,0.05)',
            }}>
            <Award size={16} />
            <span className="text-sm font-semibold">{t('badge', 'testimonials')}</span>
          </div>
        </motion.div>

        {/* Titre */}
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 leading-tight">
            {t('title', 'testimonials')}
          </h2>
          <p className="text-gradient-gold text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t('titleHighlight', 'testimonials')}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-amber-400 rounded-full mx-auto mb-5" />
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">
            {t('subtitle', 'testimonials')}
          </p>
        </motion.div>

        {/* Carrousel */}
        <div className="relative max-w-7xl mx-auto mb-16">
          <button onClick={() => scroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 bg-surface rounded-full p-3 text-muted hover:text-primary transition-all duration-200"
            style={{ opacity: showLeftArrow ? 1 : 0, pointerEvents: showLeftArrow ? 'auto' : 'none', boxShadow: '0 4px 15px -5px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,42,62,0.4)' }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-surface rounded-full p-3 text-muted hover:text-primary transition-all duration-200"
            style={{ opacity: showRightArrow ? 1 : 0, pointerEvents: showRightArrow ? 'auto' : 'none', boxShadow: '0 4px 15px -5px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,42,62,0.4)' }}>
            <ChevronRight size={20} />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div key={`${testimonial.name}-${index}`}
                className="min-w-[290px] sm:min-w-[340px] md:min-w-[370px] bg-surface rounded-2xl p-6 flex-shrink-0"
                style={{ boxShadow: '0 8px 25px -10px rgba(0,0,0,0.4)' }}
                whileHover={{ y: -4, boxShadow: '0 15px 35px -12px rgba(212,175,55,0.1)' }}>
                
                <Quote size={22} className="text-primary/15 mb-3" />
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted italic mb-4 line-clamp-3 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                  {/* Avatar avec ombre */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
                    style={{ boxShadow: '0 4px 12px -3px rgba(0,0,0,0.4)' }}>
                    {testimonial.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{testimonial.name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted mt-0.5">
                      <MapPin size={10} className="text-primary/60 flex-shrink-0" />
                      <span className="truncate">{testimonial.flag} {testimonial.country}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Types de projets */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-extrabold text-center text-foreground mb-8">
            {t('projectTypes.title', 'testimonials')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projectTypes.map((type) => (
              <motion.div key={type.title}
                className="bg-surface rounded-2xl p-6 sm:p-7"
                style={{ boxShadow: '0 8px 25px -10px rgba(0,0,0,0.4)' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                whileHover={{ y: -3, boxShadow: '0 15px 35px -12px rgba(212,175,55,0.08)' }}>
                <div className="flex items-start gap-4 mb-5">
                  {/* Icône avec ombre */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)',
                      border: '1px solid rgba(212,175,55,0.18)',
                      boxShadow: '0 0 12px -3px rgba(212,175,55,0.12)',
                    }}>
                    <type.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground">{type.title}</h4>
                    <p className="text-sm text-muted mt-1">{type.description}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border/50">
                  <button onClick={scrollToContact} className="w-full flex items-center justify-between text-primary font-semibold text-sm hover:text-amber-400 transition-colors group">
                    {type.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </section>
  );
});

SocialProof.displayName = 'SocialProof';
export default SocialProof;