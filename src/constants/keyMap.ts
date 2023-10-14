import { KeyboardControlsEntry } from '@react-three/drei/web/KeyboardControls';

const map = [
  { name: 'Forward', keys: ['KeyW', 'ArrowUp'] },
  { name: 'Backward', keys: ['KeyS', 'ArrowDown'] },
  { name: 'Leftward', keys: ['KeyA', 'ArrowLeft'] },
  { name: 'Rightward', keys: ['KeyD', 'ArrowRight'] },
  { name: 'Jump', keys: ['Space'] },
] as const;

export const keyMap = map as unknown as KeyboardControlsEntry[];

export type KeyNames = (typeof map)[number]['name'];
