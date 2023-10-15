import { Vector3 } from '@react-three/fiber';
import { startFloorMaterial } from '/src/levels/shared/materials';
import { boxGeometry } from '/src/levels/shared/geometries';
import { Float, Text } from '@react-three/drei';

type Props = { position?: Vector3 };
export default function BlockStart({ position = [1, 1, 1] }: Props) {
  return (
    <group position={position}>
      <Float>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Rolling Rush
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={startFloorMaterial}
      ></mesh>
    </group>
  );
}
