import BlockStart from '/src/levels/components/BlockStart';

import BlockEnd from '/src/levels/components/BlockEnd';
import Bounds from '/src/levels/components/Bounds';
import React, { useMemo } from 'react';

type Type = React.FC<{ position?: [number, number, number] }>;
type Props = { count?: number; types: Type[]; seed: number };

export default function Level({ count = 1, types, seed = 0 }: Props) {
  const blocks = useMemo(() => {
    const blocks: Type[] = [];
    for (let i = 0; i < count; i++) {
      blocks.push(types[Math.floor(Math.random() * types.length)]);
    }
    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => {
        const x = 0;
        const y = 0;
        const z = -(index + 1) * 4;
        return <Block key={index} position={[x, y, z]} />;
      })}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
