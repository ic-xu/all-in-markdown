import React, { useEffect, useRef } from 'react';
import { GitBranch } from 'lucide-react';
import type { Plugin } from '../../types/plugin';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

const transformer = new Transformer();

export const mindmapPlugin: Plugin = {
  id: 'mindmap',
  name: 'Mind Map',
  version: '1.0.0',
  description: 'Adds support for mind maps using markdown',

  async onActivate(context) {
    context.registerToolbarItem({
      id: 'insert-mindmap',
      position: 'left',
      render: () => (
        <button
          onClick={() => {
            const template = `\`\`\`mindmap
# Root
## Branch 1
### Sub-branch 1
### Sub-branch 2
## Branch 2
### Sub-branch 3
### Sub-branch 4
\`\`\``;
            context.eventBus.emit('editor:insert', template);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Insert Mind Map"
        >
          <GitBranch className="w-5 h-5" />
        </button>
      ),
    });

    context.registerRenderer({
      id: 'mindmap',
      name: 'Mind Map Renderer',
      test: (node) => node.type === 'code' && node.lang === 'mindmap',
      render: (node) => {
        return <MindMap content={node.value} />;
      },
    });
  },
};

function MindMap({ content }: { content: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const { root } = transformer.transform(content);
      
      if (!mmRef.current) {
        mmRef.current = Markmap.create(svgRef.current, {
          autoFit: true,
          color: 'category10',
        });
      }
      
      mmRef.current.setData(root);
      mmRef.current.fit();
    }

    return () => {
      if (mmRef.current) {
        mmRef.current = null;
      }
    };
  }, [content]);

  return (
    <div className="w-full overflow-x-auto my-4">
      <svg
        ref={svgRef}
        className="w-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}