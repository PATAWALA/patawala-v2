import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function MerciPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#0A0F1C] relative overflow-hidden flex items-center justify-center">
      {/* FOND AVEC DOUBLE COUCHE */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#0A0F1C] to-[#1a1f35]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0px, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(6,182,212,0.08) 0px, rgba(6,182,212,0.08) 1px, transparent 1px, transparent 60px)`
          }}
          aria-hidden="true"
        />
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#141B2B] rounded-2xl border border-[#1F2937] shadow-2xl p-8 md:p-10 text-center backdrop-blur-sm">
            {/* Icône de succès */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
              <CheckCircle size={40} className="text-green-400" />
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Merci !
            </h1>

            {/* Message de confirmation */}
            <p className="text-lg text-gray-300 mb-2">
              Votre inscription à la newsletter a bien été prise en compte.
            </p>
            
            <p className="text-gray-400 mb-8">
              Vous recevrez désormais un email à chaque nouvel article publié sur le blog.
            </p>

            {/* Bouton de retour */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft size={18} />
              <span>Retour à l'accueil</span>
            </Link>

            {/* Message optionnel */}
            <p className="text-xs text-gray-500 mt-6">
              Si vous ne recevez pas nos emails, pensez à vérifier vos spams.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}