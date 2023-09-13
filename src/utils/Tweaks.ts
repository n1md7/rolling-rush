import { Pane } from 'tweakpane';
import { Debug } from '/src/utils/Debug';

export const tweaks = new Pane({
  title: 'Tweaks',
});

tweaks.disabled = Debug.disabled();
tweaks.hidden = Debug.disabled();
