import React from 'react';
import type { Plugin } from '../../types/plugin';
import FileSelector from './FileSelector';

export const fileSelectorPlugin: Plugin = {
  id: 'file-selector',
  name: 'File Selector',
  version: '1.0.0',
  description: 'Adds a button to open system files',

  async onActivate(context) {
    // Register toolbar item for file selection
    context.registerToolbarItem({
      id: 'file-selector',
      position: 'left',
      render: () => <FileSelector />,
    });
  },
};