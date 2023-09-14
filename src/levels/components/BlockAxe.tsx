import { useFrame } from '@react-three/fiber';
import { floor2Material, obstacleMaterial } from '/src/levels/materials';
import { boxGeometry } from '/src/levels/geometries';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = { position?: [number, number, number] };
export const BlockAxe: React.FC<Props> = ({ position: [x = 1, y = 1, z = 1] = [1, 1, 1] }: Props) => {
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const obstacle = useRef<RapierRigidBody | null>(null);

  useFrame((state, _delta) => {
    const time = state.clock.getElapsedTime();
    const translation = Math.sin(time + offset) * 1.25;
    const vector = new THREE.Vector3(x + translation, y + 0.75, z);
    obstacle.current?.setNextKinematicTranslation(vector);
  });

  return (
    <group position={[x, y, z]}>
      <mesh
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor2Material}
      />
      <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh
          castShadow
          receiveShadow
          position={[0, -0.1, 0]}
          scale={[1.5, 1.5, 0.3]}
          geometry={boxGeometry}
          material={obstacleMaterial}
        />
      </RigidBody>
    </group>
  );
};