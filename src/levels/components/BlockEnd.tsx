import { Vector3 } from '@react-three/fiber';
import { finishFloorMaterial } from '/src/levels/shared/materials';
import { boxGeometry } from '/src/levels/shared/geometries';
import { Text, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

type Props = { position?: Vector3 };
export default function BlockEnd({ position = [1, 1, 1] }: Props) {
  const hamburger = useGLTF('hamburger.glb');

  hamburger.scene.traverse((child) => {
    child.castShadow = true;
  });

  return (
    <group position={position}>
      <Text font="./bebas-neue-v9-latin-regular.woff" scale={1} position={[0, 1.0, 2]}>
        Finish
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        scale={[4, 0.02, 4]}
        geometry={boxGeometry}
        material={finishFloorMaterial}
      ></mesh>
      <RigidBody type="fixed" colliders="hull" position={[0, 0.25, 0]} restitution={0.2} friction={0}>
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
