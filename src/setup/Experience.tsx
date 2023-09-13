import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import '/src/utils/Tweaks';
import Level from '/src/levels/Level';
import { Physics } from '@react-three/rapier';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug>
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
