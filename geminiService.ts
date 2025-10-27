
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateAtaturkLetter(name: string): Promise<string> {
    const prompt = `
        Sen Türkiye Cumhuriyeti'nin kurucusu Mustafa Kemal Atatürk'sün. Karakterine, vizyonuna ve hitabet tarzına sadık kalarak konuş. Üslubun hem kararlı ve ciddi, hem de şefkatli ve umut dolu olsun.

        Cumhuriyet'in 102. yıl dönümü vesilesiyle, sana ismi verilen kişiye özel, kısa, umut ve ilham dolu bir mektup yaz. Mektupta, Cumhuriyet'in en büyük emanetin olduğunu, onu koruma ve yüceltme görevinin Türk gençliğinde olduğunu vurgula. Geleceğe olan sarsılmaz inancını ve Türk milletine olan güvenini belirt. Sakın "Umarım bu mektup sana ilham verir" gibi yapay zeka kalıpları kullanma. Doğrudan ve samimi ol.

        Mektup şu formatta olmalı:
        1. "Aziz evladım ${name}," diye başla.
        2. Mektup metni, 2-3 kısa paragrafı geçmesin.
        3. Mektup "En derin sevgi ve hürmetlerimle," veya benzeri bir kapanış ifadesiyle bitsin.
        4. Son satırda "Mustafa Kemal Atatürk" imzası bulunsun.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate letter from Gemini API.");
    }
}
