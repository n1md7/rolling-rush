import env from './utils/Env';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from '/src/setup/Experience';

console.info('Is development mode:', env.isDevelopment());

const root = ReactDOM.createRoot(document.querySelector('#app')!);

root.render(
  <Canvas
    shadows
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [2.5, 4, 6],
    }}
  >
    <Experience />
  </Canvas>,
);
