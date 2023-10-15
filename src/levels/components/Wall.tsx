import { boxGeometry } from '/src/levels/shared/geometries';
import { wallMaterial } from '/src/levels/shared/materials';
import { useMemo } from 'react';

type Props = {
  length: number;
  left?: boolean;
  right?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export default function Wall({ length, left, right, castShadow, receiveShadow }: Props) {
  const position: [number, number, number] = useMemo(() => {
    if (left) return [-2.15, 0.75, -(length * 2) + 2];
    if (right) return [2.15, 0.75, -(length * 2) + 2];

    return [0, 0.75, -(length * 4) + 2];
  }, [length]);

  const scale: [number, number, number] = useMemo(() => {
    if (left || right) return [0.3, 1.5, 4 * length];
    return [4, 1.5, 0.3];
  }, [length]);

  return (
    <>
      <mesh
        castShadow={!!castShadow}
        receiveShadow={!!receiveShadow}
        geometry={boxGeometry}
        material={wallMaterial}
        position={position}
        scale={scale}
      />
    </>
  );
}
