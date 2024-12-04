import React from 'react';
import { Code2 } from 'lucide-react';
import type { Plugin } from '../../types/plugin';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css'; // Import Prism's CSS

export const syntaxHighlightPlugin: Plugin = {
  id: 'syntax-highlight',
  name: 'Syntax Highlighting',
  version: '1.0.0',
  description: 'Adds syntax highlighting for code blocks',

  async onActivate(context) {
    // 动态导入 Prism 库
    const Prism = (await import('prismjs')).default;

    context.registerToolbarItem({
      id: 'insert-code',
      position: 'left',
      render: () => (
        <button
          onClick={() => {
            const template = "```javascript\n// Your code here\n```";
            context.eventBus.emit('editor:insert', template);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Insert Code Block"
        >
          <Code2 className="w-5 h-5" />
        </button>
      ),
    });

    context.registerRenderer({
      id: 'code-block',
      name: 'Code Block Renderer',
      test: (node) => node.type === 'code' && node.lang && node.lang !== 'plantuml' && node.lang !== 'mindmap',
      render: (node) => {
        const language = node.lang || 'text';
        const highlightedCode = Prism.highlight(
          node.value,
          Prism.languages[language] || Prism.languages.text,
          language
        );

        return (
          <div className="relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-2 py-1 text-xs font-mono bg-gray-700 text-gray-200 rounded">
                {language}
              </span>
            </div>
            <pre className={`language-${language} rounded-lg !mt-0`}>
              <code
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        );
      },
    });
  },
};