
import { GoogleGenAI, Type } from "@google/genai";
import { WackyResponse, AnimationType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWackyResponse = async (
  prompt: string, 
  isSuperWacky: boolean, 
  lastAnimation?: AnimationType
): Promise<WackyResponse> => {
  const model = "gemini-3-flash-preview";
  
  const wackyBias = isSuperWacky ? "SUPER WACKY MODE is active: go for absolute chaos. Use surreal, logic-breaking text and extreme animations." : "Be funny, surprising, and absurdist.";
  const avoidDuplicate = lastAnimation ? `IMPORTANT: The previous animation was '${lastAnimation}'. You MUST choose a DIFFERENT animation.` : "";

  const contents = `Generate a wacky, nonsensical, and hilarious response to this prompt: "${prompt}". 
    ${wackyBias}
    
    Animation Guide (Choose one that fits the mood of the response):
    - vortex: Spiraling entrance.
    - teleport: Instant appearance.
    - matrix: Digital flicker.
    - flip: 3D tumble.
    - kaleidoscope: Color distortion.
    - warp: Perspective stretch.
    - gravity: Falling drop.
    - spiral: Twirling zoom.
    - disco: Rapid scaling.
    - rainbow: Color cycle.
    - glitch: Digital static.
    - explode: Sudden pop.
    - float/bounce: Gentle or energetic motion.
    - jello/shake: Wobbly effects.
    - swing: Pendulum rotation.
    - phase: Ghostly flickering entrance.
    - rubber_band: Stretching and snapping back.
    - tilt: Diagonal skewing.
    - squish: Flat vertical compression.
    - zigzag: Jagged movement.
    - poof: Cloud-like appearance.

    ${avoidDuplicate}

    Return it as a JSON object with:
    - text: The funny response (1-2 short sentences)
    - animation: One of the strings above.
    - moodColor: A bright, vibrant hex color code.
    - emoji: A single relevant quirky emoji.`;

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

  try {
    const data = JSON.parse(response.text);
    let selectedAnim = data.animation as AnimationType;
    const allAnims = Object.values(AnimationType);
    
    // Validate the animation exists in our enum
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
    return {
      text: "The logic engine has encountered a sentient kumquat!",
      animation: AnimationType.VORTEX,
      moodColor: "#ff00ff",
      emoji: "🍊"
    };
  }
};
