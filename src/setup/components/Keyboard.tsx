import { useKeyboardControls } from '@react-three/drei';
import { KeyNames } from '/src/constants/keyMap';
import classNames from 'classnames';

export default function Keyboard() {
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

  const handleKeyDown = (command: KeyNames) => () => {
    if (command === 'Leftward') console.log('left');
    if (command === 'Rightward') console.log('right');
    if (command === 'Forward') console.log('forward');
    if (command === 'Backward') console.log('backward');
    if (command === 'Jump') console.log('jump');
    // TODO: emit zustand event
  };

  return (
    <div className="controls">
      <div className="row">
        <div className={forwardClass} onTouchStart={handleKeyDown('Forward')}>
          <b>W</b>
        </div>
      </div>
      <div className="row">
        <div className={leftwardClass} onTouchStart={handleKeyDown('Leftward')}>
          <b>A</b>
        </div>
        <div className={backwardClass} onTouchStart={handleKeyDown('Backward')}>
          <b>S</b>
        </div>
        <div className={rightwardClass} onTouchStart={handleKeyDown('Rightward')}>
          <b>D</b>
        </div>
      </div>
      <div className="row">
        <div className={jumpClass} onTouchStart={handleKeyDown('Jump')}>
          <b>SPACE</b>
        </div>
      </div>
    </div>
  );
}
