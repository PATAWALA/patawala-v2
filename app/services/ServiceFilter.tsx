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

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${isActive
                    ? 'bg-primary text-background font-bold'
                    : 'bg-surface text-muted hover:text-foreground'
                  }`}
                style={isActive ? { boxShadow: '0 0 15px -3px rgba(212,175,55,0.3)' } : { boxShadow: '0 4px 10px -5px rgba(0,0,0,0.3)' }}
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
        <div className="inline-flex bg-surface rounded-2xl p-1.5"
          style={{ boxShadow: '0 8px 25px -10px rgba(0,0,0,0.4)' }}>
          {filterCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
                  ${isActive
                    ? 'bg-primary text-background font-bold'
                    : 'text-muted hover:text-foreground hover:bg-surface-elevated'
                  }`}
                style={isActive ? { boxShadow: '0 0 15px -3px rgba(212,175,55,0.25)' } : {}}
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
        className="text-center text-muted mt-6 max-w-2xl mx-auto animate-fadeIn text-sm"
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