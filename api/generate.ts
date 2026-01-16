
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, isSuperWacky, lastAnimation } = req.body;

  if (!process.env.API_KEY) {
    return res.status(500).json({ 
      error: 'API Key missing on server. Please configure API_KEY in Vercel environment variables.' 
    });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const wackyBias = isSuperWacky 
    ? "SUPER WACKY MODE is active: go for absolute chaos. Use surreal, logic-breaking text and extreme animations." 
    : "Be funny, surprising, and absurdist.";
  
  const avoidDuplicate = lastAnimation 
    ? `IMPORTANT: The previous animation was '${lastAnimation}'. You MUST choose a DIFFERENT animation.` 
    : "";

  const contents = `Generate a wacky, nonsensical, and hilarious response to this prompt: "${prompt}". 
    ${wackyBias}
    
    Animation Guide (Choose one):
    - vortex, teleport, matrix, flip, kaleidoscope, warp, gravity, spiral, disco, rainbow, glitch, explode, float, bounce, jello, shake, swing, phase, rubber_band, tilt, squish, zigzag, poof.

    ${avoidDuplicate}

    Return it as a JSON object with:
    - text: The funny response (1-2 short sentences)
    - animation: One of the strings above.
    - moodColor: A bright, vibrant hex color code.
    - emoji: A single relevant quirky emoji.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            animation: { type: Type.STRING },
            moodColor: { type: Type.STRING },
            emoji: { type: Type.STRING },
          },
          required: ["text", "animation", "moodColor", "emoji"]
        }
      }
    });

    const data = JSON.parse(response.text);
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Gemini Backend Error:", error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
}
