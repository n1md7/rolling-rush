import '/src/utils/Tweaks';
import Lights from './Lights.jsx';
import Level from '/src/levels/Level';
import Player from '/src/setup/Player';
import { Physics } from '@react-three/rapier';
import { BlockSpinner } from '/src/levels/components/BlockSpinner';
import { BlockLimbo } from '/src/levels/components/BlockLimbo';
import { BlockAxe } from '/src/levels/components/BlockAxe';
import { useTweaks } from '/src/utils/Tweaks';
import { useStore } from '/src/stores/useStore';
import { useLayoutEffect } from 'react';

export default function Experience() {
  const { debug } = useTweaks();
  const restart = useStore((state) => state.restart);
  const blocksCount = useStore((state) => state.blocksCount);
  const blocksSeed = useStore((state) => state.blocksSeed);

  useLayoutEffect(() => restart(), []);

  return (
    <>
      <color args={['#bdedfc']} attach="background" />
      <Physics debug={debug}>
        <Lights />
        <Level count={blocksCount} types={[BlockAxe, BlockSpinner, BlockLimbo]} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
