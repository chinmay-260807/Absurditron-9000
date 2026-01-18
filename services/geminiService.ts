
import { WackyResponse, AnimationType } from "../types.ts";

/**
 * Categorizes animations to allow for "Chaos" bias in Super Wacky mode.
 * As requested, specifically includes WARP, DISCO, ZIGZAG, RAINBOW, SPIRAL, TELEPORT, JELLO, RUBBER_BAND, and POOF.
 */
const CHAOS_ANIMATIONS: AnimationType[] = [
  AnimationType.VORTEX,
  AnimationType.GLITCH,
  AnimationType.EXPLODE,
  AnimationType.KALEIDOSCOPE,
  AnimationType.WARP,
  AnimationType.DISCO,
  AnimationType.ZIGZAG,
  AnimationType.RAINBOW,
  AnimationType.SPIRAL,
  AnimationType.TELEPORT,
  AnimationType.JELLO,
  AnimationType.RUBBER_BAND,
  AnimationType.POOF,
  AnimationType.SPIN // Added spin to chaos as it is high-energy
];

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
    const allAnims = Object.values(AnimationType);
    
    // 1. Initial selection and validation
    let selectedAnim = data.animation as AnimationType;
    if (!allAnims.includes(selectedAnim)) {
      selectedAnim = allAnims[Math.floor(Math.random() * allAnims.length)];
    }

    // 2. Bias logic: If Super Wacky is on, upgrade stable animations to chaos ones.
    // We also sometimes switch even if it IS a chaos animation to increase variety.
    if (isSuperWacky) {
      const isCurrentlyChaos = CHAOS_ANIMATIONS.includes(selectedAnim);
      // 30% chance to switch even if AI picked chaos, to ensure we don't get stuck in AI loops
      const shouldSwitchForVariety = Math.random() > 0.7;
      
      if (!isCurrentlyChaos || shouldSwitchForVariety) {
        const filteredChaos = CHAOS_ANIMATIONS.filter(a => a !== lastAnimation);
        selectedAnim = filteredChaos[Math.floor(Math.random() * filteredChaos.length)];
      }
    }

    // 3. Strict Duplicate Avoidance: 
    // If the selected animation matches the previous one, we MUST pick a different one.
    if (selectedAnim === lastAnimation) {
      const pool = isSuperWacky ? CHAOS_ANIMATIONS : allAnims;
      const validPool = pool.filter(a => a !== lastAnimation);
      // Fallback to all animations if somehow the pool is empty (shouldn't happen)
      const finalPool = validPool.length > 0 ? validPool : allAnims.filter(a => a !== lastAnimation);
      selectedAnim = finalPool[Math.floor(Math.random() * finalPool.length)];
    }

    return {
      text: data.text,
      animation: selectedAnim,
      moodColor: data.moodColor,
      emoji: data.emoji
    };
  } catch (e: any) {
    console.error("Service Error:", e);
    throw e;
  }
};
