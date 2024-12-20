import React from 'react';
import { FileCode } from 'lucide-react';
import type { Plugin } from '../../types/plugin';
import dynamic from 'next/dynamic';

const DynamicPlantUMLRenderer = dynamic(
  () => import('./PlantUMLRenderer'),
  { ssr: false }
);

const PLANTUML_URL = 'https://www.plantuml.com/plantuml/svg';

export const plantumlPlugin: Plugin = {
  id: 'plantuml',
  name: 'PlantUML',
  version: '1.0.0',
  description: 'Adds support for PlantUML diagrams',
  defaultSettings: {
    serverUrl: PLANTUML_URL,
  },

  async onActivate(context) {
    const settings = context.getSettings();

    context.registerToolbarItem({
      id: 'insert-plantuml',
      position: 'main',
      render: () => (
        <button
          onClick={() => {
            const template = `\`\`\`plantuml
@startuml
Alice -> Bob: Hello
Bob --> Alice: Hi!
@enduml
\`\`\``;
            context.eventBus.emit('editor:insert', template);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Insert PlantUML Diagram"
        >
          <FileCode className="w-5 h-5" />
        </button>
      ),
    });

    context.registerRenderer({
      id: 'plantuml',
      name: 'PlantUML Renderer',
      test: (node) =>
        node.type === 'code' &&
        typeof node.lang === 'string' &&
        node.lang.toLowerCase() === 'plantuml',
      render: (node) => (
        <DynamicPlantUMLRenderer
          content={node.value}
          serverUrl={settings.serverUrl}
        />
      ),
    });
  },
};