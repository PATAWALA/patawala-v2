'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { projets, Project } from '../../projets/data/projets';
import ProjectModal from '../../components/ui/ProjectModal';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function RealisationsSection() {
  const { t, language } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedProjects, setTranslatedProjects] = useState<any[]>([]);

  // Charger les projets traduits
  useEffect(() => {
    try {
      const projectsData = t('projects', 'projets-data');
      setTranslatedProjects(Array.isArray(projectsData) ? projectsData : projets);
    } catch (error) {
      console.error('Erreur chargement projets traduits:', error);
      setTranslatedProjects(projets);
    }
  }, [t, language]);

  // Mémoïsation de la correspondance projet original ↔ traduit
  const projectMap = useMemo(() => {
    const map = new Map<number, any>();
    translatedProjects.forEach((p: any) => map.set(p.id, p));
    return map;
  }, [translatedProjects]);

  const getTranslatedProject = (original: Project) => projectMap.get(original.id) || original;

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Gestion du clavier pour les cartes (accessibilité)
  const handleCardKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(project);
    }
  };

  // Vérification de validité d'image
  const hasValidImage = (image: any): boolean => {
    if (!image) return false;
    if (typeof image === 'object') return true;
    if (typeof image === 'string') return !image.includes('/images/projects/');
    return false;
  };

  return (
    <>
      <section id="projets" className="py-20 md:py-28 bg-[#0A0F1C] relative overflow-hidden">
        {/* Fond avec dégradé et formes floues - densité augmentée */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          {/* Lignes subtiles */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, 
                rgba(59,130,246,0.08) 0px, 
                rgba(59,130,246,0.08) 1px, 
                transparent 1px, 
                transparent 60px)`
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, 
                rgba(6,182,212,0.08) 0px, 
                rgba(6,182,212,0.08) 1px, 
                transparent 1px, 
                transparent 60px)`
            }}
            aria-hidden="true"
          />

          {/* Cercles flous animés */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-20 left-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl will-change-transform"
            aria-hidden="true"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl will-change-transform"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Badge */}
          <div className="w-full flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                {t('badge', 'realisations')}
              </span>
            </motion.div>
          </div>

          {/* Titre */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              {t('title', 'realisations')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                {t('titleHighlight', 'realisations')}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              {t('subtitle', 'realisations')}
            </motion.p>
          </div>

          {/* Grille des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12 auto-rows-fr">
            {projets.slice(0, 6).map((projet, index) => {
              const Icon = projet.icon;
              const showImage = hasValidImage(projet.image);
              const translated = getTranslatedProject(projet);

              return (
                <motion.div
                  key={projet.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openModal(projet)}
                  onKeyDown={(e) => handleCardKeyDown(e, projet)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Voir les détails du projet ${translated.title}`}
                  className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] flex flex-col h-full"
                >
                  {/* Image ou placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden flex-shrink-0">
                    {showImage ? (
                      <Image
                        src={projet.image}
                        alt={translated.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-[#1F2937]">
                            <Icon size={32} className="text-blue-400" />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Badge catégorie */}
                    <div className="absolute top-3 left-3 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/20 z-10">
                      {translated.category}
                    </div>
                  </div>

                  {/* Contenu - flex column pour pousser le bouton vers le bas */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {translated.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                      {translated.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {translated.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {translated.tags && translated.tags.length > 3 && (
                        <span className="px-2.5 py-1 bg-[#0A0F1C] text-gray-400 text-xs font-medium rounded-full border border-[#1F2937]">
                          {t('card.tags.more', 'projets-page')
                            ?.replace('{{count}}', String(translated.tags.length - 3)) ||
                            `+${translated.tags.length - 3}`}
                        </span>
                      )}
                    </div>

                    {/* Bouton En savoir plus - centré en bas */}
                    <div className="flex justify-center w-full mt-auto pt-4">
                      <span className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:text-blue-300 transition-colors">
                        <span>{t('card.learnMore', 'realisations')}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bouton Voir tous les projets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <a
              href="/projets"
              className="inline-block"
              aria-label={t('buttons.viewAll', 'realisations')}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 mx-auto"
              >
                <span>{t('buttons.viewAll', 'realisations')}</span>
                <ArrowRight size={20} />
              </motion.button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <div className="flex flex-wrap justify-center gap-6 px-0 py-0 sm:px-8 sm:py-5 sm:bg-[#141B2B] sm:rounded-2xl sm:border sm:border-[#1F2937] sm:shadow-md">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-400">11+</span>
                <span className="text-xs text-gray-400 sm:text-gray-300">
                  {t('stats.projects', 'realisations')}
                </span>
              </div>
              <div className="w-px h-8 bg-gray-700 hidden sm:block" aria-hidden="true" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-400">4.9</span>
                <span className="text-xs text-gray-400 sm:text-gray-300">
                  {t('stats.rating', 'realisations')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal de projet */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}