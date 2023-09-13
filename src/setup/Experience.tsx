import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.jsx';
import '/src/utils/Tweaks';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Lights />
    </>
  );
}
