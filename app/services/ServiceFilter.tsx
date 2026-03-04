'use client';

import { motion } from 'framer-motion';
import { filterCategories, CategoryType } from './data/servicesData';

interface ServiceFilterProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export default function ServiceFilter({ activeCategory, onCategoryChange }: ServiceFilterProps) {
  return (
    <div className="mb-12">
      {/* Version mobile - scroll horizontal */}
      <div className="lg:hidden overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-2 min-w-max px-1">
          {filterCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            // Déterminer la couleur du dégradé en fonction de la catégorie active
            const getGradientColor = () => {
              if (category.id === 'web') {
                return 'from-violet-500 to-purple-500';
              }
              return category.color;
            };
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${isActive 
                    ? `bg-gradient-to-r ${getGradientColor()} text-white shadow-lg` 
                    : 'bg-[#141B2B] text-gray-400 border border-[#1F2937] hover:border-gray-600 hover:text-white'
                  }`}
              >
                <Icon size={16} />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Version desktop - tabs */}
      <div className="hidden lg:flex justify-center">
        <div className="inline-flex bg-[#141B2B] rounded-2xl p-1.5 shadow-md border border-[#1F2937]">
          {filterCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            // Déterminer la couleur du dégradé en fonction de la catégorie active
            const getGradientColor = () => {
              if (category.id === 'web') {
                return 'from-violet-500 to-purple-500';
              }
              return category.color;
            };
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                  ${isActive 
                    ? `bg-gradient-to-r ${getGradientColor()} text-white shadow-lg` 
                    : 'text-gray-400 hover:text-white hover:bg-[#1E2638]'
                  }`}
              >
                <Icon size={18} />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description de la catégorie active */}
      <motion.p
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-400 mt-6 max-w-2xl mx-auto"
      >
        {filterCategories.find(c => c.id === activeCategory)?.description}
      </motion.p>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}