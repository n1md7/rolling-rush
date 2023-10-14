import { Pane } from 'tweakpane';
import { Debug } from '/src/utils/Debug';
import { useEffect, useState } from 'react';

export const tweaks = new Pane({
  title: 'Tweaks',
});

tweaks.disabled = Debug.disabled();
tweaks.hidden = Debug.disabled();

const debugButton = tweaks.addButton({ title: 'Toggle Debug' });

export const useTweaks = () => {
  const [debug, setDebug] = useState({ enabled: false });

  const toggleDebug = () => {
    setDebug(({ enabled }) => ({ enabled: !enabled }));
  };

  useEffect(() => {
    debugButton.on('click', () => toggleDebug());

    return () => debugButton.dispose();
  }, []);

  return { debug: debug.enabled };
};
