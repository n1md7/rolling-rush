import { useFrame } from '@react-three/fiber';
import { middleFloorMaterial, obstacleMaterial } from '/src/levels/shared/materials';
import { boxGeometry } from '/src/levels/shared/geometries';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = { position?: [number, number, number] };
export const BlockLimbo: React.FC<Props> = ({ position: [x = 1, y = 1, z = 1] = [1, 1, 1] }: Props) => {
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const obstacle = useRef<RapierRigidBody | null>(null);

  useFrame((state, _delta) => {
    const time = state.clock.getElapsedTime();
    const translation = Math.sin(time + offset) + 1.15;
    const vector = new THREE.Vector3(x, y + translation, z);
    obstacle.current?.setNextKinematicTranslation(vector);
  });

  return (
    <group position={[x, y, z]}>
      <mesh
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={middleFloorMaterial}
      />
      <RigidBody ref={obstacle} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0.2} friction={0}>
        <mesh
          castShadow
          receiveShadow
          position={[0, -0.1, 0]}
          scale={[3.5, 0.3, 0.3]}
          geometry={boxGeometry}
          material={obstacleMaterial}
        />
      </RigidBody>
    </group>
  );
};
