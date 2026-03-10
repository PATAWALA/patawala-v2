export default function MerciPage() {
  return (
    <main className="min-h-screen pt-20 bg-[#0A0F1C] flex items-center justify-center">
      <div className="text-center p-8 bg-[#141B2B] rounded-2xl border border-[#1F2937] max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">Merci !</h1>
        <p className="text-gray-300">Votre abonnement a bien été pris en compte.</p>
        <a href="/" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
          Retour à l'accueil
        </a>
      </div>
    </main>
  );
}