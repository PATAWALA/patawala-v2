// app/page.tsx
import type { Metadata } from 'next';
import HeroSection from './components/sections/Hero';
import SocialProof from './components/sections/SocialProof';
import TechExpertise from './components/sections/TechExpertise';
import AboutSection from './components/sections/About'; 
import RealisationsSection from './components/sections/Realisations';
import CTASection from './components/sections/Cta';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Découvrez comment Patawala peut transformer votre entreprise avec des solutions full-stack et des agents IA. Consultation d\'architecture, développement sur-mesure, automatisation.',
  openGraph: {
    title: 'Patawala | L\'Architecture Digitale qui Fait la Différence',
    description: 'Premier pas vers votre solution digitale premium.',
  },
};

export default function Home() {
  return (
    <>
      {/* Section Hero - active Accueil */}
      <section id="hero" className="relative overflow-hidden">
        <HeroSection />
      </section>

      {/* Section SocialProof - preuve sociale */}
      <section id="socialproof" className="relative">
        <SocialProof />
      </section>

      {/* Section TechExpertise - expertise technique */}
      <section id="techexpertise" className="relative">
        <TechExpertise />
      </section>

      {/* Section About - à propos */}
      <section id="about" className="relative">
        <AboutSection />
      </section>

      {/* Section Projets - réalisations */}
      <section id="projets" className="relative">
        <RealisationsSection />
      </section>
      
      {/* Section Contact - call to action */}
      <section id="contact" className="relative">
        <CTASection />
      </section>
    </>
  );
}