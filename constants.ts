
import { AnimationType } from './types.ts';

export const COLORS = [
  '#f43f5e', // rose-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ec4899', // pink-500
];

export const EMOJIS = ['🤡', '🤪', '🛸', '🍕', '🌈', '🧨', '🐙', '🦖', '🍌', '🍦', '🛸', '🧠', '🍄', '🧨'];

export const ANIMATION_VARIANTS: Record<string, any> = {
  [AnimationType.BOUNCE]: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  [AnimationType.SPIN]: {
    initial: { rotate: -180, scale: 0 },
    animate: { rotate: 0, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  [AnimationType.SHAKE]: {
    initial: { x: -50, opacity: 0 },
    animate: { x: [0, -10, 10, -10, 10, 0], opacity: 1 },
    transition: { duration: 0.5 }
  },
  [AnimationType.FLOAT]: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, ease: "easeOut" }
  },
  [AnimationType.GLITCH]: {
    initial: { skewX: 20, opacity: 0 },
    animate: { skewX: 0, opacity: 1 },
    transition: { duration: 0.3 }
  },
  [AnimationType.EXPLODE]: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [0, 1.8, 1], opacity: 1 },
    transition: { duration: 0.8, ease: "backOut" }
  },
  [AnimationType.JELLO]: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1], scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1], opacity: 1 },
    transition: { duration: 1 }
  },
  [AnimationType.RAINBOW]: {
    initial: { filter: "grayscale(100%)", opacity: 0 },
    animate: { filter: "grayscale(0%)", opacity: 1 },
    transition: { duration: 1 }
  },
  [AnimationType.WARP]: {
    initial: { perspective: 500, rotateX: 90, opacity: 0 },
    animate: { perspective: 1000, rotateX: 0, opacity: 1 },
    transition: { duration: 0.8 }
  },
  [AnimationType.DISCO]: {
    initial: { scale: 2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, ease: "circOut" }
  },
  [AnimationType.SPIRAL]: {
    initial: { rotate: 720, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    transition: { duration: 1, ease: "easeOut" }
  },
  [AnimationType.GRAVITY]: {
    initial: { y: -500, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', bounce: 0.5, duration: 1 }
  },
  [AnimationType.VORTEX]: {
    initial: { rotate: 1080, scale: 0, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    transition: { duration: 1.2, ease: "anticipate" }
  },
  [AnimationType.TELEPORT]: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.1 }
  },
  [AnimationType.MATRIX]: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  },
  [AnimationType.FLIP]: {
    initial: { rotateY: 180, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    transition: { duration: 0.8 }
  },
  [AnimationType.KALEIDOSCOPE]: {
    initial: { filter: "blur(20px)", scale: 1.5, opacity: 0 },
    animate: { filter: "blur(0px)", scale: 1, opacity: 1 },
    transition: { duration: 1 }
  },
  [AnimationType.SWING]: {
    initial: { rotate: -45, originY: 0, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 200, damping: 10 }
  },
  [AnimationType.PHASE]: {
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 0.5, 1] },
    transition: { duration: 0.8, ease: "easeInOut" }
  },
  [AnimationType.RUBBER_BAND]: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [1, 1.4, 0.8, 1.1, 1], opacity: 1 },
    transition: { duration: 0.6 }
  },
  [AnimationType.TILT]: {
    initial: { skewY: 30, opacity: 0 },
    animate: { skewY: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "backOut" }
  },
  [AnimationType.SQUISH]: {
    initial: { scaleY: 0.1, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 10 }
  },
  [AnimationType.ZIGZAG]: {
    initial: { x: -200, y: -200, opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
  },
  [AnimationType.POOF]: {
    initial: { scale: 2, filter: 'blur(20px)', opacity: 0 },
    animate: { scale: 1, filter: 'blur(0px)', opacity: 1 },
    transition: { duration: 0.4, ease: "circOut" }
  }
};
