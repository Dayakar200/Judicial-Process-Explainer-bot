import { SYSTEM_INSTRUCTION } from "../constants";

export const getGeminiResponse = async (userPrompt: string) => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
  if (!apiKey) throw new Error('Gemini API key not found');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    tools: [{ googleSearch: {} }],
    generationConfig: { thinkingConfig: { thinkingBudget: 500 } },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response at this time.";
    const sources = data.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Legal Source',
      uri: chunk.web?.uri || '#'
    })) || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
