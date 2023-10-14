import env from './utils/Env';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from '/src/setup/Experience';
import React from 'react';
import { KeyboardControls } from '@react-three/drei';
import { keyMap } from '/src/constants/keyMap';

console.info('Is development mode:', env.isDevelopment());

const root = ReactDOM.createRoot(document.querySelector('#app')!);

root.render(
  <React.StrictMode>
    <KeyboardControls map={keyMap}>
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
    </KeyboardControls>
  </React.StrictMode>,
);
