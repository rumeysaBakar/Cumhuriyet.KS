
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the API_KEY is provided.
  console.error("API_KEY is not set. Please provide it in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateLetter = async (name: string): Promise<string> => {
  const prompt = `
    Mustafa Kemal Atatürk'ün ağzından, Türkiye Cumhuriyeti'nin 102. kuruluş yıl dönümü için "${name}" ismine özel, kısa ve duygu dolu bir mektup yaz. 
    Mektup, Atatürk'ün o bilinen üslubunu, vizyonunu ve kararlılığını yansıtmalı; okuyana umut ve ilham vermelidir. 
    Mektupta, cumhuriyetin önemine, Türk gençliğine olan sarsılmaz güvenine ve geleceğe dair beklentilerine değin. 
    Tonu samimi, güçlü, yol gösterici ve babacan olsun.

    Mektuba "Sevgili evladım ${name}," diye başla.
    Mektubu "En derin sevgi ve hasretle," diye bitir.

    Mektup metni 2 veya 3 kısa paragraftan oluşsun. Uzun olmasın. Sadece mektup metnini döndür, başka bir açıklama ekleme.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating letter from Gemini:", error);
    throw new Error("Failed to generate letter.");
  }
};
