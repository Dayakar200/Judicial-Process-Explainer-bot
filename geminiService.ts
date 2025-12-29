
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const getGeminiResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 500 },
      },
    });

    return {
      text: response.text || "I'm sorry, I couldn't generate a response at this time.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Legal Source',
        uri: chunk.web?.uri || '#'
      })) || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
