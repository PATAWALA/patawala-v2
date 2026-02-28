import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Patawala</h3>
            <p className="text-gray-400">
              Je crée des expériences web modernes, performantes et mémorables.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Liens rapides</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-white">Accueil</a></li>
              <li><a href="/projets" className="text-gray-400 hover:text-white">Projets</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Légal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Mentions légales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Conditions d'utilisation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <div className="space-y-3">
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Mail size={18} />
                {SOCIAL_LINKS.email}
              </a>
            </div>
            <div className="flex gap-4 mt-6">
              <a href={SOCIAL_LINKS.github} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Github size={20} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Linkedin size={20} />
              </a>
              <a href={SOCIAL_LINKS.twitter} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Patawala. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}