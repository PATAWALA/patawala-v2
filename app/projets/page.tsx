'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { projets } from '@/app/projets/data/projets';
import ProjectModal from '@/app/components/ui/ProjectModal';
import type { Project } from '@/app/projets/data/projets';
import { useTranslation } from '@/app/hooks/useTranslation';

export default function ProjetsPage() {
  const { t, language } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedProjects, setTranslatedProjects] = useState<any[]>([]);

  // Charger les projets traduits
  useEffect(() => {
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
  }, [t, language]);

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

  // Fonction pour vérifier si l'image est valide
  const hasValidImage = (image: any): boolean => {
    if (!image) return false;
    if (typeof image === 'object') return true;
    if (typeof image === 'string') return !image.includes('/images/projects/');
    return false;
  };

  // Fonction pour trouver le projet traduit correspondant
  const getTranslatedProject = (originalProject: Project) => {
    return translatedProjects.find((p: any) => p.id === originalProject.id) || originalProject;
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#0A0F1C] relative overflow-hidden">
      {/* BEAU FOND - avec dégradé et formes floues */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        {/* Lignes subtiles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, 
            rgba(59,130,246,0.05) 0px, 
            rgba(59,130,246,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, 
            rgba(6,182,212,0.05) 0px, 
            rgba(6,182,212,0.05) 1px, 
            transparent 1px, 
            transparent 60px)`
        }}></div>
        
        {/* Éléments décoratifs flous */}
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-40 -left-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-40 -right-20 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20 backdrop-blur-sm"
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-400">{t('badge', 'projets-page')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
          >
            {t('title', 'projets-page')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('titleHighlight', 'projets-page')}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            {t('subtitle', 'projets-page')}
          </motion.p>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {projets.map((projet, index) => {
            const Icon = projet.icon;
            const showImage = hasValidImage(projet.image);
            const translatedProjet = getTranslatedProject(projet);
            
            return (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937] cursor-pointer"
                onClick={() => openModal(projet)}
              >
                {/* Image ou placeholder avec icône */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
                  {showImage ? (
                    <Image
                      src={projet.image}
                      alt={translatedProjet.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#0A0F1C] rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#1F2937]">
                        <Icon size={40} className="text-blue-400" />
                      </div>
                    </div>
                  )}
                  
                  {/* Badge catégorie */}
                  <div className="absolute top-4 right-4 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/20">
                    {translatedProjet.category}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {translatedProjet.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {translatedProjet.description}
                  </p>

                  {/* Infos client */}
                  {translatedProjet.client && (
                    <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-[#0A0F1C] rounded-full border border-[#1F2937]">
                        {t('card.client', 'projets-page')}: {translatedProjet.client}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
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
      {t('card.tags.more', 'projets-page').replace('{{count}}', String(translatedProjet.tags.length - 3))}
    </span>
  )}
</div>

                  {/* Bouton En savoir plus */}
                  <button 
                    className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm group/link hover:text-blue-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(projet);
                    }}
                  >
                    <span>{t('card.learnMore', 'projets-page')}</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOUTON UNIQUE - LANCER MON PROJET */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center max-w-2xl mx-auto"
        >
          <Link href="/#contact" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 mx-auto"
            >
              <MessageSquare size={20} />
              <span>{t('buttons.discuss', 'projets-page')}</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Note de bas de page */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-500 mt-8"
        >
          {t('footer.note', 'projets-page')}
        </motion.p>
      </div>

      {/* Modal des détails du projet */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}