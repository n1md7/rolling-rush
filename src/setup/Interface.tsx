import { Phase, useStore } from '/src/stores/useStore';
import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';
import { Show } from '/src/setup/components/Show';
import { useDevice } from '/src/hooks/useDevice';
import Keyboard from '/src/setup/components/Keyboard';
import classNames from 'classnames';

export default function Interface() {
  const device = useDevice();
  const restart = useStore((state) => state.restart);
  const phase = useStore((state) => state.phase);
  const time = useRef<HTMLDivElement>(null);
  const classes = classNames('interface', { 'pointer-events': device.isMobile() });

  useEffect(() => {
    const unsubscribe = addEffect(() => {
      if (!time.current) return;
      const state = useStore.getState();

      if (state.phase === Phase.Ready) return;

      const elapsed = { time: 0 };
      if (state.phase === Phase.Playing) {
        elapsed.time = Date.now() - state.startTime;
      } else if (state.phase === Phase.Ended) {
        elapsed.time = state.endTime - state.startTime;
      }

      const currentTime = elapsed.time / 1000;

      const isBestTime = currentTime < state.bestTime && state.phase === Phase.Ended;
      time.current.innerHTML = currentTime.toFixed(3) + (isBestTime ? ' 🏆' : '');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={classes}>
      <div ref={time} className="time">
        0.00
      </div>
      <Show when={phase === Phase.Ended}>
        <div className="restart" onClick={restart}>
          Restart
        </div>
      </Show>
      <Keyboard />
    </div>
  );
}
