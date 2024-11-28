import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { usePluginManager } from '../hooks/usePluginManager';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const pluginManager = usePluginManager();
  const renderers = pluginManager.getRenderers();

  const components = renderers.reduce((acc: Record<string, any>, renderer) => {
    acc[renderer.id] = ({ node, children }: { node: any; children: React.ReactNode }) => {
      if (renderer.test(node)) {
        return renderer.render(node, children);
      }
      return children;
    };
    return acc;
  }, {});

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}