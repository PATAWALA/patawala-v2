'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Code, CheckCircle, ArrowRight, Target, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/app/projets/data/projets';
import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [translatedProject, setTranslatedProject] = useState<TranslatedProject | null>(null);

  // Charger les données traduites du projet
  useEffect(() => {
    if (project) {
      try {
        // Récupérer tous les projets depuis les traductions
        const projectsData = t('projects', 'projets-data');
        
        if (Array.isArray(projectsData)) {
          // Trouver le projet correspondant par ID
          const foundProject = projectsData.find((p: any) => p.id === project.id);
          if (foundProject) {
            setTranslatedProject(foundProject);
          } else {
            // Fallback vers les données originales si non trouvé
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
        // Fallback vers les données originales
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

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <>
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
              className="bg-[#141B2B] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#1F2937] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header avec image */}
              <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-600 to-cyan-600">
                {showImage ? (
                  <Image
                    src={project.image}
                    alt={translatedProject.title} // ← CORRIGÉ : plus de t() ici
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon size={64} className="text-white/30" />
                  </div>
                )}
                
                {/* Bouton fermer */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/20"
                  aria-label={t('close', 'project-modal')}
                >
                  <X size={20} />
                </button>
                
                {/* Catégorie */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20">
                  {t('category', 'project-modal')} : {translatedProject.category}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {translatedProject.title}
                </h2>
                <p className="text-gray-400 mb-6">
                  {translatedProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {translatedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Objectif */}
                {translatedProject.objective && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={20} className="text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">{t('sections.objective', 'project-modal')}</h3>
                    </div>
                    <p className="text-gray-300 bg-[#1F2937] p-4 rounded-xl">
                      {translatedProject.objective}
                    </p>
                  </div>
                )}

                {/* Challenge */}
                {translatedProject.challenge && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={20} className="text-amber-400" />
                      <h3 className="text-lg font-semibold text-white">{t('sections.challenge', 'project-modal')}</h3>
                    </div>
                    <p className="text-gray-300 bg-[#1F2937] p-4 rounded-xl border-l-4 border-amber-500">
                      {translatedProject.challenge}
                    </p>
                  </div>
                )}

                {/* Solution */}
                {translatedProject.solution && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle size={20} className="text-green-400" />
                      <h3 className="text-lg font-semibold text-white">{t('sections.solution', 'project-modal')}</h3>
                    </div>
                    <p className="text-gray-300 bg-[#1F2937] p-4 rounded-xl">
                      {translatedProject.solution}
                    </p>
                  </div>
                )}

                {/* Fonctionnalités */}
                {translatedProject.features && translatedProject.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-3">{t('sections.features', 'project-modal')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {translatedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 bg-[#1F2937] p-3 rounded-xl">
                          <CheckCircle size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bouton de contact */}
                <div className="flex justify-center mt-8 pt-4 border-t border-[#1F2937]">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenBooking}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors cursor-pointer"
                    aria-label={t('buttons.discuss', 'project-modal')}
                  >
                    <span>{t('buttons.discuss', 'project-modal')}</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de réservation */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
      />
    </>
  );
}