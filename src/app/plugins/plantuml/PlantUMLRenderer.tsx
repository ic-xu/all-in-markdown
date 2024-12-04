import React from 'react';
import Image from 'next/image';
import plantumlEncoder from 'plantuml-encoder';

interface PlantUMLRendererProps {
  content: string;
  serverUrl: string;
}

export default function PlantUMLRenderer({ content, serverUrl }: PlantUMLRendererProps) {
  const [error, setError] = React.useState<string | null>(null);

  try {
    const cleanContent = content
      .replace(/@startuml\s*/g, '')
      .replace(/@enduml\s*$/g, '')
      .trim();

    const encoded = plantumlEncoder.encode(cleanContent);
    const url = `${serverUrl}/${encoded}`;

    if (error) {
      return (
        <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded">
          {error}
        </div>
      );
    }

    return (
      <div className="my-4 flex justify-center">
        <div className="max-w-full overflow-x-auto">
          <Image
            src={url}
            alt="PlantUML Diagram"
            className="max-w-none h-[400px]"
            loading="lazy"
            onError={() => setError('Failed to load PlantUML diagram')}
          />
        </div>
      </div>
    );
  } catch (err) {
    return (
      <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded">
        Error rendering PlantUML diagram: {err instanceof Error ? err.message : 'Unknown error'}
      </div>
    );
  }
}