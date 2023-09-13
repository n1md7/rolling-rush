import BlockStart from '/src/levels/components/BlockStart';
import BlockSpinner from '/src/levels/components/BlockSpinner';
import BlockLimbo from '/src/levels/components/BlockLimbo';

export default function Level() {
  return (
    <>
      <BlockStart position={[0, 0, 8]} />
      <BlockSpinner position={[0, 0, 4]} />
      <BlockLimbo position={[0, 0, 0]} />
    </>
  );
}
