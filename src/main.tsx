import env from './utils/Env';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from '/src/setup/Experience';
import React from 'react';

console.info('Is development mode:', env.isDevelopment());

const root = ReactDOM.createRoot(document.querySelector('#app')!);

root.render(
  <React.StrictMode>
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
    </Canvas>
  </React.StrictMode>,
);
