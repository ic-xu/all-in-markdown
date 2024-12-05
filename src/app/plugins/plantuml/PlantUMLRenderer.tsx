import React from 'react';
import Image from 'next/image';
import plantumlEncoder from 'plantuml-encoder';

interface PlantUMLRendererProps {
  content: string;
  serverUrl: string;
}

export default function PlantUMLRenderer({ content, serverUrl }: PlantUMLRendererProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [imageSize, setImageSize] = React.useState({ width: 800, height: 400 });

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
          <p className="font-medium">Error rendering diagram:</p>
          <p className="mt-1">{error}</p>
        </div>
      );
    }

    return (
      <div className="my-4 flex justify-center">
        <div className="relative max-w-full overflow-x-auto">
          <Image
            src={url}
            alt="PlantUML Diagram"
            width={imageSize.width}
            height={imageSize.height}
            className="max-w-none"
            loading="lazy"
            onError={() => setError('Failed to load PlantUML diagram. Please check your diagram syntax and try again.')}
            onLoad={(event) => {
              const img = event.target as HTMLImageElement;
              setImageSize({
                width: img.naturalWidth || 800,
                height: img.naturalHeight || 400
              });
            }}
          />
        </div>
      </div>
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred while rendering the diagram';
    return (
      <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded">
        <p className="font-medium">Error rendering diagram:</p>
        <p className="mt-1">{errorMessage}</p>
        <p className="mt-2 text-sm">
          Please ensure your PlantUML syntax is correct and try again.
        </p>
      </div>
    );
  }
}