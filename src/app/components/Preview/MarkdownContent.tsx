import React from 'react';
import dynamic from 'next/dynamic';

const DynamicMarkdownRenderer = dynamic(
  () => import('./MarkdownRenderer'),
  { ssr: false }
);

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 [data-theme='green']:bg-emerald-800 rounded-lg shadow-sm p-8 prose dark:prose-invert">
      <DynamicMarkdownRenderer content={content} />
    </div>
  );
}