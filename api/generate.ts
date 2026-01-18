
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, isSuperWacky, lastAnimation } = req.body;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';

    const wackyBias = isSuperWacky 
      ? "SUPER WACKY MODE is active: go for absolute chaos. Use surreal, logic-breaking text, bizarre non-sequiturs, and choose from high-intensity 'CHAOS' animations. Be extremely unpredictable." 
      : "Be funny, surprising, and absurdist.";
    
    const avoidDuplicate = lastAnimation 
      ? `IMPORTANT: The previous animation was '${lastAnimation}'. You MUST choose a DIFFERENT animation for variety.` 
      : "";

    // Moving system-level instructions to systemInstruction config.
    const systemInstruction = `You are the logic engine of the Absurditron 9000. 
      Generate wacky, nonsensical, and hilarious responses to user prompts. 
      The goal is pure entertainment through absurdity.
      
      ${wackyBias}
      
      Animation Categories:
      - CHAOS (High Intensity): vortex, glitch, explode, kaleidoscope, warp, disco, zigzag, rainbow, spiral, teleport, jello, rubber_band, poof, spin.
      - STABLE (Low Intensity): float, bounce, shake, swing, phase, matrix, flip, tilt, squish, gravity.

      Choose exactly one animation name from the list above.
      ${avoidDuplicate}`;

    const response = await ai.models.generateContent({
      model,
      contents: `User Prompt: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { 
              type: Type.STRING, 
              description: "A short, hilarious, and wacky response to the prompt." 
            },
            animation: { 
              type: Type.STRING, 
              description: "One specific animation name from the provided categories." 
            },
            moodColor: { 
              type: Type.STRING, 
              description: "A bright hex color code representing the vibe." 
            },
            emoji: { 
              type: Type.STRING, 
              description: "A single, quirky, relevant emoji." 
            },
          },
          required: ["text", "animation", "moodColor", "emoji"]
        }
      }
    });

    const jsonStr = response.text?.trim() || "{}";
    const data = JSON.parse(jsonStr);
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Gemini Backend Error:", error);
    res.status(500).json({ 
      error: 'GENERATION_FAILED',
      message: error.message || 'Failed to generate response' 
    });
  }
}
