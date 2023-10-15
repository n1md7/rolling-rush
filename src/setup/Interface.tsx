import { useKeyboardControls } from '@react-three/drei';
import classNames from 'classnames';
import { KeyNames } from '/src/constants/keyMap';
import { Phase, useStore } from '/src/stores/useStore';
import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';

export default function Interface() {
  const forward = useKeyboardControls<KeyNames>((state) => state.Forward);
  const backward = useKeyboardControls<KeyNames>((state) => state.Backward);
  const leftward = useKeyboardControls<KeyNames>((state) => state.Leftward);
  const rightward = useKeyboardControls<KeyNames>((state) => state.Rightward);
  const jump = useKeyboardControls<KeyNames>((state) => state.Jump);

  const forwardClass = classNames('key', { active: forward });
  const backwardClass = classNames('key', { active: backward });
  const leftwardClass = classNames('key', { active: leftward });
  const rightwardClass = classNames('key', { active: rightward });
  const jumpClass = classNames('key large', { active: jump });

  const restart = useStore((state) => state.restart);
  const phase = useStore((state) => state.phase);
  const time = useRef<HTMLDivElement>(null);

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
    <div className="interface">
      <div ref={time} className="time">
        0.00
      </div>
      {phase === Phase.Ended && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      <div className="controls">
        <div className="row">
          <div className={forwardClass}>
            <b>W</b>
          </div>
        </div>
        <div className="row">
          <div className={leftwardClass}>
            <b>A</b>
          </div>
          <div className={backwardClass}>
            <b>S</b>
          </div>
          <div className={rightwardClass}>
            <b>D</b>
          </div>
        </div>
        <div className="row">
          <div className={jumpClass}>
            <b>SPACE</b>
          </div>
        </div>
      </div>
    </div>
  );
}
