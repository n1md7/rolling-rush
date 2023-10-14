import Wall from '/src/levels/components/Wall';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

type Props = { length: number };

export default function Bounds({ length }: Props) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <Wall left length={length} receiveShadow />
      <Wall right length={length} castShadow />
      <Wall length={length} receiveShadow />
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}
