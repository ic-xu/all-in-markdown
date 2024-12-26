import React from 'react';
import MarkdownContent from "@/components/doc/Preview/MarkdownContent";


interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  return (
    <div className="h-full flex-1 flex flex-col border-l border-gray-200 dark:border-gray-700">
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 [data-theme='green']:from-emerald-900 [data-theme='green']:to-emerald-800">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}