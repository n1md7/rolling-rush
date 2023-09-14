import '/src/utils/Tweaks';
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import Level from '/src/levels/Level';
import { Physics } from '@react-three/rapier';
import { BlockSpinner } from '/src/levels/components/BlockSpinner';
import { BlockLimbo } from '/src/levels/components/BlockLimbo';
import { BlockAxe } from '/src/levels/components/BlockAxe';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level count={5} types={[BlockAxe, BlockSpinner, BlockLimbo]} />
      </Physics>
    </>
  );
}
