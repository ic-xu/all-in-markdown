import React from 'react';
import MarkdownRenderer from "@/components/doc/MarkdownRenderer";


interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 [data-theme='green']:bg-emerald-800 rounded-lg shadow-sm p-8 prose dark:prose-invert">
      <MarkdownRenderer content={content} />
    </div>
  );
}