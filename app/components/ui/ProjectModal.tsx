'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Code, CheckCircle, ArrowRight, Target, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/app/projets/data/projets';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Fonction pour vérifier si l'image est valide
  const hasValidImage = (image: any): boolean => {
    if (!image) return false;
    if (typeof image === 'object') return true;
    if (typeof image === 'string') return !image.includes('/images/projects/');
    return false;
  };

  const showImage = hasValidImage(project.image);

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
            className="bg-[#141B2B] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#1F2937] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec image */}
            <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-600 to-cyan-600">
              {showImage ? (
                <Image
                  src={project.image}
                  alt={project.title}
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
              >
                <X size={20} />
              </button>
              
              {/* Catégorie */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20">
                {project.category}
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-gray-400 mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full border border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Grille d'infos */}
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
  {project.client && (
    <div className="bg-[#1F2937] p-3 rounded-xl">
      <User size={18} className="text-blue-400 mb-1" />
      <div className="text-xs text-gray-400">Client</div>
      <div className="text-sm font-semibold text-white">{project.client}</div>
    </div>
  )}
</div>
              {/* Objectif */}
              {project.objectif && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={20} className="text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Objectif</h3>
                  </div>
                  <p className="text-gray-300 bg-[#1F2937] p-4 rounded-xl">
                    {project.objectif}
                  </p>
                </div>
              )}

              {/* Challenge */}
              {project.challenge && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={20} className="text-amber-400" />
                    <h3 className="text-lg font-semibold text-white">Défi relevé</h3>
                  </div>
                  <p className="text-gray-300 bg-[#1F2937] p-4 rounded-xl border-l-4 border-amber-500">
                    {project.challenge}
                  </p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Solution apportée</h3>
                  </div>
                  <p className="text-gray-300 bg-[#1F2937] p-4 rounded-xl">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Fonctionnalités */}
              {project.fonctionnalites && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Fonctionnalités clés</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.fonctionnalites.map((feature, index) => (
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
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-blue-600 hover:to-cyan-600 transition-colors"
                  >
                    <span>Discuter d'un projet similaire</span>
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}