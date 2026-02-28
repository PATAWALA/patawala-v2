'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, intégrez votre service de newsletter (Mailchimp, ConvertKit, etc.)
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">
          Restez à la pointe de la technologie
        </h3>
        <p className="text-blue-100 mb-8">
          Recevez mes conseils, astuces et ressources exclusives directement dans votre boîte mail.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {isSubscribed ? (
              <>
                <CheckCircle size={20} />
                Inscrit !
              </>
            ) : (
              <>
                <Send size={20} />
                S'inscrire
              </>
            )}
          </motion.button>
        </form>

        <p className="text-sm text-blue-200 mt-4">
          En vous inscrivant, vous acceptez de recevoir mes emails. Désinscription à tout moment.
        </p>
      </div>
    </div>
  );
}