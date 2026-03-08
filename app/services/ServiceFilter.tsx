'use client';

import { memo } from 'react';
import { filterCategories, CategoryType } from './data/servicesData';

interface ServiceFilterProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const ServiceFilter = memo(function ServiceFilter({ activeCategory, onCategoryChange }: ServiceFilterProps) {
  return (
    <div className="mb-12">
      {/* Version mobile - scroll horizontal */}
      <div className="lg:hidden overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-2 min-w-max px-1">
          {filterCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            const getGradientColor = () => {
              if (category.id === 'web') return 'from-violet-500 to-purple-500';
              return category.color;
            };

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]
                  ${isActive
                    ? `bg-gradient-to-r ${getGradientColor()} text-white shadow-lg`
                    : 'bg-[#141B2B] text-gray-400 border border-[#1F2937] hover:border-gray-600 hover:text-white'
                  }`}
                aria-label={`Filtrer par ${category.label}`}
                aria-pressed={isActive}
              >
                <Icon size={16} aria-hidden="true" />
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

            const getGradientColor = () => {
              if (category.id === 'web') return 'from-violet-500 to-purple-500';
              return category.color;
            };

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]
                  ${isActive
                    ? `bg-gradient-to-r ${getGradientColor()} text-white shadow-lg`
                    : 'text-gray-400 hover:text-white hover:bg-[#1E2638]'
                  }`}
                aria-label={`Filtrer par ${category.label}`}
                aria-pressed={isActive}
              >
                <Icon size={18} aria-hidden="true" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description de la catégorie active */}
      <p
        key={activeCategory}
        className="text-center text-gray-400 mt-6 max-w-2xl mx-auto animate-fadeIn"
        role="status"
        aria-live="polite"
      >
        {filterCategories.find(c => c.id === activeCategory)?.description}
      </p>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fadeIn {
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
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
});

ServiceFilter.displayName = 'ServiceFilter';

export default ServiceFilter;