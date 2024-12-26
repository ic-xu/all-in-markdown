import React from 'react';
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';
// import rehypeRaw from 'rehype-raw';
import { usePluginManager } from '@/hooks/usePluginManager';
import Mention from './Mention';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const pluginManager = usePluginManager();
  const renderers = pluginManager.getRenderers();

  const components = {
    p: ({ children }: { children: React.ReactNode }) => {
      if (typeof children === 'string') {
        const words = children.split(/(\s+)/);
        return (
          <p>
            {words.map((word, index) => {
              if (word.startsWith('@')) {
                const username = word.slice(1);
                return (
                  <React.Fragment key={index}>
                    <Mention 
                      username={username}
                      onClick={() => {
                        // Handle mention click - can be expanded later
                        console.log(`Clicked on @${username}`);
                      }}
                    />
                    {' '}
                  </React.Fragment>
                );
              }
              return word;
            })}
          </p>
        );
      }
      return <p>{children}</p>;
    },
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      const customRenderer = renderers.find(renderer => 
        renderer.test({ ...node, lang: language, type: 'code' })
      );

      if (customRenderer) {
        return customRenderer.render({ ...node, lang: language, value: String(children).replace(/\n$/, '') }, null);
      }

      return !inline ? (
        <pre className={className} {...props}>
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    ...renderers.reduce((acc: Record<string, any>, renderer) => {
      acc[renderer.id] = ({ node, children }: { node: any; children: React.ReactNode }) => {
        if (renderer.test(node)) {
          return renderer.render(node, children);
        }
        return children;
      };
      return acc;
    }, {}),
  };

  return (
    <ReactMarkdown
      // remarkPlugins={[remarkGfm, remarkMath]}
      // rehypePlugins={[rehypeKatex, rehypeRaw]}
      // components={components}
    >
      {content}
    </ReactMarkdown>
  );
}