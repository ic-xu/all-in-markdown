import React from 'react';
import type { Plugin } from '@/types/plugin';
import type { ReactElement } from 'react';
import { HeadingComponent } from './HeadingComponet';
import "./index.css";



export const basePlugin: Plugin = {
  id: 'base',
  name: 'Base Plugin',
  version: '1.0.0',
  description: 'Provides basic markdown rendering capabilities',

  async onActivate(context) {
    // Register basic markdown renderers
    context.registerRenderer({
      id: 'heading',
      name: 'Heading Renderer',
      test: (node) => node.type === 'heading',
      render: (node, children): ReactElement => {
        const level = node.depth as 1 | 2 | 3 | 4 | 5 | 6;
        const className = level === 1 ? 'text-center' : 'text-left';
        return <HeadingComponent level={level} className={className}>{children}</HeadingComponent>;
      },
    });

    // Register basic theme
    context.registerTheme({
      id: 'default',
      name: 'Default Theme',
      styles: {
        'heading-1': 'text-3xl font-bold mb-4',
        'heading-2': 'text-2xl font-bold mb-3',
        'paragraph': 'mb-4 text-gray-700 leading-relaxed',
      },
    });

    // Register basic toolbar items
    context.registerToolbarItem({
      id: 'bold',
      position: 'main',
      render: () => (
        <button
          onClick={() => context.eventBus.emit('editor:format', 'bold')}
          className="p-2 hover:bg-gray-100 rounded"
        >
          B
        </button>
      ),
    });
  },
};