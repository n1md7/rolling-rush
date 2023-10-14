import { Vector3 } from '@react-three/fiber';
import { floor1Material } from '/src/levels/shared/materials';
import { boxGeometry } from '/src/levels/shared/geometries';

type Props = { position?: Vector3 };
export default function BlockStart({ position = [1, 1, 1] }: Props) {
  return (
    <group position={position}>
      <mesh
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor1Material}
      ></mesh>
    </group>
  );
}
