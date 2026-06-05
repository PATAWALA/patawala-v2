// app/projets/ProjetsPageClient.tsx
'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projets } from '@/app/projets/data/projets';
import ProjectModal from '@/app/components/ui/ProjectModal';
import type { Project } from '@/app/projets/data/projets';
import { useTranslation } from '@/app/hooks/useTranslation';

const ProjetsPageClient = memo(function ProjetsPageClient() {
  const { t, isLoading } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedProjects, setTranslatedProjects] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => { if (!isLoading) setIsReady(true); }, [isLoading]);

  useEffect(() => {
    if (!isReady) return;
    try {
      const projectsData = t('projects', 'projetsData');
      setTranslatedProjects(Array.isArray(projectsData) && projectsData.length > 0 ? projectsData : projets);
    } catch {
      setTranslatedProjects(projets);
    }
  }, [t, isReady]);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  const getTranslatedProject = useCallback((original: Project) =>
    translatedProjects.find((p: any) => p.id === original.id) || original, [translatedProjects]);

  if (isLoading || !isReady) {
    return (
      <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center mb-14 space-y-4">
            <div className="w-36 h-10 bg-surface rounded-full mx-auto animate-pulse" />
            <div className="w-64 h-12 bg-surface rounded-lg mx-auto animate-pulse" />
            <div className="w-96 h-6 bg-surface rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-surface rounded-2xl overflow-hidden">
                <div className="h-48 bg-border animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="w-3/4 h-6 bg-border rounded animate-pulse" />
                  <div className="w-full h-4 bg-border rounded animate-pulse" />
                  <div className="flex gap-2"><div className="w-16 h-6 bg-border rounded-full animate-pulse" /><div className="w-16 h-6 bg-border rounded-full animate-pulse" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* SEO H1 visible uniquement pour les crawlers */}
      <h1 className="sr-only">
        {t('title', 'projetsPage')} {t('titleHighlight', 'projetsPage')} - Patawala
      </h1>

      <main className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden" aria-labelledby="page-title">
        {/* Fond subtil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/[0.02] rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          
          {/* Badge */}
          <motion.div className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary"
              style={{ boxShadow: '0 0 15px -5px rgba(212,175,55,0.12), inset 0 0 6px rgba(212,175,55,0.04)' }}>
              <Sparkles size={16} />
              <span className="text-sm font-semibold">{t('badge', 'projetsPage')}</span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 id="page-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 leading-tight">
              {t('title', 'projetsPage')}
            </h2>
            <p className="text-gradient-gold text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
              {t('titleHighlight', 'projetsPage')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-amber-400 rounded-full mx-auto mb-5" />
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">
              {t('subtitle', 'projetsPage')}
            </p>
          </motion.div>

          {/* Grille */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {projets.map((projet, index) => {
              const showImage = projet.image && typeof projet.image !== 'string';
              const translated = getTranslatedProject(projet);
              const isInProgress = projet.status === 'En cours';
              const hasExternalLink = projet.lien && projet.lien !== '#';

              return (
                <motion.article key={projet.id}
                  onClick={() => openModal(projet)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(projet); } }}
                  role="button" tabIndex={0}
                  aria-label={`Voir les détails du projet ${translated.title}`}
                  className="group bg-surface rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{ boxShadow: '0 8px 25px -10px rgba(0,0,0,0.4)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -15px rgba(212,175,55,0.08)' }}>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0 bg-surface-elevated">
                    {showImage ? (
                      <Image src={projet.image} alt={translated.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw" loading={index < 3 ? 'eager' : 'lazy'} priority={index < 3} quality={70} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {projet.icon && <projet.icon size={40} className="text-primary/25" />}
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary border border-primary/20">
                      {translated.category}
                    </span>
                    {isInProgress && (
                      <span className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ boxShadow: '0 4px 12px -3px rgba(245,158,11,0.4)' }}>
                        {t('progress.inProgress', 'projetsPage') || 'En cours'}
                      </span>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {translated.title}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">{translated.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {translated.tags?.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{tag}</span>
                      ))}
                      {translated.tags?.length > 3 && (
                        <span className="px-2.5 py-1 bg-border/50 text-muted text-xs rounded-full">+{translated.tags.length - 3}</span>
                      )}
                    </div>

                    {/* Bouton */}
                    <div className="mt-auto pt-4 border-t border-border/50 flex justify-center">
                      {hasExternalLink ? (
                        <a href={projet.lien} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-amber-400 transition-colors">
                          {t('card.viewProject', 'projetsPage')}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all cursor-pointer">
                          {t('card.viewProject', 'projetsPage')}
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div className="flex justify-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Link href="/#contact" className="btn-gold inline-flex items-center gap-3 text-base px-8 py-4">
              <MessageSquare size={20} />
              {t('buttons.discuss', 'projetsPage')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <p className="text-center text-xs text-muted mt-8">
            {t('footer.note', 'projetsPage')}
          </p>
        </div>
      </main>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
});

ProjetsPageClient.displayName = 'ProjetsPageClient';
export default ProjetsPageClient;