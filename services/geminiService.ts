
import { WackyResponse, AnimationType } from "../types.ts";

export const getWackyResponse = async (
  prompt: string, 
  isSuperWacky: boolean, 
  lastAnimation?: AnimationType
): Promise<WackyResponse> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        isSuperWacky,
        lastAnimation
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate animation
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
  } catch (e: any) {
    console.error("Service Error:", e);
    // Rethrow to be handled by UI
    throw e;
  }
};
