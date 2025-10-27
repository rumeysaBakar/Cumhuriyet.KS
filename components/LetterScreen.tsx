import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LetterScreenProps {
  letter: string;
  onReset: () => void;
}

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LetterScreen: React.FC<LetterScreenProps> = ({ letter, onReset }) => {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Format the letter by replacing newlines with paragraphs for better readability.
  const formattedLetter = letter
    .split('\n')
    .filter(p => p.trim() !== '')
    .map((paragraph, index) => (
      <p key={index} className="mb-4 indent-8 leading-relaxed">
        {paragraph}
      </p>
    ));
    
  const handleDownloadPDF = async () => {
    if (!letterRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(letterRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Needed for external images
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps= pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      
      let newWidth = pdfWidth - 20; // 10mm margin on each side
      let newHeight = newWidth / ratio;
      
      if (newHeight > pdfHeight - 20) {
        newHeight = pdfHeight - 20; // Fit to page height with margin
        newWidth = newHeight * ratio;
      }
      
      const x = (pdfWidth - newWidth) / 2;
      const y = (pdfHeight - newHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, newWidth, newHeight);
      pdf.save('Ataturkten-Mektup.pdf');

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareInstagram = async () => {
    if (!letterRef.current) return;
    setIsSharing(true);

    try {
      const canvas = await html2canvas(letterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'Ataturkten-Mektup.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image for Instagram:", error);
      alert("Resim oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSharing(false);
    }
  };


  return (
    <div className="animate-fade-in-slow flex flex-col items-center w-full">
      <div
        ref={letterRef}
        className="relative w-full max-w-2xl bg-no-repeat bg-cover bg-center p-8 md:p-12 font-letter text-lg text-gray-800 shadow-2xl rounded-lg"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png'), linear-gradient(to bottom, #fdfbf4, #e3e0d5)",
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <div className="flex justify-center mb-8">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg"
                alt="Mustafa Kemal Atatürk"
                className="w-28 h-28 rounded-full border-4 border-gray-300/70 object-cover object-top shadow-lg filter grayscale"
                crossOrigin="anonymous" 
            />
        </div>
        
        <div>{formattedLetter}</div>

      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-2xl">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading || isSharing}
          className="w-full bg-red-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isDownloading ? 'İndiriliyor...' : 'Mektubu PDF Olarak İndir'}
        </button>
        <button
          onClick={handleShareInstagram}
          disabled={isDownloading || isSharing}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold text-lg px-8 py-3 rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <InstagramIcon className="w-6 h-6" />
          {isSharing ? 'Hazırlanıyor...' : "Instagram'da Paylaş"}
        </button>
        <button
          onClick={onReset}
          disabled={isDownloading || isSharing}
          className="w-full bg-white text-red-600 font-bold text-lg px-8 py-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Yeni Bir Mektup Al
        </button>
      </div>
    </div>
  );
};

export default LetterScreen;
