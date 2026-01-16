
export enum AnimationType {
  BOUNCE = 'bounce',
  SPIN = 'spin',
  SHAKE = 'shake',
  FLOAT = 'float',
  GLITCH = 'glitch',
  EXPLODE = 'explode',
  JELLO = 'jello',
  RAINBOW = 'rainbow',
  WARP = 'warp',
  DISCO = 'disco',
  SPIRAL = 'spiral',
  GRAVITY = 'gravity',
  VORTEX = 'vortex',
  TELEPORT = 'teleport',
  MATRIX = 'matrix',
  FLIP = 'flip',
  KALEIDOSCOPE = 'kaleidoscope',
  SWING = 'swing',
  PHASE = 'phase',
  RUBBER_BAND = 'rubber_band',
  TILT = 'tilt',
  SQUISH = 'squish',
  ZIGZAG = 'zigzag',
  POOF = 'poof'
}

export interface WackyResponse {
  text: string;
  animation: AnimationType;
  moodColor: string;
  emoji: string;
}

export interface AppState {
  prompt: string;
  response: WackyResponse | null;
  isSuperWacky: boolean;
  isLoading: boolean;
}
