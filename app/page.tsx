// app/page.tsx
import HeroSection from './components/sections/Hero';
import SocialProof from './components/sections/SocialProof';
import ValueProposition from './components/sections/ValueProposition';
import TechExpertise from './components/sections/TechExpertise';
import AboutSection from './components/sections/About'; 
import RealisationsSection from './components/sections/Realisations';
import CTASection from './components/sections/Cta';

export default function Home() {
  return (
    <>
      {/* Section Hero - active Accueil */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Section About - active À propos */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Section SocialProof - active Accueil */}
      <section id="socialproof">
        <SocialProof />
      </section>

      {/* Section ValueProposition - active Accueil */}
      <section id="valueproposition">
        <ValueProposition /> 
      </section>

      {/* Section TechExpertise - active Accueil */}
      <section id="techexpertise">
        <TechExpertise />
      </section>

      {/* Section Projets - active Réalisations */}
      <section id="projets">
        <RealisationsSection />
      </section>

      {/* Section Blog - pas encore active */}
      <section id="blog">
        {/* La section blog sera ajoutée plus tard si besoin */}
      </section>

      {/* Section Contact - active Contact */}
      <section id="contact">
        <CTASection />
      </section>
    </>
  );
}