
import type { Plugin } from '../../types/plugin';
import { GreenThemeToggleButton } from './GreenThemeToggleButton';

export const greenThemePlugin: Plugin = {
  id: 'green-theme',
  name: 'Green Theme',
  version: '1.0.0',
  description: 'Provides a soothing dark green theme',

  async onActivate(context) {
    // Register green theme
    context.registerTheme({
      id: 'green',
      name: 'Green Theme',
      styles: {
        'root': 'bg-emerald-900 text-emerald-100',
        'editor': 'bg-emerald-800 text-emerald-100',
        'preview': 'bg-emerald-900',
        'preview-content': 'bg-emerald-800 text-emerald-100',
        'heading-1': 'text-3xl font-bold mb-4 text-emerald-100',
        'heading-2': 'text-2xl font-bold mb-3 text-emerald-100',
        'paragraph': 'mb-4 text-emerald-200 leading-relaxed',
      },
    });

    // Register theme toggle toolbar item
    context.registerToolbarItem({
      id: 'green-theme-toggle',
      position: 'right',
      render: GreenThemeToggleButton,
    });
  },
};

