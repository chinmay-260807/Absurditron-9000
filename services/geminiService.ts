import { GoogleGenAI, Type } from "@google/genai";
import { WackyResponse, AnimationType } from "../types";

// Safe API initialization
const getApiKey = () => (window as any).process?.env?.API_KEY || "";

export const getWackyResponse = async (
  prompt: string, 
  isSuperWacky: boolean, 
  lastAnimation?: AnimationType
): Promise<WackyResponse> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";
  
  const wackyBias = isSuperWacky ? "SUPER WACKY MODE is active: go for absolute chaos. Use surreal, logic-breaking text and extreme animations." : "Be funny, surprising, and absurdist.";
  const avoidDuplicate = lastAnimation ? `IMPORTANT: The previous animation was '${lastAnimation}'. You MUST choose a DIFFERENT animation.` : "";

  const contents = `Generate a wacky, nonsensical, and hilarious response to this prompt: "${prompt}". 
    ${wackyBias}
    
    Animation Guide (Choose one that fits the mood of the response):
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
    let selectedAnim = data.animation as AnimationType;
    const allAnims = Object.values(AnimationType);
    
    if (!allAnims.includes(selectedAnim)) {
      selectedAnim = allAnims[Math.floor(Math.random() * allAnims.length)];
    }

    return {
      text: data.text,
      animation: selectedAnim,
      moodColor: data.moodColor,
      emoji: data.emoji
    };
  } catch (e) {
    console.error("Gemini Error:", e);
    return {
      text: "The logic engine has encountered a sentient kumquat!",
      animation: AnimationType.VORTEX,
      moodColor: "#ff00ff",
      emoji: "🍊"
    };
  }
};