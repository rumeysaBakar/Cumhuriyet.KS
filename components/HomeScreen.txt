
import React from 'react';
import KizlarSoruyorIcon from './icons/KizlarSoruyorIcon';

interface HomeScreenProps {
  name: string;
  setName: (name: string) => void;
  onSubmit: () => void;
  error: string | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ name, setName, onSubmit, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 text-center flex flex-col items-center animate-fade-in">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg"
        alt="Mustafa Kemal Atatürk"
        className="w-32 h-32 rounded-full border-4 border-red-600 object-cover object-top shadow-lg mb-6"
      />
      <h1 className="text-2xl md:text-4xl font-black text-gray-800 mb-2 leading-tight">
        Cumhuriyetimizin 102. yılında,
        <br />
        <span className="text-red-600">Atatürk’ten</span> sana özel bir mektup var! 🇹🇷
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Adını yaz, mektubunu al.
      </p>

      <a
        href="https://www.kizlarsoruyor.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg mb-8 hover:bg-gray-200 transition-colors"
      >
        <KizlarSoruyorIcon className="w-6 h-6" />
        <span>KızlarSoruyor</span>
      </a>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adını yaz..."
          className="w-full px-5 py-3 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white font-bold text-lg px-5 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
        >
          Mektubumu Al
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
    </div>
  );
};

export default HomeScreen;
