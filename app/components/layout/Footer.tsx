// app/components/layout/Footer.tsx
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart, Zap, Globe } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background text-white overflow-hidden" aria-label="Pied de page">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Marque */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold italic text-gradient-gold">Abdoulaye Patawala</h2>
              <p className="text-sm text-muted">Développeur Full-Stack</p>
            </div>
            <p className="text-muted leading-relaxed">
              Développeur full-stack spécialisé dans la création d&apos;applications web performantes et d&apos;expériences utilisateur mémorables.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                <Zap size={14} />Disponible
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm border border-secondary/20">
                <Heart size={14} />Open Source
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-400/10 text-amber-400 rounded-full text-sm border border-amber-400/20">
                <Globe size={14} />Remote
              </span>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-foreground">Liens rapides</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/projets" className="text-muted hover:text-primary transition-colors">Réalisations</Link></li>
              <li><Link href="/services" className="text-muted hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div className="md:col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-foreground">Légal</h3>
            <ul className="space-y-3">
              <li><Link href="/mentions-legales" className="text-muted hover:text-primary transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="text-muted hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link href="/cgu" className="text-muted hover:text-primary transition-colors">CGU</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <h3 className="text-lg font-semibold mb-6 text-foreground">Contact</h3>
            
            <a href={`mailto:${SOCIAL_LINKS.email}`} 
              className="inline-flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="p-2 bg-primary/20 rounded-lg"><Mail size={20} className="text-primary" /></div>
              <span className="text-foreground/80 hover:text-foreground transition-colors break-all text-sm">{SOCIAL_LINKS.email}</span>
            </a>

            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-surface rounded-xl hover:scale-110 transition-all duration-300 border border-border hover:bg-gray-700"
                aria-label="GitHub"><Github size={20} className="text-muted hover:text-foreground" /></a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-surface rounded-xl hover:scale-110 transition-all duration-300 border border-border hover:bg-blue-600"
                aria-label="LinkedIn"><Linkedin size={20} className="text-muted hover:text-foreground" /></a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-surface rounded-xl hover:scale-110 transition-all duration-300 border border-border hover:bg-sky-500"
                aria-label="Twitter"><Twitter size={20} className="text-muted hover:text-foreground" /></a>
            </div>
          </div>
        </div>

        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-background"><Heart size={18} className="text-red-400" /></div>
          </div>
        </div>

        <div className="text-center text-sm text-muted">
          &copy; {currentYear} Abdoulaye Patawala. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}