import React, { useState, useCallback } from 'react';
import { generateAtaturkLetter } from './services/geminiService';

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-red-700 rounded-full animate-spin"></div>
        <p className="text-gray-600">Mektup hazırlanıyor...</p>
    </div>
);

const LetterDisplay: React.FC<{ letter: string }> = ({ letter }) => {
    const parts = letter.split('Mustafa Kemal Atatürk');
    const mainText = parts[0];
    const signature = 'Mustafa Kemal Atatürk';

    return (
        <div className="bg-[#faf3e0] border border-gray-300 rounded-lg p-6 md:p-8 w-full max-w-2xl animate-fade-in shadow-2xl font-serif">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{mainText}</p>
            {parts.length > 1 && (
                 <p className="text-right text-gray-700 mt-8 text-xl signature">{signature}</p>
            )}
        </div>
    );
};

export default function App() {
    const [name, setName] = useState('');
    const [letter, setLetter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateLetter = useCallback(async () => {
        if (!name.trim()) {
            setError('Lütfen geçerli bir ad giriniz.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setLetter('');

        try {
            const generatedLetter = await generateAtaturkLetter(name);
            setLetter(generatedLetter);
        } catch (err) {
            setError('Mektup oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [name]);
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleGenerateLetter();
        }
    };

    return (
        <div className="bg-white min-h-screen text-gray-800 flex flex-col items-center justify-center p-4 selection:bg-red-200 selection:text-red-900 relative overflow-hidden">
             {/* Background ornaments */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="star" patternUnits="userSpaceOnUse" width="100" height="100">
                            <path d="M50 0L61.2 34.5L98.5 34.5L68.6 55.9L79.8 90.4L50 69L20.2 90.4L31.4 55.9L1.5 34.5L38.8 34.5Z" fill="#dc2626"/>
                        </pattern>
                        <pattern id="crescent" patternUnits="userSpaceOnUse" width="200" height="200">
                             <path d="M150 100 A 50 50 0 1 1 150 0 A 60 60 0 1 0 150 100 Z" fill="#dc2626"/>
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="50%" height="100%" fill="url(#star)"/>
                    <rect x="50%" y="0" width="50%" height="100%" fill="url(#crescent)"/>
                </svg>
            </div>


            <main className="w-full max-w-3xl mx-auto flex flex-col items-center text-center py-10 z-10">
                <header className="mb-8">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg" 
                        alt="Mustafa Kemal Atatürk"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-lg"
                    />
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-red-700 font-serif">
                        🇹🇷 Cumhuriyet 102 Yaşında! 🇹🇷
                    </h1>
                    <p className="text-lg text-gray-600">
                        Atatürk'ten mektubunu al...
                    </p>
                </header>

                {!letter && (
                    <div className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 flex flex-col gap-4 shadow-lg transition-all duration-300">
                        <label htmlFor="name-input" className="text-left font-medium text-gray-700">Adın nedir?</label>
                        <input
                            id="name-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Adınızı buraya yazın..."
                            disabled={isLoading}
                            className="bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                            aria-label="Adınız"
                        />
                        <button
                            onClick={handleGenerateLetter}
                            disabled={isLoading || !name.trim()}
                            className="w-full bg-red-700 hover:bg-red-800 disabled:bg-red-900/50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 text-lg"
                        >
                            {isLoading ? 'Oluşturuluyor...' : 'Mektubu Göster'}
                        </button>
                    </div>
                )}

                <div className="mt-8 w-full flex flex-col items-center justify-center">
                    {isLoading && <LoadingSpinner />}
                    {error && <p className="text-red-800 bg-red-100 border border-red-300 rounded-md p-3">{error}</p>}
                    {letter && <LetterDisplay letter={letter} />}
                    {letter && (
                         <button
                            onClick={() => { setLetter(''); setName(''); setError(null); }}
                            className="mt-8 bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-6 rounded-md transition-colors duration-300 border border-gray-300 shadow-sm"
                        >
                            Yeni Mektup Oluştur
                        </button>
                    )}
                </div>
            </main>

            <footer className="absolute bottom-4 text-center text-gray-500 text-sm z-10">
                <p>Türkiye Cumhuriyeti'nin 102. yılı kutlu olsun.</p>
            </footer>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
                .signature {
                    font-family: 'Playfair Display', serif;
                    text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}
