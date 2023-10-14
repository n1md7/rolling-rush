import '/src/utils/Tweaks';
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import Level from '/src/levels/Level';
import { Physics } from '@react-three/rapier';
import { BlockSpinner } from '/src/levels/components/BlockSpinner';
import { BlockLimbo } from '/src/levels/components/BlockLimbo';
import { BlockAxe } from '/src/levels/components/BlockAxe';
import Player from '/src/setup/Player';
import { useTweaks } from '/src/utils/Tweaks';

export default function Experience() {
  const { debug } = useTweaks();

  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug={debug}>
        <Lights />
        <Level count={5} types={[BlockAxe, BlockSpinner, BlockLimbo]} />
        <Player />
      </Physics>
    </>
  );
}
