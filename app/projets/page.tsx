'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { projets } from '@/app/projets/data/projets';
import ProjectModal from '@/app/components/ui/ProjectModal';
import type { Project } from '@/app/projets/data/projets';
import { useTranslation } from '@/app/hooks/useTranslation';

const ProjetsPage = memo(function ProjetsPage() {
  const { t, language } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedProjects, setTranslatedProjects] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Charger les projets traduits
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const projectsData = t('projects', 'projets-data');
      if (Array.isArray(projectsData)) {
        setTranslatedProjects(projectsData);
      } else {
        setTranslatedProjects(projets);
      }
    } catch (error) {
      console.error('Erreur chargement projets traduits:', error);
      setTranslatedProjects(projets);
    }
  }, [t, language, isMounted]);

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

  // Gestion du clavier pour les cartes
  const handleCardKeyDown = useCallback((e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(project);
    }
  }, [openModal]);

  // Fonction pour vérifier si l'image est valide - SIMPLIFIÉE
  const hasValidImage = useCallback((image: any): boolean => {
    return !!image && typeof image !== 'string';
  }, []);

  // Fonction pour trouver le projet traduit correspondant - MÉMOÏSÉE
  const getTranslatedProject = useCallback((originalProject: Project) => {
    return translatedProjects.find((p: any) => p.id === originalProject.id) || originalProject;
  }, [translatedProjects]);

  // Points lumineux statiques - RÉDUITS À 2 SEULEMENT
  const lightPoints = useRef(
    [...Array(2)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }))
  ).current;

  return (
    <main
      className="min-h-screen pt-24 pb-20 bg-[#0A0F1C] relative overflow-hidden"
      aria-labelledby="page-title"
    >
      {/* FOND ULTRA-OPTIMISÉ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles - UNE SEULE COUCHE, OPACITÉ RÉDUITE */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />

        {/* Cercles flous - 2 SEULEMENT (au lieu de 3) */}
        <div className="absolute top-40 -left-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 -right-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

        {/* Points lumineux - 2 SEULEMENT */}
        {lightPoints.map((point, i) => (
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm">
            <Sparkles size={16} className="text-blue-400" aria-hidden="true" />
            <span className="text-sm font-medium text-blue-400">{t('badge', 'projets-page')}</span>
          </div>

          <h1
            id="page-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          >
            {t('title', 'projets-page')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('titleHighlight', 'projets-page')}
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('subtitle', 'projets-page')}
          </p>
        </div>

        {/* Grille des projets - OPTIMISÉE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16 auto-rows-fr">
          {projets.map((projet, index) => {
            const Icon = projet.icon;
            const showImage = hasValidImage(projet.image);
            const translatedProjet = getTranslatedProject(projet);

            return (
              <div
                key={projet.id}
                onClick={() => openModal(projet)}
                onKeyDown={(e) => handleCardKeyDown(e, projet)}
                role="button"
                tabIndex={0}
                className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] flex flex-col h-full hover:-translate-y-1"
                aria-label={`Voir les détails du projet ${translatedProjet.title}`}
              >
                {/* Image ou placeholder avec icône - OPTIMISÉ */}
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
                      quality={70} // Réduit de 75 à 70
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#0A0F1C] rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#1F2937]">
                        <Icon size={40} className="text-blue-400" aria-hidden="true" />
                      </div>
                    </div>
                  )}

                  {/* Badge catégorie */}
                  <div className="absolute top-4 right-4 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/20">
                    {translatedProjet.category}
                  </div>
                </div>

                {/* Contenu - OPTIMISÉ */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                    {translatedProjet.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                    {translatedProjet.description}
                  </p>

                  {/* Tags - OPTIMISÉS */}
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
                          {t('card.tags.more', 'projets-page')?.replace('{{count}}', String(translatedProjet.tags.length - 3)) || `+${translatedProjet.tags.length - 3}`}
                        </span>
                      )}
                  </div>

                  {/* Bouton En savoir plus - OPTIMISÉ */}
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
                      aria-label={`En savoir plus sur ${translatedProjet.title}`}
                    >
                      <span>{t('card.learnMore', 'projets-page')}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOUTON UNIQUE - LANCER MON PROJET */}
        <div className="flex justify-center items-center max-w-2xl mx-auto">
          <Link href="/#contact" className="w-full sm:w-auto" passHref>
            <button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 mx-auto focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] active:scale-[0.98]"
              aria-label={t('buttons.discuss', 'projets-page')}
            >
              <MessageSquare size={20} aria-hidden="true" />
              <span>{t('buttons.discuss', 'projets-page')}</span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </Link>
        </div>

        {/* Note de bas de page */}
        <p className="text-center text-xs text-gray-500 mt-8">
          {t('footer.note', 'projets-page')}
        </p>
      </div>

      {/* Modal des détails du projet */}
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