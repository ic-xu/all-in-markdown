import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { usePluginManager } from '../hooks/usePluginManager';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const pluginManager = usePluginManager();
  const renderers = pluginManager.getRenderers();

  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      // Find a custom renderer for this code block
      const customRenderer = renderers.find(renderer => 
        renderer.test({ ...node, lang: language, type: 'code' })
      );

      if (customRenderer) {
        return customRenderer.render({ ...node, lang: language, value: String(children).replace(/\n$/, '') }, null);
      }

      // Default code rendering
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
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}