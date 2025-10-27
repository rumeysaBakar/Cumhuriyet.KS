import React, { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import LetterScreen from './components/LetterScreen';
import { generateLetter } from './services/geminiService';
import CrescentStarIcon from './components/icons/CrescentStarIcon';

type Screen = 'home' | 'loading' | 'letter';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [name, setName] = useState<string>('');
  const [letter, setLetter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLetter = useCallback(async () => {
    if (!name.trim()) {
      setError('Lütfen adınızı girin.');
      return;
    }
    setError(null);
    setScreen('loading');
    try {
      const generatedText = await generateLetter(name);
      setLetter(generatedText);
      setScreen('letter');
    } catch (err) {
      setError('Mektup oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      setScreen('home');
    }
  }, [name]);

  const handleReset = useCallback(() => {
    setName('');
    setLetter('');
    setError(null);
    setScreen('home');
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'loading':
        return <LoadingScreen />;
      case 'letter':
        return <LetterScreen letter={letter} onReset={handleReset} />;
      case 'home':
      default:
        return (
          <HomeScreen
            name={name}
            setName={setName}
            onSubmit={handleGenerateLetter}
            error={error}
          />
        );
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/grunge-wall.png'), linear-gradient(to bottom right, #d52b1e, #f8f9fa)",
      }}
    >
      {/* Background icons */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <CrescentStarIcon
            key={i}
            className="absolute text-black/5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%) scale(${0.5 + Math.random() * 1.5}) rotate(${Math.random() * 360}deg)`,
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
            }}
          />
        ))}
      </div>
      <main className="relative z-10 w-full max-w-2xl mx-auto transition-all duration-500">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
