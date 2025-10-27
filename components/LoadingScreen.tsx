
import React from 'react';

const LoadingScreen: React.FC = () => {
  const fullText = "Gazi Mustafa Kemal Atatürk'e özlemle...";

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl animate-fade-in">
      <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-xl font-semibold text-gray-700 font-serif-letter h-10">
        {fullText}
      </p>
    </div>
  );
};

export default LoadingScreen;
