'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projets } from '@/app/projets/data/projets';
import ProjectModal from '@/app/components/ui/ProjectModal';
import type { Project } from '@/app/projets/data/projets';
import { useTranslation } from '@/app/hooks/useTranslation';

const LIGHT_POINTS = [
  { left: '15%', top: '20%' },
  { left: '75%', top: '60%' },
  { left: '45%', top: '80%' },
  { left: '85%', top: '30%' },
];

const ProjetsPage = memo(function ProjetsPage() {
  const { t, language, isLoading } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedProjects, setTranslatedProjects] = useState<any[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) setIsReady(true);
  }, [isLoading]);

  useEffect(() => {
    if (!isReady) return;
    try {
      const projectsData = t('projects', 'projetsData');
      if (Array.isArray(projectsData) && projectsData.length > 0) {
        setTranslatedProjects(projectsData);
      } else {
        setTranslatedProjects(projets);
      }
    } catch {
      setTranslatedProjects(projets);
    }
  }, [t, language, isReady]);

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

  const handleCardKeyDown = useCallback((e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(project);
    }
  }, [openModal]);

  const hasValidImage = useCallback((image: any): boolean => {
    return !!image && typeof image !== 'string';
  }, []);

  const getTranslatedProject = useCallback((originalProject: Project) => {
    return translatedProjects.find((p: any) => p.id === originalProject.id) || originalProject;
  }, [translatedProjects]);

  // Variants Framer Motion
  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: '0 20px 25px -5px rgba(59,130,246,0.2), 0 10px 10px -5px rgba(6,182,212,0.1)' }
  };

  // SKELETON LOADER (inchangé)
  if (isLoading || !isReady) {
    return (
      <main className="min-h-screen pt-24 pb-20 bg-[#0A0F1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          <div className="absolute top-40 -left-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 -right-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="w-32 h-8 bg-gray-800/50 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="w-64 h-10 bg-gray-800/50 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-gray-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#141B2B]/50 rounded-2xl overflow-hidden border border-gray-800/50">
                <div className="h-48 bg-gray-800/50 animate-pulse" />
                <div className="p-6">
                  <div className="w-3/4 h-6 bg-gray-800/50 rounded mb-3 animate-pulse" />
                  <div className="w-full h-4 bg-gray-800/50 rounded mb-2 animate-pulse" />
                  <div className="w-2/3 h-4 bg-gray-800/50 rounded mb-4 animate-pulse" />
                  <div className="flex gap-2 mb-4">
                    <div className="w-16 h-6 bg-gray-800/50 rounded-full animate-pulse" />
                    <div className="w-16 h-6 bg-gray-800/50 rounded-full animate-pulse" />
                  </div>
                  <div className="w-24 h-4 bg-gray-800/50 rounded mx-auto animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-12 bg-gray-800/50 rounded-xl animate-pulse" />
          </div>
          <div className="w-64 h-4 bg-gray-800/50 rounded mx-auto mt-8 animate-pulse" />
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen pt-24 pb-20 bg-[#0A0F1C] relative overflow-hidden"
      aria-labelledby="page-title"
    >
      {/* FOND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute top-40 -left-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute bottom-40 -right-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          aria-hidden="true"
        />
        {LIGHT_POINTS.map((point, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/10 rounded-full"
            style={{ left: point.left, top: point.top }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* En-tête */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">{t('badge', 'projetsPage')}</span>
            </div>
          </motion.div>

          <motion.h1
            id="page-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            variants={fadeInUp}
          >
            {t('title', 'projetsPage')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('titleHighlight', 'projetsPage')}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {t('subtitle', 'projetsPage')}
          </motion.p>
        </motion.div>

        {/* Grille des projets */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16 auto-rows-fr"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {projets.map((projet, index) => {
            const Icon = projet.icon;
            const showImage = hasValidImage(projet.image);
            const translatedProjet = getTranslatedProject(projet);
            const isInProgress = !showImage;

            return (
              <motion.div
                key={projet.id}
                onClick={() => openModal(projet)}
                onKeyDown={(e) => handleCardKeyDown(e, projet)}
                role="button"
                tabIndex={0}
                className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-[#1F2937] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] flex flex-col h-full"
                variants={cardVariants}
                whileHover="hover"
                aria-label={`Voir les détails du projet ${translatedProjet.title}`}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden flex-shrink-0">
                  {showImage ? (
                    <Image
                      src={projet.image}
                      alt={translatedProjet.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                      quality={70}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#0A0F1C] rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#1F2937]">
                        <Icon size={40} className="text-blue-400" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/20">
                    {translatedProjet.category}
                  </div>
                  {isInProgress && (
                    <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-amber-400/30 shadow-lg">
                      {t('progress.inProgress', 'projetsPage') || 'En cours'}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                    {translatedProjet.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {translatedProjet.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {translatedProjet.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {translatedProjet.tags.length > 3 && (
                      <span className="px-2.5 py-1 bg-[#0A0F1C] text-gray-400 text-xs font-medium rounded-full border border-[#1F2937]">
                        {t('card.tags.more', 'projetsPage')?.replace('{{count}}', String(translatedProjet.tags.length - 3)) || `+${translatedProjet.tags.length - 3}`}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-center w-full mt-auto pt-4">
                    <span
                      className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:text-blue-300 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(projet);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation();
                          openModal(projet);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <span>{t('card.learnMore', 'projetsPage')}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOUTON CTA */}
        <motion.div
          className="flex justify-center items-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/#contact" className="w-full sm:w-auto" passHref>
            <motion.button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 mx-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare size={20} />
              <span>{t('buttons.discuss', 'projetsPage')}</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        <p className="text-center text-xs text-gray-500 mt-8">
          {t('footer.note', 'projetsPage')}
        </p>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
});

ProjetsPage.displayName = 'ProjetsPage';
export default ProjetsPage;