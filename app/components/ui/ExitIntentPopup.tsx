'use client';
import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Download, CheckCircle } from 'lucide-react';
import { usePopup } from '../layout/PopupContext';

const leadMagnets = [
  {
    title: 'Guide Gratuit',
    description: '15 astuces pour améliorer vos performances web',
    icon: Download,
    value: 'guide-performance.pdf'
  },
  {
    title: 'Template Next.js',
    description: 'Starter kit professionnel avec TypeScript',
    icon: Download,
    value: 'template-nextjs.zip'
  },
  {
    title: 'Checklist SEO',
    description: 'Audit complet pour optimiser votre référencement',
    icon: CheckCircle,
    value: 'checklist-seo.pdf'
  }
];

export default function ExitIntentPopup() {
  const { isPopupOpen, closePopup } = usePopup();
  const [selectedMagnet, setSelectedMagnet] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Lead captured:', email, leadMagnets[selectedMagnet].value);
      setIsSubmitted(true);
      setTimeout(() => {
        closePopup();
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <>
      {/* SUPPRIMEZ CE BOUTON FIXE - IL N'EST PLUS NÉCESSAIRE */}
      {/* Le bouton est maintenant uniquement dans Navigation.tsx */}

      {/* Popup */}
      <AnimatePresence>
        {isPopupOpen && !isSubmitted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="fixed inset-0 bg-black/70 z-[100] backdrop-blur-sm"
              role="presentation"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-x-0 bottom-0 md:inset-0 md:m-auto z-[101] w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              role="dialog"
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
                aria-label="Fermer la popup"
              >
                <X size={24} className="text-gray-600" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Côté gauche */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Gift size={32} />
                    <h3 className="text-2xl font-bold">Ressource Exclusive</h3>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Boostez votre projet
                  </h2>

                  <p className="text-blue-100 mb-8">
                    Téléchargez gratuitement une ressource qui fera la différence
                  </p>

                  <div className="space-y-4">
                    {leadMagnets.map((magnet, index) => (
                      <button
                        key={magnet.title}
                        onClick={() => setSelectedMagnet(index)}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          selectedMagnet === index
                            ? 'bg-white/20 backdrop-blur-sm border-2 border-white'
                            : 'bg-white/10 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <magnet.icon size={24} />
                          <div>
                            <div className="font-bold">{magnet.title}</div>
                            <div className="text-sm text-blue-200">{magnet.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Côté droit */}
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Recevez votre cadeau
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Entrez votre email pour recevoir instantanément :
                    <span className="block font-bold text-blue-600 mt-2">
                      {leadMagnets[selectedMagnet].title}
                    </span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre meilleur email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700"
                    >
                      Télécharger maintenant
                    </button>
                  </form>

                  <p className="text-sm text-gray-500 mt-6 text-center">
                    🔒 100% confidentiel. Pas de spam.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Message de succès */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-[100]"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Cadeau envoyé !</h3>
              <p className="text-gray-600 mb-6">
                Votre {leadMagnets[selectedMagnet].title.toLowerCase()} a été envoyé à {email}
              </p>
              <p className="text-sm text-gray-500">
                Consultez votre boîte mail
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}