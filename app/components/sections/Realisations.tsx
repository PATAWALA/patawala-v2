'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { projets, Project } from '../../projets/data/projets';
import ProjectModal from '../../components/ui/ProjectModal';
import { useLanguage } from '@/app/context/LanguageContext';

// Points lumineux fixes (déterministes) pour éviter les différences serveur/client
const LIGHT_POINTS = [
  { left: '15%', top: '20%' },
  { left: '75%', top: '60%' },
  { left: '45%', top: '80%' },
  { left: '85%', top: '30%' },
];

export default function RealisationsSection() {
  const { t, language } = useLanguage();
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
      setTranslatedProjects(Array.isArray(projectsData) ? projectsData : projets);
    } catch (error) {
      console.error('Erreur chargement projets traduits:', error);
      setTranslatedProjects(projets);
    }
  }, [t, language, isMounted]);

  // Mémoïsation de la correspondance projet original ↔ traduit
  const projectMap = useMemo(() => {
    const map = new Map<number, any>();
    translatedProjects.forEach((p: any) => map.set(p.id, p));
    return map;
  }, [translatedProjects]);

  const getTranslatedProject = useCallback((original: Project) => 
    projectMap.get(original.id) || original, [projectMap]);

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

  return (
    <>
      <section id="projets" className="py-20 md:py-28 bg-[#0A0F1C] relative overflow-hidden">
        {/* FOND AMÉLIORÉ - DOUBLE COUCHE VISIBLE COMME DANS HERO/ABOUT */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
          {/* Lignes horizontales bleues */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0px, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />
          {/* Lignes verticales cyan */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.08) 0px, rgba(6,182,212,0.08) 1px, transparent 1px, transparent 60px)`
            }}
            aria-hidden="true"
          />

          {/* Cercles flous */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />

          {/* Points lumineux fixes */}
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
          {/* Badge */}
          <div className="w-full flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-bold text-blue-400 tracking-tight">
                {t('badge', 'realisations')}
              </span>
            </div>
          </div>

          {/* Titre */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              <span>
                {t('title', 'realisations')}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2 font-black tracking-tight">
                {t('titleHighlight', 'realisations')}
              </span>
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto font-medium">
              {t('subtitle', 'realisations')}
            </p>
          </div>

          {/* Grille des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12 auto-rows-fr">
            {projets.slice(0, 6).map((projet) => {
              const Icon = projet.icon;
              const showImage = hasValidImage(projet.image);
              const translated = getTranslatedProject(projet);

              return (
                <div
                  key={projet.id}
                  onClick={() => openModal(projet)}
                  onKeyDown={(e) => handleCardKeyDown(e, projet)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Voir les détails du projet ${translated.title}`}
                  className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 border border-[#1F2937] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0F1C] flex flex-col h-full"
                >
                  {/* Image ou placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden flex-shrink-0">
                    {showImage ? (
                      <Image
                        src={projet.image}
                        alt={translated.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        quality={70}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-[#1F2937]">
                            <Icon size={32} className="text-blue-400" />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Badge catégorie */}
                    <div className="absolute top-3 left-3 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-400 border border-blue-500/20 z-10 tracking-tight">
                      <span>
                        {translated.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-extrabold text-white mb-2 tracking-tight">
                      <span>
                        {translated.title}
                      </span>
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1 font-medium">
                      <span>
                        {translated.description}
                      </span>
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {translated.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full tracking-tight"
                        >
                          {tag}
                        </span>
                      ))}
                      {translated.tags && translated.tags.length > 3 && (
                        <span className="px-2.5 py-1 bg-[#0A0F1C] text-gray-300 text-xs font-medium rounded-full border border-[#1F2937]">
                          +{translated.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Bouton En savoir plus */}
                    <div className="flex justify-center w-full mt-auto pt-4">
                      <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm tracking-tight">
                        <span>
                          {t('card.learnMore', 'realisations')}
                        </span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bouton Voir tous les projets */}
          <div className="text-center">
            <a
              href="/projets"
              className="inline-block"
              aria-label={t('buttons.viewAll', 'realisations')}
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-extrabold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl mx-auto tracking-tight">
                <span>
                  {t('buttons.viewAll', 'realisations')}
                </span>
                <ArrowRight size={20} />
              </div>
            </a>
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}