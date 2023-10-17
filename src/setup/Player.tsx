import { RapierRigidBody, RigidBody, useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { Phase, useStore } from '/src/stores/useStore';
import { useKeyboardControls } from '@react-three/drei';
import { KeyNames } from '/src/constants/keyMap';

export default function Player() {
  const { rapier, world } = useRapier();
  const [subscribeKeys, getKeys] = useKeyboardControls<KeyNames>();
  const body = useRef<RapierRigidBody>(null!);
  const start = useStore((state) => state.start);
  const ended = useStore((state) => state.ended);
  const restart = useStore((state) => state.restart);
  const blocksCount = useStore((state) => state.blocksCount);
  const smoothCameraPosition = new Vector3(10, 10, 10);
  const smoothCameraTarget = new Vector3(0, 0, 0);

  const triggerJump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const intersection = world.castRay(ray, 10, true);
    if (!intersection || intersection.toi > 0.15) return;

    body.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
  };

  const triggerReset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 }, true);
    body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  useFrame((state, delta) => {
    const keys = getKeys();
    if (!body.current) return;

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (keys.Forward) {
      impulse.z = -impulseStrength;
      torque.x = -torqueStrength;
    }

    if (keys.Rightward) {
      torque.z -= torqueStrength;
      impulse.x += impulseStrength;
    }

    if (keys.Backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (keys.Leftward) {
      torque.z += torqueStrength;
      impulse.x -= impulseStrength;
    }

    body.current.applyImpulse(impulse, true);
    body.current.applyTorqueImpulse(torque, true);

    const pos = body.current.translation();
    const bodyPosition = new Vector3(pos.x, pos.y, pos.z);
    const cameraPosition = new Vector3().copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new Vector3().copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothCameraPosition.lerp(cameraPosition, 0.1);
    smoothCameraTarget.lerp(cameraTarget, 0.1);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);

    if (bodyPosition.z < -(blocksCount * 4 + 2)) ended();
    if (bodyPosition.y < -4) restart();
  });

  useEffect(() => {
    const fns = [
      useStore.subscribe(
        (state) => state.phase,
        (phase) => {
          if (phase === Phase.Ready) triggerReset();
        },
      ),
      subscribeKeys(
        (state) => state.Jump,
        (jump) => {
          if (jump) triggerJump();
        },
      ),
      // Any key press listener
      subscribeKeys(
        (state) => state,
        () => start(),
      ),
    ];

    return () => fns.forEach((fn) => fn());
  }, []);

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="mediumpurple" flatShading />
      </mesh>
    </RigidBody>
  );
}
