'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-400',
  };

  const button = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight size={20} />
    </motion.button>
  );

  if (href) {
    return (
      <a href={href}>
        {button}
      </a>
    );
  }

  return button;
}