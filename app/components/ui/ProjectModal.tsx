'use client';

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
  const { t, language, isLoading } = useTranslation();
  const [translatedProject, setTranslatedProject] = useState<TranslatedProject | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Attendre que les traductions soient chargées
  useEffect(() => {
    if (!isLoading) {
      setIsReady(true);
    }
  }, [isLoading]);

  // Charger les données traduites du projet
  useEffect(() => {
    if (project && isReady) {
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
  }, [project, t, language, isReady]);

  // TRADUCTIONS SIMPLES
  const translations = {
    category: t('category', 'project-modal') || 'Catégorie',
    close: t('close', 'project-modal') || 'Fermer',
    sectionsObjective: t('sections.objective', 'project-modal') || 'Objectif',
    sectionsChallenge: t('sections.challenge', 'project-modal') || 'Défi',
    sectionsSolution: t('sections.solution', 'project-modal') || 'Solution',
    sectionsFeatures: t('sections.features', 'project-modal') || 'Fonctionnalités clés',
    buttonsDiscuss: t('buttons.discuss', 'project-modal') || 'Discuter de ce projet',
  };

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

  if (!project || !translatedProject || !isReady) return null;

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:p-6 overflow-y-auto animate-fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <div
        className="bg-[#0A0F1C] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#1F2937] shadow-2xl animate-scaleIn"
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
              sizes="(max-width: 768px) 100vw, 896px"
              quality={85}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <project.icon size={80} className="text-white/20" />
            </div>
          )}

          {/* Badge catégorie */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20">
            {translations.category} : {translatedProject.category}
          </div>

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors border border-white/20 z-10"
            aria-label={translations.close}
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
              <div className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] hover:border-blue-500/30 transition-colors group animate-slideIn" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Target size={18} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      {translations.sectionsObjective}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {translatedProject.objective}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Challenge */}
            {translatedProject.challenge && (
              <div className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] hover:border-amber-500/30 transition-colors group animate-slideIn" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Lightbulb size={18} className="text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      {translations.sectionsChallenge}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {translatedProject.challenge}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Solution */}
            {translatedProject.solution && (
              <div className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] hover:border-green-500/30 transition-colors group animate-slideIn" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <CheckCircle size={18} className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                      {translations.sectionsSolution}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {translatedProject.solution}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Fonctionnalités */}
            {translatedProject.features && translatedProject.features.length > 0 && (
              <div className="bg-[#141B2B] rounded-xl p-5 border border-[#1F2937] animate-slideIn" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-blue-400" />
                  {translations.sectionsFeatures}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {translatedProject.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 bg-[#0A0F1C] p-3 rounded-lg border border-[#1F2937] hover:border-blue-500/20 transition-colors">
                      <CheckCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bouton de contact */}
          <div className="flex justify-center mt-8 pt-6 border-t border-[#1F2937]">
            <button
              onClick={handleContactRedirect}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 sm:px-6 sm:py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] group"
              aria-label={translations.buttonsDiscuss}
            >
              <span>{translations.buttonsDiscuss}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          opacity: 0;
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}