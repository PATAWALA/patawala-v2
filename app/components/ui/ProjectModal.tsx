'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Target, Lightbulb, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/app/projets/data/projets';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/app/hooks/useTranslation';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Interface pour les données de projet traduites
interface TranslatedProject {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  client: string;
  duration: string;
  objective: string;
  challenge: string;
  solution: string;
  features: string[];
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t, language } = useTranslation();
  const [translatedProject, setTranslatedProject] = useState<TranslatedProject | null>(null);

  // Charger les données traduites du projet
  useEffect(() => {
    if (project) {
      try {
        const projectsData = t('projects', 'projets-data');
        if (Array.isArray(projectsData)) {
          const foundProject = projectsData.find((p: any) => p.id === project.id);
          if (foundProject) {
            setTranslatedProject(foundProject);
          } else {
            setTranslatedProject({
              id: project.id,
              title: project.title,
              description: project.description,
              category: project.category,
              tags: project.tags,
              client: project.client || '',
              duration: project.duree || '',
              objective: project.objectif || '',
              challenge: project.challenge || '',
              solution: project.solution || '',
              features: project.fonctionnalites || []
            });
          }
        }
      } catch (error) {
        console.error('Erreur chargement projet traduit:', error);
        setTranslatedProject({
          id: project.id,
          title: project.title,
          description: project.description,
          category: project.category,
          tags: project.tags,
          client: project.client || '',
          duration: project.duree || '',
          objective: project.objectif || '',
          challenge: project.challenge || '',
          solution: project.solution || '',
          features: project.fonctionnalites || []
        });
      }
    }
  }, [project, t, language]);

  // Bloquer le défilement du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project || !translatedProject) return null;

  // Fonction pour vérifier si l'image est valide
  const hasValidImage = (image: any): boolean => {
    if (!image) return false;
    if (typeof image === 'object') return true;
    if (typeof image === 'string') return !image.includes('/images/projects/');
    return false;
  };

  const showImage = hasValidImage(project.image);

  // Redirection vers la section contact
  const handleContactRedirect = () => {
    onClose(); // Ferme le modal
    // Petit délai pour laisser l'animation de fermeture se terminer
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback : rediriger vers la page d'accueil avec l'ancre
        window.location.href = '/#contact';
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-6 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[#0A0F1C] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#1F2937] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec image ou dégradé */}
            <div className="relative h-48 sm:h-64 md:h-72 bg-gradient-to-r from-blue-600 to-cyan-600 overflow-hidden">
              {showImage ? (
                <Image
                  src={project.image}
                  alt={translatedProject.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 896px" // 896px = largeur max du modal (max-w-4xl)
                  quality={90} // Qualité d'optimisation supérieure
                  priority // Chargement prioritaire car l'image est LCP du modal
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.icon size={80} className="text-white/20" />
                </div>
              )}

              {/* Badge catégorie */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20">
                {t('category', 'project-modal')} : {translatedProject.category}
              </div>

              {/* Bouton fermer */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/20 z-10"
                aria-label={t('close', 'project-modal')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6 sm:p-8">
              {/* Titre et description */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {translatedProject.title}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {translatedProject.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {translatedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium rounded-full border border-blue-500/20 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Grille d'informations */}
              <div className="space-y-6">
                {/* Objectif */}
                {translatedProject.objective && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] hover:border-blue-500/30 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        <Target size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                          {t('sections.objective', 'project-modal')}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {translatedProject.objective}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Challenge */}
                {translatedProject.challenge && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] hover:border-amber-500/30 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <Lightbulb size={18} className="text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                          {t('sections.challenge', 'project-modal')}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {translatedProject.challenge}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Solution */}
                {translatedProject.solution && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] hover:border-green-500/30 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                        <CheckCircle size={18} className="text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                          {t('sections.solution', 'project-modal')}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {translatedProject.solution}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Fonctionnalités */}
                {translatedProject.features && translatedProject.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937]"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-blue-400" />
                      {t('sections.features', 'project-modal')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {translatedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 bg-[#0A0F1C] p-3 rounded-lg border border-[#1F2937] hover:border-blue-500/20 transition-colors">
                          <CheckCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bouton de contact */}
              <div className="flex justify-center mt-8 pt-6 border-t border-[#1F2937]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContactRedirect}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 sm:px-6 sm:py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20"
                  aria-label={t('buttons.discuss', 'project-modal')}
                >
                  <span>{t('buttons.discuss', 'project-modal')}</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}