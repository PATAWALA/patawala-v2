'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { projets, Project } from '../../projets/data/projets';
import ProjectModal from '../../components/ui/ProjectModal';

export default function RealisationsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Si c'est un objet (import statique), c'est valide
    if (typeof image === 'object') return true;
    // Si c'est une string, vérifie que ce n'est pas un chemin par défaut
    if (typeof image === 'string') return !image.includes('/images/projects/');
    return false;
  };

  return (
    <>
      <section id="projets" className="py-20 md:py-28 bg-[#0A0F1C] relative overflow-hidden">
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
            className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Badge */}
          <div className="w-full flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                Portfolio
              </span>
            </motion.div>
          </div>

          {/* Titre */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Quelques projets
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mt-2">
                que j'ai accompagnés
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Une sélection de sites et applications conçus pour répondre à des besoins spécifiques.
            </motion.p>
          </div>

          {/* Grille des projets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {projets.slice(0, 6).map((projet, index) => {
              const Icon = projet.icon;
              const showImage = hasValidImage(projet.image);
              
              return (
                <motion.div
                  key={projet.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-[#141B2B] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-[#1F2937]"
                >
                  {/* Image ou placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
                    {showImage ? (
                      <Image 
                        src={projet.image} 
                        alt={projet.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:scale-110 transition-transform duration-500"></div>
                        {/* Icône du projet */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-[#141B2B]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border border-[#1F2937]">
                            <Icon size={32} className="text-blue-400" />
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Badge catégorie (toujours affiché) */}
                    <div className="absolute top-3 left-3 bg-[#141B2B]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/20 z-10">
                      {projet.category}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {projet.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {projet.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {projet.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bouton En savoir plus */}
                    <button
                      onClick={() => openModal(projet)}
                      className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm group/btn hover:text-blue-300 transition-colors"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bouton Voir tous les projets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Link href="/projets">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 mx-auto"
              >
                <span>Voir tous les projets</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-16"
          >
            <div className="flex flex-wrap justify-center gap-6 px-0 py-0 sm:px-8 sm:py-5 sm:bg-[#141B2B] sm:rounded-2xl sm:border sm:border-[#1F2937] sm:shadow-md">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-400">11+</span>
                <span className="text-xs text-gray-400 sm:text-gray-300">Projets livrés</span>
              </div>
              <div className="w-px h-8 bg-gray-700 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-400">4.9</span>
                <span className="text-xs text-gray-400 sm:text-gray-300">Note moyenne</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}