import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import type {} from '@redux-devtools/extension';

export enum Phase {
  Ready = 'Ready',
  Playing = 'Playing',
  Ended = 'Ended',
}
type Store = {
  blocksCount: number;
  blocksSeed: number;
  phase: Phase;
  startTime: number;
  bestTime: number;
  endTime: number;
  start: () => void;
  restart: () => void;
  ended: () => void;
  updateBestTime: () => void;
  updateBlocksCount: (count: number) => void;
};
export const useStore = create<Store>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          blocksCount: 7,
          blocksSeed: 0,
          phase: Phase.Ready,
          startTime: 0,
          endTime: 0,
          bestTime: Number.MAX_SAFE_INTEGER,
          updateBestTime: () =>
            set((state) => {
              const current = (state.endTime - state.startTime) / 1000;
              if (current < state.bestTime) {
                return { bestTime: current };
              }
              return state;
            }),
          start: () => {
            set((state) => {
              if (state.phase !== Phase.Ready) return state;

              return { phase: Phase.Playing, startTime: Date.now() };
            });
          },
          restart: () =>
            set((state) => {
              if (![Phase.Playing, Phase.Ended].includes(state.phase)) return state;
              state.updateBestTime();

              return { phase: Phase.Ready, startTime: 0, endTime: 0, blocksSeed: state.blocksSeed + 1 };
            }),
          ended: () =>
            set((state) => {
              if (state.phase !== Phase.Playing) return state;
              return { phase: Phase.Ended, endTime: Date.now() };
            }),
          updateBlocksCount: (count) => set(() => ({ blocksCount: count })),
        }),
        {
          name: 'Rolling-Rush', // <== LocalStorage key
        },
      ),
    ),
  ),
);
