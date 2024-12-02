import React from 'react';
import { FileCode } from 'lucide-react';
import type { Plugin } from '../../types/plugin';
import plantumlEncoder from 'plantuml-encoder';
import PlantUMLSettings from './Settings';
import Image from "next/image";

const PLANTUML_URL = 'https://www.plantuml.com/plantuml/svg';



export const plantumlPlugin: Plugin = {
  id: 'plantuml',
  name: 'PlantUML',
  version: '1.0.0',
  description: 'Adds support for PlantUML diagrams',
  defaultSettings: {
    serverUrl: PLANTUML_URL,
  },
  settingsComponent: PlantUMLSettings,

  async onActivate(context) {
    const settings = context.getSettings();

    // Register toolbar item for inserting PlantUML diagrams
    context.registerToolbarItem({
      id: 'insert-plantuml',
      position: 'left',
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

    // Register PlantUML renderer
    context.registerRenderer({
      id: 'plantuml',
      name: 'PlantUML Renderer',
      test: (node) => {
        return (
          node.type === 'code' &&
          typeof node.lang === 'string' &&
          node.lang.toLowerCase() === 'plantuml'
        );
      },
      render: (node) => {

        try {
          // 清理输入内容，移除 @startuml 和 @enduml
          const cleanContent = node.value
            .replace(/@startuml\s*/g, '')
            .replace(/@enduml\s*$/g, '')
            .trim();
          console.log("====>>>>", cleanContent)
          const encoded = plantumlEncoder.encode(cleanContent);
          const url = `${settings.serverUrl}/${encoded}`;
          console.log("====>>>>", url)

          return (
            <div className="my-4 flex justify-center">
              <Image
                src={url}
                alt="PlantUML Diagram"
                className="max-w-full"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  console.error('PlantUML rendering failed:', url);
                }}
              />
            </div>
          );
        } catch (error) {
          return (
            <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded">
              Error rendering PlantUML diagram: {error instanceof Error ? error.message : 'Unknown error'}
            </div>
          );
        }
      },
    });
  },

  async onSettingsChange(context, newSettings) {
    await this.onActivate?.(context);

  },
};