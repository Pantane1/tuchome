import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (name: string, category: string, features: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert e-commerce copywriter.
      Write a compelling, SEO-friendly product description (max 100 words) for a product with the following details:
      Product Name: ${name}
      Category: ${category}
      Key Features/Keywords: ${features}
      
      Tone: Professional, persuasive, and clear.
      Do not include markdown titles. Just the description text.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Failed to generate description. Please check your API key.";
  }
};

export const chatWithBusinessCoach = async (message: string, history: {role: string, content: string}[]): Promise<string> => {
  try {
     // We map our simple history format to the API's expected format if needed, 
     // but for a simple single-turn or stateless feel in this demo, we'll just send a direct prompt 
     // or use a chat session if we were persisting state deeply.
     // For this implementation, let's use a chat session to maintain context.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are a senior business consultant and inventory analyst for a vendor dashboard app. Help the user with business strategy, analyzing sales trends, and drafting customer communications. Keep answers concise and actionable.",
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't process that request.";

  } catch (error) {
    console.error("Error in business coach:", error);
    return "I'm having trouble connecting to the brain. Please try again later.";
  }
};
