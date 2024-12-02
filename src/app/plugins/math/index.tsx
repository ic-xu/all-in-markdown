import React from 'react';
import type { Plugin } from '../../types/plugin';
import { Sigma } from 'lucide-react';
import 'katex/dist/katex.min.css';
import "./index.css";
import { MathSettings } from './MathSettings';


export const mathPlugin: Plugin = {
  id: 'math',
  name: 'Math Formulas',
  version: '1.0.0',
  description: 'Adds support for LaTeX math formulas using KaTeX',
  defaultSettings: {
    defaultDelimiter: 'dollars',
    autoNumbering: false,
  },
  settingsComponent: MathSettings,

  async onActivate(context) {
    const settings = context.getSettings();

    // Register toolbar item for inserting math formulas
    context.registerToolbarItem({
      id: 'insert-math',
      position: 'left',
      render: () => (
        <button
          onClick={() => {
            const delimiter = settings.defaultDelimiter === 'dollars' ? '\n$$' : '\\[';
            const closeDelimiter = settings.defaultDelimiter === 'dollars' ? '\n$$' : '\\]';
            context.eventBus.emit('editor:insert', `${delimiter}\n\\frac{1}{2}\n${closeDelimiter}`);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Insert Math Formula"
        >
          <Sigma className="w-5 h-5" />
        </button>
      ),
    });

    // Register math renderer
    context.registerRenderer({
      id: 'math',
      name: 'Math Renderer',
      test: (node) => node.type === 'math',
      render: (node, children) => (
        <div className={`my-4 text-center overflow-x-auto ${settings.autoNumbering ? 'relative pl-8' : ''}`}>
          {settings.autoNumbering && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              ({node.index || 1})
            </span>
          )}
          {children}
        </div>
      ),
    });
  },

  async onSettingsChange(context, newSettings) {
    // Re-register components with new settings
    await this.onActivate?.(context);
  },
};