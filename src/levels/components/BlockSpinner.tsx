import { useFrame } from '@react-three/fiber';
import { middleFloorMaterial, obstacleMaterial } from '/src/levels/shared/materials';
import { boxGeometry } from '/src/levels/shared/geometries';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = { position?: [number, number, number] };

export const BlockSpinner: React.FC<Props> = ({ position = [1, 1, 1] }: Props) => {
  const speed = useMemo(() => {
    const calculatedValue = Math.random() + 0.2;
    const sign = Math.random() < 0.5 ? -1 : 1;
    return calculatedValue * sign;
  }, []);
  const obstacle = useRef<RapierRigidBody | null>(null);

  useFrame((state, _delta) => {
    const time = state.clock.getElapsedTime();
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
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
