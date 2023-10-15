import { Pane } from 'tweakpane';
import { Debug } from '/src/utils/Debug';
import { useEffect, useState } from 'react';
import { useStore } from '/src/stores/useStore';

export const tweaks = new Pane({
  title: 'Tweaks',
});

tweaks.disabled = Debug.disabled();
tweaks.hidden = Debug.disabled();

const count = { blocks: 7 };
const debugButton = tweaks.addButton({ title: 'Toggle Debug' });
const blocks = tweaks.addBinding(count, 'blocks', { min: 3, max: 20, step: 1 });

export const useTweaks = () => {
  const updateBlocks = useStore((state) => state.updateBlocksCount);
  const [debug, setDebug] = useState({ enabled: false });

  const toggleDebug = () => {
    setDebug(({ enabled }) => ({ enabled: !enabled }));
  };

  useEffect(() => {
    debugButton.on('click', () => toggleDebug());
    blocks.on('change', () => {
      updateBlocks(count.blocks);
    });

    return () => {
      debugButton.dispose();
      blocks.dispose();
    };
  }, []);

  return { debug: debug.enabled };
};
